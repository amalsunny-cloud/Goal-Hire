import { getOverdueFollowUps } from "@/lib/dashboard/getOverdueFollowUps"
import { getUpcomingFollowUps } from "@/lib/dashboard/getUpcomingFollowUps";
import { Application } from "@/types/application"


interface Props{
    applications: Application[];
}
export default function ReminderWidget({applications}:Props) {
    const overdue = getOverdueFollowUps(applications);
    const upcoming = getUpcomingFollowUps(applications);
  return (
    <div className="border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-semibold mb-6">
        Follow Up Reminders
      </h2>

      <div className="space-y-4">
        {overdue.length > 0 && (
            <div>
                <h3 className="font-bold text-red-500">
                    Overdue
                </h3>

                {overdue.map((app)=>(
                    <div key={app._id}>{app.company}</div>
                ))}
            </div>
        )}


        {upcoming.length>0 && (
            <div>
                <h3 className="font-bold text-yellow-500">
                    Upcoming
                </h3>

                {upcoming.map((app)=>(
                    <div key={app._id}>{app.company}</div>
                ))}
            </div>
        )}
      </div>
    </div>
  )
}
