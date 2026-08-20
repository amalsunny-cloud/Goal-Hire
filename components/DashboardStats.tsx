import { Application } from "@/types/application";
import StatsCard from "./StatsCard";
import { useMemo } from "react";

interface DashboardStatsProps {
  applications: Application[];
}
export default function DashboardStats({ applications }: DashboardStatsProps) {
  const stats = useMemo(() => {
    const result = {
      total: applications.length,
      applied: 0,
      interview: 0,
      offer: 0,
      rejected: 0,
    };

    for (const application of applications) {
      switch (application.status) {
        case "Applied":
          result.applied++;
          break;

        case "Interview":
          result.interview++;
          break;

        case "Offer":
          result.offer++;
          break;

        case "Rejected":
          result.rejected++;
          break;
      }
    }

    return result;
  }, [applications]);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
      <StatsCard title="Total" value={stats.total} tone="blue" />
      <StatsCard title="Applied" value={stats.applied} tone="indigo" />
      <StatsCard title="Interview" value={stats.interview} tone="violet" />
      <StatsCard title="Offer" value={stats.offer} tone="emerald" />
      <StatsCard title="Rejected" value={stats.rejected} tone="slate" />
    </div>
  );
}
