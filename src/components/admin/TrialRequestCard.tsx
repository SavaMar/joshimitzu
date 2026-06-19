"use client";

import { useState } from "react";
import {
  Archive,
  Calendar,
  ChevronDown,
  ChevronUp,
  UserCheck,
} from "lucide-react";
import type { TrialApplication } from "@/lib/admin-types";
import type { ChildInfo } from "@/lib/trial-form";
import { useAdminStore } from "@/lib/admin-store";
import PackageSelector from "@/components/admin/PackageSelector";
import { isFamilyType, labelToPackageIds } from "@/lib/package-options";
import {
  getEffectiveTrialStatus,
  statusColor,
  statusLabel,
} from "@/lib/admin-utils";

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div className="grid gap-1 sm:grid-cols-3 sm:gap-4">
      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </dt>
      <dd className="text-sm text-gray-700 sm:col-span-2">{value}</dd>
    </div>
  );
}

export default function TrialRequestCard({
  application,
  showActions = true,
}: {
  application: TrialApplication;
  showActions?: boolean;
}) {
  const { scheduleTrial, makeMember, archiveTrial } = useAdminStore();
  const [expanded, setExpanded] = useState(false);
  const [action, setAction] = useState<
    "schedule" | "member" | null
  >(null);
  const [date, setDate] = useState(application.scheduledTrialDate ?? "");
  const [memberPackage, setMemberPackage] = useState(
    application.memberPackage ?? "",
  );

  const effective = getEffectiveTrialStatus(application);
  const d = application.data;
  const isFollowUp = effective === "follow_up";

  return (
    <div
      className={`rounded-2xl border bg-white p-5 shadow-sm ${
        isFollowUp ? "border-amber-400 bg-amber-50/50" : "border-gray-200"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-brand-black">
              {d.first_name} {d.last_name}
            </h3>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor(effective)}`}
            >
              {statusLabel(effective)}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-600">
            {d.applicant_type} · {d.email} · {d.phone}
          </p>
          {application.scheduledTrialDate && (
            <p className="mt-1 text-sm font-medium text-brand-blue-dark">
              Trial:{" "}
              {new Date(application.scheduledTrialDate).toLocaleDateString(
                "en-CH",
              )}
            </p>
          )}
          {application.memberPackage && (
            <p className="mt-1 text-sm font-medium text-green-700">
              Package: {application.memberPackage}
            </p>
          )}
          {isFollowUp && (
            <p className="mt-2 text-sm font-medium text-amber-800">
              Trial date passed — reschedule, convert to member, or archive.
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1 text-sm font-medium text-brand-blue-dark hover:underline"
        >
          {expanded ? "Hide" : "View"} answers
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      </div>

      {expanded && (
        <dl className="mt-4 space-y-3 border-t border-gray-100 pt-4">
          <DetailRow label="Submitted" value={new Date(application.submittedAt).toLocaleString("en-CH")} />
          <DetailRow label="Type" value={d.applicant_type} />
          <DetailRow label="Best time to reach" value={d.best_time_to_reach} />
          <DetailRow label="WhatsApp preferred" value={d.whatsapp_preferred ? "Yes" : "No"} />
          <DetailRow label="Read about BJJ" value={d.has_read_about_bjj === null ? "—" : d.has_read_about_bjj ? "Yes" : "No"} />
          <DetailRow label="Found via" value={d.found_via.join(", ") || "—"} />
          <DetailRow label="Experience" value={d.has_martial_arts_experience === null ? "—" : d.has_martial_arts_experience ? `Yes — ${d.belt ?? d.belt_other ?? "belt not specified"}` : "No"} />
          <DetailRow label="Adult goals" value={d.adult_goals.join(", ") || "—"} />
          <DetailRow label="Kid goals" value={d.kid_goals.join(", ") || "—"} />
          <DetailRow label="Goals (other)" value={d.adult_goals_other || d.kid_goals_other || "—"} />
          {d.children.length > 0 && (
            <DetailRow
              label="Children"
              value={d.children
                .map(
                  (c: ChildInfo) =>
                    `${c.firstName} ${c.lastName} (${c.ageBand} years)`,
                )
                .join("; ")}
            />
          )}
          <DetailRow label="Notes" value={d.additional_notes} />
        </dl>
      )}

      {showActions && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
          {action === "schedule" ? (
            <div className="flex w-full flex-wrap items-end gap-2">
              <label className="flex-1 text-sm">
                <span className="font-medium text-gray-700">Trial date</span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
              </label>
              <button
                type="button"
                onClick={() => {
                  if (date) {
                    scheduleTrial(application.id, date);
                    setAction(null);
                  }
                }}
                className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-dark"
              >
                Save date
              </button>
              <button
                type="button"
                onClick={() => setAction(null)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600"
              >
                Cancel
              </button>
            </div>
          ) : action === "member" ? (
            <div className="flex w-full flex-col gap-3">
              <PackageSelector
                applicantType={d.applicant_type}
                value={memberPackage}
                onChange={setMemberPackage}
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const ids = labelToPackageIds(memberPackage);
                    const valid = isFamilyType(d.applicant_type)
                      ? ids.length >= 1
                      : ids.length === 1;
                    if (valid) {
                      makeMember(application.id, memberPackage.trim());
                      setAction(null);
                    }
                  }}
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                >
                  Confirm member
                </button>
                <button
                  type="button"
                  onClick={() => setAction(null)}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setAction("schedule")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand-blue px-3 py-2 text-sm font-semibold text-white hover:bg-brand-blue-dark"
              >
                <Calendar className="h-4 w-4" />
                {isFollowUp ? "Reschedule trial" : "Schedule trial"}
              </button>
              <button
                type="button"
                onClick={() => setAction("member")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
              >
                <UserCheck className="h-4 w-4" />
                Make member
              </button>
              <button
                type="button"
                onClick={() => archiveTrial(application.id)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <Archive className="h-4 w-4" />
                Archive
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
