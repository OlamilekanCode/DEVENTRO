import { and, desc, eq, inArray } from "drizzle-orm";

import type { DbClient } from "@/db/client";
import { getDb } from "@/db/cloudflare";
import { categories, posts, postTags, tags } from "@/db/schema";
import { ensureDefaultCategories } from "@/lib/admin-posts";
import type { BlogCategory, BlogPost, BlogTag } from "@/types/blog";

export type PublicBlogPost = BlogPost & {
  authorName: string;
  category: BlogCategory | undefined;
  contentFormat: "markdown" | "rich";
  contentHtml: string | null;
  tagItems: BlogTag[];
};

type PublicPostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentMarkdown: string;
  contentHtml: string | null;
  contentFormat: "markdown" | "rich";
  featuredImage: string | null;
  coverAltText: string | null;
  categoryId: string;
  categoryName: string | null;
  categorySlug: string | null;
  categoryDescription: string | null;
  authorName: string;
  seoTitle: string | null;
  seoDescription: string | null;
  canonicalUrl: string | null;
  ogImage: string | null;
  affiliateDisclosureEnabled: boolean;
  pinterestTitle: string | null;
  pinterestDescription: string | null;
  readingTime: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

const fallbackImage = "/deventro-workflow-hero.png";

const publicPostSelect = {
  id: posts.id,
  title: posts.title,
  slug: posts.slug,
  excerpt: posts.excerpt,
  contentMarkdown: posts.contentMarkdown,
  contentHtml: posts.contentHtml,
  contentFormat: posts.contentFormat,
  featuredImage: posts.featuredImage,
  coverAltText: posts.coverAltText,
  categoryId: posts.categoryId,
  categoryName: categories.name,
  categorySlug: categories.slug,
  categoryDescription: categories.description,
  authorName: posts.authorName,
  seoTitle: posts.seoTitle,
  seoDescription: posts.seoDescription,
  canonicalUrl: posts.canonicalUrl,
  ogImage: posts.ogImage,
  affiliateDisclosureEnabled: posts.affiliateDisclosureEnabled,
  pinterestTitle: posts.pinterestTitle,
  pinterestDescription: posts.pinterestDescription,
  readingTime: posts.readingTime,
  publishedAt: posts.publishedAt,
  createdAt: posts.createdAt,
  updatedAt: posts.updatedAt,
};

const getPostTags = async (db: DbClient, postIds: string[]) => {
  if (postIds.length === 0) {
    return new Map<string, BlogTag[]>();
  }

  const tagRows = await db
    .select({
      postId: postTags.postId,
      id: tags.id,
      name: tags.name,
      slug: tags.slug,
    })
    .from(postTags)
    .innerJoin(tags, eq(postTags.tagId, tags.id))
    .where(inArray(postTags.postId, postIds))
    .orderBy(tags.name);

  const tagsByPostId = new Map<string, BlogTag[]>();

  for (const row of tagRows) {
    const assignedTags = tagsByPostId.get(row.postId) ?? [];
    assignedTags.push({
      id: row.id,
      name: row.name,
      slug: row.slug,
    });
    tagsByPostId.set(row.postId, assignedTags);
  }

  return tagsByPostId;
};

const mapPublicPost = (
  row: PublicPostRow,
  tagItems: BlogTag[],
): PublicBlogPost => {
  const featuredImage = row.featuredImage || fallbackImage;

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    contentMarkdown: row.contentMarkdown,
    contentHtml: row.contentHtml,
    contentFormat: row.contentFormat,
    featuredImage,
    coverAltText: row.coverAltText || row.title,
    categoryId: row.categoryId,
    category: row.categoryName
      ? {
          id: row.categoryId,
          name: row.categoryName,
          slug: row.categorySlug ?? row.categoryId,
          description: row.categoryDescription ?? "",
        }
      : undefined,
    tags: tagItems.map((tag) => tag.id),
    tagItems,
    status: "published",
    author: "deventro-team",
    authorName: row.authorName,
    seoTitle: row.seoTitle || row.title,
    seoDescription: row.seoDescription || row.excerpt,
    canonicalUrl: row.canonicalUrl || `/blog/${row.slug}`,
    ogImage: row.ogImage || featuredImage,
    affiliateDisclosureEnabled: row.affiliateDisclosureEnabled,
    pinterestTitle: row.pinterestTitle || row.title,
    pinterestDescription: row.pinterestDescription || row.excerpt,
    readingTime: row.readingTime,
    publishedAt: row.publishedAt,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
};

const mapPublicPosts = async (db: DbClient, rows: PublicPostRow[]) => {
  const tagsByPostId = await getPostTags(
    db,
    rows.map((row) => row.id),
  );

  return rows.map((row) => mapPublicPost(row, tagsByPostId.get(row.id) ?? []));
};

export const listPublishedPublicPosts = async (limit?: number) => {
  const db = await getDb();
  const query = db
    .select(publicPostSelect)
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.publishedAt), desc(posts.createdAt));

  const rows = typeof limit === "number" ? await query.limit(limit) : await query;

  return mapPublicPosts(db, rows);
};

export const listPublicCategories = async () => {
  const db = await getDb();

  await ensureDefaultCategories(db);

  return db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
    })
    .from(categories)
    .orderBy(categories.name);
};

export const getPublicCategoryBySlug = async (slug: string) => {
  const db = await getDb();

  await ensureDefaultCategories(db);

  const [category] = await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
    })
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1);

  return category
    ? {
        ...category,
        description: category.description ?? "",
      }
    : null;
};

export const getPublishedPublicPostBySlug = async (slug: string) => {
  const db = await getDb();
  const [row] = await db
    .select(publicPostSelect)
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(and(eq(posts.slug, slug), eq(posts.status, "published")))
    .limit(1);

  if (!row) {
    return null;
  }

  const [post] = await mapPublicPosts(db, [row]);

  return post ?? null;
};

export const listRelatedPublishedPublicPosts = async (
  post: PublicBlogPost,
  limit = 2,
) => {
  const db = await getDb();
  const rows = await db
    .select(publicPostSelect)
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(
      and(
        eq(posts.status, "published"),
        eq(posts.categoryId, post.categoryId),
      ),
    )
    .orderBy(desc(posts.publishedAt), desc(posts.createdAt))
    .limit(limit + 1);

  const relatedPosts = await mapPublicPosts(db, rows);

  return relatedPosts.filter((candidate) => candidate.id !== post.id).slice(0, limit);
};
