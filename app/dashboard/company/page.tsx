"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  Briefcase,
  Building2,
  RefreshCw,
  Sparkles,
  Users,
} from "lucide-react";
import CompanyDashboard from "@/components/company/CompanyDashboard";
import { Application } from "@/types/application";
import { Recruiter } from "@/types/recruiter";
import { RecruiterCommunication } from "@/types/recruiterCommunication";

export default function CompanyDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [communications, setCommunications] = useState<
    RecruiterCommunication[]
  >([]);
  const [applications, setApplications] = useState<Application[]>([]);

  const fetchData = useCallback(async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const [
        recruiterResponse,
        communicationResponse,
        applicationResponse,
      ] = await Promise.all([
        fetch("/api/company-dashboard/recruiters"),
        fetch("/api/company-dashboard/communications"),
        fetch("/api/applications"),
      ]);

      if (
        !recruiterResponse.ok ||
        !communicationResponse.ok ||
        !applicationResponse.ok
      ) {
        throw new Error(
          "Failed to load company intelligence data. Please try again.",
        );
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

  const uniqueCompanyCount = new Set(
    applications.map((app) => app.company.trim()).filter(Boolean),
  ).size;

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-8">
        <div className="mx-auto max-w-7xl animate-pulse space-y-6">
          <div className="h-72 rounded-4xl bg-slate-200" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="h-28 rounded-2xl border border-slate-200 bg-white"
              />
            ))}
          </div>

          <div className="h-128 rounded-4xl border border-slate-200 bg-white" />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-4xl border border-rose-200 bg-white p-8 text-center shadow-xl shadow-slate-200/50">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
            <AlertCircle className="h-7 w-7" />
          </div>

          <h2 className="text-lg font-bold text-slate-900">
            Unable to Load Dashboard
          </h2>

          <p className="mt-2 text-sm text-rose-600">{error}</p>

          <p className="mt-3 text-xs leading-5 text-slate-500">
            Please check your network connection or try again shortly.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => fetchData(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Try Again
            </button>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const metrics = [
    {
      label: "Companies",
      value: uniqueCompanyCount,
      icon: Building2,
      color: "text-blue-600",
      background: "bg-blue-50",
    },
    {
      label: "Recruiters",
      value: recruiters.length,
      icon: Users,
      color: "text-emerald-600",
      background: "bg-emerald-50",
    },
    {
      label: "Applications",
      value: applications.length,
      icon: Briefcase,
      color: "text-indigo-600",
      background: "bg-indigo-50",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-8 sm:py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="relative overflow-hidden rounded-4xl bg-linear-to-br from-slate-950 via-blue-950 to-indigo-900 px-6 py-7 text-white shadow-2xl shadow-blue-950/20 sm:px-10 sm:py-9">
          <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-indigo-400/15 blur-3xl" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-xs font-medium text-blue-100 transition hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Dashboard
              </Link>

              <button
                onClick={() => fetchData(true)}
                disabled={isRefreshing}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/20 disabled:opacity-60"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                />
                {isRefreshing ? "Refreshing..." : "Refresh data"}
              </button>
            </div>

            <div className="mt-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1.5 text-xs font-semibold text-blue-100">
                  <Sparkles className="h-3.5 w-3.5" />
                  Analytics & Insights
                </div>

                <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                  Company Intelligence
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-6 text-blue-100/75 sm:text-base">
                  Track recruiter relationships, response rates, and
                  communication touchpoints across your target companies.
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <Building2 className="h-5 w-5 text-blue-200" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{uniqueCompanyCount}</p>
                  <p className="text-xs text-blue-100/65">
                    Active target companies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <div
                key={metric.label}
                className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {metric.label}
                  </p>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${metric.background} ${metric.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <p className="mt-4 text-3xl font-black tracking-tight text-slate-900">
                  {metric.value}
                </p>
              </div>
            );
          })}
        </section>

        <section className="rounded-4xl border border-slate-200/80 bg-white p-3 shadow-sm sm:p-5">
          <CompanyDashboard
            applications={applications}
            recruiters={recruiters}
            communications={communications}
          />
        </section>
      </div>
    </main>
  );
}