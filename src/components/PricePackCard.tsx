import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import type { PricePack } from "@/lib/site-config";

interface PricePackCardProps {
  pack: PricePack;
}

export default function PricePackCard({ pack }: PricePackCardProps) {
  return (
    <div
      className={`flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${
        pack.highlighted
          ? "border-brand-blue ring-2 ring-brand-blue/20"
          : "border-gray-200"
      }`}
    >
      {pack.highlighted && (
        <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue-dark">
          <Sparkles className="h-3.5 w-3.5" />
          Most Popular
        </div>
      )}

      <div className="flex items-baseline justify-between gap-4">
        <p className="text-3xl font-bold text-brand-black">
          {pack.price} CHF
        </p>
        <p className="text-right text-sm font-semibold text-brand-black">
          {pack.term}
        </p>
      </div>

      <p className="mt-2 text-sm text-gray-500">{pack.audience}</p>

      {pack.discountedPrice && pack.discountedLabel && (
        <p className="mt-1 text-sm text-gray-600">
          {pack.discountedLabel}:{" "}
          <span className="font-semibold text-brand-black">
            {pack.discountedPrice} CHF
          </span>
        </p>
      )}

      <p className="mt-1 text-xs text-gray-400">
        + {pack.registrationFee} CHF registration fee
      </p>

      <div className="mt-6 space-y-4 flex-1">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-blue-dark">
            Why this plan
          </p>
          <p className="mt-1 text-sm text-gray-700">{pack.value}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-blue-dark">
            What you get
          </p>
          <ul className="mt-2 space-y-2">
            {pack.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-brand-gray p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            How you&apos;ll feel
          </p>
          <p className="mt-1 text-sm italic text-gray-700">{pack.feelAfter}</p>
        </div>
      </div>

      <Link
        href="/trial-training"
        className={`mt-6 block rounded-lg px-5 py-3 text-center text-sm font-semibold transition-colors ${
          pack.highlighted
            ? "bg-brand-blue text-white hover:bg-brand-blue-dark"
            : "bg-brand-black text-white hover:bg-gray-800"
        }`}
      >
        Apply for Trial
      </Link>
    </div>
  );
}
