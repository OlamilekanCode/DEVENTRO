import { notFound } from "next/navigation";

import { AiToolForm } from "@/components/admin/ai-tool-form";
import { getDb } from "@/db/cloudflare";
import { getAdminAiToolBySlug } from "@/lib/ai-tools-db";

type EditAiToolPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const metadata = {
  title: "Edit AI Tool | DevEntro Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function EditAiToolPage({ params }: EditAiToolPageProps) {
  const { slug } = await params;
  const db = await getDb();
  const tool = await getAdminAiToolBySlug(db, slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Edit AI tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
            {tool.name}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Update public review fields and directory visibility.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <form action={`/api/admin/tools/${tool.slug}`} method="post">
            <input type="hidden" name="_action" value="archive" />
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-semibold text-foreground hover:bg-muted"
            >
              Archive tool
            </button>
          </form>
          <form action={`/api/admin/tools/${tool.slug}`} method="post">
            <input type="hidden" name="_action" value="delete" />
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-md border border-destructive/30 bg-destructive/10 px-4 text-sm font-semibold text-destructive hover:bg-destructive/15"
            >
              Delete tool
            </button>
          </form>
        </div>
      </div>
      <AiToolForm
        action={`/api/admin/tools/${tool.slug}`}
        submitLabel="Save changes"
        tool={tool}
      />
    </div>
  );
}
