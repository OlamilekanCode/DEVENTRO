import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { AiTool } from "@/types/ai-tool";

type AiToolFormProps = {
  action: string;
  submitLabel: string;
  tool?: AiTool;
};

const scoreFields = [
  ["easeOfUseScore", "Ease of use"],
  ["pricingValueScore", "Pricing value"],
  ["featuresScore", "Features"],
  ["developerUsefulnessScore", "Developer usefulness"],
  ["overallScore", "Overall"],
] as const;

export function AiToolForm({ action, submitLabel, tool }: AiToolFormProps) {
  return (
    <form action={action} method="post" className="grid gap-6">
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="rounded-md border border-border bg-card p-5 shadow-sm">
          <div className="grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-foreground">Name</span>
              <input
                required
                name="name"
                defaultValue={tool?.name ?? ""}
                className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-foreground">Slug</span>
              <input
                name="slug"
                defaultValue={tool?.slug ?? ""}
                placeholder="Generated from name if empty"
                className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-foreground">
                Short description
              </span>
              <textarea
                required
                name="shortDescription"
                defaultValue={tool?.shortDescription ?? ""}
                rows={3}
                className="resize-y rounded-md border border-border bg-background px-3 py-3 text-sm leading-6 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-foreground">
                Full description
              </span>
              <textarea
                required
                name="fullDescription"
                defaultValue={tool?.fullDescription ?? ""}
                rows={7}
                className="resize-y rounded-md border border-border bg-background px-3 py-3 text-sm leading-6 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">
                  Website URL
                </span>
                <input
                  required
                  name="websiteUrl"
                  defaultValue={tool?.websiteUrl ?? ""}
                  className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">
                  Affiliate URL
                </span>
                <input
                  name="affiliateUrl"
                  defaultValue={tool?.affiliateUrl ?? ""}
                  className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">Logo</span>
                <input
                  name="logo"
                  defaultValue={tool?.logo ?? ""}
                  placeholder="Optional logo text or path"
                  className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">
                  Logo URL
                </span>
                <input
                  name="logoUrl"
                  defaultValue={tool?.logoUrl ?? ""}
                  className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">
                  Best for
                </span>
                <textarea
                  name="bestFor"
                  defaultValue={tool?.bestFor.join("\n") ?? ""}
                  rows={5}
                  className="resize-y rounded-md border border-border bg-background px-3 py-3 text-sm leading-6 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">Pros</span>
                <textarea
                  name="pros"
                  defaultValue={tool?.pros.join("\n") ?? ""}
                  rows={5}
                  className="resize-y rounded-md border border-border bg-background px-3 py-3 text-sm leading-6 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">Cons</span>
                <textarea
                  name="cons"
                  defaultValue={tool?.cons.join("\n") ?? ""}
                  rows={5}
                  className="resize-y rounded-md border border-border bg-background px-3 py-3 text-sm leading-6 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
            </div>
          </div>
        </div>

        <aside className="grid content-start gap-5">
          <div className="rounded-md border border-border bg-card p-5 shadow-sm">
            <p className="text-sm font-semibold text-foreground">Publishing</p>
            <div className="mt-4 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">
                  Status
                </span>
                <select
                  name="status"
                  defaultValue={tool?.status ?? "draft"}
                  className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">
                  Category
                </span>
                <input
                  required
                  name="category"
                  defaultValue={tool?.category ?? ""}
                  placeholder="Coding Assistant"
                  className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
              <label className="flex items-start gap-3 rounded-md border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
                <input
                  name="isFeatured"
                  type="checkbox"
                  defaultChecked={tool?.isFeatured ?? false}
                  className="mt-1"
                />
                Feature this tool publicly.
              </label>
            </div>
          </div>

          <div className="rounded-md border border-border bg-card p-5 shadow-sm">
            <p className="text-sm font-semibold text-foreground">Pricing</p>
            <div className="mt-4 grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">
                  Pricing type
                </span>
                <select
                  name="pricingType"
                  defaultValue={tool?.pricingType ?? "freemium"}
                  className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                >
                  <option value="free">Free</option>
                  <option value="freemium">Freemium</option>
                  <option value="paid">Paid</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">
                  Starting price
                </span>
                <input
                  name="startingPrice"
                  defaultValue={tool?.startingPrice ?? ""}
                  className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">
                  Pricing summary
                </span>
                <textarea
                  name="pricingSummary"
                  defaultValue={tool?.pricingSummary ?? ""}
                  rows={3}
                  className="resize-y rounded-md border border-border bg-background px-3 py-3 text-sm leading-6 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
            </div>
          </div>

          <div className="rounded-md border border-border bg-card p-5 shadow-sm">
            <p className="text-sm font-semibold text-foreground">Scores</p>
            <div className="mt-4 grid gap-4">
              {scoreFields.map(([name, label]) => (
                <label key={name} className="grid gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {label}
                  </span>
                  <input
                    min={0}
                    max={10}
                    name={name}
                    type="number"
                    defaultValue={tool?.[name] ?? 0}
                    className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                </label>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/admin/tools"
          className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium hover:bg-muted"
        >
          Cancel
        </Link>
        <Button type="submit" className="h-10 rounded-md px-5">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
