"use client";

import { Recruiter } from "@/types/recruiter";

import {
  Mail,
  Phone,
  Link,
  Calendar,
  Tag,
  FileText,
  Clock,
} from "lucide-react";

interface Props {
  recruiters: Recruiter[];
}

export default function CompanyRecruiterList({
  recruiters,
}: Props) {
  if (recruiters.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow border p-6">
        <p className="text-gray-500">
          No recruiters found for this company.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold">
        Recruiters
      </h2>

      {recruiters.map((recruiter) => (
        <div
          key={recruiter._id}
          className="bg-white rounded-xl border shadow p-6"
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">
                {recruiter.name}
              </h3>

              
            </div>

            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
              {recruiter.company}
            </span>
          </div>

          {/* Contact */}
          <div className="grid md:grid-cols-2 gap-4 mt-6">

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-500" />

              <span>{recruiter.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-500" />

              <span>{recruiter.phone || "-"}</span>
            </div>

            <div className="flex items-center gap-3">
              <Link className="w-5 h-5 text-gray-500" />

              {recruiter.linkedin ? (
                <a
                  href={recruiter.linkedin}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  LinkedIn Profile
                </a>
              ) : (
                <span>-</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-500" />

              <span>
                {recruiter.nextFollowUp
                  ? new Date(
                      recruiter.nextFollowUp
                    ).toLocaleDateString()
                  : "-"}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
  <Clock className="w-5 h-5 text-gray-500" />

  <span>
    {recruiter.lastContact
      ? new Date(
          recruiter.lastContact
        ).toLocaleDateString()
      : "-"}
  </span>
</div>

          </div>

          {/* Tags */}

          <div className="mt-6">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-5 h-5 text-gray-500" />

              <span className="font-medium">
                Tags
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {recruiter.tags?.length ? (
                recruiter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-gray-100 text-sm"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">
                  No Tags
                </span>
              )}
            </div>
          </div>

          {/* Notes */}

          <div className="mt-6">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-gray-500" />

              <span className="font-medium">
                Notes
              </span>
            </div>

            <p className="text-gray-700 whitespace-pre-wrap">
              {recruiter.notes || "No Notes"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}