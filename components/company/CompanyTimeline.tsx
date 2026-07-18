"use client";

import { Recruiter } from "@/types/recruiter";
import { RecruiterCommunication } from "@/types/recruiterCommunication";

import {
  UserPlus,
  Mail,
  Phone,
  MessageCircle,
  Users,
  CheckCircle,
  Clock,
} from "lucide-react";

interface Props {
  recruiters: Recruiter[];
  communications: RecruiterCommunication[];
}

interface CompanyTimelineItem {
  id: string;
  date: string;
  type: "Recruiter" | "Communication" | "Response";
  title: string;
  description: string;
}

function getIcon(type: CompanyTimelineItem["type"]) {
  switch (type) {
    case "Recruiter":
      return (
        <UserPlus className="w-5 h-5 text-blue-600" />
      );

    case "Communication":
      return (
        <Mail className="w-5 h-5 text-green-600" />
      );

    case "Response":
      return (
        <CheckCircle className="w-5 h-5 text-purple-600" />
      );
  }
}

export default function CompanyTimeline({
  recruiters,
  communications,
}: Props) {
  const events: CompanyTimelineItem[] = [];

  recruiters.forEach((recruiter) => {
    events.push({
      id: recruiter._id,

      date: recruiter.createdAt,

      type: "Recruiter",

      title: `${recruiter.name} added`,

      description: `${recruiter.company}`,
    });
  });

  communications.forEach((communication) => {
    const recruiter = recruiters.find(
      (r) => r._id === communication.recruiterId
    );

    events.push({
      id: communication._id,

      date: communication.date,

      type: "Communication",

      title: communication.type,

      description:
        recruiter?.name ?? "Unknown Recruiter",
    });

    if (
      communication.responded &&
      communication.responseType
    ) {
      events.push({
        id:
          communication._id +
          "-response",

        date:
          communication.responseDate ??
          communication.date,

        type: "Response",

        title:
          communication.responseType,

        description:
          recruiter?.name ??
          "Unknown Recruiter",
      });
    }
  });

  events.sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  );

  if (events.length === 0) {
  return (
    <div className="bg-white rounded-xl border shadow p-6">
      <p className="text-gray-500">
        No activity found.
      </p>
    </div>
  );
}

  return (
    <div className="space-y-5">

      <h2 className="text-2xl font-semibold">
        Activity Timeline
      </h2>


      

      {events.map((event) => (
        <div
          key={event.id}
          className="flex gap-4 bg-white rounded-xl border shadow p-5"
        >
          <div>{getIcon(event.type)}</div>

          <div className="flex-1">

            <div className="flex justify-between">

              <h3 className="font-semibold">
                {event.title}
              </h3>

              <span className="text-sm text-gray-500">
                {new Date(
                  event.date
                ).toLocaleDateString()}
              </span>

            </div>

            <p className="text-gray-600 mt-2">
              {event.description}
            </p>

          </div>
        </div>
      ))}
    </div>
  );
}