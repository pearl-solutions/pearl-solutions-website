"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { Logo } from "./Logo";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.header} data-scrolled={scrolled || open || undefined}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand} aria-label="Pearl Solutions, home">
          <Logo size={34} priority />
          <span className={styles.wordmark} aria-hidden>
            <b>Pearl</b> Solutions
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Main">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="/#contact" className={`btn btn-primary ${styles.cta}`}>
            Start a project
          </Link>
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span data-open={open || undefined} />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={styles.panel} hidden={!open}>
        <nav aria-label="Mobile">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/#contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
