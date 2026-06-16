import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms",
  description:
    "DevEntro terms covering site use, editorial content, affiliate links, and future tool reviews.",
  path: "/terms",
});

const terms = [
  "DevEntro content is for informational and educational use.",
  "Tool pricing, features, and availability may change after publication.",
  "External links may lead to third-party products with their own terms.",
  "MVP legal copy should be reviewed before production launch.",
];

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase text-teal-700">Legal</p>
      <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-5xl">
        Terms
      </h1>
      <div className="mt-8 grid gap-4">
        {terms.map((term) => (
          <div key={term} className="rounded-md border border-border bg-card p-5">
            <p className="text-sm leading-7 text-muted-foreground">{term}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
