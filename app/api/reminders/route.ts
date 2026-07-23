import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { Application } from "@/models/Application";
import { Interview } from "@/models/Interview";
import { NextResponse } from "next/server";

export async function GET() {
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

    const today = new Date();
    const next7Days = new Date();
    next7Days.setDate(today.getDate() + 7);

    const applications = await Application.find({
      userId: user.userId,
    }).select("_id");

    const applicationIds = applications.map((app) => app._id);

    const followUps = await Application.find({
      userId: user.userId,
      followUpDate: {
        $gte: today,
        $lte: next7Days,
      },
    });

    const interviews = await Interview.find({
      applicationId: {
        $in: applicationIds,
      },
      date: {
        $gte: today,
        $lte: next7Days,
      },
    });

    return NextResponse.json({
      followUps,
      interviews,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch reminders",
      },
      {
        status: 500,
      },
    );
  }
}
