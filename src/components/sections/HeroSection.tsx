import Link from "next/link";
import Image from "next/image";
import SocialIcons from "@/components/SocialIcons";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="Joshimitsu BJJ team training"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/60 md:to-transparent" />

      {/* Social links — pinned to browser right edge, on white strip (not over photo) */}
      <div className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 md:block">
        <div className="flex flex-col items-center gap-4 border-l border-gray-100 bg-white/95 px-3 py-8 shadow-[-6px_0_16px_rgba(0,0,0,0.04)] backdrop-blur-sm">
          <SocialIcons vertical />
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-center px-4 sm:px-6 lg:px-8 md:pr-20">
        <div className="max-w-2xl py-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue-dark">
            Solothurn, Switzerland
          </p>
          <h1 className="text-4xl font-bold leading-tight text-brand-black sm:text-5xl lg:text-6xl">
            Welcome to{" "}
            <span className="text-brand-blue-dark">Joshimitsu BJJ</span>
          </h1>
          <p className="mt-6 text-lg text-gray-700 sm:text-xl">
            Brazilian Jiu-Jitsu for adults and children — modern, effective,
            athletic. Whether you want self-defense, fitness, or something new:
            find honest training, clear structure, and a strong team.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/trial-training"
              className="rounded-lg bg-brand-blue px-6 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-brand-blue-dark"
            >
              Book Free Trial
            </Link>
            <Link
              href="/what-is-bjj"
              className="rounded-lg border-2 border-brand-black px-6 py-3 text-base font-semibold text-brand-black transition-colors hover:bg-brand-black hover:text-white"
            >
              What is BJJ?
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 left-0 flex justify-end border-t border-gray-100 bg-white/95 px-4 py-3 backdrop-blur-sm md:hidden">
        <SocialIcons />
      </div>
    </section>
  );
}
