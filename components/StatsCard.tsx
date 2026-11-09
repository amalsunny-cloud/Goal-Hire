// StatsCard.tsx

import {
  BriefcaseBusiness,
  CalendarCheck,
  CalendarClock,
  CheckCircle2,
  CircleDot,
  FileText,
  Gift,
  LucideIcon,
  MessageSquare,
  PhoneCall,
  Users,
  XCircle,
} from "lucide-react";

const iconMap = {
  Total: BriefcaseBusiness,
  Applied: FileText,
  Interview: MessageSquare,
  Offer: Gift,
  Rejected: XCircle,
  "Total Recruiters": Users,
  Communications: MessageSquare,
  "Contacted Today": PhoneCall,
  "Follow-up Today": CalendarClock,
  Overdue: CalendarCheck,
  "Contacted This Week": PhoneCall,
  "Top Method": CheckCircle2,
} as const;

interface StatsCardProps {
  title: keyof typeof iconMap;
  value: string | number;
  tone?: "sky" | "blue" | "indigo" | "cyan" | "slate";
  subtitle?: string;
}

const toneClasses = {
  sky: {
    bg: "bg-sky-100/60 border-sky-100 hover:border-sky-200",
    icon: "bg-sky-100 text-sky-600",
    number: "text-slate-900",
  },
  blue: {
    bg: "bg-blue-100/60 border-blue-100 hover:border-blue-200",
    icon: "bg-blue-100 text-blue-600",
    number: "text-slate-900",
  },
  indigo: {
    bg: "bg-indigo-100/60 border-indigo-100 hover:border-indigo-200",
    icon: "bg-indigo-100 text-indigo-600",
    number: "text-slate-900",
  },
  cyan: {
    bg: "bg-cyan-100/60 border-cyan-100 hover:border-cyan-200",
    icon: "bg-cyan-100 text-cyan-600",
    number: "text-slate-900",
  },
  slate: {
    bg: "bg-slate-100 border-slate-200 hover:border-slate-300",
    icon: "bg-slate-100 text-slate-600",
    number: "text-slate-900",
  },
};

export default function StatsCard({
  title,
  value,
  tone = "blue",
  subtitle,
}: StatsCardProps) {
  
  const currentTone = toneClasses[tone as keyof typeof toneClasses] || toneClasses.blue;
  const Icon = iconMap[title] || CircleDot;

  return (
    <div
      className={`rounded-2xl border p-4 shadow-sm transition-all duration-200 hover:shadow-md ${currentTone.bg}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${currentTone.icon}`}
        >
          <Icon className="h-4 w-4" strokeWidth={2} />
        </div>
      </div>

      <div className="mt-5">
        <h2 className={`text-3xl font-bold tracking-tight ${currentTone.number}`}>
          {value}
        </h2>
      </div>

      <div className="mt-3 h-px bg-slate-200/60" />

      <p className="mt-3 text-xs text-slate-400">
        {subtitle || `${title} overview`}
      </p>
    </div>
  );
}