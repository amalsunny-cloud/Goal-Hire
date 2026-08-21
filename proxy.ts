import { NextRequest, NextResponse } from "next/server";
import { verifyTokenEdge } from "./lib/auth"; 

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // Example: Redirect authenticated users away from login
  if (pathname.startsWith("/auth") && token) {
    const decoded = await verifyTokenEdge(token);
    if (decoded) return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect dashboard
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};