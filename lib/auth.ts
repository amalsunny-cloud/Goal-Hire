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


// 2. ADD THIS: Use this inside your middleware.ts (Edge Runtime)
export const verifyTokenEdge = async (token: string) => {
  try {
    // jose requires the secret to be encoded as an array of bytes
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.log("EDGE JWT VERIFY ERROR:", error);
    return null;
  }
};