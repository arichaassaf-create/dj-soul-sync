import { useEffect, useLayoutEffect } from "react";

// useLayoutEffect warns during SSR prerender; it must run before first paint on the client
// so auto-tagged elements never flash visible and then hide.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Blocks that get a reveal on pages that were not hand-tagged with data-reveal.
const AUTO_SELECTOR =
  "main h1, main h2, main h3, main p, main article, main figure, main form, main blockquote, main details, main .grid > *, main li";

// Never auto-tag inside these: carousels and hover panels already own their motion,
// dialogs/portals appear on demand.
const SKIP_SELECTOR =
  "[data-reveal], [data-no-reveal], [aria-roledescription='carousel'], .marquee-container, .accordion-panel, [role='dialog'], .hero-ambience";

function autoTag() {
  const perParent = new Map<Element, number>();
  document.querySelectorAll<HTMLElement>(AUTO_SELECTOR).forEach((el) => {
    // Document order visits ancestors first, so a tagged ancestor means skip the descendant.
    if (el.closest(SKIP_SELECTOR)) return;
    const parent = el.parentElement;
    if (!parent) return;
    const idx = perParent.get(parent) ?? 0;
    perParent.set(parent, idx + 1);
    el.setAttribute("data-reveal", "");
    el.setAttribute("data-delay", String(Math.min(idx, 5)));
  });
}

export function useScrollReveal() {
  useIsoLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    autoTag();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
