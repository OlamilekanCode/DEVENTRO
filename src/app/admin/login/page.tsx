import Image from "next/image";

import { Button } from "@/components/ui/button";

type AdminLoginPageProps = {
  searchParams?: Promise<{
    error?: string;
    next?: string;
  }>;
};

const errorMessages = {
  config:
    "Admin login is not configured yet. Add ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET.",
  invalid: "The email or password is incorrect.",
} as const;

export const metadata = {
  title: "Admin Login | DevEntro",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;
  const error =
    params?.error === "config" || params?.error === "invalid"
      ? errorMessages[params.error]
      : null;
  const nextPath =
    params?.next && params.next.startsWith("/admin") ? params.next : "/admin";

  return (
    <main className="bg-background">
      <section className="mx-auto flex min-h-[calc(100vh-220px)] w-full max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_24px_80px_rgba(15,23,42,0.10)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative hidden min-h-[620px] overflow-hidden bg-foreground p-10 text-background lg:block">
            <div className="absolute inset-0 opacity-70">
              <Image
                src="/deventro-workflow-hero.png"
                alt=""
                fill
                priority
                className="object-cover opacity-45"
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.88),rgba(0,0,0,0.38))]" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <Image
                src="/Logo 2.png"
                alt="DevEntro"
                width={156}
                height={48}
                className="h-12 w-auto"
              />
              <div className="max-w-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
                  Admin Access
                </p>
                <h1 className="mt-4 text-4xl font-semibold leading-tight">
                  Keep the publishing workflow focused.
                </h1>
                <p className="mt-4 text-sm leading-6 text-white/72">
                  One protected admin entrance for writing, reviewing, and
                  managing DevEntro content.
                </p>
              </div>
            </div>
          </div>

          <div className="flex min-h-[560px] items-center px-5 py-10 sm:px-10 lg:px-14">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-10 lg:hidden">
                <Image
                  src="/Logo 1.png"
                  alt="DevEntro"
                  width={150}
                  height={46}
                  className="h-11 w-auto"
                />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Secure admin
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                Sign in to DevEntro
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Use the private admin credentials configured in the deployment
                environment.
              </p>

              {error ? (
                <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              ) : null}

              <form
                action="/api/admin/login"
                method="post"
                className="mt-8 space-y-5"
              >
                <input type="hidden" name="next" value={nextPath} />
                <label className="block">
                  <span className="text-sm font-medium text-foreground">
                    Email
                  </span>
                  <input
                    required
                    autoComplete="email"
                    inputMode="email"
                    name="email"
                    type="email"
                    className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                    placeholder="admin@deventro.site"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-foreground">
                    Password
                  </span>
                  <input
                    required
                    autoComplete="current-password"
                    name="password"
                    type="password"
                    className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                    placeholder="Enter password"
                  />
                </label>
                <Button type="submit" className="h-12 w-full rounded-xl">
                  Sign in
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
