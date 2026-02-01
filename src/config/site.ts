export const siteConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? "SaaS Starter",
  description: "Ship your SaaS in days, not months.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ogImage: "/og.png",
  links: {
    github: "https://github.com/gamer-mitsuha/saas-starter",
  },
} as const;
