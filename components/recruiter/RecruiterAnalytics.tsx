import { Recruiter } from "@/types/recruiter";
import StatsCard from "../StatsCard";
import { RecruiterCommunication } from "@/types/recruiterCommunication";

interface Props {
  recruiters: Recruiter[];
  communications: RecruiterCommunication[];
}
export default function RecruiterAnalytics({
  recruiters,
  communications,
}: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);

  const totalRecruiters = recruiters.length;
  const totalCommunications = communications.length;

  const contactedToday = recruiters.filter((recruiter) => {
    if (!recruiter.lastContact) {
      return false;
    }

    const date = new Date(recruiter.lastContact);
    date.setHours(0, 0, 0, 0);

    return date.getTime() === today.getTime();
  }).length;

  const followUpToday = recruiters.filter((recruiter) => {
    if (!recruiter.nextFollowUp) {
      return false;
    }

    const date = new Date(recruiter.nextFollowUp);
    date.setHours(0, 0, 0, 0);

    return date.getTime() === today.getTime();
  }).length;

  const overdue = recruiters.filter((recruiter) => {
    if (!recruiter.nextFollowUp) {
      return false;
    }

    const date = new Date(recruiter.nextFollowUp);
    date.setHours(0, 0, 0, 0);

    return date.getTime() < today.getTime();
  }).length;

  const contactedThisWeek = recruiters.filter((recruiter) => {
    if (!recruiter.lastContact) {
      return false;
    }
    const date = new Date(recruiter.lastContact);
    date.setHours(0, 0, 0, 0);

    return date >= oneWeekAgo && date <= today;
  }).length;

  const communicationCounts: Record<string, number> = {};
  communications.forEach((communication) => {
    communicationCounts[communication.type] =
      (communicationCounts[communication.type] || 0) + 1;
  });

  const sortedMethods = Object.entries(communicationCounts).sort(
    (a, b) => b[1] - a[1],
  );

  const mostUsedMethod =
    sortedMethods.length > 0 ? sortedMethods[0][0] : "None";

  return (
    <div
      className="
        border
        rounded-lg
        p-6
        bg-white
      "
    >
      <h2
        className="
          text-xl
          font-semibold
          mb-6
        "
      >
        Recruiter Analytics
      </h2>

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-6
          gap-4
        "
      >
        <StatsCard title="Total Recruiters" value={totalRecruiters} />

        <StatCard title="Communications" value={totalCommunications} />
        <StatsCard title="Contacted Today" value={contactedToday} />

        <StatsCard title="Follow-up Today" value={followUpToday} />

        <StatsCard title="Overdue" value={overdue} />

        <StatsCard title="Contacted This Week" value={contactedThisWeek} />
        <StatCard title="Top Method" value={mostUsedMethod} />
      </div>
    </div>
  );
}

interface CardProps {
  title: string;
  value: string | number;
}

function StatCard({ title, value }: CardProps) {
  return (
    <div className="border rounded-lg p-5 text-center bg-gray-50">
      <h3 className="text-gray-500 text-sm">{title}</h3>

      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
