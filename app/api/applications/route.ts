import { connectDB } from "@/lib/db";
import { Application } from "@/models/Application";
import { NextResponse } from "next/server";

export async function GET(){
    await connectDB();

    const applications = await Application.find();
     
    return NextResponse.json(applications);
}


export async function POST(req: Request){
    await connectDB();
    const body = await req.json();
    const newApp = await Application.create(body);

    return NextResponse.json(newApp);
}