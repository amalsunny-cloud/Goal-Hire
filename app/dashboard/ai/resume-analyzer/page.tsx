import ResumeAnalyzer from "@/components/ai/ResumeAnalyzer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ResumeAnalyzerPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <Link
        href="/dashboard"
        className="group inline-flex items-center mb-4 gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-x-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
        Back to Dashboard
      </Link>
      {/* Page Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
            AI Tools
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          AI Resume Analyzer
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Analyze your resume with AI to identify your skills, experience,
          strengths, weaknesses, and areas for improvement.
        </p>
      </div>

      <ResumeAnalyzer />
    </main>
  );
}
