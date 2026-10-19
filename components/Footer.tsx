import Link from "next/link";
import { services, site } from "@/lib/site";
import { LocalTime } from "./LocalTime";
import { Logo } from "./Logo";
import styles from "./Footer.module.css";

export function Footer() {
  const { legal } = site;
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo} aria-label="Pearl Solutions, home">
              <Logo size={36} />
              <span>
                <b>Pearl</b> Solutions
              </span>
            </Link>
            <p className={styles.statement}>
              Custom websites, Discord bots, checkout automation and AI tools, designed and built by hand in France.
            </p>
            <Link href="/#contact" className="btn btn-primary">
              Start a project
            </Link>
          </div>

          <nav className={styles.col} aria-label="Services">
            <p className={styles.colTitle}>Services</p>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.col} aria-label="Company">
            <p className={styles.colTitle}>Company</p>
            <ul>
              <li>
                <Link href="/#stack">Stack</Link>
              </li>
              <li>
                <Link href="/#faq">FAQ</Link>
              </li>
              <li>
                <Link href="/#contact">Contact</Link>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
          </nav>

          <nav className={styles.col} aria-label="Legal">
            <p className={styles.colTitle}>Legal</p>
            <ul>
              <li>
                <Link href="/legal-notice">Legal notice</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of service</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} {legal.tradingName} · {legal.owner} EI · SIREN {legal.siren} · {legal.address.street},{" "}
            {legal.address.postcode} {legal.address.city}, {legal.address.country} · TVA non applicable, art. 293 B du
            CGI
          </p>
          <p className={styles.time}>
            <span className={styles.live} aria-hidden="true" />
            {legal.address.city}, <LocalTime timeZone={site.timezone} />
          </p>
        </div>
      </div>

      <p className={styles.giant} aria-hidden="true">
        Pearl Solutions
      </p>
    </footer>
  );
}
