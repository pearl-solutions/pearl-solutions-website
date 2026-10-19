import Image from "next/image";
import { HeroBrief } from "./HeroBrief";
import { marquee } from "./stack/data";
import { TechMark } from "./stack/TechMark";
import styles from "./Hero.module.css";


export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.spotlight} aria-hidden="true" />
      <div className={`glow ${styles.glowMint}`} aria-hidden="true" />
      <div className={`glow ${styles.glowRose}`} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <p className={`chip ${styles.chip}`}>
          <span className={styles.dot} aria-hidden="true" />
          <b>Independent software studio</b>
          <span className={styles.chipExtra}>· Made in France</span>
        </p>

        <h1 id="hero-title" className={`display ${styles.title}`}>
          Custom software <br /><em>to grow your business.</em>
        </h1>

        <p className={styles.sub}>
          From a simple website to a custom AI tool, Pearl Solutions designs, builds and hosts the software your
          business needs, with a clear quote and clean code you own.
        </p>

        <HeroBrief />

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.ring} />
          <div className={styles.ring2} />
          <Image
            src="/brand/pearl-glass.webp"
            alt=""
            width={360}
            height={331}
            priority
            unoptimized
            className={styles.mark}
          />

          <div className={`${styles.widget} ${styles.w1}`}>
            <span className={styles.wIcon} data-c="mint">✓</span>
            <div>
              <p className={styles.wTitle}>Checked out</p>
              <p className={styles.wSub}>Retro High OG · size 42 · 1.84 s</p>
            </div>
          </div>

          <div className={`${styles.widget} ${styles.w2}`}>
            <p className={styles.wSub}>Lighthouse</p>
            <div className={styles.scores}>
              <span>100</span>
              <span>100</span>
              <span>100</span>
            </div>
          </div>

          <div className={`${styles.widget} ${styles.w3}`}>
            <span className={styles.wIcon} data-c="discord">#</span>
            <div>
              <p className={styles.wTitle}>Ticket #1042 opened</p>
              <p className={styles.wSub}>Nova bot · just now</p>
            </div>
          </div>

          <div className={`${styles.widget} ${styles.w4}`}>
            <p className={styles.wTitle}>Answer found</p>
            <p className={styles.wSub}>Source: Returns policy, §4.2</p>
            <span className={styles.bar} />
          </div>
        </div>
      </div>

      <div className={styles.stack}>
        <p className={styles.stackLabel}>Built with the tools that run the modern web</p>
        <div className={styles.marquee}>
          <ul className={styles.track}>
            {[...marquee, ...marquee].map((t, i) => (
              <li key={i} aria-hidden={i >= marquee.length || undefined}>
                <TechMark tech={t} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
