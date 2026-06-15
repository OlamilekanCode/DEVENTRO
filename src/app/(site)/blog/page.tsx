import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Search } from "lucide-react";

import { AdBanner } from "@/components/ads/ad-banner";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogCategoryList } from "@/components/blog/blog-category-list";
import { blogCategories } from "@/lib/blog-data";
import { listPublishedPublicPosts } from "@/lib/public-posts";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  description:
    "AI tool reviews, developer productivity guides, comparisons, and workflow systems.",
  path: "/blog",
});

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await listPublishedPublicPosts();
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.75fr] lg:px-8">
          <div className="min-w-0 animate-fade-up">
            <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
              <BookOpen className="size-4 text-teal-600" aria-hidden="true" />
              DevEntro Blog
            </p>
            <h1 className="max-w-[21rem] text-3xl font-bold leading-tight text-foreground sm:max-w-3xl sm:text-5xl">
              AI tool reviews, workflow guides, and developer productivity notes.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              Practical articles for developers, freelancers, and tech learners
              who want better AI-assisted systems without the noise.
            </p>
          </div>
          <aside className="min-w-0 rounded-md border border-border bg-background p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <Search className="size-5 text-teal-600" aria-hidden="true" />
              <p className="text-sm font-semibold uppercase text-muted-foreground">
                Browse by topic
              </p>
            </div>
            <div className="mt-5">
              <BlogCategoryList categories={blogCategories} />
            </div>
          </aside>
        </div>
      </section>

      <AdBanner label="Top blog advertisement" variant="top" />

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {featuredPost ? (
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <BlogCard
              post={featuredPost}
              category={featuredPost.category}
              tags={featuredPost.tagItems}
              priority
            />
            <div className="rounded-md border border-border bg-card p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase text-teal-700">
                Latest from the desk
              </p>
              <h2 className="mt-3 text-3xl font-bold text-foreground">
                Start with the newest practical guide.
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                This listing now reads published articles from the DevEntro D1
                content database.
              </p>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-teal-700"
              >
                Open featured article
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        ) : null}

        {remainingPosts.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {remainingPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                category={post.category}
                tags={post.tagItems}
              />
            ))}
          </div>
        ) : null}
      </section>
    </>
  );
}
