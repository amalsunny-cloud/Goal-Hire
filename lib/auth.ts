// auth.ts
import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";

export const verifyToken = (token: string)=>{
    try{
        return jwt.verify(
            token,
            process.env.JWT_SECRET!
        );
    }catch(error){
        console.log("JWT VERIFY ERROR:",error);
        return null;
    }
}

export const verifyTokenEdge = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.log("EDGE JWT VERIFY ERROR:", error);
    return null;
  }
};