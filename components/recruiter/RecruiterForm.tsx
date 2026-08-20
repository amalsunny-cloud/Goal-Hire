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
        lastContact: lastContact ? new Date(lastContact).toISOString() : undefined,
        nextFollowUp: nextFollowUp ? new Date(nextFollowUp).toISOString() : undefined,
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
      className="bg-white backdrop-blur-xs border border-slate-200/50 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5 text-slate-800 transition-all"
    >
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
        <div className="p-2.5 bg-slate-100 text-slate-700 rounded-xl shadow-2xs">
          <UserPlus className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">
            Recruiter Information
          </h2>
          <p className="text-xs text-slate-500">
            Keep track of recruiter contacts, communications, and follow-ups
          </p>
        </div>
      </div>

      {/* 2-Column Responsive Grid */}
      <div className="flex flex-col justify-center  gap-4 sm:gap-6">
      <div className="gap-4">
        {/* Recruiter Name */}
        <div className="space-y-2.5 mb-3">
          <label
            htmlFor="recruiter-name"
            className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
          >
            <User className="w-3.5 h-3.5 text-slate-500" />
            Recruiter Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="recruiter-name"
            type="text"
            required
            placeholder="e.g. Sarah Jenkins"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200  rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all shadow-2xs"
          />
        </div>

        {/* Recruiter Email */}
        <div className="space-y-2.5 mb-3">
          <label
            htmlFor="recruiter-email"
            className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            Email Address
          </label>
          <input
            id="recruiter-email"
            type="email"
            placeholder="e.g. sarah.jenkins@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all shadow-2xs"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-2.5 mb-3">
          <label
            htmlFor="recruiter-phone"
            className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-slate-500" />
            Phone Number
          </label>
          <input
            id="recruiter-phone"
            type="tel"
            placeholder="e.g. +1 (555) 234-5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all shadow-2xs"
          />
        </div>

        {/* LinkedIn Profile */}
        <div className="space-y-2.5 mb-3">
          <label
            htmlFor="recruiter-linkedin"
            className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
          >
            <LinkIcon className="w-3.5 h-3.5 text-slate-500" />
            LinkedIn Profile URL
          </label>
          <input
            id="recruiter-linkedin"
            type="url"
            placeholder="https://linkedin.com/in/username"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all shadow-2xs"
          />
        </div>

        {/* Last Contact */}
        <div className="space-y-2.5 mb-3">
          <label
            htmlFor="recruiter-last-contact"
            className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            Last Contact Date
          </label>
          <input
            id="recruiter-last-contact"
            type="date"
            value={lastContact}
            onChange={(e) => setLastContact(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all shadow-2xs cursor-pointer"
          />
        </div>

        {/* Next Follow-up */}
        <div className="space-y-2.5 mb-3">
          <label
            htmlFor="recruiter-next-followup"
            className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            Next Follow-up Date
          </label>
          <input
            id="recruiter-next-followup"
            type="date"
            value={nextFollowUp}
            onChange={(e) => setNextFollowUp(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all shadow-2xs cursor-pointer"
          />
        </div>
      </div>
      </div>

      {/* Tags Selection */}
      <div className="space-y-2 pt-1">
        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-slate-500" />
          Tags & Categories
        </label>
        <RecruiterTagSelector selected={tags} onChange={setTags} />
      </div>

      {/* Notes & Extra Info */}
      <div className="space-y-2.5 mb-3">
        <label
          htmlFor="recruiter-notes"
          className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
        >
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          Notes & Discussion Details
        </label>
        <textarea
          id="recruiter-notes"
          rows={4}
          placeholder="Add recruiter preferences, interview feedback, communication style, or other relevant details..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all shadow-2xs resize-y"
        />
      </div>

      {/* Submit Action Button */}
      <div className="pt-2 flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-medium text-sm rounded-xl shadow-xs hover:shadow transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Recruiter...</span>
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              <span>Save Recruiter</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

