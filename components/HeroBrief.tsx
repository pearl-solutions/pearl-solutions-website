"use client";

import { useState } from "react";
import styles from "./Hero.module.css";

export const BRIEF_EVENT = "pearl:brief";

// A one-line brief that carries over into the contact form.
export function HeroBrief() {
  const [value, setValue] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const brief = value.trim();
    if (brief) {
      try {
        sessionStorage.setItem(BRIEF_EVENT, brief);
      } catch {}
      window.dispatchEvent(new CustomEvent(BRIEF_EVENT, { detail: brief }));
    }
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => document.querySelector<HTMLTextAreaElement>("#contact textarea")?.focus({ preventScroll: true }), 700);
  }

  return (
    <form className={styles.brief} onSubmit={onSubmit} role="search" aria-label="Describe your project">
      <label className="sr-only" htmlFor="hero-brief">
        What do you want to build?
      </label>
      <input
        id="hero-brief"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What do you want to build?"
        autoComplete="off"
        maxLength={300}
      />
      <button type="submit" className="btn btn-primary">
        Start a project
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M2 8h11M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </button>
    </form>
  );
}
