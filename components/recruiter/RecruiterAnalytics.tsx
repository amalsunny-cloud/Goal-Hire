import { Recruiter } from "@/types/recruiter";
import StatsCard from "../StatsCard";

interface Props {
  recruiters: Recruiter[];
}
export default function RecruiterAnalytics({ recruiters }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);

  const totalRecruiters = recruiters.length;
  const followUpToday = recruiters.filter((recruiter) => {
    if (!recruiter.nextFollowUp) {
      return false;
    }

    const date = new Date(recruiter.nextFollowUp);
    date.setHours(0,0,0,0);

    return (
        date.getTime() === today.getTime()
    )
  }).length;

  const overdue = recruiters.filter((recruiter)=>{
    if(!recruiter.nextFollowUp){
        return false;
    }

    const date = new Date(recruiter.nextFollowUp);
    date.setHours(0,0,0,0);

    return date < today;
  }).length;

  const contactedThisWeek = recruiters.filter((recruiter)=>{
    if(!recruiter.lastContact){
        return false;
    }
    const date = new Date(recruiter.lastContact);
    return( date>= oneWeekAgo && date<= new Date());
  }).length;


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
          md:grid-cols-4
          gap-4
        "
      >
        <StatsCard
          title="Total Recruiters"
          value={totalRecruiters}
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
      </div>
    </div>
  );

}


interface CardProps {
  title: string;
  value: number;
}

function StatCard({
  title,
  value,
}: CardProps) {
  return (
    <div
      className="border rounded-lg p-5 text-center bg-gray-50">
      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}