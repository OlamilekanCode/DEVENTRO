import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  FlaskConical,
  ListChecks,
  Star,
} from "lucide-react";

import { AdBanner } from "@/components/ads/ad-banner";
import { SidebarAd } from "@/components/ads/sidebar-ad";
import { getDb } from "@/db/cloudflare";
import { getPublishedAiToolBySlug } from "@/lib/ai-tools-db";
import { createPageMetadata } from "@/lib/seo";

type ToolDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const statusLabels = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
} as const;

export async function generateMetadata({
  params,
}: ToolDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const db = await getDb();
  const tool = await getPublishedAiToolBySlug(db, slug);

  if (!tool) {
    return createPageMetadata({
      title: "AI Tool",
      description: "AI tool detail page on DevEntro.",
      path: `/tools/${slug}`,
    });
  }

  return createPageMetadata({
    title: `${tool.name} Review`,
    description: tool.description,
    path: `/tools/${tool.slug}`,
  });
}

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { slug } = await params;
  const db = await getDb();
  const tool = await getPublishedAiToolBySlug(db, slug);

  if (!tool) {
    notFound();
  }

  return (
    <main>
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
          <div>
            <Link
              href="/tools"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              All tools
            </Link>
            <div className="flex items-center gap-4">
              <span
                className={`grid size-14 place-items-center rounded-md ${tool.accentClass} text-lg font-bold text-white`}
              >
                {tool.name.slice(0, 1)}
              </span>
              <div>
                <p className="text-sm font-semibold uppercase text-teal-700">
                  {tool.category}
                </p>
                <h1 className="text-3xl font-bold text-foreground sm:text-5xl">
                  {tool.name}
                </h1>
              </div>
            </div>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
              {tool.fullDescription}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={tool.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-foreground px-5 text-sm font-semibold text-background transition-colors hover:bg-foreground/85"
              >
                Visit tool
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/affiliate-disclosure"
                className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Affiliate disclosure
              </Link>
            </div>
          </div>

          <aside className="rounded-md border border-border bg-background p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <FlaskConical className="size-5 text-teal-600" aria-hidden="true" />
              <p className="text-sm font-semibold uppercase text-muted-foreground">
                Review Status
              </p>
            </div>
            <p className="mt-4 text-2xl font-bold text-foreground">
              {statusLabels[tool.status]}
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {tool.overallScore > 0
                ? `Overall score: ${tool.overallScore}/10.`
                : "Full scored review data is pending."}
            </p>
          </aside>
        </div>
      </section>

      <AdBanner label="Tool detail advertisement" variant="top" />

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="grid gap-6">
          <article className="rounded-md border border-border bg-card p-6 shadow-sm">
            <ListChecks className="size-6 text-teal-600" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-foreground">
              Workflow fit
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {tool.fullDescription}
            </p>
          </article>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-md border border-border bg-card p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground">Pros</h2>
              <div className="mt-4 grid gap-3">
                {tool.pros.length > 0 ? (
                  tool.pros.map((item) => (
                    <p key={item} className="text-sm leading-6 text-muted-foreground">
                      {item}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Pros will be added after testing.
                  </p>
                )}
              </div>
            </article>
            <article className="rounded-md border border-border bg-card p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground">Cons</h2>
              <div className="mt-4 grid gap-3">
                {tool.cons.length > 0 ? (
                  tool.cons.map((item) => (
                    <p key={item} className="text-sm leading-6 text-muted-foreground">
                      {item}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Cons will be added after testing.
                  </p>
                )}
              </div>
            </article>
          </div>

          <article className="rounded-md border border-border bg-card p-6 shadow-sm">
            <CheckCircle2 className="size-6 text-teal-600" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-foreground">
              Best for
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {tool.bestFor.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>

        <aside className="space-y-5">
          <div className="rounded-md border border-border bg-card p-5 shadow-sm">
            <Star className="size-5 text-amber-500" aria-hidden="true" />
            <h2 className="mt-3 text-lg font-bold text-foreground">
              Review Scores
            </h2>
            <div className="mt-4 grid gap-3">
              {[
                ["Ease of use", tool.easeOfUseScore],
                ["Pricing value", tool.pricingValueScore],
                ["Features", tool.featuresScore],
                ["Developer usefulness", tool.developerUsefulnessScore],
                ["Overall", tool.overallScore],
              ].map(([label, value]) => (
                <div key={label} className="border-t border-border pt-3">
                  <p className="text-sm font-semibold text-foreground">{label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {Number(value) > 0 ? `${value}/10` : "Pending"}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <SidebarAd />
        </aside>
      </section>
    </main>
  );
}
