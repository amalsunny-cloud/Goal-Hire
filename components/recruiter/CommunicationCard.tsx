"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  RecruiterCommunication,
  CommunicationType,
} from "@/types/recruiterCommunication";

interface Props {
  communication: RecruiterCommunication;
  onUpdated: () => void;
  onDelete: () => void;
}

export default function CommunicationCard({
  communication,
  onUpdated,
  onDelete,
}: Props) {
  const [editing, setEditing] = useState(false);

  const [type, setType] = useState<CommunicationType>(communication.type);

  const [date, setDate] = useState(
    communication.date ? communication.date.split("T")[0] : "",
  );

  const [subject, setSubject] = useState(communication.subject);

  const [message, setMessage] = useState(communication.message);

  const [loading, setLoading] = useState(false);

  const saveChanges = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/recruiter-communications/${communication._id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            type,
            date,
            subject,
            message,
          }),
        },
      );

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Communication updated");

      setEditing(false);

      onUpdated();
    } catch (error) {
      console.error(error);

      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-5 bg-gray-50 shadow-sm">
      {editing ? (
        <>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as CommunicationType)}
            className="border p-2 rounded w-full mb-3"
          >
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
            className="border p-2 rounded w-full mb-3"
          />

          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border p-2 rounded w-full mb-3"
          />

          <textarea
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <span
              className={`
    px-3
    py-1
    rounded-full
    text-sm
    font-medium
    ${
      communication.type === "Email"
        ? "bg-blue-100 text-blue-700"
        : communication.type === "Phone"
          ? "bg-green-100 text-green-700"
          : communication.type === "LinkedIn"
            ? "bg-cyan-100 text-cyan-700"
            : communication.type === "Meeting"
              ? "bg-purple-100 text-purple-700"
              : communication.type === "WhatsApp"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-gray-100 text-gray-700"
    }
  `}
            >
              {communication.type}
            </span>

            <span className="text-gray-500 text-sm">
              {new Date(communication.date).toLocaleDateString("en-GB")}
            </span>
          </div>

          <h3 className="font-semibold mt-4">{communication.subject}</h3>

          <p className="mt-2 whitespace-pre-wrap text-gray-700">
            {communication.message}
          </p>
        </>
      )}

      <div className="flex gap-3 mt-5">
        {editing ? (
          <>
            <button
              onClick={saveChanges}
              disabled={loading}
              className="
                bg-green-600
                text-white
                px-4
                py-2
                rounded
              "
            >
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => setEditing(false)}
              className="
                bg-gray-500
                text-white
                px-4
                py-2
                rounded
              "
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="
              bg-blue-600
              text-white
              px-4
              py-2
              rounded
            "
          >
            Edit
          </button>
        )}

        <button
          onClick={onDelete}
          className="
            bg-red-600
            text-white
            px-4
            py-2
            rounded
          "
        >
          Delete
        </button>
      </div>
    </div>
  );
}
