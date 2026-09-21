"use client";

import { Recruiter } from "@/types/recruiter";

interface Props {
  recruiters: Recruiter[];
}

export default function RecruiterReminderPanel({ recruiters }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const overdue = recruiters.filter((recruiter) => {
    if (!recruiter.nextFollowUp) {
      return false;
    }

    const date = new Date(recruiter.nextFollowUp);
    date.setHours(0, 0, 0, 0);

    return date.getTime() < today.getTime();
  });

  const todayList = recruiters.filter((recruiter) => {
    if (!recruiter.nextFollowUp) {
      return false;
    }

    const date = new Date(recruiter.nextFollowUp);
    date.setHours(0, 0, 0, 0);

    return date.getTime() === today.getTime();
  });

  const tomorrowList = recruiters.filter((recruiter) => {
    if (!recruiter.nextFollowUp) {
      return false;
    }

    const date = new Date(recruiter.nextFollowUp);
    date.setHours(0, 0, 0, 0);

    return date.getTime() === tomorrow.getTime();
  });

  const upcoming = recruiters
    .filter((recruiter) => {
      if (!recruiter.nextFollowUp) {
        return false;
      }

      const date = new Date(recruiter.nextFollowUp);
      date.setHours(0, 0, 0, 0);

      return date.getTime() > tomorrow.getTime();
    })
    .sort(
      (a, b) =>
        new Date(a.nextFollowUp!).getTime() -
        new Date(b.nextFollowUp!).getTime(),
    );

  const ReminderSection = ({
    title,
    recruiters,
    color,
  }: {
    title: string;
    recruiters: Recruiter[];
    color: string;
  }) => (
    <div className="mb-8 last:mb-0">
      <div className="mb-4 flex items-center gap-2.5">
        <div className={`h-2.5 w-2.5 rounded-full ${color}`} />

        <h3 className="text-sm font-bold tracking-tight text-slate-900 sm:text-base">
          {title}
        </h3>
      </div>

      {recruiters.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-4 py-5">
          <p className="text-xs font-medium text-slate-400">
            No recruiters.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {recruiters.map((recruiter) => (
            <div
              key={recruiter._id}
              className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h4 className="truncate text-sm font-bold text-slate-900">
                    {recruiter.name}
                  </h4>

                  <div className="mt-2 space-y-1">
                    <p className="truncate text-xs text-slate-500">
                      {recruiter.email || "No Email"}
                    </p>

                    <p className="text-xs text-slate-500">
                      {recruiter.phone || "No Phone"}
                    </p>
                  </div>
                </div>

                <div className="w-fit shrink-0 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Follow-up
                  </p>

                  <p className="mt-0.5 text-xs font-semibold text-slate-700">
                    {recruiter.nextFollowUp
                      ? new Date(
                          recruiter.nextFollowUp,
                        ).toLocaleDateString("en-GB")
                      : "Not Set"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Recruiter Reminder Center
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
            Stay on top of recruiter follow-ups and scheduled conversations.
          </p>
        </div>

        <div className="w-fit rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600">
          Follow-up Overview
        </div>
      </div>

      {/* Summary */}
      <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
          <h3 className="text-xs font-semibold text-rose-600">
            Overdue
          </h3>

          <p className="mt-2 text-2xl font-bold tracking-tight text-rose-700 sm:text-3xl">
            {overdue.length}
          </p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
          <h3 className="text-xs font-semibold text-amber-600">
            Today
          </h3>

          <p className="mt-2 text-2xl font-bold tracking-tight text-amber-700 sm:text-3xl">
            {todayList.length}
          </p>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
          <h3 className="text-xs font-semibold text-blue-600">
            Tomorrow
          </h3>

          <p className="mt-2 text-2xl font-bold tracking-tight text-blue-700 sm:text-3xl">
            {tomorrowList.length}
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
          <h3 className="text-xs font-semibold text-emerald-600">
            Upcoming
          </h3>

          <p className="mt-2 text-2xl font-bold tracking-tight text-emerald-700 sm:text-3xl">
            {upcoming.length}
          </p>
        </div>
      </div>

      {/* Reminder Sections */}
      <ReminderSection
        title="🔴 Overdue"
        recruiters={overdue}
        color="bg-rose-500"
      />

      <ReminderSection
        title="🟡 Today"
        recruiters={todayList}
        color="bg-amber-500"
      />

      <ReminderSection
        title="🔵 Tomorrow"
        recruiters={tomorrowList}
        color="bg-blue-500"
      />

      <ReminderSection
        title="🟢 Upcoming"
        recruiters={upcoming}
        color="bg-emerald-500"
      />
    </div>
  );
}