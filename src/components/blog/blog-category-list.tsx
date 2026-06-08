import Link from "next/link";

import type { BlogCategory } from "@/types/blog";

type BlogCategoryListProps = {
  categories: BlogCategory[];
};

export function BlogCategoryList({ categories }: BlogCategoryListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
