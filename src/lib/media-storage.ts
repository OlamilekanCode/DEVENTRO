import { getCloudflareContext } from "@opennextjs/cloudflare";
import { desc } from "drizzle-orm";

import type { DbClient } from "@/db/client";
import { mediaAssets } from "@/db/schema";

const allowedImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const maxImageBytes = 5 * 1024 * 1024;

export type StoredMedia = {
  key: string;
  url: string;
  contentType: string;
  size: number;
};

export type MediaAssetInput = StoredMedia & {
  altText: string;
  filename: string;
};

const extensionByMimeType: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const slugifyFilename = (filename: string): string => {
  const withoutExtension = filename.replace(/\.[a-z0-9]+$/i, "");
  const slug = withoutExtension
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);

  return slug || "image";
};

const getMediaBucket = async () => {
  const { env } = await getCloudflareContext({ async: true });

  return env.MEDIA_BUCKET;
};

export const createMediaKey = (file: File): string => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const extension = extensionByMimeType[file.type] ?? "bin";
  const safeName = slugifyFilename(file.name);

  return `media/${year}/${month}/${crypto.randomUUID()}-${safeName}.${extension}`;
};

export const validateImageFile = (file: File): string | null => {
  if (!allowedImageTypes.has(file.type)) {
    return "type";
  }

  if (file.size > maxImageBytes) {
    return "size";
  }

  return null;
};

export const uploadImageToR2 = async (file: File): Promise<StoredMedia> => {
  const validationError = validateImageFile(file);

  if (validationError) {
    throw new Error(validationError);
  }

  const bucket = await getMediaBucket();
  const key = createMediaKey(file);

  await bucket.put(key, await file.arrayBuffer(), {
    httpMetadata: {
      contentType: file.type,
    },
    customMetadata: {
      originalName: file.name,
    },
  });

  return {
    key,
    url: `/api/media/${key}`,
    contentType: file.type,
    size: file.size,
  };
};

export const getMediaObject = async (key: string) => {
  const bucket = await getMediaBucket();

  return bucket.get(key);
};

export const sanitizeMediaKey = (parts: string[]): string | null => {
  const key = parts.join("/");

  if (!key.startsWith("media/") || key.includes("..")) {
    return null;
  }

  return key;
};

export const saveMediaAsset = async (
  db: DbClient,
  input: MediaAssetInput,
) => {
  await db
    .insert(mediaAssets)
    .values({
      id: crypto.randomUUID(),
      url: input.url,
      key: input.key,
      filename: input.filename,
      altText: input.altText || null,
      size: input.size,
      type: input.contentType,
      createdAt: new Date().toISOString(),
    })
    .onConflictDoNothing();
};

export const listMediaAssets = async (db: DbClient) => {
  return db
    .select({
      id: mediaAssets.id,
      url: mediaAssets.url,
      key: mediaAssets.key,
      filename: mediaAssets.filename,
      altText: mediaAssets.altText,
      size: mediaAssets.size,
      type: mediaAssets.type,
      createdAt: mediaAssets.createdAt,
    })
    .from(mediaAssets)
    .orderBy(desc(mediaAssets.createdAt));
};
