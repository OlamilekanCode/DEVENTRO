import { NextResponse } from "next/server";

import { getDb } from "@/db/cloudflare";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";
import {
  parseAdPlacementFormData,
  updateAdminAdPlacement,
  validateAdPlacementInput,
} from "@/lib/ad-placements";

export async function POST(request: Request) {
  const session = await getAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const formData = await request.formData();
  const input = parseAdPlacementFormData(formData);
  const validationError = validateAdPlacementInput(input);

  if (validationError) {
    return NextResponse.redirect(
      new URL(`/admin/ads?error=${validationError}`, request.url),
    );
  }

  try {
    const db = await getDb();

    await updateAdminAdPlacement(db, input);

    return NextResponse.redirect(new URL("/admin/ads?saved=1", request.url));
  } catch {
    return NextResponse.redirect(new URL("/admin/ads?error=1", request.url));
  }
}
