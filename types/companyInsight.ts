export interface CompanyInsight{
    company:string;
    recruiterCount: number;
    communicationCount: number;
    responseCount: number;
    responseRate: number;
    lastContact?:string;
    recruiters: string[];
}