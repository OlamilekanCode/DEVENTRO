import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { BlogCategory } from "@/types/blog";

type CategoryFormProps = {
  action: string;
  category?: BlogCategory;
  submitLabel: string;
};

export function CategoryForm({
  action,
  category,
  submitLabel,
}: CategoryFormProps) {
  return (
    <form action={action} method="post" className="grid gap-6">
      <div className="rounded-md border border-border bg-card p-5 shadow-sm">
        <div className="grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-foreground">Name</span>
            <input
              required
              name="name"
              defaultValue={category?.name ?? ""}
              className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-foreground">Slug</span>
            <input
              name="slug"
              defaultValue={category?.slug ?? ""}
              placeholder="Generated from name if empty"
              className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-foreground">
              Description
            </span>
            <textarea
              name="description"
              defaultValue={category?.description ?? ""}
              rows={5}
              className="resize-y rounded-md border border-border bg-background px-3 py-3 text-sm leading-6 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/admin/categories"
          className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium hover:bg-muted"
        >
          Cancel
        </Link>
        <Button type="submit" className="h-10 rounded-md px-5">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
