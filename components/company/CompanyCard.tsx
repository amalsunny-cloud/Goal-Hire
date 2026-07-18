"use client";

import { CompanyInsight } from "@/types/companyInsight";
import {
  Building2,
  Users,
  Mail,
  MessageCircle,
  Calendar,
} from "lucide-react";
import Link from "next/link";

interface Props {
  company: CompanyInsight;
}

export default function CompanyCard({ company }: Props) {
  const getProgressColor = (rate: number) => {
    if (rate >= 70) return "bg-green-500";
    if (rate >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Link href={`/dashboard/company/${encodeURIComponent(company.company)}`}>
    <div
      className="
        bg-white
        rounded-xl
        shadow
        border
        p-5
        space-y-5
        hover:shadow-lg
        transition
      "
    >
      {/* Header */}

      <div className="flex items-center gap-3">
        <div className="bg-blue-100 p-3 rounded-full">
          <Building2 className="w-6 h-6 text-blue-700" />
        </div>

        <div>
          <h2 className="font-bold text-lg">
            {company.company}
          </h2>

          <p className="text-gray-500 text-sm">
            Company Overview
          </p>
        </div>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-500">
              Recruiters
            </span>
          </div>

          <p className="text-xl font-bold">
            {company.recruiterCount}
          </p>
        </div>

        <div className="border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Mail className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-500">
              Communications
            </span>
          </div>

          <p className="text-xl font-bold">
            {company.communicationCount}
          </p>
        </div>

        <div className="border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <MessageCircle className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-500">
              Responses
            </span>
          </div>

          <p className="text-xl font-bold">
            {company.responseCount}
          </p>
        </div>

        <div className="border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-gray-500">
              Last Contact
            </span>
          </div>

          <p className="text-sm font-semibold">
            {company.lastContact
              ? new Date(company.lastContact).toLocaleDateString(
                  "en-GB",
                )
              : "Never"}
          </p>
        </div>
      </div>

      {/* Response Rate */}

      <div>
        <div className="flex justify-between mb-2">
          <span className="font-medium">
            Response Rate
          </span>

          <span className="font-bold">
            {company.responseRate}%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full ${getProgressColor(
              company.responseRate,
            )}`}
            style={{
              width: `${company.responseRate}%`,
            }}
          />
        </div>
      </div>

      {/* Footer */}

      <div className="border-t pt-3 flex justify-between text-sm">
        <span className="text-gray-500">
          Company Score
        </span>

        <span className="font-semibold">
          {company.responseRate >= 70
            ? "Excellent"
            : company.responseRate >= 40
            ? "Good"
            : "Needs Follow-up"}
        </span>
      </div>
    </div>
    </Link>
  );
}