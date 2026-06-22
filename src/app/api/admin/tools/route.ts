import { NextResponse } from "next/server";

import { getDb } from "@/db/cloudflare";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";
import {
  adminAiToolSlugExists,
  createAdminAiTool,
  parseAiToolFormData,
  validateAiToolFormInput,
} from "@/lib/ai-tools-db";

export async function POST(request: Request) {
  const session = await getAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const formData = await request.formData();
  const input = parseAiToolFormData(formData);
  const validationError = validateAiToolFormInput(input);

  if (validationError) {
    return NextResponse.redirect(
      new URL(`/admin/tools/new?error=${validationError}`, request.url),
    );
  }

  try {
    const db = await getDb();

    if (await adminAiToolSlugExists(db, input.slug)) {
      return NextResponse.redirect(
        new URL("/admin/tools/new?error=slug", request.url),
      );
    }

    await createAdminAiTool(db, input);

    return NextResponse.redirect(
      new URL(`/admin/tools/${input.slug}/edit?saved=1`, request.url),
    );
  } catch {
    return NextResponse.redirect(new URL("/admin/tools?error=1", request.url));
  }
}
