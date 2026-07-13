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
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-8">
        Recruiter Conversion Funnel
      </h2>

      <div className="space-y-6">
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
            <div key={stage.title}>
              <div className="flex justify-between mb-2">
                <span className="font-medium">{stage.title}</span>

                <span>{stage.value}</span>
              </div>

              <div className="w-full h-7 rounded bg-gray-200 overflow-hidden">
                <div
                  className={`${stage.color} h-full flex items-center justify-end pr-3 text-white font-semibold`}
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
    </div>
  );
}
