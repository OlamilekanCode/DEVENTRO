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

## Admin Auth

Phase 9 uses one private admin login controlled by environment variables:

```bash
ADMIN_EMAIL="admin@deventro.site"
ADMIN_PASSWORD="change-this-password"
ADMIN_SESSION_SECRET="use-a-long-random-secret"
```

`ADMIN_SESSION_SECRET` signs the HTTP-only admin session cookie. Use a long random value in production.
