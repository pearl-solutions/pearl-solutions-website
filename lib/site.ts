// Single source of truth for company details and page content.

export const site = {
  name: "Pearl Solutions",
  url: "https://www.pearl-solutions.eu",
  email: "contact@pearl-solutions.eu",
  description:
    "Pearl Solutions builds custom websites, Discord bots, automated checkout software and AI tools to order, with hosting and maintenance included if you want. Independent software studio based in France.",
  locale: "en_GB",
  legal: {
    tradingName: "Pearl Solutions",
    owner: "Gabriel Mercier",
    form: "Entreprise individuelle (EI)",
    formEn: "sole proprietorship (entreprise individuelle, EI)",
    siren: "994 260 438",
    sirenRaw: "994260438",
    vat: "VAT not applicable, article 293 B of the French General Tax Code (CGI)",
    address: {
      street: "5, rue de la Tuilerie",
      postcode: "51170",
      city: "Aougny",
      country: "France",
      countryCode: "FR",
    },
    hosts: [
      {
        role: "Website hosting",
        name: "Vercel Inc.",
        address: "440 N Barranca Ave #4133, Covina, CA 91723, United States",
        url: "https://vercel.com",
      },
      {
        role: "Domain name and servers",
        name: "OVH SAS (RCS Lille Métropole 424 761 419)",
        address: "2 rue Kellermann, 59100 Roubaix, France",
        url: "https://www.ovhcloud.com",
      },
    ],
  },
  timezone: "Europe/Paris",
  foundingYear: 2025,
} as const;

export const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#stack", label: "Stack" },
  { href: "/#faq", label: "FAQ" },
] as const;

export type ServiceSlug = "websites" | "discord-bots" | "checkout-automation" | "ai-solutions" | "custom-software";

export type Service = {
  slug: ServiceSlug;
  name: string;
  short: string;
  title: string; // <title> on the service page
  h1: string;
  metaDescription: string;
  fact: string;
  intro: string;
  disc: string; // colour of the disc behind the interface fragment
  stack: string;
  builds: { name: string; detail: string; stack: string }[];
  included: string[];
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "websites",
    name: "Websites",
    short: "Websites",
    title: "Custom website development",
    h1: "Website development",
    metaDescription:
      "Fast, SEO-ready websites and web apps built with Next.js and React: showcase sites, online shops, dashboards and client portals, designed and coded to order.",
    fact: "Hand-coded with Next.js, fast on a phone and ready for search engines from day one.",
    intro:
      "Showcase sites, online shops, client portals and dashboards. Each one is designed for your business, written by hand in Next.js and handed over with its source code.",
    disc: "var(--pearl)",
    stack: "Next.js · React",
    builds: [
      { name: "Showcase website", detail: "A fast, search-ready site that presents your business and turns visitors into enquiries.", stack: "Next.js" },
      { name: "Online shop", detail: "A catalogue, a cart and a checkout, wired to Stripe or your existing payment provider.", stack: "Stripe" },
      { name: "Client portal", detail: "Accounts, file sharing and status pages for your customers, behind a secure login.", stack: "Auth" },
      { name: "Admin dashboard", detail: "Your orders, users and numbers in one place, built around how your team works.", stack: "React" },
    ],
    included: [
      "Design made for your brand, not a template",
      "Technical SEO: metadata, sitemap, structured data and Core Web Vitals",
      "Responsive layout tested on phones, tablets and desktops",
      "Contact forms, analytics and the integrations you already use",
      "Hosting, domain and SSL managed for you, if you want",
    ],
    faq: [
      { q: "Can you redesign my existing website?", a: "Yes. I start from what already works (your content, your rankings, your URLs) and rebuild the rest, with redirects so you keep your search traffic." },
      { q: "Will I be able to edit the content myself?", a: "If you need to, yes. I can connect a headless CMS so you can change text and images without touching code." },
    ],
  },
  {
    slug: "discord-bots",
    name: "Discord bots",
    short: "Discord bots",
    title: "Custom Discord bot development",
    h1: "Discord bot development",
    metaDescription:
      "Custom Discord bots for communities and businesses: moderation, tickets, roles, subscriptions, monitors and dashboards, built with discord.js and hosted for you.",
    fact: "Slash commands, buttons and modals, running on reliable hosting with logs you can read.",
    intro:
      "Bots that run your server for you: moderation, support tickets, paid roles, alerts and anything your community needs. Built with slash commands, buttons and modals, and hosted on reliable infrastructure.",
    disc: "var(--mint)",
    stack: "discord.js · Node.js",
    builds: [
      { name: "Moderation and roles", detail: "Auto-moderation, verification, reaction and button roles, with audit logs you can trust.", stack: "discord.js" },
      { name: "Ticket system", detail: "Private support channels opened from a button, with transcripts saved when they close.", stack: "Node.js" },
      { name: "Paid access", detail: "Roles granted and removed automatically from Stripe or Whop subscriptions.", stack: "Stripe" },
      { name: "Monitors and alerts", detail: "Restocks, prices or any web page watched around the clock, posted as rich embeds.", stack: "Webhooks" },
    ],
    included: [
      "Slash commands, buttons, select menus and modals",
      "A database for settings, members and history",
      "Hosting with automatic restarts and error alerts",
      "A web dashboard to configure the bot, if you need one",
      "Documentation for your moderators",
    ],
    faq: [
      { q: "Do you host the bot?", a: "I can, on a monthly plan, or deploy it on your own server or VPS and hand you the keys." },
      { q: "Can you fix or extend a bot someone else wrote?", a: "Yes, after a short code review to see what state it is in." },
    ],
  },
  {
    slug: "checkout-automation",
    name: "Checkout automation",
    short: "Checkout bots",
    title: "Automated checkout software",
    h1: "Checkout automation",
    metaDescription:
      "Custom automated checkout software and monitors: fast task runners, proxy and account management, captcha handling and Discord notifications, built to order.",
    fact: "Tasks, proxies and accounts managed in one place, with every success posted to Discord.",
    intro:
      "Programs that watch a product and buy it the moment it drops. Task runners, monitors, account and proxy management, and Discord notifications, built around the stores you target.",
    disc: "var(--rose)",
    stack: "Node.js · Python",
    builds: [
      { name: "Checkout task runner", detail: "Runs many purchase tasks in parallel, each with its own profile, proxy and account.", stack: "Node.js" },
      { name: "Stock monitor", detail: "Watches product pages and APIs and alerts you within seconds of a restock.", stack: "Python" },
      { name: "Account manager", detail: "Creates, warms up and stores accounts and payment profiles securely.", stack: "SQLite" },
      { name: "Success feed", detail: "Every order posted to your Discord with product, size, price and timing.", stack: "Webhooks" },
    ],
    included: [
      "Desktop app or command-line tool, as you prefer",
      "Proxy rotation and per-task profiles",
      "Encrypted storage for accounts and payment profiles",
      "Discord webhooks for successes and failures",
      "Updates when a target site changes, on a maintenance plan",
    ],
    faq: [
      { q: "Is automated checkout legal?", a: "Writing automation software is legal. How it is used is up to you: many stores forbid automated purchases in their terms, and you remain responsible for respecting them." },
      { q: "What happens when a store changes its site?", a: "Sites change often. A maintenance plan covers the fixes, usually the same day for breaking changes." },
    ],
  },
  {
    slug: "ai-solutions",
    name: "AI solutions",
    short: "AI solutions",
    title: "Custom AI solutions and chatbots",
    h1: "Custom AI solutions",
    metaDescription:
      "Custom AI tools for your business: chatbots trained on your documents, AI agents that automate tasks, data extraction and integrations with Claude and OpenAI models.",
    fact: "Answers grounded in your own documents, with the source shown under every reply.",
    intro:
      "Assistants that answer from your own documents, agents that handle repetitive tasks, and pipelines that pull data out of emails, PDFs and spreadsheets. Built on the leading models and connected to the tools you already use.",
    disc: "var(--sky)",
    stack: "Claude · OpenAI",
    builds: [
      { name: "Document chatbot", detail: "Answers questions from your manuals, policies or catalogue, and cites the page it used.", stack: "RAG" },
      { name: "Support assistant", detail: "Drafts replies to customer emails or Discord tickets for a human to check and send.", stack: "Claude" },
      { name: "Data extraction", detail: "Turns invoices, forms and PDFs into clean rows in your spreadsheet or database.", stack: "Python" },
      { name: "Task agent", detail: "Carries out multi-step jobs across your tools, with every action logged.", stack: "Agents" },
    ],
    included: [
      "A choice of model based on cost, speed and privacy",
      "Your data kept in your accounts, not reused for training",
      "Guardrails and evaluation on real examples before launch",
      "A web, Discord or Slack interface",
      "Usage and cost tracking",
    ],
    faq: [
      { q: "Will the AI make things up?", a: "Answers are grounded in your documents and show their sources, and I test them on real questions before launch. When the answer is not in your data, the assistant says so." },
      { q: "Is my data safe?", a: "Your data stays in your accounts and is sent only to providers that do not train on API traffic. I can also run open models on your own server." },
    ],
  },
  {
    slug: "custom-software",
    name: "Custom software",
    short: "Custom projects",
    title: "Custom software development",
    h1: "Custom software",
    metaDescription:
      "Bespoke software built to order: APIs, scrapers, browser automation, internal tools, integrations and desktop apps for businesses and creators.",
    fact: "If it can run on a computer, it can probably be built. Tell me what you need.",
    intro:
      "The projects that fit no category: APIs, scrapers, browser automation, internal tools, integrations between services and desktop apps. You describe the problem, I build the tool that solves it.",
    disc: "var(--sand)",
    stack: "TypeScript · Python",
    builds: [
      { name: "Web scraping", detail: "Structured data collected from websites on a schedule and delivered where you need it.", stack: "Playwright" },
      { name: "API and integrations", detail: "Your services talking to each other: CRM, payments, spreadsheets, email.", stack: "Node.js" },
      { name: "Browser automation", detail: "Repetitive work in a browser done for you, reliably and on a schedule.", stack: "Playwright" },
      { name: "Internal tools", detail: "Small apps that replace the spreadsheet your team has outgrown.", stack: "Next.js" },
    ],
    included: [
      "A written scope and a quote before work starts",
      "Regular demos so you see progress",
      "Clean, documented source code",
      "Deployment on your servers or mine",
      "Support after delivery",
    ],
    faq: [
      { q: "My idea is vague. Can you still help?", a: "Yes. Most projects start that way. A first call turns the idea into a short written scope with a price." },
      { q: "Do you sign NDAs?", a: "Yes, before you share anything sensitive." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const faq = [
  {
    q: "How much does a project cost?",
    a: "Every project is priced on quote. After a free first call you get a written quote for your exact scope, split into milestones so you pay as the work is delivered.",
  },
  {
    q: "How long does it take?",
    a: "It depends on the project: a showcase website is not an AI platform. Before any work starts you get a written plan with a date for each milestone, and you see a working version early.",
  },
  {
    q: "Do I own the code?",
    a: "Yes. Once the final invoice is paid, the source code, the repository and every account created for the project are yours.",
  },
  {
    q: "Are checkout bots legal?",
    a: "Building automation software is legal. Using it is your responsibility: many stores forbid automated purchases in their terms of sale, and you must respect the rules of the sites you target.",
  },
  {
    q: "Which technologies do you use?",
    a: "TypeScript, Next.js and React for the web; Node.js and Python for bots, automation and APIs; discord.js for Discord; Claude and OpenAI models for AI work. The stack follows the project, not the other way round.",
  },
  {
    q: "Can you host and maintain my website?",
    a: "Yes. I can build your site and take care of hosting, domain, SSL, backups and updates, so you have nothing to manage. Bots and servers can be hosted the same way.",
  },
  {
    q: "Do you work with clients outside France?",
    a: "Yes. Everything happens remotely, in English or French, and invoices are issued in euros.",
  },
  {
    q: "Can you take over an existing project?",
    a: "Yes. I start with a short paid code review, then tell you honestly whether to fix it or rebuild it.",
  },
];
