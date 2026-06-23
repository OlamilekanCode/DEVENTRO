import Link from "next/link";
import { FileText, Plus } from "lucide-react";

import { getDb } from "@/db/cloudflare";
import { listAdminPosts } from "@/lib/admin-posts";

type AdminPostsPageProps = {
  searchParams?: Promise<{
    deleted?: string;
    saved?: string;
    error?: string;
  }>;
};

const messages = {
  deleted: "Post deleted.",
  saved: "Post saved.",
  error: "The post could not be saved. Check the required fields and slug.",
} as const;

export const metadata = {
  title: "Posts | DevEntro Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminPostsPage({
  searchParams,
}: AdminPostsPageProps) {
  const params = await searchParams;
  const db = await getDb();
  const postItems = await listAdminPosts(db);
  const message = params?.deleted
    ? messages.deleted
    : params?.saved
      ? messages.saved
      : params?.error
        ? messages.error
        : null;

  return (
    <div className="mx-auto w-full max-w-7xl">
      <section className="rounded-md border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Posts
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              Manage articles and drafts.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Create, update, publish, archive, and delete DevEntro posts from
              one simple editorial table.
            </p>
          </div>
          <Link
            href="/admin/posts/new"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/80"
          >
            <Plus className="size-4" aria-hidden="true" />
            New post
          </Link>
        </div>
      </section>

      {message ? (
        <div className="mt-5 rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-sm">
          {message}
        </div>
      ) : null}

      <section className="mt-6 overflow-hidden rounded-md border border-border bg-card shadow-sm">
        {postItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] border-collapse text-left text-sm">
              <thead className="border-b border-border bg-muted/60 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-semibold">Title</th>
                  <th className="px-5 py-3 font-semibold">Category</th>
                  <th className="px-5 py-3 font-semibold">Tags</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Read</th>
                  <th className="px-5 py-3 font-semibold">Updated</th>
                  <th className="px-5 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {postItems.map((post) => (
                  <tr key={post.id} className="align-top">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-foreground">
                        {post.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        /blog/{post.slug}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {post.categoryName ?? "Uncategorized"}
                    </td>
                    <td className="px-5 py-4">
                      {post.tagNames.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {post.tagNames.map((tagName) => (
                            <span
                              key={tagName}
                              className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
                            >
                              {tagName}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">None</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-md bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground">
                        {post.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {post.readingTime} min
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {new Intl.DateTimeFormat("en", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }).format(new Date(post.updatedAt))}
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/posts/${post.slug}/edit`}
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
        ) : (
          <div className="grid min-h-72 place-items-center px-6 py-12 text-center">
            <div>
              <FileText
                className="mx-auto size-10 text-muted-foreground"
                aria-hidden="true"
              />
              <h2 className="mt-4 text-lg font-semibold text-foreground">
                No D1 posts yet.
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Create the first database-backed post. Published posts appear
                on the public blog through the D1 publishing flow.
              </p>
              <Link
                href="/admin/posts/new"
                className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/80"
              >
                Create post
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
