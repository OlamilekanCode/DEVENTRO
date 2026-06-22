import { eq } from "drizzle-orm";

import type { DbClient } from "@/db/client";
import { newsletterSubscribers } from "@/db/schema";

export type NewsletterSubscribeResult =
  | { status: "subscribed"; email: string }
  | { status: "existing"; email: string }
  | { status: "invalid" };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const normalizeNewsletterEmail = (email: string) =>
  email.trim().toLowerCase();

export const subscribeToNewsletter = async (
  db: DbClient,
  email: string,
  source = "homepage",
): Promise<NewsletterSubscribeResult> => {
  const normalizedEmail = normalizeNewsletterEmail(email);

  if (!emailPattern.test(normalizedEmail) || normalizedEmail.length > 254) {
    return { status: "invalid" };
  }

  const [existingSubscriber] = await db
    .select({ id: newsletterSubscribers.id })
    .from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.email, normalizedEmail))
    .limit(1);

  if (existingSubscriber) {
    return { status: "existing", email: normalizedEmail };
  }

  await db.insert(newsletterSubscribers).values({
    id: crypto.randomUUID(),
    email: normalizedEmail,
    source: source.trim().slice(0, 80) || "homepage",
    status: "subscribed",
    isConfirmed: false,
    createdAt: new Date().toISOString(),
  });

  return { status: "subscribed", email: normalizedEmail };
};
