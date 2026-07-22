import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { Application } from "@/models/Application";
import { Recruiter } from "@/models/Recruiter";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const { searchParams } = new URL(req.url);
    

    const applicationId = searchParams.get("applicationId");

    if (!applicationId) {
      return NextResponse.json(
        {
          error: "Application ID is required",
        },
        {
          status: 400,
        },
      );
    }

    const application = await Application.findOne({
      _id: applicationId,
      userId: user.userId,
    });

    if (!application) {
      return NextResponse.json(
        {
          error: "Application not found",
        },
        {
          status: 404,
        },
      );
    }
    const recruiters = await Recruiter.find({
      applicationId,
    });

    console.log("Recruiter is:", recruiters);
    return NextResponse.json(recruiters);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to fetch recruiters",
      },
      {
        status: 500,
      },
    );
  }
}

// Create recruiter

export async function POST(req: Request) {
  try {
    await connectDB();
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const body = await req.json();
    const application = await Application.findOne({
      _id: body.applicationId,
      userId: user.userId,
    });

    if (!application) {
      return NextResponse.json(
        {
          error: "Application not found",
        },
        {
          status: 404,
        },
      );
    }

    const recruiter = await Recruiter.create(body);

    return NextResponse.json(recruiter, {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to create recruiter",
      },
      {
        status: 500,
      },
    );
  }
}
