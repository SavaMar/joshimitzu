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
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/30" />

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
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

        <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 sm:right-8 md:block lg:right-12">
          <SocialIcons vertical />
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center md:hidden">
        <SocialIcons />
      </div>
    </section>
  );
}
