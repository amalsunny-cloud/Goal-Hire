"use client";

import { useState } from "react";
import type { JobAnalysis } from "@/lib/ai/schemas/jobAnalysis";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function JobDescriptionAnalyzer() {
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    const trimmedDescription = jobDescription.trim();

    if (!trimmedDescription) {
      setError("Please enter a job description.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await fetch("/api/ai/analyze-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription: trimmedDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze the job description.");
      }

      setAnalysis(data.data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard"
        className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-x-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
        Back to Dashboard
      </Link>
      {/* Input Section */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:p-6 lg:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
              <span className="text-lg">✦</span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  Job Description Analyzer
                </h2>

                <span className="rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  AI Powered
                </span>
              </div>

              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
                Paste a job description and let AI extract the important
                requirements, skills, responsibilities, and ATS keywords.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6 lg:p-7">
          <label
            htmlFor="job-description"
            className="mb-2.5 block text-sm font-semibold text-slate-800"
          >
            Job Description
          </label>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-1 transition-colors focus-within:border-blue-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
            <textarea
              id="job-description"
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              placeholder="Paste the complete job description here..."
              rows={14}
              maxLength={20000}
              disabled={loading}
              className="w-full resize-y rounded-xl border-0 bg-transparent px-4 py-4 text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:py-5"
            />
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-medium text-slate-400">
              {jobDescription.length.toLocaleString()} / 20,000 characters
            </p>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={loading || !jobDescription.trim()}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50 disabled:hover:shadow-none sm:w-auto"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Analyzing...
                </>
              ) : (
                <>
                  <span>✦</span>
                  Analyze Job
                </>
              )}
            </button>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-4 flex items-start gap-3 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3.5 text-sm text-rose-700"
            >
              <span className="mt-0.5">⚠️</span>
              <p>{error}</p>
            </div>
          )}
        </div>
      </section>

      {/* Analysis Section */}
      {analysis && (
        <section className="space-y-6">
          {/* Overview */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
            <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <h2 className="text-lg font-bold tracking-tight text-slate-900">
                  Job Overview
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Key information extracted from the job description.
                </p>
              </div>

              <div className="hidden rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-[11px] font-semibold text-blue-600 sm:block">
                AI Analysis
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Job Title
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {analysis.jobTitle}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Company
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {analysis.company || "Not specified"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Seniority
                </p>
                <p className="mt-2 text-sm font-medium text-slate-700">
                  {analysis.seniority || "Not specified"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Experience
                </p>
                <p className="mt-2 text-sm font-medium text-slate-700">
                  {analysis.experience || "Not specified"}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Summary
              </p>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                {analysis.summary}
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="grid gap-5 lg:grid-cols-2">
            <AnalysisList
              title="Must-Have Skills"
              items={analysis.mustHaveSkills}
              variant="red"
            />

            <AnalysisList
              title="Nice-to-Have Skills"
              items={analysis.niceToHaveSkills}
              variant="yellow"
            />

            <AnalysisList
              title="Technical Skills"
              items={analysis.technicalSkills}
              variant="green"
            />

            <AnalysisList
              title="Soft Skills"
              items={analysis.softSkills}
              variant="blue"
            />
          </div>

          {/* Responsibilities & Qualifications */}
          <div className="grid gap-5 lg:grid-cols-2">
            <AnalysisList
              title="Responsibilities"
              items={analysis.responsibilities}
              variant="purple"
            />

            <AnalysisList
              title="Qualifications"
              items={analysis.qualifications}
              variant="orange"
            />
          </div>

          {/* Education */}
          <AnalysisList
            title="Education Requirements"
            items={analysis.education}
            variant="blue"
          />

          {/* ATS Keywords */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <h2 className="text-lg font-bold tracking-tight text-slate-900">
                  ATS Keywords
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Important keywords identified from the job description.
                </p>
              </div>

              <div className="hidden rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-[11px] font-semibold text-blue-600 sm:block">
                {analysis.keywords.length} Keywords
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {analysis.keywords.length > 0 ? (
                analysis.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition-colors hover:border-blue-200 hover:bg-blue-100"
                  >
                    {keyword}
                  </span>
                ))
              ) : (
                <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-4 py-5 text-sm text-slate-500">
                  No keywords identified.
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

interface AnalysisListProps {
  title: string;
  items: string[];
  variant?: "red" | "yellow" | "blue" | "green" | "purple" | "orange";
}

function AnalysisList({ title, items, variant = "blue" }: AnalysisListProps) {
  const styles = {
    red: {
      container: "border-rose-100 bg-rose-50/50",
      icon: "bg-rose-100 text-rose-600",
      title: "text-rose-800",
      bullet: "bg-rose-500",
    },
    yellow: {
      container: "border-amber-100 bg-amber-50/50",
      icon: "bg-amber-100 text-amber-600",
      title: "text-amber-800",
      bullet: "bg-amber-500",
    },
    blue: {
      container: "border-blue-100 bg-blue-50/50",
      icon: "bg-blue-100 text-blue-600",
      title: "text-blue-800",
      bullet: "bg-blue-500",
    },
    green: {
      container: "border-emerald-100 bg-emerald-50/50",
      icon: "bg-emerald-100 text-emerald-600",
      title: "text-emerald-800",
      bullet: "bg-emerald-500",
    },
    purple: {
      container: "border-purple-100 bg-purple-50/50",
      icon: "bg-purple-100 text-purple-600",
      title: "text-purple-800",
      bullet: "bg-purple-500",
    },
    orange: {
      container: "border-orange-100 bg-orange-50/50",
      icon: "bg-orange-100 text-orange-600",
      title: "text-orange-800",
      bullet: "bg-orange-500",
    },
  };

  const currentStyle = styles[variant];

  return (
    <div
      className={`rounded-3xl border p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6 ${currentStyle.container}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${currentStyle.icon}`}
        >
          •
        </div>

        <h2
          className={`text-lg font-bold tracking-tight ${currentStyle.title}`}
        >
          {title}
        </h2>
      </div>

      {items.length > 0 ? (
        <ul className="mt-5 space-y-3">
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="flex gap-3 rounded-xl border border-white/80 bg-white/70 px-3.5 py-3 text-sm leading-6 text-slate-700"
            >
              <span
                aria-hidden="true"
                className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${currentStyle.bullet}`}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-white/60 px-4 py-5">
          <p className="text-sm text-slate-500">
            Not specified in the job description.
          </p>
        </div>
      )}
    </div>
  );
}
