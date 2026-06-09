import Link from "next/link";
import { schedule } from "@/lib/site-config";

export default function ScheduleSection() {
  return (
    <section className="bg-brand-gray py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-brand-black sm:text-4xl">
            Training Schedule
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Early bird classes before work and evening sessions for all levels.
            Find a time that works for you.
          </p>
        </div>

        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-brand-black text-white">
                  <th className="px-6 py-4 text-sm font-semibold">Day</th>
                  <th className="px-6 py-4 text-sm font-semibold">Time</th>
                  <th className="px-6 py-4 text-sm font-semibold">Type</th>
                  <th className="px-6 py-4 text-sm font-semibold">Class</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, i) => (
                  <tr
                    key={`${row.day}-${row.time}-${i}`}
                    className="border-b border-gray-100 last:border-0 hover:bg-brand-blue/5"
                  >
                    <td className="px-6 py-4 font-medium text-brand-black">
                      {row.day}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{row.time}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          row.type === "Gi"
                            ? "bg-brand-blue/10 text-brand-blue-dark"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {row.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/trial-training"
            className="inline-block rounded-lg bg-brand-blue px-8 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-brand-blue-dark"
          >
            Get Trial Training
          </Link>
        </div>
      </div>
    </section>
  );
}
