"use client";

import { useMemo } from "react";
import { Interview } from "@/types/interview";

interface UpcomingInterviewsProps {
  interviews: Interview[];
}

export default function UpcomingInterviews({
  interviews,
}: UpcomingInterviewsProps) {
  const upcomingInterviews = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return interviews
      .filter((interview) => {
        if (!interview.date) {
          return false;
        }

        return new Date(interview.date) >= today;
      })
      .sort(
        (a, b) =>
          new Date(a.date as string).getTime() -
          new Date(b.date as string).getTime()
      );
  }, [interviews]);

  if (upcomingInterviews.length === 0) {
    return (
      <div className="shadow-md rounded-lg p-4 bg-white">
        <h2 className="text-xl font-semibold mb-2">
          Upcoming Interviews
        </h2>

        <p className="text-green-600 font-medium">
          🎉 No upcoming interviews scheduled.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg p-4 bg-slate-400/10 shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Upcoming Interviews
      </h2>

      <ul className="space-y-3">
        {upcomingInterviews.map((interview) => {
          const interviewDate = new Date(
            interview.date as string
          );

          return (
            <li
              key={interview._id}
              className="rounded p-3"
            >
              <h3 className="font-semibold text-orange-500">
                {interview.round}
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Interview Date
              </p>

              <p className="font-medium">
                {interviewDate.toLocaleDateString("en-GB")}
              </p>

              <p className="text-gray-500 text-sm mt-2">
                Outcome
              </p>

              <p>{interview.outcome}</p>

              {interview.notes && (
                <>
                  <p className="text-gray-500 text-sm mt-2">
                    Notes
                  </p>

                  <p>{interview.notes}</p>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}