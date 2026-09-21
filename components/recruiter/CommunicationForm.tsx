"use client";

import { CommunicationType } from "@/types/recruiterCommunication";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  recruiterId: string;
  applicationId: string;
  onSuccess: () => void;
}

export default function CommunicationForm({
  recruiterId,
  applicationId,
  onSuccess,
}: Props) {
  const [type, setType] = useState<CommunicationType>("Email");
  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const saveCommunication = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log(
        "applicationId etc:",
        applicationId,
        recruiterId,
        type,
        date,
        subject,
        message,
      );

      const response = await fetch("/api/recruiter-communications", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          recruiterId,
          applicationId,
          type,
          date,
          subject,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Communication added");

      setType("Email");
      setDate("");
      setSubject("");
      setMessage("");

      onSuccess();
    } catch (error) {
      console.error(error);

      toast.error("Failed to add communication");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={saveCommunication}
      className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      {/* Header */}
      <div className="flex items-start gap-3 border-b border-slate-100 pb-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
          <span className="text-lg">💬</span>
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Add Communication
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
            Record a communication with this recruiter.
          </p>
        </div>
      </div>

      {/* Communication Type */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Communication Type
        </label>

        <select
          value={type}
          onChange={(e) => setType(e.target.value as CommunicationType)}
          className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
        >
          <option value="Email">Email</option>

          <option value="Phone">Phone</option>

          <option value="LinkedIn">LinkedIn</option>

          <option value="WhatsApp">WhatsApp</option>

          <option value="Meeting">Meeting</option>

          <option value="Other">Other</option>
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Date
        </label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
        />
      </div>

      {/* Subject */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Subject
        </label>

        <input
          type="text"
          placeholder="e.g. Follow-up regarding application"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
        />
      </div>

      {/* Message */}
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Message
        </label>

        <textarea
          rows={5}
          placeholder="Write a brief summary of the communication..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm leading-6 text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
        />
      </div>

      {/* Footer / Submit */}
      <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-slate-400">
          Keep your communication history organized for easier follow-ups.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Saving...
            </>
          ) : (
            <>
              <span>＋</span>
              Save Communication
            </>
          )}
        </button>
      </div>
    </form>
  );
}