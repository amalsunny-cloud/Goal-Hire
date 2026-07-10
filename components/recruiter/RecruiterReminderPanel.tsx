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
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${color}`} />

        <h3 className="text-lg font-semibold">
          {title} ({recruiters.length})
        </h3>
      </div>

      {recruiters.length === 0 ? (
        <p className="text-gray-500">No recruiters.</p>
      ) : (
        <div className="space-y-3">
          {recruiters.map((recruiter) => (
            <div
              key={recruiter._id}
              className="
                border
                rounded-lg
                p-4
                bg-gray-50
              "
            >
              <h4 className="font-semibold">{recruiter.name}</h4>

              <p className="text-gray-600">{recruiter.email || "No Email"}</p>

              <p className="text-gray-600">{recruiter.phone || "No Phone"}</p>

              <p className="text-sm text-gray-500 mt-1">
                Follow-up:{" "}
                {recruiter.nextFollowUp
                  ? new Date(recruiter.nextFollowUp).toLocaleDateString("en-GB")
                  : "Not Set"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Recruiter Reminder Center</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="border rounded-lg p-4 text-center bg-red-50">
          <h3 className="text-red-600 font-semibold">Overdue</h3>

          <p className="text-3xl font-bold">{overdue.length}</p>
        </div>

        <div className="border rounded-lg p-4 text-center bg-yellow-50">
          <h3 className="text-yellow-600 font-semibold">Today</h3>

          <p className="text-3xl font-bold">{todayList.length}</p>
        </div>

        <div className="border rounded-lg p-4 text-center bg-blue-50">
          <h3 className="text-blue-600 font-semibold">Tomorrow</h3>

          <p className="text-3xl font-bold">{tomorrowList.length}</p>
        </div>

        <div className="border rounded-lg p-4 text-center bg-green-50">
          <h3 className="text-green-600 font-semibold">Upcoming</h3>

          <p className="text-3xl font-bold">{upcoming.length}</p>
        </div>
      </div>

      <ReminderSection
        title="🔴 Overdue"
        recruiters={overdue}
        color="bg-red-500"
      />

      <ReminderSection
        title="🟡 Today"
        recruiters={todayList}
        color="bg-yellow-500"
      />

      <ReminderSection
        title="🔵 Tomorrow"
        recruiters={tomorrowList}
        color="bg-blue-500"
      />

      <ReminderSection
        title="🟢 Upcoming"
        recruiters={upcoming}
        color="bg-green-500"
      />
    </div>
  );
}
