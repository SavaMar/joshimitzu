import {
  weeklySchedule,
  type ClassLevel,
  type ClassType,
  type ScheduleClass,
  type ScheduleDay,
} from "@/lib/site-config";

const cardStyles: Record<ClassType, string> = {
  Nogi: "bg-[#EDE4F7]",
  Gi: "bg-[#D9F0E0]",
  Sparring: "bg-[#D9E8F5]",
};

const levelBadgeStyles: Record<ClassLevel, string> = {
  "All levels": "bg-[#9B7FD4] text-white",
  "Level 1": "bg-[#9CA3AF] text-white",
  "Level 2": "bg-[#9CA3AF] text-white",
  Basics: "bg-[#22C55E] text-white",
  "Members only": "bg-[#9CA3AF] text-white",
};

function LevelBadge({ level }: { level: ClassLevel }) {
  return (
    <span
      className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold ${levelBadgeStyles[level]}`}
    >
      {level}
    </span>
  );
}

function ClassCard({
  cls,
  layout,
}: {
  cls: ScheduleClass;
  layout: "mobile" | "desktop";
}) {
  return (
    <div className={`rounded-xl px-3 py-2.5 ${cardStyles[cls.type]}`}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-bold text-brand-black">{cls.type}</span>
        <LevelBadge level={cls.level} />
      </div>

      {layout === "mobile" ? (
        <p className="mt-1.5 text-xs text-brand-black">
          {cls.time}
          {cls.category === "Kids" ? (
            <span className="ml-1.5 inline-block rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-[#22C55E]">
              Kids
            </span>
          ) : (
            <span className="ml-1">{cls.category}</span>
          )}
        </p>
      ) : (
        <div className="mt-1.5 flex items-center justify-between gap-2 text-xs text-brand-black">
          <span>{cls.time}</span>
          <span
            className={
              cls.category === "Kids"
                ? "font-semibold text-[#22C55E]"
                : undefined
            }
          >
            {cls.category}
          </span>
        </div>
      )}
    </div>
  );
}

function DayColumn({
  day,
  layout,
}: {
  day: ScheduleDay;
  layout: "mobile" | "desktop";
}) {
  return (
    <div>
      <div className="rounded-xl bg-brand-black px-4 py-3 text-center text-sm font-semibold text-white">
        {day.day}
      </div>
      <div className="mt-2 space-y-2">
        {day.classes.map((cls, i) => (
          <ClassCard key={`${cls.time}-${i}`} cls={cls} layout={layout} />
        ))}
      </div>
    </div>
  );
}

export default function ScheduleGrid() {
  return (
    <>
      <div className="mx-auto max-w-lg space-y-6 md:hidden">
        {weeklySchedule.map((day) => (
          <DayColumn key={day.day} day={day} layout="mobile" />
        ))}
      </div>

      <div className="hidden gap-3 md:grid md:grid-cols-5">
        {weeklySchedule.map((day) => (
          <DayColumn key={day.day} day={day} layout="desktop" />
        ))}
      </div>
    </>
  );
}

export function ScheduleLegend() {
  const items: { type: ClassType; label: string; color: string }[] = [
    { type: "Gi", label: "Gi", color: "bg-[#D9F0E0]" },
    { type: "Nogi", label: "No-Gi", color: "bg-[#EDE4F7]" },
    { type: "Sparring", label: "Sparring", color: "bg-[#D9E8F5]" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {items.map(({ type, label, color }) => (
        <div key={type} className="flex items-center gap-2 text-sm text-gray-600">
          <span className={`h-4 w-4 rounded ${color}`} />
          {label}
        </div>
      ))}
    </div>
  );
}
