import { desc } from "drizzle-orm";
import { Mail } from "lucide-react";

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

export default async function AdminNewsletterPage() {
  const db = await getDb();
  const subscribers = await db
    .select({
      id: newsletterSubscribers.id,
      email: newsletterSubscribers.email,
      source: newsletterSubscribers.source,
      isConfirmed: newsletterSubscribers.isConfirmed,
      createdAt: newsletterSubscribers.createdAt,
    })
    .from(newsletterSubscribers)
    .orderBy(desc(newsletterSubscribers.createdAt));

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
                      {subscriber.isConfirmed ? "Confirmed" : "Unconfirmed"}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {subscriber.createdAt}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
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
    </div>
  );
}
