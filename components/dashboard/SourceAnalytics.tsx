import { getSourceAnalytics } from "@/lib/dashboard/getSourceAnalytics";
import { Application } from "@/types/application";

interface SourceAnalyticsProps {
  applications: Application[];
}

export default function SourceAnalytics({ applications }: SourceAnalyticsProps) {
  const analytics = getSourceAnalytics(applications);

  const sources = Object.entries(analytics).sort((a,b)=>b[1]-a[1])

  if (sources.length === 0) {
  return (
    <div className="shadow-md rounded-lg p-6 bg-slate-400/10">
      <h2 className="text-xl font-semibold mb-6">
        Job Sources
      </h2>

      <p className="text-gray-500">
        No source data available.
      </p>
    </div>
  );
}

  return (
    <div className="shadow-md rounded-lg p-6 bg-slate-400/10">
      <h2 className="text-xl font-semibold mb-6">
        Job Sources
      </h2>

      <div className="space-y-3">
        {Object.entries(analytics).map(([source, count]) => (
          <div
            key={source}
            className="flex justify-between">
            <span>{source}</span>

            <span>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
