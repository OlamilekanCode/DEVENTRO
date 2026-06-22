import Link from "next/link";
import { FolderTree, Plus } from "lucide-react";

import { getDb } from "@/db/cloudflare";
import { listAdminCategories } from "@/lib/admin-posts";

export const metadata = {
  title: "Categories | DevEntro Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

type AdminCategoriesPageProps = {
  searchParams?: Promise<{
    deleted?: string;
    error?: string;
    saved?: string;
  }>;
};

const messages = {
  deleted: "Category deleted.",
  saved: "Category saved.",
  error: "Category could not be saved or deleted.",
} as const;

export default async function AdminCategoriesPage({
  searchParams,
}: AdminCategoriesPageProps) {
  const params = await searchParams;
  const db = await getDb();
  const categories = await listAdminCategories(db);
  const message = params?.deleted
    ? messages.deleted
    : params?.saved
      ? messages.saved
      : params?.error
        ? messages.error
        : null;

  return (
    <div className="mx-auto w-full max-w-5xl">
      <section className="rounded-md border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="grid size-11 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
              <FolderTree className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Categories
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                Organize the editorial library.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                Create, edit, and delete categories used by posts and public
                category pages.
              </p>
            </div>
          </div>
          <Link
            href="/admin/categories/new"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/80"
          >
            <Plus className="size-4" aria-hidden="true" />
            New category
          </Link>
        </div>
      </section>

      {message ? (
        <div className="mt-5 rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-sm">
          {message}
        </div>
      ) : null}

      <section className="mt-6 overflow-hidden rounded-md border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="border-b border-border bg-muted/60 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Slug</th>
                <th className="px-5 py-3 font-semibold">Description</th>
                <th className="px-5 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-5 py-4 font-semibold text-foreground">
                    {category.name}
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {category.slug}
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {category.description ?? "No description"}
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/categories/${category.slug}/edit`}
                      className="font-semibold text-primary hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
