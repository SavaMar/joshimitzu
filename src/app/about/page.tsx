import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Joshimitsu BJJ, our mission, and head coach Aljoscha Hilse in Biberist, Switzerland.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Joshimitsu BJJ"
        subtitle="Modern Brazilian Jiu-Jitsu in the heart of Solothurn, Switzerland."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/about_2.jpg"
              alt="Joshimitsu BJJ training"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-6 text-gray-700">
            <p>
              Joshimitsu BJJ is a Brazilian Jiu-Jitsu academy located in
              Biberist, Switzerland. Founded by Aljoscha Hilse, our school
              offers high-quality training for adults and children in a
              welcoming, professional environment.
            </p>
            <p>
              We believe in honest training, clear structure, and a strong
              team culture. Whether you&apos;re looking for self-defense,
              fitness, competition, or simply something new — you&apos;ll find a
              home on our mats.
            </p>
            <p>
              Our lineage connects to Cicero Costha black belt Silvio Cavans
              from Manaus, Brazil — one of the most respected competition teams
              in the world. This ensures our students learn from a proven,
              world-class system.
            </p>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-bold text-brand-black">
            Our Values
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Respect",
                desc: "For training partners, coaches, and the art itself.",
              },
              {
                title: "Growth",
                desc: "Continuous learning on and off the mats.",
              },
              {
                title: "Community",
                desc: "A team that supports every member's journey.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-gray-200 bg-brand-gray p-6"
              >
                <h3 className="font-bold text-brand-black">{value.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-brand-black p-8 text-white sm:p-12">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-xl font-bold">Location</h3>
              <p className="mt-2 text-gray-400">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.city}
                <br />
                {siteConfig.address.country}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Owner</h3>
              <p className="mt-2 text-gray-400">{siteConfig.owner}</p>
            </div>
          </div>
          <Link
            href="/trial-training"
            className="mt-8 inline-block rounded-lg bg-brand-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-blue-dark"
          >
            Join Us — Book a Trial
          </Link>
        </div>
      </div>
    </>
  );
}
