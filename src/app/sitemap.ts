import type { MetadataRoute } from "next";

import { listPublishedPublicPosts } from "@/lib/public-posts";
import { siteMetadata } from "@/lib/seo";

const createUrl = (path: string) => new URL(path, siteMetadata.url).toString();

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

  const publishedPosts = await listPublishedPublicPosts();
  const blogRoutes: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: createUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
