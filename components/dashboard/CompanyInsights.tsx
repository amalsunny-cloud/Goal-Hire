import { getCompanyInsights } from "@/lib/dashboard/getCompanyInsights";
import { getStatusDistribution } from "@/lib/dashboard/getStatusDistribution";
import { Application } from "@/types/application";
import { useMemo } from "react";

interface CompanyInsightsProps {
  applications: Application[];
}

export default function CompanyInsights({
  applications,
}: CompanyInsightsProps) {
  const { insights, status } = useMemo(
    () => ({
      insights: getCompanyInsights(applications),
      status: getStatusDistribution(applications),
    }),
    [applications],
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Header */}
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Company Insights
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Discover patterns across your job applications
          </p>
        </div>

        {/* Icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50">
          <span className="text-lg">🏢</span>
        </div>
      </div>

      {/* Top Insights */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Top Location */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-sm">
            📍
          </div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Top Location
          </p>

          <h4 className="mt-1 truncate text-lg font-bold text-slate-900">
            {insights.topLocation || "No data"}
          </h4>
        </div>

        {/* Top Role */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-sm">
            💼
          </div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Top Role
          </p>

          <h4 className="mt-1 truncate text-lg font-bold text-slate-900">
            {insights.topRole || "No data"}
          </h4>
        </div>

        {/* Top Company */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-sm">
            🏆
          </div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Top Company
          </p>

          <h4 className="mt-1 truncate text-lg font-bold text-slate-900">
            {insights.topCompany || "No data"}
          </h4>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="mt-8 border-t border-slate-100 pt-6">
        <div className="mb-4">
          <h3 className="text-sm font-bold text-slate-900">
            Status Distribution
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Current breakdown of your application pipeline
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {/* Applied */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            </div>

            <p className="text-xs font-medium text-slate-500">Applied</p>

            <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              {status.applied}
            </h3>
          </div>

          {/* Interview */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
            </div>

            <p className="text-xs font-medium text-slate-500">Interview</p>

            <h3 className="mt-1 text-2xl font-bold tracking-tight text-indigo-600">
              {status.interview}
            </h3>
          </div>

          {/* Offer */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </div>

            <p className="text-xs font-medium text-slate-500">Offer</p>

            <h3 className="mt-1 text-2xl font-bold tracking-tight text-emerald-600">
              {status.offer}
            </h3>
          </div>

          {/* Rejected */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
            </div>

            <p className="text-xs font-medium text-slate-500">Rejected</p>

            <h3 className="mt-1 text-2xl font-bold tracking-tight text-rose-600">
              {status.rejected}
            </h3>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-7 flex items-center gap-2 border-t border-slate-100 pt-4">
        <span className="h-2 w-2 rounded-full bg-indigo-500" />

        <p className="text-xs text-slate-500">
          Review your application patterns to better understand your job
          search.
        </p>
      </div>
    </div>
  );
}