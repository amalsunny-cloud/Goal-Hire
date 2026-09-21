import { getInterviewAnalytics } from "@/lib/dashboard/getInterviewAnalytics";
import { Interview } from "@/types/interview";
import { useMemo } from "react";

interface InterviewAnalyticsProps {
  interviews: Interview[];
}

export default function InterviewAnalytics({
  interviews,
}: InterviewAnalyticsProps) {
  const analytics = useMemo(
    () => getInterviewAnalytics(interviews),
    [interviews]
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Header */}
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Interview Analytics
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Track your interview performance and outcomes
          </p>
        </div>

        {/* Header Icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50">
          <span className="text-lg">🎯</span>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {/* Total */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
          </div>

          <p className="text-xs font-medium text-slate-500">
            Total
          </p>

          <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {analytics.total}
          </h3>
        </div>

        {/* Passed */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </div>

          <p className="text-xs font-medium text-slate-500">
            Passed
          </p>

          <h3 className="mt-1 text-2xl font-bold tracking-tight text-emerald-600">
            {analytics.passed}
          </h3>
        </div>

        {/* Failed */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
          </div>

          <p className="text-xs font-medium text-slate-500">
            Failed
          </p>

          <h3 className="mt-1 text-2xl font-bold tracking-tight text-rose-600">
            {analytics.failed}
          </h3>
        </div>

        {/* Pending */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          </div>

          <p className="text-xs font-medium text-slate-500">
            Pending
          </p>

          <h3 className="mt-1 text-2xl font-bold tracking-tight text-amber-600">
            {analytics.pending}
          </h3>
        </div>

        {/* Success Rate */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm">
          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
          </div>

          <p className="text-xs font-medium text-slate-500">
            Success Rate
          </p>

          <h3 className="mt-1 text-2xl font-bold tracking-tight text-indigo-600">
            {analytics.successRate.toFixed(1)}%
          </h3>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-7 flex items-center gap-2 border-t border-slate-100 pt-4">
        <span className="h-2 w-2 rounded-full bg-indigo-500" />

        <p className="text-xs text-slate-500">
          Keep track of your interview outcomes to understand your progress.
        </p>
      </div>
    </div>
  );
}