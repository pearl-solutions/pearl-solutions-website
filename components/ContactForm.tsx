"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { services, site } from "@/lib/site";
import { BRIEF_EVENT } from "./HeroBrief";
import styles from "./Contact.module.css";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

export function ContactForm() {
  const [picked, setPicked] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  // Picks up the one-line brief typed in the hero.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(BRIEF_EVENT);
      if (saved) setMessage((m) => m || saved);
    } catch {}
    const onBrief = (e: Event) => setMessage((e as CustomEvent<string>).detail);
    window.addEventListener(BRIEF_EVENT, onBrief);
    return () => window.removeEventListener(BRIEF_EVENT, onBrief);
  }, []);

  const toggle = (name: string) =>
    setPicked((p) => (p.includes(name) ? p.filter((x) => x !== name) : [...p, name]));

  const mailto = () => {
    const subject = picked.length ? `Project: ${picked.join(", ")}` : "New project";
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          message,
          services: picked,
          company: form.get("company"), // honeypot
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "The message could not be sent.");
      try {
        sessionStorage.removeItem(BRIEF_EVENT);
      } catch {}
      setState({ kind: "sent" });
    } catch (err) {
      setState({ kind: "error", message: err instanceof Error ? err.message : "The message could not be sent." });
    }
  }

  if (state.kind === "sent") {
    return (
      <div className={styles.form} role="status">
        <div className={styles.sent}>
          <span className={styles.check} aria-hidden="true">
            ✓
          </span>
          <p className="h3">Message received</p>
          <p className={styles.sentText}>Thank you. You will get a reply by email at the address you gave.</p>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <fieldset className={styles.chips}>
        <legend className={styles.label}>What do you need?</legend>
        <div className={styles.chipRow}>
          {services.map((s) => (
            <label key={s.slug} className={styles.chip}>
              <input
                type="checkbox"
                name="services"
                value={s.name}
                checked={picked.includes(s.name)}
                onChange={() => toggle(s.name)}
              />
              <span>{s.short}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Name</span>
          <input type="text" name="name" required maxLength={120} autoComplete="name" placeholder="Jane Doe" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input type="email" name="email" required maxLength={200} autoComplete="email" placeholder="jane@company.com" />
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Your project</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What should it do, for whom, and is there a deadline?"
        />
      </label>

      {/* Hidden from people, tempting for bots. */}
      <label className={styles.honeypot} aria-hidden="true">
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>

      <button type="submit" className={`btn btn-primary btn-lg ${styles.submit}`} disabled={state.kind === "sending"}>
        {state.kind === "sending" ? "Sending…" : "Send message"}
      </button>

      <p className={styles.small}>
        Your details are used only to answer you. Read the <Link href="/privacy-policy">privacy policy</Link>.
      </p>

      {state.kind === "error" && (
        <p className={styles.error} role="alert">
          {state.message} You can also <a href={mailto()}>send it by email</a>.
        </p>
      )}
    </form>
  );
}
