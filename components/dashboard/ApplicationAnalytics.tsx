import getApplicationAnalytics from "@/lib/dashboard/getApplicationAnalytics";
import { getAverageInterviewTime } from "@/lib/dashboard/getAverageInterviewTime";
import { Application } from "@/types/application";

interface ApplicationAnalyticsProps {
  applications: Application[];
}

export default function ApplicationAnalytics({
  applications,
}: ApplicationAnalyticsProps) {
  const analytics = getApplicationAnalytics(applications);

  const avgInterviewTime = getAverageInterviewTime(applications);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Header */}
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Application Analytics
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Understand your application performance and progress
          </p>
        </div>

        {/* Header Icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50">
          <span className="text-lg">📊</span>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {/* Interview Rate */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
          </div>

          <p className="text-xs font-medium text-slate-500">
            Interview Rate
          </p>

          <h3 className="mt-1 text-2xl font-bold tracking-tight text-indigo-600">
            {analytics.interviewRate.toFixed(1)}%
          </h3>

          <p className="mt-1 text-[11px] text-slate-400">
            Applications reaching interviews
          </p>
        </div>

        {/* Offer Rate */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </div>

          <p className="text-xs font-medium text-slate-500">
            Offer Rate
          </p>

          <h3 className="mt-1 text-2xl font-bold tracking-tight text-emerald-600">
            {analytics.offerRate.toFixed(1)}%
          </h3>

          <p className="mt-1 text-[11px] text-slate-400">
            Applications resulting in offers
          </p>
        </div>

        {/* Rejections */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
          </div>

          <p className="text-xs font-medium text-slate-500">
            Rejections
          </p>

          <h3 className="mt-1 text-2xl font-bold tracking-tight text-rose-600">
            {analytics.rejected}
          </h3>

          <p className="mt-1 text-[11px] text-slate-400">
            Applications rejected
          </p>
        </div>
      </div>

      {/* Average Interview Time */}
      <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:border-slate-200 hover:bg-white hover:shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <span className="text-sm">⏱️</span>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Average Interview Time
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                Average time between application and interview
              </p>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              {avgInterviewTime.toFixed(1)}
            </h3>

            <p className="text-xs font-medium text-slate-400">
              days
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-7 flex items-center gap-2 border-t border-slate-100 pt-4">
        <span className="h-2 w-2 rounded-full bg-indigo-500" />

        <p className="text-xs text-slate-500">
          Track these metrics to understand how your applications are
          progressing.
        </p>
      </div>
    </div>
  );
}