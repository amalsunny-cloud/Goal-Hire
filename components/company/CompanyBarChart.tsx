"use client";

import { CompanyInsight } from "@/types/companyInsight";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  companies: CompanyInsight[];
}

export default function CompanyBarChart({
  companies,
}: Props) {
  const data = companies.map((company) => ({
    company: company.company,
    Recruiters: company.recruiterCount,
    Communications: company.communicationCount,
    Responses: company.responseCount,
  }));

  return (
    <div
      className="
        bg-white
        rounded-xl
        border
        shadow
        p-5
      "
    >
      <h2
        className="
          text-xl
          font-semibold
          mb-5
        "
      >
        Company Comparison
      </h2>

      <div className="h-[420px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="company"
              angle={-20}
              textAnchor="end"
              interval={0}
              height={70}
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="Recruiters"
              radius={[5, 5, 0, 0]}
            />

            <Bar
              dataKey="Communications"
              radius={[5, 5, 0, 0]}
            />

            <Bar
              dataKey="Responses"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}