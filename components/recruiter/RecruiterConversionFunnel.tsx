"use client";

import { Recruiter } from "@/types/recruiter";
import { RecruiterCommunication } from "@/types/recruiterCommunication";

interface Props {
  recruiters: Recruiter[];
  communications: RecruiterCommunication[];
}

export default function RecruiterConversionFunnel({
  recruiters,
  communications,
}: Props) {
  const recruitersAdded = recruiters.length;

  const communicationsSent = communications.length;

  const responsesReceived = communications.filter((c) => c.responded).length;

  const positiveResponses = communications.filter(
    (c) => c.responseType === "Positive",
  ).length;

  const stages = [
    {
      title: "Recruiters",
      value: recruitersAdded,
      color: "bg-blue-500",
    },
    {
      title: "Communications",
      value: communicationsSent,
      color: "bg-cyan-500",
    },
    {
      title: "Responses",
      value: responsesReceived,
      color: "bg-yellow-500",
    },
    {
      title: "Positive",
      value: positiveResponses,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-7 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Recruiter Conversion Funnel
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
            Track your recruiter outreach from initial contact to positive
            responses.
          </p>
        </div>

        <div className="hidden rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 sm:block">
          Funnel Overview
        </div>
      </div>

      {/* Funnel */}
      <div className="space-y-5">
        {stages.map((stage, index) => {
          const percentages = [
            100,
            recruitersAdded
              ? Math.round((communicationsSent / recruitersAdded) * 100)
              : 0,
            communicationsSent
              ? Math.round((responsesReceived / communicationsSent) * 100)
              : 0,
            responsesReceived
              ? Math.round((positiveResponses / responsesReceived) * 100)
              : 0,
          ];

          const percentage = percentages[index];

          return (
            <div key={stage.title} className="group">
              {/* Label */}
              <div className="mb-2.5 flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${stage.color}`}
                  />

                  <span className="truncate text-sm font-semibold text-slate-700">
                    {stage.title}
                  </span>
                </div>

                <span className="shrink-0 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-700">
                  {stage.value}
                </span>
              </div>

              {/* Progress */}
              <div className="h-9 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                <div
                  className={`${stage.color} flex h-full items-center justify-end rounded-xl pr-3 text-xs font-bold text-white transition-all duration-500`}
                  style={{
                    width: `${percentage}%`,
                  }}
                >
                  {percentage}%
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-7 flex items-center gap-2 border-t border-slate-100 pt-5">
        <span className="h-2 w-2 rounded-full bg-indigo-500" />

        <p className="text-xs leading-5 text-slate-500">
          Each stage shows the conversion from the previous stage.
        </p>
      </div>
    </div>
  );
}