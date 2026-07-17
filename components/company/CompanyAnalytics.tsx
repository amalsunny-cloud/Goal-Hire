"use client";

import { CompanyInsight } from "@/types/companyInsight";
import {
  Building2,
  Users,
  Mail,
  Trophy,
  Activity,
  TrendingUp,
} from "lucide-react";

interface Props {
  companies: CompanyInsight[];
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border shadow p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gray-500 text-sm font-medium">
          {title}
        </h3>

        {icon}
      </div>

      <p className="text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}

export default function CompanyAnalytics({
  companies,
}: Props) {
  const totalCompanies = companies.length;

  const totalRecruiters = companies.reduce(
    (sum, company) => sum + company.recruiterCount,
    0,
  );

  const totalCommunications = companies.reduce(
    (sum, company) => sum + company.communicationCount,
    0,
  );

  const averageResponseRate =
    totalCompanies === 0
      ? 0
      : Math.round(
          companies.reduce(
            (sum, company) => sum + company.responseRate,
            0,
          ) / totalCompanies,
        );

  const activeCompanies = companies.filter(
    (company) => company.communicationCount > 0,
  ).length;

  const bestCompany =
    companies.length > 0
      ? [...companies].sort(
          (a, b) =>
            b.responseRate - a.responseRate,
        )[0]
      : null;

  const mostActiveCompany =
    companies.length > 0
      ? [...companies].sort(
          (a, b) =>
            b.communicationCount -
            a.communicationCount,
        )[0]
      : null;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        <StatCard
          title="Companies"
          value={totalCompanies}
          icon={
            <Building2 className="w-6 h-6 text-blue-600" />
          }
        />

        <StatCard
          title="Recruiters"
          value={totalRecruiters}
          icon={
            <Users className="w-6 h-6 text-green-600" />
          }
        />

        <StatCard
          title="Communications"
          value={totalCommunications}
          icon={
            <Mail className="w-6 h-6 text-purple-600" />
          }
        />

        <StatCard
          title="Average Response Rate"
          value={`${averageResponseRate}%`}
          icon={
            <TrendingUp className="w-6 h-6 text-orange-600" />
          }
        />

        <StatCard
          title="Active Companies"
          value={activeCompanies}
          icon={
            <Activity className="w-6 h-6 text-red-600" />
          }
        />

        <StatCard
          title="Top Company"
          value={
            bestCompany
              ? bestCompany.company
              : "N/A"
          }
          icon={
            <Trophy className="w-6 h-6 text-yellow-500" />
          }
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border shadow p-5">
          <h2 className="font-semibold text-lg mb-4">
            🏆 Best Response Rate
          </h2>

          {bestCompany ? (
            <>
              <p className="text-xl font-bold">
                {bestCompany.company}
              </p>

              <p className="text-gray-500 mt-2">
                {bestCompany.responseRate}% response rate
              </p>

              <p className="text-gray-500">
                {bestCompany.responseCount} responses
              </p>
            </>
          ) : (
            <p>No data available.</p>
          )}
        </div>

        <div className="bg-white rounded-xl border shadow p-5">
          <h2 className="font-semibold text-lg mb-4">
            📨 Most Active Company
          </h2>

          {mostActiveCompany ? (
            <>
              <p className="text-xl font-bold">
                {mostActiveCompany.company}
              </p>

              <p className="text-gray-500 mt-2">
                {mostActiveCompany.communicationCount} communications
              </p>

              <p className="text-gray-500">
                {mostActiveCompany.recruiterCount} recruiters
              </p>
            </>
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}