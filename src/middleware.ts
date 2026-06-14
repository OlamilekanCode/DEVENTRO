import { NextResponse, type NextRequest } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  getAdminSessionFromCookie,
  sanitizeAdminRedirect,
} from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isLoginPage = pathname === "/admin/login";
  const session = await getAdminSessionFromCookie(
    request.cookies.get(ADMIN_SESSION_COOKIE)?.value,
  );

  if (isLoginPage && session) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!isLoginPage && !session) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set(
      "next",
      sanitizeAdminRedirect(`${pathname}${request.nextUrl.search}`),
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
