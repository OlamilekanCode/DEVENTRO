import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GitCompareArrows, Scale } from "lucide-react";

import { AdBanner } from "@/components/ads/ad-banner";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Comparisons",
  description:
    "Practical AI tool comparisons for developers choosing between editors, assistants, research tools, and workflow systems.",
  path: "/comparisons",
});

const comparisons = [
  {
    title: "Cursor vs GitHub Copilot",
    summary:
      "Editor-native agentic workflows compared with established coding assistance.",
    status: "Planned",
  },
  {
    title: "Claude vs ChatGPT for developers",
    summary:
      "Reasoning, context, debugging, writing, and everyday implementation support.",
    status: "In research",
  },
  {
    title: "Perplexity vs traditional search",
    summary:
      "Source-backed research speed, trust, and technical discovery tradeoffs.",
    status: "Planned",
  },
];

export default function ComparisonsPage() {
  return (
    <main>
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.75fr] lg:px-8">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
              <GitCompareArrows className="size-4 text-teal-600" />
              Comparisons
            </p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight text-foreground sm:text-5xl">
              Clear AI tool comparisons for practical decisions.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              DevEntro comparisons focus on workflow fit, pricing clarity, and
              what a developer should actually choose for a job.
            </p>
          </div>
          <aside className="rounded-md border border-border bg-background p-5 shadow-sm">
            <Scale className="size-6 text-teal-600" />
            <p className="mt-4 text-sm font-semibold uppercase text-muted-foreground">
              Evaluation Signals
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Each comparison should eventually score usability, pricing value,
              reliability, speed, and developer usefulness.
            </p>
          </aside>
        </div>
      </section>

      <AdBanner label="Top comparisons advertisement" variant="top" />

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        {comparisons.map((comparison) => (
          <article
            key={comparison.title}
            className="card-lift rounded-md border border-border bg-card p-5 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase text-teal-700">
              {comparison.status}
            </p>
            <h2 className="mt-3 text-xl font-bold text-foreground">
              {comparison.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {comparison.summary}
            </p>
            <Link
              href="/blog"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-teal-700"
            >
              Watch for articles
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
