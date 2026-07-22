import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";

export async function POST(req: Request) {
  try {
    await connectDB();
    const user = await getUser();

  if (!user) {
    return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
    );
  }

    const formData = await req.formData();
    
    const file = formData.get("file") as File;
    console.log("file in cloudinary:",file);

    if (!file) {
      return NextResponse.json(
        {error: "No file uploaded"},
        {status: 400},
      );
    }

    const bytes = await file.arrayBuffer();
    console.log("bytes in cloudinary:",bytes);

    const buffer = Buffer.from(bytes);
    console.log("buffer in cloudinary:",buffer);


    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "goal-hire",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });

        console.log("result in cloudinary:",result);

    return NextResponse.json({
        url: result.secure_url,
        originalName: file.name,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {error: "Upload failed"},
      {status: 500},
    );
  }
}
