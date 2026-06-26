import { Recruiter } from "@/types/recruiter";

interface Props {
  recruiter: Recruiter;
}

export default function RecruiterCard({ recruiter }: Props) {
  return (
    <div className="border rounded-lg p-5 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        {recruiter.name}
      </h2>

      <div className="space-y-2">
        {recruiter.email && (
          <p>
            <strong>Email:</strong> {recruiter.email}
          </p>
        )}

        {recruiter.phone && (
          <p>
            <strong>Phone:</strong> {recruiter.phone}
          </p>
        )}

        {recruiter.linkedin && (
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a
              href={recruiter.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Profile
            </a>
          </p>
        )}

        {recruiter.lastContact && (
          <p>
            <strong>Last Contact:</strong>{" "}
            {new Date(recruiter.lastContact).toLocaleDateString()}
          </p>
        )}

        {recruiter.nextFollowUp && (
          <p>
            <strong>Next Follow-up:</strong>{" "}
            {new Date(recruiter.nextFollowUp).toLocaleDateString()}
          </p>
        )}

        {recruiter.notes && (
          <div className="mt-3">
            <strong>Notes</strong>

            <p className="whitespace-pre-wrap text-gray-700">
              {recruiter.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}