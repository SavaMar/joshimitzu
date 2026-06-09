import Link from "next/link";
import { Users, Heart, Brain, Shield } from "lucide-react";

const adultBenefits = [
  { icon: Heart, text: "Full-body workout that\u2019s never boring" },
  { icon: Brain, text: "Mental clarity and stress relief" },
  { icon: Shield, text: "Practical self-defense skills" },
  { icon: Users, text: "A welcoming community of training partners" },
];

const childrenBenefits = [
  { icon: Brain, text: "Improved focus and concentration" },
  { icon: Shield, text: "Confidence and self-discipline" },
  { icon: Heart, text: "Physical fitness through play" },
  { icon: Users, text: "Social skills and teamwork" },
];

export default function InviteSection() {
  return (
    <section className="bg-brand-gray py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-brand-black sm:text-4xl">
            Why Jiu Jitsu is Good for You
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            BJJ offers something unique for every age — real connection, meaningful
            movement, and growth you can feel week after week.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-6 inline-block rounded-full bg-brand-blue/10 px-4 py-1 text-sm font-semibold text-brand-blue-dark">
              For Children
            </div>
            <h3 className="mb-4 text-2xl font-bold text-brand-black">
              Fun, Focus & Confidence
            </h3>
            <p className="mb-6 text-gray-600">
              Kids naturally love movement on the ground. BJJ channels that energy
              into structured learning — building skills they&apos;ll carry for life,
              all while having a blast.
            </p>
            <ul className="space-y-4">
              {childrenBenefits.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-blue/10">
                    <Icon className="h-4 w-4 text-brand-blue-dark" />
                  </div>
                  <span className="text-gray-700">{text}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/trial-training"
              className="mt-8 inline-block rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              Kids Trial Training
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-6 inline-block rounded-full bg-brand-black/5 px-4 py-1 text-sm font-semibold text-brand-black">
              For Adults
            </div>
            <h3 className="mb-4 text-2xl font-bold text-brand-black">
              Strength, Skill & Community
            </h3>
            <p className="mb-6 text-gray-600">
              You don&apos;t need to be fit or experienced to start. BJJ meets you where
              you are and challenges you to grow — physically, mentally, and socially.
            </p>
            <ul className="space-y-4">
              {adultBenefits.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-black/5">
                    <Icon className="h-4 w-4 text-brand-black" />
                  </div>
                  <span className="text-gray-700">{text}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/trial-training"
              className="mt-8 inline-block rounded-lg bg-brand-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Adult Trial Training
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
