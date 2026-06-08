

export interface Interview {
    _id: string;
    applicationId: string;
    round: string;
    date?:string;
    outcome:
        | "Pending"
        | "Passed"
        | "Failed";
    
    notes?: string;
    createdAt: string;
    updatedAt: string;
}