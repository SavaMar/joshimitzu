import { pricingCategories } from "@/lib/site-config";
import type { ApplicantType } from "@/lib/trial-form";

export interface PackageOption {
  id: string;
  label: string;
  category: string;
}

export function buildPackageOptions(): PackageOption[] {
  return pricingCategories.flatMap((cat) =>
    cat.packs.map((pack) => ({
      id: `${cat.id}:${pack.term}`,
      label: `${cat.title} — ${pack.term}`,
      category: cat.title,
    })),
  );
}

export function getPackageOptionsForType(
  applicantType: ApplicantType | "",
): PackageOption[] {
  const all = buildPackageOptions();
  if (applicantType === "adult") {
    return all.filter((o) => o.id.startsWith("adult:"));
  }
  if (applicantType === "kids") {
    return all.filter(
      (o) => o.id.startsWith("youth:") || o.id.startsWith("minis:"),
    );
  }
  if (applicantType === "family") {
    return all.filter(
      (o) =>
        o.id.startsWith("adult:") ||
        o.id.startsWith("youth:") ||
        o.id.startsWith("minis:"),
    );
  }
  return all;
}

export function isFamilyType(applicantType: ApplicantType | ""): boolean {
  return applicantType === "family";
}

export function packagesToLabel(ids: string[]): string {
  const map = new Map(buildPackageOptions().map((o) => [o.id, o.label]));
  return ids.map((id) => map.get(id) ?? id).join(" + ");
}

export function labelToPackageIds(label: string): string[] {
  if (!label) return [];
  const options = buildPackageOptions();
  const parts = label.split(" + ");
  return parts
    .map((part) => options.find((o) => o.label === part)?.id)
    .filter((id): id is string => Boolean(id));
}
