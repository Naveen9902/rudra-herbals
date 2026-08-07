import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Custom logic if needed
    // e.g., checking req.nextauth.token?.role === "admin"
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname === "/admin/login") {
          return true;
        }
        // Only allow logged in users for the paths matched below
        return !!token
      }
    },
    pages: {
      signIn: "/admin/login",
    }
  }
)

export const config = {
  matcher: ["/admin/:path*"]
}
