import { NextResponse } from "next/server";

import { getDb } from "@/db/cloudflare";
import {
  parsePostFormData,
  validatePostFormInput,
} from "@/lib/admin-post-form";
import {
  adminPostSlugExists,
  createAdminPost,
} from "@/lib/admin-posts";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const session = await getAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const formData = await request.formData();
  const input = parsePostFormData(formData);
  const validationError = validatePostFormInput(input);

  if (validationError) {
    return NextResponse.redirect(
      new URL(`/admin/posts/new?error=${validationError}`, request.url),
    );
  }

  try {
    const db = await getDb();

    if (await adminPostSlugExists(db, input.slug)) {
      return NextResponse.redirect(
        new URL("/admin/posts/new?error=slug", request.url),
      );
    }

    await createAdminPost(db, input);

    return NextResponse.redirect(
      new URL(`/admin/posts/${input.slug}/edit?saved=1`, request.url),
    );
  } catch {
    return NextResponse.redirect(new URL("/admin/posts?error=1", request.url));
  }
}
