import { NextResponse } from "next/server";

import { getDb } from "@/db/cloudflare";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";
import {
  categorySlugExists,
  deleteAdminCategory,
  getAdminCategoryBySlug,
  parseCategoryFormData,
  updateAdminCategory,
  validateCategoryInput,
} from "@/lib/admin-taxonomy";

type CategoryRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function POST(request: Request, { params }: CategoryRouteContext) {
  const session = await getAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const { slug } = await params;
  const formData = await request.formData();
  const action = String(formData.get("_action") ?? "update");
  const db = await getDb();

  if (action === "delete") {
    try {
      await deleteAdminCategory(db, slug);

      return NextResponse.redirect(
        new URL("/admin/categories?deleted=1", request.url),
      );
    } catch {
      return NextResponse.redirect(
        new URL("/admin/categories?error=delete", request.url),
      );
    }
  }

  const input = parseCategoryFormData(formData);
  const validationError = validateCategoryInput(input);

  if (validationError) {
    return NextResponse.redirect(
      new URL(
        `/admin/categories/${slug}/edit?error=${validationError}`,
        request.url,
      ),
    );
  }

  try {
    const existingCategory = await getAdminCategoryBySlug(db, slug);

    if (!existingCategory) {
      return NextResponse.redirect(
        new URL("/admin/categories?error=1", request.url),
      );
    }

    if (await categorySlugExists(db, input.slug, existingCategory.id)) {
      return NextResponse.redirect(
        new URL(`/admin/categories/${slug}/edit?error=slug`, request.url),
      );
    }

    await updateAdminCategory(db, slug, input);

    return NextResponse.redirect(
      new URL(`/admin/categories/${input.slug}/edit?saved=1`, request.url),
    );
  } catch {
    return NextResponse.redirect(
      new URL("/admin/categories?error=1", request.url),
    );
  }
}
