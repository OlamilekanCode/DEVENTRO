import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FolderOpen } from "lucide-react";

import { BlogCategoryList } from "@/components/blog/blog-category-list";
import {
  listPublicCategories,
  listPublishedPublicPosts,
} from "@/lib/public-posts";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Categories",
  description:
    "Browse DevEntro articles by AI tools, freelancing, tech learning, comparisons, and developer workflows.",
  path: "/categories",
});

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const posts = await listPublishedPublicPosts();
  const categories = await listPublicCategories();

  return (
    <main>
      <section className="border-b border-border bg-card">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
            <FolderOpen className="size-4 text-teal-600" aria-hidden="true" />
            Categories
          </p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-foreground sm:text-5xl">
            Browse DevEntro by practical workflow topic.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            Categories keep the blog organized around the work builders actually
            do: selecting tools, improving systems, learning faster, and making
            better comparisons.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.75fr_1fr] lg:px-8">
        <aside className="rounded-md border border-border bg-card p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase text-muted-foreground">
            Quick Browse
          </p>
          <div className="mt-5">
            <BlogCategoryList
              categories={categories.map((category) => ({
                ...category,
                description: category.description ?? "",
              }))}
            />
          </div>
        </aside>
        <div className="grid gap-4">
          {categories.map((category) => {
            const count = posts.filter(
              (post) => post.category?.slug === category.slug,
            ).length;

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="card-lift rounded-md border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      {category.name}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {category.description}
                    </p>
                    <p className="mt-3 text-xs font-semibold uppercase text-muted-foreground">
                      {count} published {count === 1 ? "article" : "articles"}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 size-5 shrink-0 text-muted-foreground" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
