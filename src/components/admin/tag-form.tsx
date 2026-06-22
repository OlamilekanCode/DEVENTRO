import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { BlogTag } from "@/types/blog";

type TagFormProps = {
  action: string;
  submitLabel: string;
  tag?: BlogTag;
};

export function TagForm({ action, submitLabel, tag }: TagFormProps) {
  return (
    <form action={action} method="post" className="grid gap-6">
      <div className="rounded-md border border-border bg-card p-5 shadow-sm">
        <div className="grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-foreground">Name</span>
            <input
              required
              name="name"
              defaultValue={tag?.name ?? ""}
              className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-foreground">Slug</span>
            <input
              name="slug"
              defaultValue={tag?.slug ?? ""}
              placeholder="Generated from name if empty"
              className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/admin/tags"
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
