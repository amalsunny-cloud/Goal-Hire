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
    <div className="rounded-xl">
      <div className="my-5 pt-4 px-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-2 text-blue-600">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-start font-bold text-slate-900">Notes</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Keep key details and next steps in one place.
            </p>
          </div>
        </div>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-black hover:bg-gray-700 px-3 py-2 text-xs font-semibold text-white shadow-sm transition cursor-pointer hover:border-slate-300 "
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit notes
          </button>
        )}
      </div>

      {editing ? (
        <>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={6}
            autoFocus
            className="min-h-36 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
            placeholder="Add an observation, a follow-up, or interview feedback..."
            aria-label="Application notes"
          />

          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={saveNotes}
              disabled={loading}
              className="rounded-lg bg-black hover:bg-gray-700 px-4 py-2 text-sm font-semibold text-white shadow-sm cursor-pointer transitiondisabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => setEditing(false)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-red-600 px-4 py-2 text-sm cursor-pointer font-semibold text-white transition hover:bg-red-500/90 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading}
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p
            className={`whitespace-pre-wrap rounded-xl border px-4 py-3 text-sm leading-6 ${notes ? "border-slate-100 bg-slate-50/70 text-slate-700" : "border-dashed border-slate-200 bg-slate-50/50 text-slate-400"}`}
          >
            {notes ||
              "No notes added yet. Use this space for useful context and follow-ups."}
          </p>
        </>
      )}
    </div>
  );
}
