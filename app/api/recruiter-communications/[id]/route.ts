import { connectDB } from "@/lib/db";
import { RecruiterCommunication } from "@/models/RecruiterCommunication";
import { NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}
export async function PATCH(req: Request, { params }: Props) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const communication = await RecruiterCommunication.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
      },
    );

    if (!communication) {
      return NextResponse.json(
        {
          error: "Communication not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(communication);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to update communication",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(req: Request, { params }: Props) {
  try {
    await connectDB();
    const { id } = await params;
    const communication = await RecruiterCommunication.findByIdAndDelete(id);

    if (!communication) {
      return NextResponse.json(
        {
          error: "Communication not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      message: "Communication deletd",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to delete communication",
      },
      {
        status: 500,
      },
    );
  }
}

