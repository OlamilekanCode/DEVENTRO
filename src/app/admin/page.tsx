import { cookies } from "next/headers";

import { Button } from "@/components/ui/button";
import {
  ADMIN_SESSION_COOKIE,
  getAdminSessionFromCookie,
} from "@/lib/admin-auth";

export const metadata = {
  title: "Admin | DevEntro",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = await getAdminSessionFromCookie(
    cookieStore.get(ADMIN_SESSION_COOKIE)?.value,
  );

  return (
    <main className="bg-background">
      <section className="mx-auto min-h-[calc(100vh-220px)] w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-border bg-card p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Admin verified
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                DevEntro admin access is active.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
                You are signed in as {session?.email ?? "admin"}. The dashboard
                shell comes next in Phase 10.
              </p>
            </div>
            <form action="/api/admin/logout" method="post">
              <Button type="submit" variant="outline" className="rounded-xl">
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
