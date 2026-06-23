import { Application } from "@/types/application";
import { Goal } from "@/types/goal";

interface Props {
  applications: Application[];
  goal: Goal
}

export default function GoalTracker({ applications, goal }: Props) {
  const applicationGoal = goal.applicationGoal;
    console.log("application goal in GoalTracker:",applicationGoal);

  const interviewGoal = goal.interviewGoal;
  console.log("Interview goal in GoalTracker:",interviewGoal);
  const offerGoal = goal.offerGoal;

  const applicationCount = applications.length;

  const interviewCount = applications.filter(
    (app) => app.status === "Interview",
  ).length;

  const offerCount = applications.filter(
    (app) => app.status === "Offer",
  ).length;

  const applicationProgress = Math.min(
    (applicationCount / applicationGoal) * 100,
    100,
  );

  const interviewProgress = Math.min(
    (interviewCount / interviewGoal) * 100,
    100,
  );

  const offerProgress = Math.min((offerCount / offerGoal) * 100, 100);

  return (
    <div className="border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-semibold mb-6">Monthly Goals</h2>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span>Applications</span>

            <span>
              {applicationCount} / {applicationGoal}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full"
              style={{
                width: `${applicationProgress}%`,
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span>Interviews</span>

            <span>
              {interviewCount} / {interviewGoal}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-yellow-500 h-3 rounded-full"
              style={{
                width: `${interviewProgress}%`,
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span>Offers</span>

            <span>
              {offerCount} / {offerGoal}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{
                width: `${offerProgress}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
