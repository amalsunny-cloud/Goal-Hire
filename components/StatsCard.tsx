interface StatsCardProps {
  title: string;
  value: string | number;
  tone?: "blue" | "indigo" | "violet" | "emerald" | "slate";
}

const toneClasses = {
  blue: "bg-blue-500 shadow-blue-500/25",
  indigo: "bg-indigo-500 shadow-indigo-500/25",
  violet: "bg-violet-500 shadow-violet-500/25",
  emerald: "bg-emerald-500 shadow-emerald-500/25",
  slate: "bg-slate-500 shadow-slate-500/25",
};

export default function StatsCard({
  title,
  value,
  tone = "blue",
}: StatsCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/30 transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">
      <div className="absolute inset-x-0 top-0 h-1" />
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </p>
        <span className="h-1.5 w-1.5 rounded-full shadow-[0_0_0_1px]" />
      </div>
      <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900">
        {value}
      </h2>
    </div>
  );
}
