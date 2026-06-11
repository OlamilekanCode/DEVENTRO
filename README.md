# DevEntro

DevEntro is a Next.js MVP for AI tool reviews, developer workflow guides, and a future AI tools directory.

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Database

Drizzle migrations are generated into `drizzle/`.

```bash
npm run db:generate
npm run db:migrate:local
```

Remote D1 migrations use:

```bash
npm run db:migrate:remote
```

Replace the placeholder `database_id` in `wrangler.jsonc` after creating the production D1 database in Cloudflare.

Admin post CRUD uses the local D1 binding during development. Run migrations before opening `/admin/posts`:

```bash
npm run db:migrate:local
npm run dev
```

## Admin Editor

Phase 12 adds a Markdown editor with write and preview modes for post content. The rich editor is intentionally reserved for Phase 13.

Phase 13 adds a TipTap rich editor option for post content. Posts now store `content_format`, Markdown content, and optional rich HTML content.

## Media Uploads

Phase 14 uploads admin images to the `MEDIA_BUCKET` Cloudflare R2 binding. Local development uses Wrangler's local R2 storage through `npm run dev`.

Create real R2 buckets in Cloudflare before remote deployment and update `wrangler.jsonc` if the bucket names change.

## Admin Auth

Phase 9 uses one private admin login controlled by environment variables:

```bash
ADMIN_EMAIL="admin@deventro.site"
ADMIN_PASSWORD="change-this-password"
ADMIN_SESSION_SECRET="use-a-long-random-secret"
```

`ADMIN_SESSION_SECRET` signs the HTTP-only admin session cookie. Use a long random value in production.
