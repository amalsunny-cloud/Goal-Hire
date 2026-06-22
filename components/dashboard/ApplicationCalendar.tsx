"use client"
import { Application } from "@/types/application";
import { Interview } from "@/types/interview";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)

interface Props {
  applications: Application[];
  interviews: Interview[];
}
export default function ApplicationCalendar({
  applications,
  interviews,
}: Props) {
  const interviewEvents = interviews
    .filter((interview) => interview.date)
    .map((interview) => ({
      title: `${interview.round}`,
      start: new Date(interview.date!),
      end: new Date(interview.date!),
    }));

    const followUpEvents =
    applications
      .filter(
        (app) =>
          app.followUpDate
      )
      .map(
        (app) => ({
          title:
            `📧 ${app.company}`,

          start:
            new Date(
              app.followUpDate!
            ),

          end:
            new Date(
              app.followUpDate!
            ),
        })
      );

  const events = [
    ...interviewEvents,
    ...followUpEvents,
  ];

  return (
    <div
      className="
        border
        rounded-lg
        p-6
        bg-white
      "
    >
      <h2
        className="
          text-xl
          font-semibold
          mb-6
        "
      >
        Calendar View
      </h2>

      <div
        style={{
          height: 600,
        }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    </div>
  );
}

