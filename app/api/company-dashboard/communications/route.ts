import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";

import { Application } from "@/models/Application";
import { Recruiter } from "@/models/Recruiter";
import { RecruiterCommunication } from "@/models/RecruiterCommunication";

export async function GET() {
  try {
    await connectDB();

    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const applications = await Application.find({
      userId: user.userId,
    });

    const applicationIds = applications.map(
      (application) => application._id
    );

    const recruiters = await Recruiter.find({
      applicationId: {
        $in: applicationIds,
      },
    });

    const recruiterIds = recruiters.map(
      (recruiter) => recruiter._id
    );

    const communications =
      await RecruiterCommunication.find({
        recruiterId: {
          $in: recruiterIds,
        },
      }).sort({
        createdAt: -1,
      });

    return NextResponse.json(
      communications
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch communications",
      },
      {
        status: 500,
      }
    );
  }
}