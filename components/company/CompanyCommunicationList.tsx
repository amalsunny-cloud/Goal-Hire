"use client";

import { Recruiter } from "@/types/recruiter";
import { RecruiterCommunication } from "@/types/recruiterCommunication";
import {
  Mail,
  Phone,
  MessageCircle,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  MinusCircle,
  MessageSquare,
  Sparkles,
} from "lucide-react";

interface Props {
  recruiters: Recruiter[];
  communications: RecruiterCommunication[];
}

function getCommunicationIcon(type: string) {
  switch (type) {
    case "Email":
      return <Mail className="w-4 h-4 text-blue-600" />;
    case "Phone":
      return <Phone className="w-4 h-4 text-emerald-600" />;
    case "WhatsApp":
      return <MessageCircle className="w-4 h-4 text-green-600" />;
    case "Meeting":
      return <Users className="w-4 h-4 text-purple-600" />;
    case "LinkedIn":
      return <Users className="w-4 h-4 text-sky-600" />;
    default:
      return <Mail className="w-4 h-4 text-slate-600" />;
  }
}

function getResponseBadge(responded?: boolean, responseType?: string) {
  if (!responded) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200/80">
        <Clock className="w-3 h-3 text-slate-400" />
        Awaiting Response
      </span>
    );
  }

  switch (responseType) {
    case "Positive":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle className="w-3 h-3 text-emerald-600" />
          Positive Response
        </span>
      );
    case "Rejected":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          <XCircle className="w-3 h-3 text-rose-600" />
          Declined / Rejected
        </span>
      );
    case "Neutral":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <MinusCircle className="w-3 h-3 text-amber-600" />
          Neutral Response
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <CheckCircle className="w-3 h-3 text-blue-600" />
          Responded
        </span>
      );
  }
}

export default function CompanyCommunicationList({
  recruiters,
  communications,
}: Props) {
  if (communications.length === 0) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <MessageSquare className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-800">No communication history</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          No communications have been recorded with recruiters from this company yet.
        </p>
      </div>
    );
  }

  const sortedCommunications = [...communications].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="space-y-4 bg-slate-400/10 p-4 rounded-2xl border border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Communication History
            </h2>
            <p className="text-xs text-slate-500">
              {communications.length} {communications.length === 1 ? "interaction" : "interactions"} logged
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3.5">
        {sortedCommunications.map((communication) => {
          const recruiter = recruiters.find(
            (r) => r._id.toString() === communication.recruiterId.toString(),
          );

          return (
            <div
              key={communication._id}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-sm transition-all space-y-3.5"
            >
              {/* Header: Type, Recruiter & Date */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-center">
                    {getCommunicationIcon(communication.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">
                        {communication.type}
                      </h3>
                      {recruiter && (
                        <span className="text-xs text-slate-500">
                          with <span className="font-semibold text-slate-700">{recruiter.name}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-center">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{new Date(communication.date).toLocaleDateString("en-GB")}</span>
                  </div>
                  {getResponseBadge(communication.responded, communication.responseType)}
                </div>
              </div>

              {/* Subject */}
              {communication.subject && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Subject</span>
                  <p className="text-sm font-semibold text-slate-800">
                    {communication.subject}
                  </p>
                </div>
              )}

              {/* Message Body */}
              {communication.message && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Message Content</span>
                  <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100 text-xs text-slate-700 whitespace-pre-wrap">
                    {communication.message}
                  </div>
                </div>
              )}

              {/* Response Details (if responded) */}
              {communication.responded && (
                <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-100/80 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-emerald-800 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Response Received ({communication.responseType || "Logged"})</span>
                    </div>
                    {communication.responseDate && (
                      <span className="text-[11px] text-emerald-700/80 font-normal">
                        {new Date(communication.responseDate).toLocaleDateString("en-GB")}
                      </span>
                    )}
                  </div>
                  {communication.responseNotes && (
                    <p className="text-slate-600 pl-5 whitespace-pre-wrap">
                      {communication.responseNotes}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
