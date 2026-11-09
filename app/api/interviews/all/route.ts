import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { Application } from "@/models/Application";
import { Interview } from "@/models/Interview";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        await connectDB();

        const user = await getUser();

        if(!user){
            return NextResponse.json({
                error: "Unauthorized",
            },{
                status: 401
            })
        }

        const applications = await Application.find({
            userId: user.userId,
        }).lean();

        const ids = applications.map(app=>app._id);

        const interviews = await Interview.find({
            applicationId: {
                $in: ids,
            },
        }).lean();

        return NextResponse.json(interviews);
    }catch(error){
    console.error(error);
    return NextResponse.json({
        error: "Server Error"
    },{
        status:500
    })
    }
}