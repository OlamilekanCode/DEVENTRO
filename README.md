# DevEntro

DevEntro is a polished MVP blog platform for AI tool reviews, developer workflow guides, comparison content, newsletter capture, and a future monetized AI tools directory.

The project was built in controlled phases to keep the MVP scalable without adding bloated features too early.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Shadcn-style UI primitives
- Drizzle ORM
- Cloudflare D1
- Cloudflare R2
- OpenNext for Cloudflare
- Wrangler
- TipTap rich editor
- React Markdown

## Current Features

- Modern public homepage
- Public blog listing page
- Public blog detail page
- Static typed blog data seed
- D1-backed admin post CRUD
- Markdown editor with preview
- Rich text editor option
- Admin authentication with one private admin account
- Admin dashboard shell
- Category and tag foundation
- R2 image upload flow
- Public AI tools directory
- Newsletter capture into D1
- Reusable ad placeholder components
- SEO metadata
- Sitemap and robots.txt
- Cloudflare deployment setup

## Public Routes

- `/`
- `/blog`
- `/blog/[slug]`
- `/ai-tools`
- `/newsletter`
- `/robots.txt`
- `/sitemap.xml`

## Admin Routes

- `/admin/login`
- `/admin`
- `/admin/posts`
- `/admin/posts/new`
- `/admin/posts/[slug]/edit`
- `/admin/media`
- `/admin/categories`
- `/admin/tags`

Admin routes are protected by a signed HTTP-only session cookie.

## API Routes

- `POST /api/admin/login`
- `POST /api/admin/logout`
- `POST /api/admin/posts`
- `POST /api/admin/posts/[slug]`
- `POST /api/admin/media/upload`
- `GET /api/media/[...key]`
- `POST /api/newsletter`

## Local Setup

Install dependencies:

```bash
npm install
```

Create a local env file:

```bash
copy .env.example .env.local
```

Run local D1 migrations:

```bash
npm run db:migrate:local
```

Start development:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Environment Variables

Required local variables:

```env
ADMIN_EMAIL="admin@deventro.site"
ADMIN_PASSWORD="change-this-password"
ADMIN_SESSION_SECRET="replace-with-a-long-random-secret"
```

Optional Cloudflare CLI variables:

```env
CLOUDFLARE_ACCOUNT_ID="your-cloudflare-account-id"
CLOUDFLARE_API_TOKEN="your-cloudflare-api-token"
```

D1 database IDs and R2 bucket names are configured in `wrangler.jsonc`, not `.env.local`.

## How To Get Env Values

`ADMIN_EMAIL`

Use the email address you want to log in with at `/admin/login`.

`ADMIN_PASSWORD`

Create a strong password yourself. Store it in a password manager.

`ADMIN_SESSION_SECRET`

Generate a strong local secret:

```bash
node -e "console.log(crypto.randomBytes(32).toString('base64'))"
```

`CLOUDFLARE_ACCOUNT_ID`

Get it from Cloudflare Dashboard -> Workers & Pages -> Overview, or from the Cloudflare account URL.

`CLOUDFLARE_API_TOKEN`

Create it from Cloudflare Dashboard -> My Profile -> API Tokens.

Recommended permissions:

- Workers Scripts: Edit
- Workers Routes: Edit, if routes are used
- D1: Edit
- R2: Edit
- Account Settings: Read

Keep this token private. Do not commit it.

## Database

Drizzle migrations live in:

```text
drizzle/
```

Generate migrations:

```bash
npm run db:generate
```

Apply local migrations:

```bash
npm run db:migrate:local
```

Apply remote migrations:

```bash
npm run db:migrate:remote
```

The production D1 database is configured in `wrangler.jsonc`:

```json
"database_name": "deventro",
"database_id": "replace-with-real-cloudflare-d1-id"
```

## Media Uploads

Admin media uploads use Cloudflare R2 through the `MEDIA_BUCKET` binding.

Configured buckets:

- `deventro-media`
- `deventro-media-preview`

If you use different bucket names, update `wrangler.jsonc`.

Supported upload types:

- JPG
- PNG
- WebP
- GIF

Maximum upload size:

```text
5 MB
```

## Ads Architecture

The MVP includes reusable placeholder ad components and layout space for future monetization.

Current planned placements:

- top banner ads
- inline article ads
- sidebar ads
- footer ads

Future ad networks can be integrated without redesigning the public layout:

- Google AdSense
- Mediavine
- Ezoic
- custom sponsor banners
- affiliate banners

Ad density should stay conservative. SEO and performance remain higher priority than ad volume.

## SEO

Implemented:

- shared SEO metadata helper
- page-level titles and descriptions
- canonical URLs
- Open Graph metadata
- Twitter card metadata
- article metadata
- `sitemap.xml`
- `robots.txt`

Robots blocks:

- `/admin/`
- `/api/`

## Deployment

DevEntro deploys to Cloudflare with OpenNext.

For production deployments, use WSL or Linux when possible. OpenNext can build on native Windows, but it warns that Windows runtime behavior may be unreliable.

Build Cloudflare output:

```bash
npm run cf:build
```

Preview Cloudflare output locally:

```bash
npm run cf:preview
```

Deploy:

```bash
npm run cf:deploy
```

Before first production deployment:

1. Create a Cloudflare D1 database named `deventro`.
2. Replace the placeholder `database_id` in `wrangler.jsonc`.
3. Create R2 buckets named `deventro-media` and `deventro-media-preview`.
4. Set production admin secrets:

```bash
wrangler secret put ADMIN_EMAIL
wrangler secret put ADMIN_PASSWORD
wrangler secret put ADMIN_SESSION_SECRET
```

5. Apply remote D1 migrations:

```bash
npm run db:migrate:remote
```

6. Deploy:

```bash
npm run cf:deploy
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run cf:build
npm run cf:preview
npm run cf:deploy
npm run db:generate
npm run db:migrate:local
npm run db:migrate:remote
```

## Project Structure

```text
src/app/(site)              Public pages
src/app/admin               Admin routes
src/app/api                 API routes
src/components              Reusable components
src/db                      Drizzle schema and D1 client
src/lib                     Data helpers, SEO helpers, auth, storage
src/types                   Shared TypeScript types
drizzle                     D1 migrations
public                      DevEntro visual assets
```

## Final Implementation Summary

Completed phases:

1. Project setup
2. Tailwind and Shadcn setup
3. Basic layout
4. Homepage
5. Blog data structure
6. Blog listing page
7. Blog detail page
8. Database setup with Cloudflare D1 and Drizzle
9. Admin authentication
10. Admin dashboard shell
11. Post CRUD
12. Markdown editor
13. Rich editor
14. Image upload with Cloudflare R2
15. Categories and tags
16. AI tools directory
17. Newsletter capture
18. SEO metadata
19. Sitemap and robots.txt
20. Deployment setup

Post-phase cleanup completed:

- documented required env variables
- added dummy local env values
- documented how to get keys
- removed unused Next starter assets
- removed generated local build/cache/log files

## Current Limitations

These are intentionally not included in the MVP:

- public user accounts
- comments
- paid features
- Pinterest automation
- full AI tools admin CRUD
- email provider integration
- advanced ad management UI
- production analytics

## Recommended Next Steps

1. Create real Cloudflare D1 and R2 resources.
2. Replace the placeholder D1 database ID in `wrangler.jsonc`.
3. Set Wrangler production secrets.
4. Run remote D1 migrations.
5. Deploy to Cloudflare from WSL or Linux.
6. Add real review content and polish public article rendering.
