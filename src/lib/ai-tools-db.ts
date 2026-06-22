import { and, desc, eq, ne } from "drizzle-orm";

import type { DbClient } from "@/db/client";
import { aiTools as aiToolsTable } from "@/db/schema";
import { aiTools as seedAiTools } from "@/lib/ai-tools-data";
import type { AiTool, AiToolPricingType, AiToolStatus } from "@/types/ai-tool";

type AiToolRow = typeof aiToolsTable.$inferSelect;

const splitList = (value: string | null) =>
  (value ?? "")
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

const joinList = (value: string[]) => value.map((item) => item.trim()).join("\n");

const accentClasses = [
  "bg-teal-500",
  "bg-amber-500",
  "bg-blue-500",
  "bg-violet-500",
  "bg-emerald-500",
  "bg-rose-500",
];

const getAccentClass = (tool: Pick<AiToolRow, "slug">) => {
  const index = Math.abs(
    tool.slug.split("").reduce((total, char) => total + char.charCodeAt(0), 0),
  );

  return accentClasses[index % accentClasses.length];
};

const mapAiTool = (tool: AiToolRow): AiTool => ({
  id: tool.id,
  name: tool.name,
  slug: tool.slug,
  logo: tool.logo ?? "",
  logoUrl: tool.logoUrl ?? "",
  category: tool.category,
  tagline: tool.tagline,
  description: tool.description,
  shortDescription: tool.shortDescription ?? tool.tagline,
  fullDescription: tool.fullDescription ?? tool.description,
  websiteUrl: tool.websiteUrl,
  affiliateUrl: tool.affiliateUrl ?? "",
  pricingType: tool.pricingType,
  startingPrice: tool.startingPrice ?? "",
  pricingSummary: tool.pricingSummary ?? "Pricing details pending",
  bestFor: splitList(tool.bestFor),
  pros: splitList(tool.pros),
  cons: splitList(tool.cons),
  easeOfUseScore: tool.easeOfUseScore,
  pricingValueScore: tool.pricingValueScore,
  featuresScore: tool.featuresScore,
  developerUsefulnessScore: tool.developerUsefulnessScore,
  overallScore: tool.overallScore,
  status: tool.status,
  accentClass: getAccentClass(tool),
  isFeatured: tool.isFeatured,
  createdAt: tool.createdAt,
  updatedAt: tool.updatedAt,
});

export const ensureDefaultAiTools = async (db: DbClient) => {
  const [existingTool] = await db.select({ id: aiToolsTable.id }).from(aiToolsTable).limit(1);

  if (existingTool) {
    return;
  }

  const now = new Date().toISOString();

  for (const tool of seedAiTools) {
    await db
      .insert(aiToolsTable)
      .values({
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      logo: tool.logo || null,
      logoUrl: tool.logoUrl || null,
      tagline: tool.tagline,
      description: tool.description,
      shortDescription: tool.shortDescription,
      fullDescription: tool.fullDescription,
      websiteUrl: tool.websiteUrl,
      category: tool.category,
      pricingType: tool.pricingType,
      startingPrice: tool.startingPrice || null,
      pricingSummary: tool.pricingSummary,
      affiliateUrl: tool.affiliateUrl || null,
      bestFor: joinList(tool.bestFor),
      pros: joinList(tool.pros),
      cons: joinList(tool.cons),
      easeOfUseScore: tool.easeOfUseScore,
      pricingValueScore: tool.pricingValueScore,
      featuresScore: tool.featuresScore,
      developerUsefulnessScore: tool.developerUsefulnessScore,
      overallScore: tool.overallScore,
      isFeatured: tool.isFeatured,
      status: tool.status,
      createdAt: now,
      updatedAt: now,
      })
      .onConflictDoNothing();
  }
};

export const listPublishedAiTools = async (db: DbClient) => {
  await ensureDefaultAiTools(db);

  const rows = await db
    .select()
    .from(aiToolsTable)
    .where(eq(aiToolsTable.status, "published"))
    .orderBy(desc(aiToolsTable.isFeatured), aiToolsTable.name);

  return rows.map(mapAiTool);
};

export const listAdminAiTools = async (db: DbClient) => {
  await ensureDefaultAiTools(db);

  const rows = await db
    .select()
    .from(aiToolsTable)
    .orderBy(desc(aiToolsTable.updatedAt), aiToolsTable.name);

  return rows.map(mapAiTool);
};

export const getPublishedAiToolBySlug = async (db: DbClient, slug: string) => {
  await ensureDefaultAiTools(db);

  const [tool] = await db
    .select()
    .from(aiToolsTable)
    .where(and(eq(aiToolsTable.slug, slug), eq(aiToolsTable.status, "published")))
    .limit(1);

  return tool ? mapAiTool(tool) : null;
};

export const getAdminAiToolBySlug = async (db: DbClient, slug: string) => {
  await ensureDefaultAiTools(db);

  const [tool] = await db
    .select()
    .from(aiToolsTable)
    .where(eq(aiToolsTable.slug, slug))
    .limit(1);

  return tool ? mapAiTool(tool) : null;
};

export type AiToolFormInput = {
  name: string;
  slug: string;
  logo: string;
  logoUrl: string;
  websiteUrl: string;
  affiliateUrl: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  pricingType: AiToolPricingType;
  startingPrice: string;
  pricingSummary: string;
  bestFor: string;
  pros: string;
  cons: string;
  easeOfUseScore: number;
  pricingValueScore: number;
  featuresScore: number;
  developerUsefulnessScore: number;
  overallScore: number;
  status: AiToolStatus;
  isFeatured: boolean;
};

const pricingTypes = ["free", "freemium", "paid", "enterprise"] as const;
const statuses = ["draft", "published", "archived"] as const;

export const createToolSlug = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);

const parseScore = (value: FormDataEntryValue | null) => {
  const score = Number.parseInt(String(value ?? "0"), 10);

  if (!Number.isFinite(score)) {
    return 0;
  }

  return Math.max(0, Math.min(10, score));
};

export const parseAiToolFormData = (formData: FormData): AiToolFormInput => {
  const name = String(formData.get("name") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  const pricingType = String(formData.get("pricingType") ?? "freemium");
  const status = String(formData.get("status") ?? "draft");

  return {
    name,
    slug: createToolSlug(rawSlug || name),
    logo: String(formData.get("logo") ?? "").trim(),
    logoUrl: String(formData.get("logoUrl") ?? "").trim(),
    websiteUrl: String(formData.get("websiteUrl") ?? "").trim(),
    affiliateUrl: String(formData.get("affiliateUrl") ?? "").trim(),
    shortDescription: String(formData.get("shortDescription") ?? "").trim(),
    fullDescription: String(formData.get("fullDescription") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    pricingType: pricingTypes.includes(pricingType as AiToolPricingType)
      ? (pricingType as AiToolPricingType)
      : "freemium",
    startingPrice: String(formData.get("startingPrice") ?? "").trim(),
    pricingSummary: String(formData.get("pricingSummary") ?? "").trim(),
    bestFor: String(formData.get("bestFor") ?? "").trim(),
    pros: String(formData.get("pros") ?? "").trim(),
    cons: String(formData.get("cons") ?? "").trim(),
    easeOfUseScore: parseScore(formData.get("easeOfUseScore")),
    pricingValueScore: parseScore(formData.get("pricingValueScore")),
    featuresScore: parseScore(formData.get("featuresScore")),
    developerUsefulnessScore: parseScore(
      formData.get("developerUsefulnessScore"),
    ),
    overallScore: parseScore(formData.get("overallScore")),
    status: statuses.includes(status as AiToolStatus)
      ? (status as AiToolStatus)
      : "draft",
    isFeatured: String(formData.get("isFeatured") ?? "") === "on",
  };
};

export const validateAiToolFormInput = (input: AiToolFormInput) => {
  if (
    !input.name ||
    !input.slug ||
    !input.websiteUrl ||
    !input.shortDescription ||
    !input.fullDescription ||
    !input.category
  ) {
    return "missing";
  }

  return null;
};

const valuesFromInput = (input: AiToolFormInput, now: string) => ({
  name: input.name,
  slug: input.slug,
  logo: input.logo || null,
  logoUrl: input.logoUrl || null,
  tagline: input.shortDescription,
  description: input.shortDescription,
  shortDescription: input.shortDescription,
  fullDescription: input.fullDescription,
  websiteUrl: input.websiteUrl,
  category: input.category,
  pricingType: input.pricingType,
  startingPrice: input.startingPrice || null,
  pricingSummary: input.pricingSummary || input.startingPrice || "Pricing pending",
  affiliateUrl: input.affiliateUrl || null,
  bestFor: input.bestFor,
  pros: input.pros,
  cons: input.cons,
  easeOfUseScore: input.easeOfUseScore,
  pricingValueScore: input.pricingValueScore,
  featuresScore: input.featuresScore,
  developerUsefulnessScore: input.developerUsefulnessScore,
  overallScore: input.overallScore,
  isFeatured: input.isFeatured,
  status: input.status,
  updatedAt: now,
});

export const createAdminAiTool = async (
  db: DbClient,
  input: AiToolFormInput,
) => {
  const now = new Date().toISOString();

  await db.insert(aiToolsTable).values({
    id: crypto.randomUUID(),
    ...valuesFromInput(input, now),
    createdAt: now,
  });
};

export const updateAdminAiTool = async (
  db: DbClient,
  currentSlug: string,
  input: AiToolFormInput,
) => {
  const existingTool = await getAdminAiToolBySlug(db, currentSlug);

  if (!existingTool) {
    return false;
  }

  const now = new Date().toISOString();

  await db
    .update(aiToolsTable)
    .set(valuesFromInput(input, now))
    .where(eq(aiToolsTable.id, existingTool.id));

  return true;
};

export const archiveAdminAiTool = async (db: DbClient, slug: string) => {
  await db
    .update(aiToolsTable)
    .set({
      status: "archived",
      isFeatured: false,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(aiToolsTable.slug, slug));
};

export const deleteAdminAiTool = async (db: DbClient, slug: string) => {
  await db.delete(aiToolsTable).where(eq(aiToolsTable.slug, slug));
};

export const adminAiToolSlugExists = async (
  db: DbClient,
  slug: string,
  ignoredToolId?: string,
) => {
  const whereClause = ignoredToolId
    ? and(eq(aiToolsTable.slug, slug), ne(aiToolsTable.id, ignoredToolId))
    : eq(aiToolsTable.slug, slug);
  const [tool] = await db
    .select({ id: aiToolsTable.id })
    .from(aiToolsTable)
    .where(whereClause);

  return Boolean(tool);
};
