"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import CompanyDashboard from "@/components/company/CompanyDashboard";
import { Recruiter } from "@/types/recruiter";
import { RecruiterCommunication } from "@/types/recruiterCommunication";
import { Application } from "@/types/application";
import {
  Building2,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  Briefcase,
  Users,
} from "lucide-react";

export default function CompanyDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [communications, setCommunications] = useState<RecruiterCommunication[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  const fetchData = useCallback(async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }
      setError("");

      const [recruiterResponse, communicationResponse, applicationResponse] =
        await Promise.all([
          fetch("/api/company-dashboard/recruiters"),
          fetch("/api/company-dashboard/communications"),
          fetch("/api/applications"),
        ]);

      if (
        !recruiterResponse.ok ||
        !communicationResponse.ok ||
        !applicationResponse.ok
      ) {
        throw new Error("Failed to load company intelligence data. Please try again.");
      }

      const [recruiterData, communicationData, applicationData] =
        await Promise.all([
          recruiterResponse.json(),
          communicationResponse.json(),
          applicationResponse.json(),
        ]);

      setRecruiters(recruiterData || []);
      setCommunications(communicationData || []);
      setApplications(applicationData || []);
    } catch (err: any) {
      console.error("Error fetching company dashboard data:", err);
      setError(err?.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Derive unique company count
  const uniqueCompanyCount = new Set(
    applications.map((app) => app.company.trim()).filter(Boolean),
  ).size;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
        {/* Skeleton Header */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs animate-pulse">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-3">
              <div className="h-4 w-32 bg-slate-200 rounded-md"></div>
              <div className="h-8 w-64 bg-slate-200 rounded-lg"></div>
              <div className="h-4 w-96 bg-slate-200 rounded-md"></div>
            </div>
            <div className="flex gap-3">
              <div className="h-10 w-28 bg-slate-200 rounded-xl"></div>
              <div className="h-10 w-28 bg-slate-200 rounded-xl"></div>
            </div>
          </div>
        </div>

        {/* Skeleton Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs animate-pulse space-y-3"
            >
              <div className="flex justify-between items-center">
                <div className="h-3 w-16 bg-slate-200 rounded"></div>
                <div className="w-8 h-8 rounded-xl bg-slate-200"></div>
              </div>
              <div className="h-7 w-20 bg-slate-200 rounded-md"></div>
            </div>
          ))}
        </div>

        {/* Skeleton Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs animate-pulse"></div>
          <div className="h-96 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-4 sm:p-8">
        <div className="bg-white border border-rose-200/80 rounded-2xl p-8 text-center max-w-md w-full shadow-xs space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center mx-auto text-rose-600 border border-rose-100 shadow-2xs">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Unable to Load Dashboard
            </h2>
            <p className="text-xs text-rose-600 mt-1">{error}</p>
          </div>
          <p className="text-xs text-slate-500">
            Please check your network connection or verify that your services are operational.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => fetchData(true)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
            <Link
              href="/dashboard"
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold rounded-xl transition-all inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Banner Header */}
      <header className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle background glow accent */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-linear-to-bl from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* Breadcrumb & Back Link */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Link
                href="/dashboard"
                className="hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold">Company Intelligence</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchData(true)}
                disabled={isRefreshing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-xs font-semibold text-slate-700 transition-all border border-slate-200/60 cursor-pointer disabled:opacity-60"
                title="Refresh dashboard data"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-blue-600" : "text-slate-500"}`}
                />
                <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
              </button>
            </div>
          </div>

          {/* Title & Stats Badges */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/20 shrink-0">
                <Building2 className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Company Intelligence
                  </h1>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    Analytics & Insights
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Track recruiter relationships, response rates, and communication touchpoints across all target companies
                </p>
              </div>
            </div>

            {/* Quick Metrics Badges */}
            <div className="flex items-center gap-2 flex-wrap self-start md:self-auto">
              <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-2xs">
                <Building2 className="w-3.5 h-3.5 text-blue-500" />
                <span>
                  {uniqueCompanyCount} {uniqueCompanyCount === 1 ? "Company" : "Companies"}
                </span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-2xs">
                <Users className="w-3.5 h-3.5 text-emerald-500" />
                <span>
                  {recruiters.length} {recruiters.length === 1 ? "Recruiter" : "Recruiters"}
                </span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-2xs">
                <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                <span>
                  {applications.length} {applications.length === 1 ? "Application" : "Applications"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <CompanyDashboard
        applications={applications}
        recruiters={recruiters}
        communications={communications}
      />
    </div>
  );
}
