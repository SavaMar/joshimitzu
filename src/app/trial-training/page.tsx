import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import TrialBookingWizard from "@/components/trial-booking/TrialBookingWizard";

export const metadata: Metadata = {
  title: "Trial Training",
  description:
    "Book your free trial training at Joshimitsu BJJ. No experience needed — just show up and we'll take care of the rest.",
};

export default function TrialTrainingPage() {
  return (
    <>
      <PageHeader
        title="Trial Training"
        subtitle="Your first step on the mats — free, no pressure, no experience required."
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8 text-gray-700">
          <div className="rounded-2xl border border-gray-200 bg-brand-gray p-8">
            <h2 className="text-xl font-bold text-brand-black">
              What to Expect
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>A warm welcome from the team and coach</li>
              <li>Introduction to basic movements and positions</li>
              <li>Partner work with an experienced student</li>
              <li>No sparring or fighting during your first visit</li>
              <li>Time to ask questions and learn about membership</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-black">
              &ldquo;I&apos;d like to try BJJ, but…&rdquo;
            </h2>
            <div className="mt-4 space-y-3">
              <p>
                <strong>I&apos;m not fit enough.</strong> — You don&apos;t need
                to be. BJJ builds fitness over time. Everyone starts at their
                own level.
              </p>
              <p>
                <strong>I&apos;m not flexible.</strong> — Flexibility comes with
                training. You&apos;ll improve naturally as you practice.
              </p>
              <p>
                <strong>I don&apos;t know anyone.</strong> — That&apos;s
                normal. Our community is welcoming, and you&apos;ll meet people
                from day one.
              </p>
              <p>
                <strong>I&apos;m worried about getting hurt.</strong> — Safety
                is our priority. Trial training is controlled and supervised.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-black">
              What to Bring
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Comfortable sportswear (no zippers or buttons)</li>
              <li>Water bottle</li>
              <li>Flip-flops for walking to the mat area</li>
              <li>Open mind and curiosity</li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <TrialBookingWizard />
        </div>
      </div>
    </>
  );
}
