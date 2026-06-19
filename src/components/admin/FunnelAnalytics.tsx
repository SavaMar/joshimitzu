"use client";

import type { AnalyticsRange, FunnelBucket, FunnelTotals } from "@/lib/admin-analytics";
import { conversionRate } from "@/lib/admin-analytics";

const rangeLabels: Record<AnalyticsRange, string> = {
  "7d": "Last 7 days",
  month: "This month",
  year: "This year",
};

function FunnelBar({
  totals,
  max,
}: {
  totals: FunnelTotals;
  max: number;
}) {
  const scale = max > 0 ? max : 1;
  const bars = [
    { key: "applied", label: "Applied", value: totals.applied, color: "bg-brand-blue" },
    { key: "trialed", label: "Took trial", value: totals.trialed, color: "bg-violet-500" },
    { key: "stayed", label: "Stayed", value: totals.stayed, color: "bg-green-500" },
  ] as const;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {bars.map(({ key, label, value, color }) => (
        <div key={key} className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-2xl font-bold text-brand-black">{value}</p>
            </div>
            {key !== "applied" && totals.applied > 0 && (
              <span className="text-xs font-semibold text-gray-500">
                {conversionRate(value, totals.applied)}%
              </span>
            )}
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full ${color} transition-all duration-500`}
              style={{ width: `${Math.min(100, (value / scale) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function BucketChart({ buckets }: { buckets: FunnelBucket[] }) {
  const max = Math.max(
    1,
    ...buckets.flatMap((b) => [b.applied, b.trialed, b.stayed]),
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-4 flex flex-wrap gap-4 text-xs font-medium">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-brand-blue" /> Applied
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-violet-500" /> Took trial
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-green-500" /> Stayed
        </span>
      </div>
      <div className="flex items-end gap-2 overflow-x-auto pb-2 sm:gap-3">
        {buckets.map((bucket) => (
          <div
            key={bucket.label}
            className="flex min-w-[3rem] flex-1 flex-col items-center gap-1"
          >
            <div className="flex h-40 w-full items-end justify-center gap-0.5 sm:gap-1">
              <div
                className="w-2 rounded-t bg-brand-blue sm:w-3"
                style={{ height: `${(bucket.applied / max) * 100}%` }}
                title={`Applied: ${bucket.applied}`}
              />
              <div
                className="w-2 rounded-t bg-violet-500 sm:w-3"
                style={{ height: `${(bucket.trialed / max) * 100}%` }}
                title={`Trialed: ${bucket.trialed}`}
              />
              <div
                className="w-2 rounded-t bg-green-500 sm:w-3"
                style={{ height: `${(bucket.stayed / max) * 100}%` }}
                title={`Stayed: ${bucket.stayed}`}
              />
            </div>
            <span className="text-[10px] font-medium text-gray-500 sm:text-xs">
              {bucket.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FunnelAnalytics({
  range,
  onRangeChange,
  totals,
  buckets,
}: {
  range: AnalyticsRange;
  onRangeChange: (r: AnalyticsRange) => void;
  totals: FunnelTotals;
  buckets: FunnelBucket[];
}) {
  const maxTotal = Math.max(totals.applied, totals.trialed, totals.stayed, 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-brand-black">Trial funnel</h2>
        <div className="flex rounded-lg border border-gray-200 p-1">
          {(Object.keys(rangeLabels) as AnalyticsRange[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onRangeChange(r)}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
                range === r
                  ? "bg-brand-black text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {rangeLabels[r]}
            </button>
          ))}
        </div>
      </div>

      <FunnelBar totals={totals} max={maxTotal} />
      <BucketChart buckets={buckets} />
    </div>
  );
}
