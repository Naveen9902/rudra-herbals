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
        // Only allow logged in users for the paths matched below
        return !!token
      }
    }
  }
)

export const config = {
  matcher: ["/admin/:path*"]
}
