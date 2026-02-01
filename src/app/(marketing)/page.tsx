import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Ship your SaaS
            <span className="text-blue-600"> in days</span>,
            <br />
            not months.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {siteConfig.name} gives you everything you need to launch fast.
            Authentication, payments, dashboard — all wired up and ready to go.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
            >
              Get Started Free
            </Link>
            <Link
              href={siteConfig.links.github}
              className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              View on GitHub
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-gray-50 py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Everything you need
          </h2>
          <p className="mt-4 text-center text-gray-600">
            A complete foundation so you can focus on what makes your product unique.
          </p>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                <div className="text-3xl">{feature.icon}</div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Ready to ship?
          </h2>
          <p className="mt-4 text-gray-600">
            Start building your SaaS today. Free to get started.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-block rounded-lg bg-black px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
          >
            Get Started Free →
          </Link>
        </div>
      </section>
    </>
  );
}

const features = [
  {
    icon: "🔐",
    title: "Authentication",
    description:
      "Google & GitHub OAuth out of the box. Supabase Auth handles sessions, tokens, and security.",
  },
  {
    icon: "💳",
    title: "Stripe Payments",
    description:
      "Subscriptions, checkout, and customer portal. Webhook handlers wired up and ready.",
  },
  {
    icon: "📊",
    title: "Dashboard",
    description:
      "Beautiful, responsive dashboard with sidebar navigation. Protected routes built in.",
  },
  {
    icon: "🗃️",
    title: "Database",
    description:
      "Supabase (PostgreSQL) with migrations, Row Level Security, and auto-generated types.",
  },
  {
    icon: "🚀",
    title: "One-Click Deploy",
    description:
      "Deploy to Vercel in seconds. Environment variables, preview deployments, and CI/CD included.",
  },
  {
    icon: "🎨",
    title: "Tailwind CSS",
    description:
      "Beautiful, responsive design system. Dark mode ready. Customize everything with utility classes.",
  },
];
