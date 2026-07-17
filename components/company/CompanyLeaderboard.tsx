"use client";

import { CompanyInsight } from "@/types/companyInsight";

import {
  Trophy,
  Medal,
  Award,
} from "lucide-react";

interface Props {
  companies: CompanyInsight[];
}

export default function CompanyLeaderboard({
  companies,
}: Props) {
  const rankedCompanies = [...companies].sort(
    (a, b) => {
      if (b.responseRate !== a.responseRate) {
        return b.responseRate - a.responseRate;
      }

      return (
        b.communicationCount -
        a.communicationCount
      );
    },
  );

  const getIcon = (index: number) => {
    if (index === 0) {
      return (
        <Trophy className="w-6 h-6 text-yellow-500" />
      );
    }

    if (index === 1) {
      return (
        <Medal className="w-6 h-6 text-gray-500" />
      );
    }

    if (index === 2) {
      return (
        <Award className="w-6 h-6 text-orange-500" />
      );
    }

    return (
      <span className="font-bold text-lg">
        {index + 1}
      </span>
    );
  };

  return (
    <div className="bg-white border rounded-xl shadow p-5">
      <h2 className="text-xl font-semibold mb-5">
        🏆 Company Leaderboard
      </h2>

      <div className="space-y-4">
        {rankedCompanies.length === 0 ? (
          <p>No companies available.</p>
        ) : (
          rankedCompanies.map((company, index) => (
            <div
              key={company.company}
              className="
                flex
                items-center
                justify-between
                border
                rounded-lg
                p-4
              "
            >
              <div className="flex items-center gap-4">
                {getIcon(index)}

                <div>
                  <h3 className="font-semibold">
                    {company.company}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {company.communicationCount} communications
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold">
                  {company.responseRate}%
                </p>

                <p className="text-sm text-gray-500">
                  Response Rate
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}