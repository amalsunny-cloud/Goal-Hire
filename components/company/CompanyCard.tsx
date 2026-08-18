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
      className="group block focus:outline-none"
    >
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-blue-300 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between h-full space-y-5">
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-linear-to-tr from-slate-100 to-slate-200/80 border border-slate-200/80 text-slate-800 font-extrabold text-sm flex items-center justify-center shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
              {monogram || <Building2 className="w-5 h-5 text-slate-700" />}
            </div>

            <div className="min-w-0 truncate">
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                {company.company}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <Building2 className="w-3 h-3" />
                <span>Target Organization</span>
              </p>
            </div>
          </div>

          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border shrink-0 ${badgeClass}`}
          >
            {label}
          </span>
        </div>

        {/* 2x2 Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Recruiters */}
          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <Users className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-[11px] font-medium">Recruiters</span>
            </div>
            <p className="text-lg font-bold text-slate-900">
              {company.recruiterCount}
            </p>
          </div>

          {/* Communications */}
          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <Mail className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-[11px] font-medium">Outreach</span>
            </div>
            <p className="text-lg font-bold text-slate-900">
              {company.communicationCount}
            </p>
          </div>

          {/* Responses */}
          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[11px] font-medium">Responses</span>
            </div>
            <p className="text-lg font-bold text-slate-900">
              {company.responseCount}
            </p>
          </div>

          {/* Last Contact */}
          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[11px] font-medium">Last Contact</span>
            </div>
            <p className="text-xs font-bold text-slate-800 truncate">
              {company.lastContact
                ? new Date(company.lastContact).toLocaleDateString("en-GB")
                : "No contact yet"}
            </p>
          </div>
        </div>

        {/* Response Rate Progress Bar */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
              <span>Response Rate</span>
            </span>
            <span className="font-bold text-slate-900">
              {company.responseRate}%
            </span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${barClass}`}
              style={{ width: `${Math.max(company.responseRate, 0)}%` }}
            />
          </div>
        </div>

        {/* Card Footer Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-blue-600 transition-colors">
          <span>View Company Profile & History</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}