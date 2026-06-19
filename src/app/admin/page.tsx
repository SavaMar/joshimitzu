import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin panel for Joshimitsu BJJ website management.",
};

export default function AdminPage() {
  return (
    <>
      <PageHeader
        title="Admin Panel"
        subtitle="Manage trial requests, members, and events."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <AdminDashboard />
      </div>
    </>
  );
}
