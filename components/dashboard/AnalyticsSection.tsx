import AnalyticsCard from "./AnalyticsCard";

import { Application } from "@/types/application";

import { getAnalytics } from "@/lib/dashboard/getAnalytics";
import getMonthlyApplications from "@/lib/dashboard/getMonthlyApplications";
import { useMemo } from "react";

interface AnalyticsSectionProps {
  applications: Application[];
}

export default function AnalyticsSection({
  applications,
}: AnalyticsSectionProps) {
  const { analytics, monthlyApplications } = useMemo(() => {
    return {
      analytics: getAnalytics(applications),
      monthlyApplications: getMonthlyApplications(applications),
    };
  }, [applications]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <AnalyticsCard
          title="This Month"
          value={monthlyApplications}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <AnalyticsCard
          title="Interview Rate"
          value={`${analytics.interviewRate.toFixed(1)}%`}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <AnalyticsCard
          title="Offer Rate"
          value={`${analytics.offerRate.toFixed(1)}%`}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <AnalyticsCard
          title="Rejected"
          value={analytics.rejected}
        />
      </div>
    </div>
  );
}