import { RecruiterCommunication } from "@/types/recruiterCommunication";

interface Props {
  communications: RecruiterCommunication[];
}

export default function ResponseAnalytics({ communications }: Props) {
  const total = communications.length;

  const positive = communications.filter(
    (c) => c.responseType === "Positive",
  ).length;

  const neutral = communications.filter(
    (c) => c.responseType === "Neutral",
  ).length;

  const rejected = communications.filter(
    (c) => c.responseType === "Rejected",
  ).length;

  const noResponse = communications.filter(
    (c) => !c.responded || c.responseType === "No Response",
  ).length;

  const responded = positive + neutral + rejected;
  const responseRate =
    total === 0 ? 0 : ((responded / total) * 100).toFixed(1);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Recruiter Response Analytics
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
            Track recruiter responses and your overall response rate.
          </p>
        </div>

        <div className="w-fit rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600">
          Response Overview
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <Card title="Communications" value={total} />

        <Card
          title="Positive"
          value={positive}
          color="text-emerald-600"
          bgColor="bg-emerald-50/70"
          borderColor="border-emerald-100"
        />

        <Card
          title="Neutral"
          value={neutral}
          color="text-amber-600"
          bgColor="bg-amber-50/70"
          borderColor="border-amber-100"
        />

        <Card
          title="Rejected"
          value={rejected}
          color="text-rose-600"
          bgColor="bg-rose-50/70"
          borderColor="border-rose-100"
        />

        <Card
          title="Waiting"
          value={noResponse}
          color="text-slate-600"
          bgColor="bg-slate-50/70"
          borderColor="border-slate-200"
        />

        <Card
          title="Response Rate"
          value={`${responseRate}%`}
          color="text-blue-600"
          bgColor="bg-blue-50/70"
          borderColor="border-blue-100"
        />
      </div>
    </div>
  );
}

interface CardProps {
  title: string;
  value: number | string;
  color?: string;
  bgColor?: string;
  borderColor?: string;
}

function Card({
  title,
  value,
  color = "text-slate-900",
  bgColor = "bg-slate-50/70",
  borderColor = "border-slate-200",
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border ${borderColor} ${bgColor} p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm sm:p-5`}
    >
      <h3 className="text-xs font-semibold text-slate-500 sm:text-sm">
        {title}
      </h3>

      <p
        className={`mt-2 text-2xl font-bold tracking-tight sm:text-3xl ${color}`}
      >
        {value}
      </p>
    </div>
  );
}