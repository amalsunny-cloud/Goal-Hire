"use client";

import { CompanyInsight } from "@/types/companyInsight";
import {
  Building2,
  Users,
  Mail,
  MessageCircle,
  Calendar,
  ArrowRight,
  TrendingUp,
  Clock,
} from "lucide-react";
import Link from "next/link";

interface Props {
  company: CompanyInsight;
}

export default function CompanyCard({ company }: Props) {
  const getRateBadge = (rate: number, count: number) => {
    if (count === 0) {
      return {
        label: "No Outreach Yet",
        badgeClass: "bg-slate-100 text-slate-600 border-slate-200",
        barClass: "bg-slate-300",
      };
    }

    if (rate >= 70) {
      return {
        label: "High Engagement",
        badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
        barClass: "bg-emerald-500",
      };
    }

    if (rate >= 40) {
      return {
        label: "Moderate Response",
        badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
        barClass: "bg-amber-500",
      };
    }

    return {
      label: "Needs Follow-up",
      badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
      barClass: "bg-rose-500",
    };
  };

  const { label, badgeClass, barClass } = getRateBadge(
    company.responseRate,
    company.communicationCount,
  );

  // Generate 2-letter monogram for company logo placeholder
  const monogram = company.company
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      href={`/dashboard/company/${encodeURIComponent(company.company)}`}
      className="group block h-full focus:outline-none"
    >
      <div className="flex h-full flex-col justify-between space-y-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-6">
        {/* Card Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm font-extrabold text-slate-700 transition-all duration-200 group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:scale-105">
              {monogram || <Building2 className="h-5 w-5 text-slate-600" />}
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-base font-bold tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-blue-600">
                {company.company}
              </h3>

              <p className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                <Building2 className="h-3 w-3 shrink-0" />
                <span>Target Organization</span>
              </p>
            </div>
          </div>

          <span
            className={`shrink-0 rounded-xl border px-2.5 py-1 text-[10px] font-bold ${badgeClass}`}
          >
            {label}
          </span>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          {/* Recruiters */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 transition-colors duration-200 group-hover:border-slate-200">
            <div className="mb-2 flex items-center gap-1.5 text-slate-500">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                <Users className="h-3.5 w-3.5" />
              </div>

              <span className="text-[11px] font-semibold">
                Recruiters
              </span>
            </div>

            <p className="text-lg font-extrabold tracking-tight text-slate-900">
              {company.recruiterCount}
            </p>
          </div>

          {/* Communications */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 transition-colors duration-200 group-hover:border-slate-200">
            <div className="mb-2 flex items-center gap-1.5 text-slate-500">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-50 text-purple-500">
                <Mail className="h-3.5 w-3.5" />
              </div>

              <span className="text-[11px] font-semibold">
                Outreach
              </span>
            </div>

            <p className="text-lg font-extrabold tracking-tight text-slate-900">
              {company.communicationCount}
            </p>
          </div>

          {/* Responses */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 transition-colors duration-200 group-hover:border-slate-200">
            <div className="mb-2 flex items-center gap-1.5 text-slate-500">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500">
                <MessageCircle className="h-3.5 w-3.5" />
              </div>

              <span className="text-[11px] font-semibold">
                Responses
              </span>
            </div>

            <p className="text-lg font-extrabold tracking-tight text-slate-900">
              {company.responseCount}
            </p>
          </div>

          {/* Last Contact */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 transition-colors duration-200 group-hover:border-slate-200">
            <div className="mb-2 flex items-center gap-1.5 text-slate-500">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
                <Calendar className="h-3.5 w-3.5" />
              </div>

              <span className="text-[11px] font-semibold">
                Last Contact
              </span>
            </div>

            <p className="truncate text-xs font-bold text-slate-800">
              {company.lastContact
                ? new Date(company.lastContact).toLocaleDateString("en-GB")
                : "No contact yet"}
            </p>
          </div>
        </div>

        {/* Response Rate */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
              <TrendingUp className="h-3.5 w-3.5 text-slate-400" />
              <span>Response Rate</span>
            </span>

            <span className="text-sm font-extrabold tracking-tight text-slate-900">
              {company.responseRate}%
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${barClass}`}
              style={{
                width: `${Math.max(company.responseRate, 0)}%`,
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500 transition-colors duration-200 group-hover:text-blue-600">
          <span className="truncate">
            View Company Profile &amp; History
          </span>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200 group-hover:bg-blue-50">
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}