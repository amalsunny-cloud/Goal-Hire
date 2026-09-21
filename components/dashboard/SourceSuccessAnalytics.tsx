import { Application } from "@/types/application";
import { getSourceSuccessAnalytics } from "@/lib/dashboard/getSourceSuccessAnalytics";

interface SourceSuccessAnalyticsProps {
  applications: Application[];
}

export default function SourceSuccessAnalytics({
  applications,
}: SourceSuccessAnalyticsProps) {
  const analytics = getSourceSuccessAnalytics(applications);

  const sources = Object.entries(analytics).sort(
    (a, b) => b[1].applications - a[1].applications
  );

  if (sources.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Source Success Analytics
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Compare application results across different job sources
            </p>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50">
            <span className="text-lg">📊</span>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex min-h-45 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 text-center">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
            <span className="text-lg">📈</span>
          </div>

          <p className="text-sm font-semibold text-slate-700">
            No source data
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Source performance will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Header */}
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Source Success Analytics
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Compare how different job sources perform
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50">
          <span className="text-lg">📊</span>
        </div>
      </div>

      {/* Source Analytics */}
      <div className="space-y-4">
        {sources.map(([source, data]) => {
          const interviewRate =
            data.applications > 0
              ? (data.interviews / data.applications) * 100
              : 0;

          const offerRate =
            data.applications > 0
              ? (data.offers / data.applications) * 100
              : 0;

          return (
            <div
              key={source}
              className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 transition-all duration-200 hover:border-slate-200 hover:bg-white hover:shadow-sm"
            >
              {/* Source Header */}
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm">
                    🔗
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-base font-bold text-slate-900">
                      {source}
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Application source
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Metrics */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {/* Applications */}
                <div className="rounded-xl border border-slate-100 bg-white p-3.5">
                  <p className="text-xs font-medium text-slate-500">
                    Applications
                  </p>

                  <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                    {data.applications}
                  </p>
                </div>

                {/* Interviews */}
                <div className="rounded-xl border border-slate-100 bg-white p-3.5">
                  <p className="text-xs font-medium text-slate-500">
                    Interviews
                  </p>

                  <p className="mt-1 text-2xl font-bold tracking-tight text-indigo-600">
                    {data.interviews}
                  </p>
                </div>

                {/* Offers */}
                <div className="rounded-xl border border-slate-100 bg-white p-3.5">
                  <p className="text-xs font-medium text-slate-500">
                    Offers
                  </p>

                  <p className="mt-1 text-2xl font-bold tracking-tight text-emerald-600">
                    {data.offers}
                  </p>
                </div>
              </div>

              {/* Rates */}
              <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-200 pt-4 sm:grid-cols-2">
                {/* Interview Rate */}
                <div className="flex items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50/60 px-4 py-3">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Interview Rate
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Applications → Interviews
                    </p>
                  </div>

                  <span className="text-lg font-bold text-indigo-600">
                    {interviewRate.toFixed(1)}%
                  </span>
                </div>

                {/* Offer Rate */}
                <div className="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Offer Rate
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Applications → Offers
                    </p>
                  </div>

                  <span className="text-lg font-bold text-emerald-600">
                    {offerRate.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {Object.keys(analytics).length === 0 && (
          <p className="text-xs text-slate-500">No source data available.</p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-7 flex items-center gap-2 border-t border-slate-100 pt-4">
        <span className="h-2 w-2 rounded-full bg-indigo-500" />

        <p className="text-xs text-slate-500">
          Use source performance to understand where your applications are
          coming from.
        </p>
      </div>
    </div>
  );
}