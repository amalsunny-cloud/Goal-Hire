
"use client";

import { Recruiter } from "@/types/recruiter";
import { RecruiterCommunication } from "@/types/recruiterCommunication";
import {
  UserPlus,
  Mail,
  CheckCircle,
  Clock,
  Activity,
  Calendar,
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
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-blue-600 shadow-xs">
          <UserPlus className="h-4 w-4" />
        </div>
      );

    case "Communication":
      return (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-emerald-100 text-emerald-600 shadow-xs">
          <Mail className="h-4 w-4" />
        </div>
      );

    case "Response":
      return (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-purple-100 text-purple-600 shadow-xs">
          <CheckCircle className="h-4 w-4" />
        </div>
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
      title: `${recruiter.name} added as recruiter`,
      description: `Target company: ${recruiter.company}`,
    });
  });

  communications.forEach((communication) => {
    const recruiter = recruiters.find(
      (r) => r._id === communication.recruiterId,
    );

    events.push({
      id: communication._id,
      date: communication.date,
      type: "Communication",
      title: `${communication.type} communication`,
      description: `Interacted with ${recruiter?.name ?? "Recruiter"}`,
    });

    if (communication.responded && communication.responseType) {
      events.push({
        id: communication._id + "-response",
        date: communication.responseDate ?? communication.date,
        type: "Response",
        title: `${communication.responseType} response received`,
        description: `Feedback from ${recruiter?.name ?? "Recruiter"}`,
      });
    }
  });

  events.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 text-center shadow-xs sm:p-8">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          <Clock className="h-6 w-6" />
        </div>

        <h3 className="text-base font-semibold text-slate-800">
          No activity recorded
        </h3>

        <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-slate-500">
          Add recruiters or log communications to start tracking the timeline for this company.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 space-y-4 p-3 sm:p-4">
      {/* Header */}
      <div className="flex min-w-0 items-start gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-purple-100 bg-purple-50 text-purple-600">
          <Activity className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold text-start text-slate-900">
            Activity Timeline
          </h2>

          <p className="mt-0.5 text-xs leading-5 text-slate-500">
            Chronological log of touchpoints and recruiter events
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative space-y-5 pl-10 sm:space-y-6 sm:pl-11">
        {/* Vertical Timeline Line */}
        <div className="absolute bottom-3 left-3.75 top-3 w-0.5 bg-slate-200/80 sm:left-4.25" />

        {events.map((event) => (
          <div
            key={event.id}
            className="relative flex min-w-0 items-start"
          >
            {/* Timeline Icon */}
            <div className="absolute -left-10 top-0 z-10 sm:-left-11">
              {getIcon(event.type)}
            </div>

            {/* Activity Card */}
            <div className="min-w-0 flex-1 space-y-2 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs transition-all hover:shadow-sm sm:p-5">
              <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <h3 className="min-w-0 wrap-break-word text-sm font-bold text-slate-900">
                  {event.title}
                </h3>

                <span className="inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap text-xs font-medium text-slate-500">
                  <Calendar className="h-3.5 w-3.5 shrink-0 text-slate-400" />

                  {new Date(event.date).toLocaleDateString("en-GB")}
                </span>
              </div>

              <p className="wrap-break-word text-xs leading-5 text-slate-600">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
