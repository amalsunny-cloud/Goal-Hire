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

export default function ApplicationForm({ onAddSuccess }: ApplicationFormProps) {
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

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
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
          note,
          followUpDate,
          jobUrl,
          location,
          salary,
          source,
        }),
      });

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
    <form onSubmit={handleSubmit} className="space-y-5 text-slate-800">
      {/* Profile Selection Banner */}
      <div className="bg-slate-500/5 border border-slate-200/80 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-slate-200/60 rounded-lg text-slate-700">
            <User className="w-4 h-4" />
          </div>
          <div>
            <label htmlFor="profile-select" className="text-xs font-semibold uppercase tracking-wider text-slate-700 block">
              Application Profile
            </label>
            <p className="text-xs text-slate-500">Auto-fill links & skills from saved profile</p>
          </div>
        </div>

        <select
          id="profile-select"
          value={selectedProfile}
          onChange={(e) => handleProfileChange(e.target.value)}
          className="pl-3 pr-3 py-2.5 bg-slate-50/70 backdrop-blur-2xl border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all cursor-pointer"
        >
          <option value="">Select Profile (Optional)</option>
          {profiles.map((profile) => (
            <option key={profile._id} value={profile._id}>
              {profile.name}
            </option>
          ))}
        </select>
      </div>

      {/* 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Company Name */}
        <div className="space-y-1.5">
          <label htmlFor="company" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            Company <span className="text-rose-500">*</span>
          </label>
          <input
            id="company"
            type="text"
            required
            placeholder="e.g. Google, Microsoft, Stripe"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full pl-3 pr-3 py-2.5 bg-slate-50/70 backdrop-blur-2xl border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all"
          />
        </div>

        {/* Job Role */}
        <div className="space-y-1.5">
          <label htmlFor="role" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-slate-500" />
            Role / Position <span className="text-rose-500">*</span>
          </label>
          <input
            id="role"
            type="text"
            required
            placeholder="e.g. Full Stack Developer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full pl-3 pr-3 py-2.5 bg-slate-50/70 backdrop-blur-2xl border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all"
          />
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <label htmlFor="location" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            Location <span className="text-rose-500">*</span>
          </label>
          <input
            id="location"
            type="text"
            required
            placeholder="e.g. New York, NY / Remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-3 pr-3 py-2.5 bg-slate-50/70 backdrop-blur-2xl border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all"
          />
        </div>

        {/* Salary */}
        <div className="space-y-1.5">
          <label htmlFor="salary" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-slate-500" />
            Expected Salary
          </label>
          <input
            id="salary"
            type="text"
            placeholder="e.g. $120,000 / yr"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full pl-3 pr-3 py-2.5 bg-slate-50/70 backdrop-blur-2xl border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all"
          />
        </div>

        {/* Job Source */}
        <div className="space-y-1.5">
          <label htmlFor="source" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            Job Source <span className="text-rose-500">*</span>
          </label>
          <select
            id="source"
            required
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full pl-3 pr-3 py-2.5 bg-slate-50/70 backdrop-blur-2xl border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all cursor-pointer"
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
        <div className="space-y-1.5">
          <label htmlFor="followupdate" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            Follow-Up Date
          </label>
          <input
            id="followupdate"
            type="date"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
            className="w-full pl-3 pr-3 py-2.5 bg-slate-50/70 backdrop-blur-2xl border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all cursor-pointer"
          />
        </div>
      </div>

      {/* Job URL */}
      <div className="space-y-1.5">
        <label htmlFor="joburl" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <LinkIcon className="w-3.5 h-3.5 text-slate-500" />
          Job Posting URL
        </label>
        <input
          id="joburl"
          type="url"
          placeholder="https://company.com/careers/job-id"
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
          className="w-full pl-3 pr-3 py-2.5 bg-slate-50/70 backdrop-blur-2xl border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all"
        />
      </div>

      {/* Notes & Description */}
      <div className="space-y-1.5">
        <label htmlFor="notes" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          Notes & Key Information
        </label>
        <textarea
          id="notes"
          rows={4}
          placeholder="Add interview stages, recruiter contact, required tech stack, or referral notes..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full pl-3 pr-3 py-2.5 bg-slate-50/70 backdrop-blur-2xl border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all resize-y"
        />
      </div>

      {/* Action Submit Button */}
      <div className="pt-2 flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto min-w-45 inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98]"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Adding Application...</span>
            </>
          ) : (
            <>
              <PlusCircle className="w-4 h-4" />
              <span>Add Application</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}