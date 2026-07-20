import { Application } from "@/types/application";
import StatsCard from "./StatsCard";
import { useMemo } from "react";

interface Props {
    applications: Application[];
}
export default function DashboardStats({ applications }:Props) {

  console.log("Application in dashboardStats is:",applications)

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
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <StatsCard title="Total" value={stats.total}/>
      <StatsCard title="Applied" value={stats.applied}/>
      <StatsCard title="Interview" value={stats.interview}/>
      <StatsCard title="Offer" value={stats.offer}/>
      <StatsCard title="Rejected" value={stats.rejected}/>
    </div>
  )
}
