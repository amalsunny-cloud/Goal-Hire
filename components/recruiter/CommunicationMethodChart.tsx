"use client";

import { RecruiterCommunication } from "@/types/recruiterCommunication";
import {
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

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

export default function CommunicationMethodChart({
  communications,
}: Props) {
  const counts: Record<string, number> = {};

  communications.forEach((communication) => {
    counts[communication.type] =
      (counts[communication.type] || 0) + 1;
  });

  const data = Object.entries(counts).map(
    ([type, value], index) => ({
      name: type,
      value,
      fill: COLORS[index % COLORS.length],
    }),
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Communication Methods
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
            See which communication channels you use most often.
          </p>
        </div>

        <div className="hidden rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 sm:block">
          Channel Insights
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex min-h-64 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg">
              📊
            </div>

            <p className="text-sm font-semibold text-slate-700">
              No communication data available
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Communication methods will appear here once you add activity.
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-2 sm:p-4">
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

                  const total = data.reduce(
                    (sum, item) => sum + item.value,
                    0,
                  );

                  const percent =
                    total === 0
                      ? 0
                      : ((numericValue / total) * 100).toFixed(1);

                  return [
                    `${numericValue} (${percent}%)`,
                    "Communications",
                  ];
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
                }}
              />

              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{
                  fontSize: "12px",
                  color: "#64748b",
                  fontWeight: 600,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}