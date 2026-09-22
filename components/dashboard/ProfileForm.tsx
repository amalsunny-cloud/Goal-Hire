"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ProfileFormData {
  phone: string;
  location: string;
  professionalTitle: string;
  bio: string;
  skills: string[];
  experience: string[];
  education: string[];
  resumeUrl: string;
  portfolioUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}

const initialProfile: ProfileFormData = {
  phone: "",
  location: "",
  professionalTitle: "",
  bio: "",
  skills: [],
  experience: [],
  education: [],
  resumeUrl: "",
  portfolioUrl: "",
  githubUrl: "",
  linkedinUrl: "",
};

export default function ProfileForm() {
  const [profile, setProfile] =
    useState<ProfileFormData>(initialProfile);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [skillInput, setSkillInput] = useState("");
  const [experienceInput, setExperienceInput] = useState("");
  const [educationInput, setEducationInput] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profiles");

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();

        if (data) {
          setProfile({
            phone: data.phone || "",
            location: data.location || "",
            professionalTitle: data.professionalTitle || "",
            bio: data.bio || "",
            skills: data.skills || [],
            experience: data.experience || [],
            education: data.education || [],
            resumeUrl: data.resumeUrl || "",
            portfolioUrl: data.portfolioUrl || "",
            githubUrl: data.githubUrl || "",
            linkedinUrl: data.linkedinUrl || "",
          });
        }
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const updateField = (
    field: keyof ProfileFormData,
    value: string,
  ) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addSkill = () => {
    const skill = skillInput.trim();

    if (!skill) return;

    if (profile.skills.includes(skill)) {
      setSkillInput("");
      return;
    }

    setProfile((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));

    setSkillInput("");
  };

  const removeSkill = (skillToRemove: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter(
        (skill) => skill !== skillToRemove,
      ),
    }));
  };

  const addExperience = () => {
    const experience = experienceInput.trim();

    if (!experience) return;

    setProfile((prev) => ({
      ...prev,
      experience: [...prev.experience, experience],
    }));

    setExperienceInput("");
  };

  const removeExperience = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.filter(
        (_, i) => i !== index,
      ),
    }));
  };

  const addEducation = () => {
    const education = educationInput.trim();

    if (!education) return;

    setProfile((prev) => ({
      ...prev,
      education: [...prev.education, education],
    }));

    setEducationInput("");
  };

  const removeEducation = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.filter(
        (_, i) => i !== index,
      ),
    }));
  };

  const saveProfile = async () => {
    try {
      setSaving(true);

      const response = await fetch("/api/profiles", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to save profile",
        );
      }

      setProfile({
        phone: data.phone || "",
        location: data.location || "",
        professionalTitle:
          data.professionalTitle || "",
        bio: data.bio || "",
        skills: data.skills || [],
        experience: data.experience || [],
        education: data.education || [],
        resumeUrl: data.resumeUrl || "",
        portfolioUrl: data.portfolioUrl || "",
        githubUrl: data.githubUrl || "",
        linkedinUrl: data.linkedinUrl || "",
      });

      toast.success("Profile saved successfully");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save profile",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-5 w-48 rounded-lg bg-slate-200" />
          <div className="h-11 w-full rounded-xl bg-slate-100" />
          <div className="h-11 w-full rounded-xl bg-slate-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Professional Information */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="border-b border-slate-100 pb-5">
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            Professional Information
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Add the basic professional information you want to
            showcase.
          </p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              Professional Title
            </label>

            <input
              value={profile.professionalTitle}
              onChange={(e) =>
                updateField(
                  "professionalTitle",
                  e.target.value,
                )
              }
              placeholder="e.g. Full Stack Developer"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              Location
            </label>

            <input
              value={profile.location}
              onChange={(e) =>
                updateField("location", e.target.value)
              }
              placeholder="e.g. Thrissur, Kerala"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              Phone
            </label>

            <input
              value={profile.phone}
              onChange={(e) =>
                updateField("phone", e.target.value)
              }
              placeholder="Phone number"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-xs font-semibold text-slate-600">
            Professional Bio
          </label>

          <textarea
            value={profile.bio}
            onChange={(e) =>
              updateField("bio", e.target.value)
            }
            placeholder="Write a short professional bio..."
            rows={5}
            className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>
      </section>

      {/* Skills */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="border-b border-slate-100 pb-5">
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            Skills
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Add technologies and skills that represent your
            experience.
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <input
            value={skillInput}
            onChange={(e) =>
              setSkillInput(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
            placeholder="e.g. Next.js"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />

          <button
            type="button"
            onClick={addSkill}
            className="rounded-xl bg-slate-900 cursor-pointer px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
          >
            Add Skill
          </button>
        </div>

        <div className="mt-5 flex min-h-10 flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => removeSkill(skill)}
              className="group inline-flex items-center cursor-pointer gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
            >
              {skill}

              <span className="text-slate-400 transition group-hover:text-rose-500">
                ×
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="border-b border-slate-100 pb-5">
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            Experience
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Add internships, jobs, or other relevant experience.
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <input
            value={experienceInput}
            onChange={(e) =>
              setExperienceInput(e.target.value)
            }
            placeholder="e.g. Full Stack Developer Intern at ABC"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />

          <button
            type="button"
            onClick={addExperience}
            className="rounded-xl bg-slate-900 cursor-pointer px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
          >
            Add Experience
          </button>
        </div>

        <div className="mt-5 space-y-2">
          {profile.experience.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-sm transition hover:border-slate-200 hover:bg-white"
            >
              <span className="min-w-0 text-sm font-medium leading-6 text-slate-700">
                {item}
              </span>

              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="shrink-0 rounded-lg cursor-pointer px-2.5 py-1.5 text-xs font-semibold text-rose-500 transition hover:bg-rose-50 hover:text-rose-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="border-b border-slate-100 pb-5">
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            Education
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Add your academic qualifications.
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <input
            value={educationInput}
            onChange={(e) =>
              setEducationInput(e.target.value)
            }
            placeholder="e.g. BSc Information Technology"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />

          <button
            type="button"
            onClick={addEducation}
            className="rounded-xl bg-slate-900 cursor-pointer px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
          >
            Add Education
          </button>
        </div>

        <div className="mt-5 space-y-2">
          {profile.education.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-sm transition hover:border-slate-200 hover:bg-white"
            >
              <span className="min-w-0 text-sm font-medium leading-6 text-slate-700">
                {item}
              </span>

              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="shrink-0 cursor-pointer rounded-lg px-2.5 py-1.5 text-xs font-semibold text-rose-500 transition hover:bg-rose-50 hover:text-rose-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Links */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="border-b border-slate-100 pb-5">
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            Career Links
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Add links to your resume, portfolio, and professional
            profiles.
          </p>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              Resume
            </label>

            <input
              value={profile.resumeUrl}
              onChange={(e) =>
                updateField("resumeUrl", e.target.value)
              }
              placeholder="Resume URL"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              Portfolio
            </label>

            <input
              value={profile.portfolioUrl}
              onChange={(e) =>
                updateField(
                  "portfolioUrl",
                  e.target.value,
                )
              }
              placeholder="Portfolio URL"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              GitHub
            </label>

            <input
              value={profile.githubUrl}
              onChange={(e) =>
                updateField("githubUrl", e.target.value)
              }
              placeholder="GitHub URL"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              LinkedIn
            </label>

            <input
              value={profile.linkedinUrl}
              onChange={(e) =>
                updateField(
                  "linkedinUrl",
                  e.target.value,
                )
              }
              placeholder="LinkedIn URL"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>
        </div>
      </section>

      {/* Save */}
      <div className="flex justify-end border-t border-slate-200 pt-5">
        <button
          type="button"
          onClick={saveProfile}
          disabled={saving}
          className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50 disabled:hover:shadow-none"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}