"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Loader2,
  Sparkles,
} from "lucide-react";

import type { ResumeAnalysis } from "@/lib/ai/schemas/resumeAnalysis";

export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!resumeText.trim()) {
      setError("Please paste your resume before analyzing.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await fetch("/api/ai/analyze-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
        }),
      });

      const result = await response.json();
      console.log("Resume analysis result:", result);

      if (!response.ok) {
        throw new Error(result.error || "Failed to analyze the resume");
      }

      setAnalysis(result.data);
    } catch (error) {
      console.error("Resume analysis error:", error);

      setError(
        error instanceof Error ? error.message : "Failed to analyze the resume",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Resume Input */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-start gap-3">
          <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
            <FileText className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Paste Your Resume
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Paste your resume content below and let AI analyze your skills,
              experience, projects, and improvement areas.
            </p>
          </div>
        </div>

        <textarea
          value={resumeText}
          onChange={(event) => setResumeText(event.target.value)}
          placeholder="Paste your resume content here..."
          rows={18}
          maxLength={20000}
          disabled={loading}
          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <div className="mt-2 flex justify-end">
          <span className="text-xs text-slate-400">
            {resumeText.length}/20000
          </span>
        </div>

        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={loading || !resumeText.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 cursor-pointer px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Analyze Resume
              </>
            )}
          </button>
        </div>
      </section>

      {/* Analysis Result */}
      {analysis && (
        <section className="space-y-6">
          {/* Summary */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-900">
                Resume Analysis
              </h2>
            </div>

            <p className="text-sm leading-6 text-slate-600">
              {analysis.overallSummary}
            </p>
          </div>

          {/* Professional Summary */}
          <AnalysisSection
            title="Professional Summary"
            items={[analysis.professionalSummary]}
          />

          {/* Skills */}
          <div className="grid gap-6 lg:grid-cols-2">
            <AnalysisSection
              title="Technical Skills"
              items={analysis.technicalSkills}
            />

            <AnalysisSection title="Soft Skills" items={analysis.softSkills} />
          </div>

          {/* Experience & Education */}
          <div className="grid gap-6 lg:grid-cols-2">
            <AnalysisSection title="Experience" items={analysis.experience} />

            <AnalysisSection title="Education" items={analysis.education} />
          </div>

          {/* Projects & Certifications */}
          <div className="grid gap-6 lg:grid-cols-2">
            <AnalysisSection title="Projects" items={analysis.projects} />

            <AnalysisSection
              title="Certifications"
              items={analysis.certifications}
            />
          </div>

          {/* Keywords */}
          <AnalysisSection
            title="Important Keywords"
            items={analysis.keywords}
          />

          {/* Strengths */}
          <AnalysisSection
            title="Strengths"
            items={analysis.strengths}
            variant="success"
          />

          {/* Weaknesses */}
          <AnalysisSection
            title="Weaknesses / Missing Areas"
            items={analysis.weaknesses}
            variant="warning"
          />

          <AnalysisSection
            title="Career Positioning"
            items={analysis.careerPositioning}
          />

          <AnalysisSection
            title="Technical Skill Gaps"
            items={analysis.technicalSkillGaps}
            variant="warning"
          />

          <AnalysisSection
            title="Project Improvement Suggestions"
            items={analysis.projectImprovementSuggestions}
            variant="info"
          />

          <AnalysisSection
            title="Experience Improvement Suggestions"
            items={analysis.experienceImprovementSuggestions}
            variant="info"
          />
        </section>
      )}
    </div>
  );
}

interface AnalysisSectionProps {
  title: string;
  items: string[];
  variant?: "default" | "success" | "warning" | "info";
}

function AnalysisSection({
  title,
  items,
  variant = "default",
}: AnalysisSectionProps) {
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
        ) : (
          <Sparkles className={`h-5 w-5 ${style.icon}`} />
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
        <>
          <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50/70 p-6 text-center text-sm text-slate-500">
            <p className="text-sm text-slate-400">No information found.</p>
          </div>
        </>
      )}
    </div>
  );
}
