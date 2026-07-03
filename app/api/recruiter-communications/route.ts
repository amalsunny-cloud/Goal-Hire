import { connectDB } from "@/lib/db";
import { RecruiterCommunication } from "@/models/RecruiterCommunication";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const communication = await RecruiterCommunication.create(body);

    return NextResponse.json(communication, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to create communication",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    console.log("searchParams in GET:",searchParams);
    

    const recruiterId = searchParams.get("recruiterId");
    console.log("recruiterId is:",recruiterId);
    
    const applicationId = searchParams.get("applicationId");
    console.log("applicationId is:",applicationId);


    // Fetch communications for a single recruiter
    if (recruiterId) {
      const communications = await RecruiterCommunication.find({
        recruiterId,
      }).sort({
        date: -1,
      });

      return NextResponse.json(communications);
    }

    // Fetch communications for an application
    if (applicationId) {
      const communications = await RecruiterCommunication.find({
        applicationId,
      }).sort({
        date: -1,
      });

      return NextResponse.json(communications);
    }

    return NextResponse.json(
      {
        error: "Recruiter ID or Application ID required",
      },
      {
        status: 400,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch communications",
      },
      {
        status: 500,
      }
    );
  }
}