import Link from "next/link";
import { PLANS } from "@/lib/stripe";

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Simple, transparent pricing
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Start free. Upgrade when you need more.
        </p>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:mx-auto lg:max-w-4xl">
        {/* Free Plan */}
        <div className="rounded-2xl border p-8">
          <h3 className="text-lg font-semibold text-gray-900">
            {PLANS.free.name}
          </h3>
          <p className="mt-2 text-sm text-gray-600">{PLANS.free.description}</p>
          <div className="mt-6">
            <span className="text-4xl font-bold text-gray-900">$0</span>
            <span className="text-gray-600">/month</span>
          </div>
          <Link
            href="/signup"
            className="mt-8 block rounded-lg border border-gray-300 px-4 py-2.5 text-center text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Get Started
          </Link>
          <ul className="mt-8 space-y-3">
            {PLANS.free.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-500">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Pro Plan */}
        <div className="rounded-2xl border-2 border-blue-600 p-8 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {PLANS.pro.name}
            </h3>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              Popular
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600">{PLANS.pro.description}</p>
          <div className="mt-6">
            <span className="text-4xl font-bold text-gray-900">
              ${PLANS.pro.price}
            </span>
            <span className="text-gray-600">/month</span>
          </div>
          <Link
            href="/signup?plan=pro"
            className="mt-8 block rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-700"
          >
            Start Free Trial
          </Link>
          <ul className="mt-8 space-y-3">
            {PLANS.pro.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-500">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
