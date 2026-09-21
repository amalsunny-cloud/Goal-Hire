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

export default function MonthlyCommunicationChart({
  communications,
}: Props) {
  const monthlyCounts: Record<string, number> = {};

  communications.forEach((communication) => {
    const date = new Date(communication.date);

    const key = `${date.getFullYear()}-${String(
      date.getMonth() + 1,
    ).padStart(2, "0")}`;

    if (!monthlyCounts[key]) {
      monthlyCounts[key] = 0;
    }

    monthlyCounts[key]++;
  });

  const data = getMonthlyCommunicationData(communications);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Monthly Communications
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
            Track your recruiter communication activity over time.
          </p>
        </div>

        <div className="hidden rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 sm:block">
          Activity Trends
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
              Monthly activity will appear here once communication data is
              available.
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3 sm:p-4">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
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
                  fill: "#f1f5f9",
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
                  color: "#2563eb",
                  fontWeight: 600,
                }}
              />

              <Bar
                dataKey="count"
                fill="#3b82f6"
                radius={[8, 8, 2, 2]}
                maxBarSize={42}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}