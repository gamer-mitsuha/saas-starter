import { env } from "@/env";

export const siteConfig = {
  name: env.NEXT_PUBLIC_APP_NAME,
  description: "Ship your SaaS in days, not months.",
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: "/og.png",
  links: {
    github: "https://github.com/gamer-mitsuha/saas-starter",
  },
} as const;
