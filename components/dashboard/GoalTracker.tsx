import { Application } from "@/types/application";
import { Goal } from "@/types/goal";
import { useMemo } from "react";

interface GoalTrackerProps {
  applications: Application[];
  goal: Goal
}

export default function GoalTracker({ applications, goal }: GoalTrackerProps) {

  const { applicationGoal, interviewGoal, offerGoal } = goal;

  const { applicationCount, interviewCount, offerCount, applicationProgress, interviewProgress, offerProgress } = useMemo(()=>{
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
  
  // const applicationGoal = goal.applicationGoal;
  //   console.log("application goal in GoalTracker:",applicationGoal);

  // const interviewGoal = goal.interviewGoal;
  // console.log("Interview goal in GoalTracker:",interviewGoal);
  // const offerGoal = goal.offerGoal;

  

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
              role="progressbar"
              aria-valuenow={applicationProgress}
              aria-valuemin={0}
              aria-valuemax={100}
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
