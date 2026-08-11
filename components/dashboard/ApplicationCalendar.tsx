"use client";

import { useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
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
      .filter((app) => app.followUpDate)
      .map((app) => {
        const date = new Date(app.followUpDate!);

        return {
          title: `📧 ${app.company}`,
          start: date,
          end: date,
          type: "followUp" as const,
        };
      });

    return [...interviewEvents, ...followUpEvents];
  }, [applications, interviews]);

  if (events.length === 0) {
    return (
      <div className="shadow-md rounded-lg p-6 bg-slate-400/10">
        <h2 className="text-xl font-semibold mb-6">
          Calendar View
        </h2>

        <p className="text-gray-500">
          No interviews or follow-ups scheduled.
        </p>
      </div>
    );
  }

  return (
    <div className="shadow-md rounded-lg p-6 bg-slate-400/10">
      <h2 className="text-xl font-semibold mb-6">
        Calendar View
      </h2>

      <div className="h-150">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          popup
          eventPropGetter={(event) => ({
            style: {
              backgroundColor:
                event.type === "interview"
                  ? "#2563eb"
                  : "#ca8a04",
            },
          })}
        />
      </div>
    </div>
  );
}