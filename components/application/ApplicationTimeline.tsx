"use client";

import { useEffect, useState } from "react";

interface TimelineEvent{
    _id:string;
    type:string;
    message:string;
    createdAt:string;
}
interface ApplicationTimelineProps {
  applicationId: string;
}
export default function ApplicationTimeline({
  applicationId,
}: ApplicationTimelineProps) {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/timeline/${applicationId}`);
       
        if (!response.ok) {
            throw new Error("Failed to load timeline.");
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
      } finally{
        setLoading(false);
      }
    };

    fetchTimeline();
  }, [applicationId]);

  const getIcon = (type: string) => {
    switch (type) {
      case "application_created":
        return "📄";

      case "status_changed":
        return "🔄";

      case "interview_added":
        return "🎤";

      default:
        return "📌";
    }
  };

  if (loading) {
  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Timeline</h2>
      <p className="text-gray-500">Loading timeline...</p>
    </div>
  );
}

  if (events.length === 0) {
    return (
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Timeline</h2>
        <p className="text-gray-500">No timeline activity yet.</p>
      </div>
    );
  }
  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Timeline</h2>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event._id} className="border-l-2 border-gray-300 pl-4">
            <p className="font-medium">
              {getIcon(event.type)} {event.message}
            </p>

            <p className="text-sm text-gray-500">
              {new Date(event.createdAt).toLocaleString("en-GB")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
