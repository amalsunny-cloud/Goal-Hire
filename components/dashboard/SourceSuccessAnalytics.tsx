import { Application } from "@/types/application";
import { getSourceSuccessAnalytics } from "@/lib/dashboard/getSourceSuccessAnalytics";

interface SourceSuccessAnalyticsProps {
  applications: Application[];
}

export default function SourceSuccessAnalytics({ applications }: SourceSuccessAnalyticsProps) {

  const analytics = getSourceSuccessAnalytics(applications);

   const sources = Object.entries(analytics).sort(
    (a, b) => b[1].applications - a[1].applications
  );


  if (sources.length === 0) {
  return (
    <div className="rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">
        Source Success Analytics
      </h2>

      <p className="text-gray-500">
        No source data available.
      </p>
    </div>
  );
}


  return (
    <div className="rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Source Success Analytics</h2>

      <div className="space-y-4">
        {sources.map(([source, data]) => {
          const interviewRate =
            data.applications > 0
              ? (data.interviews / data.applications) * 100
              : 0;

          const offerRate =
            data.applications > 0 ? (data.offers / data.applications) * 100 : 0;

          return (
            <div key={source} className="rounded-lg p-6">
              <h3 className="font-bold text-lg mb-3">{source}</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-3">
                  <p className="text-gray-500 text-sm">Applications</p>

                  <p className="text-xl font-semibold">{data.applications}</p>
                </div>

                <div className="bg-white rounded-lg p-3">
                  <p className="text-gray-500 text-sm">Interviews</p>

                  <p className="text-xl font-semibold">{data.interviews}</p>
                </div>

                <div className="bg-white rounded-lg p-3">
                  <p className="text-gray-500 text-sm">Offers</p>

                  <p className="text-xl font-semibold">{data.offers}</p>
                </div>
              </div>

              <div className="mt-4 border-t border-gray-500/30 pt-3 space-y-1">
                <p className="bg-white rounded-lg p-3">
                  Interview Rate:{" "}
                  <span className="font-semibold">
                    {interviewRate.toFixed(1)}%
                  </span>
                </p>

                <p className="bg-white rounded-lg p-3">
                  Offer Rate:{" "}
                  <span className="font-semibold">{offerRate.toFixed(1)}%</span>
                </p>
              </div>
            </div>
          );
        })}

        {Object.keys(analytics).length === 0 && (
          <p className="text-gray-500">No source data available.</p>
        )}
      </div>
    </div>
  );
}
