import { stackGroups } from "./data";
import { TechMark } from "./TechMark";
import styles from "./Stack.module.css";

export function Stack() {
  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <div className="container">
        <div className="section-head">
          <h2 id="stack-title" className="h2" data-reveal>
            The stack behind <em>every build</em>
          </h2>
          <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            From the first commit to the server it runs on: code, data, deployment and hosting, handled end to end.
          </p>
        </div>

        <ul className={styles.groups}>
          {stackGroups.map((g, i) => (
            <li key={g.title} className={`card ${styles.group}`} data-reveal style={{ "--i": i % 3 } as React.CSSProperties}>
              <h3 className="h3">{g.title}</h3>
              <p className={styles.text}>{g.text}</p>
              <ul className={styles.items}>
                {g.items.map((t) => (
                  <li key={t.name}>
                    <TechMark tech={t} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
