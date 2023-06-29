import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  const isAuth = !!token

  const isAuthPage = req.nextUrl.pathname.startsWith("/login")
  const isProtected =
    req.nextUrl.pathname.startsWith("/new") ||
    req.nextUrl.pathname.startsWith("/settings")

  if (isAuthPage) {
    if (isAuth) return NextResponse.redirect(new URL("/", req.url))
  }

  if (isProtected) {
    if (!isAuth) return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const config = {
  matcher: ["/login", "/new", "/settings"],
}
