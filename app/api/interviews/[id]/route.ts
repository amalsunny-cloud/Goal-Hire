import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { Application } from "@/models/Application";
import { Interview } from "@/models/Interview";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}
export async function PATCH(req: NextRequest, { params }: Props) {
  try {
    await connectDB();

    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const interview = await Interview.findById(id);

    if (!interview) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 },
      );
    }

    const application = await Application.findOne({
      _id: interview.applicationId,
      userId: user.userId,
    });

    if (!application) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedInterview = await Interview.findByIdAndUpdate(id, body, {
      new: true,
    });

    return NextResponse.json(updatedInterview);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to update interview",
      },
      { status: 500 },
    );
  }
}


export async function DELETE(req:NextRequest,{params}:Props){
    try{
        await connectDB();
        const user = await getUser();

        if(!user){
            return NextResponse.json({error:"Unauthorized"},{status:401})
        }
        const {id} = await params;

        const interview = await Interview.findByIdAndDelete(id);
        if(!interview){
            return NextResponse.json({error:"Interview not found"},{status:404})
        }

        const application = await Application.findOne({
            _id:interview.applicationId,
            userId: user.userId,
        })

        if(!application){
            return NextResponse.json({error:"Unauthorized"},{status:401})
        }

        await Interview.findByIdAndDelete(id);

        return NextResponse.json({
            message: "Interview deleted",
        });




    }catch(error){
        console.error(error);
        return NextResponse.json({error: "Failed to delete interview"},{status:500});
        
    }
}