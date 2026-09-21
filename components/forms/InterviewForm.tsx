"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface InterviewFormProps {
  applicationId: string;
}

export default function InterviewForm({
  applicationId,
}: InterviewFormProps) {
  const router = useRouter();
  const [round, setRound] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/interviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationId,
          round,
          date,
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("Failed to create interview");
        throw new Error(data.error || "Failed to create interview");
      }

      toast.success("Interview added");

      setTimeout(() => {
        router.refresh();
      }, 2000);

      setRound("");
      setDate("");
      setNotes("");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong"
      );

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 space-y-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      {/* Interview Round */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700">
          Interview Round
        </label>

        <input
          type="text"
          placeholder="Technical Round"
          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          value={round}
          onChange={(e) => setRound(e.target.value)}
          required
        />
      </div>

      {/* Interview Date */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700">
          Interview Date
        </label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
        />
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700">
          Interview Notes
        </label>

        <textarea
          placeholder="Interview notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          rows={4}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3">
          <p className="text-sm font-medium text-rose-600">
            {error}
          </p>
        </div>
      )}

      {/* Submit */}
      <div className="border-t border-slate-100 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {loading ? "Adding..." : "Add Interview"}
        </button>
      </div>
    </form>
  );
}