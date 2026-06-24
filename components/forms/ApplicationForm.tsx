"use client";

import { Application } from "@/types/application";
import { Profile } from "@/types/profile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface FormProps {
  onAddSuccess: (newApp: Application) => void;
}

export default function ApplicationForm({ onAddSuccess }: FormProps) {
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

      const data = await response.json();

      setProfiles(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleProfileChange = (profileId: string) => {
    setSelectedProfile(profileId);

    const profile = profiles.find((p) => p._id === profileId);

    if (!profile) {
      return;
    }

    setNote((prev) => {
  if (prev.trim()) {
    return prev;
  }

  return `
Portfolio:
${profile.portfolioUrl || ""}

GitHub:
${profile.githubUrl || ""}

LinkedIn:
${profile.linkedinUrl || ""}

Skills:
${profile.skills || ""}
`;
});
  }

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
        toast.error("Error adding application");
        throw new Error("Error adding application");
      }

      const savedApplication = await response.json();
      onAddSuccess(savedApplication);
      toast.success("Application added");
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
    } finally {
      setLoading(false);
    }
  };

  console.log("Profiles are:", profiles);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Application Profile</label>

        <select
          value={selectedProfile}
          onChange={(e) => handleProfileChange(e.target.value)}
          className="
      border
      p-2
      rounded
      w-full
    "
        >
          <option value="">Select Profile</option>

          {profiles.map((profile) => (
            <option key={profile._id} value={profile._id}>
              {profile.name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        placeholder="Company"
        className="border p-2 w-full rounded-lg"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        type="text"
        placeholder="Role"
        className="border p-2 w-full rounded-lg"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <textarea
        rows={6}
        placeholder="Notes"
        className="border p-2 w-full rounded-lg"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <input
        type="date"
        placeholder="Follow Up Date"
        className="border p-2 w-full rounded-lg"
        value={followUpDate}
        onChange={(e) => setFollowUpDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Job URL"
        className="border p-2 w-full rounded-lg"
        value={jobUrl}
        onChange={(e) => setJobUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        className="border p-2 w-full rounded-lg"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="Salary"
        className="border p-2 w-full rounded-lg"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />

      <div>
        <label>Job Source</label>

        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="
      border
      p-2
      rounded
      w-full
    "
        >
          <option value="LinkedIn">LinkedIn</option>

          <option value="Indeed">Indeed</option>

          <option value="Naukri">Naukri</option>

          <option value="Company Website">Company Website</option>

          <option value="Referral">Referral</option>

          <option value="Other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Application"}
      </button>
    </form>
  );
  }