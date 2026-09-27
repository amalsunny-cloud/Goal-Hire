"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Loader2,
  Sparkles,
  Target,
  XCircle,
} from "lucide-react";

import type { ResumeMatch } from "@/lib/ai/schemas/resumeMatch";
import type { SavedResumeAnalysis } from "@/types/resumeAnalysis";
import { SavedJobAnalysis } from "@/types/JobAnalysis";

export default function ResumeJobMatcher() {
  const [savedResumes, setSavedResumes] = useState<SavedResumeAnalysis[]>([]);
  const [savedJobs, setSavedJobs] = useState<SavedJobAnalysis[]>([]);

  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("");

  const [loadingResumes, setLoadingResumes] = useState(true);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const [match, setMatch] = useState<ResumeMatch | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSavedResumes() {
      try {
        const response = await fetch("/api/ai/resume-analyses");

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch saved resumes");
        }

        setSavedResumes(result.data);
      } catch (error) {
        console.error("Failed to fetch saved resumes:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load saved resumes.",
        );
      } finally {
        setLoadingResumes(false);
      }
    }

    fetchSavedResumes();
  }, []);

  useEffect(() => {
    async function fetchSavedJobs() {
      try {
        const response = await fetch("/api/ai/job-analyses");

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch saved jobs");
        }

        setSavedJobs(result.data);
      } catch (error) {
        console.error("Failed to fetch saved jobs:", error);

        setError(
          error instanceof Error ? error.message : "Failed to load saved jobs.",
        );
      } finally {
        setLoadingJobs(false);
      }
    }

    fetchSavedJobs();
  }, []);

  const selectedResume = savedResumes.find(
    (resume) => resume._id === selectedResumeId,
  );

  const selectedJob = savedJobs.find((job) => job._id === selectedJobId);

  function handleResumeChange(value: string) {
    setSelectedResumeId(value);
    setMatch(null);
    setError("");
  }

  function handleJobChange(value: string) {
    setSelectedJobId(value);
    setMatch(null);
    setError("");
  }

  async function handleMatch() {
    if (!selectedResumeId) {
      setError("Please select a resume.");
      return;
    }

    if (!selectedJobId) {
      setError("Please select a job.");
      return;
    }

    if (!selectedResume) {
      setError("The selected resume could not be found.");
      return;
    }

    if (!selectedJob) {
      setError("The selected job could not be found.");
      return;
    }

    setLoading(true);
    setError("");
    setMatch(null);

    try {
      const response = await fetch("/api/ai/match-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeAnalysis: selectedResume.analysis,
          jobAnalysis: selectedJob.analysis,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to match the resume with the job.",
        );
      }

      setMatch(result.data);
    } catch (error) {
      console.error("Resume matching error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to match the resume with the job.",
      );
    } finally {
      setLoading(false);
    }
  }

  const isLoadingInitialData = loadingResumes || loadingJobs;

  const canMatch =
    !loading &&
    !loadingResumes &&
    !loadingJobs &&
    !!selectedResumeId &&
    !!selectedJobId;

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start gap-3">
          <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
            <Target className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Resume ↔ Job Matcher
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Compare your resume analysis with a job description analysis to
              identify matching skills, gaps, and improvement opportunities.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Resume Analysis */}
          <div>
            <label
              htmlFor="saved-resume"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Resume
            </label>

            <select
              id="saved-resume"
              value={selectedResumeId}
              onChange={(event) => handleResumeChange(event.target.value)}
              disabled={loading || loadingResumes}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="">
                {loadingResumes
                  ? "Loading saved resumes..."
                  : savedResumes.length === 0
                    ? "No saved resumes available"
                    : "Select a saved resume"}
              </option>

              {savedResumes.map((resume) => (
                <option key={resume._id} value={resume._id}>
                  {resume.analysis.careerPositioning?.[0] || "Saved Resume"}
                </option>
              ))}
            </select>

            {!loadingResumes && savedResumes.length === 0 && (
              <p className="mt-2 text-xs text-slate-500">
                No saved resumes found. Analyze a resume first.
              </p>
            )}

            {selectedResume && (
              <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Selected Resume
                </p>

                <p className="mt-1 text-sm leading-5 text-slate-700">
                  {selectedResume.analysis.careerPositioning?.[0] ||
                    "Saved Resume"}
                </p>
              </div>
            )}
          </div>

          {/* Job Analysis */}
          <div>
            <label
              htmlFor="saved-job"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Job
            </label>

            <select
              id="saved-job"
              value={selectedJobId}
              onChange={(event) => handleJobChange(event.target.value)}
              disabled={loading || loadingJobs}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="">
                {loadingJobs
                  ? "Loading saved jobs..."
                  : savedJobs.length === 0
                    ? "No saved jobs available"
                    : "Select a saved job"}
              </option>

              {savedJobs.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.analysis.jobTitle}
                  {job.analysis.company ? ` — ${job.analysis.company}` : ""}
                </option>
              ))}
            </select>

            {!loadingJobs && savedJobs.length === 0 && (
              <p className="mt-2 text-xs text-slate-500">
                No saved jobs found. Analyze a job description first.
              </p>
            )}

            {selectedJob && (
              <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Selected Job
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {selectedJob.analysis.jobTitle}
                </p>

                {selectedJob.analysis.company && (
                  <p className="mt-0.5 text-xs text-slate-500">
                    {selectedJob.analysis.company}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoadingInitialData && (
          <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading your saved resume and job analyses...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Ready State */}
        {selectedResume && selectedJob && !loading && !error && (
          <div className="mt-5 flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 p-3 text-sm text-blue-700">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            Your resume and job are ready to compare.
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleMatch}
            disabled={!canMatch}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Comparing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Match Resume
              </>
            )}
          </button>
        </div>
      </section>

      {/* Results */}
      {match && (
        <section className="space-y-6">
          {/* Compared Resume & Job */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="mb-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Comparison
              </p>

              <p className="mt-1 text-sm text-slate-500">
                This analysis compares the selected resume with the selected
                job.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Resume */}
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Resume
                </p>

                <p className="mt-1 text-sm font-medium leading-5 text-slate-800">
                  {selectedResume?.analysis.careerPositioning?.[0] ||
                    "Saved Resume"}
                </p>

                {selectedResume?.analysis.professionalSummary && (
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                    {selectedResume.analysis.professionalSummary}
                  </p>
                )}
              </div>

              {/* Job */}
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Job
                </p>

                <p className="mt-1 text-sm font-medium leading-5 text-slate-800">
                  {selectedJob?.analysis.jobTitle || "Selected Job"}
                </p>

                {selectedJob?.analysis.company && (
                  <p className="mt-1 text-xs text-slate-500">
                    {selectedJob.analysis.company}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />

              <h2 className="text-lg font-semibold text-slate-900">
                Match Summary
              </h2>
            </div>

            <p className="text-sm leading-6 text-slate-600">{match.summary}</p>
          </div>

          {/* Matching / Missing Skills */}
          <div className="grid gap-6 lg:grid-cols-2">
            <MatchSection
              title="Matching Skills"
              items={match.matchingSkills}
              variant="success"
            />

            <MatchSection
              title="Skills Not Demonstrated"
              items={match.missingSkills}
              variant="warning"
            />
          </div>

          {/* Experience */}
          <MatchSection
            title="Matching Experience"
            items={match.matchingExperience}
          />

          {/* Strengths */}
          <MatchSection
            title="Strengths for This Job"
            items={match.strengths}
            variant="success"
          />

          {/* Improvements */}
          <MatchSection
            title="Improvement Suggestions"
            items={match.improvementSuggestions}
            variant="info"
          />
        </section>
      )}
    </div>
  );
}

interface MatchSectionProps {
  title: string;
  items: string[];
  variant?: "default" | "success" | "warning" | "info";
}

function MatchSection({
  title,
  items,
  variant = "default",
}: MatchSectionProps) {
  const styles = {
    default: {
      card: "border-slate-200",
      icon: "text-slate-500",
      bullet: "bg-slate-400",
    },

    success: {
      card: "border-emerald-200",
      icon: "text-emerald-600",
      bullet: "bg-emerald-500",
    },

    warning: {
      card: "border-amber-200",
      icon: "text-amber-600",
      bullet: "bg-amber-500",
    },

    info: {
      card: "border-blue-200",
      icon: "text-blue-600",
      bullet: "bg-blue-500",
    },
  };

  const style = styles[variant];

  return (
    <div className={`rounded-2xl border bg-white p-6 shadow-sm ${style.card}`}>
      <div className="mb-4 flex items-center gap-2">
        {variant === "success" ? (
          <CheckCircle2 className={`h-5 w-5 ${style.icon}`} />
        ) : variant === "warning" ? (
          <XCircle className={`h-5 w-5 ${style.icon}`} />
        ) : (
          <FileText className={`h-5 w-5 ${style.icon}`} />
        )}

        <h3 className="font-semibold text-slate-900">{title}</h3>
      </div>

      {items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="flex gap-3 text-sm leading-6 text-slate-600"
            >
              <span
                className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${style.bullet}`}
              />

              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-400">No matching information found.</p>
      )}
    </div>
  );
}
