import { Megaphone, Save } from "lucide-react";

import { getDb } from "@/db/cloudflare";
import { listAdminAdPlacements } from "@/lib/ad-placements";

type AdminAdsPageProps = {
  searchParams?: Promise<{
    saved?: string;
    error?: string;
  }>;
};

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

const messages = {
  saved: "Ad placement saved.",
  error: "Ad placement could not be saved. Check the optional URLs.",
} as const;

export default async function AdminAdsPage({ searchParams }: AdminAdsPageProps) {
  const params = await searchParams;
  const db = await getDb();
  const placements = await listAdminAdPlacements(db);
  const message = params?.saved
    ? messages.saved
    : params?.error
      ? messages.error
      : null;

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
              Ad placement controls.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Enable or disable MVP ad slots and save optional sponsor URLs or
              images. Real AdSense scripts are intentionally not added yet.
            </p>
          </div>
        </div>
      </section>

      {message ? (
        <div className="mt-5 rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-sm">
          {message}
        </div>
      ) : null}

      <section className="mt-6 grid gap-4">
        {placements.map((placement) => (
          <form
            key={placement.id}
            action="/api/admin/ads"
            method="post"
            className="rounded-md border border-border bg-card p-5 shadow-sm"
          >
            <input type="hidden" name="id" value={placement.id} />
            <div className="grid gap-5 lg:grid-cols-[1fr_220px_220px_auto] lg:items-end">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {placement.name}
                </p>
                <p className="mt-1 text-xs font-medium text-muted-foreground">
                  {placementLabels[placement.placementType]} - Updated{" "}
                  {placement.updatedAt}
                </p>
                <label className="mt-4 flex items-start gap-3 rounded-md border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
                  <input
                    name="isEnabled"
                    type="checkbox"
                    defaultChecked={placement.isEnabled}
                    className="mt-1"
                  />
                  Enabled for public layout placeholders.
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">
                  Sponsor URL
                </span>
                <input
                  name="sponsorUrl"
                  type="url"
                  defaultValue={placement.sponsorUrl ?? ""}
                  placeholder="https://example.com"
                  className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">
                  Sponsor image
                </span>
                <input
                  name="sponsorImage"
                  defaultValue={placement.sponsorImage ?? ""}
                  placeholder="/sponsor.png"
                  className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>

              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/80"
              >
                <Save className="size-4" aria-hidden="true" />
                Save
              </button>
            </div>
          </form>
        ))}
      </section>
    </div>
  );
}
