import { createTimelineEvent } from "@/lib/createTimelineEvent";
import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { Application } from "@/models/Application";
import { NextResponse } from "next/server";

export async function GET(){
    try{
    await connectDB();
    const user = await getUser();

    if(!user){
        return NextResponse.json({
            error: "Unauthorized"
        },{
            status: 401
        });
    }

    const applications = await Application.find({userId:user.userId}).sort({createdAt: -1});
     
    return NextResponse.json(applications);
}catch(error){
    return NextResponse.json({ error: "Failed to fetch Applications"}, { status: 500 });
}
}



// Create Applications

export async function POST(req: Request){
    try{
    await connectDB();
    const user = await getUser();

    if(!user){
        return NextResponse.json({ error: "Unauthorized"}, { status: 401})
    }

    const body = await req.json();
    const {company,role} = body;

    if(!company || !role){
        return NextResponse.json({
            error:"Company and role are required"
        },{
            status: 400
        })
    }
    const newApplication = await Application.create({...body, userId: user.userId});

    await createTimelineEvent(newApplication._id.toString(),"application_created","Application created")

    return NextResponse.json(newApplication,{
        status: 201
    });

    }catch(error){
        console.error(error);
        
        return NextResponse.json({ error : "Failed to Create Application"}, { status: 500 });
    }
}