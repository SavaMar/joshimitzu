"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Instagram } from "lucide-react";
import { useAdminStore } from "@/lib/admin-store";
import {
  formatEventDate,
  getEventPriceLabel,
  isEventPast,
  sortEventsByDate,
} from "@/lib/admin-utils";
import EventApplyModal from "@/components/events/EventApplyModal";
import type { GymEvent } from "@/lib/admin-types";

function EventCard({ event }: { event: GymEvent }) {
  const [applying, setApplying] = useState(false);
  const past = isEventPast(event);

  return (
    <>
      <article
        className={`flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm ${
          past
            ? "border-gray-200 bg-gray-100 opacity-70 grayscale"
            : "border-gray-200 bg-white"
        }`}
      >
        <div className="relative aspect-video">
          <Image
            src={event.bannerImage}
            alt={event.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {past && (
            <span className="absolute left-4 top-4 rounded-full bg-gray-800/80 px-3 py-1 text-xs font-semibold text-white">
              Past event
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h2
            className={`text-lg font-bold ${past ? "text-gray-600" : "text-brand-black"}`}
          >
            {event.name}
          </h2>
          <p
            className={`mt-1 flex items-start gap-2 text-sm font-medium ${
              past ? "text-gray-500" : "text-brand-blue-dark"
            }`}
          >
            <Calendar className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              {formatEventDate(event.date)} · {event.time}
            </span>
          </p>
          {event.guestName && (
            <p className="mt-2 text-sm text-gray-600">
              Guest: {event.guestName}
              {event.guestInstagram && (
                <a
                  href={`https://instagram.com/${event.guestInstagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 inline-flex items-center gap-1 text-brand-blue-dark hover:underline"
                >
                  <Instagram className="h-3.5 w-3.5" />@
                  {event.guestInstagram.replace("@", "")}
                </a>
              )}
            </p>
          )}
          <p className="mt-1 text-sm font-semibold text-gray-700">
            {getEventPriceLabel(event)}
          </p>
          <p className="mt-2 line-clamp-4 flex-1 text-sm text-gray-600">
            {event.description}
          </p>
          {!past && (
            <button
              type="button"
              onClick={() => setApplying(true)}
              className="mt-4 w-full rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              Apply
            </button>
          )}
        </div>
      </article>
      {applying && (
        <EventApplyModal event={event} onClose={() => setApplying(false)} />
      )}
    </>
  );
}

export default function EventsList() {
  const { events } = useAdminStore();
  const sorted = sortEventsByDate(events);

  if (sorted.length === 0) {
    return (
      <p className="text-center text-gray-500">No events scheduled yet.</p>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/contact"
          className="text-sm font-medium text-brand-blue-dark hover:underline"
        >
          Questions about events? Contact us
        </Link>
      </div>
    </div>
  );
}
