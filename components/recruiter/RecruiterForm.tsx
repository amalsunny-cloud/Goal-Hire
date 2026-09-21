"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Phone,
  Link as LinkIcon,
  Calendar,
  Clock,
  FileText,
  Tag,
  UserPlus,
  Loader2,
} from "lucide-react";
import RecruiterTagSelector from "./RecruiterTagSelector";

interface Props {
  applicationId: string;
  onSuccess?: () => void;
}

export default function RecruiterForm({ applicationId, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [lastContact, setLastContact] = useState("");
  const [nextFollowUp, setNextFollowUp] = useState("");
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter the recruiter name");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        applicationId,
        name: name.trim(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        linkedin: linkedin.trim() || undefined,
        lastContact: lastContact
          ? new Date(lastContact).toISOString()
          : undefined,
        nextFollowUp: nextFollowUp
          ? new Date(nextFollowUp).toISOString()
          : undefined,
        notes: notes.trim() || undefined,
        tags,
      };

      const response = await fetch("/api/recruiters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Failed to add recruiter");
      }

      toast.success("Recruiter added successfully! 🎉");

      setName("");
      setEmail("");
      setPhone("");
      setLinkedin("");
      setLastContact("");
      setNextFollowUp("");
      setNotes("");
      setTags([]);
      onSuccess?.();
    } catch (error: any) {
      console.error("Error adding recruiter:", error);
      toast.error(error.message || "Failed to add recruiter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 text-slate-800 shadow-sm sm:p-6"
    >
      {/* Header */}
      <div className="flex items-start gap-3 border-b border-slate-100 pb-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
          <UserPlus className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
            Recruiter Information
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
            Keep track of recruiter contacts, communications, and follow-ups.
          </p>
        </div>
      </div>

      {/* Recruiter Information */}
      <div className="space-y-4">
        {/* Recruiter Name */}
        <div className="space-y-2">
          <label
            htmlFor="recruiter-name"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700"
          >
            <User className="h-3.5 w-3.5 text-slate-400" />
            Recruiter Name
            <span className="text-rose-500">*</span>
          </label>

          <input
            id="recruiter-name"
            type="text"
            required
            placeholder="e.g. Sarah Jenkins"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Recruiter Email */}
        <div className="space-y-2">
          <label
            htmlFor="recruiter-email"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700"
          >
            <Mail className="h-3.5 w-3.5 text-slate-400" />
            Email Address
          </label>

          <input
            id="recruiter-email"
            type="email"
            placeholder="e.g. sarah.jenkins@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label
            htmlFor="recruiter-phone"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700"
          >
            <Phone className="h-3.5 w-3.5 text-slate-400" />
            Phone Number
          </label>

          <input
            id="recruiter-phone"
            type="tel"
            placeholder="e.g. +1 (555) 234-5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* LinkedIn Profile */}
        <div className="space-y-2">
          <label
            htmlFor="recruiter-linkedin"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700"
          >
            <LinkIcon className="h-3.5 w-3.5 text-slate-400" />
            LinkedIn Profile URL
          </label>

          <input
            id="recruiter-linkedin"
            type="url"
            placeholder="https://linkedin.com/in/username"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Last Contact */}
        <div className="space-y-2">
          <label
            htmlFor="recruiter-last-contact"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700"
          >
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            Last Contact Date
          </label>

          <input
            id="recruiter-last-contact"
            type="date"
            value={lastContact}
            onChange={(e) => setLastContact(e.target.value)}
            className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Next Follow-up */}
        <div className="space-y-2">
          <label
            htmlFor="recruiter-next-followup"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700"
          >
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            Next Follow-up Date
          </label>

          <input
            id="recruiter-next-followup"
            type="date"
            value={nextFollowUp}
            onChange={(e) => setNextFollowUp(e.target.value)}
            className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>
      </div>

      {/* Tags */}
      <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
        <div className="mb-3 flex items-center gap-1.5">
          <Tag className="h-3.5 w-3.5 text-slate-400" />

          <label className="text-xs font-semibold text-slate-700">
            Tags & Categories
          </label>
        </div>

        <RecruiterTagSelector
          selected={tags}
          onChange={setTags}
        />
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label
          htmlFor="recruiter-notes"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700"
        >
          <FileText className="h-3.5 w-3.5 text-slate-400" />
          Notes & Discussion Details
        </label>

        <textarea
          id="recruiter-notes"
          rows={4}
          placeholder="Add recruiter preferences, interview feedback, communication style, or other relevant details..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
        />
      </div>

      {/* Submit */}
      <div className="border-t border-slate-100 pt-5">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Saving Recruiter...</span>
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              <span>Save Recruiter</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}