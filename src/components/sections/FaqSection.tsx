"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/lib/site-config";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-brand-black sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-600">
            Common questions from people considering their first class.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 font-semibold text-brand-black">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-brand-blue transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-gray-100 px-6 py-4">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
