import JobDescriptionAnalyzer from "@/components/ai/JobDescriptionAnalyzer";

export default function JobAnalyzerPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <JobDescriptionAnalyzer />
      </div>
    </main>
  );
}