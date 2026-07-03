"use client";
import { RecruiterCommunication } from "@/types/recruiterCommunication";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface Props {
  communications: RecruiterCommunication[];
}

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#ca8a04",
  "#9333ea",
  "#475569",
];

export default function CommunicationMethodChart({ communications }: Props) {
  const counts: Record<string, number> = {};

  communications.forEach((communication) => {
    counts[communication.type] = (counts[communication.type] || 0) + 1;
  });

  const data = Object.entries(counts).map(([type, value], index) => ({
    name: type,
    value,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <div className="border rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Communication Methods</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No communication data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            />

            <Tooltip
              formatter={(value) => {
                const numericValue = Number(value ?? 0);

                const total = data.reduce((sum, item) => sum + item.value, 0);

                const percent =
                  total === 0 ? 0 : ((numericValue / total) * 100).toFixed(1);

                return [`${numericValue} (${percent}%)`, "Communications"];
              }}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
