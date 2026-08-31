import { getApplicationStreak } from "@/lib/dashboard/getApplicationStreak";
import { Application } from "@/types/application";
import { useMemo } from "react";

interface StreakTrackerProps {
  applications: Application[];
}

export default function StreakTracker({ applications }: StreakTrackerProps) {
  const streak = useMemo(()=> getApplicationStreak(applications),[applications])

  return (
    <div className="rounded-lg p-6 bg-transparent backdrop-blur-2xl">
      <h2 className="text-2xl font-semibold mb-6 tracking-tight">Job Search Streak</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-500 text-sm">Current Streak</p>

          <h3 className="text-3xl font-bold">{streak.currentStreak || "0"}</h3>

          <p>Day(s)</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-500 text-sm">Longest Streak</p>

          <h3 className="text-3xl font-bold">{streak.longestStreak}</h3>

          <p>Day(s)</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-500 text-sm">Applied Today</p>

          <span role="img" aria-label={streak.appliedToday ? "Applied today" : "Did not apply today"} className="mt-4">
            {streak.appliedToday ? "✅" : "❌"}
          </span>
        </div>
      </div>
    </div>
  );
}
