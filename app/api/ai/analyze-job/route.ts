import { analyzeJobDescription } from "@/lib/ai/analyzeJob";
import { getUser } from "@/lib/getUser";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try{
        const user = await getUser();
        if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const jobDescription = body.jobDescription;

    if (
      typeof jobDescription !== "string" ||
      !jobDescription.trim()
    ) {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 },
      );
    }

    // Prevent large requests
    if (jobDescription.length > 20000) {
      return NextResponse.json(
{
          error:
            "Job description is too long. Please provide a shorter description.",
        },
        { status: 400 },
      );
    }

    const analysis = await analyzeJobDescription(
      jobDescription.trim(),
    );

    return NextResponse.json(
      {
        success: true,
        data: analysis,
      },
      { status: 200 },
    );

    }catch(error){
        console.error("Job analysis error:", error);
        return NextResponse.json({error: "Failed to analyze job description"}, {status: 500});
    }
}