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
      <div className="rounded-lg p-6">
        <h2 className="text-2xl tracking-tight font-semibold mb-6">
          Calendar View
        </h2>

        <p className="text-gray-500">
          No interviews or follow-ups scheduled.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg p-6">
      <h2 className="text-2xl tracking-tight font-semibold mb-6">
        Calendar View
      </h2>

      <div style={{ height: 600 }}>
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
  );
}