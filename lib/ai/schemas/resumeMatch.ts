import { z } from "zod";

export const resumeMatchSchema = z.object({
    matchingSkills: z.array(z.string()),
    missingSkills: z.array(z.string()),
    matchingExperience: z.array(z.string()),
    strengths: z.array(z.string()),
    improvementSuggestions: z.array(z.string()),
    summary: z.string(),
});

export type ResumeMatch = z.infer<typeof resumeMatchSchema>;