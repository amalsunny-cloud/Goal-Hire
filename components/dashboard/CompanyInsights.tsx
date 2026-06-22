import { getCompanyInsights } from "@/lib/dashboard/getCompanyInsights";
import { getStatusDistribution } from "@/lib/dashboard/getStatusDistribution";
import { Application } from "@/types/application";

interface Props {
  applications: Application[];
}
export default function CompanyInsights({ applications }: Props) {
  const insights = getCompanyInsights(applications);
  const status = getStatusDistribution(applications);

  return (
    <div className="border rounded-lg p-6 bg-white">
      <h2
        className="
          text-xl
          font-semibold
          mb-6
        "
      >
        Company Insights
      </h2>

      <div
        className="
          grid
          md:grid-cols-3
          gap-4
        "
      >
        <div>
          <p className="text-gray-500">Top Location</p>

          <h3 className="text-xl font-bold">{insights.topLocation}</h3>
        </div>

        <div>
          <p className="text-gray-500">Top Role</p>

          <h3 className="text-xl font-bold">{insights.topRole}</h3>
        </div>

        <div>
          <p className="text-gray-500">Top Company</p>

          <h3 className="text-xl font-bold">{insights.topCompany}</h3>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-3">Status Distribution</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>Applied: {status.applied}</div>

          <div>Interview: {status.interview}</div>

          <div>Offer: {status.offer}</div>

          <div>Rejected: {status.rejected}</div>
        </div>
      </div>
    </div>
  );
}
