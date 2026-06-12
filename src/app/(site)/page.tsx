import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  CheckCircle2,
  FlaskConical,
  Layers3,
  Mail,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
} from "lucide-react";

import { AdBanner } from "@/components/ads/ad-banner";
import { featuredAiTools } from "@/lib/ai-tools-data";
import { blogCategoriesById, getPublishedBlogPosts } from "@/lib/blog-data";

const toolStatusLabels = {
  reviewed: "Reviewed",
  testing: "Testing",
  queued: "Queued",
} as const;

const comparisonDesk = [
  {
    title: "Cursor vs GitHub Copilot",
    note: "Best fit for coding speed, refactors, and daily editor use.",
  },
  {
    title: "Claude vs ChatGPT for developers",
    note: "Planning, debugging, writing, and long-context tradeoffs.",
  },
  {
    title: "Perplexity vs traditional search",
    note: "Research quality, source checking, and developer discovery.",
  },
];

const workflowCards = [
  {
    icon: Search,
    title: "Research an unfamiliar stack",
    detail: "Find docs, compare choices, and turn open questions into a build plan.",
  },
  {
    icon: Layers3,
    title: "Turn notes into publishable guides",
    detail: "Shape rough experiments into articles, tutorials, and comparison pages.",
  },
  {
    icon: ShieldCheck,
    title: "Audit code with an AI assistant",
    detail: "Review risk areas, missing tests, and edge cases before shipping.",
  },
];

const signals = [
  "AI tool reviews",
  "Developer productivity",
  "Freelance workflows",
  "Tech learning systems",
];

const latestBlogPosts = getPublishedBlogPosts().slice(0, 3);

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <Image
          src="/deventro-workflow-hero.png"
          alt="AI workflow dashboard illustration"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(245,247,250,0.99)_0%,rgba(245,247,250,0.94)_36%,rgba(245,247,250,0.56)_72%,rgba(245,247,250,0.22)_100%)]" />
        <div className="relative mx-auto grid min-h-[670px] w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_0.8fr] lg:px-8">
          <div className="w-full max-w-[22rem] animate-fade-up sm:max-w-2xl">
            <p className="mb-5 inline-flex max-w-full items-center gap-2 rounded-md border border-border bg-background/85 px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
              <Sparkles className="size-4 text-teal-600" aria-hidden="true" />
              <span>AI tool reviews and workflow systems</span>
            </p>
            <h1 className="text-3xl font-bold leading-[1.12] text-foreground sm:text-5xl lg:text-6xl">
              Cut through AI tool noise and build workflows that actually ship.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              DevEntro is a developer-led publication for testing AI tools,
              reviewing productivity systems, and turning experiments into useful
              guides for builders, freelancers, and tech learners.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/ai-tools"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-teal-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
              >
                <Bot className="size-4" aria-hidden="true" />
                Explore AI tools
              </Link>
              <Link
                href="/blog"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-background/85 px-5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
              >
                <BookOpen className="size-4" aria-hidden="true" />
                Read latest articles
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {signals.map((signal) => (
                <span
                  key={signal}
                  className="rounded-md border border-border bg-background/75 px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden animate-fade-up-delay-1 lg:block">
            <div className="animate-float-slow rounded-md border border-border bg-card/90 p-5 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    DevEntro Review Desk
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Tool tests, comparisons, and workflow notes
                  </p>
                </div>
                <span className="rounded-md bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
                  Live queue
                </span>
              </div>
              <div className="mt-5 grid gap-3">
                {featuredAiTools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-3 rounded-md border border-border bg-background/80 p-3"
                  >
                    <span className={`size-9 rounded-md ${tool.accentClass}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">
                        {tool.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {tool.category}
                      </p>
                    </div>
                    <Timer className="size-4 text-muted-foreground" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AdBanner label="Top advertisement" variant="top" />

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="animate-fade-up">
            <p className="text-sm font-semibold uppercase text-teal-700">
              Featured AI Tools
            </p>
            <h2 className="mt-2 text-3xl font-bold text-foreground">
              Tools worth testing, not just listing
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              The directory will grow into reviews, scores, use cases, affiliate
              links, and honest notes from real developer workflows.
            </p>
          </div>
          <Link
            href="/ai-tools"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-teal-700"
          >
            View directory
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featuredAiTools.map((tool) => (
            <article
              key={tool.name}
              className="card-lift rounded-md border border-border bg-card p-5 shadow-sm"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className={`size-10 rounded-md ${tool.accentClass}`} />
                <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  <Star className="size-3.5 text-amber-500" aria-hidden="true" />
                  {toolStatusLabels[tool.reviewStatus]}
                </span>
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {tool.category}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-foreground">
                {tool.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {tool.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.75fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase text-blue-700">
              Editorial Pipeline
            </p>
            <h2 className="mt-2 text-3xl font-bold text-foreground">
              Reviews, guides, and systems with a developer lens
            </h2>
            <div className="mt-8 grid gap-4">
              {latestBlogPosts.map((article) => {
                const category = blogCategoriesById[article.categoryId];

                return (
                <article
                  key={article.id}
                  className="card-lift rounded-md border border-border bg-background p-5"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                      {category?.name ?? "Article"}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {article.readingTime} min read
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-foreground">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {article.excerpt}
                  </p>
                </article>
                );
              })}
            </div>
          </div>
          <aside className="rounded-md border border-border bg-background p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <FlaskConical className="size-5 text-teal-600" aria-hidden="true" />
              <p className="text-sm font-semibold uppercase text-muted-foreground">
                Test Method
              </p>
            </div>
            <div className="mt-6 grid gap-4">
              {[
                "Real workflow usefulness",
                "Pricing and value clarity",
                "Developer fit and learning curve",
                "Affiliate disclosure support",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 text-teal-600" aria-hidden="true" />
                  <p className="text-sm leading-6 text-muted-foreground">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-md border border-dashed border-border bg-muted/70 p-5 text-center text-sm font-medium text-muted-foreground">
              Sidebar advertisement
            </div>
          </aside>
        </div>
      </section>

      <AdBanner label="Inline homepage advertisement" variant="inline" />

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase text-amber-700">
            Comparison Desk
          </p>
          <h2 className="mt-2 text-3xl font-bold text-foreground">
            Clear choices for real work
          </h2>
          <div className="mt-6 grid gap-3">
            {comparisonDesk.map((comparison) => (
              <Link
                key={comparison.title}
                href="/comparisons"
                className="card-lift flex items-center justify-between gap-5 rounded-md border border-border bg-card p-4 shadow-sm"
              >
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    {comparison.title}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                    {comparison.note}
                  </span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase text-teal-700">
            Workflow Lab
          </p>
          <h2 className="mt-2 text-3xl font-bold text-foreground">
            Repeatable systems, not tool hype
          </h2>
          <div className="mt-6 grid gap-3">
            {workflowCards.map((workflow) => {
              const Icon = workflow.icon;

              return (
                <div
                  key={workflow.title}
                  className="card-lift flex items-start gap-3 rounded-md border border-border bg-card p-4 shadow-sm"
                >
                  <Icon className="mt-1 size-5 text-teal-600" aria-hidden="true" />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {workflow.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {workflow.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-foreground text-background">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_0.8fr] lg:px-8">
          <div>
            <Image
              src="/Logo 2.png"
              alt="DevEntro"
              width={174}
              height={42}
              className="h-9 w-auto"
            />
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase text-teal-300">
              <Mail className="size-4" aria-hidden="true" />
              Newsletter
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              Get the useful AI workflow notes first.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-background/70">
              Newsletter capture will connect to storage later. For now, this
              section reserves the public homepage experience.
            </p>
          </div>
          <form className="rounded-md border border-background/15 bg-background/5 p-4 lg:self-end">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="you@example.com"
                className="h-11 min-w-0 flex-1 rounded-md border border-background/20 bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-teal-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
              >
                <CheckCircle2 className="size-4" aria-hidden="true" />
                Join list
              </button>
            </div>
            <p className="mt-3 text-xs leading-5 text-background/55">
              Early notes on tool tests, workflow experiments, and practical AI
              systems. No automation or email backend yet.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
