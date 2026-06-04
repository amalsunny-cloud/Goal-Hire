
export interface Application {
    _id: string;
    company: string;
    role: string;
    status: | "Applied"
            | "Interview"
            | "Offer"
            | "Rejected";
    notes?: string;
    followUpDate?: string;
    jobUrl?: string;
    location?: string;
    salary?: string;
    createdAt: string;
    updatedAt: string;
}