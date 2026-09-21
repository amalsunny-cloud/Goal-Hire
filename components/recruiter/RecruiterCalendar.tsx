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
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Recruiter Follow-up Calendar
          </h2>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            View scheduled recruiter follow-ups by date.
          </p>
        </div>

        <div className="w-fit rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600">
          Follow-ups
        </div>
      </div>

      {/* Calendar */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-slate-50/60 p-3 sm:p-5">
          <Calendar
            locale="en-GB"
            value={selectedDate}
            onChange={(value) => setSelectedDate(value as Date)}
            tileClassName={tileClassName}
            className="goal-hire-recruiter-calendar"
          />
        </div>
      </div>

      {/* Selected Date */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Recruiters on{" "}
              {selectedDate.toLocaleDateString("en-GB")}
            </h3>

            <p className="mt-0.5 text-xs text-slate-500">
              Follow-ups scheduled for the selected date.
            </p>
          </div>

          <div className="w-fit rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
            {recruitersForSelectedDate.length}{" "}
            {recruitersForSelectedDate.length === 1
              ? "Recruiter"
              : "Recruiters"}
          </div>
        </div>

        {recruitersForSelectedDate.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-white px-4 py-8 text-center">
            <p className="text-sm font-medium text-slate-500">
              No follow-ups scheduled.
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Select another date to view recruiter follow-ups.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recruitersForSelectedDate.map((recruiter) => (
              <div
                key={recruiter._id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-bold text-slate-900">
                      {recruiter.name}
                    </h4>

                    <div className="mt-2 space-y-1">
                      <p className="truncate text-xs text-slate-500">
                        {recruiter.email || "No Email"}
                      </p>

                      <p className="text-xs text-slate-500">
                        {recruiter.phone || "No Phone"}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-amber-600">
                      Follow-up
                    </p>

                    <p className="mt-0.5 text-xs font-semibold text-amber-700">
                      {new Date(
                        recruiter.nextFollowUp!
                      ).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}