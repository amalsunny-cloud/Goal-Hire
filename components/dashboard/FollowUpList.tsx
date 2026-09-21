interface Application {
  _id: string;
  company: string;
  role: string;
  status: string;
  followUpDate?: string;
}

interface FollowUpListProps {
  applications: Application[];
}

export default function FollowUpList({
  applications,
}: FollowUpListProps) {
  const today = new Date();
  const next7Days = new Date();

  next7Days.setDate(today.getDate() + 7);

  const upcomingFollowUps = applications.filter((app) => {
    if (!app.followUpDate) return false;

    const followUp = new Date(app.followUpDate);

    return followUp >= today && followUp <= next7Days;
  });

  if (upcomingFollowUps.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Follow Ups
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Stay on top of your upcoming application follow-ups
            </p>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50">
            <span className="text-lg">📧</span>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex min-h-37.5 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 text-center">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50">
            <span className="text-lg">✓</span>
          </div>

          <p className="text-sm font-semibold text-slate-700">
            All caught up
          </p>

          <p className="mt-1 text-xs text-slate-500">
            No follow-ups due this week.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Follow Ups
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Follow-ups scheduled within the next 7 days
          </p>
        </div>

        {/* Count */}
        <div className="flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-amber-500" />

          <span className="text-xs font-bold text-amber-700">
            {upcomingFollowUps.length}
          </span>
        </div>
      </div>

      {/* Follow Ups */}
      <div className="space-y-3">
        {upcomingFollowUps.map((app) => (
          <div
            key={app._id}
            className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm"
          >
            {/* Accent */}
            <div className="absolute bottom-0 left-0 top-0 w-1 bg-amber-400" />

            <div className="flex items-start justify-between gap-4 pl-2">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold text-slate-900">
                  {app.company}
                </h3>

                <p className="mt-1 truncate text-xs font-medium text-slate-500">
                  {app.role}
                </p>
              </div>

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-sm">
                📧
              </div>
            </div>

            {/* Follow-up Date */}
            <div className="mt-4 ml-2 flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-sm">📅</span>

                <span className="text-xs font-medium text-slate-500">
                  Follow Up
                </span>
              </div>

              <span className="text-xs font-bold text-slate-700">
                {new Date(app.followUpDate!).toLocaleDateString("en-GB")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4">
        <span className="h-2 w-2 rounded-full bg-amber-500" />

        <p className="text-xs text-slate-500">
          Follow up consistently to keep your applications moving.
        </p>
      </div>
    </div>
  );
}