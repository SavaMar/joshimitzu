import type {
  AdminAnalytics,
  EffectiveTrialStatus,
  EventApplication,
  GymEvent,
  TrialApplication,
} from "@/lib/admin-types";

export function startOfDay(date: Date = new Date()): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getEffectiveTrialStatus(
  app: TrialApplication,
): EffectiveTrialStatus {
  if (app.status === "member") return "member";
  if (app.status === "archived") return "archived";
  if (app.status === "scheduled" && app.scheduledTrialDate) {
    const trialDay = startOfDay(new Date(app.scheduledTrialDate));
    if (trialDay < startOfDay()) return "follow_up";
    return "scheduled";
  }
  return "new";
}

export function sortActiveTrials(apps: TrialApplication[]): TrialApplication[] {
  const order: Record<EffectiveTrialStatus, number> = {
    follow_up: 0,
    new: 1,
    scheduled: 2,
    member: 3,
    archived: 4,
  };

  return [...apps]
    .filter((a) => a.status !== "member" && a.status !== "archived")
    .sort((a, b) => {
      const diff =
        order[getEffectiveTrialStatus(a)] - order[getEffectiveTrialStatus(b)];
      if (diff !== 0) return diff;
      return (
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
    });
}

export function isEventPast(event: GymEvent): boolean {
  return startOfDay(new Date(event.date)) < startOfDay();
}

export function sortEventsByDate(events: GymEvent[]): GymEvent[] {
  return [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getUpcomingEvents(events: GymEvent[]): GymEvent[] {
  return sortEventsByDate(events).filter((e) => !isEventPast(e));
}

export function getEventPriceLabel(event: GymEvent): string {
  const { pricing } = event;
  if (pricing.type === "free") return "Free";
  if (pricing.type === "fixed") return `${pricing.price} CHF`;
  const now = startOfDay();
  const earlyUntil = pricing.earlyBirdUntil
    ? startOfDay(new Date(pricing.earlyBirdUntil))
    : null;
  if (earlyUntil && now <= earlyUntil) {
    return `${pricing.earlyBirdPrice} CHF (early bird)`;
  }
  return `${pricing.normalPrice} CHF`;
}

export function formatEventDate(date: string): string {
  return new Date(date).toLocaleDateString("en-CH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function computeAnalytics(
  trials: TrialApplication[],
  events: GymEvent[],
  eventApps: EventApplication[],
): AdminAnalytics {
  const active = trials.filter(
    (t) => t.status !== "member" && t.status !== "archived",
  );
  return {
    totalApplied: trials.length,
    activeRequests: active.length,
    members: trials.filter((t) => t.status === "member").length,
    archived: trials.filter((t) => t.status === "archived").length,
    followUpNeeded: active.filter(
      (t) => getEffectiveTrialStatus(t) === "follow_up",
    ).length,
    upcomingEvents: getUpcomingEvents(events).length,
    eventApplications: eventApps.length,
  };
}

export function statusLabel(status: EffectiveTrialStatus): string {
  const labels: Record<EffectiveTrialStatus, string> = {
    new: "New request",
    scheduled: "Trial scheduled",
    follow_up: "Follow-up needed",
    member: "Member",
    archived: "Archived",
  };
  return labels[status];
}

export function statusColor(status: EffectiveTrialStatus): string {
  const colors: Record<EffectiveTrialStatus, string> = {
    new: "bg-blue-100 text-blue-800",
    scheduled: "bg-green-100 text-green-800",
    follow_up: "bg-amber-100 text-amber-800 ring-2 ring-amber-400",
    member: "bg-brand-blue/10 text-brand-blue-dark",
    archived: "bg-gray-100 text-gray-600",
  };
  return colors[status];
}
