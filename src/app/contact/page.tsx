import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Joshimitsu BJJ in Biberist, Switzerland.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out to book a trial or ask any questions."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10">
                <MapPin className="h-6 w-6 text-brand-blue-dark" />
              </div>
              <div>
                <h3 className="font-bold text-brand-black">Address</h3>
                <p className="mt-1 text-gray-600">
                  {siteConfig.name}
                  <br />
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.city}
                  <br />
                  {siteConfig.address.country}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10">
                <Mail className="h-6 w-6 text-brand-blue-dark" />
              </div>
              <div>
                <h3 className="font-bold text-brand-black">Email</h3>
                <a
                  href={siteConfig.social.email}
                  className="mt-1 text-brand-blue-dark hover:underline"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10">
                <Phone className="h-6 w-6 text-brand-blue-dark" />
              </div>
              <div>
                <h3 className="font-bold text-brand-black">Phone / WhatsApp</h3>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="mt-1 block text-brand-blue-dark hover:underline"
                >
                  {siteConfig.phoneDisplay}
                </a>
                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-sm text-gray-600 hover:text-brand-blue-dark"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10">
                <span className="text-lg font-bold text-brand-blue-dark">@</span>
              </div>
              <div>
                <h3 className="font-bold text-brand-black">Owner</h3>
                <p className="mt-1 text-gray-600">{siteConfig.owner}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-brand-gray p-8">
            <h3 className="text-xl font-bold text-brand-black">
              Send Us a Message
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Form submission will be connected via Supabase. For now, please
              contact us directly via email or WhatsApp.
            </p>
            <form className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  disabled
                  placeholder="Your name"
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  disabled
                  placeholder="your@email.com"
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-400"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  disabled
                  placeholder="Your message..."
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-400"
                />
              </div>
              <button
                type="button"
                disabled
                className="w-full rounded-lg bg-gray-300 px-6 py-3 font-semibold text-gray-500"
              >
                Coming Soon (Supabase)
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
