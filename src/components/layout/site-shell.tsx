import type { ReactNode } from "react";

import { AdBanner } from "@/components/ads/ad-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <AdBanner label="Top advertisement" />
      <main className="flex-1">{children}</main>
      <AdBanner label="Footer advertisement" variant="footer" />
      <SiteFooter />
    </div>
  );
}
