import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // Allow unrestricted access to the login page
  if (path === "/admin/login") {
    return NextResponse.next()
  }

  // Check for the user's token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // If no token exists, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  // Otherwise, allow the request to proceed
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"]
}
