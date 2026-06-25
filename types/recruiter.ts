export interface Recruiter{
    _id: string;
    applicationId: string;
    name?:string;
    email?:string;
    phone?:string;
    linkedin?:string;
    lastContact?:string;
    nextFollowUp?:string;
    notes?:string;
    createdAt:string;
    updatedAt:string;
}