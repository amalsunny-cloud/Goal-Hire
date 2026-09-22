import { z } from "zod";

export const profileSchema = z.object({
  phone: z.string().max(30).optional(),

  location: z.string().max(100).optional(),

  professionalTitle: z.string().max(100).optional(),

  bio: z.string().max(1000).optional(),

  skills: z
    .array(z.string().max(50))
    .max(50),

  experience: z
    .array(z.string().max(500))
    .max(20),

  education: z
    .array(z.string().max(500))
    .max(20),

  resumeUrl: z.string().url().optional().or(z.literal("")),

  portfolioUrl: z.string().url().optional().or(z.literal("")),

  githubUrl: z.string().url().optional().or(z.literal("")),

  linkedinUrl: z.string().url().optional().or(z.literal("")),
});

export type ProfileInput = z.infer<typeof profileSchema>;