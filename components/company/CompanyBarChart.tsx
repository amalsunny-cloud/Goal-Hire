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
      <div className="bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/60 rounded-xl p-3.5 shadow-xl text-xs space-y-2 min-w-44">
        <p className="font-bold text-slate-100 border-b border-slate-800 pb-1.5">
          {label}
        </p>
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div
              key={`item-${index}`}
              className="flex items-center justify-between gap-3 text-[11px]"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-sm shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-slate-300">{entry.name}:</span>
              </div>
              <span className="font-bold text-white">{entry.value}</span>
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
      <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <BarChart3 className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-800">
          No comparison data
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          Add companies, recruiters, and log interactions to see comparative performance metrics.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-400/10 border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
      {/* Header with Title & Metric Filter Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Cross-Company Activity Comparison
            </h3>
            <p className="text-xs text-slate-500">
              Comparing recruiters, outreach messages, and response volumes
            </p>
          </div>
        </div>

        {/* Metric Selector Pills */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-center">
          <button
            onClick={() => setActiveMetric("all")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeMetric === "all"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveMetric("recruiters")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeMetric === "recruiters"
                ? "bg-white text-blue-600 shadow-2xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Recruiters
          </button>
          <button
            onClick={() => setActiveMetric("communications")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeMetric === "communications"
                ? "bg-white text-purple-600 shadow-2xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Outreach
          </button>
          <button
            onClick={() => setActiveMetric("responses")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeMetric === "responses"
                ? "bg-white text-emerald-600 shadow-2xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Responses
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-80 w-full pt-2">
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
              stroke="#f1f5f9"
              vertical={false}
            />

            <XAxis
              dataKey="company"
              angle={-25}
              textAnchor="end"
              interval={0}
              height={50}
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
            />

            <Tooltip content={<CustomTooltip />} />

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

            {(activeMetric === "all" || activeMetric === "recruiters") && (
              <Bar
                name="Recruiters"
                dataKey="Recruiters"
                fill="#3b82f6"
                radius={[5, 5, 0, 0]}
                maxBarSize={40}
              />
            )}

            {(activeMetric === "all" || activeMetric === "communications") && (
              <Bar
                name="Outreach"
                dataKey="Outreach"
                fill="#8b5cf6"
                radius={[5, 5, 0, 0]}
                maxBarSize={40}
              />
            )}

            {(activeMetric === "all" || activeMetric === "responses") && (
              <Bar
                name="Responses"
                dataKey="Responses"
                fill="#10b981"
                radius={[5, 5, 0, 0]}
                maxBarSize={40}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}