"use client";

import { Recruiter } from "@/types/recruiter";
import { useState } from "react";
import toast from "react-hot-toast";
import RecruiterStatusBadge from "./RecruiterStatusBadge";
import CommunicationForm from "./CommunicationForm";
import CommunicationList from "./CommunicationList";
import EmailTemplates from "./EmailTemplates";

interface Props {
  recruiter: Recruiter;
  company:string;
  onDelete: () => void;
  onUpdated: () => void;
}

export default function RecruiterCard({
  recruiter,
  company,
  onDelete,
  onUpdated,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(recruiter.name);
  const [email, setEmail] = useState(recruiter.email || "");
  const [phone, setPhone] = useState(recruiter.phone || "");
  const [linkedin, setLinkedin] = useState(recruiter.linkedin || "");
  const [notes, setNotes] = useState(recruiter.notes || "");
  const [loading, setLoading] = useState(false);

  const [lastContact, setLastContact] = useState(
    recruiter.lastContact ? recruiter.lastContact.split("T")[0] : "",
  );

  const [nextFollowUp, setNextFollowUp] = useState(
    recruiter.nextFollowUp ? recruiter.nextFollowUp.split("T")[0] : "",
  );

  const [contacting, setContacting] = useState(false);
  const [showCommunicationForm, setShowCommunicationForm] = useState(false);

  const saveChanges = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/recruiters/${recruiter._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          linkedin,
          notes,
          lastContact,
          nextFollowUp,
        }),
      });

      console.log("response is:", response);

      if (!response.ok) {
        throw new Error();
      }
      toast.success("Recruiter Updated");
      setEditing(false);
      onUpdated();
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const markContactedToday = async () => {
    try {
      setContacting(true);
      const response = await fetch(`/api/recruiters/${recruiter._id}/contact`, {
        method: "PATCH",
      });

      console.log("Response is:", response);

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Recruiter updated");

      onUpdated();
    } catch (error) {
      console.error(error);

      toast.error("Update failed");
    } finally {
      setContacting(false);
    }
  };

  return (
    <div className="border rounded-lg p-5 bg-white shadow-sm">
      {editing ? (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
      ) : (
        <h2 className="text-lg font-semibold mb-4">{recruiter.name}</h2>
      )}

      <RecruiterStatusBadge nextFollowUp={recruiter.nextFollowUp} />

      <div className="space-y-2">
        <div className="space-y-1">
          <strong>Email</strong>

          {editing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded w-full"
            />
          ) : (
            <p>{recruiter.email || "No email"}</p>
          )}
        </div>

        <div className="space-y-1">
          <strong>Phone</strong>

          {editing ? (
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2 rounded w-full"
            />
          ) : (
            <p>{recruiter.phone || "No phone number"}</p>
          )}
        </div>

        <div className="space-y-1">
          <strong>LinkedIn :</strong>

          {editing ? (
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="border p-2 rounded w-full"
            />
          ) : recruiter.linkedin ? (
            <a
              href={recruiter.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Profile
            </a>
          ) : (
            <p>No LinkedIn profile</p>
          )}
        </div>

        <div className="space-y-1">
          <strong>Last Contact</strong>

          {editing ? (
            <input
              type="date"
              value={lastContact}
              onChange={(e) => setLastContact(e.target.value)}
              className="border p-2 rounded w-full"
            />
          ) : (
            <p>
              {recruiter.lastContact
                ? new Date(recruiter.lastContact).toLocaleDateString("en-GB")
                : "Not set"}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <strong>Next Follow-up</strong>

          {editing ? (
            <input
              type="date"
              value={nextFollowUp}
              onChange={(e) => setNextFollowUp(e.target.value)}
              className="border p-2 rounded w-full"
            />
          ) : (
            <p>
              {recruiter.nextFollowUp
                ? new Date(recruiter.nextFollowUp).toLocaleDateString("en-GB")
                : "Not set"}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <strong>Notes</strong>

          {editing ? (
            <textarea
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border p-2 rounded w-full"
            />
          ) : (
            <p className="whitespace-pre-wrap text-gray-700">
              {recruiter.notes || "No notes"}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-5">
        {!editing && (
          <button
            onClick={markContactedToday}
            disabled={contacting}
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {contacting ? "Updating..." : "Contacted Today"}
          </button>
        )}
        {editing ? (
          <>
            <button
              onClick={saveChanges}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded"
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
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => setShowCommunicationForm(!showCommunicationForm)}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          {showCommunicationForm ? "Cancel Communication" : "Add Communication"}
        </button>

        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>

      {showCommunicationForm && (
        <CommunicationForm
          recruiterId={recruiter._id}
          applicationId={recruiter.applicationId}
          onSuccess={() => {
            setShowCommunicationForm(false);
            onUpdated();
          }}
        />

      )}
      <CommunicationList recruiterId={recruiter._id}/>
      <EmailTemplates recruiterName={recruiter.name ||"Recruiter"} company={company}/>
    </div>
  );
}
