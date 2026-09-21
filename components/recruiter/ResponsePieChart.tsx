"use client";

import { RecruiterCommunication } from "@/types/recruiterCommunication";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  communications: RecruiterCommunication[];
}

const COLORS = [
  "#22c55e", // Positive
  "#eab308", // Neutral
  "#ef4444", // Rejected
  "#9ca3af", // Waiting
];

export default function ResponsePieChart({
  communications,
}: Props) {
  const positive = communications.filter(
    (c) => c.responseType === "Positive",
  ).length;

  const neutral = communications.filter(
    (c) => c.responseType === "Neutral",
  ).length;

  const rejected = communications.filter(
    (c) => c.responseType === "Rejected",
  ).length;

  const waiting = communications.filter(
    (c) =>
      !c.responded ||
      c.responseType === "No Response",
  ).length;

  const data = [
    {
      name: "Positive",
      value: positive,
    },
    {
      name: "Neutral",
      value: neutral,
    },
    {
      name: "Rejected",
      value: rejected,
    },
    {
      name: "Waiting",
      value: waiting,
    },
  ].filter((item) => item.value > 0);

  const hasData = data.length > 0;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Recruiter Response Distribution
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
            See how recruiters are responding to your communications.
          </p>
        </div>

        <div className="hidden rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 sm:block">
          Response Insights
        </div>
      </div>

      {hasData ? (
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-2 sm:p-4">
          <div style={{ width: "100%", height: 350 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => [
                    value,
                    "Responses",
                  ]}
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
        </div>
      ) : (
        <div className="flex min-h-64 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400">
              <span className="text-lg">📊</span>
            </div>

            <p className="text-sm font-semibold text-slate-700">
              No response data available
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Recruiter responses will appear here once available.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}