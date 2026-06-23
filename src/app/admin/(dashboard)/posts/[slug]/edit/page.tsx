import { notFound } from "next/navigation";

import { PostForm } from "@/components/admin/post-form";
import { getDb } from "@/db/cloudflare";
import { getAdminPostBySlug, listAdminCategories } from "@/lib/admin-posts";

type EditPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const metadata = {
  title: "Edit Post | DevEntro Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = await params;
  const db = await getDb();
  const [post, categories] = await Promise.all([
    getAdminPostBySlug(db, slug),
    listAdminCategories(db),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Edit post
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
            {post.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Update content, metadata, editor format, and D1 publishing status.
          </p>
        </div>
        <form action={`/api/admin/posts/${post.slug}`} method="post">
          <input type="hidden" name="_action" value="delete" />
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-md border border-destructive/30 bg-destructive/10 px-4 text-sm font-semibold text-destructive hover:bg-destructive/15"
          >
            Delete post
          </button>
        </form>
      </div>
      <PostForm
        action={`/api/admin/posts/${post.slug}`}
        categories={categories}
        post={post}
        submitLabel="Save changes"
      />
    </div>
  );
}
