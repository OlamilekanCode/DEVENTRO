import { desc } from "drizzle-orm";

import type { DbClient } from "@/db/client";
import { adPlacements } from "@/db/schema";

const defaultAdPlacements = [
  {
    id: "top-banner",
    name: "Top banner",
    placementType: "top_banner",
  },
  {
    id: "inline-article",
    name: "Inline article",
    placementType: "inline_article",
  },
  {
    id: "sidebar",
    name: "Desktop sidebar",
    placementType: "sidebar",
  },
  {
    id: "mobile-sticky",
    name: "Mobile sticky",
    placementType: "mobile_sticky",
  },
  {
    id: "footer",
    name: "Footer banner",
    placementType: "footer",
  },
] as const;

export const ensureDefaultAdPlacements = async (db: DbClient) => {
  const now = new Date().toISOString();

  for (const placement of defaultAdPlacements) {
    await db
      .insert(adPlacements)
      .values({
        ...placement,
        isEnabled: false,
        script: null,
        sponsorImage: null,
        sponsorUrl: null,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoNothing();
  }
};

export const listAdminAdPlacements = async (db: DbClient) => {
  await ensureDefaultAdPlacements(db);

  return db
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
};
