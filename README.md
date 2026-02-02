# 🚀 SaaS Starter

A production-ready SaaS template. Clone → Customize → Ship in days.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, TypeScript)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Auth:** [Supabase Auth](https://supabase.com/auth) (Google + GitHub OAuth)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL + Row Level Security)
- **Payments:** [Stripe](https://stripe.com/) (Subscriptions + Customer Portal)
- **Deploy:** [Vercel](https://vercel.com/) (one-click)

## What's Included

- ✅ **Landing page** — Hero, features grid, CTA
- ✅ **Pricing page** — Free / Pro tiers with Stripe integration
- ✅ **Auth pages** — Login & signup with Google/GitHub OAuth
- ✅ **Dashboard** — Sidebar layout, stats cards, settings page
- ✅ **Stripe Checkout** — Subscription creation + webhooks
- ✅ **Customer Portal** — Manage subscriptions (Stripe-hosted)
- ✅ **Middleware** — Auth guards, session refresh
- ✅ **Database schema** — Profiles table with RLS policies
- ✅ **TypeScript** — End-to-end type safety

## Quick Start

```bash
# 1. Clone
git clone https://github.com/gamer-mitsuha/saas-starter.git my-saas
cd my-saas

# 2. Install
pnpm install

# 3. Configure
cp .env.example .env.local
# Fill in Supabase + Stripe keys (see Environment Variables below)

# 4. Run
pnpm dev
```

## Project Structure

This project follows a feature-based structure optimized for Next.js App Router:

- **`src/app/(marketing)/`**  
  Public-facing pages (Landing page, Pricing, Login, Signup). These routes use a layout designed for marketing conversion.

- **`src/app/(dashboard)/`**  
  Authenticated pages (Dashboard, Settings, Billing). Protected by middleware; unauthenticated users are redirected to login.

- **`src/app/api/`**  
  Backend API routes. Handles Stripe webhooks (`api/stripe/webhook`) and Auth callbacks (`api/auth/callback`).

- **`src/components/`**  
  Shared UI components (Buttons, Inputs, Modals) and layout blocks (Header, Sidebar).

- **`src/lib/`**  
  Core logic and helpers:
  - `supabase/` — Client/Server clients for DB access.
  - `stripe.ts` — Stripe SDK initialization and helpers.
  - `utils.ts` — Common utility functions.

- **`src/types/`**  
  TypeScript definitions, including the Supabase Database schema (`database.types.ts`).

- **`supabase/migrations/`**  
  SQL migration files to keep your local database and production database in sync.

## Adding a New Feature

Follow this standard flow to add full-stack features:

**Step 1: Database**  
Create a new Supabase migration.
```bash
supabase migration new my_feature_name
```
Edit the generated SQL file in `supabase/migrations/` to add tables and RLS policies.

**Step 2: Types**  
Update your TypeScript types to match the database schema.
```bash
supabase gen types typescript --project-id "your-project-id" > src/types/database.types.ts
```
*(Or manually update `src/types/` if not using the CLI generator yet)*

**Step 3: Server Action**  
Create a Server Action in `src/actions/` (or colocated in the app folder) to handle the logic securely on the server.

**Step 4: UI**  
Build your React components in `src/components/` and wire them up to the Server Action. Add the page in `src/app/(dashboard)/my-feature/page.tsx`.

## Environment Variables

Copy `.env.example` to `.env.local` and configure the following:

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (Settings → API) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anonymous Key (Settings → API) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key (server-side only) |
| `STRIPE_SECRET_KEY` | Stripe Secret Key (Developers → API Keys) |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook Signing Secret (Developers → Webhooks) |
| `STRIPE_PRO_PRICE_ID` | The Price ID for your Pro plan (Product Catalog) |
| `NEXT_PUBLIC_SITE_URL` | Your production URL (used for auth redirects/webhooks) |

## Setup Guide

### Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Settings → API** — copy the URL and keys to your `.env.local`
3. Go to **Authentication → Providers** — enable Google and/or GitHub
4. Run the migration: **SQL Editor** → paste contents of `supabase/migrations/00001_profiles.sql`

### Stripe

1. Create an account at [stripe.com](https://stripe.com)
2. Create a Product + Price (recurring, monthly)
3. Copy the API keys and Price ID to `.env.local`
4. Set up webhooks: **Developers → Webhooks** → endpoint: `https://your-domain.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gamer-mitsuha/saas-starter)

## License

MIT
