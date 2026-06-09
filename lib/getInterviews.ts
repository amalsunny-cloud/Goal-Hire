import { Interview } from "@/models/Interview";
import { connectDB } from "./db";


export async function getInterviews(applicationId: string){
    await connectDB();
    return Interview.find({
        applicationId,
    }).sort({
        date: 1,
    }).lean();
}