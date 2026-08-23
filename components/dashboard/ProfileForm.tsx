"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfileForm() {
  const [name, setName] = useState("");

  const [resumeUrl, setResumeUrl] = useState("");

  const [portfolioUrl, setPortfolioUrl] = useState("");

  const [githubUrl, setGithubUrl] = useState("");

  const [linkedinUrl, setLinkedinUrl] = useState("");

  const [skills, setSkills] = useState("");

  const createProfile = async () => {
    try {
      const response = await fetch("/api/profiles", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          resumeUrl,
          portfolioUrl,
          githubUrl,
          linkedinUrl,
          skills,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Profile Created");
    } catch {
      toast.error("Failed to create profile");
    }
  };

  return (
    <div className="border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">Create Profile</h2>

      <div className="space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Profile Name"
          className="pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all w-full"
        />

        <input
          value={resumeUrl}
          onChange={(e) => setResumeUrl(e.target.value)}
          placeholder="Resume URL"
          className="pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all w-full"
        />

        <input
          value={portfolioUrl}
          onChange={(e) => setPortfolioUrl(e.target.value)}
          placeholder="Portfolio URL"
          className="pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all w-full"
        />

        <input
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          placeholder="GitHub URL"
          className="pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all w-full"
        />

        <input
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          placeholder="LinkedIn URL"
          className="pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all w-full"
        />

        <textarea
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Skills"
          className="pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all w-full"
        />

        <button
          onClick={createProfile}
          className="
            bg-black
            text-white
            px-4
            py-2
            rounded
          "
        >
          Create Profile
        </button>
      </div>
    </div>
  );
}
