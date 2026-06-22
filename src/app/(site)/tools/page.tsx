import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  FlaskConical,
  Search,
  ShieldCheck,
} from "lucide-react";

import { AdBanner } from "@/components/ads/ad-banner";
import { AiToolCard } from "@/components/ai-tools/ai-tool-card";
import { getDb } from "@/db/cloudflare";
import { listPublishedAiTools } from "@/lib/ai-tools-db";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AI Tools Directory",
  description:
    "A practical AI tools directory for developers, freelancers, and tech learners testing better workflows.",
  path: "/tools",
});

const reviewSignals = [
  "Real workflow usefulness",
  "Pricing and value clarity",
  "Developer fit",
  "Affiliate-ready disclosure",
];

export const dynamic = "force-dynamic";

export default async function ToolsPage() {
  const db = await getDb();
  const aiTools = await listPublishedAiTools(db);
  const featuredAiTools = aiTools.filter((tool) => tool.isFeatured);
  const aiToolCategories = Array.from(
    new Set(aiTools.map((tool) => tool.category)),
  ).sort();

  return (
    <main>
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.75fr] lg:px-8">
          <div className="animate-fade-up">
            <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
              <Bot className="size-4 text-teal-600" aria-hidden="true" />
              AI tools directory
            </p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight text-foreground sm:text-5xl">
              Practical AI tools for developer workflows.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              DevEntro tracks tools by how they help with coding, research,
              writing, learning, and everyday builder operations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#directory"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-teal-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
              >
                Browse tools
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
              >
                Read reviews
              </Link>
            </div>
          </div>

          <aside className="animate-fade-up-delay-1">
            <div className="border-l-2 border-teal-500 pl-5">
              <div className="flex items-center gap-3">
                <FlaskConical className="size-5 text-teal-600" aria-hidden="true" />
                <p className="text-sm font-semibold uppercase text-muted-foreground">
                  Review Method
                </p>
              </div>
              <div className="mt-5 grid gap-3">
                {reviewSignals.map((signal) => (
                  <div key={signal} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 text-teal-600" />
                    <p className="text-sm leading-6 text-muted-foreground">
                      {signal}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <AdBanner label="Top AI tools advertisement" variant="top" />

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-teal-700">
              Featured Tools
            </p>
            <h2 className="mt-2 text-3xl font-bold text-foreground">
              Start with the active testing queue.
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-teal-700"
          >
            See related articles
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredAiTools.map((tool) => (
            <AiToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <Search className="size-5 text-blue-600" aria-hidden="true" />
              <p className="text-sm font-semibold uppercase text-muted-foreground">
                Categories
              </p>
            </div>
            <h2 className="mt-3 text-3xl font-bold text-foreground">
              A directory shaped around real use cases.
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Categories stay broad in the MVP so the site can grow into tool
              pages, comparison pages, and affiliate placements cleanly.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {aiToolCategories.map((category) => {
              const count = aiTools.filter((tool) => tool.category === category).length;

              return (
                <div
                  key={category}
                  className="rounded-md border border-border bg-background p-4"
                >
                  <p className="font-semibold text-foreground">{category}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {count} {count === 1 ? "tool" : "tools"} tracked
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="directory"
        className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-8"
      >
        <div className="min-w-0">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase text-blue-700">
              Directory
            </p>
            <h2 className="mt-2 text-3xl font-bold text-foreground">
              Tools being tracked by DevEntro.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              These entries are intentionally conservative. More tools, review
              pages, and ratings can be added after the editorial workflow is
              stable.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {aiTools.map((tool) => (
              <AiToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-md border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-teal-600" aria-hidden="true" />
              <p className="text-sm font-semibold uppercase text-muted-foreground">
                Disclosure
              </p>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Some future tool links may become affiliate links. Reviews should
              remain practical, transparent, and useful first.
            </p>
          </div>
          <div className="rounded-md border border-dashed border-border bg-card p-5 text-center text-sm font-medium uppercase text-muted-foreground">
            Sidebar advertisement
          </div>
        </aside>
      </section>

      <AdBanner label="Footer AI tools advertisement" variant="footer" />
    </main>
  );
}
