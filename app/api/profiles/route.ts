import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { profileSchema } from "@/lib/validation/profileSchema";
import { Profile } from "@/models/Profile";
import { NextResponse } from "next/server";

export async function GET(re: Request) {
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
    
    const profile = await Profile.findOne({
      userId: user.userId,
    }).lean();


    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch profile",
      },
      {
        status: 500,
      },
    );
  }
}

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
    
    const profile = await Profile.create({
      ...body,
      userId: user.userId,
    });
    
    return NextResponse.json(profile);
  } catch {
    return NextResponse.json(
      {
        error: "Failed to create profile",
      },
      {
        status: 500,
      },
    );
  }
}


export async function PUT(req: Request) {
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
    const result = profileSchema.safeParse(body);

    if(!result.success) {
      return NextResponse.json(
        {
          error: "Invalid profile data",
        },{
          status: 400,
        });
      }

    const profile = await Profile.findOneAndUpdate(
      {
        userId: user.userId,
      },
      {
        $set: result.data,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
    );

    return NextResponse.json(profile);
  }catch(error) {
    console.error("Error updating profile:", error);

    return NextResponse.json(
      {
        error: "Failed to update profile",
      },
      {
        status: 500,
      },
    );
  }
}