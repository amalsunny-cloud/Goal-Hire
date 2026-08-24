"use client";

import { Recruiter } from "@/types/recruiter";
import { useState } from "react";
import toast from "react-hot-toast";
import RecruiterStatusBadge from "./RecruiterStatusBadge";
import CommunicationForm from "./CommunicationForm";
import CommunicationList from "./CommunicationList";
import EmailTemplates from "./EmailTemplates";
import RecruiterTags from "./RecruiterTags";
import RecruiterTagSelector from "./RecruiterTagSelector";

interface Props {
  recruiter: Recruiter;
  company: string;
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
  const [tags, setTags] = useState<string[]>(recruiter.tags || []);
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
          tags,
          lastContact,
          nextFollowUp,
        }),
      });

      console.log("response is then:", response);
      console.log({
  name,
  email,
  phone,
  linkedin,
  notes,
  tags,
  lastContact,
  nextFollowUp,
});

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
    <div className="rounded-lg p-5 bg-white">
      {editing ? (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all w-full"
        />
      ) : (
        <h2 className="text-lg font-semibold mb-4">{recruiter.name}</h2>
      )}
      {editing ? (
        <RecruiterTagSelector selected={tags} onChange={setTags} />
      ) : (
        <RecruiterTags tags={recruiter.tags} />
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
              className="pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all w-full"
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
              className="pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all w-full"
            />
          ) : (
            <p>{recruiter.phone || "No phone number"}</p>
          )}
        </div>

        <div className="space-y-1">
          <strong>LinkedIn</strong>

          {editing ? (
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all w-full"
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
              className="pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all w-full"
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
              className="pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all w-full"
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
              className="border-b p-2 border-gray-500/30 w-full"
            />
          ) : (
            <p className="whitespace-pre-wrap text-gray-700">
              {recruiter.notes || "No notes"}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center flex-wrap gap-2.5 sm:gap-3 mt-5">
        {!editing && (
          <button
            onClick={markContactedToday}
            disabled={contacting}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors disabled:opacity-50"
          >
            {contacting ? "Updating..." : "Contacted Today"}
          </button>
        )}
        {editing ? (
          <>
            <button
              onClick={saveChanges}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
            >
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => setEditing(false)}
              className="
          bg-gray-500
          hover:bg-gray-600
          text-white
          px-4
          py-2
          rounded
          text-sm
          font-medium
          transition-colors
        "
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => setShowCommunicationForm(!showCommunicationForm)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          {showCommunicationForm ? "Cancel Communication" : "Add Communication"}
        </button>

        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          Delete
        </button>
      </div>

      {showCommunicationForm && (
        <div className="flex justify-center gap-6 mt-6">
          <CommunicationForm
            recruiterId={recruiter._id}
            applicationId={recruiter.applicationId}
            onSuccess={() => {
              setShowCommunicationForm(false);
              onUpdated();
            }}
          />
        </div>
      )}

      <div className="mt-6 space-y-6 grid grid-cols-1 lg:grid-cols-2">
      <CommunicationList recruiterId={recruiter._id} />
      <EmailTemplates
        recruiterName={recruiter.name || "Recruiter"}
        company={company}
      />
      </div>
    </div>
  );
}
