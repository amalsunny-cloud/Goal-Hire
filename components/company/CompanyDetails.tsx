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
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
        {/* Back Link */}
        <div>
          <Link
            href="/dashboard/company"
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-white hover:text-slate-900 hover:shadow-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>Back to Companies Directory</span>
          </Link>
        </div>

        {/* Company Title */}
        <div className="flex flex-col justify-between gap-6 border-b border-slate-100 pb-6 md:flex-row md:items-center">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
              <Building2 className="h-7 w-7" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="truncate text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  {company}
                </h1>

                <span className="inline-flex shrink-0 items-center rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                  Target Company
                </span>
              </div>

              <p className="mt-1.5 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm">
                Centralized recruiter relationships, application history, and
                communication touchpoints
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
              <Briefcase className="h-3.5 w-3.5 text-slate-400" />
              <span>
                {applications.length}{" "}
                {applications.length === 1 ? "Role" : "Roles"}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
              <Users className="h-3.5 w-3.5 text-blue-500" />
              <span>
                {recruiters.length}{" "}
                {recruiters.length === 1 ? "Recruiter" : "Recruiters"}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              <span>{responseRate}% Response</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-1.5">
          <div className="flex min-w-max items-center gap-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`inline-flex cursor-pointer select-none items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                activeTab === "overview"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:bg-white hover:text-slate-900"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("recruiters")}
              className={`inline-flex cursor-pointer select-none items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                activeTab === "recruiters"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:bg-white hover:text-slate-900"
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              <span>Recruiters ({recruiters.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("communications")}
              className={`inline-flex cursor-pointer select-none items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                activeTab === "communications"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:bg-white hover:text-slate-900"
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Communications ({communications.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("applications")}
              className={`inline-flex cursor-pointer select-none items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                activeTab === "applications"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:bg-white hover:text-slate-900"
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" />
              <span>Applications ({applications.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("timeline")}
              className={`inline-flex cursor-pointer select-none items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                activeTab === "timeline"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:bg-white hover:text-slate-900"
              }`}
            >
              <Activity className="h-3.5 w-3.5" />
              <span>Activity Timeline</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Stat Cards */}
      <CompanyStats
        recruiters={recruiters}
        communications={communications}
      />

      {/* Tab Contents */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            <CompanyRecruiterList recruiters={recruiters} />

            <CompanyCommunicationList
              recruiters={recruiters}
              communications={communications}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Applications at this company */}
            <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
                    <Briefcase className="h-4 w-4" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Applications ({applications.length})
                    </h3>

                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Roles tracked for {company}
                    </p>
                  </div>
                </div>
              </div>

              {applications.length === 0 ? (
                <div className="flex min-h-24 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-4 text-center text-xs text-slate-400">
                  No applications recorded.
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((app) => (
                    <Link
                      key={app._id}
                      href={`/dashboard/applications/${app._id}`}
                      className="group block rounded-2xl border border-slate-200 bg-slate-50/60 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 space-y-1.5">
                          <p className="truncate text-xs font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                            {app.role}
                          </p>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-slate-500">
                            {app.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-slate-400" />
                                {app.location}
                              </span>
                            )}

                            {app.salary && (
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3 text-slate-400" />
                                {app.salary}
                              </span>
                            )}
                          </div>
                        </div>

                        <span
                          className={`shrink-0 rounded-lg border px-2 py-1 text-[10px] font-bold ${getStatusBadge(
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
            <div className="rounded-3xl border border-slate-200 bg-white p-1 shadow-sm">
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
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
                <Briefcase className="h-4 w-4" />
              </div>

              <div>
                <h2 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                  Applications Submitted to {company}
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  All job openings and opportunities tracked for this company
                </p>
              </div>
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-5 text-center text-xs text-slate-400">
              No applications recorded for this company.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {applications.map((app) => (
                <div
                  key={app._id}
                  className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold text-slate-900">
                        {app.role}
                      </h3>

                      <span className="mt-1 block text-[11px] text-slate-500">
                        Applied{" "}
                        {new Date(app.createdAt).toLocaleDateString(
                          "en-GB",
                        )}
                      </span>
                    </div>

                    <span
                      className={`shrink-0 rounded-lg border px-2.5 py-1 text-xs font-bold ${getStatusBadge(
                        app.status,
                      )}`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-600">
                    {app.location && (
                      <div className="flex min-w-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                        <span className="truncate">{app.location}</span>
                      </div>
                    )}

                    {app.salary && (
                      <div className="flex min-w-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2">
                        <DollarSign className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                        <span className="truncate">{app.salary}</span>
                      </div>
                    )}

                    {app.followUpDate && (
                      <div className="col-span-2 flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-500">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>
                          Follow-up:{" "}
                          {new Date(
                            app.followUpDate,
                          ).toLocaleDateString("en-GB")}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end border-t border-slate-200 pt-3">
                    <Link
                      href={`/dashboard/applications/${app._id}`}
                      className="group/link inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <span>View Application Details</span>
                      <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
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