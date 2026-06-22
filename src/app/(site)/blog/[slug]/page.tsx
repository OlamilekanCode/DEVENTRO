import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3, ShieldCheck } from "lucide-react";

import { InlineAd } from "@/components/ads/inline-ad";
import { SidebarAd } from "@/components/ads/sidebar-ad";
import { ArticleContent } from "@/components/blog/article-content";
import { BlogCard } from "@/components/blog/blog-card";
import {
  getPublishedPublicPostBySlug,
  listRelatedPublishedPublicPosts,
} from "@/lib/public-posts";
import { createAbsoluteUrl, siteMetadata } from "@/lib/seo";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPublicPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: {
      canonical: createAbsoluteUrl(post.canonicalUrl),
    },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: createAbsoluteUrl(post.canonicalUrl),
      siteName: siteMetadata.name,
      images: [
        {
          url: createAbsoluteUrl(post.ogImage),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: ["DevEntro Team"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
      images: [createAbsoluteUrl(post.ogImage)],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getPublishedPublicPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const category = post.category;
  const tags = post.tagItems;
  const relatedPosts = await listRelatedPublishedPublicPosts(post);
  const publishedDate = post.publishedAt
    ? new Intl.DateTimeFormat("en", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date(post.publishedAt))
    : "Draft";
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: createAbsoluteUrl(post.ogImage),
    datePublished: post.publishedAt ?? post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: "DevEntro Team",
      url: siteMetadata.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteMetadata.name,
      url: siteMetadata.url,
    },
    mainEntityOfPage: createAbsoluteUrl(post.canonicalUrl),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article>
        <header className="border-b border-border bg-card">
          <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to blog
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
                {category?.name ?? "Article"}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <Clock3 className="size-3.5" aria-hidden="true" />
                {post.readingTime} min read
              </span>
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {post.excerpt}
            </p>
            <p className="mt-6 text-sm font-medium text-muted-foreground">
              By DevEntro Team / {publishedDate}
            </p>
            {tags.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-border bg-muted shadow-sm">
            <Image
              src={post.featuredImage}
              alt={post.coverAltText}
              fill
              priority
              sizes="(min-width: 1024px) 960px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-8">
          <div className="min-w-0">
            {post.affiliateDisclosureEnabled ? (
              <aside className="mb-8 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                This post may contain affiliate links. We may earn a small
                commission if you buy through our links at no extra cost to you.
              </aside>
            ) : null}

            <div className="rounded-md border border-border bg-card p-6 shadow-sm sm:p-8">
              <ArticleContent post={post} />
            </div>

            <InlineAd label="Inline article advertisement" />
          </div>

          <aside className="space-y-5">
            <div className="rounded-md border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-teal-600" aria-hidden="true" />
                <p className="text-sm font-semibold uppercase text-muted-foreground">
                  Editorial Notes
                </p>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Reviews and guides are designed to stay practical, transparent,
                and useful before any monetization gets layered in.
              </p>
            </div>
            <SidebarAd />
            {tags.length > 0 ? (
              <div className="rounded-md border border-border bg-card p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase text-muted-foreground">
                  Tags
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </article>

      {relatedPosts.length > 0 ? (
        <section className="border-t border-border bg-card">
          <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground">
              Related articles
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <BlogCard
                  key={relatedPost.id}
                  post={relatedPost}
                  category={relatedPost.category}
                  tags={relatedPost.tagItems}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
