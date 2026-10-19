import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>(); // best-effort, per server instance

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Visitor text goes into Discord markdown: neutralise the characters that could break the layout.
const escape = (v: string) => v.replace(/([\\`*_~|])/g, "\\$1");

const sourcePage = (req: Request) => {
  try {
    return new URL(req.headers.get("referer") ?? "").pathname || "/";
  } catch {
    return "/";
  }
};

// The enquiry as a Discord embed, in the site's colours: mint accent, glass pearl avatar.
function enquiryMessage(e: { name: string; email: string; message: string; services: string[]; page: string }) {
  const avatar = `${site.url}/brand/pearl-avatar.png`;
  const quote = e.message
    .split(/\r?\n/)
    .map((line) => `> ${escape(line) || " "}`)
    .join("\n")
    .slice(0, 3800);
  return {
    username: site.name,
    avatar_url: avatar,
    allowed_mentions: { parse: [] },
    content: `New project enquiry from **${escape(e.name)}**`,
    embeds: [
      {
        color: 0x9ef0dc,
        author: { name: "New project enquiry", icon_url: avatar, url: site.url },
        title: e.name,
        description: quote,
        fields: [
          { name: "Email", value: e.email, inline: true },
          { name: "Needs", value: e.services.length ? e.services.map((s) => `\`${s.replace(/`/g, "")}\``).join("  ") : "Not specified", inline: true },
          { name: "From page", value: `\`${e.page}\``, inline: true },
        ],
        footer: { text: "pearl-solutions.eu · Contact form", icon_url: avatar },
        timestamp: new Date().toISOString(),
      },
    ],
  };
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }
  hits.set(ip, [...recent, now]);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled: pretend it worked.
  if (clean(body.company, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const message = clean(body.message, 4000);
  const services = Array.isArray(body.services)
    ? body.services.filter((s): s is string => typeof s === "string").map((s) => s.slice(0, 60)).slice(0, 8)
    : [];

  if (!name || !EMAIL.test(email) || message.length < 10) {
    return NextResponse.json(
      { error: "Please give your name, a valid email and a few words about the project." },
      { status: 400 },
    );
  }

  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) {
    console.error("[contact] DISCORD_WEBHOOK_URL is not set");
    return NextResponse.json({ error: "The form is not available right now." }, { status: 503 });
  }

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(enquiryMessage({ name, email, message, services, page: sourcePage(req) })),
  });

  if (!res.ok) {
    console.error("[contact] Discord webhook failed", res.status);
    return NextResponse.json({ error: "The message could not be sent." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
