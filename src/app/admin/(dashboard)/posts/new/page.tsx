import { getDb } from "@/db/cloudflare";
import { PostForm } from "@/components/admin/post-form";
import { listAdminCategories } from "@/lib/admin-posts";

export const metadata = {
  title: "New Post | DevEntro Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  const db = await getDb();
  const categories = await listAdminCategories(db);

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          New post
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          Create a database-backed article.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Keep the draft simple for now. A dedicated Markdown editor comes in
          Phase 12.
        </p>
      </div>
      <PostForm
        action="/api/admin/posts"
        categories={categories}
        submitLabel="Create post"
      />
    </div>
  );
}
