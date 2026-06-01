import { Application } from "@/types/application";
import ApplicationCard from "./ApplicationCard";

interface ListProps {
  applications: Application[];
  onDelete: (id: string)=> void;
  onStatusChange: (
    id: string,
    status: string,
  )=> void;
}

export default function ApplicationList({ applications,onDelete, onStatusChange }: ListProps) {
  if (applications.length === 0)
    return (
      <div className="border rounded-lg p-6 bg-white">
        <p>No Application added yet.</p>;
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
