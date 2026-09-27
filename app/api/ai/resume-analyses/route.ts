import { NextRequest, NextResponse } from "next/server";

import { getUser } from "@/lib/getUser";
import { ResumeAnalysis } from "@/models/ResumeAnalysis";
import { resumeAnalysisSchema } from "@/lib/ai/schemas/resumeAnalysis";
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

    const resumeText = body.resumeText;

    if (
      typeof resumeText !== "string" ||
      !resumeText.trim()
    ) {
      return NextResponse.json(
        { error: "Resume text is required" },
        { status: 400 },
      );
    }

    const analysisResult = resumeAnalysisSchema.safeParse(
      body.analysis,
    );

    if (!analysisResult.success) {
      return NextResponse.json(
        { error: "Invalid resume analysis data" },
        { status: 400 },
      );
    }

    await connectDB();

    const resumeAnalysis = await ResumeAnalysis.create({
      userId: user.userId,
      resumeText: resumeText.trim(),
      analysis: analysisResult.data,
    });

    return NextResponse.json(
      {
        success: true,
        data: resumeAnalysis,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create resume analysis error:", error);

    return NextResponse.json(
      { error: "Failed to save resume analysis" },
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

    const analyses = await ResumeAnalysis.find({
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
    console.error("Get resume analyses error:", error);

    return NextResponse.json(
      { error: "Failed to fetch resume analyses" },
      { status: 500 },
    );
  }
}