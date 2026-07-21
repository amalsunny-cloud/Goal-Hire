import { NextRequest, NextResponse } from "next/server";
import { verifyTokenEdge } from "./lib/auth"; 

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  const token = req.cookies.get("token")?.value;


  if (
    pathname.startsWith("/auth") || 
    pathname.startsWith("/api") ||
    pathname.includes(".") // skips static assets like images, favicon, and globals.css
  ) {
    return NextResponse.next();
  }

  
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      console.log("🚫 MIDDLEWARE: Access Denied. No token found.");
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

  
    const decoded = await verifyTokenEdge(token);
    console.log("🔍 MIDDLEWARE VERIFICATION RESULT:", decoded);

   
    if (!decoded) {
      console.log("🚫 MIDDLEWARE: Access Denied. Token is invalid or expired.");
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

 
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};