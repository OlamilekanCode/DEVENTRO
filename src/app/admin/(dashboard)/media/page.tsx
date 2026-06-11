import { ImageIcon } from "lucide-react";

import { MediaUploadForm } from "@/components/admin/media-upload-form";

export const metadata = {
  title: "Media | DevEntro Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default function AdminMediaPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 xl:grid-cols-[0.95fr_0.7fr]">
      <section className="rounded-md border border-border bg-card p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          Media
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          Upload images to Cloudflare R2.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Store lightweight blog images in R2 and use the returned URL in post
          featured image fields. Gallery management can come after upload is
          stable.
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
  );
}
