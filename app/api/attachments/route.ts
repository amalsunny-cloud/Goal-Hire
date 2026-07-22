import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { Attachment } from "@/models/Attachment";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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

    const body = await req.json();

    const attachment = await Attachment.create(body);

    return NextResponse.json(attachment);
    
  } catch (error) {
    console.error("Attachment errorr:", error);

    return NextResponse.json(
      {
        error: "Failed to save attachment",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const applicationId = searchParams.get("applicationId");

    const attachments = await Attachment.find({
      applicationId,
    });

    return NextResponse.json(attachments);
  } catch (error) {
    console.error(error);
  }
}
