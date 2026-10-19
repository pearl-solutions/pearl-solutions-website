"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

// Lets [data-reveal] blocks rise in as they enter the viewport. Blocks already on screen are
// shown at once, and nothing is hidden before this runs, so slow phones never see empty sections.
export function Reveal() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const fold = window.innerHeight * 1.05;
    const below = els.filter((el) => {
      if (el.getBoundingClientRect().top < fold) {
        el.classList.add("is-in");
        return false;
      }
      return true;
    });
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px 10% 0px", threshold: 0 },
    );
    below.forEach((el) => io.observe(el));
    root.classList.add("reveal");
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
