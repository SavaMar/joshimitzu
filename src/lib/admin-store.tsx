"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  initialEventApplications,
  initialEvents,
  initialTrialApplications,
} from "@/lib/admin-data";
import type {
  EventApplication,
  GymEvent,
  TrialApplication,
} from "@/lib/admin-types";
import { computeAnalytics } from "@/lib/admin-utils";
import type { SerializedTrialForm } from "@/lib/trial-form";

const STORAGE_KEY = "joshimitsu-admin-store";

interface AdminStoreState {
  trialApplications: TrialApplication[];
  events: GymEvent[];
  eventApplications: EventApplication[];
}

interface AdminStoreContextValue extends AdminStoreState {
  addTrialApplication: (data: SerializedTrialForm) => void;
  scheduleTrial: (id: string, date: string) => void;
  makeMember: (id: string, memberPackage: string) => void;
  archiveTrial: (id: string) => void;
  addEvent: (event: Omit<GymEvent, "id" | "createdAt">) => void;
  updateEvent: (id: string, event: Partial<GymEvent>) => void;
  deleteEvent: (id: string) => void;
  addEventApplication: (
    app: Omit<EventApplication, "id" | "submittedAt">,
  ) => void;
  analytics: ReturnType<typeof computeAnalytics>;
}

const AdminStoreContext = createContext<AdminStoreContextValue | null>(null);

function loadState(): AdminStoreState {
  if (typeof window === "undefined") {
    return {
      trialApplications: initialTrialApplications,
      events: initialEvents,
      eventApplications: initialEventApplications,
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AdminStoreState;
  } catch {
    /* use defaults */
  }
  return {
    trialApplications: initialTrialApplications,
    events: initialEvents,
    eventApplications: initialEventApplications,
  };
}

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function AdminStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<AdminStoreState>(() => ({
    trialApplications: initialTrialApplications,
    events: initialEvents,
    eventApplications: initialEventApplications,
  }));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, hydrated]);

  const addTrialApplication = useCallback((data: SerializedTrialForm) => {
    const app: TrialApplication = {
      id: uid("t"),
      status: "new",
      submittedAt: data.submitted_at,
      data,
    };
    setState((s) => ({
      ...s,
      trialApplications: [app, ...s.trialApplications],
    }));
  }, []);

  const scheduleTrial = useCallback((id: string, date: string) => {
    setState((s) => ({
      ...s,
      trialApplications: s.trialApplications.map((t) =>
        t.id === id ? { ...t, status: "scheduled" as const, scheduledTrialDate: date } : t,
      ),
    }));
  }, []);

  const makeMember = useCallback((id: string, memberPackage: string) => {
    setState((s) => ({
      ...s,
      trialApplications: s.trialApplications.map((t) =>
        t.id === id ? { ...t, status: "member" as const, memberPackage } : t,
      ),
    }));
  }, []);

  const archiveTrial = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      trialApplications: s.trialApplications.map((t) =>
        t.id === id ? { ...t, status: "archived" as const } : t,
      ),
    }));
  }, []);

  const addEvent = useCallback((event: Omit<GymEvent, "id" | "createdAt">) => {
    const newEvent: GymEvent = {
      ...event,
      id: uid("e"),
      createdAt: new Date().toISOString(),
    };
    setState((s) => ({ ...s, events: [newEvent, ...s.events] }));
  }, []);

  const updateEvent = useCallback((id: string, patch: Partial<GymEvent>) => {
    setState((s) => ({
      ...s,
      events: s.events.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      events: s.events.filter((e) => e.id !== id),
    }));
  }, []);

  const addEventApplication = useCallback(
    (app: Omit<EventApplication, "id" | "submittedAt">) => {
      const entry: EventApplication = {
        ...app,
        id: uid("ea"),
        submittedAt: new Date().toISOString(),
      };
      setState((s) => ({
        ...s,
        eventApplications: [entry, ...s.eventApplications],
      }));
    },
    [],
  );

  const analytics = useMemo(
    () =>
      computeAnalytics(
        state.trialApplications,
        state.events,
        state.eventApplications,
      ),
    [state],
  );

  const value: AdminStoreContextValue = {
    ...state,
    addTrialApplication,
    scheduleTrial,
    makeMember,
    archiveTrial,
    addEvent,
    updateEvent,
    deleteEvent,
    addEventApplication,
    analytics,
  };

  return (
    <AdminStoreContext.Provider value={value}>
      {children}
    </AdminStoreContext.Provider>
  );
}

export function useAdminStore() {
  const ctx = useContext(AdminStoreContext);
  if (!ctx) {
    throw new Error("useAdminStore must be used within AdminStoreProvider");
  }
  return ctx;
}
