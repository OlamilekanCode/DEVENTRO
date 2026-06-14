import type { MetadataRoute } from "next";

import { siteMetadata } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: new URL("/sitemap.xml", siteMetadata.url).toString(),
    host: siteMetadata.url,
  };
}
