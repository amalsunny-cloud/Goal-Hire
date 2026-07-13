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
  ].filter((item)=>item.value >0);

  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-6">
        Recruiter Response Distribution
      </h2>

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
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}