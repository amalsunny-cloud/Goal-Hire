import { Application } from "@/types/application";
import Link from "next/link";

interface ApplicationCardProps {
  application: Application;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
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
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{application.company}</h3>

          <p className="text-gray-600">{application.role}</p>

          <span
            className={`px-2 py-1 rounded ${statusColor[application.status as "Applied" | "Interview" | "Offer" | "Rejected"]}`}
          >
            {application.status}
          </span>
        </div>

        <button
          onClick={() => onDelete(application._id)}
          className="text-red-500"
        >
          Delete
        </button>
      </div>

      <div className="mt-4">
        {/* <select
          className="border p-2 rounded text-gray-700"
          value={application.status}
          onChange={(e) => onStatusChange(application._id, e.target.value)}
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select> */}
      </div>

      <Link href={`/dashboard/applications/${application._id}`} className="text-gray-800 text-bold text-sm">View Details</Link>
    </div>
  );
}
