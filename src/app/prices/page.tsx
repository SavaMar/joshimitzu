import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import PricePackCard from "@/components/PricePackCard";
import { pricingCategories } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Prices",
  description:
    "Membership prices for adult, youth, and kids minis BJJ training at Joshimitsu BJJ in Biberist, Switzerland.",
};

const accentStyles = {
  blue: "bg-brand-blue/10 text-brand-blue-dark",
  green: "bg-[#D9F0E0] text-[#166534]",
  purple: "bg-[#EDE4F7] text-[#6B21A8]",
};

export default function PricesPage() {
  return (
    <>
      <PageHeader
        title="Membership Prices"
        subtitle="Honest pricing for every age and commitment level — no hidden fees, just clear value on the mats."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/about_1.jpg"
              alt="Adult BJJ training at Joshimitsu"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-4 text-gray-700">
            <h2 className="text-2xl font-bold text-brand-black">
              Training for Every Stage of Life
            </h2>
            <p>
              Whether you&apos;re an adult looking for fitness and community, a
              teenager building confidence, or a parent introducing your little
              one to movement — we have a program and a price that fits.
            </p>
            <p>
              All memberships include structured coaching, a safe training
              environment, and access to our welcoming team. Not sure yet? Start
              with a free trial — no commitment required.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/kids-training"
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gray"
              >
                Learn About Kids Training
              </Link>
              <Link
                href="/trial-training"
                className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
              >
                Book Free Trial
              </Link>
            </div>
          </div>
        </div>

        {pricingCategories.map((category, index) => (
          <section
            key={category.id}
            id={category.id}
            className={index > 0 ? "mt-24" : "mt-20"}
          >
            <div className="mb-10 max-w-3xl">
              <span
                className={`inline-block rounded-full px-4 py-1 text-sm font-semibold ${accentStyles[category.accent]}`}
              >
                {category.subtitle}
              </span>
              <h2 className="mt-4 text-3xl font-bold text-brand-black">
                {category.title}
              </h2>
              <p className="mt-3 text-gray-600">{category.description}</p>
            </div>

            <div
              className={`grid gap-6 ${
                category.packs.length === 2
                  ? "sm:grid-cols-2 lg:max-w-3xl"
                  : "sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {category.packs.map((pack) => (
                <PricePackCard key={pack.term} pack={pack} />
              ))}
            </div>
          </section>
        ))}

        <div className="mt-24 rounded-2xl bg-brand-black p-8 text-center text-white sm:p-12">
          <h2 className="text-2xl font-bold">Not sure which plan is right?</h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-400">
            Come for a free trial first. We&apos;ll help you find the right
            program and membership once you&apos;ve experienced the mats.
          </p>
          <Link
            href="/trial-training"
            className="mt-6 inline-block rounded-lg bg-brand-blue px-8 py-3 font-semibold text-white transition-colors hover:bg-brand-blue-dark"
          >
            Apply for Trial
          </Link>
        </div>
      </div>
    </>
  );
}
