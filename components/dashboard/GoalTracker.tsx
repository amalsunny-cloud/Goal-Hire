import { Application } from "@/types/application";
import { Goal } from "@/types/goal";
import { useMemo } from "react";

interface GoalTrackerProps {
  applications: Application[];
  goal: Goal;
}

export default function GoalTracker({
  applications,
  goal,
}: GoalTrackerProps) {
  const { applicationGoal, interviewGoal, offerGoal } = goal;

  const {
    applicationCount,
    interviewCount,
    offerCount,
    applicationProgress,
    interviewProgress,
    offerProgress,
  } = useMemo(() => {
    let interviewCount = 0;
    let offerCount = 0;

    for (const application of applications) {
      if (application.status === "Interview") {
        interviewCount++;
      }

      if (application.status === "Offer") {
        offerCount++;
      }
    }

    const applicationCount = applications.length;

    const applicationProgress =
      applicationGoal > 0
        ? Math.min((applicationCount / applicationGoal) * 100, 100)
        : 0;

    const interviewProgress =
      interviewGoal > 0
        ? Math.min((interviewCount / interviewGoal) * 100, 100)
        : 0;

    const offerProgress =
      offerGoal > 0
        ? Math.min((offerCount / offerGoal) * 100, 100)
        : 0;

    return {
      applicationCount,
      interviewCount,
      offerCount,
      applicationProgress,
      interviewProgress,
      offerProgress,
    };
  }, [applications, applicationGoal, interviewGoal, offerGoal]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Header */}
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Monthly Goals
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Track your progress toward your monthly targets
          </p>
        </div>

        {/* Goal Icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50">
          <span className="text-lg">🎯</span>
        </div>
      </div>

      {/* Goals */}
      <div className="space-y-6">
        {/* Applications */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:border-slate-200 hover:bg-white hover:shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-sm">
                📄
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Applications
                </p>

                <p className="text-xs text-slate-400">
                  Monthly application target
                </p>
              </div>
            </div>

            <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600">
              {applicationCount} / {applicationGoal}
            </span>
          </div>

          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-500"
              role="progressbar"
              aria-valuenow={applicationProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{
                width: `${applicationProgress}%`,
              }}
            />
          </div>

          <div className="mt-2 flex justify-end">
            <span className="text-[11px] font-medium text-slate-400">
              {applicationProgress.toFixed(0)}% complete
            </span>
          </div>
        </div>

        {/* Interviews */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:border-slate-200 hover:bg-white hover:shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-sm">
                💼
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Interviews
                </p>

                <p className="text-xs text-slate-400">
                  Monthly interview target
                </p>
              </div>
            </div>

            <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-600">
              {interviewCount} / {interviewGoal}
            </span>
          </div>

          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-amber-500 transition-all duration-500"
              style={{
                width: `${interviewProgress}%`,
              }}
            />
          </div>

          <div className="mt-2 flex justify-end">
            <span className="text-[11px] font-medium text-slate-400">
              {interviewProgress.toFixed(0)}% complete
            </span>
          </div>
        </div>

        {/* Offers */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:border-slate-200 hover:bg-white hover:shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-sm">
                🎉
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Offers
                </p>

                <p className="text-xs text-slate-400">
                  Monthly offer target
                </p>
              </div>
            </div>

            <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
              {offerCount} / {offerGoal}
            </span>
          </div>

          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{
                width: `${offerProgress}%`,
              }}
            />
          </div>

          <div className="mt-2 flex justify-end">
            <span className="text-[11px] font-medium text-slate-400">
              {offerProgress.toFixed(0)}% complete
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-7 flex items-center gap-2 border-t border-slate-100 pt-4">
        <span className="h-2 w-2 rounded-full bg-indigo-500" />

        <p className="text-xs text-slate-500">
          Keep your application activity consistent to reach your goals.
        </p>
      </div>
    </div>
  );
}