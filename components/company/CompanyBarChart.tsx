"use client";

import { useState } from "react";
import { CompanyInsight } from "@/types/companyInsight";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { BarChart3, Layers } from "lucide-react";

interface Props {
  companies: CompanyInsight[];
}

// Custom Tooltip component for modern styling
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="min-w-44 rounded-2xl border border-slate-700 bg-slate-900 p-4 text-xs text-white shadow-lg">
        <p className="border-b border-slate-700 pb-2.5 font-bold text-slate-100">
          {label}
        </p>

        <div className="mt-3 space-y-2">
          {payload.map((entry: any, index: number) => (
            <div
              key={`item-${index}`}
              className="flex items-center justify-between gap-5 text-[11px]"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />

                <span className="text-slate-300">
                  {entry.name}
                </span>
              </div>

              <span className="font-bold text-white">
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default function CompanyBarChart({ companies }: Props) {
  const [activeMetric, setActiveMetric] = useState<
    "all" | "recruiters" | "communications" | "responses"
  >("all");

  // Take top 10 companies sorted by communication count or overall activity to avoid overcrowding the X axis
  const topCompanies = [...companies]
    .sort(
      (a, b) =>
        b.communicationCount +
        b.recruiterCount -
        (a.communicationCount + a.recruiterCount),
    )
    .slice(0, 10);

  const data = topCompanies.map((company) => ({
    company:
      company.company.length > 14
        ? `${company.company.substring(0, 12)}...`
        : company.company,
    fullCompany: company.company,
    Recruiters: company.recruiterCount,
    Outreach: company.communicationCount,
    Responses: company.responseCount,
  }));

  if (companies.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-500">
          <BarChart3 className="h-6 w-6" />
        </div>

        <h3 className="text-base font-bold tracking-tight text-slate-900">
          No comparison data
        </h3>

        <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500">
          Add companies, recruiters, and log interactions to see comparative
          performance metrics.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 border-b border-slate-200 bg-white p-5 sm:p-6 lg:p-7">
      {/* Header */}
      <div className="flex flex-col gap-5 border-b border-slate-100 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
            <BarChart3 className="h-4.5 w-4.5" />
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-bold tracking-tight text-slate-900 sm:text-base">
              Cross-Company Activity Comparison
            </h3>

            <p className="mt-1 text-[11px] leading-5 text-slate-500 sm:text-xs">
              Comparing recruiters, outreach messages, and response volumes
            </p>
          </div>
        </div>

        {/* Metric Selector */}
        <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-1 lg:w-auto">
          <div className="flex min-w-max items-center gap-0.5">
            <button
              onClick={() => setActiveMetric("all")}
              className={`cursor-pointer rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
                activeMetric === "all"
                  ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                  : "text-slate-500 hover:bg-white/70 hover:text-slate-800"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setActiveMetric("recruiters")}
              className={`cursor-pointer rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
                activeMetric === "recruiters"
                  ? "bg-white text-blue-600 shadow-sm ring-1 ring-blue-100"
                  : "text-slate-500 hover:bg-white/70 hover:text-slate-800"
              }`}
            >
              Recruiters
            </button>

            <button
              onClick={() => setActiveMetric("communications")}
              className={`cursor-pointer rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
                activeMetric === "communications"
                  ? "bg-white text-purple-600 shadow-sm ring-1 ring-purple-100"
                  : "text-slate-500 hover:bg-white/70 hover:text-slate-800"
              }`}
            >
              Outreach
            </button>

            <button
              onClick={() => setActiveMetric("responses")}
              className={`cursor-pointer rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
                activeMetric === "responses"
                  ? "bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100"
                  : "text-slate-500 hover:bg-white/70 hover:text-slate-800"
              }`}
            >
              Responses
            </button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-3 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-slate-500 ring-1 ring-slate-200">
              <Layers className="h-3.5 w-3.5" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Activity Overview
            </span>
          </div>

          <span className="text-[10px] font-medium text-slate-400">
            Top 10 companies
          </span>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 15,
                left: -15,
                bottom: 25,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />

              <XAxis
                dataKey="company"
                angle={-25}
                textAnchor="end"
                interval={0}
                height={50}
                tick={{
                  fontSize: 11,
                  fill: "#64748b",
                  fontWeight: 500,
                }}
                tickLine={false}
                axisLine={{ stroke: "#e2e8f0" }}
              />

              <YAxis
                allowDecimals={false}
                tick={{
                  fontSize: 11,
                  fill: "#64748b",
                  fontWeight: 500,
                }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  fill: "#e2e8f0",
                  opacity: 0.35,
                }}
              />

              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{
                  paddingBottom: 15,
                  fontSize: 12,
                  color: "#475569",
                }}
              />

              {(activeMetric === "all" ||
                activeMetric === "recruiters") && (
                <Bar
                  name="Recruiters"
                  dataKey="Recruiters"
                  fill="#3b82f6"
                  radius={[7, 7, 2, 2]}
                  maxBarSize={40}
                />
              )}

              {(activeMetric === "all" ||
                activeMetric === "communications") && (
                <Bar
                  name="Outreach"
                  dataKey="Outreach"
                  fill="#8b5cf6"
                  radius={[7, 7, 2, 2]}
                  maxBarSize={40}
                />
              )}

              {(activeMetric === "all" ||
                activeMetric === "responses") && (
                <Bar
                  name="Responses"
                  dataKey="Responses"
                  fill="#10b981"
                  radius={[7, 7, 2, 2]}
                  maxBarSize={40}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}