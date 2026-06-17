import { createTimelineEvent } from "@/lib/createTimelineEvent";
import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { Application } from "@/models/Application";
import { Interview } from "@/models/Interview";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const user = await getUser();
    console.log("user is:", user);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log("body is:", body);

    const { applicationId, round, date, notes } = body;
    console.log("ApplicationId is:", applicationId);
    console.log("round is:", round);
    console.log("date is:", date);
    console.log("notes is:", notes);

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

    const interview = await Interview.create({
      applicationId,
      round,
      date,
      notes,
    });

    await createTimelineEvent(
      interview.applicationId.toString(),
      "interview_added",
      `Interview added: ${interview.round}`,
    );

    return NextResponse.json(interview, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create interivew" },
      {
        status: 500,
      },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applicationId = req.nextUrl.searchParams.get("applicationId");

    if (!applicationId) {
      return NextResponse.json(
        {
          error: "applicationId required",
        },
        { status: 400 },
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
        { status: 404 },
      );
    }

    const interviews = await Interview.find({
      applicationId,
    }).sort({
      date: 1,
    });

    return NextResponse.json(interviews);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to fetch interviews",
      },
      { status: 500 },
    );
  }
}
