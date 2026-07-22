import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { RecruiterCommunication } from "@/models/RecruiterCommunication";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const user = await getUser();

if (!user) {
    return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
    );
}

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

    const user = await getUser();

    if (!user) {
        return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);
  
    const recruiterId = searchParams.get("recruiterId");
    
    const applicationId = searchParams.get("applicationId");
    

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