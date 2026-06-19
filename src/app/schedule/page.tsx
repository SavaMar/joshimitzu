import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ScheduleGrid, { ScheduleLegend } from "@/components/schedule/ScheduleGrid";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "Weekly BJJ training schedule at Joshimitsu BJJ — Gi, No-Gi, kids, and adult classes in Biberist, Switzerland.",
};

const classTypes = [
  {
    title: "Gi",
    color: "bg-[#D9F0E0]",
    badge: "Traditional kimono",
    description:
      "Gi training is done in a traditional kimono (gi). The fabric allows grips on collars, sleeves, and pants — opening up a wider range of techniques focused on patience, control, and leverage.",
    points: [
      "Ideal for building a deep technical foundation",
      "Emphasizes grips, lapel chokes, and sleeve control",
      "Slightly slower pace — more time to think and react",
      "Required for most BJJ belt promotions",
    ],
  },
  {
    title: "No-Gi",
    color: "bg-[#EDE4F7]",
    badge: "Rash guard & shorts",
    description:
      "No-Gi training is done without the kimono — in rash guards and shorts. Without fabric grips, the pace is faster and the focus shifts to body locks, underhooks, and wrestling-style control.",
    points: [
      "Faster-paced and more dynamic",
      "Translates well to MMA and self-defense",
      "Builds grip strength and athletic movement",
      "Great complement to Gi training",
    ],
  },
];

const expectations = [
  {
    title: "Before class",
    items: [
      "Arrive 10–15 minutes early to change and warm up",
      "Wear comfortable sportswear (no zippers or buttons)",
      "Bring flip-flops for walking to the mat area",
      "Trim nails and remove jewelry",
    ],
  },
  {
    title: "During class",
    items: [
      "Structured warm-up, technique instruction, and drilling",
      "Partner work with students of similar level",
      "Clear coaching — ask questions anytime",
      "Beginners are never thrown into sparring on day one",
    ],
  },
  {
    title: "Class levels",
    items: [
      "Basics — fundamentals for newer students",
      "Level 1 & 2 — age-appropriate kids groups",
      "All levels — open to everyone, scaled to experience",
      "Members only — advanced sparring for active members",
    ],
  },
];

export default function SchedulePage() {
  return (
    <>
      <PageHeader
        title="Training Schedule"
        subtitle="Gi, No-Gi, kids, and adult classes — early bird sessions before work and evening training for every level."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <section>
          <h2 className="text-2xl font-bold text-brand-black">
            Gi vs. No-Gi — What&apos;s the Difference?
          </h2>
          <p className="mt-3 max-w-3xl text-gray-600">
            Both styles are Brazilian Jiu-Jitsu. The difference is what you wear
            and how you grip — each develops different skills, and most students
            benefit from training both.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {classTypes.map(({ title, color, badge, description, points }) => (
              <div
                key={title}
                className={`rounded-2xl border border-gray-200 p-6 ${color}`}
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-brand-black">{title}</h3>
                  <span className="rounded-full bg-white/80 px-3 py-0.5 text-xs font-semibold text-gray-700">
                    {badge}
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-700">{description}</p>
                <ul className="mt-4 space-y-2">
                  {points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-black" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-2xl font-bold text-brand-black">
            What to Expect
          </h2>
          <p className="mt-3 max-w-3xl text-gray-600">
            Every class follows a clear structure. Whether it&apos;s your first
            session or your hundredth, you&apos;ll always know what&apos;s
            coming.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {expectations.map(({ title, items }) => (
              <div
                key={title}
                className="rounded-2xl border border-gray-200 bg-brand-gray p-6"
              >
                <h3 className="font-bold text-brand-black">{title}</h3>
                <ul className="mt-4 space-y-2">
                  {items.map((item) => (
                    <li key={item} className="text-sm text-gray-600">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-brand-black">
              Weekly Schedule
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Monday to Friday — morning Early Bird sessions and afternoon/evening
              classes for kids and adults.
            </p>
            <div className="mt-6">
              <ScheduleLegend />
            </div>
          </div>

          <ScheduleGrid />
        </section>

        <div className="mt-16 rounded-2xl bg-brand-black p-8 text-center text-white sm:p-12">
          <h2 className="text-2xl font-bold">Ready to try a class?</h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-400">
            Pick a time from the schedule and book your free trial. No
            experience needed — we&apos;ll find the right class for you.
          </p>
          <Link
            href="/trial-training"
            className="mt-6 inline-block rounded-lg bg-brand-blue px-8 py-3 font-semibold text-white transition-colors hover:bg-brand-blue-dark"
          >
            Book Free Trial
          </Link>
        </div>
      </div>
    </>
  );
}
