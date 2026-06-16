import Link from "next/link";
import { Sparkles } from "lucide-react";

import { aiTools } from "@/lib/ai-tools-data";

export const metadata = {
  title: "AI Tools | DevEntro Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminToolsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <section className="rounded-md border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-4">
          <div className="grid size-11 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
            <Sparkles className="size-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              AI Tools
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              Tool management placeholder.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              This route keeps admin navigation intact. Database-backed AI tool
              CRUD is scheduled for the next correction phase.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-md border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="border-b border-border bg-muted/60 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">Tool</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Public page</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {aiTools.map((tool) => (
                <tr key={tool.id}>
                  <td className="px-5 py-4 font-semibold text-foreground">
                    {tool.name}
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {tool.category}
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {tool.reviewStatus}
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="text-sm font-semibold text-primary hover:text-primary/80"
                    >
                      View
                    </Link>
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
