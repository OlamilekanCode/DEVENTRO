import { NextResponse } from "next/server";

import { getMediaObject, sanitizeMediaKey } from "@/lib/media-storage";

type MediaRouteContext = {
  params: Promise<{
    key: string[];
  }>;
};

export async function GET(_request: Request, { params }: MediaRouteContext) {
  const { key: keyParts } = await params;
  const key = sanitizeMediaKey(keyParts);

  if (!key) {
    return NextResponse.json({ error: "Invalid media key." }, { status: 400 });
  }

  const object = await getMediaObject(key);

  if (!object) {
    return NextResponse.json({ error: "Media not found." }, { status: 404 });
  }

  const headers = new Headers();
  if (object.httpMetadata?.contentType) {
    headers.set("content-type", object.httpMetadata.contentType);
  }
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");

  return new Response(await object.arrayBuffer(), {
    headers,
  });
}
