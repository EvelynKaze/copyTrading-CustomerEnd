import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const isAuthenticated = !!session;
  const isAdminUser = session && JSON.parse(session).isAdmin === "true";
  const isNewUser = session && JSON.parse(session).isNewUser;

  // Redirect to login if accessing protected routes while not authenticated
  if (!isAuthenticated && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect new users to onboardingg
  if (
    isAuthenticated &&
    isNewUser &&
    !request.nextUrl.pathname.startsWith("/onboardingg")
  ) {
    return NextResponse.redirect(new URL("/onboardingg", request.url));
  }

  // Redirect non-admin users trying to access admin dashboard
  if (
    isAuthenticated &&
    !isAdminUser &&
    request.nextUrl.pathname.startsWith("/dashboard/admin")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect admin users to admin dashboard
  if (
    isAuthenticated &&
    isAdminUser &&
    request.nextUrl.pathname === "/dashboard"
  ) {
    return NextResponse.redirect(new URL("/dashboard/admin", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/onboardingg"],
};
