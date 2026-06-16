import { desc } from "drizzle-orm";
import { Megaphone } from "lucide-react";

import { getDb } from "@/db/cloudflare";
import { adPlacements } from "@/db/schema";

export const metadata = {
  title: "Ads | DevEntro Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

const placementLabels = {
  top_banner: "Top banner",
  inline_article: "Inline article",
  sidebar: "Sidebar",
  mobile_sticky: "Mobile sticky",
  footer: "Footer",
} as const;

export default async function AdminAdsPage() {
  const db = await getDb();
  const placements = await db
    .select({
      id: adPlacements.id,
      name: adPlacements.name,
      placementType: adPlacements.placementType,
      isEnabled: adPlacements.isEnabled,
      sponsorImage: adPlacements.sponsorImage,
      sponsorUrl: adPlacements.sponsorUrl,
      updatedAt: adPlacements.updatedAt,
    })
    .from(adPlacements)
    .orderBy(desc(adPlacements.updatedAt));

  return (
    <div className="mx-auto w-full max-w-6xl">
      <section className="rounded-md border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-4">
          <div className="grid size-11 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
            <Megaphone className="size-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Ads
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              Future ad placement controls.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Placeholder management for AdSense, sponsor banners, and affiliate
              placements. Real ad scripts are not added in the MVP.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-md border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-left text-sm">
            <thead className="border-b border-border bg-muted/60 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">Placement</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Sponsor</th>
                <th className="px-5 py-3 font-semibold">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {placements.length > 0 ? (
                placements.map((placement) => (
                  <tr key={placement.id}>
                    <td className="px-5 py-4 font-semibold text-foreground">
                      {placement.name}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {placementLabels[placement.placementType]}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {placement.isEnabled ? "Enabled" : "Disabled"}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {placement.sponsorUrl || placement.sponsorImage
                        ? "Configured"
                        : "Placeholder"}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {placement.updatedAt}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-8 text-center text-muted-foreground"
                  >
                    No ad placements found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
