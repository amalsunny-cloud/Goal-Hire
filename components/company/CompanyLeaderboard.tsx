"use client";

import { CompanyInsight } from "@/types/companyInsight";
import {
  Trophy,
  Medal,
  Award,
  ChevronRight,
  TrendingUp,
  Mail,
  Users,
  Building2,
} from "lucide-react";
import Link from "next/link";

interface Props {
  companies: CompanyInsight[];
}

export default function CompanyLeaderboard({ companies }: Props) {
  const rankedCompanies = [...companies].sort((a, b) => {
    if (b.responseRate !== a.responseRate) {
      return b.responseRate - a.responseRate;
    }
    return b.communicationCount - a.communicationCount;
  });

  const getRankBadge = (index: number) => {
    if (index === 0) {
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-yellow-200 bg-yellow-50 text-xs font-bold text-yellow-600 shadow-sm">
          <Trophy className="h-4 w-4 text-yellow-500" />
        </div>
      );
    }

    if (index === 1) {
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-xs font-bold text-slate-600 shadow-sm">
          <Medal className="h-4 w-4 text-slate-500" />
        </div>
      );
    }

    if (index === 2) {
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-xs font-bold text-amber-700 shadow-sm">
          <Award className="h-4 w-4 text-amber-600" />
        </div>
      );
    }

    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-500">
        {index + 1}
      </div>
    );
  };

  const getRateBadgeColor = (rate: number) => {
    if (rate >= 70) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (rate >= 40) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-slate-600 bg-slate-50 border-slate-200";
  };

  const getMonogram = (name: string) =>
    name
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-yellow-100 bg-yellow-50 text-yellow-600">
            <Trophy className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-bold tracking-tight text-slate-900 sm:text-base">
              Response Rate Leaderboard
            </h3>

            <p className="mt-1 text-[11px] leading-5 text-slate-500 sm:text-xs">
              Ranked by reply efficiency and engagement volume
            </p>
          </div>
        </div>

        <span className="inline-flex w-fit shrink-0 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-bold text-slate-600">
          {rankedCompanies.length}{" "}
          {rankedCompanies.length === 1 ? "Company" : "Companies"}
        </span>
      </div>

      {/* Leaderboard */}
      <div className="space-y-3">
        {rankedCompanies.length === 0 ? (
          <div className="flex min-h-36 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-5 text-center text-xs text-slate-400">
            <div>
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400">
                <Building2 className="h-4 w-4" />
              </div>

              <p className="font-medium">
                No companies in pipeline to rank.
              </p>
            </div>
          </div>
        ) : (
          rankedCompanies.map((company, index) => (
            <Link
              key={company.company}
              href={`/dashboard/company/${encodeURIComponent(
                company.company,
              )}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-sm sm:p-4.5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {/* Left Side */}
                  <div className="flex min-w-0 items-center gap-3">
                    {getRankBadge(index)}

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-extrabold text-slate-700 transition-transform duration-200 group-hover:scale-105">
                      {getMonogram(company.company) || (
                        <Building2 className="h-4 w-4" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h4 className="truncate text-sm font-bold text-slate-900 transition-colors duration-200 group-hover:text-blue-600">
                        {company.company}
                      </h4>

                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Users className="h-3 w-3 text-slate-400" />

                          <span>
                            {company.recruiterCount}{" "}
                            {company.recruiterCount === 1
                              ? "recruiter"
                              : "recruiters"}
                          </span>
                        </span>

                        <span className="hidden h-3 w-px bg-slate-200 sm:block" />

                        <span className="flex items-center gap-1.5">
                          <Mail className="h-3 w-3 text-slate-400" />

                          <span>
                            {company.communicationCount} outreach
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="flex items-center justify-between gap-4 pl-13 sm:justify-end sm:pl-0">
                    <div className="min-w-28 space-y-2">
                      <div className="flex items-center gap-2 sm:justify-end">
                        <span
                          className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-bold ${getRateBadgeColor(
                            company.responseRate,
                          )}`}
                        >
                          {company.responseRate}%
                        </span>

                        <span className="hidden text-[10px] font-semibold uppercase tracking-wide text-slate-400 sm:inline">
                          Response Rate
                        </span>
                      </div>

                      {/* Progress */}
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            company.responseRate >= 70
                              ? "bg-emerald-500"
                              : company.responseRate >= 40
                              ? "bg-amber-500"
                              : "bg-slate-400"
                          }`}
                          style={{
                            width: `${company.responseRate}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-transparent text-slate-400 transition-all duration-200 group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:translate-x-0.5">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Footer */}
      {rankedCompanies.length > 0 && (
        <div className="flex items-center gap-2 border-t border-slate-100 pt-4 text-[11px] font-medium text-slate-400">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
            <TrendingUp className="h-3.5 w-3.5" />
          </div>

          <span>
            Response rate is used as the primary ranking metric.
          </span>
        </div>
      )}
    </div>
  );
}