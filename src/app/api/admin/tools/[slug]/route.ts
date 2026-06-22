import { NextResponse } from "next/server";

import { getDb } from "@/db/cloudflare";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";
import {
  adminAiToolSlugExists,
  archiveAdminAiTool,
  deleteAdminAiTool,
  getAdminAiToolBySlug,
  parseAiToolFormData,
  updateAdminAiTool,
  validateAiToolFormInput,
} from "@/lib/ai-tools-db";

type AiToolRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function POST(request: Request, { params }: AiToolRouteContext) {
  const session = await getAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const { slug } = await params;
  const formData = await request.formData();
  const action = String(formData.get("_action") ?? "update");
  const db = await getDb();

  if (action === "archive") {
    await archiveAdminAiTool(db, slug);

    return NextResponse.redirect(new URL("/admin/tools?archived=1", request.url));
  }

  if (action === "delete") {
    await deleteAdminAiTool(db, slug);

    return NextResponse.redirect(new URL("/admin/tools?deleted=1", request.url));
  }

  const input = parseAiToolFormData(formData);
  const validationError = validateAiToolFormInput(input);

  if (validationError) {
    return NextResponse.redirect(
      new URL(`/admin/tools/${slug}/edit?error=${validationError}`, request.url),
    );
  }

  try {
    const existingTool = await getAdminAiToolBySlug(db, slug);

    if (!existingTool) {
      return NextResponse.redirect(new URL("/admin/tools?error=1", request.url));
    }

    if (await adminAiToolSlugExists(db, input.slug, existingTool.id)) {
      return NextResponse.redirect(
        new URL(`/admin/tools/${slug}/edit?error=slug`, request.url),
      );
    }

    await updateAdminAiTool(db, slug, input);

    return NextResponse.redirect(
      new URL(`/admin/tools/${input.slug}/edit?saved=1`, request.url),
    );
  } catch {
    return NextResponse.redirect(new URL("/admin/tools?error=1", request.url));
  }
}
