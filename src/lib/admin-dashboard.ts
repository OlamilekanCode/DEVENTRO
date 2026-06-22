import { count, desc, eq } from "drizzle-orm";

import type { DbClient } from "@/db/client";
import {
  adPlacements,
  aiTools,
  categories,
  newsletterSubscribers,
  posts,
  tags,
} from "@/db/schema";
import { ensureDefaultAdPlacements } from "@/lib/ad-placements";
import { ensureDefaultAiTools } from "@/lib/ai-tools-db";
import {
  ensureDefaultCategories,
  ensureDefaultTags,
} from "@/lib/admin-posts";

const getCount = async <T extends number>(
  query: Promise<{ value: T }[]>,
) => {
  const [row] = await query;

  return row?.value ?? 0;
};

export const getAdminDashboardData = async (db: DbClient) => {
  await Promise.all([
    ensureDefaultCategories(db),
    ensureDefaultTags(db),
    ensureDefaultAiTools(db),
    ensureDefaultAdPlacements(db),
  ]);

  const [
    totalPosts,
    publishedPosts,
    draftPosts,
    totalTools,
    totalCategories,
    totalTags,
    totalSubscribers,
    adPlacementCount,
    recentPosts,
    recentSubscribers,
  ] = await Promise.all([
    getCount(db.select({ value: count() }).from(posts)),
    getCount(
      db.select({ value: count() }).from(posts).where(eq(posts.status, "published")),
    ),
    getCount(
      db.select({ value: count() }).from(posts).where(eq(posts.status, "draft")),
    ),
    getCount(db.select({ value: count() }).from(aiTools)),
    getCount(db.select({ value: count() }).from(categories)),
    getCount(db.select({ value: count() }).from(tags)),
    getCount(db.select({ value: count() }).from(newsletterSubscribers)),
    getCount(db.select({ value: count() }).from(adPlacements)),
    db
      .select({
        id: posts.id,
        title: posts.title,
        status: posts.status,
        readingTime: posts.readingTime,
        updatedAt: posts.updatedAt,
      })
      .from(posts)
      .orderBy(desc(posts.updatedAt))
      .limit(5),
    db
      .select({
        id: newsletterSubscribers.id,
        email: newsletterSubscribers.email,
        source: newsletterSubscribers.source,
        status: newsletterSubscribers.status,
        createdAt: newsletterSubscribers.createdAt,
      })
      .from(newsletterSubscribers)
      .orderBy(desc(newsletterSubscribers.createdAt))
      .limit(5),
  ]);

  return {
    metrics: {
      totalPosts,
      publishedPosts,
      draftPosts,
      totalTools,
      totalCategories,
      totalTags,
      totalSubscribers,
      adPlacementCount,
    },
    recentPosts,
    recentSubscribers,
  };
};
