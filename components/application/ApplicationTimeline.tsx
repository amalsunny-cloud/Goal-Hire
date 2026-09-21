"use client";

import { useEffect, useState } from "react";

interface TimelineEvent {
  _id: string;
  type: string;
  message: string;
  createdAt: string;
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
      } finally {
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
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        {/* Header */}
        <div className="mb-6 flex items-start gap-3 border-b border-slate-100 pb-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
            <span className="text-lg">🕒</span>
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Timeline
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Your application activity history.
            </p>
          </div>
        </div>

        {/* Loading Skeleton */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-slate-100" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 animate-pulse rounded-md bg-slate-100" />
              <div className="h-3 w-32 animate-pulse rounded-md bg-slate-100" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-slate-100" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-2/3 animate-pulse rounded-md bg-slate-100" />
              <div className="h-3 w-28 animate-pulse rounded-md bg-slate-100" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        {/* Header */}
        <div className="mb-6 flex items-start gap-3 border-b border-slate-100 pb-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
            <span className="text-lg">🕒</span>
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Timeline
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Your application activity history.
            </p>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg">
              🕒
            </div>

            <p className="text-sm font-semibold text-slate-700">
              No timeline activity yet
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Application updates and interview activity will appear here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-7 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
            <span className="text-lg">🕒</span>
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Timeline
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Your application activity history.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600">
          {events.length} {events.length === 1 ? "Event" : "Events"}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative ml-2 border-l-2 border-slate-100 pl-7 sm:ml-3 sm:pl-9">
        <div className="space-y-7">
          {events.map((event) => (
            <div key={event._id} className="relative">
              {/* Timeline Dot */}
              <div className="absolute left-[-2.15rem] top-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-blue-50 text-sm shadow-sm sm:left-[-2.65rem]">
                {getIcon(event.type)}
              </div>

              {/* Event Card */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm">
                <p className="text-sm font-semibold leading-6 text-slate-800">
                  {event.message}
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />

                  <p className="text-xs font-medium text-slate-400">
                    {new Date(event.createdAt).toLocaleString("en-GB")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}