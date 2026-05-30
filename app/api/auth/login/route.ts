import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req :Request){
    try{
        await connectDB();
        
        const body = await req.json();
        const { email, password } = body;

        // Find user
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json(
                {error: "Invalid Credentials"},
                {status: 400}
            )
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return NextResponse.json(
                { error: "Password not matches" },
                { status: 400 },
            )
        }

        // create token

        const token = jwt.sign(
            {
                userId : user._id
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "7d",
            }
        );


        const response = NextResponse.json(
            {success: true}
        );


        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60*60*24*7,
            path:"/",
        });

        return response;
    }catch(error){
        console.error(error);
        
    }

}