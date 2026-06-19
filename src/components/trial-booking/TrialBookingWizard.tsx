"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, User, Users, Baby } from "lucide-react";
import {
  adultBeginnerGoalOptions,
  adultExperiencedGoalOptions,
  ageBandOptions,
  beltOptions,
  countryCodes,
  emptyChild,
  foundViaOptions,
  initialTrialFormData,
  kidGoalOptions,
  reachTimeOptions,
  resizeChildren,
  serializeTrialForm,
  type ApplicantType,
  type ChildInfo,
  type TrialFormData,
  type WizardStep,
  formSteps,
  getActiveFormSteps,
  getNextStep,
  getPrevStep,
  shouldSkipDiscovery,
} from "@/lib/trial-form";
import { useAdminStore } from "@/lib/admin-store";

function Card({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      {title && (
        <h3 className="mb-6 text-xl font-bold text-brand-black">{title}</h3>
      )}
      {children}
    </div>
  );
}

function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: readonly { id: string; label: string }[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const toggle = (id: string) => {
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id],
    );
  };

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map(({ id, label }) => (
        <label
          key={id}
          className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
            selected.includes(id)
              ? "border-brand-blue bg-brand-blue/5 text-brand-black"
              : "border-gray-200 text-gray-700 hover:border-gray-300"
          }`}
        >
          <input
            type="checkbox"
            checked={selected.includes(id)}
            onChange={() => toggle(id)}
            className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
          />
          {label}
        </label>
      ))}
    </div>
  );
}

function YesNoButtons({
  value,
  onChange,
  yesLabel = "Yes",
  noLabel = "No",
}: {
  value: boolean | null;
  onChange: (v: boolean) => void;
  yesLabel?: string;
  noLabel?: string;
}) {
  return (
    <div className="flex gap-3">
      {[true, false].map((v) => (
        <button
          key={String(v)}
          type="button"
          onClick={() => onChange(v)}
          className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
            value === v
              ? "border-brand-blue bg-brand-blue text-white"
              : "border-gray-200 text-gray-700 hover:border-gray-300"
          }`}
        >
          {v ? yesLabel : noLabel}
        </button>
      ))}
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-brand-blue"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-brand-black outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-brand-black outline-none transition-colors focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
      />
    </label>
  );
}

function ChildFields({
  childList,
  onChange,
}: {
  childList: ChildInfo[];
  onChange: (next: ChildInfo[]) => void;
}) {
  const update = (index: number, field: keyof ChildInfo, value: string) => {
    const next = [...childList];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  return (
    <div className="space-y-6">
      {childList.map((child, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-100 bg-brand-gray/50 p-4"
        >
          {childList.length > 1 && (
            <p className="mb-3 text-sm font-semibold text-brand-black">
              Child {i + 1}
            </p>
          )}
          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-700">
                Age <span className="text-brand-blue">*</span>
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {ageBandOptions.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => update(i, "ageBand", value)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                      child.ageBand === value
                        ? "border-brand-blue bg-brand-blue text-white"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="First name"
                value={child.firstName}
                onChange={(v) => update(i, "firstName", v)}
                required
              />
              <TextField
                label="Last name"
                value={child.lastName}
                onChange={(v) => update(i, "lastName", v)}
                required
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function validateStep(step: WizardStep, data: TrialFormData): string | null {
  switch (step) {
    case "type":
      if (!data.applicantType) return "Please select who the trial is for.";
      return null;

    case "details":
      if (data.applicantType === "kids") {
        if (data.kidGoals.length === 0)
          return "Please select at least one expectation.";
        for (const child of data.children) {
          if (!child.ageBand || !child.firstName.trim() || !child.lastName.trim())
            return "Please fill in age and name for each child.";
        }
      }
      if (data.applicantType === "adult") {
        if (data.hasMartialArtsExperience === null)
          return "Please tell us about your martial arts experience.";
        if (data.hasMartialArtsExperience && !data.belt)
          return "Please select your belt rank.";
        if (data.hasMartialArtsExperience && data.belt === "other" && !data.beltOther.trim())
          return "Please specify your belt.";
        if (data.adultGoals.length === 0)
          return "Please select at least one goal.";
      }
      if (data.applicantType === "family") {
        if (data.adultCount < 1 || data.familyChildCount < 1)
          return "Please specify at least one adult and one child.";
        if (data.familyAdultGoals.length === 0)
          return "Please select at least one goal for the adult(s).";
        if (data.familyKidGoals.length === 0)
          return "Please select at least one goal for the child(ren).";
        for (const child of data.familyChildren) {
          if (!child.ageBand || !child.firstName.trim() || !child.lastName.trim())
            return "Please fill in age and name for each child.";
        }
      }
      return null;

    case "discovery":
      if (shouldSkipDiscovery(data)) return null;
      if (data.hasReadAboutBjj === null)
        return "Please let us know if you've read about jiu-jitsu.";
      if (data.foundVia.length === 0)
        return "Please tell us how you found us.";
      return null;

    case "contact":
      if (!data.firstName.trim() || !data.lastName.trim())
        return "Please enter your name.";
      if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        return "Please enter a valid email address.";
      if (!data.phone.trim()) return "Please enter your phone number.";
      if (!data.bestTimeToReach) return "Please select the best time to reach you.";
      return null;

    default:
      return null;
  }
}

export default function TrialBookingWizard() {
  const { addTrialApplication } = useAdminStore();
  const [step, setStep] = useState<WizardStep>("intro");
  const [data, setData] = useState<TrialFormData>(initialTrialFormData);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof TrialFormData>(key: K, value: TrialFormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const activeFormSteps = getActiveFormSteps(data);
  const progressIndex = activeFormSteps.indexOf(step as (typeof formSteps)[number]);
  const showProgress = activeFormSteps.includes(step as (typeof formSteps)[number]);

  const goNext = () => {
    const err = validateStep(step, data);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    const next = getNextStep(step, data);
    if (next) setStep(next);
  };

  const goBack = () => {
    setError("");
    const prev = getPrevStep(step, data);
    if (prev) setStep(prev);
  };

  const handleSubmit = async () => {
    const err = validateStep("contact", data);
    if (err) {
      setError(err);
      return;
    }
    setSubmitting(true);
    setError("");

    const payload = serializeTrialForm(data);
    addTrialApplication(payload);

    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setStep("success");
  };

  const typeOptions: {
    value: ApplicantType;
    label: string;
    desc: string;
    icon: typeof User;
  }[] = [
    {
      value: "adult",
      label: "Adult (18+)",
      desc: "I'm booking for myself",
      icon: User,
    },
    {
      value: "kids",
      label: "Kid / Kids",
      desc: "I'm a parent booking for my child(ren)",
      icon: Baby,
    },
    {
      value: "family",
      label: "Family",
      desc: "Parent with child — we want to train together",
      icon: Users,
    },
  ];

  if (step === "intro") {
    return (
      <div className="space-y-8">
        <blockquote className="rounded-2xl border-l-4 border-brand-blue bg-brand-gray px-6 py-8 text-lg leading-relaxed text-gray-700 italic">
          <p>For people who know that comfort alone is not enough.</p>
          <p className="mt-4">
            For people who are not interested in proving who they are, but in
            becoming who they can be.
          </p>
          <p className="mt-4">
            For people who believe that character is built by facing difficult
            things, not avoiding them.
          </p>
        </blockquote>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setStep("type")}
            className="rounded-lg bg-brand-blue px-8 py-3.5 text-base font-semibold text-white shadow-md transition-colors hover:bg-brand-blue-dark"
          >
            Book Trial
          </button>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <Card title="Thank you — we'll be in touch">
        <div className="flex flex-col items-center py-6 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue/10">
            <Check className="h-8 w-8 text-brand-blue-dark" />
          </div>
          <p className="max-w-md text-gray-600">
            We&apos;ve received your request, {data.firstName}. We&apos;ll reach
            out during your preferred time to schedule your trial session.
          </p>
          <Link
            href="/"
            className="mt-8 rounded-lg bg-brand-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Back to Home
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {showProgress && (
        <div>
          <div className="mb-2 flex justify-between text-xs font-medium text-gray-500">
            <span>Step {progressIndex + 1} of {activeFormSteps.length}</span>
            <span>{Math.round(((progressIndex + 1) / activeFormSteps.length) * 100)}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-brand-blue transition-all duration-300"
              style={{
                width: `${((progressIndex + 1) / activeFormSteps.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {step === "type" && (
        <Card title="Who is the trial for?">
          <div className="grid gap-3">
            {typeOptions.map(({ value, label, desc, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => update("applicantType", value)}
                className={`flex items-start gap-4 rounded-xl border p-5 text-left transition-colors ${
                  data.applicantType === value
                    ? "border-brand-blue bg-brand-blue/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    data.applicantType === value
                      ? "bg-brand-blue text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-brand-black">{label}</p>
                  <p className="mt-0.5 text-sm text-gray-600">{desc}</p>
                </div>
              </button>
            ))}
          </div>
        </Card>
      )}

      {step === "details" && data.applicantType === "kids" && (
        <Card title="About your child(ren)">
          <div className="space-y-8">
            <div>
              <span className="text-sm font-medium text-gray-700">
                How many children? <span className="text-brand-blue">*</span>
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => {
                      update("childCount", n);
                      update("children", resizeChildren(n, data.children));
                    }}
                    className={`rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors ${
                      data.childCount === n
                        ? "border-brand-blue bg-brand-blue text-white"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <ChildFields
              childList={data.children}
              onChange={(next) => update("children", next)}
            />

            <div>
              <p className="mb-3 text-sm font-medium text-gray-700">
                What do you hope your child will gain?{" "}
                <span className="text-brand-blue">*</span>
              </p>
              <CheckboxGroup
                options={kidGoalOptions}
                selected={data.kidGoals}
                onChange={(v) => update("kidGoals", v)}
              />
              <div className="mt-4">
                <TextArea
                  label="Anything else you'd like to share"
                  value={data.kidGoalsOther}
                  onChange={(v) => update("kidGoalsOther", v)}
                  placeholder="Tell us more about your expectations..."
                />
              </div>
            </div>
          </div>
        </Card>
      )}

      {step === "details" && data.applicantType === "adult" && (
        <Card title="About you">
          <div className="space-y-8">
            <div>
              <p className="mb-3 text-sm font-medium text-gray-700">
                Do you have experience in martial arts or BJJ?{" "}
                <span className="text-brand-blue">*</span>
              </p>
              <YesNoButtons
                value={data.hasMartialArtsExperience}
                onChange={(v) => {
                  update("hasMartialArtsExperience", v);
                  if (!v) {
                    update("belt", "");
                    update("beltOther", "");
                  }
                }}
              />
            </div>

            {data.hasMartialArtsExperience && (
              <div>
                <p className="mb-3 text-sm font-medium text-gray-700">
                  Which belt do you hold? <span className="text-brand-blue">*</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {beltOptions.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => update("belt", value)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                        data.belt === value
                          ? "border-brand-blue bg-brand-blue text-white"
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {data.belt === "other" && (
                  <div className="mt-4">
                    <TextField
                      label="Please specify"
                      value={data.beltOther}
                      onChange={(v) => update("beltOther", v)}
                      required
                    />
                  </div>
                )}
              </div>
            )}

            <div>
              <p className="mb-3 text-sm font-medium text-gray-700">
                What do you want to achieve?{" "}
                <span className="text-brand-blue">*</span>
              </p>
              <CheckboxGroup
                options={
                  data.hasMartialArtsExperience
                    ? [
                        ...adultBeginnerGoalOptions,
                        ...adultExperiencedGoalOptions,
                      ]
                    : adultBeginnerGoalOptions
                }
                selected={data.adultGoals}
                onChange={(v) => update("adultGoals", v)}
              />
              <div className="mt-4">
                <TextArea
                  label="Anything else in your own words"
                  value={data.adultGoalsOther}
                  onChange={(v) => update("adultGoalsOther", v)}
                  placeholder="Tell us what you're looking for..."
                />
              </div>
            </div>
          </div>
        </Card>
      )}

      {step === "details" && data.applicantType === "family" && (
        <Card title="About your family">
          <div className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <span className="text-sm font-medium text-gray-700">
                  How many adults? <span className="text-brand-blue">*</span>
                </span>
                <div className="mt-2 flex gap-2">
                  {[1, 2].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => update("adultCount", n)}
                      className={`flex-1 rounded-lg border py-2.5 text-sm font-semibold transition-colors ${
                        data.adultCount === n
                          ? "border-brand-blue bg-brand-blue text-white"
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">
                  How many children? <span className="text-brand-blue">*</span>
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => {
                        update("familyChildCount", n);
                        update(
                          "familyChildren",
                          resizeChildren(n, data.familyChildren),
                        );
                      }}
                      className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                        data.familyChildCount === n
                          ? "border-brand-blue bg-brand-blue text-white"
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <ChildFields
              childList={data.familyChildren}
              onChange={(next) => update("familyChildren", next)}
            />

            <div>
              <p className="mb-3 text-sm font-medium text-gray-700">
                What do the adult(s) want to achieve?{" "}
                <span className="text-brand-blue">*</span>
              </p>
              <CheckboxGroup
                options={[
                  ...adultBeginnerGoalOptions,
                  ...adultExperiencedGoalOptions,
                ]}
                selected={data.familyAdultGoals}
                onChange={(v) => update("familyAdultGoals", v)}
              />
              <div className="mt-4">
                <TextArea
                  label="Anything else for the adult(s)"
                  value={data.familyAdultGoalsOther}
                  onChange={(v) => update("familyAdultGoalsOther", v)}
                  placeholder="Tell us more..."
                />
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-gray-700">
                What do you hope your child(ren) will gain?{" "}
                <span className="text-brand-blue">*</span>
              </p>
              <CheckboxGroup
                options={kidGoalOptions}
                selected={data.familyKidGoals}
                onChange={(v) => update("familyKidGoals", v)}
              />
              <div className="mt-4">
                <TextArea
                  label="Anything else for the child(ren)"
                  value={data.familyKidGoalsOther}
                  onChange={(v) => update("familyKidGoalsOther", v)}
                  placeholder="Tell us more..."
                />
              </div>
            </div>
          </div>
        </Card>
      )}

      {step === "discovery" && (
        <Card title="Almost there">
          <div className="space-y-8">
            <div>
              <p className="mb-3 text-sm font-medium text-gray-700">
                Have you read about jiu-jitsu before applying?{" "}
                <span className="text-brand-blue">*</span>
              </p>
              <YesNoButtons
                value={data.hasReadAboutBjj}
                onChange={(v) => update("hasReadAboutBjj", v)}
              />
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-gray-700">
                How did you find us? <span className="text-brand-blue">*</span>
              </p>
              <CheckboxGroup
                options={foundViaOptions}
                selected={data.foundVia}
                onChange={(v) => update("foundVia", v)}
              />
            </div>
          </div>
        </Card>
      )}

      {step === "contact" && (
        <Card title="Your contact details">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="First name"
                value={data.firstName}
                onChange={(v) => update("firstName", v)}
                required
              />
              <TextField
                label="Last name"
                value={data.lastName}
                onChange={(v) => update("lastName", v)}
                required
              />
            </div>

            <TextField
              label="Email"
              type="email"
              value={data.email}
              onChange={(v) => update("email", v)}
              required
              placeholder="you@example.com"
            />

            <div>
              <span className="text-sm font-medium text-gray-700">
                Phone number <span className="text-brand-blue">*</span>
              </span>
              <div className="mt-1.5 flex gap-2">
                <select
                  value={data.countryCode}
                  onChange={(e) => update("countryCode", e.target.value)}
                  className="rounded-xl border border-gray-200 px-3 py-3 text-sm text-brand-black outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                >
                  {countryCodes.map(({ code, label }) => (
                    <option key={code} value={code}>
                      {label}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="76 598 50 53"
                  className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm text-brand-black outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                />
              </div>
              <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={data.whatsAppPreferred}
                  onChange={(e) => update("whatsAppPreferred", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                />
                I prefer to be contacted via WhatsApp
              </label>
            </div>

            <TextArea
              label="Is there anything else you'd like to tell us?"
              value={data.additionalNotes}
              onChange={(v) => update("additionalNotes", v)}
              placeholder="Optional — injuries, schedule preferences, questions..."
            />

            <div>
              <p className="mb-3 text-sm font-medium text-gray-700">
                When is the best time to reach you?{" "}
                <span className="text-brand-blue">*</span>
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {reachTimeOptions.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => update("bestTimeToReach", value)}
                    className={`rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                      data.bestTimeToReach === value
                        ? "border-brand-blue bg-brand-blue text-white"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-500">
              By submitting, you agree to the storage and processing of your
              data in accordance with our{" "}
              <Link
                href="/data-protection"
                className="text-brand-blue underline hover:text-brand-blue-dark"
                target="_blank"
              >
                privacy policy
              </Link>
              .
            </p>
          </div>
        </Card>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {step === "contact" ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Schedule a call"}
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
