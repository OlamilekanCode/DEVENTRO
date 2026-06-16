import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Affiliate Disclosure",
  description:
    "DevEntro affiliate disclosure for AI tool reviews, recommendations, and future sponsor placements.",
  path: "/affiliate-disclosure",
});

export default function AffiliateDisclosurePage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase text-teal-700">Disclosure</p>
      <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-5xl">
        Affiliate Disclosure
      </h1>
      <div className="mt-8 rounded-md border border-border bg-card p-6 shadow-sm">
        <p className="text-sm leading-7 text-muted-foreground">
          DevEntro may earn commissions from qualifying purchases or signups
          through affiliate links in future reviews, comparisons, tool pages, or
          sponsor placements.
        </p>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          Affiliate relationships should not control editorial conclusions.
          Reviews should remain practical, transparent, and focused on real
          workflow usefulness.
        </p>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          This placeholder disclosure should be reviewed before monetized launch.
        </p>
      </div>
    </main>
  );
}
