import type { BlogPostStatus } from "@/types/blog";
import type { BlogPostContentFormat } from "@/types/blog";

export type PostFormInput = {
  title: string;
  slug: string;
  excerpt: string;
  contentMarkdown: string;
  contentHtml: string;
  contentFormat: BlogPostContentFormat;
  categoryId: string;
  status: BlogPostStatus;
  seoTitle: string;
  seoDescription: string;
  featuredImage: string;
  coverAltText: string;
  readingTime: number;
  affiliateDisclosureEnabled: boolean;
};

const statusValues = ["draft", "published", "archived"] as const;
const contentFormatValues = ["markdown", "rich"] as const;

export const createSlug = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);

export const parsePostFormData = (formData: FormData): PostFormInput => {
  const title = String(formData.get("title") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  const status = String(formData.get("status") ?? "draft");
  const contentFormat = String(formData.get("contentFormat") ?? "markdown");
  const readingTime = Number.parseInt(
    String(formData.get("readingTime") ?? "1"),
    10,
  );

  return {
    title,
    slug: createSlug(rawSlug || title),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    contentMarkdown: String(formData.get("contentMarkdown") ?? "").trim(),
    contentHtml: String(formData.get("contentHtml") ?? "").trim(),
    contentFormat: contentFormatValues.includes(
      contentFormat as BlogPostContentFormat,
    )
      ? (contentFormat as BlogPostContentFormat)
      : "markdown",
    categoryId: String(formData.get("categoryId") ?? "").trim(),
    status: statusValues.includes(status as BlogPostStatus)
      ? (status as BlogPostStatus)
      : "draft",
    seoTitle: String(formData.get("seoTitle") ?? "").trim(),
    seoDescription: String(formData.get("seoDescription") ?? "").trim(),
    featuredImage: String(formData.get("featuredImage") ?? "").trim(),
    coverAltText: String(formData.get("coverAltText") ?? "").trim(),
    readingTime: Number.isFinite(readingTime) && readingTime > 0 ? readingTime : 1,
    affiliateDisclosureEnabled:
      String(formData.get("affiliateDisclosureEnabled") ?? "") === "on",
  };
};

export const validatePostFormInput = (input: PostFormInput): string | null => {
  if (!input.title || !input.slug || !input.excerpt) {
    return "missing";
  }

  if (input.contentFormat === "markdown" && !input.contentMarkdown) {
    return "missing";
  }

  if (input.contentFormat === "rich" && !input.contentHtml) {
    return "missing";
  }

  if (!input.categoryId) {
    return "category";
  }

  return null;
};
