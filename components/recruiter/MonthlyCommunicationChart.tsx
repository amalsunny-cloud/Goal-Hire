import { getMonthlyCommunicationData } from "@/lib/recruiter/getMonthlyCommunicationData";
import { RecruiterCommunication } from "@/types/recruiterCommunication";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  communications: RecruiterCommunication[];
}
export default function MonthlyCommunicationChart({ communications }: Props) {
  const monthlyCounts: Record<string, number> = {};

  communications.forEach((communication) => {
    const date = new Date(communication.date);

    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,"0",)}`;


    if (!monthlyCounts[key]) {
      monthlyCounts[key] = 0;
    }

    monthlyCounts[key]++;
  });

  const data = getMonthlyCommunicationData(communications)

  return (
    <div className="rounded-lg bg-slate-400/10 p-6 shadow-sm">
      <h2 className="text-2xl tracking-tight font-semibold mb-6">Monthly Communications</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No communication data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar dataKey="count" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
