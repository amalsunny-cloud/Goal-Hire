import { getApplicationStreak } from "@/lib/dashboard/getApplicationStreak";
import { Application } from "@/types/application";

interface Props {
  applications: Application[];
}
export default function StreakTracker({ applications }: Props) {
  const streak = getApplicationStreak(applications);

  return (
    <div className="border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-semibold mb-6">Job Search Streak</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <p className="text-gray-500">Current Streak</p>

          <h3 className="text-3xl font-bold">{streak.currentStreak}</h3>

          <p>Days</p>
        </div>

        <div>
          <p className="text-gray-500">Longest Streak</p>

          <h3 className="text-3xl font-bold">{streak.longestStreak}</h3>

          <p>Days</p>
        </div>

        <div>
          <p className="text-gray-500">Applied Today</p>

          <h3 className="text-3xl font-bold">
            {streak.appliedToday ? "✅" : "❌"}
          </h3>
        </div>
      </div>
    </div>
  );
}
