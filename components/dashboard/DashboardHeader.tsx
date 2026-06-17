import { getReminderCount } from "@/lib/dashboard/getReminderCount";
import { Application } from "@/types/application";

interface DashboardHeaderProps {
  applicationCount: number;
  interviewCount: number;
  offerCount: number;
  applications: Application[];
}

export default function DashboardHeader({
  applicationCount,
  interviewCount,
  offerCount,
  applications
}: DashboardHeaderProps) {
  console.log("Interview count in dashboardheaer is:", interviewCount);
  const hour = new Date().getHours();

  let greeting = "Hello";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  const reminders = getReminderCount(applications)
  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <h1 className="text-3xl font-bold mb-2">{greeting} 👋</h1>
      <p className="text-gray-500">
        Keep pushing forward. Every application is a step closer to your next
        role.
      </p>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-gray-500">Applications</p>
          <p className="text-2xl font-bold">{applicationCount}</p>
        </div>

        <div>
          <p className="text-gray-500">Interviews</p>
          <p className="text-2xl font-bold">{interviewCount}</p>
        </div>

        <div>
          <p className="text-gray-500">Offers</p>
          <p className="text-2xl font-bold">{offerCount}</p>
        </div>
        <div>
          <p className="text-gray-500">Reminders</p>
          <p className="text-2xl font-bold">🔔 {reminders}</p>
        </div>
      </div>
    </div>
  );
}
