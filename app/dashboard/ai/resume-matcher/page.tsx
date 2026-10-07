import ResumeJobMatcher from "@/components/ai/ResumeJobMatcher";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ResumeMatcherPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <Link
        href="/dashboard"
        className="group inline-flex items-center mb-4 gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-x-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
        Back to Dashboard
      </Link>
      

      <ResumeJobMatcher />
    </main>
  );
}
