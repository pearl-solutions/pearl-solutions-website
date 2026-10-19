import type { ServiceSlug } from "@/lib/site";
import styles from "./Fragments.module.css";

// Small, real-looking slices of the kind of interface each service produces, built in HTML.
// Sample content only: no client work is shown.

function Website() {
  return (
    <div className={`${styles.ui} ${styles.browser}`} data-ui>
      <div className={styles.chrome}>
        <span className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.address}>atelier-lumen.fr</span>
      </div>
      <div className={styles.page}>
        <div className={styles.siteNav}>
          <b>Lumen</b>
          <span>Work</span>
          <span>Studio</span>
          <span className={styles.siteCta}>Book a visit</span>
        </div>
        <p className={styles.siteHeadline}>Light, made to measure.</p>
        <div className={styles.siteRow}>
          <span className={styles.siteImg} />
          <span className={styles.siteImg2} />
        </div>
        <div className={styles.vitals}>
          <span>
            <b>100</b> Performance
          </span>
          <span>
            <b>100</b> SEO
          </span>
          <span>
            <b>0.6 s</b> LCP
          </span>
        </div>
      </div>
    </div>
  );
}

function Discord() {
  return (
    <div className={`${styles.ui} ${styles.discord}`} data-ui>
      <div className={styles.channel}># support</div>
      <div className={styles.msg}>
        <span className={styles.avatar} aria-hidden="true" />
        <div>
          <p className={styles.author}>
            Nova <span className={styles.tag}>BOT</span>
          </p>
          <div className={styles.embed}>
            <p className={styles.embedTitle}>Ticket #1042 opened</p>
            <p>Thanks Lea, a moderator will be with you shortly.</p>
            <dl className={styles.fields}>
              <div>
                <dt>Topic</dt>
                <dd>Billing</dd>
              </div>
              <div>
                <dt>Priority</dt>
                <dd>Normal</dd>
              </div>
            </dl>
          </div>
          <div className={styles.buttons}>
            <span className={styles.btnGreen}>Claim</span>
            <span className={styles.btnGrey}>Close ticket</span>
          </div>
        </div>
      </div>
      <div className={styles.slash}>
        <b>/ticket</b> topic: Billing
      </div>
    </div>
  );
}

function Checkout() {
  const rows = [
    ["Retro High OG", "42", "Checked out", "1.84 s", "ok"],
    ["Retro High OG", "43", "Checked out", "2.02 s", "ok"],
    ["Console bundle", "—", "Submitting order", "", "run"],
    ["Retro High OG", "44", "Waiting for restock", "", "wait"],
    ["Graphic card", "—", "Out of stock", "", "fail"],
  ];
  return (
    <div className={`${styles.ui} ${styles.tasks}`} data-ui>
      <div className={styles.tasksHead}>
        <b>Tasks</b>
        <span>5 running · 2 checked out</span>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Size</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([p, s, st, t, k], i) => (
            <tr key={i}>
              <td>{p}</td>
              <td>{s}</td>
              <td>
                <span className={styles.status} data-k={k}>
                  {st}
                </span>
              </td>
              <td>{t}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Ai() {
  return (
    <div className={`${styles.ui} ${styles.chat}`} data-ui>
      <p className={styles.q}>Can a customer return an opened item?</p>
      <div className={styles.a}>
        <p>
          Yes, within 30 days, as long as it is complete and undamaged. The customer pays return shipping unless the
          item was faulty.
        </p>
        <p className={styles.source}>Source: Returns policy, section 4.2</p>
      </div>
      <div className={styles.input}>Ask about your documents…</div>
    </div>
  );
}

function Custom() {
  const steps = [
    ["Inbox", "34 supplier invoices received"],
    ["Extract", "Totals, VAT and due dates read"],
    ["Check", "2 flagged for a human"],
    ["Export", "32 rows added to Accounts.xlsx"],
  ];
  return (
    <div className={`${styles.ui} ${styles.flow}`} data-ui>
      <p className={styles.flowHead}>
        <b>Invoice import</b> · runs every morning at 7:00
      </p>
      <ol>
        {steps.map(([name, detail]) => (
          <li key={name}>
            <b>{name}</b>
            <span>{detail}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const map: Record<ServiceSlug, () => React.JSX.Element> = {
  websites: Website,
  "discord-bots": Discord,
  "checkout-automation": Checkout,
  "ai-solutions": Ai,
  "custom-software": Custom,
};

export function Fragment({ slug }: { slug: ServiceSlug }) {
  const C = map[slug];
  return <C />;
}
