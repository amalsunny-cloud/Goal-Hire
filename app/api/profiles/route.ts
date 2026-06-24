import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";
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
        console.log("BEFORE in the GET profile find");


    const profiles = await Profile.find({
      userId: user.userId,
    });

            console.log("Profile in the POST profile",profiles);

    return NextResponse.json(profiles);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch profiles",
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
    console.log("Body in the POST profile");
    

    const profile = await Profile.create({
      ...body,
      userId: user.userId,
    });
        console.log("Profile in the POST profile",profile);


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
