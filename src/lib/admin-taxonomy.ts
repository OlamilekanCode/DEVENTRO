import { and, eq, ne } from "drizzle-orm";

import type { DbClient } from "@/db/client";
import { categories, tags } from "@/db/schema";
import {
  ensureDefaultCategories,
  ensureDefaultTags,
} from "@/lib/admin-posts";

export type CategoryFormInput = {
  name: string;
  slug: string;
  description: string;
};

export type TagFormInput = {
  name: string;
  slug: string;
};

export const createTaxonomySlug = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

export const parseCategoryFormData = (
  formData: FormData,
): CategoryFormInput => {
  const name = String(formData.get("name") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();

  return {
    name,
    slug: createTaxonomySlug(rawSlug || name),
    description: String(formData.get("description") ?? "").trim(),
  };
};

export const parseTagFormData = (formData: FormData): TagFormInput => {
  const name = String(formData.get("name") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();

  return {
    name,
    slug: createTaxonomySlug(rawSlug || name),
  };
};

export const validateCategoryInput = (input: CategoryFormInput) => {
  if (!input.name || !input.slug) {
    return "missing";
  }

  return null;
};

export const validateTagInput = (input: TagFormInput) => {
  if (!input.name || !input.slug) {
    return "missing";
  }

  return null;
};

export const getAdminCategoryBySlug = async (db: DbClient, slug: string) => {
  await ensureDefaultCategories(db);

  const [category] = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);

  return category ?? null;
};

export const getAdminTagBySlug = async (db: DbClient, slug: string) => {
  await ensureDefaultTags(db);

  const [tag] = await db
    .select()
    .from(tags)
    .where(eq(tags.slug, slug))
    .limit(1);

  return tag ?? null;
};

export const createAdminCategory = async (
  db: DbClient,
  input: CategoryFormInput,
) => {
  const now = new Date().toISOString();

  await db.insert(categories).values({
    id: crypto.randomUUID(),
    name: input.name,
    slug: input.slug,
    description: input.description || null,
    createdAt: now,
    updatedAt: now,
  });
};

export const updateAdminCategory = async (
  db: DbClient,
  currentSlug: string,
  input: CategoryFormInput,
) => {
  const category = await getAdminCategoryBySlug(db, currentSlug);

  if (!category) {
    return false;
  }

  await db
    .update(categories)
    .set({
      name: input.name,
      slug: input.slug,
      description: input.description || null,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(categories.id, category.id));

  return true;
};

export const deleteAdminCategory = async (db: DbClient, slug: string) => {
  await db.delete(categories).where(eq(categories.slug, slug));
};

export const createAdminTag = async (db: DbClient, input: TagFormInput) => {
  const now = new Date().toISOString();

  await db.insert(tags).values({
    id: crypto.randomUUID(),
    name: input.name,
    slug: input.slug,
    createdAt: now,
    updatedAt: now,
  });
};

export const updateAdminTag = async (
  db: DbClient,
  currentSlug: string,
  input: TagFormInput,
) => {
  const tag = await getAdminTagBySlug(db, currentSlug);

  if (!tag) {
    return false;
  }

  await db
    .update(tags)
    .set({
      name: input.name,
      slug: input.slug,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(tags.id, tag.id));

  return true;
};

export const deleteAdminTag = async (db: DbClient, slug: string) => {
  await db.delete(tags).where(eq(tags.slug, slug));
};

export const categorySlugExists = async (
  db: DbClient,
  slug: string,
  ignoredCategoryId?: string,
) => {
  const whereClause = ignoredCategoryId
    ? and(eq(categories.slug, slug), ne(categories.id, ignoredCategoryId))
    : eq(categories.slug, slug);
  const [category] = await db
    .select({ id: categories.id })
    .from(categories)
    .where(whereClause);

  return Boolean(category);
};

export const tagSlugExists = async (
  db: DbClient,
  slug: string,
  ignoredTagId?: string,
) => {
  const whereClause = ignoredTagId
    ? and(eq(tags.slug, slug), ne(tags.id, ignoredTagId))
    : eq(tags.slug, slug);
  const [tag] = await db.select({ id: tags.id }).from(tags).where(whereClause);

  return Boolean(tag);
};
