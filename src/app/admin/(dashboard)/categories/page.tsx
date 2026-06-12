import { FolderTree } from "lucide-react";

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

export default async function AdminCategoriesPage() {
  const db = await getDb();
  const categories = await listAdminCategories(db);

  return (
    <div className="mx-auto w-full max-w-5xl">
      <section className="rounded-md border border-border bg-card p-6 shadow-sm sm:p-8">
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
              These default blog categories are available when creating or
              editing posts.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-md border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead className="border-b border-border bg-muted/60 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Slug</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
