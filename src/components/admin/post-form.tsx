import Link from "next/link";

import { ContentEditorField } from "@/components/admin/content-editor-field";
import { Button } from "@/components/ui/button";
import type { AdminPostDetail } from "@/lib/admin-posts";

type CategoryOption = {
  id: string;
  name: string;
};

type PostFormProps = {
  action: string;
  categories: CategoryOption[];
  post?: AdminPostDetail;
  submitLabel: string;
};

export function PostForm({
  action,
  categories,
  post,
  submitLabel,
}: PostFormProps) {
  const contentFormat = post?.contentFormat ?? "markdown";

  return (
    <form action={action} method="post" className="grid gap-6">
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="rounded-md border border-border bg-card p-5 shadow-sm">
          <div className="grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-foreground">Title</span>
              <input
                required
                name="title"
                defaultValue={post?.title ?? ""}
                className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-foreground">Slug</span>
              <input
                name="slug"
                defaultValue={post?.slug ?? ""}
                placeholder="Generated from title if empty"
                className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-foreground">
                Excerpt
              </span>
              <textarea
                required
                name="excerpt"
                defaultValue={post?.excerpt ?? ""}
                rows={4}
                className="resize-y rounded-md border border-border bg-background px-3 py-3 text-sm leading-6 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </label>
            <ContentEditorField
              defaultFormat={contentFormat}
              defaultHtml={post?.contentHtml}
              defaultMarkdown={post?.contentMarkdown ?? ""}
            />
          </div>
        </div>

        <aside className="grid content-start gap-5">
          <div className="rounded-md border border-border bg-card p-5 shadow-sm">
            <p className="text-sm font-semibold text-foreground">Publishing</p>
            <div className="mt-4 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">
                  Status
                </span>
                <select
                  name="status"
                  defaultValue={post?.status ?? "draft"}
                  className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">
                  Category
                </span>
                <select
                  required
                  name="categoryId"
                  defaultValue={post?.categoryId ?? categories[0]?.id}
                  className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">
                  Reading time
                </span>
                <input
                  required
                  min={1}
                  name="readingTime"
                  type="number"
                  defaultValue={post?.readingTime ?? 4}
                  className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
              <label className="flex items-start gap-3 rounded-md border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
                <input
                  name="affiliateDisclosureEnabled"
                  type="checkbox"
                  defaultChecked={post?.affiliateDisclosureEnabled ?? false}
                  className="mt-1"
                />
                Show affiliate disclosure on this post.
              </label>
            </div>
          </div>

          <div className="rounded-md border border-border bg-card p-5 shadow-sm">
            <p className="text-sm font-semibold text-foreground">SEO</p>
            <div className="mt-4 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">
                  SEO title
                </span>
                <input
                  name="seoTitle"
                  defaultValue={post?.seoTitle ?? ""}
                  className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">
                  SEO description
                </span>
                <textarea
                  name="seoDescription"
                  defaultValue={post?.seoDescription ?? ""}
                  rows={3}
                  className="resize-y rounded-md border border-border bg-background px-3 py-3 text-sm leading-6 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
            </div>
          </div>

          <div className="rounded-md border border-border bg-card p-5 shadow-sm">
            <p className="text-sm font-semibold text-foreground">Image</p>
            <div className="mt-4 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">
                  Featured image path
                </span>
                <input
                  name="featuredImage"
                  defaultValue={post?.featuredImage ?? "/deventro-workflow-hero.png"}
                  className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">
                  Cover alt text
                </span>
                <input
                  name="coverAltText"
                  defaultValue={post?.coverAltText ?? ""}
                  className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
            </div>
          </div>
        </aside>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/admin/posts"
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
