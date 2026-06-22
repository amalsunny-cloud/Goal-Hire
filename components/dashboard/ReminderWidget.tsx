"use client"
import { getOverdueFollowUps } from "@/lib/dashboard/getOverdueFollowUps";
import { getUpcomingFollowUps } from "@/lib/dashboard/getUpcomingFollowUps";
import { Application } from "@/types/application";
import { Interview } from "@/types/interview";
import { useEffect, useState } from "react";

interface Props {
  applications: Application[];
  interviews: Interview[];
}

export default function ReminderWidget({ applications, interviews }: Props) {
  const overdue = getOverdueFollowUps(applications);

  const upcoming = getUpcomingFollowUps(applications);

  console.log("Applications are:", applications);
  console.log("Interviews are:", interviews);


   const [reminders, setReminders] =
    useState<any>(null);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders =
    async () => {

      try {

        const response =
          await fetch(
            "/api/reminders"
          );

        const data =
          await response.json();

        setReminders(data);

      } catch (error) {

        console.error(error);

      }
    };

  if (!reminders) {
    return (
      <p>
        Loading reminders...
      </p>
    );
  }
  
  const upcomingInterviews =
  interviews.filter(
    (interview) => {

      if (!interview.date) {
        return false;
      }

      const interviewDate =
        new Date(interview.date);

      const today =
        new Date();

      const next7Days =
        new Date();

      next7Days.setDate(
        today.getDate() + 7
      );

      return (
        interviewDate >= today &&
        interviewDate <= next7Days
      );
    }
  );

  const totalReminders =
  reminders.followUps.length +
  reminders.interviews.length;


  return (
    <div className="border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-semibold mb-6">Follow Up Reminders</h2>

      <div className="space-y-4">
        {overdue.length > 0 && (
          <div>
            <h3 className="font-bold text-red-500">Overdue</h3>

            {overdue.map((app) => (
              <div key={app._id}>{app.company}</div>
            ))}
          </div>
        )}

        {upcoming.length > 0 && (
          <div>
            <h3 className="font-bold text-yellow-500">Upcoming</h3>

            {upcoming.map((app) => (
              <div key={app._id}>{app.company}</div>
            ))}
          </div>
        )}

        {upcomingInterviews.length > 0 && (
          <div>
            <h3 className="font-bold text-blue-500">Upcoming Interviews</h3>

            {upcomingInterviews.map((interview) => (
              <div key={interview._id}>
                {interview.round}
                {" - "}
                {new Date(interview.date!).toLocaleDateString()}
              </div>
            ))}
          </div>
        )}
      </div>


      <h2
        className="
          text-xl
          font-semibold
          mb-4
        "
      >
        Upcoming Reminders ({totalReminders})
      </h2>

      {reminders.followUps.map(
        (app: any) => (
          <div
            key={app._id}
            className="mb-2"
          >
            🔔 Follow up with{" "}
            {app.company}
          </div>
        )
      )}

      {reminders.interviews.map(
        (interview: any) => (
          <div
            key={interview._id}
            className="mb-2"
          >
            🎤 Interview:
            {" "}
            {interview.round}
          </div>
        )
      )}

    </div>
  );
}
