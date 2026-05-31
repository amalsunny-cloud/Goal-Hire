import { connectDB } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { Application } from "@/models/Application";
import { NextResponse } from "next/server";

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

    const updated = await Application.findOneAndUpdate(
      {
        _id: id,
        userId: user.userId,
      },
      body,
      { new: true },
    );

    return NextResponse.json(updated);

  } catch (error) {
    return NextResponse.json({
        error: "Update failed"
    }, {
        status: 500
    })
  }
}



// Delete

export async function DELETE(req: Request, {params} : {params: Promise<{id: string}>}){
    try{
        await connectDB();
        const user = await getUser();

        if(!user){
            return NextResponse.json(
                {
                    error: "Unauthorized"
                }, {
                    status: 401
                }
            )
        }

        const { id} = await params;
        const deleted = await Application.findOneAndDelete({
            _id: id,
            userId: user.userId,
        });

        if(!deleted){
            return NextResponse.json(
                {
                    error: "Application not found or you don't have permission to delete it."
                },
                {status: 404}
            );
        }

        return NextResponse.json({
            success : true,
            
        });

    }catch(error){
        return NextResponse.json({
            error:"Failed to Delete"
        })
    }

}