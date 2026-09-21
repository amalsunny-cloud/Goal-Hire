"use client";

import { Application } from "@/types/application";
import { Profile } from "@/types/profile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Building2,
  Briefcase,
  MapPin,
  DollarSign,
  Globe,
  Calendar,
  Link as LinkIcon,
  FileText,
  User,
  PlusCircle,
  Loader2,
} from "lucide-react";

interface ApplicationFormProps {
  onAddSuccess: (newApp: Application) => void;
}

export default function ApplicationForm({
  onAddSuccess,
}: ApplicationFormProps) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [note, setNote] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [source, setSource] = useState("LinkedIn");
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState("");

  const fetchProfiles = async () => {
    try {
      const response = await fetch("/api/profiles");

      if (response.ok) {
        const data = await response.json();
        setProfiles(data);
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleProfileChange = (profileId: string) => {
    setSelectedProfile(profileId);

    const profile = profiles.find((p) => p._id === profileId);
    if (!profile) return;

    setNote((prev) => {
      if (prev.trim()) return prev;

      return `Portfolio: ${profile.portfolioUrl || "N/A"}
GitHub: ${profile.githubUrl || "N/A"}
LinkedIn: ${profile.linkedinUrl || "N/A"}
Skills: ${profile.skills || "N/A"}`;
    });
  };

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company,
          role,
          notes: note,
          followUpDate,
          jobUrl,
          location,
          salary,
          source,
        }),
      });

      console.log("response is in handle:", response);

      if (!response.ok) {
        toast.error("Failed to add application");
        throw new Error("Error adding application");
      }

      const savedApplication = await response.json();

      onAddSuccess(savedApplication);

      toast.success("Application added successfully! 🎉");

      // Reset form
      setCompany("");
      setRole("");
      setNote("");
      setFollowUpDate("");
      setJobUrl("");
      setLocation("");
      setSalary("");
      setSource("LinkedIn");
      setSelectedProfile("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-slate-800">
      {/* Profile Selection */}
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
              <User className="h-4 w-4" />
            </div>

            <div>
              <label
                htmlFor="profile-select"
                className="block text-xs font-bold uppercase tracking-wide text-slate-700"
              >
                Application Profile
              </label>

              <p className="mt-0.5 text-xs text-slate-500">
                Auto-fill links & skills from your saved profile
              </p>
            </div>
          </div>

          <select
            id="profile-select"
            value={selectedProfile}
            onChange={(e) => handleProfileChange(e.target.value)}
            className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-700 outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 sm:w-auto sm:min-w-55"
          >
            <option value="">Select Profile (Optional)</option>

            {profiles.map((profile) => (
              <option key={profile._id} value={profile._id}>
                {profile.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Fields */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Company */}
        <div className="space-y-2">
          <label
            htmlFor="company"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700"
          >
            <Building2 className="h-3.5 w-3.5 text-slate-400" />
            Company
            <span className="text-rose-500">*</span>
          </label>

          <input
            id="company"
            type="text"
            required
            placeholder="e.g. Google, Microsoft, Stripe"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Role */}
        <div className="space-y-2">
          <label
            htmlFor="role"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700"
          >
            <Briefcase className="h-3.5 w-3.5 text-slate-400" />
            Role / Position
            <span className="text-rose-500">*</span>
          </label>

          <input
            id="role"
            type="text"
            required
            placeholder="e.g. Full Stack Developer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label
            htmlFor="location"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700"
          >
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            Location
            <span className="text-rose-500">*</span>
          </label>

          <input
            id="location"
            type="text"
            required
            placeholder="e.g. New York, NY / Remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Salary */}
        <div className="space-y-2">
          <label
            htmlFor="salary"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700"
          >
            <DollarSign className="h-3.5 w-3.5 text-slate-400" />
            Expected Salary
          </label>

          <input
            id="salary"
            type="text"
            placeholder="e.g. $120,000 / yr"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Job Source */}
        <div className="space-y-2">
          <label
            htmlFor="source"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700"
          >
            <Globe className="h-3.5 w-3.5 text-slate-400" />
            Job Source
            <span className="text-rose-500">*</span>
          </label>

          <select
            id="source"
            required
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-3 text-sm text-slate-800 outline-none transition-all duration-200 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="LinkedIn">LinkedIn</option>
            <option value="Indeed">Indeed</option>
            <option value="Naukri">Naukri</option>
            <option value="Company Website">Company Website</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Follow-up Date */}
        <div className="space-y-2">
          <label
            htmlFor="followupdate"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700"
          >
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            Follow-Up Date
          </label>

          <input
            id="followupdate"
            type="date"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
            className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-3 text-sm text-slate-800 outline-none transition-all duration-200 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>
      </div>

      {/* Job URL */}
      <div className="space-y-2">
        <label
          htmlFor="joburl"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700"
        >
          <LinkIcon className="h-3.5 w-3.5 text-slate-400" />
          Job Posting URL
        </label>

        <input
          id="joburl"
          type="url"
          placeholder="https://company.com/careers/job-id"
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
        />
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label
          htmlFor="notes"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700"
        >
          <FileText className="h-3.5 w-3.5 text-slate-400" />
          Notes & Key Information
        </label>

        <textarea
          id="notes"
          rows={4}
          placeholder="Add interview stages, recruiter contact, required tech stack, or referral notes..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end border-t border-slate-100 pt-5">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Adding Application...</span>
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4" />
              <span>Add Application</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}