import Link from "next/link";

export default function AboutBjjSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-brand-black sm:text-4xl">
              About Brazilian Jiu Jitsu
            </h2>
            <div className="mt-6 space-y-4 text-gray-600">
              <p>
                Brazilian Jiu Jitsu is one of the fastest-growing martial arts in
                the world. Since Royce Gracie showcased it at UFC 1 — defeating every
                opponent without throwing a single punch — BJJ has evolved from Brazil
                to a global community of practitioners.
              </p>
              <p>
                Today, BJJ encompasses Gi (kimono), No-Gi, MMA, and self-defense
                applications. New techniques, counters, and training methods emerge
                constantly, keeping the art alive and ever-evolving.
              </p>
              <p>
                At Joshimitsu BJJ, head coach Aljoscha Hilse trains under Cicero
                Costha black belt Silvio Cavans from Manaus, Brazil — bringing
                world-class lineage and competition experience to Solothurn.
              </p>
            </div>
            <Link
              href="/what-is-bjj"
              className="mt-8 inline-block rounded-lg border-2 border-brand-blue px-6 py-3 text-base font-semibold text-brand-blue-dark transition-colors hover:bg-brand-blue hover:text-white"
            >
              Learn More About BJJ
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Gi Training", desc: "Traditional kimono-based grappling" },
              { label: "No-Gi", desc: "Fast-paced training in rash guards" },
              { label: "Self-Defense", desc: "Practical techniques for real situations" },
              { label: "Competition", desc: "Optional path for those who want to compete" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-gray-200 bg-brand-gray p-6"
              >
                <h3 className="font-bold text-brand-black">{item.label}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
