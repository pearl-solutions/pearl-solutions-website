import { icons } from "./icons";
import type { Tech } from "./data";
import styles from "./Stack.module.css";

// A monochrome logo with its name; brands without an open logo get their name alone.
export function TechMark({ tech }: { tech: Tech }) {
  return (
    <span className={styles.mark}>
      {tech.icon && (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d={icons[tech.icon]} fill="currentColor" />
        </svg>
      )}
      <span>{tech.name}</span>
    </span>
  );
}
