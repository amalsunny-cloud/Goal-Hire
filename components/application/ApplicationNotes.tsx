"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FileText, Pencil, X } from "lucide-react";

interface ApplicationNotesProps {
  applicationId: string;
  initialNotes: string;
}

export default function ApplicationNotes({
  applicationId,
  initialNotes,
}: ApplicationNotesProps) {
  const [notes, setNotes] = useState(initialNotes);

  const [editing, setEditing] = useState(false);

  const [loading, setLoading] = useState(false);

  const saveNotes = async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          notes,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Notes saved");
      setEditing(false);
    } catch {
      toast.error("Failed to save notes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
            <FileText className="h-4.5 w-4.5" />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-bold tracking-tight text-slate-900 sm:text-base">
              Notes
            </h2>

            <p className="mt-0.5 text-xs leading-5 text-slate-500">
              Keep key details and next steps in one place.
            </p>
          </div>
        </div>

        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit notes
          </button>
        )}
      </div>

      {editing ? (
        <>
          {/* Editor */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-2">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              autoFocus
              className="min-h-36 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
              placeholder="Add an observation, a follow-up, or interview feedback..."
              aria-label="Application notes"
            />
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              onClick={saveNotes}
              disabled={loading}
              className="cursor-pointer rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => setEditing(false)}
              className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading}
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Notes display */}
          <p
            className={`whitespace-pre-wrap rounded-2xl border px-4 py-4 text-sm leading-6 ${
              notes
                ? "border-slate-100 bg-slate-50/70 text-slate-700"
                : "border-dashed border-slate-200 bg-slate-50/50 text-slate-400"
            }`}
          >
            {notes ||
              "No notes added yet. Use this space for useful context and follow-ups."}
          </p>
        </>
      )}
    </div>
  );
}