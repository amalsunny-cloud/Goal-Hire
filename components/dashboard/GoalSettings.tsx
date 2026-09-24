"use client";

import { Goal } from "@/types/goal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface GoalSettingsProps {
  goal: Goal;
  onGoalUpdated: (goal: Goal) => void;
}

export default function GoalSettings({
  goal,
  onGoalUpdated,
}: GoalSettingsProps) {
  const [applicationGoal, setApplicationGoal] = useState(
    goal.applicationGoal
  );

  const [interviewGoal, setInterviewGoal] = useState(goal.interviewGoal);

  const [offerGoal, setOfferGoal] = useState(goal.offerGoal);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setApplicationGoal(goal.applicationGoal);
    setInterviewGoal(goal.interviewGoal);
    setOfferGoal(goal.offerGoal);
  }, [goal]);

  const saveGoals = async () => {
    setLoading(true);

    if (applicationGoal <= 0 || interviewGoal <= 0 || offerGoal <= 0) {
      toast.error("Goals must be greater than zero");
      return;
    }

    try {
      const response = await fetch("/api/goals", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationGoal,
          interviewGoal,
          offerGoal,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      const updatedGoal = await response.json();

      onGoalUpdated(updatedGoal);

      toast.success("Goal Updated");
    } catch (error) {
      console.error(error);

      toast.error("Failed to update goals");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Header */}
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Goal Settings
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Set your monthly application, interview, and offer targets
          </p>
        </div>

        {/* Icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50">
          <span className="text-lg">🎯</span>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-5">
        {/* Application Goal */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 focus-within:border-blue-200 focus-within:bg-white focus-within:shadow-sm">
          <label
            htmlFor="applicationGoal"
            className="mb-3 flex items-center gap-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-sm">
              📄
            </span>

            <span>
              <span className="block text-sm font-semibold text-slate-800">
                Application Goal
              </span>

              <span className="block text-xs text-slate-400">
                Target applications per month
              </span>
            </span>
          </label>

          <input
            id="applicationGoal"
            type="number"
            value={applicationGoal}
            min={1}
            onChange={(e) => setApplicationGoal(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
            placeholder="Application Goal"
          />
        </div>

        {/* Interview Goal */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 focus-within:border-amber-200 focus-within:bg-white focus-within:shadow-sm">
          <label className="mb-3 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-sm">
              💼
            </span>

            <span>
              <span className="block text-sm font-semibold text-slate-800">
                Interview Goal
              </span>

              <span className="block text-xs text-slate-400">
                Target interviews per month
              </span>
            </span>
          </label>

          <input
            type="number"
            value={interviewGoal}
            min={1}
            onChange={(e) => setInterviewGoal(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10"
            placeholder="Interview Goal"
          />
        </div>

        {/* Offer Goal */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-200 focus-within:border-emerald-200 focus-within:bg-white focus-within:shadow-sm">
          <label className="mb-3 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-sm">
              🎉
            </span>

            <span>
              <span className="block text-sm font-semibold text-slate-800">
                Offer Goal
              </span>

              <span className="block text-xs text-slate-400">
                Target offers per month
              </span>
            </span>
          </label>

          <input
            type="number"
            value={offerGoal}
            min={1}
            onChange={(e) => setOfferGoal(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10"
            placeholder="Offer Goal"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={saveGoals}
          disabled={loading}
          className="mt-2 flex w-full items-center justify-center rounded-xl cursor-pointer bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-slate-900 disabled:hover:shadow-sm"
        >
          {loading ? "Saving..." : "Save Goals"}
        </button>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4">
        <span className="h-2 w-2 rounded-full bg-indigo-500" />

        <p className="text-xs text-slate-500">
          Your updated goals will be reflected across your dashboard.
        </p>
      </div>
    </div>
  );
}