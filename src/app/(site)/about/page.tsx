import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Compass, FlaskConical } from "lucide-react";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About DevEntro",
  description:
    "Learn how DevEntro tests AI tools, workflow systems, and developer productivity ideas with practical judgment.",
  path: "/about",
});

const principles = [
  "Test tools in real builder workflows before recommending them.",
  "Explain pricing, tradeoffs, and use cases without hype.",
  "Keep AI content useful for developers, freelancers, and tech learners.",
];

export default function AboutPage() {
  return (
    <main>
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.75fr] lg:px-8">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
              <Compass className="size-4 text-teal-600" aria-hidden="true" />
              About DevEntro
            </p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight text-foreground sm:text-5xl">
              A practical AI tools blog for builders who want signal.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              DevEntro exists to test AI tools, compare workflows, and publish
              clear guides for people building software, client systems, and
              learning routines.
            </p>
          </div>
          <aside className="rounded-md border border-border bg-background p-5 shadow-sm">
            <FlaskConical className="size-6 text-teal-600" aria-hidden="true" />
            <p className="mt-4 text-sm font-semibold uppercase text-muted-foreground">
              Editorial Standard
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Reviews should be grounded in practical use, not launch-day noise
              or shallow feature lists.
            </p>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase text-teal-700">
            What Guides The Site
          </p>
          <h2 className="mt-2 text-3xl font-bold text-foreground">
            Mature reviews, useful comparisons, and workflow-first writing.
          </h2>
        </div>
        <div className="grid gap-4">
          {principles.map((principle) => (
            <div
              key={principle}
              className="flex gap-3 rounded-md border border-border bg-card p-4 shadow-sm"
            >
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-teal-600" />
              <p className="text-sm leading-6 text-muted-foreground">
                {principle}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">
            Start with the latest practical guides.
          </h2>
          <Link
            href="/blog"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-foreground hover:text-teal-700"
          >
            Read the blog
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
