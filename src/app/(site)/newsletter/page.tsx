import type { Metadata } from "next";
import { Mail, ShieldCheck, Sparkles } from "lucide-react";

import { AdBanner } from "@/components/ads/ad-banner";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Newsletter",
  description:
    "Join the DevEntro newsletter for practical AI tool tests, developer workflow notes, and useful review updates.",
  path: "/newsletter",
});

const newsletterNotes = [
  "Practical AI tool tests",
  "Developer workflow experiments",
  "Review and comparison updates",
  "No spam or noisy automation",
];

export default function NewsletterPage() {
  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.75fr] lg:px-8">
          <div className="animate-fade-up">
            <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
              <Mail className="size-4 text-teal-600" aria-hidden="true" />
              DevEntro newsletter
            </p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight text-foreground sm:text-5xl">
              Useful AI workflow notes without the noise.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              Get early notes from DevEntro tool testing, developer workflows,
              and practical review updates as the publication grows.
            </p>
          </div>

          <aside className="animate-fade-up-delay-1">
            <NewsletterForm source="newsletter-page" />
          </aside>
        </div>
      </section>

      <AdBanner label="Top newsletter advertisement" variant="top" />

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Sparkles className="size-5 text-teal-600" aria-hidden="true" />
            <p className="text-sm font-semibold uppercase text-muted-foreground">
              What to expect
            </p>
          </div>
          <h2 className="mt-3 text-3xl font-bold text-foreground">
            A small list for serious builders.
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            The newsletter is intentionally simple in the MVP: capture
            subscribers first, then connect email delivery later when the content
            system is ready.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {newsletterNotes.map((note) => (
            <div
              key={note}
              className="flex items-start gap-3 rounded-md border border-border bg-card p-4 shadow-sm"
            >
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-teal-600" aria-hidden="true" />
              <p className="text-sm font-medium leading-6 text-muted-foreground">
                {note}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
