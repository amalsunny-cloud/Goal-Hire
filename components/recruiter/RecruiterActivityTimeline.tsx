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
      description: communication.subject,
      type: "Communication",
    });
    if (communication.responded) {
      events.push({
        id: `${communication._id}-response`,
        date: communication.responseDate!,
        title: "Recruiter Responded",
        description: communication.responseType ?? "Response",
        type: "Response",
      });
    }
  });

  events.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

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
      if (event.description === "Positive") {
        return <CheckCircle size={18} />;
      }

      if (event.description === "Rejected") {
        return <XCircle size={18} />;
      }

      return <MessageCircle size={18} />;
    }

    return <Circle size={18} />;
  };

  const getColor = (event: RecruiterActivityTimelineEvent) => {
    if (event.type === "Recruiter") {
      return "text-blue-600";
    }

    if (event.type === "Communication") {
      return "text-green-600";
    }

    if (event.type === "Response") {
      if (event.description === "Positive") {
        return "text-emerald-600";
      }

      if (event.description === "Rejected") {
        return "text-red-600";
      }

      return "text-yellow-600";
    }

    return "text-gray-600";
  };
  return (
    <div className="border rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-8">Activity Timeline</h2>

      {events.length === 0 ? (
        <p>No activity yet.</p>
      ) : (
        <div className="relative border-l-2 border-gray-300 ml-4">
          {events.map((event) => (
            <div key={event.id} className="relative mb-8 ml-8">
              <div
                className={`
    absolute
    -left-[48px]
    top-0
    bg-white
    p-1
    rounded-full
    border
    ${getColor(event)}
  `}
              />
              {getIcon(event)}

              <p className="text-sm text-gray-500">
                {new Date(event.date).toLocaleDateString("en-GB")}
              </p>

              <h3 className="font-semibold mt-1">{event.title}</h3>

              {event.description && (
                <p className="text-gray-600">{event.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
