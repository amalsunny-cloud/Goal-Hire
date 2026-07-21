import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
   try{
        await connectDB();

        const body = await req.json();
        const { name,email,password } = body;

        if(!name || !email || !password){
            return NextResponse.json({
                error: "All fields are required"
            },{
                status: 400
            })
        }

        // check exising user

        const normalizedEmail = email.trim().toLowerCase();
        const normalizedName = name.trim();
        const existingUser = await User.findOne({email:normalizedEmail});
        if(existingUser){
            return NextResponse.json(
                {error: "User already exists"},
                { status: 400 }
            );
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name:normalizedName,
            email:normalizedEmail,
            password: hashedPassword,
        })

        return NextResponse.json( {
            success : true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
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