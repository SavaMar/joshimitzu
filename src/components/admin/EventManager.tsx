"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Pencil, Plus, Trash2, Users } from "lucide-react";
import type { EventApplication, EventPricingType, GymEvent } from "@/lib/admin-types";
import { useAdminStore } from "@/lib/admin-store";
import {
  formatEventDate,
  getEventPriceLabel,
  isEventPast,
  sortEventsByDate,
} from "@/lib/admin-utils";

const emptyForm = (): Omit<GymEvent, "id" | "createdAt"> => ({
  name: "",
  date: "",
  time: "",
  guestName: "",
  guestInstagram: "",
  bannerImage: "/images/about_1.jpg",
  pricing: { type: "free" },
  description: "",
});

function EventApplicantsPanel({
  event,
  applications,
}: {
  event: GymEvent;
  applications: EventApplication[];
}) {
  if (applications.length === 0) {
    return (
      <p className="border-t border-gray-100 px-4 py-3 text-sm text-gray-500">
        No applicants yet for this event.
      </p>
    );
  }

  return (
    <div className="border-t border-gray-100 bg-brand-gray/40 px-4 py-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {applications.length} applicant{applications.length !== 1 ? "s" : ""}
      </p>
      <ul className="space-y-2">
        {applications.map((app) => (
          <li
            key={app.id}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
          >
            <div className="font-medium text-brand-black">{app.name}</div>
            <div className="text-xs text-gray-500">
              {app.email} · {app.phone}
            </div>
            <div className="mt-1 text-xs text-gray-600">
              Payment:{" "}
              {app.paymentMethod === "on_place"
                ? "Pay on place"
                : app.paymentMethod === "free"
                  ? "Free"
                  : "Twint"}
              {" · "}
              {new Date(app.submittedAt).toLocaleDateString("en-CH")}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EventRow({
  event,
  applicantCount,
  applications,
  onEdit,
  onDelete,
}: {
  event: GymEvent;
  applicantCount: number;
  applications: EventApplication[];
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const past = isEventPast(event);

  return (
    <div
      className={`overflow-hidden rounded-xl border ${
        past ? "border-gray-200 bg-gray-50" : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-center gap-3 p-4">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={event.bannerImage}
              alt={event.name}
              fill
              className={`object-cover ${past ? "grayscale" : ""}`}
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p
                className={`font-semibold ${past ? "text-gray-600" : "text-brand-black"}`}
              >
                {event.name}
              </p>
              {past && (
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
                  Past
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">
              {formatEventDate(event.date)} · {event.time}
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-sm font-medium text-brand-blue-dark">
              <Users className="h-3.5 w-3.5" />
              {applicantCount} applicant{applicantCount !== 1 ? "s" : ""}
              <span className="ml-1 text-gray-400">
                {expanded ? (
                  <ChevronUp className="inline h-4 w-4" />
                ) : (
                  <ChevronDown className="inline h-4 w-4" />
                )}
              </span>
            </p>
          </div>
        </button>
        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Edit event"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded-lg p-2 text-red-600 hover:bg-red-50"
            aria-label="Delete event"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      {expanded && (
        <EventApplicantsPanel event={event} applications={applications} />
      )}
    </div>
  );
}

export default function EventManager() {
  const { events, eventApplications, addEvent, updateEvent, deleteEvent } =
    useAdminStore();
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [form, setForm] = useState(emptyForm());

  const sortedEvents = sortEventsByDate(events);

  const getAppsForEvent = (eventId: string) =>
    eventApplications.filter((a) => a.eventId === eventId);

  const startNew = () => {
    setForm(emptyForm());
    setEditing("new");
  };

  const startEdit = (event: GymEvent) => {
    setForm({
      name: event.name,
      date: event.date,
      time: event.time,
      guestName: event.guestName ?? "",
      guestInstagram: event.guestInstagram ?? "",
      bannerImage: event.bannerImage,
      pricing: { ...event.pricing },
      description: event.description,
    });
    setEditing(event.id);
  };

  const save = () => {
    if (!form.name || !form.date || !form.time) return;
    if (editing === "new") {
      addEvent(form);
    } else if (editing) {
      updateEvent(editing, form);
    }
    setEditing(null);
  };

  const setPricingType = (type: EventPricingType) => {
    if (type === "free") setForm((f) => ({ ...f, pricing: { type: "free" } }));
    else if (type === "fixed")
      setForm((f) => ({ ...f, pricing: { type: "fixed", price: 50 } }));
    else
      setForm((f) => ({
        ...f,
        pricing: {
          type: "early_bird",
          earlyBirdPrice: 45,
          earlyBirdUntil: "",
          normalPrice: 60,
        },
      }));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-brand-black">Events</h2>
        <button
          type="button"
          onClick={startNew}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-dark"
        >
          <Plus className="h-4 w-4" />
          Add event
        </button>
      </div>

      {editing && (
        <div className="rounded-2xl border border-brand-blue/30 bg-brand-blue/5 p-6">
          <h3 className="mb-4 font-bold text-brand-black">
            {editing === "new" ? "New event" : "Edit event"}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm sm:col-span-2">
              <span className="font-medium">Event name *</span>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                placeholder="Seminar, graduation day..."
              />
            </label>
            <label className="text-sm">
              <span className="font-medium">Date *</span>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
              />
            </label>
            <label className="text-sm">
              <span className="font-medium">Time *</span>
              <input
                value={form.time}
                onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                placeholder="10:00 – 13:00"
              />
            </label>
            <label className="text-sm">
              <span className="font-medium">Guest name</span>
              <input
                value={form.guestName}
                onChange={(e) => setForm((f) => ({ ...f, guestName: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
              />
            </label>
            <label className="text-sm">
              <span className="font-medium">Guest Instagram</span>
              <input
                value={form.guestInstagram}
                onChange={(e) =>
                  setForm((f) => ({ ...f, guestInstagram: e.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                placeholder="@username"
              />
            </label>
            <label className="text-sm sm:col-span-2">
              <span className="font-medium">Banner image path</span>
              <input
                value={form.bannerImage}
                onChange={(e) =>
                  setForm((f) => ({ ...f, bannerImage: e.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
              />
            </label>
            <div className="sm:col-span-2">
              <span className="text-sm font-medium">Pricing</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {(["free", "fixed", "early_bird"] as EventPricingType[]).map(
                  (t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setPricingType(t)}
                      className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${
                        form.pricing.type === t
                          ? "border-brand-blue bg-brand-blue text-white"
                          : "border-gray-200"
                      }`}
                    >
                      {t === "early_bird" ? "Early bird" : t}
                    </button>
                  ),
                )}
              </div>
              {form.pricing.type === "fixed" && (
                <input
                  type="number"
                  value={form.pricing.price ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      pricing: { type: "fixed", price: Number(e.target.value) },
                    }))
                  }
                  className="mt-2 w-32 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  placeholder="CHF"
                />
              )}
              {form.pricing.type === "early_bird" && (
                <div className="mt-2 flex flex-wrap gap-2">
                  <input
                    type="number"
                    value={form.pricing.earlyBirdPrice ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        pricing: {
                          ...f.pricing,
                          type: "early_bird",
                          earlyBirdPrice: Number(e.target.value),
                        },
                      }))
                    }
                    className="w-28 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    placeholder="Early CHF"
                  />
                  <input
                    type="date"
                    value={form.pricing.earlyBirdUntil ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        pricing: {
                          ...f.pricing,
                          type: "early_bird",
                          earlyBirdUntil: e.target.value,
                        },
                      }))
                    }
                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  />
                  <input
                    type="number"
                    value={form.pricing.normalPrice ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        pricing: {
                          ...f.pricing,
                          type: "early_bird",
                          normalPrice: Number(e.target.value),
                        },
                      }))
                    }
                    className="w-28 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    placeholder="Normal CHF"
                  />
                </div>
              )}
            </div>
            <label className="text-sm sm:col-span-2">
              <span className="font-medium">Description *</span>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                rows={4}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
              />
            </label>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={save}
              className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white"
            >
              Save event
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
          All events — click to view applicants
        </h3>
        <div className="space-y-3">
          {sortedEvents.map((event) => {
            const apps = getAppsForEvent(event.id);
            return (
              <EventRow
                key={event.id}
                event={event}
                applicantCount={apps.length}
                applications={apps}
                onEdit={() => startEdit(event)}
                onDelete={() => deleteEvent(event.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
