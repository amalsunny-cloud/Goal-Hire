import { Application } from "@/types/application";
import { getOverdueFollowUps } from "./getOverdueFollowUps";
import { getUpcomingFollowUps } from "./getUpcomingFollowUps";

export function getReminderCount(applications: Application[]){
    return(
        getOverdueFollowUps(applications).length + getUpcomingFollowUps(applications).length
    )
}