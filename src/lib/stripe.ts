import Stripe from "stripe";
import { env } from "@/env";

// Lazy singleton — only created when first accessed at runtime (not build time)
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(env.STRIPE_SECRET_KEY, {
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
    priceId: env.STRIPE_PRO_PRICE_ID,
    features: [
      "Unlimited projects",
      "All features",
      "Priority support",
      "API access",
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS;
