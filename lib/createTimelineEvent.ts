import { TimelineEvent } from "@/models/TimelineEvent";

export async function createTimelineEvent(applicationId: string, type: string, message: string){
    return TimelineEvent.create({
        applicationId,
        type,
        message
    })
}