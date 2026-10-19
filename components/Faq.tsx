import styles from "./Faq.module.css";

type Item = { q: string; a: string };

export function Faq({
  items,
  title = (
    <>
      Questions, <em>answered</em>
    </>
  ),
  intro = "Everything people usually ask before starting a project.",
  id = "faq",
}: {
  items: readonly Item[];
  title?: React.ReactNode;
  intro?: string;
  id?: string;
}) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="section-head">
          <h2 id={`${id}-title`} className="h2" data-reveal>
            {title}
          </h2>
          <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            {intro}
          </p>
        </div>
        <div className={styles.list}>
          {items.map((item, i) => (
            <details
              key={item.q}
              name={id}
              className={styles.item}
              data-reveal
              style={{ "--i": Math.min(i, 4) } as React.CSSProperties}
            >
              <summary className={styles.question}>
                <span>{item.q}</span>
                <span className={styles.plus} aria-hidden="true">
                  <i />
                  <i />
                </span>
              </summary>
              <p className={styles.answer}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
