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
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Recruiter Analytics
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
            Track recruiter activity, follow-ups, and communication.
          </p>
        </div>

        <div className="hidden rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 sm:block">
          Insights
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <StatsCard
          title="Total Recruiters"
          value={totalRecruiters}
        />

        <StatsCard
          title="Communications"
          value={totalCommunications}
        />

        <StatsCard
          title="Contacted Today"
          value={contactedToday}
        />

        <StatsCard
          title="Follow-up Today"
          value={followUpToday}
        />

        <StatsCard
          title="Overdue"
          value={overdue}
        />

        <StatsCard
          title="Contacted This Week"
          value={contactedThisWeek}
        />

        <div className="sm:col-span-2">
          <StatsCard
            title="Top Method"
            value={mostUsedMethod}
          />
        </div>
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
    <div className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm sm:p-5">
      <h3 className="text-xs font-medium text-slate-500">
        {title}
      </h3>

      <p className="mt-2 truncate text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {value}
      </p>
    </div>
  );
}