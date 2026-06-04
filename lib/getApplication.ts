import { Application } from "@/models/Application";
import { connectDB } from "./db";

export async function getApplication(id: string, userId: string){
    await connectDB();
    return Application.findOne({
        _id: id,
        userId,
    });
}