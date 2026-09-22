// StatsCard.tsx

import {
  BriefcaseBusiness,
  CheckCircle2,
  CircleDot,
  FileText,
  Gift,
  LucideIcon,
  MessageSquare,
  XCircle,
} from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  tone?: "blue" | "indigo" | "violet" | "emerald" | "slate";
}

const toneClasses = {
  blue: {
    icon: "bg-blue-50 text-blue-600",
    number: "text-slate-900",
  },
  indigo: {
    icon: "bg-indigo-50 text-indigo-600",
    number: "text-slate-900",
  },
  violet: {
    icon: "bg-violet-50 text-violet-600",
    number: "text-slate-900",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-600",
    number: "text-slate-900",
  },
  slate: {
    icon: "bg-slate-100 text-slate-500",
    number: "text-slate-900",
  },
};

const iconMap: Record<string, LucideIcon> = {
  Total: BriefcaseBusiness,
  Applied: FileText,
  Interview: MessageSquare,
  Offer: Gift,
  Rejected: XCircle,
};

export default function StatsCard({
  title,
  value,
  tone = "blue",
}: StatsCardProps) {
  const currentTone = toneClasses[tone];
  const Icon = iconMap[title] || CircleDot;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${currentTone.icon}`}
        >
          <Icon className="h-4 w-4" strokeWidth={2} />
        </div>
      </div>

      <div className="mt-5">
        <h2
          className={`text-3xl font-bold tracking-tight ${currentTone.number}`}
        >
          {value}
        </h2>
      </div>

      <div className="mt-3 h-px bg-slate-100" />

      <p className="mt-3 text-xs text-slate-400">
        {title} applications
      </p>
    </div>
  );
}