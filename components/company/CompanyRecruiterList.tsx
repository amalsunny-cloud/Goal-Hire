"use client";

import { Recruiter } from "@/types/recruiter";
import {
  Mail,
  Phone,
  Link as LinkIcon,
  Calendar,
  Tag,
  FileText,
  Clock,
  User,
  Users,
  ExternalLink,
} from "lucide-react";

interface Props {
  recruiters: Recruiter[];
}

export default function CompanyRecruiterList({ recruiters }: Props) {
  if (recruiters.length === 0) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <Users className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-800">No recruiters found</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          No recruiter contacts have been linked to this company yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-slate-400/10 p-4 rounded-2xl border border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recruiter Contacts
            </h2>
            <p className="text-xs text-slate-500">
              {recruiters.length} {recruiters.length === 1 ? "recruiter" : "recruiters"} linked to this company
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {recruiters.map((recruiter) => (
          <div
            key={recruiter._id}
            className="border-b border-slate-300 p-5 sm:p-6 transition-all space-y-4"
          >
            {/* Top Bar: Name & Company Tag */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center border border-slate-200/60 shadow-2xs">
                  {recruiter.name
                    ? recruiter.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()
                    : <User className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {recruiter.name}
                  </h3>
                  <span className="text-xs text-slate-500">
                    Added {new Date(recruiter.createdAt).toLocaleDateString("en-GB")}
                  </span>
                </div>
              </div>

              <span className="self-start sm:self-center inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/60">
                {recruiter.company}
              </span>
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Email */}
              <div className="flex items-center gap-2.5 p-2.5 bg-slate-50/70 rounded-xl border border-slate-100 text-xs text-slate-700">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Email</span>
                  {recruiter.email ? (
                    <a
                      href={`mailto:${recruiter.email}`}
                      className="text-blue-600 font-medium hover:underline truncate block"
                    >
                      {recruiter.email}
                    </a>
                  ) : (
                    <span className="text-slate-400 font-medium">Not provided</span>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5 p-2.5 bg-slate-50/70 rounded-xl border border-slate-100 text-xs text-slate-700">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Phone</span>
                  {recruiter.phone ? (
                    <a
                      href={`tel:${recruiter.phone}`}
                      className="text-slate-700 font-medium hover:underline truncate block"
                    >
                      {recruiter.phone}
                    </a>
                  ) : (
                    <span className="text-slate-400 font-medium">Not provided</span>
                  )}
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center gap-2.5 p-2.5 bg-slate-50/70 rounded-xl border border-slate-100 text-xs text-slate-700">
                <LinkIcon className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">LinkedIn</span>
                  {recruiter.linkedin ? (
                    <a
                      href={recruiter.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-medium hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-slate-400 font-medium">Not linked</span>
                  )}
                </div>
              </div>

              {/* Last Contact */}
              <div className="flex items-center gap-2.5 p-2.5 bg-slate-50/70 rounded-xl border border-slate-100 text-xs text-slate-700">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Last Contact</span>
                  <span className="font-medium text-slate-700">
                    {recruiter.lastContact
                      ? new Date(recruiter.lastContact).toLocaleDateString("en-GB")
                      : "No contact yet"}
                  </span>
                </div>
              </div>

              {/* Next Follow-up */}
              <div className="flex items-center gap-2.5 p-2.5 bg-slate-50/70 rounded-xl border border-slate-100 text-xs text-slate-700 sm:col-span-2 lg:col-span-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Next Follow-up</span>
                  <span className="font-medium text-slate-700">
                    {recruiter.nextFollowUp
                      ? new Date(recruiter.nextFollowUp).toLocaleDateString("en-GB")
                      : "Not scheduled"}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {recruiter.tags && recruiter.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                {recruiter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Notes */}
            {recruiter.notes && (
              <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/60 text-xs text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Notes</span>
                </div>
                <p className="whitespace-pre-wrap pl-5">{recruiter.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
