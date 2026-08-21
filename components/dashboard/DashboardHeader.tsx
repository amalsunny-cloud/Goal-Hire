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
  applications,
}: DashboardHeaderProps) {
  const hour = new Date().getHours();

  let greeting = "Hello";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  const reminders = getReminderCount(applications);
  return (
    <div className="max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6">
      <h1 className="text-3xl font-bold mb-2">{greeting} 👋</h1>
      <p className="text-sm leading-6 text-blue-100/75 sm:text-base">
        Keep pushing forward. Every application is a step closer to your next
        role.
      </p>
    </div>
  );
}
