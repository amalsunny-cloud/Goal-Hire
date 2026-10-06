import { NextRequest, NextResponse } from "next/server";

import { getUser } from "@/lib/getUser";
import { JobAnalysis } from "@/models/JobAnalysis";
import { jobAnalysisSchema } from "@/lib/ai/schemas/jobAnalysis";
import { connectDB } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    console.log("Received job analysis request in body:", body);

    const jobDescription = body.jobDescription;
    console.log("Received job description:", jobDescription);

    if (
      typeof jobDescription !== "string" ||
      !jobDescription.trim()
    ) {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 },
      );
    }

    console.log("Before job analysis safeparse:", body.analysis);

    const analysisResult = jobAnalysisSchema.safeParse(
      body.analysis,
    );

    console.log("After analysisResult:", analysisResult);

    if (!analysisResult.success) {
      console.error(
        "Job analysis validation error:",
        analysisResult.error,
      );

      return NextResponse.json(
        { error: "Invalid job analysis data" },
        { status: 400 },
      );
    }

    await connectDB();

    console.log("Before job analysis to database for user:", user.userId);
    const jobAnalysis = await JobAnalysis.create({
      userId: user.userId,
      jobDescription: jobDescription.trim(),
      analysis: analysisResult.data,
    });

    return NextResponse.json(
      {
        success: true,
        data: jobAnalysis,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create job analysis error:", error);

    return NextResponse.json(
      { error: "Failed to save job analysis" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    await connectDB();

    const analyses = await JobAnalysis.find({
      userId: user.userId,
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        data: analyses,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get job analyses error:", error);

    return NextResponse.json(
      { error: "Failed to fetch job analyses" },
      { status: 500 },
    );
  }
}