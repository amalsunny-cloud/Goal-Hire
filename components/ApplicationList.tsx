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
      <div className="flex min-h-40 items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 p-8">
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-700">
            No matching applications
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Try changing your search or filter.
          </p>
        </div>
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