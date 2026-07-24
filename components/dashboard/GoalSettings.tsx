"use client";
import { Goal } from "@/types/goal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface GoalSettingsProps {
  goal: Goal;
  onGoalUpdated: (goal: Goal) => void;
}
export default function GoalSettings({ goal, onGoalUpdated }: GoalSettingsProps) {
  const [applicationGoal, setApplicationGoal] = useState(goal.applicationGoal);

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

    if(applicationGoal<=0 || interviewGoal <=0 || offerGoal <=0){
      toast.error("Goals must be greater than zero")
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
    } finally{
      setLoading(false);
    }
  };
  return (
    <div className="border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">Goal Settings</h2>

      <div className="space-y-4">
        <label htmlFor="applicationGoal">Application Goal :</label>
        <input id="applicationGoal"
          type="number"
          value={applicationGoal}
          min={1}
          onChange={(e) => setApplicationGoal(Number(e.target.value))}
          className="border p-2 rounded w-full"
          placeholder="Application Goal"
        />

        <label>Interview Goal :</label>

        <input
          type="number"
          value={interviewGoal}
          min={1}
          onChange={(e) => setInterviewGoal(Number(e.target.value))}
          className="border p-2 rounded w-full"
          placeholder="Interview Goal"
        />

        <label>Offer Goal :</label>

        <input
          type="number"
          value={offerGoal}
          min={1}
          onChange={(e) => setOfferGoal(Number(e.target.value))}
          className="border p-2 rounded w-full"
          placeholder="Offer Goal"
        />

        <button
          onClick={saveGoals}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded">
          {loading ? "Saving..." : "Save Goals"}
        </button>
      </div>
    </div>
  );
}
