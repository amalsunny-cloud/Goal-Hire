import { Recruiter } from "@/types/recruiter";
import { RecruiterActivityTimelineEvent } from "@/types/recruiterActivityTimeline";
import { RecruiterCommunication } from "@/types/recruiterCommunication";
import {
  UserPlus,
  Mail,
  Phone,
  MessageCircle,
  Calendar,
  CheckCircle,
  XCircle,
  Circle,
} from "lucide-react";

interface Props {
  recruiters: Recruiter[];
  communications: RecruiterCommunication[];
}

export default function RecruiterActivityTimeline({
  recruiters,
  communications,
}: Props) {
  const events: RecruiterActivityTimelineEvent[] = [];

  recruiters.forEach((recruiter) => {
    events.push({
      id: recruiter._id,
      date: recruiter.createdAt,
      title: "Recruiter Added",
      description: recruiter.name,
      type: "Recruiter",
    });
  });

  communications.forEach((communication) => {
    events.push({
      id: communication._id,
      date: communication.date,
      title: `${communication.type} Communication`,
      description: communication.subject || "No Subject",
      type: "Communication",
    });

    if (communication.responded) {
      events.push({
        id: `${communication._id}-response`,
        date: communication.responseDate!,
        title: "Recruiter Responded",
        description: communication.responseType || "Response",
        type: "Response",
      });
    }
  });

  events.sort((a, b) => {
    const diff =
      new Date(b.date).getTime() -
      new Date(a.date).getTime();

    if (diff !== 0) {
      return diff;
    }

    return a.title.localeCompare(b.title);
  });

  const getDateLabel = (dateString: string) => {
    const date = new Date(dateString);

    date.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.getTime() === today.getTime()) {
      return "Today";
    }

    if (date.getTime() === yesterday.getTime()) {
      return "Yesterday";
    }

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const groupedEvents: Record<
    string,
    RecruiterActivityTimelineEvent[]
  > = {};

  events.forEach((event) => {
    const label = getDateLabel(event.date);

    if (!groupedEvents[label]) {
      groupedEvents[label] = [];
    }

    groupedEvents[label].push(event);
  });

  const getIcon = (event: RecruiterActivityTimelineEvent) => {
    if (event.type === "Recruiter") {
      return <UserPlus size={18} />;
    }

    if (event.type === "Communication") {
      if (event.title.includes("Email")) {
        return <Mail size={18} />;
      }

      if (event.title.includes("Phone")) {
        return <Phone size={18} />;
      }

      if (event.title.includes("WhatsApp")) {
        return <MessageCircle size={18} />;
      }

      if (event.title.includes("Meeting")) {
        return <Calendar size={18} />;
      }

      return <Circle size={18} />;
    }

    if (event.type === "Response") {
      if (event.description?.toLowerCase() === "positive") {
        return <CheckCircle size={18} />;
      }

      if (event.description?.toLowerCase() === "rejected") {
        return <XCircle size={18} />;
      }

      return <MessageCircle size={18} />;
    }
  };

  const getColor = (event: RecruiterActivityTimelineEvent) => {
    if (event.type === "Recruiter") {
      return "text-blue-600";
    }

    if (event.type === "Communication") {
      return "text-green-600";
    }

    if (event.type === "Response") {
      if (event.description?.toLowerCase() === "positive") {
        return "text-emerald-600";
      }

      if (event.description?.toLowerCase() === "rejected") {
        return "text-red-600";
      }

      return "text-yellow-600";
    }
  };

  const getRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = now.getTime() - date.getTime();
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (diff < minute) {
      return "Just now";
    }

    if (diff < hour) {
      const minutes = Math.floor(diff / minute);
      return `${minutes} minute${
        minutes !== 1 ? "s" : ""
      } ago`;
    }

    if (diff < day) {
      const hours = Math.floor(diff / hour);
      return `${hours} hour${
        hours !== 1 ? "s" : ""
      } ago`;
    }

    if (diff < day * 2) {
      return (
        "Yesterday at" +
        date.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }

    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getBadge = (event: RecruiterActivityTimelineEvent) => {
    switch (event.type) {
      case "Recruiter":
        return (
          <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
            Recruiter
          </span>
        );

      case "Communication":
        return (
          <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
            Communication
          </span>
        );

      default:
        return (
          <span className="rounded-full border border-purple-100 bg-purple-50 px-2.5 py-1 text-[11px] font-semibold text-purple-700">
            Response
          </span>
        );
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-7 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Activity Timeline
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
            Keep track of recruiter additions, communications, and responses.
          </p>
        </div>

        <div className="hidden rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 sm:block">
          Activity History
        </div>
      </div>

      {events.length === 0 ? (
        <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg">
              🕒
            </div>

            <p className="text-sm font-semibold text-slate-700">
              No activity yet
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Recruiter activity will appear here as you interact with
              recruiters.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {Object.entries(groupedEvents).map(
            ([label, items]) => (
              <div key={label}>
                {/* Date */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700">
                    {label}
                  </span>

                  <div className="h-px flex-1 bg-slate-100" />
                </div>

                {/* Timeline */}
                <div className="relative ml-4 border-l-2 border-slate-100 pl-8">
                  {items.map((event) => (
                    <div
                      key={event.id}
                      className="relative mb-5 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-sm"
                    >
                      {/* Timeline Icon */}
                      <div
                        className={`absolute left-[-3.05rem] top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm ${getColor(
                          event,
                        )}`}
                      >
                        {getIcon(event)}
                      </div>

                      {/* Event Header */}
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                          {getBadge(event)}

                          <h3 className="text-sm font-bold text-slate-900">
                            {event.title}
                          </h3>
                        </div>

                        <span className="shrink-0 text-[11px] font-medium text-slate-400">
                          {getRelativeTime(event.date)}
                        </span>
                      </div>

                      {/* Description */}
                      {event.description && (
                        <p
                          className={`mt-3 whitespace-pre-wrap wrap-break-word text-sm font-medium ${getColor(
                            event,
                          )}`}
                        >
                          {event.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}