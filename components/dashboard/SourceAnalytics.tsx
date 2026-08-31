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
    <div className="rounded-lg p-6">
      <h2 className="text-2xl tracking-tight font-semibold mb-6">
        Job Sources
      </h2>

      <p className="text-gray-500">
        No source data available.
      </p>
    </div>
  );
}

  return (
    <div className="rounded-lg p-6 mx-auto w-[50%]">
      <h2 className="text-2xl tracking-tight font-semibold mb-6">
        Job Sources
      </h2>

      <div className="space-y-3">
        {Object.entries(analytics).map(([source, count]) => (
          <div
            key={source}
            className="flex justify-between bg-white rounded-lg p-3">
            <span>{source}</span>

            <span>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
