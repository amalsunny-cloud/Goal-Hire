"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getOverdueFollowUps } from "@/lib/dashboard/getOverdueFollowUps";
import { getUpcomingFollowUps } from "@/lib/dashboard/getUpcomingFollowUps";
import { Application } from "@/types/application";
import { Interview } from "@/types/interview";
import toast from "react-hot-toast";
import { BellRing, CalendarClock, ChevronRight } from "lucide-react";

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
  const [reminders, setReminders] =
    useState<ReminderResponse | null>(null);

  const overdue = useMemo(
    () => getOverdueFollowUps(applications),
    [applications]
  );

  const upcoming = useMemo(
    () => getUpcomingFollowUps(applications),
    [applications]
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

      return (
        interviewDate >= today &&
        interviewDate <= next7Days
      );
    });
  }, [interviews]);

  const fetchReminders = useCallback(async () => {
    try {
      const response = await fetch("/api/reminders");

      if (!response.ok) {
        throw new Error(
          "Failed to fetch reminders."
        );
      }

      const data: ReminderResponse =
        await response.json();

      setReminders(data);
    } catch (err) {
      console.error(err);

      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to load reminders."
      );
    }
  }, []);

  useEffect(() => {
    fetchReminders();
  }, [fetchReminders]);

  if (!reminders) {
    return (
      <div className="py-1">
        <WidgetTitle />
        <p className="rounded-2xl px-4 py-6 text-sm text-slate-500">Loading reminders…</p>
      </div>
    );
  }

  const totalReminders =
    reminders.followUps.length +
    reminders.interviews.length;

  const hasContent =
    overdue.length > 0 ||
    upcoming.length > 0 ||
    upcomingInterviews.length > 0 ||
    totalReminders > 0;

  return (
    <div className="py-1">
      <WidgetTitle count={totalReminders} />

      {!hasContent ? (
        <div className="rounded-2xl bg-emerald-50 px-4 py-6 text-sm font-medium text-emerald-700">You are all caught up. No reminders right now.</div>
      ) : (
        <div className="space-y-5">
          <div className="space-y-4">
            {overdue.length > 0 && (
              <section>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-rose-600">Overdue</p>
                <ul className="space-y-2">
                  {overdue.map((app) => (
                    <ReminderRow key={app._id} label={`Follow up with ${app.company}`} tone="rose" />
                  ))}
                </ul>
              </section>
            )}

            {upcoming.length > 0 && (
              <section>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-amber-600">Upcoming follow-ups</p>
                <ul className="space-y-2">
                  {upcoming.map((app) => (
                    <ReminderRow key={app._id} label={app.company} tone="amber" />
                  ))}
                </ul>
              </section>
            )}

            {upcomingInterviews.length > 0 && (
              <section>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-600">Upcoming interviews</p>
                <ul className="space-y-2">
                  {upcomingInterviews.map(
                    (interview) => (
                      <ReminderRow key={interview._id} label={`${interview.round} · ${new Date(interview.date!).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`} tone="blue" />
                    )
                  )}
                </ul>
              </section>
            )}
          </div>
          {totalReminders > 0 && (
            <section className="border-t border-slate-100 pt-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Scheduled by your tracker</p>
              <ul className="space-y-2">
                {reminders.followUps.map((app) => <ReminderRow key={app._id} label={`Follow up with ${app.company}`} tone="slate" />)}
                {reminders.interviews.map((interview) => <ReminderRow key={interview._id} label={`Interview: ${interview.round}`} tone="slate" />)}
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
        <p className="text-2xl font-semibold tracking-tight text-slate-900">Follow-up reminders</p>
        <p className="mt-0.5 text-xs text-slate-500">Stay on top of the next step</p>
      </div>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><BellRing className="h-4 w-4" /></span>
      {typeof count === "number" && count > 0 && <span className="sr-only">{count} reminders</span>}
    </div>
  );
}

function ReminderRow({ label, tone }: { label: string; tone: "rose" | "amber" | "blue" | "slate" }) {
  const tones = {
    rose: "bg-rose-50 text-rose-600",
    amber: "bg-amber-50 text-amber-600",
    blue: "bg-blue-50 text-blue-600",
    slate: "bg-slate-100 text-slate-600",
  };

  return <li className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700"><span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${tones[tone]}`}><CalendarClock className="h-3.5 w-3.5" /></span><span className="min-w-0 flex-1 truncate">{label}</span><ChevronRight className="h-4 w-4 text-slate-300" /></li>;
}
