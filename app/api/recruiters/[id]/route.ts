import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { Application } from "@/models/Application";
import { Recruiter } from "@/models/Recruiter";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const recruiter = await Recruiter.findById(id);

    if (!recruiter) {
      return NextResponse.json(
        {
          error: "Recruiter not found",
        },
        {
          status: 404,
        },
      );
    }

    const application = await Application.findOne({
      _id: recruiter.applicationId,
      userId: user.userId,
    });

    if (!application) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    return NextResponse.json(recruiter);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch recruiter",
      },
      {
        status: 500,
      },
    );
  }
}

// Update Recruiter

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params;

    const recruiter = await Recruiter.findById(id);

    if (!recruiter) {
      return NextResponse.json(
        {
          error: "Recruiter not found",
        },
        {
          status: 404,
        },
      );
    }

    const application = await Application.findOne({
      _id: recruiter.applicationId,
      userId: user.userId,
    });

    if (!application) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const updated = await Recruiter.findByIdAndUpdate(id, body, {
      new: true,
    });

    return NextResponse.json(updated);
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

// Delete Recruiter

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const recruiter = await Recruiter.findById(id);

    if (!recruiter) {
      return NextResponse.json(
        {
          error: "Recruiter not found",
        },
        {
          status: 404,
        },
      );
    }

    const application = await Application.findOne({
      _id: recruiter.applicationId,
      userId: user.userId,
    });

    if (!application) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    await Recruiter.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to delete recruiter",
      },
      {
        status: 500,
      },
    );
  }
}
