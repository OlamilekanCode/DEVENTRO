import type { ReactNode } from "react";

import { SiteShell } from "@/components/layout/site-shell";

export default function PublicSiteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <SiteShell>{children}</SiteShell>;
}
