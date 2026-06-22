"use client";

import { useState } from "react";
import { CheckCircle2, Copy, UploadCloud } from "lucide-react";

type UploadedMedia = {
  key: string;
  url: string;
  contentType: string;
  size: number;
};

export function MediaUploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState<UploadedMedia | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUploading(true);
    setUploadedMedia(null);
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as {
        media?: UploadedMedia;
        error?: string;
      };

      if (!response.ok || !payload.media) {
        setError(payload.error ?? "Upload failed.");
        return;
      }

      setUploadedMedia(payload.media);
      event.currentTarget.reset();
    } catch {
      setError("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const copyUrl = async () => {
    if (!uploadedMedia) {
      return;
    }

    await navigator.clipboard.writeText(uploadedMedia.url);
  };

  return (
    <div className="rounded-md border border-border bg-card p-5 shadow-sm">
      <form onSubmit={handleSubmit} className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-foreground">Image file</span>
          <input
            required
            name="image"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="rounded-md border border-border bg-background px-3 py-3 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-foreground file:px-3 file:py-2 file:text-sm file:font-semibold file:text-background"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-foreground">
            Alt text
          </span>
          <input
            name="altText"
            placeholder="Short image description"
            className="h-11 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </label>

        <button
          type="submit"
          disabled={isUploading}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80 disabled:pointer-events-none disabled:opacity-60"
        >
          <UploadCloud className="size-4" aria-hidden="true" />
          {isUploading ? "Uploading..." : "Upload image"}
        </button>
      </form>

      {error ? (
        <div className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {uploadedMedia ? (
        <div className="mt-5 rounded-md border border-border bg-muted/40 p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-5 text-primary" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">
                Image uploaded
              </p>
              <p className="mt-1 break-all text-xs text-muted-foreground">
                {uploadedMedia.url}
              </p>
              <button
                type="button"
                onClick={copyUrl}
                className="mt-3 inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 text-xs font-semibold text-foreground hover:bg-muted"
              >
                <Copy className="size-3.5" aria-hidden="true" />
                Copy URL
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
