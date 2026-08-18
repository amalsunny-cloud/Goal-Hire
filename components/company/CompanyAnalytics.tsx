"use client";

import { CompanyInsight } from "@/types/companyInsight";
import {
  Building2,
  Users,
  Mail,
  Trophy,
  Activity,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface Props {
  companies: CompanyInsight[];
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
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs transition-all hover:shadow-sm hover:border-slate-300">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl border ${badgeBg}`}>
          {icon}
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {value}
        </p>
        {subtitle && (
          <span className="text-[11px] font-medium text-slate-500 shrink-0">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}

export default function CompanyAnalytics({ companies }: Props) {
  const totalCompanies = companies.length;

  const totalRecruiters = companies.reduce(
    (sum, company) => sum + company.recruiterCount,
    0,
  );

  const totalCommunications = companies.reduce(
    (sum, company) => sum + company.communicationCount,
    0,
  );

  const totalResponses = companies.reduce(
    (sum, company) => sum + company.responseCount,
    0,
  );

  const averageResponseRate =
    totalCompanies === 0
      ? 0
      : Math.round(
          companies.reduce((sum, company) => sum + company.responseRate, 0) /
            totalCompanies,
        );

  const activeCompanies = companies.filter(
    (company) => company.communicationCount > 0,
  ).length;

  const activeRatio =
    totalCompanies === 0
      ? 0
      : Math.round((activeCompanies / totalCompanies) * 100);

  // Best company by response rate (with at least 1 communication)
  const bestCompany =
    companies.filter((c) => c.communicationCount > 0).length > 0
      ? [...companies]
          .filter((c) => c.communicationCount > 0)
          .sort((a, b) => b.responseRate - a.responseRate)[0]
      : companies.length > 0
      ? companies[0]
      : null;

  // Most active company by communication volume
  const mostActiveCompany =
    companies.length > 0
      ? [...companies].sort(
          (a, b) => b.communicationCount - a.communicationCount,
        )[0]
      : null;

  const getMonogram = (name: string) =>
    name
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="space-y-6">
      {/* Primary KPI 6-Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
        <StatCard
          title="Companies"
          value={totalCompanies}
          subtitle="In pipeline"
          badgeBg="bg-blue-50 text-blue-600 border-blue-100"
          icon={<Building2 className="w-5 h-5" />}
        />

        <StatCard
          title="Recruiters"
          value={totalRecruiters}
          subtitle="Linked contacts"
          badgeBg="bg-emerald-50 text-emerald-600 border-emerald-100"
          icon={<Users className="w-5 h-5" />}
        />

        <StatCard
          title="Outreach"
          value={totalCommunications}
          subtitle="Messages logged"
          badgeBg="bg-purple-50 text-purple-600 border-purple-100"
          icon={<Mail className="w-5 h-5" />}
        />

        <StatCard
          title="Avg Response"
          value={`${averageResponseRate}%`}
          subtitle={
            averageResponseRate >= 50
              ? "Good engagement"
              : "Ongoing outreach"
          }
          badgeBg="bg-amber-50 text-amber-600 border-amber-100"
          icon={<TrendingUp className="w-5 h-5" />}
        />

        <StatCard
          title="Active Target"
          value={activeCompanies}
          subtitle={`${activeRatio}% engaged`}
          badgeBg="bg-rose-50 text-rose-600 border-rose-100"
          icon={<Activity className="w-5 h-5" />}
        />

        <StatCard
          title="Top Performer"
          value={bestCompany ? bestCompany.company : "N/A"}
          subtitle={bestCompany ? `${bestCompany.responseRate}% rate` : ""}
          badgeBg="bg-yellow-50 text-yellow-600 border-yellow-100"
          icon={<Trophy className="w-5 h-5" />}
        />
      </div>

      {/* Spotlight Highlights (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spotlight 1: Best Response Rate */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-yellow-50 text-yellow-600 rounded-xl border border-yellow-200/80">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Highest Response Rate Champion
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Best conversion from outreach to recruiter responses
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-50 text-yellow-700 border border-yellow-200">
                Top Rate
              </span>
            </div>

            {bestCompany ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-tr from-yellow-500/10 to-amber-500/20 text-yellow-700 font-extrabold text-base flex items-center justify-center border border-yellow-200/80 shadow-2xs">
                      {getMonogram(bestCompany.company)}
                    </div>
                    <div>
                      <h4 className="text-lg font-extrabold text-slate-900">
                        {bestCompany.company}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {bestCompany.recruiterCount} recruiters · {bestCompany.communicationCount} outreach logged
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-2xl font-black text-emerald-600">
                      {bestCompany.responseRate}%
                    </span>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Response Rate
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div className="flex justify-between text-xs font-medium text-slate-600">
                    <span>Replies Received</span>
                    <span className="font-bold text-slate-800">
                      {bestCompany.responseCount} of {bestCompany.communicationCount}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${bestCompany.responseRate}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-slate-400">
                No company response data available yet.
              </div>
            )}
          </div>

          {bestCompany && (
            <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
              <Link
                href={`/dashboard/company/${encodeURIComponent(bestCompany.company)}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                <span>View {bestCompany.company} Intelligence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Spotlight 2: Most Active Company */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-xl border border-purple-200/80">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Most Active Engagement Hub
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Highest volume of communication touchpoints
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                Most Active
              </span>
            </div>

            {mostActiveCompany ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-tr from-purple-500/10 to-indigo-500/20 text-purple-700 font-extrabold text-base flex items-center justify-center border border-purple-200/80 shadow-2xs">
                      {getMonogram(mostActiveCompany.company)}
                    </div>
                    <div>
                      <h4 className="text-lg font-extrabold text-slate-900">
                        {mostActiveCompany.company}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {mostActiveCompany.recruiterCount} recruiters · {mostActiveCompany.responseCount} replies received
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-2xl font-black text-purple-600">
                      {mostActiveCompany.communicationCount}
                    </span>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Interactions
                    </p>
                  </div>
                </div>

                {/* Engagement stats grid */}
                <div className="grid grid-cols-2 gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Response Rate
                    </span>
                    <span className="text-sm font-bold text-slate-800">
                      {mostActiveCompany.responseRate}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Last Outreach
                    </span>
                    <span className="text-xs font-semibold text-slate-700 truncate block">
                      {mostActiveCompany.lastContact
                        ? new Date(mostActiveCompany.lastContact).toLocaleDateString("en-GB")
                        : "None"}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-slate-400">
                No company outreach logged yet.
              </div>
            )}
          </div>

          {mostActiveCompany && (
            <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
              <Link
                href={`/dashboard/company/${encodeURIComponent(mostActiveCompany.company)}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                <span>View {mostActiveCompany.company} Intelligence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}