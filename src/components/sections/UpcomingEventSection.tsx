"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { useAdminStore } from "@/lib/admin-store";
import {
  formatEventDate,
  getEventPriceLabel,
  getUpcomingEvents,
} from "@/lib/admin-utils";
import EventApplyModal from "@/components/events/EventApplyModal";

export default function UpcomingEventSection() {
  const { events } = useAdminStore();
  const upcoming = getUpcomingEvents(events);
  const [applying, setApplying] = useState(false);

  if (upcoming.length === 0) return null;

  const event = upcoming[0];

  return (
    <section className="bg-brand-gray py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={event.bannerImage}
              alt={event.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <span className="inline-block rounded-full bg-brand-blue/10 px-4 py-1 text-sm font-semibold text-brand-blue-dark">
              Upcoming Event
            </span>
            <h2 className="mt-4 text-3xl font-bold text-brand-black sm:text-4xl">
              {event.name}
            </h2>
            <p className="mt-3 flex items-center gap-2 font-medium text-brand-blue-dark">
              <Calendar className="h-5 w-5" />
              {formatEventDate(event.date)} · {event.time}
            </p>
            {event.guestName && (
              <p className="mt-2 text-sm text-gray-600">
                With {event.guestName}
              </p>
            )}
            <p className="mt-1 text-sm font-semibold text-gray-700">
              {getEventPriceLabel(event)}
            </p>
            <p className="mt-4 text-gray-600">{event.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setApplying(true)}
                className="rounded-lg bg-brand-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-blue-dark"
              >
                Apply
              </button>
              <Link
                href="/events"
                className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-brand-black transition-colors hover:bg-white"
              >
                All events
              </Link>
            </div>
          </div>
        </div>
      </div>
      {applying && (
        <EventApplyModal event={event} onClose={() => setApplying(false)} />
      )}
    </section>
  );
}
