export type BlogPostStatus = "draft" | "published" | "archived";
export type BlogPostContentFormat = "markdown" | "rich";

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type BlogTag = {
  id: string;
  name: string;
  slug: string;
};

export type BlogAuthor = {
  id: string;
  name: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentMarkdown: string;
  featuredImage: string;
  coverAltText: string;
  categoryId: string;
  tags: string[];
  status: BlogPostStatus;
  author: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  ogImage: string;
  affiliateDisclosureEnabled: boolean;
  pinterestTitle: string;
  pinterestDescription: string;
  readingTime: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
