import { getPredictionAnalytics } from "@/lib/dashboard/getPredictionAnalytics";
import { Application } from "@/types/application";
import { useMemo } from "react";

interface PredictionAnalyticsProps {
  applications: Application[];
}

export default function PredictionAnalytics({
  applications,
}: PredictionAnalyticsProps) {
  const analytics = useMemo(
    () => getPredictionAnalytics(applications),
    [applications]
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Header */}
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Prediction Dashboard
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Insights based on your current application performance
          </p>
        </div>

        {/* Prediction Icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50">
          <span className="text-lg">📈</span>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Applications */}
        <div className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Total Applications
            </p>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-sm">
              📄
            </div>
          </div>

          <h3 className="text-3xl font-bold tracking-tight text-slate-900">
            {analytics.totalApplications}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Applications submitted
          </p>
        </div>

        {/* Interview Rate */}
        <div className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Interview Rate
            </p>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-sm">
              🎯
            </div>
          </div>

          <h3 className="text-3xl font-bold tracking-tight text-indigo-600">
            {analytics.interviewRate.toFixed(1)}%
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Applications reaching interview
          </p>
        </div>

        {/* Offer Rate */}
        <div className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Offer Rate
            </p>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-sm">
              🎉
            </div>
          </div>

          <h3 className="text-3xl font-bold tracking-tight text-emerald-600">
            {analytics.offerRate.toFixed(1)}%
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Applications resulting in offers
          </p>
        </div>

        {/* Expected Interviews */}
        <div className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Expected Interviews
            </p>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-sm">
              💼
            </div>
          </div>

          <h3 className="text-3xl font-bold tracking-tight text-slate-900">
            {analytics.expectedInterviews}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Per 100 applications
          </p>
        </div>

        {/* Expected Offers */}
        <div className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Expected Offers
            </p>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-sm">
              ⭐
            </div>
          </div>

          <h3 className="text-3xl font-bold tracking-tight text-amber-600">
            {analytics.expectedOffers}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Per 100 applications
          </p>
        </div>
      </div>

      {/* Bottom Insight */}
      <div className="mt-7 flex items-center gap-2 border-t border-slate-100 pt-4">
        <span className="h-2 w-2 rounded-full bg-indigo-500" />

        <p className="text-xs text-slate-500">
          Predictions are calculated from your current application data.
        </p>
      </div>
    </div>
  );
}