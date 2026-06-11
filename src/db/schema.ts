import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const postStatusValues = ["draft", "published", "archived"] as const;
export const postContentFormatValues = ["markdown", "rich"] as const;
export const adPlacementTypeValues = [
  "top_banner",
  "inline_article",
  "sidebar",
  "mobile_sticky",
  "footer",
] as const;

const timestamps = {
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
};

export const categories = sqliteTable(
  "categories",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    ...timestamps,
  },
);

export const tags = sqliteTable(
  "tags",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    ...timestamps,
  },
);

export const posts = sqliteTable(
  "posts",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    excerpt: text("excerpt").notNull(),
    contentMarkdown: text("content_markdown").notNull(),
    contentHtml: text("content_html"),
    contentFormat: text("content_format", {
      enum: postContentFormatValues,
    })
      .notNull()
      .default("markdown"),
    featuredImage: text("featured_image"),
    coverAltText: text("cover_alt_text"),
    categoryId: text("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    status: text("status", { enum: postStatusValues }).notNull().default("draft"),
    authorName: text("author_name").notNull(),
    authorAvatar: text("author_avatar"),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    canonicalUrl: text("canonical_url"),
    ogImage: text("og_image"),
    affiliateDisclosureEnabled: integer("affiliate_disclosure_enabled", {
      mode: "boolean",
    })
      .notNull()
      .default(false),
    pinterestTitle: text("pinterest_title"),
    pinterestDescription: text("pinterest_description"),
    readingTime: integer("reading_time").notNull().default(1),
    publishedAt: text("published_at"),
    ...timestamps,
  },
  (table) => [
    index("posts_status_idx").on(table.status),
    index("posts_category_idx").on(table.categoryId),
  ],
);

export const postTags = sqliteTable(
  "post_tags",
  {
    postId: text("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.postId, table.tagId] })],
);

export const aiTools = sqliteTable(
  "ai_tools",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    tagline: text("tagline").notNull(),
    description: text("description").notNull(),
    websiteUrl: text("website_url").notNull(),
    category: text("category").notNull(),
    pricingSummary: text("pricing_summary"),
    affiliateUrl: text("affiliate_url"),
    logoUrl: text("logo_url"),
    isFeatured: integer("is_featured", { mode: "boolean" }).notNull().default(false),
    status: text("status", { enum: postStatusValues }).notNull().default("draft"),
    ...timestamps,
  },
  (table) => [
    index("ai_tools_featured_idx").on(table.isFeatured),
  ],
);

export const adPlacements = sqliteTable(
  "ad_placements",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    placementType: text("placement_type", {
      enum: adPlacementTypeValues,
    }).notNull(),
    isEnabled: integer("is_enabled", { mode: "boolean" }).notNull().default(false),
    script: text("script"),
    sponsorImage: text("sponsor_image"),
    sponsorUrl: text("sponsor_url"),
    ...timestamps,
  },
  (table) => [
    index("ad_placements_type_idx").on(table.placementType),
    index("ad_placements_enabled_idx").on(table.isEnabled),
  ],
);

export const newsletterSubscribers = sqliteTable(
  "newsletter_subscribers",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    source: text("source").notNull().default("homepage"),
    isConfirmed: integer("is_confirmed", { mode: "boolean" }).notNull().default(false),
    createdAt: text("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("newsletter_email_idx").on(table.email)],
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  category: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id],
  }),
  postTags: many(postTags),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  postTags: many(postTags),
}));

export const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts, {
    fields: [postTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postTags.tagId],
    references: [tags.id],
  }),
}));
