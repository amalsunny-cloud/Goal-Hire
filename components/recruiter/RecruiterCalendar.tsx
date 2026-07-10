"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useMemo, useState } from "react";
import { Recruiter } from "@/types/recruiter";

interface Props {
  recruiters: Recruiter[];
}

export default function RecruiterCalendar({ recruiters }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const recruitersForSelectedDate = useMemo(() => {
    return recruiters.filter((recruiter) => {
      if (!recruiter.nextFollowUp) {
        return false;
      }

      const followUp = new Date(recruiter.nextFollowUp);

      return (
        followUp.getFullYear() === selectedDate.getFullYear() &&
        followUp.getMonth() === selectedDate.getMonth() &&
        followUp.getDate() === selectedDate.getDate()
      );
    });
  }, [selectedDate, recruiters]);

  const tileClassName = ({
    date,
    view,
  }: {
    date: Date;
    view: string;
  }) => {
    if (view !== "month") {
      return "";
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const recruiter = recruiters.find((r) => {
      if (!r.nextFollowUp) {
        return false;
      }

      const followUp = new Date(r.nextFollowUp);

      return (
        followUp.getFullYear() === date.getFullYear() &&
        followUp.getMonth() === date.getMonth() &&
        followUp.getDate() === date.getDate()
      );
    });

    if (!recruiter) {
      return "";
    }

    const followUp = new Date(recruiter.nextFollowUp!);
    followUp.setHours(0, 0, 0, 0);

    if (followUp.getTime() < today.getTime()) {
      return "calendar-overdue";
    }

    if (followUp.getTime() === today.getTime()) {
      return "calendar-today";
    }

    return "calendar-upcoming";
  };

  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-6">
        Recruiter Follow-up Calendar
      </h2>

      <Calendar locale="en-GB"
        value={selectedDate}
        onChange={(value) => setSelectedDate(value as Date)}
        tileClassName={tileClassName}
      />

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">
          Recruiters on{" "}
          {selectedDate.toLocaleDateString("en-GB")}
        </h3>

        {recruitersForSelectedDate.length === 0 ? (
          <p className="text-gray-500">
            No follow-ups scheduled.
          </p>
        ) : (
          <div className="space-y-3">
            {recruitersForSelectedDate.map((recruiter) => (
              <div
                key={recruiter._id}
                className="
                  border
                  rounded-lg
                  p-4
                  bg-gray-50
                "
              >
                <h4 className="font-semibold">
                  {recruiter.name}
                </h4>

                <p className="text-gray-600">
                  {recruiter.email || "No Email"}
                </p>

                <p className="text-gray-600">
                  {recruiter.phone || "No Phone"}
                </p>

                <p className="text-sm text-gray-500">
                  Follow-up:
                  {" "}
                  {new Date(
                    recruiter.nextFollowUp!
                  ).toLocaleDateString("en-GB")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}