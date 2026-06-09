import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Data Protection",
  description: "Privacy policy and data protection information for Joshimitsu BJJ.",
};

export default function DataProtectionPage() {
  return (
    <>
      <PageHeader
        title="Data Protection"
        subtitle="How we handle and protect your personal data."
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-brand-black">
              1. Data Controller
            </h2>
            <p className="mt-3">
              {siteConfig.name}
              <br />
              {siteConfig.owner}
              <br />
              {siteConfig.address.street}
              <br />
              {siteConfig.address.city}, {siteConfig.address.country}
              <br />
              Email: {siteConfig.email}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-black">
              2. Data We Collect
            </h2>
            <p className="mt-3">
              We may collect personal data when you contact us, book a trial
              training, or subscribe to our communications. This may include your
              name, email address, phone number, and any information you provide
              in messages or forms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-black">
              3. Purpose of Processing
            </h2>
            <p className="mt-3">
              We use your data to respond to inquiries, schedule trial
              trainings, manage memberships, and send relevant information about
              our classes and events. We do not sell your data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-black">
              4. Your Rights
            </h2>
            <p className="mt-3">
              Under applicable data protection law (including the Swiss FADP and
              GDPR where applicable), you have the right to access, correct,
              delete, or restrict processing of your personal data. Contact us at{" "}
              {siteConfig.email} to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-black">
              5. Cookies & Analytics
            </h2>
            <p className="mt-3">
              This website may use cookies and analytics tools to improve user
              experience. You can manage cookie preferences through your browser
              settings. Detailed cookie policy will be updated when analytics are
              configured.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-black">
              6. Contact
            </h2>
            <p className="mt-3">
              For any questions regarding data protection, please contact us at{" "}
              <a
                href={siteConfig.social.email}
                className="text-brand-blue-dark hover:underline"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
