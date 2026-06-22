import { Application } from "@/types/application";

export function getSourceAnalytics(applications: Application[]){
    const analytics : Record<string,number>={};
    applications.forEach((app)=>{
        const source = app.source || "Other";

        analytics[source] = (analytics[source] || 0) +1;
    });
    return analytics;
}