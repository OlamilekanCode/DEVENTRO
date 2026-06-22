import { NextResponse } from "next/server";

import { getDb } from "@/db/cloudflare";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";
import {
  deleteAdminTag,
  getAdminTagBySlug,
  parseTagFormData,
  tagSlugExists,
  updateAdminTag,
  validateTagInput,
} from "@/lib/admin-taxonomy";

type TagRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function POST(request: Request, { params }: TagRouteContext) {
  const session = await getAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const { slug } = await params;
  const formData = await request.formData();
  const action = String(formData.get("_action") ?? "update");
  const db = await getDb();

  if (action === "delete") {
    await deleteAdminTag(db, slug);

    return NextResponse.redirect(new URL("/admin/tags?deleted=1", request.url));
  }

  const input = parseTagFormData(formData);
  const validationError = validateTagInput(input);

  if (validationError) {
    return NextResponse.redirect(
      new URL(`/admin/tags/${slug}/edit?error=${validationError}`, request.url),
    );
  }

  try {
    const existingTag = await getAdminTagBySlug(db, slug);

    if (!existingTag) {
      return NextResponse.redirect(new URL("/admin/tags?error=1", request.url));
    }

    if (await tagSlugExists(db, input.slug, existingTag.id)) {
      return NextResponse.redirect(
        new URL(`/admin/tags/${slug}/edit?error=slug`, request.url),
      );
    }

    await updateAdminTag(db, slug, input);

    return NextResponse.redirect(
      new URL(`/admin/tags/${input.slug}/edit?saved=1`, request.url),
    );
  } catch {
    return NextResponse.redirect(new URL("/admin/tags?error=1", request.url));
  }
}
