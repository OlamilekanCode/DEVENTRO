import { NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionCookie,
  getAdminSessionCookieOptions,
  isAdminConfigured,
  sanitizeAdminRedirect,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const nextPath = sanitizeAdminRedirect(String(formData.get("next") ?? "/admin"));
  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", nextPath);

  if (!isAdminConfigured()) {
    loginUrl.searchParams.set("error", "config");

    return NextResponse.redirect(loginUrl);
  }

  if (!(await verifyAdminCredentials(email, password))) {
    loginUrl.searchParams.set("error", "invalid");

    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.redirect(new URL(nextPath, request.url));
  response.cookies.set(
    ADMIN_SESSION_COOKIE,
    await createAdminSessionCookie(email.trim().toLowerCase()),
    getAdminSessionCookieOptions(request.url),
  );

  return response;
}
