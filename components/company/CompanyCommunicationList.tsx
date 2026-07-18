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
} from "lucide-react";

interface Props {
  recruiters: Recruiter[];
  communications: RecruiterCommunication[];
}

function getCommunicationIcon(type: string) {
  switch (type) {
    case "Email":
      return <Mail className="w-5 h-5 text-blue-600" />;

    case "Phone":
      return <Phone className="w-5 h-5 text-green-600" />;

    case "WhatsApp":
      return (
        <MessageCircle className="w-5 h-5 text-green-500" />
      );

    case "Meeting":
      return (
        <Users className="w-5 h-5 text-purple-600" />
      );

    case "LinkedIn":
      return (
        <Users className="w-5 h-5 text-sky-600" />
      );

    default:
      return <Mail className="w-5 h-5" />;
  }
}

function getResponseIcon(response?: string) {
  switch (response) {
    case "Positive":
      return (
        <CheckCircle className="w-5 h-5 text-green-600" />
      );

    case "Rejected":
      return (
        <XCircle className="w-5 h-5 text-red-600" />
      );

    case "Neutral":
      return (
        <MinusCircle className="w-5 h-5 text-yellow-600" />
      );

    default:
      return (
        <Clock className="w-5 h-5 text-gray-500" />
      );
  }
}

export default function CompanyCommunicationList({
  recruiters,
  communications,
}: Props) {
  if (communications.length === 0) {
    return (
      <div className="bg-white rounded-xl border shadow p-6">
        <p className="text-gray-500">
          No communications found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">

      <h2 className="text-2xl font-semibold">
        Communication History
      </h2>

      {communications
        .sort(
          (a, b) =>
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
        )
        .map((communication) => {
          const recruiter = recruiters.find(
            (r) =>
              r._id ===
              communication.recruiterId
          );

          return (
            <div
              key={communication._id}
              className="bg-white rounded-xl border shadow p-6"
            >
              <div className="flex justify-between items-start">

                <div>

                  <div className="flex items-center gap-2">
                    {getCommunicationIcon(
                      communication.type
                    )}

                    <h3 className="text-lg font-semibold">
                      {communication.type}
                    </h3>
                  </div>

                  <p className="text-gray-500 mt-1">
                    Recruiter :
                    {" "}
                    {recruiter?.name ??
                      "Unknown"}
                  </p>

                </div>

                <div className="text-right">

                  <div className="flex items-center gap-2 justify-end">
                    <Calendar className="w-4 h-4 text-gray-500" />

                    <span>
                      {new Date(
                        communication.date
                      ).toLocaleDateString()}
                    </span>

                  </div>

                </div>

              </div>

              {communication.subject && (
                <div className="mt-5">

                  <h4 className="font-semibold mb-2">
                    Subject
                  </h4>

                  <p>
                    {communication.subject}
                  </p>

                </div>
              )}

              {communication.message && (
                <div className="mt-5">

                  <h4 className="font-semibold mb-2">
                    Message
                  </h4>

                  <p className="whitespace-pre-wrap">
                    {communication.message}
                  </p>

                </div>
              )}

              <div className="mt-6 border-t pt-5">

                <div className="flex items-center gap-2">

                  {getResponseIcon(
                    communication.responseType
                  )}

                  <span className="font-medium">
                    {communication.responded
                      ? communication.responseType
                      : "Awaiting Response"}
                  </span>

                </div>

                {communication.responded &&
                  communication.responseDate && (
                    <p className="text-gray-500 mt-2">
                      Response Date :
                      {" "}
                      {new Date(
                        communication.responseDate
                      ).toLocaleDateString()}
                    </p>
                  )}

                {communication.responseNotes && (
                  <div className="mt-3">

                    <h4 className="font-semibold mb-1">
                      Response Notes
                    </h4>

                    <p>
                      {
                        communication.responseNotes
                      }
                    </p>

                  </div>
                )}

              </div>

            </div>
          );
        })}
    </div>
  );
}