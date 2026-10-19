import styles from "./LegalPage.module.css";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <article className={styles.page}>
      <div className="container">
        <header className={styles.head}>
          <h1 className="h2">{title}</h1>
          <p className={styles.updated}>
            Last updated{" "}
            <time dateTime={updated}>{new Date(updated).toLocaleDateString("en-GB", { dateStyle: "long" })}</time>
          </p>
        </header>
        <div className={`card ${styles.prose}`}>{children}</div>
      </div>
    </article>
  );
}
