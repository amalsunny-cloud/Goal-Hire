import { Application } from "@/types/application";

export function getUpcomingFollowUps(applications: Application[]){
    const today = new Date();
    const nextWeek = new Date();

    nextWeek.setDate(today.getDate() +7);


    return applications.filter((app)=>{
        if(!app.followUpDate){
            return false;
        }

        const followUp = new Date(app.followUpDate);

        return(followUp>=today && followUp<=nextWeek)
    })
}