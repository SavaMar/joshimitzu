"use client";

import {
  getPackageOptionsForType,
  isFamilyType,
  labelToPackageIds,
  packagesToLabel,
} from "@/lib/package-options";
import type { ApplicantType } from "@/lib/trial-form";

export default function PackageSelector({
  applicantType,
  value,
  onChange,
}: {
  applicantType: ApplicantType | "";
  value: string;
  onChange: (label: string) => void;
}) {
  const options = getPackageOptionsForType(applicantType);
  const isFamily = isFamilyType(applicantType);
  const selectedIds = labelToPackageIds(value);

  const toggleFamilyPackage = (id: string) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];
    onChange(packagesToLabel(next));
  };

  if (isFamily) {
    const grouped = options.reduce<Record<string, typeof options>>((acc, opt) => {
      if (!acc[opt.category]) acc[opt.category] = [];
      acc[opt.category].push(opt);
      return acc;
    }, {});

    return (
      <div className="w-full space-y-3">
        <span className="text-sm font-medium text-gray-700">
          Packages purchased <span className="text-brand-blue">*</span>
        </span>
        <p className="text-xs text-gray-500">
          Select one package per person (e.g. adult + youth for parent and child).
        </p>
        {Object.entries(grouped).map(([category, opts]) => (
          <div key={category}>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
              {category}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {opts.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                    selectedIds.includes(opt.id)
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(opt.id)}
                    onChange={() => toggleFamilyPackage(opt.id)}
                    className="h-4 w-4 rounded border-gray-300 text-green-600"
                  />
                  {opt.label.replace(`${category} — `, "")}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <label className="w-full text-sm">
      <span className="font-medium text-gray-700">
        Package purchased <span className="text-brand-blue">*</span>
      </span>
      <select
        value={selectedIds[0] ?? ""}
        onChange={(e) => {
          const opt = options.find((o) => o.id === e.target.value);
          onChange(opt?.label ?? "");
        }}
        className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
      >
        <option value="">Select a package...</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
