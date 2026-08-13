"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getOverdueFollowUps } from "@/lib/dashboard/getOverdueFollowUps";
import { getUpcomingFollowUps } from "@/lib/dashboard/getUpcomingFollowUps";
import { Application } from "@/types/application";
import { Interview } from "@/types/interview";
import toast from "react-hot-toast";

interface ReminderWidgetProps {
  applications: Application[];
  interviews: Interview[];
}

interface ReminderResponse {
  followUps: Application[];
  interviews: Interview[];
}

export default function ReminderWidget({
  applications,
  interviews,
}: ReminderWidgetProps) {
  const [reminders, setReminders] =
    useState<ReminderResponse | null>(null);

  const overdue = useMemo(
    () => getOverdueFollowUps(applications),
    [applications]
  );

  const upcoming = useMemo(
    () => getUpcomingFollowUps(applications),
    [applications]
  );

  const upcomingInterviews = useMemo(() => {
    const today = new Date();

    const next7Days = new Date();
    next7Days.setDate(today.getDate() + 7);

    return interviews.filter((interview) => {
      if (!interview.date) {
        return false;
      }

      const interviewDate = new Date(interview.date);

      return (
        interviewDate >= today &&
        interviewDate <= next7Days
      );
    });
  }, [interviews]);

  const fetchReminders = useCallback(async () => {
    try {
      const response = await fetch("/api/reminders");

      if (!response.ok) {
        throw new Error(
          "Failed to fetch reminders."
        );
      }

      const data: ReminderResponse =
        await response.json();

      setReminders(data);
    } catch (err) {
      console.error(err);

      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to load reminders."
      );
    }
  }, []);

  useEffect(() => {
    fetchReminders();
  }, [fetchReminders]);

  if (!reminders) {
    return (
      <div className="border rounded-lg p-6 bg-white">
        <h2 className="text-xl font-semibold mb-6">
          Follow Up Reminders
        </h2>

        <p className="text-gray-500">
          Loading reminders...
        </p>
      </div>
    );
  }

  const totalReminders =
    reminders.followUps.length +
    reminders.interviews.length;

  const hasContent =
    overdue.length > 0 ||
    upcoming.length > 0 ||
    upcomingInterviews.length > 0 ||
    totalReminders > 0;

  return (
    <div className="rounded-lg p-6 bg-slate-400/10 shadow-md">
      <h2 className="text-xl font-semibold mb-6">
        Follow Up Reminders
      </h2>

      {!hasContent ? (
        <p className="text-gray-500">
          No reminders at the moment.
        </p>
      ) : (
        <>
          <div className="space-y-6">
            {overdue.length > 0 && (
              <section>
                <h3 className="font-bold text-red-500 mb-2">
                  Overdue
                </h3>

                <ul className="space-y-1">
                  {overdue.map((app) => (
                    <li key={app._id}>
                      {app.company}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {upcoming.length > 0 && (
              <section>
                <h3 className="font-bold text-yellow-500 mb-2">
                  Upcoming Follow-ups
                </h3>

                <ul className="space-y-1">
                  {upcoming.map((app) => (
                    <li key={app._id}>
                      {app.company}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {upcomingInterviews.length > 0 && (
              <section>
                <h3 className="font-bold text-blue-500 mb-2">
                  Upcoming Interviews
                </h3>

                <ul className="space-y-1">
                  {upcomingInterviews.map(
                    (interview) => (
                      <li key={interview._id}>
                        {interview.round} –{" "}
                        {new Date(
                          interview.date!
                        ).toLocaleDateString()}
                      </li>
                    )
                  )}
                </ul>
              </section>
            )}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">
              Upcoming Reminder(s) (
              {totalReminders})
            </h3>

            {reminders.followUps.length >
              0 && (
              <ul className="space-y-2 mb-4">
                {reminders.followUps.map(
                  (app) => (
                    <li key={app._id}>
                      🔔 Follow up with{" "}
                      <span className="font-medium">
                        {app.company}
                      </span>
                    </li>
                  )
                )}
              </ul>
            )}

            {reminders.interviews.length >
              0 && (
              <ul className="space-y-2">
                {reminders.interviews.map(
                  (interview) => (
                    <li
                      key={interview._id}
                    >
                      🎤 Interview:{" "}
                      <span className="font-medium">
                        {interview.round}
                      </span>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}