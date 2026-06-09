import { UserCheck, Baby, Trophy, Briefcase } from "lucide-react";

const audiences = [
  {
    icon: UserCheck,
    title: "Complete Beginners",
    description:
      "No fitness, flexibility, or martial arts background needed. Everyone starts somewhere.",
  },
  {
    icon: Briefcase,
    title: "Working Professionals",
    description:
      "Early bird classes before work, evening sessions, and a clear structure that fits your schedule.",
  },
  {
    icon: Baby,
    title: "Children & Teens",
    description:
      "Age-appropriate classes that build confidence, focus, and social skills through fun.",
  },
  {
    icon: Trophy,
    title: "Competitors",
    description:
      "Structured competition prep with experienced coaches who actively compete themselves.",
  },
];

export default function ForWhoSection() {
  return (
    <section className="bg-brand-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Who Is This For?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Joshimitsu BJJ welcomes everyone — from curious first-timers to
            seasoned grapplers looking for a new home.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 transition-colors hover:border-brand-blue/50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/20">
                <Icon className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
