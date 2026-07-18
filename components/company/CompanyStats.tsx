"use client";

import { Recruiter } from "@/types/recruiter";
import { RecruiterCommunication } from "@/types/recruiterCommunication";

import {
  Users,
  Mail,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

interface Props {
  recruiters: Recruiter[];
  communications: RecruiterCommunication[];
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

export default function CompanyStats({
  recruiters,
  communications,
}: Props) {
  const recruiterCount = recruiters.length;

  const communicationCount =
    communications.length;

  const responseCount =
    communications.filter(
      (communication) => communication.responded
    ).length;

  const responseRate =
    communicationCount === 0
      ? 0
      : Math.round(
          (responseCount /
            communicationCount) *
            100
        );

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
      <StatCard
        title="Recruiters"
        value={recruiterCount}
        icon={
          <Users className="w-6 h-6 text-blue-600" />
        }
      />

      <StatCard
        title="Communications"
        value={communicationCount}
        icon={
          <Mail className="w-6 h-6 text-green-600" />
        }
      />

      <StatCard
        title="Responses"
        value={responseCount}
        icon={
          <MessageCircle className="w-6 h-6 text-purple-600" />
        }
      />

      <StatCard
        title="Response Rate"
        value={`${responseRate}%`}
        icon={
          <TrendingUp className="w-6 h-6 text-orange-600" />
        }
      />
    </div>
  );
}