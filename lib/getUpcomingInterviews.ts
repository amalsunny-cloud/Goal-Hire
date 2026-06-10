import { Interview } from "@/models/Interview";
import { connectDB } from "./db";


export async function getUpcomingInterviews(){
    await connectDB();

    const today = new Date();
    return Interview.find({
        date: {
            $gte: today,
        },
    }).sort({
        date:1,
    }).lean();
}