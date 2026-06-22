import { NextResponse } from "next/server";

import { getDb } from "@/db/cloudflare";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";
import {
  createAdminTag,
  parseTagFormData,
  tagSlugExists,
  validateTagInput,
} from "@/lib/admin-taxonomy";

export async function POST(request: Request) {
  const session = await getAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const formData = await request.formData();
  const input = parseTagFormData(formData);
  const validationError = validateTagInput(input);

  if (validationError) {
    return NextResponse.redirect(
      new URL(`/admin/tags/new?error=${validationError}`, request.url),
    );
  }

  try {
    const db = await getDb();

    if (await tagSlugExists(db, input.slug)) {
      return NextResponse.redirect(
        new URL("/admin/tags/new?error=slug", request.url),
      );
    }

    await createAdminTag(db, input);

    return NextResponse.redirect(
      new URL(`/admin/tags/${input.slug}/edit?saved=1`, request.url),
    );
  } catch {
    return NextResponse.redirect(new URL("/admin/tags?error=1", request.url));
  }
}
