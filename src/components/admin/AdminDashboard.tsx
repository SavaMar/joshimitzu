"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Archive,
  BarChart3,
  Calendar,
  ClipboardList,
  Users,
} from "lucide-react";
import { useAdminStore } from "@/lib/admin-store";
import {
  computeFunnelBuckets,
  computeFunnelTotals,
  type AnalyticsRange,
} from "@/lib/admin-analytics";
import { getEffectiveTrialStatus, sortActiveTrials } from "@/lib/admin-utils";
import TrialRequestCard from "@/components/admin/TrialRequestCard";
import EventManager from "@/components/admin/EventManager";
import FunnelAnalytics from "@/components/admin/FunnelAnalytics";

type Tab = "overview" | "requests" | "members" | "archive" | "events";

const tabs: { id: Tab; label: string; icon: typeof BarChart3 }[] = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "requests", label: "Active requests", icon: ClipboardList },
  { id: "members", label: "Members", icon: Users },
  { id: "archive", label: "Archive", icon: Archive },
  { id: "events", label: "Events", icon: Calendar },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [chartRange, setChartRange] = useState<AnalyticsRange>("7d");
  const { trialApplications, analytics } = useAdminStore();

  const funnelTotals = computeFunnelTotals(trialApplications, chartRange);
  const funnelBuckets = computeFunnelBuckets(trialApplications, chartRange);

  const active = sortActiveTrials(trialApplications);
  const members = trialApplications.filter((t) => t.status === "member");
  const archived = trialApplications.filter((t) => t.status === "archived");

  return (
    <div>
      <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800">
          Demo admin panel with local storage. Connect Supabase to persist data
          across devices and add authentication.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              tab === id
                ? "bg-brand-black text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
            {id === "requests" && analytics.followUpNeeded > 0 && (
              <span className="rounded-full bg-amber-500 px-1.5 py-0.5 text-xs text-white">
                {analytics.followUpNeeded}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-8">
          <FunnelAnalytics
            range={chartRange}
            onRangeChange={setChartRange}
            totals={funnelTotals}
            buckets={funnelBuckets}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total applied", value: analytics.totalApplied },
              { label: "Active requests", value: analytics.activeRequests },
              { label: "Members", value: analytics.members },
              { label: "Archived", value: analytics.archived },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm text-gray-500">{label}</p>
                <p className="mt-1 text-3xl font-bold text-brand-black">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <p className="text-sm text-amber-800">Follow-up needed</p>
              <p className="mt-1 text-2xl font-bold text-amber-900">
                {analytics.followUpNeeded}
              </p>
              <p className="mt-1 text-xs text-amber-700">
                Trial date passed — action required
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-sm text-gray-500">Upcoming events</p>
              <p className="mt-1 text-2xl font-bold text-brand-black">
                {analytics.upcomingEvents}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-sm text-gray-500">Event sign-ups</p>
              <p className="mt-1 text-2xl font-bold text-brand-black">
                {analytics.eventApplications}
              </p>
            </div>
          </div>

          {analytics.followUpNeeded > 0 && (
            <div>
              <h2 className="mb-4 text-lg font-bold text-amber-900">
                Needs follow-up
              </h2>
              <div className="space-y-4">
                {active
                  .filter((t) => getEffectiveTrialStatus(t) === "follow_up")
                  .map((app) => (
                    <TrialRequestCard key={app.id} application={app} />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "requests" && (
        <div className="space-y-4">
          {active.length === 0 ? (
            <p className="text-gray-500">No active requests.</p>
          ) : (
            active.map((app) => (
              <TrialRequestCard key={app.id} application={app} />
            ))
          )}
        </div>
      )}

      {tab === "members" && (
        <div className="space-y-4">
          {members.length === 0 ? (
            <p className="text-gray-500">No members yet.</p>
          ) : (
            members.map((app) => (
              <TrialRequestCard
                key={app.id}
                application={app}
                showActions={false}
              />
            ))
          )}
        </div>
      )}

      {tab === "archive" && (
        <div className="space-y-4">
          {archived.length === 0 ? (
            <p className="text-gray-500">Archive is empty.</p>
          ) : (
            archived.map((app) => (
              <TrialRequestCard
                key={app.id}
                application={app}
                showActions={false}
              />
            ))
          )}
        </div>
      )}

      {tab === "events" && <EventManager />}

      <div className="mt-12 text-center">
        <Link
          href="/"
          className="text-sm font-medium text-brand-blue-dark hover:underline"
        >
          &larr; Back to Website
        </Link>
      </div>
    </div>
  );
}
