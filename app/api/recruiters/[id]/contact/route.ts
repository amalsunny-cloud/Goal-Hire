import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { Recruiter } from "@/models/Recruiter";
import { NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}
export async function PATCH(req: Request, { params }: Props) {
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

    const { id } = await params;
    const today = new Date();
    const nextFollowUp = new Date();
    nextFollowUp.setDate(today.getDate() + 7);

    const recruiter = await Recruiter.findByIdAndUpdate(
      id,
      {
        lastContact: today,
        nextFollowUp,
      },
      {
        new: true,
      },
    );

    return NextResponse.json(recruiter);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to update recruiter",
      },
      {
        status: 500,
      },
    );
  }
}
