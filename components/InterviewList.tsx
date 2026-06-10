"use client";
import { useRouter } from "next/navigation";
import DeleteModal from "./modals/DeleteModal";
import { useState } from "react";

interface Interview {
  _id: string;
  applicationId: string;
  round: string;
  date?: string;
  outcome: "Pending" | "Passed" | "Failed";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface InterviewListProps {
  interviews: Interview[];
}
export default function InterviewList({ interviews }: InterviewListProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const deleteInterview = async () => {
    // const confirmed = window.confirm("Delete this interview?");
    // if (!confirmed) {
    //   return;
    // }

    if (!selectedId) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/interviews/${selectedId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete interview");
      }

      router.refresh();
      setShowModal(false);

      setSelectedId(null);
    } catch (error) {
      console.error("Delete Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (interviews.length === 0) {
    return (
      <div className="border rounded p-4">
        <p className="text-red-600">No interviews added yet.</p>
      </div>
    );
  }

  const updateOutcome = async (interviewId: string, outcome: string) => {
    try {
      const response = await fetch(`/api/interviews/${interviewId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          outcome,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update outcome");
      }

      router.refresh();
    } catch (error) {
      console.error("Update Error:", error);
    }
  };
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Interviews</h2>
      {interviews.map((interview) => (
        <div key={interview._id} className="border rounded p-4 space-y-2">
          <div className="flex justify-between">
            <h3 className="font-bold">{interview.round}</h3>
            <button
              onClick={() => {
                setSelectedId(interview._id);
                setShowModal(true);
              }}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>

          <p>
            Date:{" "}
            {interview.date
              ? new Date(interview.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "Not Set"}
          </p>

          <p>Notes: {interview.notes || "No notes"}</p>

          <div>
            <label>Outcome:</label>
            <select
              value={interview.outcome}
              onChange={(e) => updateOutcome(interview._id, e.target.value)}
              className="border p-2 rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>
      ))}
      <DeleteModal isOpen = {showModal} title="Delete Interview" message="Are you sure you want to delete this interview?" 
      onConfirm={deleteInterview}
      onCancel={()=>{
        setShowModal(false);
        setSelectedId(null);
      }}
      loading={loading}
      />
    </div>
  );
}
