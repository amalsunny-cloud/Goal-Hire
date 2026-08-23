import { Application, ApplicationStatus } from "@/types/application";
import Link from "next/link";

interface ApplicationCardProps {
  application: Application;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ApplicationStatus) => Promise<boolean>;
}

const statusColor: Record<
  "Applied" | "Interview" | "Offer" | "Rejected",
  string
> = {
  Applied: "bg-blue-300",
  Interview: "bg-yellow-300",
  Offer: "bg-green-300",
  Rejected: "bg-red-300",
};

export default function ApplicationCard({
  application,
  onDelete,
  onStatusChange,
}: ApplicationCardProps) {
  return (
    <div className="bg-slate-50/70 backdrop-blur-2xl rounded-lg p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="flex flex-col justify-center space-y-1">
          <h3 className="font-bold text-lg text-gray-800">
            {application.company}
          </h3>

          <p className="text-gray-600 text-sm">{application.role}</p>

          <span
            className={`inline-block w-fit px-2.5 py-0.5 mx-auto rounded-full text-xs font-semibold ${statusColor[application.status as "Applied" | "Interview" | "Offer" | "Rejected"]}`}
          >
            {application.status}
          </span>
        </div>

        <div className="flex items-center gap-4 self-end sm:self-center">
          <Link
            href={`/dashboard/applications/${application._id}`}
            className="relative text-slate-800 hover:text-slate-900 font-semibold text-sm py-1 after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-slate-900 after:transition-all after:duration-300 after:ease-out hover:after:w-full hover:after:left-0"
          >
            View Details
          </Link>

          <button
            onClick={() => onDelete(application._id)}
            className="text-red-500 hover:text-red-600 font-medium text-sm transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>

      
    </div>
  );
}
