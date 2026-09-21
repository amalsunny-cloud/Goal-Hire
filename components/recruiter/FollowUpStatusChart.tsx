"use client";

import { Recruiter } from "@/types/recruiter";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface Props {
  recruiters: Recruiter[];
}

const COLORS = [
  "#22c55e",
  "#facc15",
  "#ef4444",
  "#94a3b8",
];

export default function FollowUpStatusChart({
  recruiters,
}: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let upcoming = 0;
  let todayCount = 0;
  let overdue = 0;
  let noFollowUp = 0;

  recruiters.forEach((recruiter) => {
    if (!recruiter.nextFollowUp) {
      noFollowUp++;
      return;
    }

    const date = new Date(recruiter.nextFollowUp);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime()) {
      todayCount++;
    } else if (date > today) {
      upcoming++;
    } else {
      overdue++;
    }
  });

  const data = [
    {
      name: "Upcoming",
      value: upcoming,
    },
    {
      name: "Today",
      value: todayCount,
    },
    {
      name: "Overdue",
      value: overdue,
    },
    {
      name: "No Follow-up",
      value: noFollowUp,
    },
  ].filter((item) => item.value > 0);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Follow-up Status
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
            Monitor upcoming, overdue, and pending recruiter follow-ups.
          </p>
        </div>

        <div className="hidden rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-600 sm:block">
          Follow-up Insights
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex min-h-64 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg">
              📅
            </div>

            <p className="text-sm font-semibold text-slate-700">
              No recruiters found
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Follow-up status will appear here once recruiters are added.
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
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

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
                      : (
                          (numericValue / total) *
                          100
                        ).toFixed(1);

                  return [
                    `${numericValue} (${percent}%)`,
                    "Recruiters",
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