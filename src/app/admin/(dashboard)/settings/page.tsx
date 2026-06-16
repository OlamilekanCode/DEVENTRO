import { Settings, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Settings | DevEntro Admin",
  robots: {
    index: false,
    follow: false,
  },
};

const settingsGroups = [
  {
    title: "Site identity",
    description:
      "Logo, site title, tagline, and default SEO values will be editable later.",
  },
  {
    title: "Editorial defaults",
    description:
      "Author profile, disclosure defaults, and publishing preferences stay simple for MVP.",
  },
  {
    title: "Integrations",
    description:
      "Cloudflare D1, R2, ad scripts, and newsletter delivery settings are configured through environment variables for now.",
  },
];

export default function AdminSettingsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <section className="rounded-md border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-4">
          <div className="grid size-11 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
            <Settings className="size-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Settings
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              Basic site settings placeholders.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              The MVP keeps settings visible but conservative. Editable settings
              can be connected after the content system is stable.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4">
        {settingsGroups.map((group) => (
          <article
            key={group.title}
            className="rounded-md border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {group.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {group.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
