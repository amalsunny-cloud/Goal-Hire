// AnalyticsCard.tsx

import {
  BriefcaseBusiness,
  CircleCheck,
  Gift,
  MessageSquare,
  XCircle,
} from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
}

const iconMap = {
  "This Month": BriefcaseBusiness,
  "Interview Rate": MessageSquare,
  "Offer Rate": Gift,
  Rejected: XCircle,
};

export default function AnalyticsCard({
  title,
  value,
}: AnalyticsCardProps) {
  const Icon = iconMap[title as keyof typeof iconMap] || CircleCheck;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md sm:p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </h2>
      </div>

      <div className="mt-3 h-px bg-slate-100" />

      <p className="mt-3 text-xs text-slate-400">
        {title}
      </p>
    </div>
  );
}