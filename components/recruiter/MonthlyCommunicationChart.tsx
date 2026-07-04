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

  const data = Object.entries(monthlyCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, count]) => {
      const [year, month] = key.split("-");

      const label = new Date(Number(year), Number(month) - 1).toLocaleString(
        "default",
        {
          month: "short",
          year: "2-digit",
        },
      );

      return {
        month: label,
        count,
      };
    });

  return (
    <div className="border rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Monthly Communications</h2>

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
