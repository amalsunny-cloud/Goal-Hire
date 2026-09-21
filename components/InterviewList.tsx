"use client";

import { useRouter } from "next/navigation";
import DeleteModal from "./modals/DeleteModal";
import { useState } from "react";
import toast from "react-hot-toast";

interface Interview {
  _id: string;
  applicationId: string;
  round: string;
  date?: string;
  outcome: "Pending" | "Passed" | "Failed";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface InterviewListProps {
  interviews: Interview[];
}

export default function InterviewList({ interviews }: InterviewListProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const deleteInterview = async () => {
    // const confirmed = window.confirm("Delete this interview?");
    // if (!confirmed) {
    //   return;
    // }

    if (!selectedId) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/interviews/${selectedId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        toast.error("Failed to delete the interview");
        throw new Error("Failed to delete interview");
      }

      toast.success("Interview deleted");

      setTimeout(() => {
        router.refresh();
      }, 2000);

      setShowModal(false);

      setSelectedId(null);
    } catch (error) {
      console.error("Delete Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (interviews.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/70 p-6 sm:p-7">
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
            <span className="text-lg">✓</span>
          </div>

          <h2 className="text-base font-bold tracking-tight text-slate-900">
            No Interviews Yet
          </h2>

          <p className="mt-1.5 max-w-sm text-sm leading-6 text-slate-500">
            Add your first interview round above to start tracking your
            interview progress.
          </p>
        </div>
      </div>
    );
  }

  const updateOutcome = async (interviewId: string, outcome: string) => {
    try {
      const response = await fetch(`/api/interviews/${interviewId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          outcome,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to update outcome");

        throw new Error("Failed to update outcome");
      }

      toast.success("Outcome updated");

      setTimeout(() => {
        router.refresh();
      }, 2000);
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  return (
    <div className="space-y-5">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Interviews
          </h2>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Track your interview rounds and outcomes.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm">
          {interviews.length}{" "}
          {interviews.length === 1 ? "Interview" : "Interviews"}
        </div>
      </div>

      {/* Interview Cards */}
      <div className="space-y-4">
        {interviews.map((interview) => (
          <div
            key={interview._id}
            className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:p-6"
          >
            {/* Card Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
                  <span className="text-sm font-bold">#</span>
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-base font-bold text-slate-900">
                    {interview.round}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Interview round
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedId(interview._id);
                  setShowModal(true);
                }}
                className="inline-flex w-full cursor-pointer items-center justify-center rounded-xl border border-rose-100 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-600 transition-all duration-200 hover:border-rose-200 hover:bg-rose-100 sm:w-auto"
              >
                Delete
              </button>
            </div>

            {/* Details */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Date */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Date
                </p>

                <p className="mt-1.5 text-sm font-semibold text-slate-700">
                  {interview.date
                    ? new Date(interview.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "Not Set"}
                </p>
              </div>

              {/* Notes */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Notes
                </p>

                <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-slate-600">
                  {interview.notes || "No notes"}
                </p>
              </div>
            </div>

            {/* Outcome */}
            <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <label className="text-xs font-semibold text-slate-700">
                  Outcome
                </label>

                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                    interview.outcome === "Passed"
                      ? "bg-emerald-100 text-emerald-700"
                      : interview.outcome === "Failed"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {interview.outcome}
                </span>
              </div>

              <select
                value={interview.outcome}
                onChange={(e) =>
                  updateOutcome(interview._id, e.target.value)
                }
                className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="Pending">Pending</option>
                <option value="Passed">Passed</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <DeleteModal
        isOpen={showModal}
        title="Delete Interview"
        message="Are you sure you want to delete this interview?"
        onConfirm={deleteInterview}
        onCancel={() => {
          setShowModal(false);
          setSelectedId(null);
        }}
        loading={loading}
      />
    </div>
  );
}