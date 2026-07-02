"use client";

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
  const [type, setType] = useState("Email");
  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const saveCommunication = async (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("applicationId etc:",applicationId,recruiterId,type,date,subject,message);
      
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
      className="
        border
        rounded-lg
        p-6
        space-y-4
      "
    >
      <h2
        className="
          text-xl
          font-semibold
        "
      >
        Add Communication
      </h2>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="
          border
          p-2
          rounded
          w-full
        "
      >
        <option>Email</option>

        <option>Phone</option>

        <option>LinkedIn</option>

        <option>WhatsApp</option>

        <option>Meeting</option>

        <option>Other</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="
          border
          p-2
          rounded
          w-full
        "
      />

      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="
          border
          p-2
          rounded
          w-full
        "
      />

      <textarea
        rows={5}
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="
          border
          p-2
          rounded
          w-full
        "
      />

      <button
        type="submit"
        disabled={loading}
        className="
          bg-black
          text-white
          px-4
          py-2
          rounded
          disabled:opacity-50
        "
      >
        {loading ? "Saving..." : "Save Communication"}
      </button>
    </form>
  );
}
