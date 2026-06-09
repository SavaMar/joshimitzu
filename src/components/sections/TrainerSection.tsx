"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { trainerPhotos } from "@/lib/site-config";

export default function TrainerSection() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? trainerPhotos.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === trainerPhotos.length - 1 ? 0 : c + 1));

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={trainerPhotos[current].src}
                alt={trainerPhotos[current].alt}
                fill
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-black shadow-md transition-colors hover:bg-brand-blue hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-black shadow-md transition-colors hover:bg-brand-blue hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="mt-4 flex justify-center gap-2">
              {trainerPhotos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to photo ${i + 1}`}
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === current
                      ? "w-8 bg-brand-blue"
                      : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue-dark">
              Head Coach
            </p>
            <h2 className="text-3xl font-bold text-brand-black sm:text-4xl">
              Aljoscha Hilse
            </h2>
            <div className="mt-6 space-y-4 text-gray-600">
              <p>
                Aljoscha Hilse is the founder and head coach of Joshimitsu BJJ in
                Biberist, Switzerland. He trains under Cicero Costha black belt
                Silvio Cavans from Manaus, Brazil — a lineage rooted in one of the
                most legendary competition teams in São Paulo.
              </p>
              <p>
                An active competitor and experienced instructor, Aljoscha
                continuously develops his skills through seminars with the world&apos;s
                best grapplers. His teaching emphasizes technique, connection, and
                a welcoming environment where every student can grow at their own
                pace.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
