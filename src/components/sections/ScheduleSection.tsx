import Link from "next/link";
import ScheduleGrid, { ScheduleLegend } from "@/components/schedule/ScheduleGrid";

export default function ScheduleSection() {
  return (
    <section id="schedule" className="scroll-mt-20 bg-brand-gray py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-brand-black sm:text-4xl">
            Training Schedule
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Early bird classes before work and evening sessions for all levels.
            Find a time that works for you.
          </p>
        </div>

        <ScheduleGrid />

        <div className="mt-8 text-center">
          <Link
            href="/schedule"
            className="text-sm font-semibold text-brand-blue-dark hover:underline"
          >
            View full schedule & class guide →
          </Link>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/trial-training"
            className="inline-block rounded-lg bg-brand-blue px-8 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-brand-blue-dark"
          >
            Get Trial Training
          </Link>
        </div>
      </div>
    </section>
  );
}
