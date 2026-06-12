import { and, desc, eq, inArray, ne } from "drizzle-orm";

import type { DbClient } from "@/db/client";
import { categories, posts, postTags, tags } from "@/db/schema";
import { blogCategories, blogTags } from "@/lib/blog-data";
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
  tagNames: string[];
};

export type AdminTagOption = typeof tags.$inferSelect;
export type AdminPostDetail = typeof posts.$inferSelect & {
  tags: AdminTagOption[];
  tagsText: string;
};

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

export const ensureDefaultTags = async (db: DbClient) => {
  await db
    .insert(tags)
    .values(
      blogTags.map((tag) => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
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

export const listAdminTags = async (db: DbClient) => {
  await ensureDefaultTags(db);

  return db
    .select({
      id: tags.id,
      name: tags.name,
      slug: tags.slug,
      createdAt: tags.createdAt,
      updatedAt: tags.updatedAt,
    })
    .from(tags)
    .orderBy(tags.name);
};

export const listAdminPosts = async (
  db: DbClient,
): Promise<AdminPostListItem[]> => {
  await ensureDefaultCategories(db);

  const postItems = await db
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

  const postIds = postItems.map((post) => post.id);

  if (postIds.length === 0) {
    return [];
  }

  const tagRows = await db
    .select({
      postId: postTags.postId,
      name: tags.name,
    })
    .from(postTags)
    .innerJoin(tags, eq(postTags.tagId, tags.id))
    .where(inArray(postTags.postId, postIds))
    .orderBy(tags.name);

  const tagNamesByPostId = new Map<string, string[]>();

  for (const row of tagRows) {
    const existing = tagNamesByPostId.get(row.postId) ?? [];
    existing.push(row.name);
    tagNamesByPostId.set(row.postId, existing);
  }

  return postItems.map((post) => ({
    ...post,
    tagNames: tagNamesByPostId.get(post.id) ?? [],
  }));
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

  if (!post) {
    return null;
  }

  const assignedTags = await db
    .select({
      id: tags.id,
      name: tags.name,
      slug: tags.slug,
      createdAt: tags.createdAt,
      updatedAt: tags.updatedAt,
    })
    .from(postTags)
    .innerJoin(tags, eq(postTags.tagId, tags.id))
    .where(eq(postTags.postId, post.id))
    .orderBy(tags.name);

  return {
    ...post,
    tags: assignedTags,
    tagsText: assignedTags.map((tag) => tag.name).join(", "),
  };
};

export const createAdminPost = async (db: DbClient, input: PostFormInput) => {
  const now = new Date().toISOString();
  const postId = crypto.randomUUID();

  await ensureDefaultCategories(db);
  await ensureDefaultTags(db);
  await db.insert(posts).values({
    id: postId,
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
  await syncPostTags(db, postId, input.tagsText, now);
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
  await ensureDefaultTags(db);
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
  await syncPostTags(db, existingPost.id, input.tagsText, now);

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

const parseTagNames = (tagsText: string) =>
  Array.from(
    new Map(
      tagsText
        .split(",")
        .map((tagName) => tagName.trim())
        .filter(Boolean)
        .map((name) => [createTagSlug(name), name] as const)
        .filter(([slug]) => Boolean(slug)),
    ).entries(),
  ).map(([slug, name]) => ({ slug, name }));

const createTagSlug = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const syncPostTags = async (
  db: DbClient,
  postId: string,
  tagsText: string,
  now: string,
) => {
  const parsedTags = parseTagNames(tagsText);

  await db.delete(postTags).where(eq(postTags.postId, postId));

  if (parsedTags.length === 0) {
    return;
  }

  await db
    .insert(tags)
    .values(
      parsedTags.map((tag) => ({
        id: crypto.randomUUID(),
        name: tag.name,
        slug: tag.slug,
        createdAt: now,
        updatedAt: now,
      })),
    )
    .onConflictDoNothing();

  const savedTags = await db
    .select({
      id: tags.id,
      slug: tags.slug,
    })
    .from(tags)
    .where(
      inArray(
        tags.slug,
        parsedTags.map((tag) => tag.slug),
      ),
    );

  if (savedTags.length === 0) {
    return;
  }

  await db.insert(postTags).values(
    savedTags.map((tag) => ({
      postId,
      tagId: tag.id,
    })),
  );
};
