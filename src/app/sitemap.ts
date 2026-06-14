import type { MetadataRoute } from "next";

import { getPublishedBlogPosts } from "@/lib/blog-data";
import { siteMetadata } from "@/lib/seo";

const createUrl = (path: string) => new URL(path, siteMetadata.url).toString();

export default function sitemap(): MetadataRoute.Sitemap {
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
      url: createUrl("/ai-tools"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: createUrl("/newsletter"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getPublishedBlogPosts().map((post) => ({
    url: createUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
