import { connectDB } from "@/lib/db";
import { Attachment } from "@/models/Attachment";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const deleted = await Attachment.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        {
          error: "Attachment not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to delete attachment",
      },
      {
        status: 500,
      },
    );
  }
}
