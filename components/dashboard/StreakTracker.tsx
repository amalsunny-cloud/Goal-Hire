import { getApplicationStreak } from "@/lib/dashboard/getApplicationStreak";
import { Application } from "@/types/application";
import { Flame, ArrowRight, Zap, Crown, CalendarCheck } from "lucide-react";
import { useMemo } from "react";

interface StreakTrackerProps {
  applications: Application[];
}

export default function StreakTracker({
  applications,
}: StreakTrackerProps) {
  const streak = useMemo(
    () => getApplicationStreak(applications),
    [applications]
  );

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-linear-to-br from-blue-50 via-white to-indigo-100/80 p-6 md:p-8">

      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-20 h-48 w-48 rounded-full bg-blue-200/30 blur-3xl" />

      {/* Header */}
      <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

        <div className="flex items-start gap-4">

          {/* Flame Icon */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-blue-100 to-indigo-100 shadow-sm">
            <Flame
              className="h-7 w-7 text-blue-600"
              strokeWidth={2.2}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Job Search Streak
            </h2>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Consistency today. Opportunities tomorrow.
            </p>
          </div>
        </div>

       
        
      </div>

      {/* Metrics */}
      <div className="relative z-10 mt-8 grid grid-cols-1 divide-y divide-slate-200/70 rounded-2xl border border-white/70 bg-white/45 backdrop-blur-md sm:grid-cols-3 sm:divide-x sm:divide-y-0">

        {/* Current Streak */}
        <div className="flex items-center gap-4 px-5 py-6 sm:flex-col sm:items-center sm:justify-center sm:px-6">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100/80">
            <Zap className="h-5 w-5 text-blue-600" />
          </div>

          <div className="text-left sm:text-center">
            <p className="text-sm font-medium text-slate-500">
              Current Streak
            </p>

            <h3 className="mt-1 text-4xl font-bold tracking-tight text-slate-900">
              {streak.currentStreak || "0"}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Day(s)
            </p>
          </div>
        </div>

        {/* Longest Streak */}
        <div className="flex items-center gap-4 px-5 py-6 sm:flex-col sm:items-center sm:justify-center sm:px-6">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-100/80">
            <Crown className="h-5 w-5 text-violet-600" />
          </div>

          <div className="text-left sm:text-center">
            <p className="text-sm font-medium text-slate-500">
              Longest Streak
            </p>

            <h3 className="mt-1 text-4xl font-bold tracking-tight text-slate-900">
              {streak.longestStreak}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Day(s)
            </p>
          </div>
        </div>

        {/* Applied Today */}
        <div className="flex items-center gap-4 px-5 py-6 sm:flex-col sm:items-center sm:justify-center sm:px-6">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100/80">
            <CalendarCheck className="h-5 w-5 text-emerald-600" />
          </div>

          <div className="text-left sm:text-center">
            <p className="text-sm font-medium text-slate-500">
              Applied Today
            </p>

            <span
              role="img"
              aria-label={
                streak.appliedToday
                  ? "Applied today"
                  : "Did not apply today"
              }
              className="mt-2 block text-3xl"
            >
              {streak.appliedToday ? "✅" : "❌"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom message */}
      <div className="relative z-10 mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
        Small steps lead to big opportunities.
      </div>
    </div>
  );
}