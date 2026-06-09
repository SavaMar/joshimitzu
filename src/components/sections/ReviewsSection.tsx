import { Star } from "lucide-react";
import { reviews } from "@/lib/site-config";

export default function ReviewsSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-brand-black sm:text-4xl">
            What Our Students Say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Real feedback from people who walked through our doors — nervous,
            curious, and glad they came.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <blockquote
              key={review.name}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-brand-blue text-brand-blue"
                  />
                ))}
              </div>
              <p className="text-gray-700">&ldquo;{review.text}&rdquo;</p>
              <footer className="mt-4 text-sm font-semibold text-brand-black">
                — {review.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
