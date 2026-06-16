import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "DevEntro privacy policy covering newsletter capture, analytics, and future advertising integrations.",
  path: "/privacy-policy",
});

const sections = [
  {
    title: "Information We Collect",
    body: "DevEntro may collect newsletter email addresses, basic site usage data, and information submitted through future contact forms.",
  },
  {
    title: "How We Use Information",
    body: "Information is used to operate the site, improve content, manage newsletters, and understand which articles or tools are useful.",
  },
  {
    title: "Advertising And Affiliates",
    body: "The site is designed for future ad networks and affiliate links. Those services may use their own privacy technologies when enabled.",
  },
  {
    title: "Contact",
    body: "For privacy questions, contact hello@deventro.site. Replace this address with the final support inbox before launch.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase text-teal-700">Legal</p>
      <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-5 text-sm leading-7 text-muted-foreground">
        This is MVP placeholder legal copy and should be reviewed before public
        launch.
      </p>
      <div className="mt-10 grid gap-5">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-md border border-border bg-card p-5 shadow-sm"
          >
            <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}
