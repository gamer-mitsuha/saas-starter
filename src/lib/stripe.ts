import Stripe from "stripe";

// Lazy singleton — only created when first accessed at runtime (not build time)
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    _stripe = new Stripe(key, {
      apiVersion: "2026-01-28.clover",
      typescript: true,
    });
  }
  return _stripe;
}

export const PLANS = {
  free: {
    name: "Free",
    description: "Get started for free",
    price: 0,
    priceId: null,
    features: [
      "1 project",
      "Basic features",
      "Community support",
    ],
  },
  pro: {
    name: "Pro",
    description: "For power users",
    price: 8,
    priceId: process.env.STRIPE_PRO_PRICE_ID ?? null,
    features: [
      "Unlimited projects",
      "All features",
      "Priority support",
      "API access",
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS;
