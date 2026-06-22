import type { MetadataRoute } from "next";

import { getDb } from "@/db/cloudflare";
import { listPublishedAiTools } from "@/lib/ai-tools-db";
import {
  listPublicCategories,
  listPublishedPublicPosts,
} from "@/lib/public-posts";
import { createAbsoluteUrl } from "@/lib/seo";

const createUrl = createAbsoluteUrl;

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: createUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: createUrl("/blog"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: createUrl("/tools"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: createUrl("/comparisons"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: createUrl("/categories"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: createUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: createUrl("/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: createUrl("/privacy-policy"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: createUrl("/affiliate-disclosure"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: createUrl("/terms"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: createUrl("/newsletter"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const db = await getDb();
  const [publishedPosts, categories, tools] = await Promise.all([
    listPublishedPublicPosts(),
    listPublicCategories(),
    listPublishedAiTools(db),
  ]);
  const blogRoutes: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: createUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: createUrl(`/categories/${category.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.65,
  }));
  const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: createUrl(`/tools/${tool.slug}`),
    lastModified: tool.updatedAt ? new Date(tool.updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...blogRoutes, ...categoryRoutes, ...toolRoutes];
}
