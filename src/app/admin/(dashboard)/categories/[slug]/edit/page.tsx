import { notFound } from "next/navigation";

import { CategoryForm } from "@/components/admin/category-form";
import { getDb } from "@/db/cloudflare";
import { getAdminCategoryBySlug } from "@/lib/admin-taxonomy";

type EditCategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const metadata = {
  title: "Edit Category | DevEntro Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { slug } = await params;
  const db = await getDb();
  const category = await getAdminCategoryBySlug(db, slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Edit category
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
            {category.name}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Update the category label, slug, and public description.
          </p>
        </div>
        <form action={`/api/admin/categories/${category.slug}`} method="post">
          <input type="hidden" name="_action" value="delete" />
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-md border border-destructive/30 bg-destructive/10 px-4 text-sm font-semibold text-destructive hover:bg-destructive/15"
          >
            Delete category
          </button>
        </form>
      </div>
      <CategoryForm
        action={`/api/admin/categories/${category.slug}`}
        category={{
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description ?? "",
        }}
        submitLabel="Save changes"
      />
    </div>
  );
}
