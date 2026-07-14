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
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-6">
        Recruiter Leaderboard
      </h2>

      {leaderboard.length === 0 ? (
        <p className="text-gray-500">
          No recruiters yet.
        </p>
      ) : (
        <div className="space-y-5">
          {leaderboard.map((item, index) => (
            <div
              key={item.recruiter._id}
              className="border rounded-lg p-5 bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">
                    {medal(index)}
                  </div>

                  <div
                    className="
                      w-12
                      h-12
                      rounded-full
                      bg-blue-600
                      text-white
                      flex
                      items-center
                      justify-center
                      font-bold
                    "
                  >
                    {(item.recruiter.name ?? "Unknnown")
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {item.recruiter.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {stars(item.score)}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-xl">
                    {item.score}
                  </p>

                  <p className="text-sm text-gray-500">
                    Score
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="w-full h-3 rounded bg-gray-200 overflow-hidden">
                  <div
                    className={`h-full ${progressColor(
                      item.score,
                    )}`}
                    style={{
                      width: `${Math.min(
                        item.score,
                        100,
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-5 text-center">
                <Stat
                  label="Communications"
                  value={item.communications}
                />

                <Stat
                  label="Positive"
                  value={item.positive}
                />

                <Stat
                  label="Neutral"
                  value={item.neutral}
                />

                <Stat
                  label="Rejected"
                  value={item.rejected}
                />

                <Stat
                  label="Follow-ups"
                  value={item.completedFollowUps}
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
}

function Stat({
  label,
  value,
}: StatProps) {
  return (
    <div className="border rounded p-3 bg-white">
      <p className="text-gray-500 text-sm">
        {label}
      </p>

      <p className="text-2xl font-bold mt-1">
        {value}
      </p>
    </div>
  );
}