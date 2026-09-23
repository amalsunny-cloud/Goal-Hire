export interface Profile {
  _id: string;
  userId: string;

  phone?: string;
  location?: string;
  professionalTitle?: string;
  bio?: string;

  skills: string[];
  experience: string[];
  education: string[];

  resumeUrl?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;

  createdAt: string;
  updatedAt: string;
}