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
# Fill in Supabase + Stripe keys (see Setup below)

# 4. Run
pnpm dev
```

## Setup Guide

### Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Settings → API** — copy the URL and anon key
3. Go to **Authentication → Providers** — enable Google and/or GitHub
4. Run the migration: **SQL Editor** → paste `supabase/migrations/00001_profiles.sql`

### Stripe

1. Create an account at [stripe.com](https://stripe.com)
2. Create a Product + Price (recurring, monthly)
3. Copy the API keys and Price ID to `.env.local`
4. Set up webhooks: **Developers → Webhooks** → endpoint: `https://your-domain.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gamer-mitsuha/saas-starter)

## Project Structure

```
src/
├── app/
│   ├── (marketing)/     # Landing page, pricing
│   ├── (auth)/          # Login, signup, OAuth callback
│   ├── (dashboard)/     # Protected dashboard pages
│   └── api/stripe/      # Checkout, webhooks, portal
├── components/          # Shared UI components
├── config/              # Site configuration
├── lib/
│   ├── supabase/        # Client, server, middleware helpers
│   └── stripe.ts        # Stripe client + plan definitions
└── types/               # TypeScript types (DB schema)
```

## Customizing for Your Product

1. **Edit `src/config/site.ts`** — name, description, links
2. **Edit `src/lib/stripe.ts`** — plan names, features, pricing
3. **Edit `src/app/(marketing)/page.tsx`** — landing page content
4. **Add your product pages** in `src/app/(dashboard)/`

## License

MIT
