import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "What is BJJ?",
  description:
    "Learn about Brazilian Jiu Jitsu — its history, benefits, and why it's one of the fastest-growing martial arts in the world.",
};

export default function WhatIsBjjPage() {
  return (
    <>
      <PageHeader
        title="What is Brazilian Jiu Jitsu?"
        subtitle="A complete guide to the art that changed martial arts forever."
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <p>
            Brazilian Jiu Jitsu (BJJ) is a grappling-based martial art that
            focuses on ground fighting, leverage, and technique over brute
            strength. Originating from Judo and refined in Brazil, BJJ teaches
            practitioners how to control and submit opponents using joint locks
            and chokeholds.
          </p>

          <h2 className="text-2xl font-bold text-brand-black">A Brief History</h2>
          <p>
            BJJ traces its roots to Mitsuyo Maeda, a Japanese Judoka who traveled
            to Brazil in the early 1900s. The Gracie family adapted and evolved
            his teachings, creating a distinct art focused on ground combat.
          </p>
          <p>
            The world took notice at UFC 1 in 1993, when Royce Gracie — a
            relatively small man — defeated much larger opponents using pure
            technique. Since then, BJJ has exploded globally and become an
            essential foundation for mixed martial arts.
          </p>

          <h2 className="text-2xl font-bold text-brand-black">Gi vs. No-Gi</h2>
          <p>
            <strong>Gi training</strong> is done in a traditional kimono (gi),
            which allows for grips on the fabric. It emphasizes patience,
            control, and a wider range of techniques.
          </p>
          <p>
            <strong>No-Gi training</strong> is done in rash guards and shorts,
            without the gi grips. It tends to be faster-paced and translates
            well to MMA and self-defense scenarios.
          </p>

          <h2 className="text-2xl font-bold text-brand-black">Why Train BJJ?</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Practical self-defense for real-world situations</li>
            <li>Full-body fitness without monotonous gym routines</li>
            <li>Mental challenge that keeps you engaged</li>
            <li>A supportive community of training partners</li>
            <li>Stress relief and improved mental clarity</li>
            <li>Confidence that comes from real skill development</li>
          </ul>

          <h2 className="text-2xl font-bold text-brand-black">The Belt System</h2>
          <p>
            BJJ uses a belt ranking system: white, blue, purple, brown, and
            black. Progress is earned through consistent training and
            demonstrated skill — there are no shortcuts. Each belt represents
            years of dedication and growth.
          </p>
        </div>

        <div className="mt-12 rounded-2xl bg-brand-blue/10 p-8 text-center">
          <h3 className="text-xl font-bold text-brand-black">
            Ready to experience BJJ firsthand?
          </h3>
          <p className="mt-2 text-gray-600">
            Book a free trial class and see what it&apos;s all about.
          </p>
          <Link
            href="/trial-training"
            className="mt-6 inline-block rounded-lg bg-brand-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-blue-dark"
          >
            Book Free Trial
          </Link>
        </div>
      </div>
    </>
  );
}
