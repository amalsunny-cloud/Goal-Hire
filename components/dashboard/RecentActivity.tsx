interface Application {
  _id: string;
  company: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface RecentActivityProps {
  applications: Application[];
}
export default function RecentActivity({ applications }: RecentActivityProps) {

  const recentApplications = [...applications]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

      {recentApplications.length === 0 ? (
        <p className="text-gray-500">No recent activity</p>
      ):(
        <div className="space-y-3">
            {recentApplications.map((app)=>(
                <div key={app._id} className="border-b pb-2">
                    <p className="font-medium">{app.company}</p>
                    <p className="text-sm text-gray-500">{app.role}</p>
                    <p className="text-sm">

  {app.status === "Offer" &&
    "🎉 Offer received"}

  {app.status === "Interview" &&
    "📅 Interview stage"}

  {app.status === "Rejected" &&
    "❌ Rejected"}

  {app.status === "Applied" &&
    "📨 Application submitted"}

</p>
                    <p className="text-xs text-gray-400">Updated:
                        {" "}
                        {new Date(app.updatedAt).toLocaleString("en-GB")}
                    </p>
                </div>
            ))}
        </div>
      )}
    </div>
  );
}
