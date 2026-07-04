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
    <div className="border rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">
        Follow-up Status
      </h2>

      {data.length === 0 ? (
        <p className="text-gray-500">
          No recruiters found.
        </p>
      ) : (
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
                  0
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
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}