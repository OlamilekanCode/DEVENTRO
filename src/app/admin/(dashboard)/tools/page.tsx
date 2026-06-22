import Link from "next/link";
import { Plus, Sparkles } from "lucide-react";

import { getDb } from "@/db/cloudflare";
import { listAdminAiTools } from "@/lib/ai-tools-db";

type AdminToolsPageProps = {
  searchParams?: Promise<{
    archived?: string;
    deleted?: string;
    saved?: string;
    error?: string;
  }>;
};

const messages = {
  archived: "Tool archived.",
  deleted: "Tool deleted.",
  saved: "Tool saved.",
  error: "The tool could not be saved. Check required fields and slug.",
} as const;

export const metadata = {
  title: "AI Tools | DevEntro Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminToolsPage({
  searchParams,
}: AdminToolsPageProps) {
  const params = await searchParams;
  const db = await getDb();
  const tools = await listAdminAiTools(db);
  const message = params?.archived
    ? messages.archived
    : params?.deleted
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
              AI Tools
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              Manage the tools directory.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Create, update, publish, feature, archive, and delete AI tool
              entries from D1.
            </p>
          </div>
          <Link
            href="/admin/tools/new"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/80"
          >
            <Plus className="size-4" aria-hidden="true" />
            New tool
          </Link>
        </div>
      </section>

      {message ? (
        <div className="mt-5 rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-sm">
          {message}
        </div>
      ) : null}

      <section className="mt-6 overflow-hidden rounded-md border border-border bg-card shadow-sm">
        {tools.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] border-collapse text-left text-sm">
              <thead className="border-b border-border bg-muted/60 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-semibold">Tool</th>
                  <th className="px-5 py-3 font-semibold">Category</th>
                  <th className="px-5 py-3 font-semibold">Pricing</th>
                  <th className="px-5 py-3 font-semibold">Score</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Featured</th>
                  <th className="px-5 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {tools.map((tool) => (
                  <tr key={tool.id} className="align-top">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-foreground">{tool.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        /tools/{tool.slug}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {tool.category}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {tool.pricingSummary}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {tool.overallScore > 0 ? `${tool.overallScore}/10` : "Pending"}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-md bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground">
                        {tool.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {tool.isFeatured ? "Yes" : "No"}
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/tools/${tool.slug}/edit`}
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
              <Sparkles
                className="mx-auto size-10 text-muted-foreground"
                aria-hidden="true"
              />
              <h2 className="mt-4 text-lg font-semibold text-foreground">
                No tools yet.
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Create the first database-backed AI tool entry.
              </p>
              <Link
                href="/admin/tools/new"
                className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/80"
              >
                Create tool
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
