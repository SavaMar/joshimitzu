export type ApplicantType = "adult" | "kids" | "family";
export type AgeBand = "6-9" | "10-13" | "14-17";
export type ReachTime = "late-morning" | "midday" | "afternoon" | "late-evening";
export type BeltRank = "white" | "blue" | "purple" | "brown" | "black" | "other";

export interface ChildInfo {
  firstName: string;
  lastName: string;
  ageBand: AgeBand | "";
}

export interface TrialFormData {
  applicantType: ApplicantType | "";

  childCount: number;
  children: ChildInfo[];
  kidGoals: string[];
  kidGoalsOther: string;

  hasMartialArtsExperience: boolean | null;
  belt: BeltRank | "";
  beltOther: string;
  adultGoals: string[];
  adultGoalsOther: string;

  adultCount: number;
  familyChildCount: number;
  familyChildren: ChildInfo[];
  familyAdultGoals: string[];
  familyAdultGoalsOther: string;
  familyKidGoals: string[];
  familyKidGoalsOther: string;

  hasReadAboutBjj: boolean | null;
  foundVia: string[];

  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  whatsAppPreferred: boolean;
  additionalNotes: string;
  bestTimeToReach: ReachTime | "";
}

export const emptyChild = (): ChildInfo => ({
  firstName: "",
  lastName: "",
  ageBand: "",
});

export const initialTrialFormData: TrialFormData = {
  applicantType: "",
  childCount: 1,
  children: [emptyChild()],
  kidGoals: [],
  kidGoalsOther: "",

  hasMartialArtsExperience: null,
  belt: "",
  beltOther: "",
  adultGoals: [],
  adultGoalsOther: "",

  adultCount: 1,
  familyChildCount: 1,
  familyChildren: [emptyChild()],
  familyAdultGoals: [],
  familyAdultGoalsOther: "",
  familyKidGoals: [],
  familyKidGoalsOther: "",

  hasReadAboutBjj: null,
  foundVia: [],

  firstName: "",
  lastName: "",
  email: "",
  countryCode: "+41",
  phone: "",
  whatsAppPreferred: false,
  additionalNotes: "",
  bestTimeToReach: "",
};

export const kidGoalOptions = [
  { id: "self-defence", label: "Self defence" },
  { id: "community", label: "Community feeling" },
  { id: "discipline", label: "Discipline" },
  { id: "connections", label: "Connections" },
  { id: "bullying", label: "Bullying problems" },
  { id: "fitness", label: "Fitness" },
  { id: "support-child", label: "Support my child" },
] as const;

export const adultBeginnerGoalOptions = [
  { id: "defend-myself", label: "Learn to defend myself" },
  { id: "try-something-new", label: "Try something new" },
  { id: "get-fit", label: "Get fit" },
  { id: "find-community", label: "Find community" },
] as const;

export const adultExperiencedGoalOptions = [
  { id: "push-my-game", label: "Push my game" },
  { id: "competitions", label: "Competitions" },
  { id: "continue-grow", label: "Continue to grow" },
] as const;

export const foundViaOptions = [
  { id: "facebook", label: "Facebook" },
  { id: "instagram", label: "Instagram" },
  { id: "google", label: "Google" },
  { id: "friend", label: "Friend recommendation" },
] as const;

export const ageBandOptions: { value: AgeBand; label: string }[] = [
  { value: "6-9", label: "6 – 9 years" },
  { value: "10-13", label: "10 – 13 years" },
  { value: "14-17", label: "14 – 17 years" },
];

export const beltOptions: { value: BeltRank; label: string }[] = [
  { value: "white", label: "White belt" },
  { value: "blue", label: "Blue belt" },
  { value: "purple", label: "Purple belt" },
  { value: "brown", label: "Brown belt" },
  { value: "black", label: "Black belt" },
  { value: "other", label: "Other" },
];

export const reachTimeOptions: { value: ReachTime; label: string }[] = [
  { value: "late-morning", label: "Late morning" },
  { value: "midday", label: "Midday" },
  { value: "afternoon", label: "Afternoon" },
  { value: "late-evening", label: "Late evening" },
];

export const countryCodes = [
  { code: "+41", label: "🇨🇭 +41" },
  { code: "+49", label: "🇩🇪 +49" },
  { code: "+43", label: "🇦🇹 +43" },
  { code: "+33", label: "🇫🇷 +33" },
  { code: "+39", label: "🇮🇹 +39" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+31", label: "🇳🇱 +31" },
  { code: "+32", label: "🇧🇪 +32" },
  { code: "+352", label: "🇱🇺 +352" },
];

export type WizardStep = "intro" | "type" | "details" | "discovery" | "contact" | "success";

export const formSteps: WizardStep[] = [
  "type",
  "details",
  "discovery",
  "contact",
];

export const wizardSteps: WizardStep[] = ["intro", ...formSteps];

export function shouldSkipDiscovery(data: TrialFormData): boolean {
  return (
    data.applicantType === "adult" &&
    data.hasMartialArtsExperience === true &&
    data.belt !== ""
  );
}

export function getActiveFormSteps(data: TrialFormData): WizardStep[] {
  if (shouldSkipDiscovery(data)) {
    return formSteps.filter((s) => s !== "discovery");
  }
  return formSteps;
}

export function getNextStep(
  current: WizardStep,
  data: TrialFormData,
): WizardStep | null {
  const steps = ["intro", ...getActiveFormSteps(data)] as WizardStep[];
  const idx = steps.indexOf(current);
  if (idx === -1 || idx >= steps.length - 1) return null;
  return steps[idx + 1];
}

export function getPrevStep(
  current: WizardStep,
  data: TrialFormData,
): WizardStep | null {
  const steps = ["intro", ...getActiveFormSteps(data)] as WizardStep[];
  const idx = steps.indexOf(current);
  if (idx <= 0) return null;
  return steps[idx - 1];
}

export function resizeChildren(count: number, current: ChildInfo[]): ChildInfo[] {
  const next = [...current];
  while (next.length < count) next.push(emptyChild());
  return next.slice(0, count);
}

/** Shape ready for future Supabase insert */
export interface SerializedTrialForm {
  applicant_type: TrialFormData["applicantType"];
  child_count: number;
  children: ChildInfo[];
  kid_goals: string[];
  kid_goals_other: string;
  has_martial_arts_experience: boolean | null;
  belt: BeltRank | null;
  belt_other: string | null;
  adult_goals: string[];
  adult_goals_other: string;
  adult_count: number;
  has_read_about_bjj: boolean | null;
  found_via: string[];
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  whatsapp_preferred: boolean;
  additional_notes: string | null;
  best_time_to_reach: ReachTime | "";
  submitted_at: string;
}

export function serializeTrialForm(data: TrialFormData): SerializedTrialForm {
  return {
    applicant_type: data.applicantType,
    child_count: data.applicantType === "kids" ? data.childCount : data.familyChildCount,
    children:
      data.applicantType === "kids"
        ? data.children
        : data.applicantType === "family"
          ? data.familyChildren
          : [],
    kid_goals: data.applicantType === "kids" ? data.kidGoals : data.familyKidGoals,
    kid_goals_other:
      data.applicantType === "kids" ? data.kidGoalsOther : data.familyKidGoalsOther,
    has_martial_arts_experience: data.hasMartialArtsExperience,
    belt: data.belt || null,
    belt_other: data.beltOther || null,
    adult_goals:
      data.applicantType === "adult"
        ? data.adultGoals
        : data.applicantType === "family"
          ? data.familyAdultGoals
          : [],
    adult_goals_other:
      data.applicantType === "adult"
        ? data.adultGoalsOther
        : data.familyAdultGoalsOther,
    adult_count: data.applicantType === "family" ? data.adultCount : 1,
    has_read_about_bjj: data.hasReadAboutBjj,
    found_via: data.foundVia,
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone: `${data.countryCode}${data.phone}`,
    whatsapp_preferred: data.whatsAppPreferred,
    additional_notes: data.additionalNotes || null,
    best_time_to_reach: data.bestTimeToReach,
    submitted_at: new Date().toISOString(),
  };
}
