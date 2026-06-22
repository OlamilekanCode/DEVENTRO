import {
  BarChart3,
  Clock3,
  FileText,
  FolderTree,
  Megaphone,
  Newspaper,
  Sparkles,
  Tags,
  Users,
} from "lucide-react";

import { getDb } from "@/db/cloudflare";
import { getAdminDashboardData } from "@/lib/admin-dashboard";

export const metadata = {
  title: "Admin | DevEntro",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export default async function AdminPage() {
  const db = await getDb();
  const { metrics, recentPosts, recentSubscribers } =
    await getAdminDashboardData(db);
  const dashboardCards = [
    {
      label: "Total posts",
      value: metrics.totalPosts,
      note: `${metrics.publishedPosts} published / ${metrics.draftPosts} drafts`,
      icon: Newspaper,
    },
    {
      label: "AI tools",
      value: metrics.totalTools,
      note: "Database-backed directory entries",
      icon: Sparkles,
    },
    {
      label: "Categories",
      value: metrics.totalCategories,
      note: "Available for public category pages",
      icon: FolderTree,
    },
    {
      label: "Tags",
      value: metrics.totalTags,
      note: "Used across article metadata",
      icon: Tags,
    },
    {
      label: "Subscribers",
      value: metrics.totalSubscribers,
      note: "Newsletter captures in D1",
      icon: Users,
    },
    {
      label: "Ad placements",
      value: metrics.adPlacementCount,
      note: "Placeholder placements, no live scripts",
      icon: Megaphone,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl">
      <section className="rounded-md border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Real DevEntro content metrics.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
              Dashboard numbers now come from D1 for posts, tools, taxonomy,
              newsletter, and ad placement records.
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
                  D1 metrics connected
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
                Recent posts
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Latest D1 post records
              </p>
            </div>
            <Clock3 className="size-5 text-muted-foreground" aria-hidden="true" />
          </div>
          <div className="mt-5 divide-y divide-border">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <article key={post.id} className="py-4 first:pt-0 last:pb-0">
                  <p className="text-sm font-semibold text-foreground">
                    {post.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {post.readingTime} min read - {post.status} -{" "}
                    {formatDate(post.updatedAt)}
                  </p>
                </article>
              ))
            ) : (
              <div className="py-8 text-sm text-muted-foreground">
                No D1 posts yet.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-md border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Users className="size-5 text-primary" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Recent subscribers
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Latest newsletter captures
              </p>
            </div>
          </div>
          <div className="mt-5 divide-y divide-border">
            {recentSubscribers.length > 0 ? (
              recentSubscribers.map((subscriber) => (
                <article
                  key={subscriber.id}
                  className="py-4 first:pt-0 last:pb-0"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {subscriber.email}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {subscriber.source} - {subscriber.status} -{" "}
                    {formatDate(subscriber.createdAt)}
                  </p>
                </article>
              ))
            ) : (
              <div className="py-8 text-sm text-muted-foreground">
                No subscribers captured yet.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-md border border-border bg-card p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <FileText className="mt-0.5 size-5 text-primary" aria-hidden="true" />
          <p className="text-sm leading-6 text-muted-foreground">
            Analytics, traffic, and revenue numbers are still placeholders until
            a privacy-friendly analytics provider or ad network is intentionally
            connected.
          </p>
        </div>
      </section>
    </div>
  );
}
