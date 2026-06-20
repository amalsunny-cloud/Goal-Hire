import { connectDB } from "@/lib/db";
import { Attachment } from "@/models/Attachment";
import { NextResponse } from "next/server";


export async function POST(req: Request){
    try{
        await connectDB();
                    console.log("after connectDB in backend:");

        const body = await req.json();
            console.log("body in backend route:",body);


            console.log("just before the attachment line");
            
        const attachment = await Attachment.create(body);
        console.log("attachment created");
            console.log("attachment in backend route:",attachment);

        return NextResponse.json(attachment);
        
    }catch(error){
        console.error("Attachment errorr:",error);
        
        return NextResponse.json({
            error: "Failed to save attachment"
        },{
            status: 500
        })
    }
}



export async function GET(req: Request){
    await connectDB();

    console.log("req in GET route is:",req);
    console.log("req.url in GET route is:",req.url);
    
    const {searchParams} = new URL(req.url)
    console.log("searchParams in GET route:",searchParams);
    
    const applicationId = searchParams.get("applicationId")

    console.log("applicationId in attachment route:",applicationId);

    const attachments = await Attachment.find({
        applicationId
    });

    console.log("Attachments in GET in route:",attachments);
    
    return NextResponse.json(attachments);
    
}