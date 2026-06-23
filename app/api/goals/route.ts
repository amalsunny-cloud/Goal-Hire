import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { Goal } from "@/models/Goal";
import { NextResponse } from "next/server";

export async function GET() {
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

    let goal = await Goal.findOne({
      userId: user.userId,
    });

    if (!goal) {
      goal = await Goal.create({
        userId: user.userId,
      });
    }

    return NextResponse.json(goal);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch goals",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PATCH(req: Request) {
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

    const goal = await Goal.findOneAndUpdate(
      {
        userId: user.userId,
      },
      body,
      {
        new: true,
        upsert: true,
      },
    );

    return NextResponse.json(goal);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to update goals",
      },
      {
        status: 500,
      },
    );
  }
}
