
import { z } from "zod";

export const resumeImprovementSchema = z.object({
  professionalSummary: z.object({
    original: z.string(),
    improved: z.string(),
    explanation: z.string(),
  }),

  projectImprovements: z.array(
    z.object({
      original: z.string(),
      improved: z.string(),
      explanation: z.string(),
    }),
  ),

  experienceImprovements: z.array(
    z.object({
      original: z.string(),
      improved: z.string(),
      explanation: z.string(),
    }),
  ),

  keywordSuggestions: z.array(z.string()),
  generalSuggestions: z.array(z.string()),
});

export type ResumeImprovement = z.infer<typeof resumeImprovementSchema>;
