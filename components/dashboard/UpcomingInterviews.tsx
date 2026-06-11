interface Interview {
  _id: string;
  applicationId: string;
  round: string;
  date?: string;
  outcome: "Pending" | "Passed" | "Failed";
  notes?: string;
}

interface UpcomingInterviewProps {
  interviews: Interview[];
}
export default function UpcomingInterviews({
  interviews,
}: UpcomingInterviewProps) {
  const today = new Date();

  const upcomingInterviews = interviews
    .filter((interview) => {
      if (!interview.date) return false;

      return new Date(interview.date) >= today;
    })
    .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());

  if (upcomingInterviews.length === 0) {
    return (
      <div className="border rounded-lg p-4">
        <h2
          className="
      text-xl
      font-semibold
      mb-2
    "
        >
          Upcoming Interviews
        </h2>

        <p
          className="
      text-gray-500
    "
        >
          No upcoming interviews scheduled.
        </p>
      </div>
    );
  }
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Upcoming Interviews</h2>

      <div className="space-y-3">
        {upcomingInterviews.map((interview) => (
          <div key={interview._id} className="border rounded p-3">
            <h3 className="font-semibold text-orange-400">{interview.round}</h3>
            <p>Date: {new Date(interview.date!).toLocaleDateString("en-GB")}</p>

            <p>Outcome: {interview.outcome}</p>

            {interview.notes && <p>Notes: {interview.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
