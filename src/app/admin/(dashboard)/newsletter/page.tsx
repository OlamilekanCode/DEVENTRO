import { desc } from "drizzle-orm";
import { Download, Mail, Users } from "lucide-react";

import { getDb } from "@/db/cloudflare";
import { newsletterSubscribers } from "@/db/schema";

export const metadata = {
  title: "Newsletter | DevEntro Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

const escapeCsvValue = (value: string | boolean) => {
  const text = String(value);

  return `"${text.replaceAll('"', '""')}"`;
};

export default async function AdminNewsletterPage() {
  const db = await getDb();
  const subscribers = await db
    .select({
      id: newsletterSubscribers.id,
      email: newsletterSubscribers.email,
      source: newsletterSubscribers.source,
      status: newsletterSubscribers.status,
      isConfirmed: newsletterSubscribers.isConfirmed,
      createdAt: newsletterSubscribers.createdAt,
    })
    .from(newsletterSubscribers)
    .orderBy(desc(newsletterSubscribers.createdAt));
  const subscribedCount = subscribers.filter(
    (subscriber) => subscriber.status === "subscribed",
  ).length;
  const unconfirmedCount = subscribers.filter(
    (subscriber) => !subscriber.isConfirmed,
  ).length;
  const csvRows = [
    ["email", "source", "status", "isConfirmed", "createdAt"]
      .map(escapeCsvValue)
      .join(","),
    ...subscribers.map((subscriber) =>
      [
        subscriber.email,
        subscriber.source,
        subscriber.status,
        subscriber.isConfirmed,
        subscriber.createdAt,
      ]
        .map(escapeCsvValue)
        .join(","),
    ),
  ].join("\n");

  return (
    <div className="mx-auto w-full max-w-6xl">
      <section className="rounded-md border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-4">
          <div className="grid size-11 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
            <Mail className="size-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Newsletter
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              Captured subscribers.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              View emails captured from public newsletter forms. Sending,
              segmentation, and automation are intentionally not part of the MVP.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-md border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total subscribers
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                {subscribers.length}
              </p>
            </div>
            <Users className="size-5 text-primary" aria-hidden="true" />
          </div>
        </article>
        <article className="rounded-md border border-border bg-card p-5 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">
            Active status
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            {subscribedCount}
          </p>
        </article>
        <article className="rounded-md border border-border bg-card p-5 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">
            Unconfirmed
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            {unconfirmedCount}
          </p>
        </article>
      </section>

      <section className="mt-6 overflow-hidden rounded-md border border-border bg-card shadow-sm">
        <div className="border-b border-border px-5 py-4">
          <p className="text-sm font-semibold text-foreground">
            {subscribers.length} total subscribers
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="border-b border-border bg-muted/60 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold">Source</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Confirmed</th>
                <th className="px-5 py-3 font-semibold">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subscribers.length > 0 ? (
                subscribers.map((subscriber) => (
                  <tr key={subscriber.id}>
                    <td className="px-5 py-4 font-semibold text-foreground">
                      {subscriber.email}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {subscriber.source}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {subscriber.status}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {subscriber.isConfirmed ? "Yes" : "No"}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {subscriber.createdAt}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-8 text-center text-muted-foreground"
                  >
                    No subscribers captured yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6 rounded-md border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <Download className="size-5 text-primary" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-foreground">
              Export-ready CSV
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Copy this when a simple manual export is needed. No email sending
              automation is connected yet.
            </p>
          </div>
        </div>
        <textarea
          readOnly
          value={csvRows}
          rows={Math.min(Math.max(subscribers.length + 1, 4), 10)}
          className="mt-4 w-full resize-y rounded-md border border-border bg-background px-3 py-3 font-mono text-xs leading-5 text-muted-foreground outline-none"
        />
      </section>
    </div>
  );
}
