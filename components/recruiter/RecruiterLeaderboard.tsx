"use client";

import { Recruiter } from "@/types/recruiter";
import { RecruiterCommunication } from "@/types/recruiterCommunication";

interface Props {
  recruiters: Recruiter[];
  communications: RecruiterCommunication[];
}

interface LeaderboardRecruiter {
  recruiter: Recruiter;
  score: number;
  communications: number;
  positive: number;
  neutral: number;
  rejected: number;
  completedFollowUps: number;
}

export default function RecruiterLeaderboard({
  recruiters,
  communications,
}: Props) {
  const leaderboard: LeaderboardRecruiter[] = recruiters
    .map((recruiter) => {
      const recruiterCommunications = communications.filter(
        (communication) =>
          communication.recruiterId === recruiter._id,
      );

      const positive = recruiterCommunications.filter(
        (communication) =>
          communication.responseType === "Positive",
      ).length;

      const neutral = recruiterCommunications.filter(
        (communication) =>
          communication.responseType === "Neutral",
      ).length;

      const rejected = recruiterCommunications.filter(
        (communication) =>
          communication.responseType === "Rejected",
      ).length;

      const completedFollowUps =
        recruiter.lastContact &&
        recruiter.nextFollowUp &&
        new Date(recruiter.lastContact) >=
          new Date(recruiter.nextFollowUp)
          ? 1
          : 0;

      const score =
        positive * 40 +
        neutral * 20 +
        rejected * 10 +
        recruiterCommunications.length * 5 +
        completedFollowUps * 5;

      return {
        recruiter,
        score,
        communications:
          recruiterCommunications.length,
        positive,
        neutral,
        rejected,
        completedFollowUps,
      };
    })
    .sort((a, b) => b.score - a.score);

  const medal = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";

    return `${index + 1}.`;
  };

  const stars = (score: number) => {
    if (score >= 90) return "⭐⭐⭐⭐⭐";
    if (score >= 70) return "⭐⭐⭐⭐";
    if (score >= 50) return "⭐⭐⭐";
    if (score >= 30) return "⭐⭐";

    return "⭐";
  };

  const progressColor = (score: number) => {
    if (score >= 90) return "bg-green-500";

    if (score >= 70) return "bg-blue-500";

    if (score >= 50) return "bg-yellow-500";

    return "bg-gray-500";
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Recruiter Leaderboard
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
            Compare recruiter engagement and response activity.
          </p>
        </div>

        <div className="hidden rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-600 sm:block">
          🏆 Performance
        </div>
      </div>

      {leaderboard.length === 0 ? (
        <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg">
              👥
            </div>

            <p className="text-sm font-semibold text-slate-700">
              No recruiters yet
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Add recruiters to start building your leaderboard.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {leaderboard.map((item, index) => (
            <div
              key={item.recruiter._id}
              className="group rounded-3xl border border-slate-200 bg-slate-50/60 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-sm sm:p-6"
            >
              {/* Recruiter Header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  {/* Rank */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-600 shadow-sm">
                    {medal(index)}
                  </div>

                  {/* Avatar */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm">
                    {(item.recruiter.name ?? "Unknnown")
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  {/* Name + Stars */}
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold text-slate-900 sm:text-base">
                      {item.recruiter.name}
                    </h3>

                    <p className="mt-1 text-xs tracking-wide text-slate-500">
                      {stars(item.score)}
                    </p>
                  </div>
                </div>

                {/* Score */}
                <div className="flex items-center justify-between gap-3 sm:block sm:text-right">
                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Score
                    </p>

                    <p className="text-2xl font-bold tracking-tight text-slate-900">
                      {item.score}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    Performance
                  </span>

                  <span className="text-xs font-bold text-slate-600">
                    {Math.min(item.score, 100)}%
                  </span>
                </div>

                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full ${progressColor(
                      item.score,
                    )} transition-all duration-500`}
                    style={{
                      width: `${Math.min(
                        item.score,
                        100,
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
                <Stat
                  label="Communications"
                  value={item.communications}
                />

                <Stat
                  label="Positive"
                  value={item.positive}
                  valueColor="text-emerald-600"
                />

                <Stat
                  label="Neutral"
                  value={item.neutral}
                  valueColor="text-amber-600"
                />

                <Stat
                  label="Rejected"
                  value={item.rejected}
                  valueColor="text-rose-600"
                />

                <Stat
                  label="Follow-ups"
                  value={item.completedFollowUps}
                  valueColor="text-indigo-600"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface StatProps {
  label: string;
  value: number;
  valueColor?: string;
}

function Stat({
  label,
  value,
  valueColor = "text-slate-900",
}: StatProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center transition-all duration-200 hover:border-slate-300 hover:shadow-sm sm:p-4">
      <p className="text-[11px] font-semibold text-slate-400 sm:text-xs">
        {label}
      </p>

      <p
        className={`mt-1 text-xl font-bold tracking-tight sm:text-2xl ${valueColor}`}
      >
        {value}
      </p>
    </div>
  );
}