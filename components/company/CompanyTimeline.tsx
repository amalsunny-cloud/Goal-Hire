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
        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center border-2 border-white shadow-xs">
          <UserPlus className="w-4 h-4" />
        </div>
      );
    case "Communication":
      return (
        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border-2 border-white shadow-xs">
          <Mail className="w-4 h-4" />
        </div>
      );
    case "Response":
      return (
        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center border-2 border-white shadow-xs">
          <CheckCircle className="w-4 h-4" />
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
      <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <Clock className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-800">No activity recorded</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          Add recruiters or log communications to start tracking the timeline for this company.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-xl border border-purple-100">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Activity Timeline
            </h2>
            <p className="text-xs text-slate-500">
              Chronological log of touchpoints and recruiter events
            </p>
          </div>
        </div>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-3.75 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200/80">
        {events.map((event) => (
          <div key={event.id} className="relative flex items-start gap-4">
            <div className="absolute -left-9.25 top-1">
              {getIcon(event.type)}
            </div>

            <div className="flex-1 bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-sm transition-all space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-sm font-bold text-slate-900">
                  {event.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {new Date(event.date).toLocaleDateString("en-GB")}
                </span>
              </div>

              <p className="text-xs text-slate-600">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
