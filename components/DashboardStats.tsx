import { Application } from "@/types/application";
import StatsCard from "./StatsCard";

interface Props {
    applications: Application[];
}
export default function DashboardStats({ applications }:Props) {

  console.log("Application in dashboardStats is:",applications)
    const total = applications.length;
    const applied = applications.filter((app)=>app.status === "Applied").length;
    const interview = applications.filter((app)=>app.status === "Interview").length;
    const offer = applications.filter((app)=>app.status === "Offer").length;
    const rejected = applications.filter((app)=>app.status === "Rejected").length;
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <StatsCard title="Total" value={total}/>
      <StatsCard title="Applied" value={applied}/>
      <StatsCard title="Interview" value={interview}/>
      <StatsCard title="Offer" value={offer}/>
      <StatsCard title="Rejected" value={rejected}/>
    </div>
  )
}
