import { Application } from "@/types/application";

interface SourceAnalytics{
    applications: number;
    interviews: number;
    offers: number;
}
export function getSourceSuccessAnalytics(applications: Application[]){
    const analytics: Record<string, SourceAnalytics> = {};

    applications.forEach((app)=>{
        const source = app.source || "Other";

        if(!analytics[source]){
            analytics[source] = {
                applications: 0,
                interviews: 0,
                offers: 0,
            }
        }

        analytics[source].applications++;

        if(app.status === "Interview"){
            analytics[source].interviews++;
        }
        if(app.status === "Offer"){
            analytics[source].offers++;
        }
    });

    return analytics;
}