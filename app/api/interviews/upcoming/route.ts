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

    const applications = await Application.find({
      userId: user.userId,
    }).select("_id");

    const applicationIds = applications.map((app) => app._id);

    const interviews = await Interview.find({
      applicationId: {
        $in: applicationIds,
      },
      date: {
        $gte: new Date(),
      },
    })
      .sort({
        date: 1,
      })
      .lean();

    return NextResponse.json(interviews);
  } catch (error) {
    console.error("Upcoming Interviews Error", error);
    return NextResponse.json({
        error: "Failed to fetch interviews"
    },{
        status:500
    })
  }
}
