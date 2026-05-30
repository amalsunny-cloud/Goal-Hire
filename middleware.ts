import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export function middleware(req: NextRequest) {
  console.log("req is:", req);

  const token = req.cookies.get("token")?.value;

  // Protected routes
  const protectedPaths = ["/dashboard"];

  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path),
  );

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

return NextResponse.next();
}
