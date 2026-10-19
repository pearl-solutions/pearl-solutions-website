import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { Logo } from "./Logo";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <div className={`card ${styles.panel}`}>
          <div className={`glow ${styles.glowA}`} aria-hidden="true" />
          <div className={`glow ${styles.glowB}`} aria-hidden="true" />

          <div className={styles.intro}>
            <Logo size={64} className={styles.mark} />
            <h2 id="contact-title" className="h2" data-reveal>
              Let’s build <em>your pearl</em>
            </h2>
            <p className={styles.lead} data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              Tell me what you need. You get a written answer with next steps, and a quote once the scope is clear.
            </p>
            <ul className={styles.points} data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              <li>Free first call, no commitment</li>
              <li>Priced on quote, paid by milestone</li>
              <li>Hosting and maintenance available</li>
            </ul>
            <p className={styles.mail}>
              Or write to <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
