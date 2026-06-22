import { NextResponse } from "next/server";

import { getDb } from "@/db/cloudflare";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";
import { saveMediaAsset, uploadImageToR2 } from "@/lib/media-storage";

const errorMessages: Record<string, string> = {
  type: "Only JPG, PNG, WebP, and GIF images are allowed.",
  size: "Images must be 5 MB or smaller.",
};

export async function POST(request: Request) {
  const session = await getAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData();
  const image = formData.get("image");
  const altText = String(formData.get("altText") ?? "").trim();

  if (!(image instanceof File)) {
    return NextResponse.json({ error: "Image is required." }, { status: 400 });
  }

  try {
    const media = await uploadImageToR2(image);
    const db = await getDb();

    await saveMediaAsset(db, {
      ...media,
      altText,
      filename: image.name,
    });

    return NextResponse.json({ media });
  } catch (error) {
    const message =
      error instanceof Error
        ? (errorMessages[error.message] ?? "Upload failed.")
        : "Upload failed.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
