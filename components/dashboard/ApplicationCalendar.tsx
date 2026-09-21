"use client";

import { useMemo, useState } from "react";
import {
  Calendar,
  momentLocalizer,
  View,
} from "react-big-calendar";
import moment from "moment";
import { Application } from "@/types/application";
import { Interview } from "@/types/interview";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

interface ApplicationCalendarProps {
  applications: Application[];
  interviews: Interview[];
}

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  type: "interview" | "followUp";
}

export default function ApplicationCalendar({
  applications,
  interviews,
}: ApplicationCalendarProps) {
  const [view, setView] = useState<View>("month");

  const [date, setDate] = useState<Date>(new Date());

  const events = useMemo<CalendarEvent[]>(() => {
    const interviewEvents = interviews
      .filter((interview) => interview.date)
      .map((interview) => {
        const date = new Date(interview.date!);

        return {
          title: `🎤 ${interview.round}`,
          start: date,
          end: date,
          type: "interview" as const,
        };
      });

    const followUpEvents = applications
      .filter((application) => application.followUpDate)
      .map((application) => {
        const date = new Date(application.followUpDate!);

        return {
          title: `📧 ${application.company}`,
          start: date,
          end: date,
          type: "followUp" as const,
        };
      });

    return [
      ...interviewEvents,
      ...followUpEvents,
    ];
  }, [applications, interviews]);

  if (events.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Calendar View
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Keep track of interviews and application follow-ups
            </p>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50">
            <span className="text-lg">📅</span>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex min-h-55 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <span className="text-xl">📅</span>
          </div>

          <p className="text-sm font-semibold text-slate-700">
            No scheduled events
          </p>

          <p className="mt-1 max-w-sm text-xs text-slate-500">
            Interviews and follow-up dates will appear here when they are
            scheduled.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Calendar View
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Manage interviews and application follow-ups
          </p>
        </div>

        {/* Header Icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50">
          <span className="text-lg">📅</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
          <span className="text-xs font-medium text-slate-600">
            Interviews
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          <span className="text-xs font-medium text-slate-600">
            Follow-ups
          </span>
        </div>
      </div>

      {/* Calendar */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="goal-hire-calendar" style={{ height: 600 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"

            /* Controlled view */
            view={view}
            onView={(newView) => {
              setView(newView);
            }}

            /* Controlled date */
            date={date}
            onNavigate={(newDate) => {
              setDate(newDate);
            }}

            /* Initial view */
            defaultView="month"

            /* Toolbar */
            toolbar={true}

            /*
             * Show "more" popup when there are
             * many events on one day.
             */
            popup

            eventPropGetter={(event) => ({
              style: {
                backgroundColor:
                  event.type === "interview"
                    ? "#2563eb"
                    : "#ca8a04",

                borderRadius: "6px",
                border: "none",
                color: "white",
              },
            })}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
        <span className="h-2 w-2 rounded-full bg-indigo-500" />

        <p className="text-xs text-slate-500">
          Stay organized by keeping interviews and follow-ups scheduled.
        </p>
      </div>
    </div>
  );
}