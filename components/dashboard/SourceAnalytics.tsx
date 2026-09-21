import { getSourceAnalytics } from "@/lib/dashboard/getSourceAnalytics";
import { Application } from "@/types/application";

interface SourceAnalyticsProps {
  applications: Application[];
}

export default function SourceAnalytics({
  applications,
}: SourceAnalyticsProps) {
  const analytics = getSourceAnalytics(applications);

  const sources = Object.entries(analytics).sort((a, b) => b[1] - a[1]);

  if (sources.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Job Sources
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              See where your job opportunities are coming from
            </p>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50">
            <span className="text-lg">🔎</span>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex min-h-45 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 text-center">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
            <span className="text-lg">📊</span>
          </div>

          <p className="text-sm font-semibold text-slate-700">
            No source data
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Your job sources will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Header */}
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Job Sources
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            See where your applications are coming from
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50">
          <span className="text-lg">🔎</span>
        </div>
      </div>

      {/* Sources */}
      <div className="space-y-3">
        {Object.entries(analytics).map(([source, count], index) => (
          <div
            key={source}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm"
          >
            <div className="flex min-w-0 items-center gap-3">
              {/* Rank */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold text-slate-500 shadow-sm">
                {index + 1}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {source}
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  Job application source
                </p>
              </div>
            </div>

            {/* Count */}
            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-600">
                {count}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-7 flex items-center gap-2 border-t border-slate-100 pt-4">
        <span className="h-2 w-2 rounded-full bg-indigo-500" />

        <p className="text-xs text-slate-500">
          Track which sources generate the most applications.
        </p>
      </div>
    </div>
  );
}