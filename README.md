# DevEntro

DevEntro is a completed MVP content platform for AI tool reviews, developer workflow articles, comparison pages, newsletter capture, and an admin-managed AI tools directory.

The MVP is intentionally focused: it includes the publishing, media, taxonomy, newsletter, ads-placeholder, SEO, and Cloudflare deployment foundation needed to run the site without adding public accounts, comments, payments, automation, or live ad-network scripts.

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
- TipTap rich text editor
- Markdown editor with preview
- React Markdown rendering

## Completed MVP Features

- Public homepage for DevEntro positioning and latest content discovery
- D1-backed public blog listing and blog detail pages
- D1-backed category listing and category detail pages
- Markdown and rich text article editors in admin
- Admin post CRUD with draft, published, and archived states
- Post SEO fields, canonical paths, Open Graph image fields, reading time, affiliate disclosure toggle, tags, and categories
- Admin authentication using a private admin email/password and signed HTTP-only session cookie
- Admin dashboard with D1 metrics for posts, tools, taxonomy, newsletter, and ad placements
- Category and tag management
- R2-backed media upload flow with a media library page
- Public AI tools directory and individual tool detail pages
- Admin AI tools CRUD for directory entries
- Newsletter capture stored in D1
- Newsletter admin page for captured subscribers
- Ads admin page for enabling/disabling placements and saving optional sponsor URL/image placeholders
- Reusable public ad placeholder components
- Static comparison, about, contact, privacy, terms, and affiliate disclosure pages
- SEO metadata helpers, page-level metadata, sitemap, and robots.txt
- Cloudflare deployment scripts through OpenNext and Wrangler

## Public Routes

- `/` - homepage
- `/blog` - published D1 blog listing
- `/blog/[slug]` - published D1 blog detail
- `/categories` - category index
- `/categories/[slug]` - posts filtered by category
- `/tools` - public AI tools directory
- `/tools/[slug]` - public AI tool detail
- `/ai-tools` - AI tools landing/compatibility route
- `/comparisons` - comparison content page
- `/newsletter` - newsletter signup page
- `/about` - about page
- `/contact` - contact page
- `/privacy-policy` - privacy policy
- `/affiliate-disclosure` - affiliate disclosure
- `/terms` - terms page
- `/robots.txt` - robots rules
- `/sitemap.xml` - generated sitemap

## Admin Routes

- `/admin/login` - private admin login
- `/admin` - dashboard metrics and recent activity
- `/admin/posts` - post list and edit entry point
- `/admin/posts/new` - create post with Markdown/rich editor
- `/admin/posts/[slug]/edit` - edit, publish, archive, or delete post
- `/admin/media` - upload and review R2 media assets
- `/admin/categories` - category list
- `/admin/categories/new` - create category
- `/admin/categories/[slug]/edit` - edit or delete category
- `/admin/tags` - tag list
- `/admin/tags/new` - create tag
- `/admin/tags/[slug]/edit` - edit or delete tag
- `/admin/tools` - AI tools admin list
- `/admin/tools/new` - create AI tool
- `/admin/tools/[slug]/edit` - edit, feature, publish, archive, or delete AI tool
- `/admin/newsletter` - newsletter subscriber list
- `/admin/analytics` - placeholder analytics surface
- `/admin/ads` - ad placement enablement and sponsor placeholder fields
- `/admin/settings` - placeholder settings surface

Admin routes are protected by middleware and require a valid signed session cookie.

## API Routes

- `POST /api/admin/login`
- `POST /api/admin/logout`
- `POST /api/admin/posts`
- `POST /api/admin/posts/[slug]`
- `POST /api/admin/categories`
- `POST /api/admin/categories/[slug]`
- `POST /api/admin/tags`
- `POST /api/admin/tags/[slug]`
- `POST /api/admin/tools`
- `POST /api/admin/tools/[slug]`
- `POST /api/admin/media/upload`
- `POST /api/admin/ads`
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

## Environment Safety

The repository ignores local secrets and generated output, including:

- `.env`
- `.env.local`
- `.env*`
- `.dev.vars`
- `.wrangler`
- `.open-next`
- `node_modules`
- `.next`

`.env.example` remains intentionally trackable as a safe template.

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

The app uses D1 for:

- posts
- post tags
- categories
- tags
- AI tools
- newsletter subscribers
- ad placements
- media asset records

## Media Uploads

Admin media uploads use Cloudflare R2 through the `MEDIA_BUCKET` binding.

Configured buckets:

- `deventro-media`
- `deventro-media-preview`

Supported upload types:

- JPG
- PNG
- WebP
- GIF

Maximum upload size:

```text
5 MB
```

## Ads

The MVP includes reusable ad placeholder components and admin-managed placement records.

Current placements:

- top banner
- inline article
- sidebar
- mobile sticky
- footer

The admin ads page can:

- enable or disable each placement
- save an optional sponsor URL
- save an optional sponsor image path or URL

Real Google AdSense scripts and other ad-network scripts are intentionally not included in this MVP.

## SEO

Implemented:

- shared SEO metadata helper
- page-level titles and descriptions
- canonical URLs
- Open Graph metadata
- Twitter card metadata
- article metadata
- generated `sitemap.xml`
- generated `robots.txt`

Robots blocks:

- `/admin/`
- `/api/`

## Deployment

DevEntro deploys to Cloudflare with OpenNext.

For production deployments, use WSL or Linux when possible. OpenNext can build on native Windows, but it may warn that Windows runtime behavior differs from the target runtime.

Before first production deployment:

1. Create a Cloudflare D1 database named `deventro`.
2. Replace any placeholder D1 database ID in `wrangler.jsonc`.
3. Create R2 buckets named `deventro-media` and `deventro-media-preview`, or update `wrangler.jsonc` with your bucket names.
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

6. Build and deploy:

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
src/app/(site)              Public routes
src/app/admin               Admin routes
src/app/api                 API routes
src/components              Reusable public and admin components
src/db                      Drizzle schema and D1 client
src/lib                     Data helpers, auth, SEO, forms, storage
src/types                   Shared TypeScript types
drizzle                     D1 migrations
public                      DevEntro image assets
```

## Intentionally Not Included

These are out of scope for the MVP:

- public user accounts
- comments
- payments or paid memberships
- Pinterest API automation
- real Google AdSense scripts
- other live ad-network scripts
- email provider delivery automation
- production analytics integration

## Deploy Readiness Checklist

- Dependencies install with `npm install`
- Code quality passes with `npm run lint`
- Production build passes with `npm run build`
- Remote Cloudflare resources exist
- `wrangler.jsonc` contains real D1/R2 resource identifiers
- Production admin secrets are set with Wrangler
- Remote D1 migrations have been applied
