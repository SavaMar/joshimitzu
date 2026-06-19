import type { TrialApplication } from "@/lib/admin-types";
import { startOfDay } from "@/lib/admin-utils";

export type AnalyticsRange = "7d" | "month" | "year";

export interface FunnelTotals {
  applied: number;
  trialed: number;
  stayed: number;
}

export interface FunnelBucket extends FunnelTotals {
  label: string;
}

function isTrialed(app: TrialApplication): boolean {
  if (app.status === "member") return true;
  if (!app.scheduledTrialDate) return false;
  return startOfDay(new Date(app.scheduledTrialDate)) <= startOfDay();
}

function isStayed(app: TrialApplication): boolean {
  return app.status === "member";
}

function inRange(date: string, start: Date, end: Date): boolean {
  const d = new Date(date);
  return d >= start && d <= end;
}

export function getRangeBounds(range: AnalyticsRange, now = new Date()): {
  start: Date;
  end: Date;
} {
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  if (range === "7d") {
    const start = new Date(now);
    start.setDate(start.getDate() - 6);
    start.setHours(0, 0, 0, 0);
    return { start, end };
  }

  if (range === "month") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    start.setHours(0, 0, 0, 0);
    return { start, end };
  }

  const start = new Date(now.getFullYear(), 0, 1);
  start.setHours(0, 0, 0, 0);
  return { start, end };
}

export function computeFunnelTotals(
  apps: TrialApplication[],
  range: AnalyticsRange,
  now = new Date(),
): FunnelTotals {
  const { start, end } = getRangeBounds(range, now);
  const inPeriod = apps.filter((a) => inRange(a.submittedAt, start, end));

  return {
    applied: inPeriod.length,
    trialed: inPeriod.filter(isTrialed).length,
    stayed: inPeriod.filter(isStayed).length,
  };
}

function formatDayLabel(date: Date): string {
  return date.toLocaleDateString("en-CH", { weekday: "short", day: "numeric" });
}

function formatMonthLabel(date: Date): string {
  return date.toLocaleDateString("en-CH", { month: "short" });
}

export function computeFunnelBuckets(
  apps: TrialApplication[],
  range: AnalyticsRange,
  now = new Date(),
): FunnelBucket[] {
  const { start, end } = getRangeBounds(range, now);

  if (range === "7d") {
    const buckets: FunnelBucket[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      const dayStart = startOfDay(day);
      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);

      const dayApps = apps.filter((a) => inRange(a.submittedAt, dayStart, dayEnd));
      buckets.push({
        label: formatDayLabel(day),
        applied: dayApps.length,
        trialed: dayApps.filter(isTrialed).length,
        stayed: dayApps.filter(isStayed).length,
      });
    }
    return buckets;
  }

  if (range === "month") {
    const buckets: FunnelBucket[] = [];
    const cursor = new Date(start);
    while (cursor <= end) {
      const weekStart = startOfDay(cursor);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);
      if (weekEnd > end) weekEnd.setTime(end.getTime());

      const weekApps = apps.filter((a) =>
        inRange(a.submittedAt, weekStart, weekEnd),
      );
      buckets.push({
        label: `W${Math.ceil(cursor.getDate() / 7)}`,
        applied: weekApps.length,
        trialed: weekApps.filter(isTrialed).length,
        stayed: weekApps.filter(isStayed).length,
      });
      cursor.setDate(cursor.getDate() + 7);
    }
    return buckets.length > 0 ? buckets : [{ label: "—", applied: 0, trialed: 0, stayed: 0 }];
  }

  const buckets: FunnelBucket[] = [];
  for (let m = 0; m < 12; m++) {
    const monthStart = new Date(now.getFullYear(), m, 1);
    const monthEnd = new Date(now.getFullYear(), m + 1, 0, 23, 59, 59, 999);
    if (monthEnd < start) continue;

    const monthApps = apps.filter((a) =>
      inRange(a.submittedAt, monthStart, monthEnd),
    );
    buckets.push({
      label: formatMonthLabel(monthStart),
      applied: monthApps.length,
      trialed: monthApps.filter(isTrialed).length,
      stayed: monthApps.filter(isStayed).length,
    });
  }
  return buckets;
}

export function conversionRate(part: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
}
