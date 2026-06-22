import { NextResponse } from "next/server";

import { getDb } from "@/db/cloudflare";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";
import {
  categorySlugExists,
  createAdminCategory,
  parseCategoryFormData,
  validateCategoryInput,
} from "@/lib/admin-taxonomy";

export async function POST(request: Request) {
  const session = await getAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const formData = await request.formData();
  const input = parseCategoryFormData(formData);
  const validationError = validateCategoryInput(input);

  if (validationError) {
    return NextResponse.redirect(
      new URL(`/admin/categories/new?error=${validationError}`, request.url),
    );
  }

  try {
    const db = await getDb();

    if (await categorySlugExists(db, input.slug)) {
      return NextResponse.redirect(
        new URL("/admin/categories/new?error=slug", request.url),
      );
    }

    await createAdminCategory(db, input);

    return NextResponse.redirect(
      new URL(`/admin/categories/${input.slug}/edit?saved=1`, request.url),
    );
  } catch {
    return NextResponse.redirect(
      new URL("/admin/categories?error=1", request.url),
    );
  }
}
