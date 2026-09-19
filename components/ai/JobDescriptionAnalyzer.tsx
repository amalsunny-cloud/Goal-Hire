"use client";

import { useState } from "react";
import type { JobAnalysis } from "@/lib/ai/schemas/jobAnalysis";

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
        throw new Error(
          data.error || "Failed to analyze the job description.",
        );
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
      {/* Input Section */}
      <section className="rounded-xl bg-slate-400/10 p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Job Description Analyzer
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Paste a job description and let AI extract the important
            requirements, skills, responsibilities, and ATS keywords.
          </p>
        </div>

        <label
          htmlFor="job-description"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Job Description
        </label>

        <textarea
          id="job-description"
          value={jobDescription}
          onChange={(event) => setJobDescription(event.target.value)}
          placeholder="Paste the complete job description here..."
          rows={14}
          maxLength={20000}
          disabled={loading}
          className="w-full resize-y rounded-lg border border-gray-300 px-6 py-6 text-sm outline-none transition focus:border-gray-200 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
        />

        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {jobDescription.length.toLocaleString()} / 20,000 characters
          </p>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={loading || !jobDescription.trim()}
            className="rounded-lg cursor-pointer bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Job"}
          </button>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {error}
          </p>
        )}
      </section>

      {/* Analysis Section */}
      {analysis && (
        <section className="space-y-6">
          {/* Overview */}
          <div className="rounded-xl  bg-slate-400/10 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Job Overview
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <h2 className="font-bold uppercase">
                  Job Title
                </h2>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  {analysis.jobTitle}
                </p>
              </div>

              <div>
                <h2 className="font-bold uppercase">
                  Company
                </h2>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  {analysis.company || "Not specified"}
                </p>
              </div>

              <div>
                <h2 className="font-bold uppercase">
                  Seniority
                </h2>
                <p className="mt-1 text-sm text-gray-700">
                  {analysis.seniority || "Not specified"}
                </p>
              </div>

              <div>
                <h2 className="font-bold uppercase">
                  Experience
                </h2>
                <p className="mt-1 text-sm text-gray-700">
                  {analysis.experience || "Not specified"}
                </p>
              </div>
            </div>

            <div className="mt-5 border-t border-gray-500/30 pt-5">
              <h2 className="font-bold uppercase">
                Summary
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-700">
                {analysis.summary}
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="grid gap-6 lg:grid-cols-2">
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
          <div className="grid gap-6 lg:grid-cols-2">
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
          <div className="rounded-xl bg-slate-400/10 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              ATS Keywords
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {analysis.keywords.length > 0 ? (
                analysis.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
                  >
                    {keyword}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500">
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
    container: "bg-red-50",
    title: "text-red-800",
    bullet: "text-red-500",
  },
  yellow: {
    container: "bg-yellow-50",
    title: "text-yellow-800",
    bullet: "text-yellow-500",
  },
  blue: {
    container: "bg-blue-100",
    title: "text-blue-800",
    bullet: "text-blue-500",
  },
  green: {
    container: "bg-green-50",
    title: "text-green-800",
    bullet: "text-green-500",
  },
  purple: {
    container: "bg-purple-50",
    title: "text-purple-800",
    bullet: "text-purple-500",
  },
  orange: {
    container: "bg-orange-50",
    title: "text-orange-800",
    bullet: "text-orange-500",
  },
};

  const currentStyle = styles[variant];

  return (
    <div className={`rounded-xl ${currentStyle.container} p-6 shadow-sm`}>
      <h2 className={`text-lg font-semibold ${currentStyle.title}`}>
        {title}
      </h2>

      {items.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="flex gap-2 text-sm leading-6 text-gray-700"
            >
              <span aria-hidden="true">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-gray-500">
          Not specified in the job description.
        </p>
      )}
    </div>
  );
}