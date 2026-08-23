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
        <div className="w-8 h-8 rounded-xl bg-yellow-50 text-yellow-600 border border-yellow-200 flex items-center justify-center font-bold text-xs shadow-2xs">
          <Trophy className="w-4 h-4 text-yellow-500" />
        </div>
      );
    }

    if (index === 1) {
      return (
        <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 border border-slate-200 flex items-center justify-center font-bold text-xs shadow-2xs">
          <Medal className="w-4 h-4 text-slate-500" />
        </div>
      );
    }

    if (index === 2) {
      return (
        <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold text-xs shadow-2xs">
          <Award className="w-4 h-4 text-amber-600" />
        </div>
      );
    }

    return (
      <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-500 border border-slate-100 flex items-center justify-center font-bold text-xs">
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
    <div className="bg-slate-400/10 border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
      {/* Leaderboard Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-yellow-50 text-yellow-600 rounded-xl border border-yellow-200/80">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Response Rate Leaderboard
            </h3>
            <p className="text-xs text-slate-500">
              Ranked by reply efficiency and engagement volume
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl">
          {rankedCompanies.length} {rankedCompanies.length === 1 ? "Company" : "Companies"}
        </span>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-2.5">
        {rankedCompanies.length === 0 ? (
          <div className="py-10 text-center text-slate-400 text-xs">
            No companies in pipeline to rank.
          </div>
        ) : (
          rankedCompanies.map((company, index) => (
            <Link
              key={company.company}
              href={`/dashboard/company/${encodeURIComponent(company.company)}`}
              className="group block"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50/70 hover:bg-slate-100/90 border border-slate-200/60 hover:border-blue-200 transition-all">
                {/* Left Side: Rank + Monogram + Info */}
                <div className="flex items-center gap-3 min-w-0">
                  {getRankBadge(index)}

                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/80 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    {getMonogram(company.company) || <Building2 className="w-4 h-4" />}
                  </div>

                  <div className="min-w-0 truncate">
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {company.company}
                    </h4>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-400" />
                        {company.recruiterCount} {company.recruiterCount === 1 ? "recruiter" : "recruiters"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        {company.communicationCount} outreach
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Rate + Progress + View Link */}
                <div className="flex items-center justify-between sm:justify-end gap-4 pl-11 sm:pl-0">
                  <div className="text-left sm:text-right space-y-1">
                    <div className="flex items-center gap-2 sm:justify-end">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold border ${getRateBadgeColor(
                          company.responseRate,
                        )}`}
                      >
                        {company.responseRate}%
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                        Response Rate
                      </span>
                    </div>
                    {/* Mini Progress */}
                    <div className="w-24 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full ${
                          company.responseRate >= 70
                            ? "bg-emerald-500"
                            : company.responseRate >= 40
                            ? "bg-amber-500"
                            : "bg-slate-400"
                        }`}
                        style={{ width: `${company.responseRate}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-1 rounded-lg text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}