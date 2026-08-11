import { Application } from "@/types/application";
import ApplicationCard from "./ApplicationCard";

interface ApplicationListProps {
  applications: Application[];
  onDelete: (id: string)=> void;
  onStatusChange: (
    id: string,
    status: string,
  )=> void;
}

export default function ApplicationList({ applications,onDelete, onStatusChange }: ApplicationListProps) {
  
  if (applications.length === 0)
    return (
      <div className="text-center flex justify-center items-center rounded-lg p-6 bg-slate-400/10">
        <p className="text-red-600 font-semibold">No applications match your filters.</p>
      </div>
    );
  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <ApplicationCard key={app._id}
        application={app}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
        
        />
      ))}
    </div>
  );
}
