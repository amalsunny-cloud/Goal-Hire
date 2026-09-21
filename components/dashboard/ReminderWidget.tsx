"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getOverdueFollowUps } from "@/lib/dashboard/getOverdueFollowUps";
import { getUpcomingFollowUps } from "@/lib/dashboard/getUpcomingFollowUps";
import { Application } from "@/types/application";
import { Interview } from "@/types/interview";
import toast from "react-hot-toast";
import {
  BellRing,
  CalendarClock,
  ChevronRight,
} from "lucide-react";

interface ReminderWidgetProps {
  applications: Application[];
  interviews: Interview[];
}

interface ReminderResponse {
  followUps: Application[];
  interviews: Interview[];
}

export default function ReminderWidget({
  applications,
  interviews,
}: ReminderWidgetProps) {
  const [reminders, setReminders] = useState<ReminderResponse | null>(null);

  const overdue = useMemo(
    () => getOverdueFollowUps(applications),
    [applications],
  );

  const upcoming = useMemo(
    () => getUpcomingFollowUps(applications),
    [applications],
  );

  const upcomingInterviews = useMemo(() => {
    const today = new Date();

    const next7Days = new Date();
    next7Days.setDate(today.getDate() + 7);

    return interviews.filter((interview) => {
      if (!interview.date) {
        return false;
      }

      const interviewDate = new Date(interview.date);

      return interviewDate >= today && interviewDate <= next7Days;
    });
  }, [interviews]);

  const fetchReminders = useCallback(async () => {
    try {
      const response = await fetch("/api/reminders");

      if (!response.ok) {
        throw new Error("Failed to fetch reminders.");
      }

      const data: ReminderResponse = await response.json();

      setReminders(data);
    } catch (err) {
      console.error(err);

      toast.error(
        err instanceof Error ? err.message : "Failed to load reminders.",
      );
    }
  }, []);

  useEffect(() => {
    fetchReminders();
  }, [fetchReminders]);

  if (!reminders) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <WidgetTitle />

        <p className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-6 text-sm text-slate-500">
          Loading reminders…
        </p>
      </div>
    );
  }

  const totalReminders =
    reminders.followUps.length + reminders.interviews.length;

  const hasContent =
    overdue.length > 0 ||
    upcoming.length > 0 ||
    upcomingInterviews.length > 0 ||
    totalReminders > 0;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">

      {/* Header */}
      <WidgetTitle count={totalReminders} />

      {!hasContent ? (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-5 text-sm font-medium text-emerald-700">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
            ✓
          </div>

          <div>
            <p className="font-semibold">You're all caught up</p>
            <p className="mt-0.5 text-xs font-normal text-emerald-600">
              No reminders right now.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">

          {/* Immediate reminders */}
          <div className="space-y-5">

            {/* Overdue */}
            {overdue.length > 0 && (
              <section>
                <div className="mb-2.5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />

                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-rose-600">
                    Overdue
                  </p>
                </div>

                <ul className="space-y-2">
                  {overdue.map((app) => (
                    <ReminderRow
                      key={app._id}
                      label={`Follow up with ${app.company}`}
                      tone="rose"
                    />
                  ))}
                </ul>
              </section>
            )}

            {/* Upcoming follow-ups */}
            {upcoming.length > 0 && (
              <section>
                <div className="mb-2.5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />

                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-amber-600">
                    Upcoming follow-ups
                  </p>
                </div>

                <ul className="space-y-2">
                  {upcoming.map((app) => (
                    <ReminderRow
                      key={app._id}
                      label={app.company}
                      tone="amber"
                    />
                  ))}
                </ul>
              </section>
            )}

            {/* Upcoming interviews */}
            {upcomingInterviews.length > 0 && (
              <section>
                <div className="mb-2.5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />

                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-blue-600">
                    Upcoming interviews
                  </p>
                </div>

                <ul className="space-y-2">
                  {upcomingInterviews.map((interview) => (
                    <ReminderRow
                      key={interview._id}
                      label={`${interview.round} · ${new Date(interview.date!).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`}
                      tone="blue"
                    />
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Scheduled reminders */}
          {totalReminders > 0 && (
            <section className="border-t border-slate-100 pt-5">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                Scheduled by your tracker
              </p>

              <ul className="space-y-2">
                {reminders.followUps.map((app) => (
                  <ReminderRow
                    key={app._id}
                    label={`Follow up with ${app.company}`}
                    tone="slate"
                  />
                ))}

                {reminders.interviews.map((interview) => (
                  <ReminderRow
                    key={interview._id}
                    label={`Interview: ${interview.round}`}
                    tone="slate"
                  />
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

function WidgetTitle({ count }: { count?: number }) {
  return (
    <div className="mb-5 flex items-start justify-between gap-3">
      <div>
        <div className="flex items-center gap-2.5">
          <p className="text-xl font-bold tracking-tight text-slate-900">
            Follow-up reminders
          </p>

          {typeof count === "number" && count > 0 && (
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-rose-50 px-2 text-[11px] font-bold text-rose-600">
              {count}
            </span>
          )}
        </div>

        <p className="mt-1 text-xs text-slate-500">
          Stay on top of the next step
        </p>
      </div>

      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-100 bg-amber-50 text-amber-600">
        <BellRing className="h-4 w-4" />
      </span>

      {typeof count === "number" && count > 0 && (
        <span className="sr-only">{count} reminders</span>
      )}
    </div>
  );
}

function ReminderRow({
  label,
  tone,
}: {
  label: string;
  tone: "rose" | "amber" | "blue" | "slate";
}) {
  const tones = {
    rose: {
      icon: "bg-rose-50 text-rose-500",
      dot: "bg-rose-500",
    },
    amber: {
      icon: "bg-amber-50 text-amber-500",
      dot: "bg-amber-500",
    },
    blue: {
      icon: "bg-blue-50 text-blue-500",
      dot: "bg-blue-500",
    },
    slate: {
      icon: "bg-slate-100 text-slate-500",
      dot: "bg-slate-400",
    },
  };

  return (
    <li
      className="
        group
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-slate-100
        bg-slate-50/70
        px-3
        py-3
        text-sm
        font-medium
        text-slate-700
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-slate-200
        hover:bg-white
        hover:shadow-sm
      "
    >
      {/* Status indicator */}
      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${tones[tone].dot}`}
      />

      {/* Icon */}
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tones[tone].icon}`}
      >
        <CalendarClock className="h-4 w-4" />
      </span>

      {/* Label */}
      <span className="min-w-0 flex-1 truncate">
        {label}
      </span>

      {/* Arrow */}
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
    </li>
  );
}