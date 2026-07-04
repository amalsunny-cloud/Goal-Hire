"use client";

import { getMonthlyCommunicationData } from "@/lib/recruiter/getMonthlyCommunicationData";
import { RecruiterCommunication } from "@/types/recruiterCommunication";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  communications: RecruiterCommunication[];
}

export default function CommunicationTrendChart({
  communications,
}: Props) {
  const monthlyCounts: Record<string, number> = {};

  communications.forEach((communication) => {
    const date = new Date(communication.date);

    const key = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    monthlyCounts[key] = (monthlyCounts[key] || 0) + 1;
  });

  const data = getMonthlyCommunicationData(communications)

  return (
    <div className="border rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">
        Communication Trend
      </h2>

      {data.length === 0 ? (
        <p className="text-gray-500">
          No communication data available.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="count"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}