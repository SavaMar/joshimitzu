import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import EventsList from "@/components/events/EventsList";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming seminars, open mats, and events at Joshimitsu BJJ.",
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        title="Events"
        subtitle="Seminars, graduation days, open mats, and special events at Joshimitsu BJJ."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <EventsList />
      </div>
    </>
  );
}
