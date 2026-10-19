import type { IconSlug } from "./icons";

export type Tech = { name: string; icon?: IconSlug };

export const stackGroups: { title: string; text: string; items: Tech[] }[] = [
  {
    title: "Web and apps",
    text: "Fast, search-ready front ends and the APIs behind them.",
    items: [
      { name: "Next.js", icon: "nextdotjs" },
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Node.js", icon: "nodedotjs" },
    ],
  },
  {
    title: "Back end and data",
    text: "Services, workers and databases built to stay up under load.",
    items: [
      { name: "Go", icon: "go" },
      { name: "Java", icon: "openjdk" },
      { name: "Python", icon: "python" },
      { name: "SQL", icon: "postgresql" },
      { name: "Redis", icon: "redis" },
    ],
  },
  {
    title: "Cloud, DevOps and hosting",
    text: "Containers, CI/CD and server deployment, with hosting managed for you if you want.",
    items: [
      { name: "Docker", icon: "docker" },
      { name: "AWS" },
      { name: "Linux servers", icon: "linux" },
      { name: "Nginx", icon: "nginx" },
      { name: "GitHub", icon: "github" },
      { name: "CI/CD", icon: "githubactions" },
      { name: "Vercel", icon: "vercel" },
    ],
  },
  {
    title: "Edge and bot protection",
    text: "CDN, firewall and anti-bot layers, set up and understood in depth.",
    items: [
      { name: "Cloudflare", icon: "cloudflare" },
      { name: "Akamai", icon: "akamai" },
      { name: "DataDome" },
    ],
  },
  {
    title: "Bots, payments and AI",
    text: "Automation, Discord, payments and language models.",
    items: [
      { name: "discord.js", icon: "discorddotjs" },
      { name: "Playwright" },
      { name: "Stripe", icon: "stripe" },
      { name: "Claude", icon: "claude" },
      { name: "OpenAI" },
    ],
  },
];

export const marquee: Tech[] = stackGroups.flatMap((g) => g.items);
