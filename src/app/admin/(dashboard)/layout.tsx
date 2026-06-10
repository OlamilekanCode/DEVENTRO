import type { ReactNode } from "react";
import { cookies } from "next/headers";

import { AdminShell } from "@/components/admin/admin-shell";
import {
  ADMIN_SESSION_COOKIE,
  getAdminSessionFromCookie,
} from "@/lib/admin-auth";

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = await getAdminSessionFromCookie(
    cookieStore.get(ADMIN_SESSION_COOKIE)?.value,
  );

  return <AdminShell adminEmail={session?.email ?? "admin"}>{children}</AdminShell>;
}
