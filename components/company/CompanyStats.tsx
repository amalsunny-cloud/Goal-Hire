"use client";

import { Recruiter } from "@/types/recruiter";
import { RecruiterCommunication } from "@/types/recruiterCommunication";
import {
  Users,
  Mail,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

interface Props {
  recruiters: Recruiter[];
  communications: RecruiterCommunication[];
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  badgeBg: string;
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  badgeBg,
}: StatCardProps) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs transition-all hover:shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl ${badgeBg}`}>
          {icon}
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {value}
        </p>
        {subtitle && (
          <span className="text-xs font-medium text-slate-500">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}

export default function CompanyStats({
  recruiters,
  communications,
}: Props) {
  const recruiterCount = recruiters.length;
  const communicationCount = communications.length;

  const responseCount = communications.filter(
    (communication) => communication.responded,
  ).length;

  const responseRate =
    communicationCount === 0
      ? 0
      : Math.round((responseCount / communicationCount) * 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      <StatCard
        title="Recruiters"
        value={recruiterCount}
        subtitle="Contacts linked"
        badgeBg="bg-blue-50 text-blue-600 border border-blue-100"
        icon={<Users className="w-5 h-5" />}
      />

      <StatCard
        title="Communications"
        value={communicationCount}
        subtitle="Interactions logged"
        badgeBg="bg-emerald-50 text-emerald-600 border border-emerald-100"
        icon={<Mail className="w-5 h-5" />}
      />

      <StatCard
        title="Responses"
        value={responseCount}
        subtitle="Replies received"
        badgeBg="bg-purple-50 text-purple-600 border border-purple-100"
        icon={<MessageCircle className="w-5 h-5" />}
      />

      <StatCard
        title="Response Rate"
        value={`${responseRate}%`}
        subtitle={responseRate >= 70 ? "High engagement" : responseRate >= 40 ? "Moderate" : "Needs outreach"}
        badgeBg="bg-amber-50 text-amber-600 border border-amber-100"
        icon={<TrendingUp className="w-5 h-5" />}
      />
    </div>
  );
}