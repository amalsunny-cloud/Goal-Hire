interface StatsCardProps {
  title: string;
  value: string | number;
  tone?: "blue" | "indigo" | "violet" | "emerald" | "slate";
}

const toneClasses = {
  blue: "bg-blue-50 text-blue-600",
  indigo: "bg-indigo-50 text-indigo-600",
  violet: "bg-violet-50 text-violet-600",
  emerald: "bg-emerald-50 text-emerald-600",
  slate: "bg-slate-100 text-slate-600",
};

export default function StatsCard({
  title,
  value,
  tone = "blue",
}: StatsCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/30 transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </p>
        <span className={`h-2.5 w-2.5 rounded-full ${toneClasses[tone]}`} />
      </div>
      <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
        {value}
      </h2>
    </div>
  );
}
