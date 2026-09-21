import { Application } from "@/types/application";
import { useMemo } from "react";
import { BriefcaseBusiness, ChevronRight } from "lucide-react";

interface RecentApplicationsProps {
  applications: Application[];
}

export default function RecentApplications({
  applications,
}: RecentApplicationsProps) {
  const recent = useMemo(() => {
    return [...applications]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime(),
      )
      .slice(0, 5);
  }, [applications]);

  if (recent.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Recent Applications
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Your latest job applications
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
            <BriefcaseBusiness className="h-4 w-4" />
          </div>
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-8 text-center">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
            <BriefcaseBusiness className="h-5 w-5 text-slate-400" />
          </div>

          <p className="text-sm font-semibold text-slate-700">
            No recent applications
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Your latest applications will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">

      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Recent Applications
            </h2>

            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-50 px-2 text-[11px] font-bold text-blue-600">
              {recent.length}
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Your latest job applications
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
          <BriefcaseBusiness className="h-4 w-4" />
        </div>
      </div>

      {/* Applications */}
      <div className="space-y-2">
        {recent.map((app) => (
          <div
            key={app._id}
            className="
              group
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-slate-100
              bg-slate-50/70
              px-3
              py-3
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:border-slate-200
              hover:bg-white
              hover:shadow-sm
            "
          >
            {/* Company icon */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm ring-1 ring-slate-100">
              <BriefcaseBusiness className="h-4 w-4" />
            </div>

            {/* Company */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">
                {app.company}
              </p>

              <p className="mt-0.5 text-[11px] text-slate-400">
                Recent application
              </p>
            </div>

            
          </div>
        ))}
      </div>
    </div>
  );
}