"use client";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const deleteInterview = async (interviewId: string) => {
    const confirmed = window.confirm("Delete this interview?");
    if (!confirmed) {
      return;
    }
    try {
      const response = await fetch(`/api/interviews/${interviewId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete interview");
      }

      router.refresh();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  if (interviews.length === 0) {
    return (
      <div className="border rounded p-4">
        <p className="text-red-600">No interviews added yet.</p>
      </div>
    );
  }


  const updateOutcome = async (interviewId: string, outcome: string)=>{
    try{
      const response = await fetch(`/api/interviews/${interviewId}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          outcome,
        }),
      })

      if(!response.ok){
        throw new Error("Failed to update outcome");
      }

      router.refresh();
    }catch(error){
      console.error("Update Error:",error);
      
    }
  }
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Interviews</h2>
      {interviews.map((interview) => (
        <div key={interview._id} className="border rounded p-4 space-y-2">
          <div className="flex justify-between">
            <h3 className="font-bold">{interview.round}</h3>
            <button
              onClick={() => deleteInterview(interview._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>

          <p>
            Date:{" "}
            {interview.date
              ? new Date(interview.date).toLocaleDateString()
              : "Not Set"}
          </p>

          <p>Notes: {interview.notes || "No notes"}</p>

          <div>
            <label>Outcome:</label>
            <select value={interview.outcome} onChange={(e)=>updateOutcome(interview._id, e.target.value)} className="border p-2 rounded">
              <option value="Pending">Pending</option>
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
