import { getCompanyInsights } from "@/lib/dashboard/getCompanyInsights";
import { getStatusDistribution } from "@/lib/dashboard/getStatusDistribution";
import { Application } from "@/types/application";
import { useMemo } from "react";

interface CompanyInsightsProps {
  applications: Application[];
}
export default function CompanyInsights({
  applications,
}: CompanyInsightsProps) {
  const { insights, status } = useMemo(
    () => ({
      insights: getCompanyInsights(applications),
      status: getStatusDistribution(applications),
    }),
    [applications],
  );

  return (
    <div className="rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Company Insights</h2>

      <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="py-2 flex justify-center gap-2">
          <p className="text-gray-500">Top Location : </p>

          <h4 className="text-xl font-bold">
            {insights.topLocation || "No data"}
          </h4>
        </div>

        <div className="py-2 flex justify-center gap-2">
          <p className="text-gray-500">Top Role : </p>

          <h4 className="text-xl font-bold">{insights.topRole || "No data"}</h4>
        </div>

        <div className="py-2 flex justify-center gap-2">
          <p className="text-gray-500">Top Company : </p>

          <h4 className="text-xl font-bold">
            {insights.topCompany || "No data"}
          </h4>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-3">Status Distribution</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="bg-white rounded-lg p-3">
            <p className="text-gray-500">Applied</p>
            <h3 className="text-2xl font-bold">{status.applied}</h3>
          </div>

          <div className="bg-white rounded-lg p-3">
            <p className="text-gray-500">Interview</p>  
            <h3 className="text-2xl font-bold">{status.interview}</h3> 
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-gray-500">Offer</p>  
            <h3 className="text-2xl font-bold">{status.offer}</h3> 
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-gray-500">Rejected</p>  
            <h3 className="text-2xl font-bold">{status.rejected}</h3> 
          </div>

        </div>
      </div>
    </div>
  );
}
