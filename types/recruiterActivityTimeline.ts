export interface RecruiterActivityTimelineEvent{
    id:string;
    date:string;
    title:string;
    description?:string;
    type:
        |"Recruiter"
        |"Communication"
        |"Response";
}