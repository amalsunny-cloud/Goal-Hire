import { cookies } from "next/headers"
import jwt from "jsonwebtoken";

export const getUser = async()=>{
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;
    console.log("Token in getUserr:",token);
    

    if(!token) return null;

    try{
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        );

        return decoded as {
            userId: string;
        };
    } catch (error){
        return null;
    }
};