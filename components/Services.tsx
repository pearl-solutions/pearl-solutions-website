import Link from "next/link";
import { services } from "@/lib/site";
import { Fragment } from "./fragments/Fragments";
import styles from "./Services.module.css";

export function Services() {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <div className="section-head">
          <h2 id="services-title" className="h2" data-reveal>
            Five ways to <em>work smarter</em>
          </h2>
          <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            Websites, bots, automation and AI, each one scoped with you, written from scratch and handed over with
            its source code.
          </p>
        </div>

        <ul className={styles.bento}>
          {services.map((s, i) => (
            <li key={s.slug} className={`card ${styles.item}`} data-reveal style={{ "--i": i % 3, "--tint": s.disc } as React.CSSProperties}>
              <div className={styles.visual} aria-hidden="true" inert>
                <span className={styles.halo} />
                <div className={styles.ui}>
                  <Fragment slug={s.slug} />
                </div>
              </div>
              <div className={styles.body}>
                <h3 className="h3">
                  <Link href={`/services/${s.slug}`} className={styles.link}>
                    {s.name}
                  </Link>
                </h3>
                <p className={styles.text}>{s.fact}</p>
                <span className={styles.more} aria-hidden="true">
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 16 16">
                    <path d="M2 8h11M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
