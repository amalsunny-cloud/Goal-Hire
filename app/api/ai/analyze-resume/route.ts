import { NextRequest, NextResponse } from "next/server";

import { analyzeResume } from "@/lib/ai/analyzeResume";
import { getUser } from "@/lib/getUser";

export async function POST(request: NextRequest) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const resumeText = body.resumeText;

    if (typeof resumeText !== "string" || !resumeText.trim()) {
      return NextResponse.json(
        { error: "Resume text is required" },
        { status: 400 },
      );
    }

    if (resumeText.length > 20000) {
      return NextResponse.json(
        {
          error: "Resume is too long. Please provide a shorter resume.",
        },
        { status: 400 },
      );
    }

    const analysis = await analyzeResume(resumeText.trim());

    return NextResponse.json(
      {
        success: true,
        data: analysis,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Resume analysis error:", error);

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
        error: "Failed to analyze the resume. Please try again.",
      },
      { status: 500 },
    );
  }
}
