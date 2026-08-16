"use client";

import { useState } from "react";
import { Application } from "@/types/application";
import { Recruiter } from "@/types/recruiter";
import { RecruiterCommunication } from "@/types/recruiterCommunication";
import CompanyRecruiterList from "./CompanyRecruiterList";
import CompanyStats from "./CompanyStats";
import CompanyCommunicationList from "./CompanyCommunicationList";
import CompanyTimeline from "./CompanyTimeline";
import Link from "next/link";
import {
  Building2,
  Users,
  MessageSquare,
  Briefcase,
  Activity,
  ArrowLeft,
  LayoutGrid,
  MapPin,
  DollarSign,
  Calendar,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

interface Props {
  company: string;
  recruiters: Recruiter[];
  communications: RecruiterCommunication[];
  applications?: Application[];
}

export default function CompanyDetails({
  company,
  recruiters,
  communications,
  applications = [],
}: Props) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "recruiters" | "communications" | "applications" | "timeline"
  >("overview");

  const responseCount = communications.filter((c) => c.responded).length;
  const responseRate =
    communications.length === 0
      ? 0
      : Math.round((responseCount / communications.length) * 100);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Offer":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Interview":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Rejected":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Applied":
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
        {/* Back Link */}
        <div>
          <Link
            href="/dashboard/company"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors bg-slate-100 hover:bg-slate-200/70 px-3 py-1.5 rounded-lg border border-slate-200/60"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Companies Directory</span>
          </Link>
        </div>

        {/* Company Title Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200/70 border border-slate-200 text-slate-800 flex items-center justify-center shadow-2xs">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {company}
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  Target Company
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Centralized recruiter relationships, application history, and communication touchpoints
              </p>
            </div>
          </div>

          {/* Quick Metrics Chips */}
          <div className="flex items-center gap-2 flex-wrap self-start md:self-auto">
            <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              <span>{applications.length} {applications.length === 1 ? "Role" : "Roles"}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-500" />
              <span>{recruiters.length} {recruiters.length === 1 ? "Recruiter" : "Recruiters"}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <span>{responseRate}% Response</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 scrollbar-none">
          <button
            onClick={() => setActiveTab("overview")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-slate-800 text-white shadow-xs"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("recruiters")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none whitespace-nowrap ${
              activeTab === "recruiters"
                ? "bg-slate-800 text-white shadow-xs"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Recruiters ({recruiters.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("communications")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none whitespace-nowrap ${
              activeTab === "communications"
                ? "bg-slate-800 text-white shadow-xs"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Communications ({communications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("applications")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none whitespace-nowrap ${
              activeTab === "applications"
                ? "bg-slate-800 text-white shadow-xs"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Applications ({applications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("timeline")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none whitespace-nowrap ${
              activeTab === "timeline"
                ? "bg-slate-800 text-white shadow-xs"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Activity Timeline</span>
          </button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <CompanyStats recruiters={recruiters} communications={communications} />

      {/* Tab Contents */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2/3 width) - Recruiters & Communications */}
          <div className="lg:col-span-2 space-y-6">
            <CompanyRecruiterList recruiters={recruiters} />
            <CompanyCommunicationList
              recruiters={recruiters}
              communications={communications}
            />
          </div>

          {/* Right Column (1/3 width) - Applications & Timeline */}
          <div className="space-y-6">
            {/* Applications at this company */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Applications ({applications.length})
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Roles tracked for {company}
                    </p>
                  </div>
                </div>
              </div>

              {applications.length === 0 ? (
                <p className="text-xs text-slate-500 py-3 text-center">
                  No applications recorded.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {applications.map((app) => (
                    <Link
                      key={app._id}
                      href={`/dashboard/applications/${app._id}`}
                      className="group block p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1 truncate">
                          <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                            {app.role}
                          </p>
                          <div className="flex items-center gap-3 text-[11px] text-slate-500 flex-wrap">
                            {app.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-slate-400" />
                                {app.location}
                              </span>
                            )}
                            {app.salary && (
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3 text-slate-400" />
                                {app.salary}
                              </span>
                            )}
                          </div>
                        </div>

                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border shrink-0 ${getStatusBadge(
                            app.status,
                          )}`}
                        >
                          {app.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Timeline Snapshot */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <CompanyTimeline
                recruiters={recruiters}
                communications={communications}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "recruiters" && (
        <CompanyRecruiterList recruiters={recruiters} />
      )}

      {activeTab === "communications" && (
        <CompanyCommunicationList
          recruiters={recruiters}
          communications={communications}
        />
      )}

      {activeTab === "applications" && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Applications Submitted to {company}
                </h2>
                <p className="text-xs text-slate-500">
                  All job openings and opportunities tracked for this company
                </p>
              </div>
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No applications recorded for this company.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {applications.map((app) => (
                <div
                  key={app._id}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-3 hover:shadow-xs transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {app.role}
                      </h3>
                      <span className="text-xs text-slate-500">
                        Applied {new Date(app.createdAt).toLocaleDateString("en-GB")}
                      </span>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(
                        app.status,
                      )}`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                    {app.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">{app.location}</span>
                      </div>
                    )}
                    {app.salary && (
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">{app.salary}</span>
                      </div>
                    )}
                    {app.followUpDate && (
                      <div className="flex items-center gap-1.5 col-span-2 text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Follow-up: {new Date(app.followUpDate).toLocaleDateString("en-GB")}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex justify-end">
                    <Link
                      href={`/dashboard/applications/${app._id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      <span>View Application Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "timeline" && (
        <CompanyTimeline
          recruiters={recruiters}
          communications={communications}
        />
      )}
    </div>
  );
}

