import {
  Application,
  ApplicationStatus,
} from "@/types/application";
import ApplicationCard from "./ApplicationCard";

interface ListProps {
  applications: Application[];

  onDelete: (id: string) => void;

  onStatusChange: (
    id: string,
    status: ApplicationStatus,
  ) => Promise<boolean>;
}

export default function ApplicationList({
  applications,
  onDelete,
  onStatusChange,
}: ListProps) {
  if (applications.length === 0) {
    return (
      <div className="text-center flex justify-center items-center rounded-lg p-6">
        <p className="text-gray-600">
          No matching application found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <ApplicationCard
          key={application._id}
          application={application}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}