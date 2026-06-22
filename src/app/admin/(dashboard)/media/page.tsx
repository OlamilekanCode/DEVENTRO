import { Copy, ImageIcon } from "lucide-react";

import { MediaUploadForm } from "@/components/admin/media-upload-form";
import { getDb } from "@/db/cloudflare";
import { listMediaAssets } from "@/lib/media-storage";

export const metadata = {
  title: "Media | DevEntro Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

const formatBytes = (bytes: number) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default async function AdminMediaPage() {
  const db = await getDb();
  const assets = await listMediaAssets(db);

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6">
      <div className="grid gap-6 xl:grid-cols-[0.95fr_0.7fr]">
        <section className="rounded-md border border-border bg-card p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Media
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
            Upload images to Cloudflare R2.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Store lightweight blog images in R2 and use the returned URL in post
            or tool image fields.
          </p>

          <div className="mt-8">
            <MediaUploadForm />
          </div>
        </section>

        <aside className="rounded-md border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <ImageIcon className="size-5 text-primary" aria-hidden="true" />
            <p className="text-sm font-semibold text-foreground">Upload rules</p>
          </div>
          <div className="mt-5 grid gap-3 text-sm leading-6 text-muted-foreground">
            <p>Allowed formats: JPG, PNG, WebP, GIF.</p>
            <p>Maximum file size: 5 MB.</p>
            <p>Uploaded files are served through `/api/media/...` for now.</p>
            <p>R2 public domains and CDN polish can be handled during deployment.</p>
          </div>
        </aside>
      </div>

      <section className="overflow-hidden rounded-md border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Uploaded media
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Copy URLs into post featured image fields or tool logo fields.
            </p>
          </div>
          <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            {assets.length} files
          </span>
        </div>
        {assets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] border-collapse text-left text-sm">
              <thead className="border-b border-border bg-muted/60 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-semibold">File</th>
                  <th className="px-5 py-3 font-semibold">Alt text</th>
                  <th className="px-5 py-3 font-semibold">Type</th>
                  <th className="px-5 py-3 font-semibold">Size</th>
                  <th className="px-5 py-3 font-semibold">URL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {assets.map((asset) => (
                  <tr key={asset.id} className="align-top">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-foreground">
                        {asset.filename}
                      </p>
                      <p className="mt-1 break-all text-xs text-muted-foreground">
                        {asset.key}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {asset.altText || "Not set"}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {asset.type}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {formatBytes(asset.size)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex max-w-sm items-start gap-2">
                        <code className="break-all rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                          {asset.url}
                        </code>
                        <Copy className="mt-1 size-4 shrink-0 text-muted-foreground" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-5 py-10 text-center text-sm text-muted-foreground">
            No uploaded media metadata yet.
          </div>
        )}
      </section>
    </div>
  );
}
