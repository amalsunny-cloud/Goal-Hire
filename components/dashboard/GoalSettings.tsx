"use client";
import { Goal } from "@/types/goal";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  goal: Goal;
  onGoalUpdated: (goal: Goal) => void;
}
export default function GoalSettings({ goal, onGoalUpdated }: Props) {
  const [applicationGoal, setApplicationGoal] = useState(goal.applicationGoal);

  const [interviewGoal, setInterviewGoal] = useState(goal.interviewGoal);

  const [offerGoal, setOfferGoal] = useState(goal.offerGoal);

  const saveGoals = async () => {
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
    }
  };
  return (
    <div className="border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">Goal Settings</h2>

      <div className="space-y-4">
        <label>Application Goal :</label>
        <input
          type="number"
          value={applicationGoal}
          onChange={(e) => setApplicationGoal(Number(e.target.value))}
          className="border p-2 rounded w-full"
          placeholder="Application Goal"
        />

        <label>Interview Goal :</label>

        <input
          type="number"
          value={interviewGoal}
          onChange={(e) => setInterviewGoal(Number(e.target.value))}
          className="border p-2 rounded w-full"
          placeholder="Interview Goal"
        />

        <label>Offer Goal :</label>

        <input
          type="number"
          value={offerGoal}
          onChange={(e) => setOfferGoal(Number(e.target.value))}
          className="border p-2 rounded w-full"
          placeholder="Offer Goal"
        />

        <button
          onClick={saveGoals}
          className="
            bg-black
            text-white
            px-4
            py-2
            rounded
          "
        >
          Save Goals
        </button>
      </div>
    </div>
  );
}
