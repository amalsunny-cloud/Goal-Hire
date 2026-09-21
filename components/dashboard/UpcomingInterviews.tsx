"use client";

import { useMemo } from "react";
import { Interview } from "@/types/interview";
import { CalendarDays, Clock3, FileText, ChevronRight } from "lucide-react";

interface UpcomingInterviewsProps {
  interviews: Interview[];
}

export default function UpcomingInterviews({
  interviews,
}: UpcomingInterviewsProps) {
  const upcomingInterviews = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return interviews
      .filter((interview) => {
        if (!interview.date) {
          return false;
        }

        return new Date(interview.date) >= today;
      })
      .sort(
        (a, b) =>
          new Date(a.date as string).getTime() -
          new Date(b.date as string).getTime(),
      );
  }, [interviews]);

  if (upcomingInterviews.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Upcoming Interviews
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Your scheduled interviews
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
            <CalendarDays className="h-4 w-4" />
          </div>
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-8 text-center">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
            <CalendarDays className="h-5 w-5 text-slate-400" />
          </div>

          <p className="text-sm font-semibold text-slate-700">
            No upcoming interviews
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Your scheduled interviews will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">

      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Upcoming Interviews
            </h2>

            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-50 px-2 text-[11px] font-bold text-blue-600">
              {upcomingInterviews.length}
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Your scheduled interviews
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
          <CalendarDays className="h-4 w-4" />
        </div>
      </div>

      {/* Interview list */}
      <ul className="space-y-3">
        {upcomingInterviews.map((interview) => {
          const interviewDate = new Date(interview.date as string);

          return (
            <li
              key={interview._id}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-100
                bg-slate-50/70
                p-4
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-slate-200
                hover:bg-white
                hover:shadow-sm
              "
            >
              {/* Left accent */}
              <div className="absolute left-0 top-0 h-full w-1 bg-blue-500" />

              {/* Interview title */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />

                    <h3 className="truncate text-sm font-bold text-slate-900">
                      {interview.round}
                    </h3>
                  </div>

                  <p className="mt-1 pl-4 text-xs text-slate-500">
                    Upcoming interview
                  </p>
                </div>

                <ChevronRight
                  className="
                    h-4
                    w-4
                    shrink-0
                    text-slate-300
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                    group-hover:text-slate-500
                  "
                />
              </div>

              {/* Interview details */}
              <div className="mt-4 grid gap-2 sm:grid-cols-2">

                {/* Date */}
                <div className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <CalendarDays className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Interview date
                    </p>

                    <p className="mt-0.5 truncate text-xs font-semibold text-slate-700">
                      {interviewDate.toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>

                {/* Outcome */}
                <div className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                    <Clock3 className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Outcome
                    </p>

                    <p className="mt-0.5 truncate text-xs font-semibold text-slate-700">
                      {interview.outcome}
                    </p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {interview.notes && (
                <div className="mt-3 flex gap-2.5 rounded-xl border border-slate-100 bg-white px-3 py-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <FileText className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Notes
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-slate-600">
                      {interview.notes}
                    </p>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}