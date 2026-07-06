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

  const groupedEvents: Record<string, RecruiterActivityTimelineEvent[]> = {};
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

    // return <Circle size={18} />;
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

    // return "text-gray-600";
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
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    }

    if (diff < day) {
      const hours = Math.floor(diff / hour);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
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
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
          Recruiter
        </span>
      );

    case "Communication":
      return (
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
          Communication
        </span>
      );

    default:
      return (
        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
          Response
        </span>
      );
  }
};


  return (
    <div className="border rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-8">Activity Timeline</h2>

      {events.length === 0 ? (
        <p>No activity yet.</p>
      ) : (
        <>
          {Object.entries(groupedEvents).map(([label, items]) => (
            <div key={label} className="mb-10">
              <h2
                className="text-lg font-bold text-gray-700 mb-5">
                {label}
              </h2>

              <div
                className="relative border-l-2 border-gray-300 ml-4">
                {items.map((event) => (
                  <div
                    key={event.id}
                    className="relative ml-8 mb-8 pb-2 transition-all duration-200 hover:translate-x-1">
                    <div
                      className={`
                      absolute
                      -left-[44px]
                      top-0
                      bg-white
                      p-1
                      rounded-full
                      border
                      ${getColor(event)}
                    `}
                    >
                      {getIcon(event)}
                    </div>

                    <div
                      className="flex justify-between items-start gap-4">
                      <div className="flex items-center gap-3 flex-wrap">{getBadge(event)}
                        <h3 className="font-semibold">
                          {event.title}
                        </h3>
                      </div>
                      <span
                        className="text-xs text-gray-500 whitespace-nowrap ml-4">
                        {getRelativeTime(event.date)}
                      </span>
                    </div>

                    {event.description && (
                      <p className="text-gray-600 mt-2 whitespace-pre-wrap wrap-break-word">{event.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
