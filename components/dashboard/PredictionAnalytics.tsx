import { getPredictionAnalytics } from "@/lib/dashboard/getPredictionAnalytics";
import { Application } from "@/types/application";

interface Props {
  applications: Application[];
}
export default function PredictionAnalytics({ applications }: Props) {
  const analytics = getPredictionAnalytics(applications);
  return (
    <div className="border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-semibold mb-6">Prediction Dashboard</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-500">Total Applications</p>

          <h3 className="text-3xl font-bold">{analytics.totalApplications}</h3>
        </div>

        <div>
          <p className="text-gray-500">Interview Rate</p>

          <h3 className="text-3xl font-bold">
            {analytics.interviewRate.toFixed(1)}%
          </h3>
        </div>

        <div>
          <p className="text-gray-500">Offer Rate</p>

          <h3 className="text-3xl font-bold">
            {analytics.offerRate.toFixed(1)}%
          </h3>
        </div>

        <div>
          <p className="text-gray-500">
            Expected Interviews (per 100 Applications)
          </p>

          <h3 className="text-3xl font-bold">{analytics.expectedInterviews}</h3>
        </div>

        <div>
          <p className="text-gray-500">
            Expected Offers (per 100 Applications)
          </p>

          <h3 className="text-3xl font-bold">{analytics.expectedOffers}</h3>
        </div>
      </div>
    </div>
  );
}
