import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // Allow unrestricted access to the login pages
  if (path === "/admin/login" || path === "/login") {
    return NextResponse.next()
  }

  // Check for the user's token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // If no token exists, redirect to the appropriate login page
  if (!token) {
    if (path.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/login", req.url))
    }
    if (path.startsWith("/account")) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  // Otherwise, allow the request to proceed
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"]
}
