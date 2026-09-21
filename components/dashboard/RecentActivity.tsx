interface Application {
  _id: string;
  company: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface RecentActivityProps {
  applications: Application[];
}

export default function RecentActivity({
  applications,
}: RecentActivityProps) {
  const recentApplications = [...applications]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">

      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Recent Activity
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Latest updates from your applications
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50">
          <span className="text-base">↗</span>
        </div>
      </div>

      {recentApplications.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-8 text-center">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
            <span className="text-lg text-slate-400">◷</span>
          </div>

          <p className="text-sm font-semibold text-slate-700">
            No recent activity
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Updates to your applications will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {recentApplications.map((app) => (
            <div
              key={app._id}
              className="
                group
                relative
                rounded-2xl
                border
                border-slate-100
                bg-slate-50/70
                p-4
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-slate-200
                hover:bg-white
                hover:shadow-sm
              "
            >
              {/* Activity indicator */}
              <div className="absolute left-0 top-4 h-10 w-1 rounded-r-full bg-indigo-500" />

              {/* Company + Role */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    {app.company}
                  </p>

                  <p className="mt-1 truncate text-xs text-slate-500">
                    {app.role}
                  </p>
                </div>

                {/* Status */}
                <div className="shrink-0">
                  {app.status === "Offer" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Offer
                    </span>
                  )}

                  {app.status === "Interview" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      Interview
                    </span>
                  )}

                  {app.status === "Rejected" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-bold text-rose-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                      Rejected
                    </span>
                  )}

                  {app.status === "Applied" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      Applied
                    </span>
                  )}
                </div>
              </div>

              {/* Activity message */}
              <div className="mt-3">
                {app.status === "Offer" && (
                  <span className="text-xs font-semibold text-emerald-600">
                    🎉 Offer received
                  </span>
                )}

                {app.status === "Interview" && (
                  <span className="text-xs font-semibold text-blue-600">
                    📅 Interview stage
                  </span>
                )}

                {app.status === "Rejected" && (
                  <span className="text-xs font-semibold text-rose-600">
                    ❌ Rejected
                  </span>
                )}

                {app.status === "Applied" && (
                  <span className="text-xs font-semibold text-amber-600">
                    📨 Application submitted
                  </span>
                )}
              </div>

              {/* Updated time */}
              <div className="mt-3 border-t border-slate-100 pt-3">
                <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                  Updated
                </p>

                <p className="mt-0.5 text-[11px] text-slate-500">
                  {new Date(app.updatedAt).toLocaleString("en-GB")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}