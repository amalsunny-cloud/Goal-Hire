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
    <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
          {title}
        </span>

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${badgeBg}`}
        >
          {icon}
        </div>
      </div>

      <div className="min-w-0">
        <p className="truncate text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
          {value}
        </p>

        {subtitle && (
          <span className="mt-1 block truncate text-[11px] font-medium text-slate-400">
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
          companies.reduce(
            (sum, company) => sum + company.responseRate,
            0,
          ) / totalCompanies,
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
      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Companies"
          value={totalCompanies}
          subtitle="In pipeline"
          badgeBg="bg-blue-50 text-blue-600 border-blue-100"
          icon={<Building2 className="h-5 w-5" />}
        />

        <StatCard
          title="Recruiters"
          value={totalRecruiters}
          subtitle="Linked contacts"
          badgeBg="bg-emerald-50 text-emerald-600 border-emerald-100"
          icon={<Users className="h-5 w-5" />}
        />

        <StatCard
          title="Outreach"
          value={totalCommunications}
          subtitle="Messages logged"
          badgeBg="bg-purple-50 text-purple-600 border-purple-100"
          icon={<Mail className="h-5 w-5" />}
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
          icon={<TrendingUp className="h-5 w-5" />}
        />

        <StatCard
          title="Active Target"
          value={activeCompanies}
          subtitle={`${activeRatio}% engaged`}
          badgeBg="bg-rose-50 text-rose-600 border-rose-100"
          icon={<Activity className="h-5 w-5" />}
        />

        <StatCard
          title="Top Performer"
          value={bestCompany ? bestCompany.company : "N/A"}
          subtitle={bestCompany ? `${bestCompany.responseRate}% rate` : ""}
          badgeBg="bg-yellow-50 text-yellow-600 border-yellow-100"
          icon={<Trophy className="h-5 w-5" />}
        />
      </div>

      {/* Spotlight Highlights */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 mb-4 border-b border-slate-200">
        {/* Spotlight 1: Best Response Rate */}
        <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-100 bg-amber-50 text-amber-600">
                  <Trophy className="h-4 w-4" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                    Highest Response Rate Champion
                  </h3>

                  <p className="mt-1 text-[11px] leading-5 text-slate-500 sm:text-xs">
                    Best conversion from outreach to recruiter responses
                  </p>
                </div>
              </div>

              <span className="hidden shrink-0 rounded-xl border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-amber-700 sm:block">
                Top Rate
              </span>
            </div>

            {bestCompany ? (
              <div className="space-y-5">
                {/* Company */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-sm font-extrabold text-amber-700">
                      {getMonogram(bestCompany.company)}
                    </div>

                    <div className="min-w-0">
                      <h4 className="truncate text-base font-extrabold text-slate-900 sm:text-lg">
                        {bestCompany.company}
                      </h4>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {bestCompany.recruiterCount} recruiters ·{" "}
                        {bestCompany.communicationCount} outreach logged
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <span className="text-2xl font-black tracking-tight text-emerald-600">
                      {bestCompany.responseRate}%
                    </span>

                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      Response Rate
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                  <div className="mb-2 flex justify-between gap-3 text-xs font-medium text-slate-600">
                    <span>Replies Received</span>

                    <span className="font-bold text-slate-800">
                      {bestCompany.responseCount} of{" "}
                      {bestCompany.communicationCount}
                    </span>
                  </div>

                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-2.5 rounded-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${bestCompany.responseRate}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex min-h-28 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-5 text-center text-xs text-slate-400">
                No company response data available yet.
              </div>
            )}
          </div>

          {bestCompany && (
            <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
              <Link
                href={`/dashboard/company/${encodeURIComponent(
                  bestCompany.company,
                )}`}
                className="inline-flex items-center gap-1.5 rounded-xl px-2 py-1 text-xs font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <span>
                  View {bestCompany.company} Intelligence
                </span>

                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Spotlight 2: Most Active Company */}
        <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-100 bg-purple-50 text-purple-600">
                  <Zap className="h-4 w-4" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                    Most Active Engagement Hub
                  </h3>

                  <p className="mt-1 text-[11px] leading-5 text-slate-500 sm:text-xs">
                    Highest volume of communication touchpoints
                  </p>
                </div>
              </div>

              <span className="hidden shrink-0 rounded-xl border border-purple-200 bg-purple-50 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-purple-700 sm:block">
                Most Active
              </span>
            </div>

            {mostActiveCompany ? (
              <div className="space-y-5">
                {/* Company */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-200 bg-purple-50 text-sm font-extrabold text-purple-700">
                      {getMonogram(mostActiveCompany.company)}
                    </div>

                    <div className="min-w-0">
                      <h4 className="truncate text-base font-extrabold text-slate-900 sm:text-lg">
                        {mostActiveCompany.company}
                      </h4>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {mostActiveCompany.recruiterCount} recruiters ·{" "}
                        {mostActiveCompany.responseCount} replies received
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <span className="text-2xl font-black tracking-tight text-purple-600">
                      {mostActiveCompany.communicationCount}
                    </span>

                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      Interactions
                    </p>
                  </div>
                </div>

                {/* Engagement Stats */}
                <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                  <div className="rounded-xl bg-white p-3">
                    <span className="block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Response Rate
                    </span>

                    <span className="mt-1 block text-sm font-bold text-slate-800">
                      {mostActiveCompany.responseRate}%
                    </span>
                  </div>

                  <div className="min-w-0 rounded-xl bg-white p-3">
                    <span className="block text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Last Outreach
                    </span>

                    <span className="mt-1 block truncate text-xs font-semibold text-slate-700">
                      {mostActiveCompany.lastContact
                        ? new Date(
                            mostActiveCompany.lastContact,
                          ).toLocaleDateString("en-GB")
                        : "None"}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex min-h-28 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-5 text-center text-xs text-slate-400">
                No company outreach logged yet.
              </div>
            )}
          </div>

          {mostActiveCompany && (
            <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
              <Link
                href={`/dashboard/company/${encodeURIComponent(
                  mostActiveCompany.company,
                )}`}
                className="inline-flex items-center gap-1.5 rounded-xl px-2 py-1 text-xs font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <span>
                  View {mostActiveCompany.company} Intelligence
                </span>

                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}