"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  BriefcaseBusiness,
  Check,
  GraduationCap,
  Link2,
  MapPin,
  Phone,
  Plus,
  Save,
  Trash2,
  UserRound,
  
  Globe,
  FileText,
  Code2,
} from "lucide-react";

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
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="animate-pulse space-y-5">
            <div className="h-7 w-48 rounded-lg bg-slate-200" />
            <div className="h-4 w-80 max-w-full rounded-lg bg-slate-100" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="h-12 rounded-xl bg-slate-100" />
              <div className="h-12 rounded-xl bg-slate-100" />
              <div className="h-12 rounded-xl bg-slate-100" />
              <div className="h-28 rounded-xl bg-slate-100 sm:col-span-2" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-32 rounded-lg bg-slate-200" />
            <div className="h-11 w-full rounded-xl bg-slate-100" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Profile Header */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="relative bg-slate-950 px-6 py-8 sm:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.25),transparent_35%)]" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15 backdrop-blur">
              <UserRound className="h-7 w-7" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Professional Profile
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Build your professional identity
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Keep your career information in one place for
                applications, resumes, and future AI-powered
                features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Information */}
      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <SectionHeader
          icon={<BriefcaseBusiness className="h-5 w-5" />}
          title="Professional Information"
          description="Add the basic professional information you want to showcase."
        />

        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
          <Field label="Professional Title">
            <input
              value={profile.professionalTitle}
              onChange={(e) =>
                updateField(
                  "professionalTitle",
                  e.target.value,
                )
              }
              placeholder="e.g. Full Stack Developer"
              className="input"
            />
          </Field>

          <Field
            label="Location"
            icon={<MapPin className="h-3.5 w-3.5" />}
          >
            <input
              value={profile.location}
              onChange={(e) =>
                updateField("location", e.target.value)
              }
              placeholder="e.g. Thrissur, Kerala"
              className="input"
            />
          </Field>

          <Field
            label="Phone"
            icon={<Phone className="h-3.5 w-3.5" />}
          >
            <input
              value={profile.phone}
              onChange={(e) =>
                updateField("phone", e.target.value)
              }
              placeholder="Phone number"
              className="input"
            />
          </Field>

          <div className="sm:col-span-2">
            <Field label="Professional Bio">
              <textarea
                value={profile.bio}
                onChange={(e) =>
                  updateField("bio", e.target.value)
                }
                placeholder="Write a short professional bio..."
                rows={5}
                className="input resize-y leading-6"
              />
            </Field>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <SectionHeader
          icon={<Check className="h-5 w-5" />}
          title="Skills"
          description="Add technologies and skills that represent your experience."
        />

        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row">
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
              className="input flex-1"
            />

            <button
              type="button"
              onClick={addSkill}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              Add Skill
            </button>
          </div>

          {profile.skills.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                >
                  {skill}

                  <span className="text-slate-400 transition group-hover:text-rose-500">
                    ×
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <EmptyState text="No skills added yet." />
          )}
        </div>
      </section>

      {/* Experience */}
      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <SectionHeader
          icon={<BriefcaseBusiness className="h-5 w-5" />}
          title="Experience"
          description="Add internships, jobs, or other relevant experience."
        />

        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={experienceInput}
              onChange={(e) =>
                setExperienceInput(e.target.value)
              }
              placeholder="e.g. Full Stack Developer Intern at ABC"
              className="input flex-1"
            />

            <button
              type="button"
              onClick={addExperience}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              Add Experience
            </button>
          </div>

          {profile.experience.length > 0 ? (
            <div className="mt-5 space-y-3">
              {profile.experience.map((item, index) => (
                <ListItem
                  key={`${item}-${index}`}
                  text={item}
                  onRemove={() =>
                    removeExperience(index)
                  }
                />
              ))}
            </div>
          ) : (
            <EmptyState text="No experience added yet." />
          )}
        </div>
      </section>

      {/* Education */}
      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <SectionHeader
          icon={<GraduationCap className="h-5 w-5" />}
          title="Education"
          description="Add your academic qualifications."
        />

        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={educationInput}
              onChange={(e) =>
                setEducationInput(e.target.value)
              }
              placeholder="e.g. BSc Information Technology"
              className="input flex-1"
            />

            <button
              type="button"
              onClick={addEducation}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              Add Education
            </button>
          </div>

          {profile.education.length > 0 ? (
            <div className="mt-5 space-y-3">
              {profile.education.map((item, index) => (
                <ListItem
                  key={`${item}-${index}`}
                  text={item}
                  onRemove={() =>
                    removeEducation(index)
                  }
                />
              ))}
            </div>
          ) : (
            <EmptyState text="No education added yet." />
          )}
        </div>
      </section>

      {/* Career Links */}
      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <SectionHeader
          icon={<Link2 className="h-5 w-5" />}
          title="Career Links"
          description="Add links to your resume, portfolio, and professional profiles."
        />

        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
          <LinkField
            icon={<FileText className="h-4 w-4" />}
            label="Resume"
            value={profile.resumeUrl}
            placeholder="https://..."
            onChange={(value) =>
              updateField("resumeUrl", value)
            }
          />

          <LinkField
            icon={<Globe className="h-4 w-4" />}
            label="Portfolio"
            value={profile.portfolioUrl}
            placeholder="https://..."
            onChange={(value) =>
              updateField("portfolioUrl", value)
            }
          />

          <LinkField
            icon={<Code2 className="h-4 w-4" />}
            label="GitHub"
            value={profile.githubUrl}
            placeholder="https://github.com/..."
            onChange={(value) =>
              updateField("githubUrl", value)
            }
          />

          <LinkField
            icon={<BriefcaseBusiness className="h-4 w-4" />}
            label="LinkedIn"
            value={profile.linkedinUrl}
            placeholder="https://linkedin.com/in/..."
            onChange={(value) =>
              updateField("linkedinUrl", value)
            }
          />
        </div>
      </section>

      {/* Save */}
      <div className="sticky bottom-4 z-10 flex justify-end">
        <button
          type="button"
          onClick={saveProfile}
          disabled={saving}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}

/* ----------------------------- */
/* Reusable UI components        */
/* ----------------------------- */

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function SectionHeader({
  icon,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="flex items-start gap-3 border-b border-slate-100 p-5 sm:p-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
        {icon}
      </div>

      <div>
        <h2 className="text-lg font-bold tracking-tight text-slate-900">
          {title}
        </h2>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

function Field({
  label,
  icon,
  children,
}: FieldProps) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
        {icon}
        {label}
      </label>

      {children}
    </div>
  );
}

interface LinkFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

function LinkField({
  icon,
  label,
  value,
  placeholder,
  onChange,
}: LinkFieldProps) {
  return (
    <Field
      label={label}
      icon={icon}
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input"
      />
    </Field>
  );
}

interface ListItemProps {
  text: string;
  onRemove: () => void;
}

function ListItem({
  text,
  onRemove,
}: ListItemProps) {
  return (
    <div className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-slate-300 hover:bg-white">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">
        <Check className="h-4 w-4" />
      </div>

      <p className="min-w-0 flex-1 text-sm font-medium leading-6 text-slate-700">
        {text}
      </p>

      <button
        type="button"
        onClick={onRemove}
        className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Remove
      </button>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-4 py-6 text-center">
      <p className="text-xs font-medium text-slate-400">
        {text}
      </p>
    </div>
  );
}