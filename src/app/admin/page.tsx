import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Calendar,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin panel for Joshimitsu BJJ website management.",
};

const adminModules = [
  {
    icon: FileText,
    title: "Blog Posts",
    description: "Create, edit, and publish blog articles.",
    status: "Coming Soon",
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Manage upcoming seminars, open mats, and events.",
    status: "Coming Soon",
  },
  {
    icon: MessageSquare,
    title: "Contact Messages",
    description: "View and respond to contact form submissions.",
    status: "Coming Soon",
  },
  {
    icon: Users,
    title: "Reviews",
    description: "Manage student testimonials displayed on the site.",
    status: "Coming Soon",
  },
  {
    icon: Settings,
    title: "Site Settings",
    description: "Update schedule, contact info, and site content.",
    status: "Coming Soon",
  },
];

export default function AdminPage() {
  return (
    <>
      <PageHeader
        title="Admin Panel"
        subtitle="Website management dashboard — Supabase integration coming soon."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> This admin panel is currently open to everyone.
            Authentication and Supabase backend will be connected in a future update.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {adminModules.map(({ icon: Icon, title, description, status }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
                <Icon className="h-6 w-6 text-brand-blue-dark" />
              </div>
              <h2 className="text-lg font-bold text-brand-black">{title}</h2>
              <p className="mt-2 text-sm text-gray-600">{description}</p>
              <span className="mt-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                {status}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-brand-blue-dark hover:underline"
          >
            &larr; Back to Website
          </Link>
        </div>
      </div>
    </>
  );
}
