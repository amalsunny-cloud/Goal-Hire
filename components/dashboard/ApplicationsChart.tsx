import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface ApplicationsChartProps {
  data: {
    month: string;
    applications: number;
  }[];
}

export default function ApplicationsChart({
  data,
}: ApplicationsChartProps) {
  if (data.length === 0) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Applications Per Month
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Track your application activity over time
          </p>
        </div>

        {/* Empty state */}
        <div className="flex h-75 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 text-center">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
            <span className="text-lg">📊</span>
          </div>

          <p className="text-sm font-semibold text-slate-700">
            No application data
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Your monthly application activity will appear here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">

      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Applications Per Month
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Track your application activity over time
          </p>
        </div>

        {/* Chart indicator */}
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
          <div className="flex items-end gap-0.5">
            <span className="h-2.5 w-1.5 rounded-sm bg-blue-300" />
            <span className="h-4 w-1.5 rounded-sm bg-blue-400" />
            <span className="h-6 w-1.5 rounded-sm bg-blue-600" />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -15,
              bottom: 10,
            }}
          >
            {/* Subtle grid */}
            <CartesianGrid
              vertical={false}
              stroke="#e2e8f0"
              strokeDasharray="3 3"
            />

            {/* X Axis */}
            <XAxis
              dataKey="month"
              angle={-45}
              textAnchor="end"
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
              tickLine={false}
              axisLine={false}
              dy={8}
            />

            {/* Y Axis */}
            <YAxis
              allowDecimals={false}
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
              tickLine={false}
              axisLine={false}
            />

            {/* Tooltip */}
            <Tooltip
              cursor={{
                fill: "rgba(59, 130, 246, 0.05)",
              }}
              contentStyle={{
                borderRadius: "14px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#ffffff",
                boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                padding: "10px 12px",
              }}
              labelStyle={{
                color: "#0f172a",
                fontWeight: 600,
                marginBottom: "4px",
              }}
              itemStyle={{
                color: "#2563eb",
                fontSize: "13px",
                fontWeight: 600,
              }}
              formatter={(value) => [`${value}`, "Applications"]}
            />

            {/* Bars */}
            <Bar
              dataKey="applications"
              fill="#3b82f6"
              radius={[8, 8, 2, 2]}
              maxBarSize={42}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}