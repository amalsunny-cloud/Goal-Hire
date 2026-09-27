import type { JobAnalysis as JobAnalysisData } from "@/lib/ai/schemas/jobAnalysis";

export interface SavedJobAnalysis {
  _id: string;
  userId: string;
  jobDescription: string;
  analysis: JobAnalysisData;
  createdAt: string;
  updatedAt: string;
}