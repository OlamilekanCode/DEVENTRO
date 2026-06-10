import { NextResponse } from "next/server";

import { getDb } from "@/db/cloudflare";
import {
  parsePostFormData,
  validatePostFormInput,
} from "@/lib/admin-post-form";
import {
  adminPostSlugExists,
  deleteAdminPost,
  getAdminPostBySlug,
  updateAdminPost,
} from "@/lib/admin-posts";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";

type PostRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function POST(request: Request, { params }: PostRouteContext) {
  const session = await getAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const { slug } = await params;
  const formData = await request.formData();
  const action = String(formData.get("_action") ?? "update");
  const db = await getDb();

  if (action === "delete") {
    await deleteAdminPost(db, slug);

    return NextResponse.redirect(new URL("/admin/posts?deleted=1", request.url));
  }

  const input = parsePostFormData(formData);
  const validationError = validatePostFormInput(input);

  if (validationError) {
    return NextResponse.redirect(
      new URL(`/admin/posts/${slug}/edit?error=${validationError}`, request.url),
    );
  }

  try {
    const existingPost = await getAdminPostBySlug(db, slug);

    if (!existingPost) {
      return NextResponse.redirect(new URL("/admin/posts?error=1", request.url));
    }

    if (await adminPostSlugExists(db, input.slug, existingPost.id)) {
      return NextResponse.redirect(
        new URL(`/admin/posts/${slug}/edit?error=slug`, request.url),
      );
    }

    await updateAdminPost(db, slug, input);

    return NextResponse.redirect(
      new URL(`/admin/posts/${input.slug}/edit?saved=1`, request.url),
    );
  } catch {
    return NextResponse.redirect(new URL("/admin/posts?error=1", request.url));
  }
}
