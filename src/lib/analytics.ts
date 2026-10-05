declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

// Page views and form_start are sent by GA4 itself (Enhanced measurement).

// ── Leads (mark generate_lead as a Key event in GA4) ──
export function trackContactFormSubmit(eventType?: string) {
  gtag("event", "generate_lead", { form_name: "contact", event_type: eventType || "general" });
}

export function trackWeddingFormSubmit() {
  gtag("event", "generate_lead", { form_name: "wedding_questionnaire" });
}

export function trackWorkshopFormSubmit() {
  gtag("event", "sign_up", { form_name: "workshop" });
}

// ── Automatic click and form tracking ──
// One delegated listener covers every phone, WhatsApp and availability link on the site,
// including buttons added later, so components need no tracking code of their own.

/** Where on the page the click happened: an explicit data-track-location, header, footer, or the page path. */
function clickLocation(el: Element) {
  const marked = el.closest("[data-track-location]");
  if (marked) return marked.getAttribute("data-track-location") || "unknown";
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  return window.location.pathname;
}

function onClick(e: MouseEvent) {
  const link = (e.target as Element | null)?.closest?.("a[href]");
  if (!link) return;
  const href = link.getAttribute("href") || "";
  const params = { link_location: clickLocation(link), page_path: window.location.pathname };

  if (href.startsWith("tel:")) {
    gtag("event", "phone_click", params);
  } else if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//.test(href)) {
    gtag("event", "whatsapp_click", params);
  } else if (href === "/contact" || href.endsWith("dj-assaf-aricha.com/contact")) {
    gtag("event", "cta_click", { ...params, cta_text: (link.textContent || "").trim().slice(0, 60) });
  }
}

let installed = false;

export function installAutoTracking() {
  if (installed || typeof document === "undefined") return;
  installed = true;
  document.addEventListener("click", onClick, { capture: true });
}
