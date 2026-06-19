import { connectDB } from "@/lib/db";
import { TimelineEvent } from "@/models/TimelineEvent";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ applicationId: string }> },
) {
    try{
      await connectDB();
      const {applicationId} = await params;

      const events = await TimelineEvent.find({
        applicationId
      }).sort({
        createdAt: -1,
      })

      return NextResponse.json(events)
    }catch(error){
      return NextResponse.json({
        error: "Failed to fetch timeline",
      },{
        status: 500
      })
    }
}
