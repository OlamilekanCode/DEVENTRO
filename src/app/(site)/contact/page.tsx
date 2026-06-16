import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, ShieldCheck } from "lucide-react";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact DevEntro",
  description:
    "Contact DevEntro for AI tool reviews, workflow feedback, partnerships, and editorial questions.",
  path: "/contact",
});

const contactReasons = [
  "Suggest an AI tool for review.",
  "Share a workflow problem worth testing.",
  "Ask about partnerships or affiliate disclosures.",
];

export default function ContactPage() {
  return (
    <main>
      <section className="border-b border-border bg-card">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
            <MessageSquare className="size-4 text-teal-600" aria-hidden="true" />
            Contact
          </p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-foreground sm:text-5xl">
            Send useful leads, review ideas, and partnership notes.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            The MVP keeps contact simple. Use email for now; a structured
            contact form can be added later when the admin workflow needs it.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:px-8">
        <div className="rounded-md border border-border bg-card p-6 shadow-sm">
          <Mail className="size-6 text-teal-600" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-bold text-foreground">
            Editorial email
          </h2>
          <Link
            href="mailto:hello@deventro.site"
            className="mt-3 inline-flex text-sm font-semibold text-teal-700 hover:text-teal-800"
          >
            hello@deventro.site
          </Link>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Replace this with the final inbox when the production email is
            ready.
          </p>
        </div>
        <div className="grid gap-4">
          {contactReasons.map((reason) => (
            <div
              key={reason}
              className="rounded-md border border-border bg-background p-4"
            >
              <p className="text-sm font-medium text-foreground">{reason}</p>
            </div>
          ))}
          <div className="flex gap-3 rounded-md border border-border bg-muted/40 p-4">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-teal-600" />
            <p className="text-sm leading-6 text-muted-foreground">
              Sponsored conversations should be disclosed clearly. Editorial
              trust stays above monetization.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
