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
      const response = await fetch(
        `/api/recruiters/${recruiter._id}/contact`,
        {
          method: "PATCH",
        },
      );

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
    <div className="rounded-3xl bg-white p-2 transition-all duration-200 sm:p-6">
      {/* Recruiter Header */}
      <div className="mb-5 flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          {editing ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          ) : (
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                {recruiter.name}
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Recruiter contact
              </p>
            </div>
          )}
        </div>

        <div className="shrink-0">
          <RecruiterStatusBadge nextFollowUp={recruiter.nextFollowUp} />
        </div>
      </div>

      {/* Tags */}
      <div className="mb-5">
        {editing ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Tags
            </p>

            <RecruiterTagSelector selected={tags} onChange={setTags} />
          </div>
        ) : (
          <RecruiterTags tags={recruiter.tags} />
        )}
      </div>

      {/* Recruiter Information */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {/* Email */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 transition-all duration-200 hover:border-slate-300 hover:bg-white hover:shadow-sm">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Email
            </p>

            {editing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
              />
            ) : (
              <p className="break-all text-sm font-medium text-slate-700">
                {recruiter.email || "No email"}
              </p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 transition-all duration-200 hover:border-slate-300 hover:bg-white hover:shadow-sm">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Phone
            </p>

            {editing ? (
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
              />
            ) : (
              <p className="text-sm font-medium text-slate-700">
                {recruiter.phone || "No phone number"}
              </p>
            )}
          </div>
        </div>

        {/* LinkedIn */}
        <div className="flex min-h-25 flex-col justify-center rounded-2xl border border-slate-200 bg-slate-50/60 p-4 transition-all duration-200 hover:border-slate-300 hover:bg-white hover:shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            LinkedIn
          </p>

          {editing ? (
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
            />
          ) : recruiter.linkedin ? (
            <a
              href={recruiter.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit rounded-lg text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
            >
              View Profile →
            </a>
          ) : (
            <p className="text-sm font-medium text-slate-500">
              No LinkedIn profile
            </p>
          )}
        </div>

        {/* Last Contact */}
        <div className="flex min-h-25 flex-col justify-center rounded-2xl border border-slate-200 bg-slate-50/60 p-4 transition-all duration-200 hover:border-slate-300 hover:bg-white hover:shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Last Contact
          </p>

          {editing ? (
            <input
              type="date"
              value={lastContact}
              onChange={(e) => setLastContact(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
            />
          ) : (
            <p className="text-sm font-semibold text-slate-700">
              {recruiter.lastContact
                ? new Date(recruiter.lastContact).toLocaleDateString(
                    "en-GB",
                  )
                : "Not set"}
            </p>
          )}
        </div>

        {/* Next Follow-up */}
        <div className="flex min-h-25 flex-col justify-center rounded-2xl border border-slate-200 bg-slate-50/60 p-4 transition-all duration-200 hover:border-slate-300 hover:bg-white hover:shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Next Follow-up
          </p>

          {editing ? (
            <input
              type="date"
              value={nextFollowUp}
              onChange={(e) => setNextFollowUp(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
            />
          ) : (
            <p className="text-sm font-semibold text-slate-700">
              {recruiter.nextFollowUp
                ? new Date(recruiter.nextFollowUp).toLocaleDateString(
                    "en-GB",
                  )
                : "Not set"}
            </p>
          )}
        </div>

        {/* Notes */}
        <div className="flex min-h-25 flex-col justify-center rounded-2xl border border-slate-200 bg-slate-50/60 p-4 transition-all duration-200 hover:border-slate-300 hover:bg-white hover:shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Notes
          </p>

          {editing ? (
            <textarea
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm leading-6 text-slate-700 outline-none transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
            />
          ) : (
            <p className="whitespace-pre-wrap wrap-break-word text-sm leading-6 text-slate-600">
              {recruiter.notes || "No notes"}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="my-6 flex flex-wrap justify-center gap-2.5 border-t border-slate-100 pt-6 sm:gap-3">
        {!editing && (
          <button
            onClick={markContactedToday}
            disabled={contacting}
            className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-emerald-600 bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            {contacting ? "Updating..." : "Contacted Today"}
          </button>
        )}

        {editing ? (
          <>
            <button
              onClick={saveChanges}
              disabled={loading}
              className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => setEditing(false)}
              className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-blue-600 bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-sm"
          >
            Edit
          </button>
        )}

        <button
          onClick={() =>
            setShowCommunicationForm(!showCommunicationForm)
          }
          className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-indigo-600 bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-sm"
        >
          {showCommunicationForm
            ? "Cancel Communication"
            : "Add Communication"}
        </button>

        <button
          onClick={onDelete}
          className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-rose-600 bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-700 hover:shadow-sm"
        >
          Delete
        </button>
      </div>

      {/* Communication Form */}
      {showCommunicationForm && (
        <div className="mt-6 rounded-3xl border border-indigo-100 bg-indigo-50/40 p-4 sm:p-5">
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

      {/* Communication & Templates */}
      <div className="mt-6 grid grid-cols-1 gap-5 border-t border-slate-100 pt-6 lg:grid-cols-2">
        <CommunicationList recruiterId={recruiter._id} />

        <EmailTemplates
          recruiterName={recruiter.name || "Recruiter"}
          company={company}
        />
      </div>
    </div>
  );
}