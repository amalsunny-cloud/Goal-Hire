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
  const recentApplications = [...applications].sort((a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    ).slice(0, 5);

  return (
    <div className="rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

      {recentApplications.length === 0 ? (
        <p className="text-gray-500">No recent activity</p>
      ) : (
        <div className="space-y-3">
          {recentApplications.map((app) => (
            <div key={app._id} className="border-b border-gray-500/30 pb-4">
              <p className="font-bold">Company :<span className="font-medium">{" "}{app.company}</span></p>
              <p className="text-sm text-gray-500 pb-2 font-bold">Role : <span className="font-medium">{app.role}</span></p>
              <p className="text-sm">
                {app.status === "Offer" && <span className="font-bold text-green-600">🎉 Offer received</span>}

                {app.status === "Interview" && <span className="font-bold text-blue-600">📅 Interview stage</span>}

                {app.status === "Rejected" && <span className="font-bold text-red-600">❌ Rejected</span>}

                {app.status === "Applied" && <span className="font-bold text-yellow-600">📨 Application submitted</span>}
              </p>
              <p className="text-xs text-gray-400">
                Updated: {new Date(app.updatedAt).toLocaleString("en-GB")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
