import getApplicationAnalytics from "@/lib/dashboard/getApplicationAnalytics";
import { getAverageInterviewTime } from "@/lib/dashboard/getAverageInterviewTime";
import { Application } from "@/types/application";

interface ApplicationAnalyticsProps {
  applications: Application[];
}
export default function ApplicationAnalytics({ applications }: ApplicationAnalyticsProps) {

  const analytics = getApplicationAnalytics(applications);

  const avgInterviewTime = getAverageInterviewTime(applications);
  return (
    <div className="border rounded-lg p-6 bg-white">
      <h2
        className="text-xl font-semibold mb-6">
        Application Analytics
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <p className="text-gray-500">Interview Rate</p>
          <h3 className="text-2xl font-bold">
            {analytics.interviewRate.toFixed(1)}%
          </h3>
        </div>

        <div>
          <p className="text-gray-500">Offer Rate</p>

          <h3 className="text-2xl font-bold">
            {analytics.offerRate.toFixed(1)}%
          </h3>
        </div>

        <div>
          <p className="text-gray-500">Rejections</p>

          <h3 className="text-2xl font-bold">{analytics.rejected}</h3>
        </div>
      </div>

      <div>
        <p className="text-gray-500">Avg Interview Time</p>

        <h3 className="text-2xl font-bold">
          {avgInterviewTime.toFixed(1)} days
        </h3>
      </div>
    </div>
  );
}
