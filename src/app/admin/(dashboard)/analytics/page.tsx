import { BarChart3, Clock3, Eye, MousePointerClick } from "lucide-react";

export const metadata = {
  title: "Analytics | DevEntro Admin",
  robots: {
    index: false,
    follow: false,
  },
};

const metrics = [
  {
    label: "Page views",
    value: "Pending",
    note: "Connect privacy-friendly analytics later.",
    icon: Eye,
  },
  {
    label: "Top articles",
    value: "Pending",
    note: "Will use analytics provider data.",
    icon: BarChart3,
  },
  {
    label: "Ad clicks",
    value: "Pending",
    note: "Reserved for sponsor and affiliate tracking.",
    icon: MousePointerClick,
  },
  {
    label: "Last sync",
    value: "Not set",
    note: "No analytics integration in MVP yet.",
    icon: Clock3,
  },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <section className="rounded-md border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-4">
          <div className="grid size-11 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
            <BarChart3 className="size-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Analytics
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              Placeholder metrics dashboard.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              This page prevents broken admin navigation and reserves the layout
              for future traffic, affiliate, and ad performance reporting.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <article
              key={metric.label}
              className="rounded-md border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                    {metric.value}
                  </p>
                </div>
                <span className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-4 text-xs font-medium leading-5 text-muted-foreground">
                {metric.note}
              </p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
