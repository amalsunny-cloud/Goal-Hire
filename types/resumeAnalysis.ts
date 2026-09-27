import type { ResumeAnalysis as ResumeAnalysisData } from "@/lib/ai/schemas/resumeAnalysis";

export interface SavedResumeAnalysis {
  _id: string;
  userId: string;
  resumeText: string;
  analysis: ResumeAnalysisData;
  createdAt: string;
  updatedAt: string;
}