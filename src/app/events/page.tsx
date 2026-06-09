import type { Metadata } from "next";
import Link from "next/link";
import { Calendar } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming seminars, open mats, and events at Joshimitsu BJJ.",
};

const upcomingEvents = [
  {
    title: "Open Mat Saturday",
    date: "Every Saturday",
    time: "10:00 – 11:30",
    description:
      "Free-flow training for all levels. Bring your gi and roll with the community.",
  },
  {
    title: "Kids BJJ Open Day",
    date: "Coming Soon",
    time: "TBA",
    description:
      "Bring your child for a free introduction to kids BJJ. Fun activities and a chance to meet the coaches.",
  },
  {
    title: "Guest Seminar",
    date: "Coming Soon",
    time: "TBA",
    description:
      "We're planning a seminar with a visiting black belt. Stay tuned for details.",
  },
];

export default function EventsPage() {
  return (
    <>
      <PageHeader
        title="Events"
        subtitle="Seminars, open mats, and special events at Joshimitsu BJJ."
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10">
                  <Calendar className="h-6 w-6 text-brand-blue-dark" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-brand-black">
                    {event.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-brand-blue-dark">
                    {event.date} · {event.time}
                  </p>
                  <p className="mt-2 text-gray-600">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-gray-500">
          Event management will be connected via Supabase admin panel.
        </p>

        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-brand-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-blue-dark"
          >
            Contact Us About Events
          </Link>
        </div>
      </div>
    </>
  );
}
