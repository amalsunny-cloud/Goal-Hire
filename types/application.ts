export type ApplicationStatus =
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected";

export interface Application {
  _id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  notes?: string;
  followUpDate?: string;
  jobUrl?: string;
  location?: string;
  salary?: string;
  source?: string;
  createdAt: string;
  updatedAt: string;
}