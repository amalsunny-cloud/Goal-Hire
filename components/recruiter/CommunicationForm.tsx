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
      className="shadow-md rounded-lg p-6 bg-slate-400/10 space-y-4">
      <h2 className="text-xl font-semibold">
        Add Communication
      </h2>

      <select
        value={type}
        onChange={(e) => setType(e.target.value as CommunicationType)}
        className="border-b p-2 w-full">
        <option value="Email">Email</option>

        <option value="Phone">Phone</option>

        <option value="LinkedIn">LinkedIn</option>

        <option value="WhatsApp">WhatsApp</option>

        <option value="Meeting">Meeting</option>

        <option value="Other">Other</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="
          pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all
          w-full
        "
      />

      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="
          pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all
          w-full
        "
      />

      <textarea
        rows={5}
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="
          pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all
          w-full
        "
      />

      <button
        type="submit"
        disabled={loading}
        className="
          bg-black
          hover:bg-slate-800
          text-white
          px-4
          py-2
          rounded
          disabled:opacity-50
          transition-colors
          w-full sm:w-auto cursor-pointer
        "
      >
        {loading ? "Saving..." : "Save Communication"}
      </button>
    </form>
  );
}
