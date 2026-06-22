import { notFound } from "next/navigation";

import { TagForm } from "@/components/admin/tag-form";
import { getDb } from "@/db/cloudflare";
import { getAdminTagBySlug } from "@/lib/admin-taxonomy";

type EditTagPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const metadata = {
  title: "Edit Tag | DevEntro Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function EditTagPage({ params }: EditTagPageProps) {
  const { slug } = await params;
  const db = await getDb();
  const tag = await getAdminTagBySlug(db, slug);

  if (!tag) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Edit tag
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
            {tag.name}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Update the tag label and slug.
          </p>
        </div>
        <form action={`/api/admin/tags/${tag.slug}`} method="post">
          <input type="hidden" name="_action" value="delete" />
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-md border border-destructive/30 bg-destructive/10 px-4 text-sm font-semibold text-destructive hover:bg-destructive/15"
          >
            Delete tag
          </button>
        </form>
      </div>
      <TagForm
        action={`/api/admin/tags/${tag.slug}`}
        submitLabel="Save changes"
        tag={{
          id: tag.id,
          name: tag.name,
          slug: tag.slug,
        }}
      />
    </div>
  );
}
