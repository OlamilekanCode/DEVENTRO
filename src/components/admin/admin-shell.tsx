import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  FolderTree,
  Home,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Settings,
  Sparkles,
  Tags,
  UploadCloud,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type AdminShellProps = {
  adminEmail: string;
  children: ReactNode;
};

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    label: "Posts",
    href: "/admin/posts",
    icon: FileText,
  },
  {
    label: "Media",
    href: "/admin/media",
    icon: UploadCloud,
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    label: "Tags",
    href: "/admin/tags",
    icon: Tags,
  },
  {
    label: "AI Tools",
    href: "/admin/tools",
    icon: Sparkles,
  },
  {
    label: "Ads",
    href: "/admin/ads",
    icon: Megaphone,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminShell({ adminEmail, children }: AdminShellProps) {
  return (
    <div className="min-h-svh bg-[#f7f8fb] text-foreground">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-border bg-card px-5 py-6 lg:flex lg:flex-col">
        <Link href="/admin" className="inline-flex items-center">
          <Image
            src="/Logo 1.png"
            alt="DevEntro"
            width={174}
            height={42}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav aria-label="Admin navigation" className="mt-10 grid gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.isActive ? "page" : undefined}
                className={`flex h-11 items-center gap-3 rounded-md px-3 text-sm font-semibold transition-colors ${
                  item.isActive
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="size-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-md border border-border bg-muted/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Signed in
          </p>
          <p className="mt-2 truncate text-sm font-semibold text-foreground">
            {adminEmail}
          </p>
          <form action="/api/admin/logout" method="post" className="mt-4">
            <Button
              type="submit"
              variant="outline"
              className="h-10 w-full justify-center rounded-md"
            >
              <LogOut className="size-4" aria-hidden="true" />
              Sign out
            </Button>
          </form>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <Image
                src="/Logo 1.png"
                alt="DevEntro"
                width={150}
                height={38}
                className="h-8 w-auto lg:hidden"
              />
              <div className="hidden h-9 w-px bg-border lg:block" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  Admin dashboard
                </p>
                <p className="hidden text-xs text-muted-foreground sm:block">
                  Content, tools, ads, and publishing controls
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md border border-border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              >
                <Home className="size-4" aria-hidden="true" />
                View site
              </Link>
              <form action="/api/admin/logout" method="post" className="lg:hidden">
                <Button
                  type="submit"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-md"
                  aria-label="Sign out"
                >
                  <LogOut className="size-4" aria-hidden="true" />
                </Button>
              </form>
            </div>
          </div>
        </header>

        <div className="border-b border-border bg-card lg:hidden">
          <nav
            aria-label="Admin navigation"
            className="flex gap-2 overflow-x-auto px-4 py-3 sm:px-6"
          >
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={item.isActive ? "page" : undefined}
                  className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-md px-3 text-sm font-semibold ${
                    item.isActive
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
