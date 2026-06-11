import { and, desc, eq, ne } from "drizzle-orm";

import type { DbClient } from "@/db/client";
import { categories, posts } from "@/db/schema";
import { blogCategories } from "@/lib/blog-data";
import type { PostFormInput } from "@/lib/admin-post-form";

export type AdminPostListItem = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published" | "archived";
  categoryName: string | null;
  readingTime: number;
  publishedAt: string | null;
  updatedAt: string;
};

export type AdminPostDetail = typeof posts.$inferSelect;

export const ensureDefaultCategories = async (db: DbClient) => {
  await db
    .insert(categories)
    .values(
      blogCategories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
      })),
    )
    .onConflictDoNothing();
};

export const listAdminCategories = async (db: DbClient) => {
  await ensureDefaultCategories(db);

  return db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
    })
    .from(categories)
    .orderBy(categories.name);
};

export const listAdminPosts = async (
  db: DbClient,
): Promise<AdminPostListItem[]> => {
  await ensureDefaultCategories(db);

  return db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      status: posts.status,
      categoryName: categories.name,
      readingTime: posts.readingTime,
      publishedAt: posts.publishedAt,
      updatedAt: posts.updatedAt,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .orderBy(desc(posts.updatedAt));
};

export const getAdminPostBySlug = async (
  db: DbClient,
  slug: string,
): Promise<AdminPostDetail | null> => {
  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);

  return post ?? null;
};

export const createAdminPost = async (db: DbClient, input: PostFormInput) => {
  const now = new Date().toISOString();

  await ensureDefaultCategories(db);
  await db.insert(posts).values({
    id: crypto.randomUUID(),
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt,
    contentMarkdown: input.contentMarkdown,
    contentHtml: input.contentHtml || null,
    contentFormat: input.contentFormat,
    featuredImage: input.featuredImage || "/deventro-workflow-hero.png",
    coverAltText: input.coverAltText || input.title,
    categoryId: input.categoryId,
    status: input.status,
    authorName: "DevEntro Team",
    seoTitle: input.seoTitle || input.title,
    seoDescription: input.seoDescription || input.excerpt,
    canonicalUrl: `/blog/${input.slug}`,
    ogImage: input.featuredImage || "/deventro-workflow-hero.png",
    affiliateDisclosureEnabled: input.affiliateDisclosureEnabled,
    pinterestTitle: input.title,
    pinterestDescription: input.excerpt,
    readingTime: input.readingTime,
    publishedAt: input.status === "published" ? now : null,
    createdAt: now,
    updatedAt: now,
  });
};

export const updateAdminPost = async (
  db: DbClient,
  currentSlug: string,
  input: PostFormInput,
) => {
  const existingPost = await getAdminPostBySlug(db, currentSlug);

  if (!existingPost) {
    return false;
  }

  const now = new Date().toISOString();

  await ensureDefaultCategories(db);
  await db
    .update(posts)
    .set({
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt,
      contentMarkdown: input.contentMarkdown,
      contentHtml: input.contentHtml || null,
      contentFormat: input.contentFormat,
      featuredImage: input.featuredImage || "/deventro-workflow-hero.png",
      coverAltText: input.coverAltText || input.title,
      categoryId: input.categoryId,
      status: input.status,
      seoTitle: input.seoTitle || input.title,
      seoDescription: input.seoDescription || input.excerpt,
      canonicalUrl: `/blog/${input.slug}`,
      ogImage: input.featuredImage || "/deventro-workflow-hero.png",
      affiliateDisclosureEnabled: input.affiliateDisclosureEnabled,
      readingTime: input.readingTime,
      publishedAt:
        input.status === "published"
          ? (existingPost.publishedAt ?? now)
          : existingPost.publishedAt,
      updatedAt: now,
    })
    .where(eq(posts.id, existingPost.id));

  return true;
};

export const deleteAdminPost = async (db: DbClient, slug: string) => {
  await db.delete(posts).where(eq(posts.slug, slug));
};

export const adminPostSlugExists = async (
  db: DbClient,
  slug: string,
  ignoredPostId?: string,
) => {
  const whereClause = ignoredPostId
    ? and(eq(posts.slug, slug), ne(posts.id, ignoredPostId))
    : eq(posts.slug, slug);
  const [post] = await db.select({ id: posts.id }).from(posts).where(whereClause);

  return Boolean(post);
};
