# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern developer portfolio built with Next.js 16 (App Router), TypeScript, Prisma ORM, and PostgreSQL. It features a dynamic blog with MDX support, project showcase, news aggregation, contact form with database storage, and a secure admin dashboard for content management.

## Development Commands

### Starting Development
```bash
npm run dev                      # Start development server on http://localhost:3000
npm run build                    # Build for production (runs prisma generate first)
npm start                        # Start production server
npm run lint                     # Run ESLint
```

### Database Management
```bash
npx prisma migrate dev           # Create and apply migrations
npx prisma migrate dev --name <migration_name>  # Create named migration
npx prisma generate              # Generate Prisma Client (auto-runs on build)
npx prisma studio                # Open Prisma Studio GUI
npx prisma db push               # Push schema changes without migration (dev only)
node check-users.js              # Check existing users in database
```

## Architecture

### Database-First Content Management

**Blog posts are stored in the database, not as MDX files.** The `Post` model stores MDX content directly in the `content` field. There is no `content/` directory or file-based blog system.

When creating or editing blog posts:
- Use the admin dashboard at `/admin/posts`
- Server actions in `src/lib/actions.ts` handle CRUD operations
- Posts support MDX syntax rendered via `next-mdx-remote`
- Auto-generated cover images use Pollinations.ai API (see `src/lib/blog-service.ts`)

### Authentication System

Uses NextAuth.js v5 (beta) with a simple credentials provider:
- Configuration split across `src/auth.config.ts` and `src/auth.ts`
- Admin password stored in `ADMIN_PASSWORD` environment variable
- Middleware in `src/middleware.ts` protects all `/admin/*` routes
- Single admin user (no user registration system)

### Data Models (Prisma Schema)

Key models in `prisma/schema.prisma`:
- **Post**: Blog posts with MDX content, tags, views, publish status
- **Project**: Portfolio projects with demo/repo links
- **News**: Tech news items fetched from NewsAPI and summarized via OpenAI
- **Message**: Contact form submissions
- **User**: Admin user(s)
- **Analytics**: Page view tracking

### News Aggregation System

The `/news` page displays curated tech news:
- Cron job at `/api/cron/news/route.ts` fetches from NewsAPI (global + India tech news)
- OpenAI GPT-3.5-turbo generates concise summaries (see `src/lib/news-service.ts`)
- Falls back to mock data if API keys missing
- Deduplicates by URL and filters out removed/invalid articles

### Component Organization

```
src/components/
├── admin/          # Admin dashboard components
├── features/       # Feature-specific components (ContactForm, NewsCard, etc.)
├── icons/          # Custom icon components (brand icons not in lucide-react)
├── layout/         # Navbar and Footer
├── mdx/            # MDX rendering components
├── providers/      # ThemeProvider for dark/light mode
└── ui/             # Reusable UI components (ThemeToggle)
```

### Routing Structure

- `/` - Home page
- `/about` - About page
- `/blog` - Blog listing
- `/blog/[slug]` - Individual blog post (uses post.slug)
- `/news` - Tech news feed
- `/contact` - Contact form (saves to Message model)
- `/shop` - Shop page (placeholder)
- `/admin` - Admin dashboard (requires auth)
- `/admin/posts`, `/admin/projects`, `/admin/messages` - Content management
- `/login` - Admin login

### API Routes

- `/api/contact/route.ts` - Contact form submission handler
- `/api/cron/news/route.ts` - News fetching cron job
- `/api/cron/blog-images/route.ts` - Blog image generation cron job

### Styling System

- Tailwind CSS with custom configuration in `tailwind.config.ts`
- Dark/light mode via `next-themes` with system preference detection
- CSS animations via `tailwindcss-animate`
- Utility function `cn()` for conditional class merging (using `clsx` and `tailwind-merge`)
- Custom font: Inter (loaded from Google Fonts in root layout)

## Environment Variables

Required variables (see `.env.example`):
```
DATABASE_URL="postgresql://..."     # PostgreSQL connection string
AUTH_SECRET="..."                   # NextAuth secret for JWT signing
ADMIN_PASSWORD="..."                # Admin login password
NEWS_API_KEY="..."                  # NewsAPI key (optional, uses mock data if missing)
OPENAI_API_KEY="..."                # OpenAI key for news summaries (optional)
```

## Important Patterns

### Server Actions

All data mutations use Next.js Server Actions defined in `src/lib/actions.ts`:
- `authenticate()` - Admin login
- `createPost()`, `updatePost()`, `deletePost()` - Blog post management
- `incrementView()` - Track post views and analytics
- All actions handle auth checks, validation, and path revalidation

### Path Revalidation

After database mutations, revalidate affected paths:
```typescript
revalidatePath("/admin/posts");
revalidatePath("/blog");
revalidatePath(`/blog/${slug}`);
```

### Image Generation

Blog posts without cover images can auto-generate them:
- Cron job checks for posts with `imageUrl: null`
- Uses Pollinations.ai free API with descriptive prompts
- Deterministic URLs using post ID as seed

## Deployment

Optimized for Vercel deployment:
1. Ensure all environment variables are set in Vercel dashboard
2. PostgreSQL database required (use Vercel Postgres, Supabase, or similar)
3. Build command automatically runs `prisma generate`
4. Middleware matcher excludes static assets and API routes
