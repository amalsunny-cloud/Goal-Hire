
"use client";

import { useEffect, useState } from "react";
import {
    ArrowLeft,
  Check,
  Copy,
  FileText,
  Lightbulb,
  LoaderCircle,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import type { ResumeImprovement as ResumeImprovementData } from "@/lib/ai/schemas/resumeImprovement";
import type { SavedResumeAnalysis } from "@/types/resumeAnalysis";
import Link from "next/link";

interface ResumeAnalysesResponse {
  success: boolean;
  data?: SavedResumeAnalysis[];
  error?: string;
}

interface ImprovementResponse {
  improvements?: ResumeImprovementData;
  error?: string;
}

export default function ResumeImprovement() {
  const [resumes, setResumes] = useState<SavedResumeAnalysis[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [improvements, setImprovements] =
    useState<ResumeImprovementData | null>(null);

  const [loadingResumes, setLoadingResumes] = useState(true);
  const [improving, setImproving] = useState(false);
  const [error, setError] = useState("");
  const [copiedText, setCopiedText] = useState("");

  useEffect(() => {
    async function fetchResumes() {
      try {
        setLoadingResumes(true);
        setError("");

        const response = await fetch("/api/ai/resume-analyses");
        const data: ResumeAnalysesResponse = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Unable to load saved resumes.",
          );
        }

        const savedResumes = data.data ?? [];

        setResumes(savedResumes);

        if (savedResumes.length > 0) {
          setSelectedResumeId(savedResumes[0]._id);
        }
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load saved resumes.",
        );
      } finally {
        setLoadingResumes(false);
      }
    }

    fetchResumes();
  }, []);

  const selectedResume = resumes.find(
    (resume) => resume._id === selectedResumeId,
  );

  function handleResumeChange(resumeId: string) {
    setSelectedResumeId(resumeId);
    setImprovements(null);
    setError("");
    setCopiedText("");
  }

  async function handleImproveResume() {
    if (!selectedResume) {
      setError("Please select a saved resume first.");
      return;
    }

    try {
      setImproving(true);
      setError("");
      setImprovements(null);
      setCopiedText("");

      const response = await fetch("/api/ai/improve-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeAnalysis: selectedResume.analysis,
        }),
      });

      const data: ImprovementResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to improve the resume.",
        );
      }

      if (!data.improvements) {
        throw new Error("The server returned no improvement results.");
      }

      setImprovements(data.improvements);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setImproving(false);
    }
  }

  async function handleCopy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(key);
    } catch {
      setError(
        "Unable to copy automatically. Please select and copy the text manually.",
      );
    }
  }

  if (loadingResumes) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-gray-500">
        <LoaderCircle className="h-5 w-5 animate-spin" />
        <span>Loading saved resumes...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
        <Link
        href="/dashboard"
        className="group inline-flex items-center mb-4 gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-x-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
        Back to Dashboard
      </Link>
      {/* Page introduction */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <div className="rounded-xl bg-violet-100 p-2 text-violet-700">
            <Sparkles className="h-6 w-6" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            AI Resume Improvement
          </h1>
        </div>

        <p className="max-w-3xl text-sm leading-6 text-gray-600">
          Improve your professional summary, project descriptions,
          and experience statements. Review every suggestion before
          using it in your resume.
        </p>
      </div>

      {/* Resume selector */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-violet-600" />

          <h2 className="font-semibold">Select a saved resume</h2>
        </div>

        {resumes.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center">
            <FileText className="mx-auto mb-3 h-8 w-8 text-gray-400" />

            <p className="font-medium">No saved resume analyses found</p>

            <p className="mt-2 text-sm text-gray-500">
              Analyze and save a resume using the Resume Analyzer
              before using this feature.
            </p>
          </div>
        ) : (
          <>
            <label
              htmlFor="saved-resume"
              className="mb-2 block text-sm font-medium"
            >
              Your resumes
            </label>

            <select
              id="saved-resume"
              value={selectedResumeId}
              onChange={(event) =>
                handleResumeChange(event.target.value)
              }
              disabled={improving}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 disabled:opacity-60"
            >
              {resumes.map((resume) => (
                <option key={resume._id} value={resume._id}>
                  {resume.analysis.professionalSummary
                    ? resume.analysis.professionalSummary.slice(0, 70)
                    : `Saved resume — ${new Date(
                        resume.createdAt,
                      ).toLocaleDateString("en-GB")}`}
                  {" — "}
                  {new Date(resume.createdAt).toLocaleDateString("en-GB")}
                </option>
              ))}
            </select>

            {selectedResume && (
              <p className="mt-3 text-xs text-gray-500">
                Saved on{" "}
                {new Date(
                  selectedResume.createdAt,
                ).toLocaleDateString("en-GB")}
              </p>
            )}

            <button
              type="button"
              onClick={handleImproveResume}
              disabled={!selectedResume || improving}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black cursor-pointer px-5 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {improving ? (
                <>
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                  Improving resume...
                </>
              ) : improvements ? (
                <>
                  <RefreshCw className="h-5 w-5" />
                  Improve Again
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Improve Resume
                </>
              )}
            </button>
          </>
        )}
      </section>

      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {/* Initial state */}
      {!improvements && !improving && resumes.length > 0 && !error && (
        <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center">
          <Sparkles className="mx-auto mb-3 h-9 w-9 text-violet-500" />

          <h2 className="font-semibold">
            Ready to improve your resume?
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">
            Select a saved resume and click Improve Resume to
            generate suggestions tailored to the information in
            your analysis.
          </p>
        </div>
      )}

      {/* Loading state */}
      {improving && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-2xl border border-violet-200 bg-violet-50 p-8 text-center"
        >
          <LoaderCircle className="mx-auto mb-3 h-9 w-9 animate-spin text-violet-600" />

          <h2 className="font-semibold">Analyzing your resume</h2>

          <p className="mt-2 text-sm text-gray-600">
            Gemini is preparing improvements. This may take a
            little while.
          </p>
        </div>
      )}

      {/* Improvement results */}
      {improvements && !improving && (
        <div className="space-y-8">
          <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

            <div>
              <h2 className="font-semibold text-green-800">
                Resume improvements generated
              </h2>

              <p className="mt-1 text-sm text-green-700">
                Review the original and improved versions carefully.
                These suggestions do not modify your saved resume.
              </p>
            </div>
          </div>

          {/* Professional summary */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold">
              Professional Summary
            </h2>

            <div className="grid gap-4 lg:grid-cols-2">
              <TextComparisonCard
                title="Original"
                text={improvements.professionalSummary.original}
                variant="original"
              />

              <TextComparisonCard
                title="Improved"
                text={improvements.professionalSummary.improved}
                variant="improved"
                explanation={
                  improvements.professionalSummary.explanation
                }
                copied={
                  copiedText === "professional-summary"
                }
                onCopy={() =>
                  handleCopy(
                    improvements.professionalSummary.improved,
                    "professional-summary",
                  )
                }
              />
            </div>
          </section>

          {/* Project improvements */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold">
              Project Description Improvements
            </h2>

            {improvements.projectImprovements.length === 0 ? (
              <EmptySectionMessage message="No project descriptions were available to improve." />
            ) : (
              improvements.projectImprovements.map(
                (project, index) => (
                  <div
                    key={`project-${index}`}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <h3 className="mb-4 font-semibold">
                      Project {index + 1}
                    </h3>

                    <div className="grid gap-4 lg:grid-cols-2">
                      <TextComparisonCard
                        title="Original"
                        text={project.original}
                        variant="original"
                      />

                      <TextComparisonCard
                        title="Improved"
                        text={project.improved}
                        variant="improved"
                        explanation={project.explanation}
                        copied={copiedText === `project-${index}`}
                        onCopy={() =>
                          handleCopy(
                            project.improved,
                            `project-${index}`,
                          )
                        }
                      />
                    </div>
                  </div>
                ),
              )
            )}
          </section>

          {/* Experience improvements */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold">
              Experience Improvements
            </h2>

            {improvements.experienceImprovements.length === 0 ? (
              <EmptySectionMessage message="No experience descriptions were available to improve." />
            ) : (
              improvements.experienceImprovements.map(
                (experience, index) => (
                  <div
                    key={`experience-${index}`}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <h3 className="mb-4 font-semibold">
                      Experience {index + 1}
                    </h3>

                    <div className="grid gap-4 lg:grid-cols-2">
                      <TextComparisonCard
                        title="Original"
                        text={experience.original}
                        variant="original"
                      />

                      <TextComparisonCard
                        title="Improved"
                        text={experience.improved}
                        variant="improved"
                        explanation={experience.explanation}
                        copied={copiedText === `experience-${index}`}
                        onCopy={() =>
                          handleCopy(
                            experience.improved,
                            `experience-${index}`,
                          )
                        }
                      />
                    </div>
                  </div>
                ),
              )
            )}
          </section>

          {/* Keyword suggestions */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-violet-600" />

              <h2 className="text-lg font-bold">
                Suggested Keywords
              </h2>
            </div>

            {improvements.keywordSuggestions.length === 0 ? (
              <EmptySectionMessage message="No keyword suggestions were generated." />
            ) : (
              <div className="flex flex-wrap gap-2">
                {improvements.keywordSuggestions.map(
                  (keyword, index) => (
                    <span
                      key={`${keyword}-${index}`}
                      className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-800"
                    >
                      {keyword}
                    </span>
                  ),
                )}
              </div>
            )}

            <p className="mt-3 text-xs text-gray-500">
              Include a suggested keyword only if it accurately
              reflects your actual skills or experience.
            </p>
          </section>

          {/* General suggestions */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />

              <h2 className="text-lg font-bold">
                General Suggestions
              </h2>
            </div>

            {improvements.generalSuggestions.length === 0 ? (
              <EmptySectionMessage message="No additional suggestions were generated." />
            ) : (
              <ul className="space-y-3">
                {improvements.generalSuggestions.map(
                  (suggestion, index) => (
                    <li
                      key={`suggestion-${index}`}
                      className="flex items-start gap-3 text-sm leading-6 text-gray-700"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                      <span>{suggestion}</span>
                    </li>
                  ),
                )}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

interface TextComparisonCardProps {
  title: string;
  text: string;
  variant: "original" | "improved";
  explanation?: string;
  copied?: boolean;
  onCopy?: () => void;
}

function TextComparisonCard({
  title,
  text,
  variant,
  explanation,
  copied = false,
  onCopy,
}: TextComparisonCardProps) {
  const improved = variant === "improved";

  return (
    <div
      className={`rounded-xl border p-4 ${
        improved
          ? "border-violet-200 bg-violet-50/60"
          : "border-gray-200 bg-gray-50"
      }`}
    >
      <div className="mb-3 w-full flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold">{title}</h4>

        {improved && onCopy && (
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium transition hover:bg-gray-100 cursor-pointer"
            aria-label={`Copy ${title.toLowerCase()} text`}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}

            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>

      <p className="whitespace-pre-wrap text-start text-sm leading-6 text-gray-700">
        {text || "No text available."}
      </p>

      {improved && explanation && (
        <div className="mt-4 border-t border-violet-200 pt-3">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-violet-700">
            Why this is improved
          </p>

          <p className="text-sm leading-6 text-gray-600">
            {explanation}
          </p>
        </div>
      )}
    </div>
  );
}

function EmptySectionMessage({
  message,
}: {
  message: string;
}) {
  return (
    <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
      {message}
    </p>
  );
}
