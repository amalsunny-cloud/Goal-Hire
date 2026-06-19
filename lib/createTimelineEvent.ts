import { TimelineEvent } from "@/models/TimelineEvent";

export async function createTimelineEvent(applicationId: string, type: string, message: string){
    console.log("createTimelineEvent called.")
    return TimelineEvent.create({
        applicationId,
        type,
        message
    })
}