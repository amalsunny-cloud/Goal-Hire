import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
   try{
        await connectDB();

        const body = await req.json();
        const { name,email,password } = body;

        // check exising user

        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json(
                {error: "User already exists"},
                { status: 400 }
            );
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        return NextResponse.json( {
            success : true,
            user
        })
   }catch(error){
    console.error(error);
    
    return NextResponse.json(
        {
        error: "SignUp Failed"
    }, { status: 500 }
)
   } 
}