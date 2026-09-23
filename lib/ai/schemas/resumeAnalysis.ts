import { z } from "zod";

export const resumeAnalysisSchema = z.object({
  professionalSummary: z.string(),

  technicalSkills: z.array(z.string()),

  softSkills: z.array(z.string()),

  experience: z.array(z.string()),

  education: z.array(z.string()),

  projects: z.array(z.string()),

  certifications: z.array(z.string()),

  keywords: z.array(z.string()),

  strengths: z.array(z.string()),

  weaknesses: z.array(z.string()),

  careerPositioning: z.array(z.string()),

  technicalSkillGaps: z.array(z.string()),

  projectImprovementSuggestions: z.array(z.string()),

  experienceImprovementSuggestions: z.array(z.string()),

  improvementSuggestions: z.array(z.string()),

  overallSummary: z.string(),
});

export type ResumeAnalysis = z.infer<typeof resumeAnalysisSchema>;