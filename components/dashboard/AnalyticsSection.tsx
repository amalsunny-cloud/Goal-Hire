import AnalyticsCard from "./AnalyticsCard";

import { Application } from "@/types/application";

import { getAnalytics }
from "@/lib/dashboard/getAnalytics";
import getMonthlyApplications from "@/lib/dashboard/getMonthlyApplications";
import { useMemo } from "react";

interface Props {
  applications: Application[];
}

export default function AnalyticsSection({
  applications,
}: Props) {

  const { analytics, monthlyApplications } = useMemo(() => {
  return {
    analytics: getAnalytics(applications),
    monthlyApplications: getMonthlyApplications(applications),
  };
}, [applications]);

  return (
    <div
      className="
        grid
        md:grid-cols-3
        gap-4
      "
    >

      <AnalyticsCard
        title="Offer Rate"
        value={`${analytics.offerRate.toFixed(1)}%`}
      />

      <AnalyticsCard
        title="Interview Rate"
        value={`${analytics.interviewRate.toFixed(1)}%`}
      />

      <AnalyticsCard
        title="Rejected"
        value={analytics.rejected}
      />
      
      <AnalyticsCard
  title="This Month"
  value={
    monthlyApplications
  }
/>

    </div>
  );
}