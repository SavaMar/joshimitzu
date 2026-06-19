import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { kidsTraining, kidsTrainingBenefits } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Kids Training",
  description:
    "Brazilian Jiu-Jitsu for children at Joshimitsu BJJ — building confidence, focus, and social skills through fun, structured training.",
};

export default function KidsTrainingPage() {
  return (
    <>
      <PageHeader
        title="BJJ for Kids"
        subtitle="More than a sport — a development tool disguised as play. Kids love it, and parents love what it does for them."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={kidsTraining.heroImage}
              alt="Kids BJJ training at Joshimitsu"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="space-y-5 text-gray-700">
            <p>
              Martial arts with body contact helps children read other people
              and situations more accurately. That builds self-confidence and
              helps them navigate relationships with peers and adults.
            </p>
            <p>
              Learning to grapple doesn&apos;t mean using violence — it means
              understanding your own limits and those of others. Conflicts can
              be resolved without fear and without aggression.
            </p>
            <p>
              At Joshimitsu BJJ, children develop body awareness through
              complex movement patterns — introduced slowly, with care for each
              individual. BJJ is also a competition sport with rules, strategies,
              and the chance to push past frustration. But above all, it&apos;s
              genuinely fun.
            </p>
            <Link
              href="/trial-training"
              className="inline-block rounded-lg bg-brand-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-blue-dark"
            >
              Book Kids Trial
            </Link>
          </div>
        </div>

        <section className="mt-20">
          <h2 className="text-2xl font-bold text-brand-black">
            Why Parents Choose BJJ
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {kidsTrainingBenefits.map(({ title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-gray-200 bg-brand-gray p-6"
              >
                <h3 className="font-bold text-brand-black">{title}</h3>
                <p className="mt-2 text-sm text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-2xl font-bold text-brand-black">
            See It in Action
          </h2>
          <p className="mt-2 max-w-2xl text-gray-600">
            Watch our kids train, play, and grow on the mats. Follow us on
            Instagram for the latest clips from class.
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-5">
            <a
              href={kidsTraining.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative col-span-1 overflow-hidden rounded-2xl lg:col-span-3"
            >
              <div className="relative aspect-video">
                <Image
                  src={kidsTraining.videoPoster}
                  alt="Kids training video preview"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
                    <Play className="h-7 w-7 fill-brand-black text-brand-black" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-black/60 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                <ExternalLink className="h-4 w-4" />
                Watch on Instagram
              </div>
            </a>

            <div className="col-span-1 grid grid-cols-2 gap-3 lg:col-span-2 lg:grid-cols-1">
              {kidsTraining.galleryImages.map(({ src, alt }) => (
                <div
                  key={src}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl"
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 20vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-2xl border border-gray-200 bg-brand-gray p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold text-brand-black">
                Programs & Pricing
              </h2>
              <p className="mt-3 text-gray-600">
                We offer three age groups — Kids Minis (3–6), Youth (7–15), and
                Adult (16+). Each program is tailored to developmental stage,
                with classes scheduled throughout the week.
              </p>
              <p className="mt-3 text-gray-600">
                Children and teens pick up complex techniques naturally — they
                crawl, squat low, and wrestle with friends long before sitting
                at desks changes how they move. BJJ feels completely natural to
                them.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/prices"
                className="rounded-lg bg-brand-black px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-gray-800"
              >
                View Prices
              </Link>
              <Link
                href="/schedule"
                className="rounded-lg border border-gray-300 px-6 py-3 text-center font-semibold text-brand-black transition-colors hover:bg-white"
              >
                See Schedule
              </Link>
              <Link
                href="/trial-training"
                className="rounded-lg bg-brand-blue px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-brand-blue-dark"
              >
                Apply for Trial
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
