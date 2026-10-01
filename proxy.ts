import { NextRequest, NextResponse } from "next/server";
import { verifyTokenEdge } from "./lib/auth";

// Prevent the browser from caching/restoring these pages from history
function noStore(response: NextResponse) {
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, max-age=0",
  );
  return response;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname.startsWith("/auth") || pathname === "/";

  // Protect dashboard routes
  if (isDashboardRoute) {
    if (!token) {
      return noStore(NextResponse.redirect(new URL("/auth/login", req.url)));
    }

    try {
      const decoded = await verifyTokenEdge(token);

      if (!decoded) {
        const response = NextResponse.redirect(
          new URL("/auth/login", req.url),
        );
        response.cookies.delete("token");
        return noStore(response);
      }

      // Valid token: allow the dashboard, but don't let it be cached
      return noStore(NextResponse.next());
    } catch {
      const response = NextResponse.redirect(new URL("/auth/login", req.url));
      response.cookies.delete("token");
      return noStore(response);
    }
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute) {
    if (!token) {
      return noStore(NextResponse.next());
    }

    try {
      const decoded = await verifyTokenEdge(token);

      if (decoded) {
        return noStore(
          NextResponse.redirect(new URL("/dashboard", req.url)),
        );
      }

      // Invalid token: clear it and let the auth page load
      const response = NextResponse.next();
      response.cookies.delete("token");
      return noStore(response);
    } catch {
      const response = NextResponse.next();
      response.cookies.delete("token");
      return noStore(response);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/auth/:path*"],
};