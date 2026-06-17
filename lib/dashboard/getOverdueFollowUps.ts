import { Application } from "@/types/application";

export function getOverdueFollowUps(applications: Application[]){
    const today = new Date();

    return applications.filter((app)=>{
        if(!app.followUpDate){
            return false;
        }

        return(new Date(app.followUpDate) < today);
    })

}