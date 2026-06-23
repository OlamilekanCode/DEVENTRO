import { desc, eq } from "drizzle-orm";

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

export type AdPlacementFormInput = {
  id: string;
  isEnabled: boolean;
  sponsorImage: string;
  sponsorUrl: string;
};

export const parseAdPlacementFormData = (
  formData: FormData,
): AdPlacementFormInput => ({
  id: String(formData.get("id") ?? "").trim(),
  isEnabled: formData.get("isEnabled") === "on",
  sponsorImage: String(formData.get("sponsorImage") ?? "").trim(),
  sponsorUrl: String(formData.get("sponsorUrl") ?? "").trim(),
});

export const validateAdPlacementInput = (input: AdPlacementFormInput) => {
  if (!input.id) {
    return "missing-placement";
  }

  if (input.sponsorUrl && !isHttpUrl(input.sponsorUrl)) {
    return "sponsor-url";
  }

  if (input.sponsorImage && !isPublicOrHttpPath(input.sponsorImage)) {
    return "sponsor-image";
  }

  return null;
};

export const updateAdminAdPlacement = async (
  db: DbClient,
  input: AdPlacementFormInput,
) => {
  await ensureDefaultAdPlacements(db);

  await db
    .update(adPlacements)
    .set({
      isEnabled: input.isEnabled,
      sponsorImage: input.sponsorImage || null,
      sponsorUrl: input.sponsorUrl || null,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(adPlacements.id, input.id));
};

const isHttpUrl = (value: string) => {
  try {
    const url = new URL(value);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const isPublicOrHttpPath = (value: string) =>
  value.startsWith("/") || isHttpUrl(value);
