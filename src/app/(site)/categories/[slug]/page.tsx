import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FolderOpen } from "lucide-react";

import { BlogCard } from "@/components/blog/blog-card";
import { blogCategories } from "@/lib/blog-data";
import { listPublishedPublicPosts } from "@/lib/public-posts";
import { createPageMetadata } from "@/lib/seo";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = blogCategories.find((item) => item.slug === slug);

  if (!category) {
    return createPageMetadata({
      title: "Category",
      description: "Browse DevEntro articles by category.",
      path: `/categories/${slug}`,
    });
  }

  return createPageMetadata({
    title: category.name,
    description: category.description,
    path: `/categories/${category.slug}`,
  });
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = blogCategories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const posts = (await listPublishedPublicPosts()).filter(
    (post) => post.category?.slug === category.slug,
  );

  return (
    <main>
      <section className="border-b border-border bg-card">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <Link
            href="/categories"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All categories
          </Link>
          <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
            <FolderOpen className="size-4 text-teal-600" aria-hidden="true" />
            Category
          </p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-foreground sm:text-5xl">
            {category.name}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            {category.description}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {posts.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                category={post.category}
                tags={post.tagItems}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-border bg-card p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground">
              No published articles yet.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              This category is ready. Published posts assigned to it will appear
              here automatically.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
