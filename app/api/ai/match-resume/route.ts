import { matchResume } from "@/lib/ai/matchResume";
import { jobAnalysisSchema } from "@/lib/ai/schemas/jobAnalysis";
import { resumeAnalysisSchema } from "@/lib/ai/schemas/resumeAnalysis";
import { getUser } from "@/lib/getUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("Inside the post resume match route")
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    console.log("MATCH REQUEST BODY:", body);
console.log("RESUME ANALYSIS:", body.resumeAnalysis);
console.log("JOB ANALYSIS:", body.jobAnalysis);

    const resumeResult = resumeAnalysisSchema.safeParse(
      body.resumeAnalysis,
    );

    if (!resumeResult.success) {
      console.error(
    "Resume analysis validation error:",
    resumeResult.error,
  );
      return NextResponse.json(
        { error: "Invalid resume analysis data" },
        { status: 400 },
      );
    }

    const jobResult = jobAnalysisSchema.safeParse(body.jobAnalysis);

    if (!jobResult.success) {
      console.error(
    "Job analysis validation error:",
    jobResult.error,
  );
      return NextResponse.json(
        { error: "Invalid job analysis data" },
        { status: 400 },
      );
    }

    const match = await matchResume({
      resumeAnalysis: resumeResult.data,
      jobAnalysis: jobResult.data,
    });

    return NextResponse.json(
      {
        success: true,
        data: match,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Resume matching error:", error);

    const status =
      typeof error === "object" && error !== null && "status" in error
        ? (error as { status?: number }).status
        : undefined;

    if (
      status === 429 ||
      status === 500 ||
      status === 502 ||
      status === 503 ||
      status === 504
    ) {
      return NextResponse.json(
        {
          error:
            "The AI service is currently experiencing high demand. Please try again in a moment.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        error: "Failed to match the resume with the job.",
      },
      { status: 500 },
    );
  }
}
