import { z } from "zod";

export const jobAnalysisSchema = z.object({
    jobTitle: z.string(),
    company: z.string(),
    seniority: z.string(),
    experience: z.string(),
    technicalSkills: z.array(z.string()),
    softSkills: z.array(z.string()),
    mustHaveSkills: z.array(z.string()),
    niceToHaveSkills: z.array(z.string()),
    education: z.array(z.string()),
    responsibilities: z.array(z.string()),
    qualifications: z.array(z.string()),
    keywords: z.array(z.string()),
    summary: z.string(),
})

export type JobAnalysis = z.infer<typeof jobAnalysisSchema>;