import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FlaskConical,
  ListChecks,
} from "lucide-react";

import type { AiTool } from "@/types/ai-tool";

type AiToolCardProps = {
  tool: AiTool;
};

const statusLabels = {
  reviewed: "Reviewed",
  testing: "Testing",
  queued: "Queued",
} as const;

export function AiToolCard({ tool }: AiToolCardProps) {
  return (
    <article className="card-lift flex h-full flex-col rounded-md border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`grid size-11 shrink-0 place-items-center rounded-md ${tool.accentClass} text-sm font-bold text-white`}
            aria-hidden="true"
          >
            {tool.name.slice(0, 1)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-foreground">
              {tool.name}
            </p>
            <p className="text-sm text-muted-foreground">{tool.category}</p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
          <FlaskConical className="size-3.5" aria-hidden="true" />
          {statusLabels[tool.reviewStatus]}
        </span>
      </div>

      <h2 className="mt-5 text-xl font-bold leading-snug text-foreground">
        {tool.tagline}
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {tool.description}
      </p>

      <div className="mt-5 flex items-start gap-2 border-l-2 border-teal-500 pl-3">
        <ListChecks className="mt-0.5 size-4 shrink-0 text-teal-600" aria-hidden="true" />
        <p className="text-sm leading-6 text-muted-foreground">
          {tool.workflowFit}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {tool.bestFor.map((item) => (
          <span
            key={item}
            className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
          <CheckCircle2 className="size-4 text-teal-600" aria-hidden="true" />
          {tool.pricingSummary}
        </span>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/tools/${tool.slug}`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-foreground px-4 text-sm font-semibold text-background transition-colors hover:bg-foreground/85"
          >
            Details
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href={tool.websiteUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Visit
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
