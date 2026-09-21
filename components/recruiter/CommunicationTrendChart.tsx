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

  const data = getMonthlyCommunicationData(communications);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Communication Trend
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
            Track how your recruiter communication activity changes over time.
          </p>
        </div>

        <div className="hidden rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 sm:block">
          Activity Trend
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex min-h-64 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg">
              📈
            </div>

            <p className="text-sm font-semibold text-slate-700">
              No communication data available
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Communication trends will appear here once activity is recorded.
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3 sm:p-4">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                stroke="#e2e8f0"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 11,
                  fontWeight: 500,
                }}
                dy={8}
              />

              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 11,
                  fontWeight: 500,
                }}
                width={35}
              />

              <Tooltip
                cursor={{
                  stroke: "#cbd5e1",
                  strokeDasharray: "4 4",
                }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#ffffff",
                  boxShadow:
                    "0 4px 12px rgba(15, 23, 42, 0.08)",
                  padding: "8px 12px",
                }}
                labelStyle={{
                  color: "#0f172a",
                  fontWeight: 600,
                  marginBottom: "4px",
                }}
                itemStyle={{
                  color: "#4f46e5",
                  fontWeight: 600,
                }}
              />

              <Line
                type="monotone"
                dataKey="count"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#ffffff",
                  stroke: "#4f46e5",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: "#4f46e5",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}