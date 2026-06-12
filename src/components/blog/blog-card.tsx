import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";

import type { BlogCategory, BlogPost, BlogTag } from "@/types/blog";

type BlogCardProps = {
  category: BlogCategory | undefined;
  post: BlogPost;
  priority?: boolean;
  tags?: BlogTag[];
};

export function BlogCard({
  category,
  post,
  priority = false,
  tags = [],
}: BlogCardProps) {
  const publishedDate = post.publishedAt
    ? new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(post.publishedAt))
    : "Draft";

  return (
    <article className="card-lift overflow-hidden rounded-md border border-border bg-card shadow-sm">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-muted">
          <Image
            src={post.featuredImage}
            alt={post.coverAltText}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 360px, 100vw"
            className="object-cover transition-transform duration-300 hover:scale-[1.03]"
          />
        </div>
      </Link>
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
            {category?.name ?? "Article"}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <Clock3 className="size-3.5" aria-hidden="true" />
            {post.readingTime} min read
          </span>
        </div>
        <h2 className="mt-4 text-xl font-bold leading-snug text-foreground">
          <Link href={`/blog/${post.slug}`} className="hover:text-teal-700">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {post.excerpt}
        </p>
        {tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-muted-foreground"
              >
                {tag.name}
              </span>
            ))}
          </div>
        ) : null}
        <div className="mt-5 flex items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>{publishedDate}</span>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 font-semibold text-foreground hover:text-teal-700"
          >
            Read
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
