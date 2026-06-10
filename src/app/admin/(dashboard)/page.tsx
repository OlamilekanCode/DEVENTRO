import {
  BarChart3,
  Clock3,
  FileText,
  Megaphone,
  Newspaper,
  Sparkles,
  Users,
} from "lucide-react";

import { getPublishedBlogPosts } from "@/lib/blog-data";

export const metadata = {
  title: "Admin | DevEntro",
  robots: {
    index: false,
    follow: false,
  },
};

const dashboardCards = [
  {
    label: "Published articles",
    value: "3",
    note: "Local seed content",
    icon: Newspaper,
  },
  {
    label: "Draft workflow",
    value: "0",
    note: "Post CRUD comes next",
    icon: FileText,
  },
  {
    label: "AI tools queued",
    value: "3",
    note: "Directory phase later",
    icon: Sparkles,
  },
  {
    label: "Ad placements",
    value: "5",
    note: "Configured as placeholders",
    icon: Megaphone,
  },
];

const nextSteps = [
  "Build post CRUD for writing and editing articles.",
  "Connect Markdown editor after CRUD is stable.",
  "Keep ad controls prepared without adding live ad scripts yet.",
];

export default function AdminPage() {
  const latestPosts = getPublishedBlogPosts().slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-7xl">
      <section className="rounded-md border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Dashboard shell
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Manage DevEntro from one focused workspace.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
              This shell reserves the structure for posts, tools, categories,
              tags, ads, media, and settings. Functional CRUD begins in Phase 11.
            </p>
          </div>
          <div className="rounded-md border border-border bg-muted/50 px-4 py-3">
            <div className="flex items-center gap-3">
              <BarChart3 className="size-5 text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  MVP status
                </p>
                <p className="text-xs text-muted-foreground">
                  Auth and dashboard shell ready
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.label}
              className="rounded-md border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.label}
                  </p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                    {card.value}
                  </p>
                </div>
                <span className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-4 text-xs font-medium text-muted-foreground">
                {card.note}
              </p>
            </article>
          );
        })}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-md border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Recent articles
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Read-only preview from typed seed data
              </p>
            </div>
            <Clock3 className="size-5 text-muted-foreground" aria-hidden="true" />
          </div>
          <div className="mt-5 divide-y divide-border">
            {latestPosts.map((post) => (
              <article key={post.id} className="py-4 first:pt-0 last:pb-0">
                <p className="text-sm font-semibold text-foreground">
                  {post.title}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {post.readingTime} min read - {post.status}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Users className="size-5 text-primary" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Next build steps
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Controlled phases, no extra features
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {nextSteps.map((step) => (
              <div
                key={step}
                className="rounded-md border border-border bg-muted/40 px-4 py-3 text-sm leading-6 text-muted-foreground"
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
