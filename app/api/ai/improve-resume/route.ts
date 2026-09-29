
import { NextResponse } from "next/server";

import { getUser } from "@/lib/getUser";
import { improveResume } from "@/lib/ai/improveResume";

export async function POST(request: Request) {
  try {
    // 1. Authenticate the user.
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 },
      );
    }

    // 2. Read the request body.
    const body: unknown = await request.json();

    if (
      !body ||
      typeof body !== "object" ||
      !("resumeAnalysis" in body)
    ) {
      return NextResponse.json(
        { error: "Resume analysis is required." },
        { status: 400 },
      );
    }

    // 3. Generate resume improvements.
    const improvements = await improveResume(body.resumeAnalysis);

    // 4. Return the result.
    return NextResponse.json(
      { improvements },
      { status: 200 },
    );
  } catch (error: unknown) {
    // Handle malformed JSON requests.
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 },
      );
    }

    // Log unexpected errors on the server.
    console.error("Resume improvement error:", error);

    const status =
      error &&
      typeof error === "object" &&
      "status" in error &&
      typeof error.status === "number"
        ? error.status
        : undefined;

    if (status === 429 || (status !== undefined && status >= 500)) {
      return NextResponse.json(
        {
          error:
            "The AI service is temporarily unavailable. Please try again later.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { error: "Unable to improve the resume. Please try again." },
      { status: 500 },
    );
  }
}
