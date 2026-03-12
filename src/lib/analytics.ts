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

// ── Page view (SPA navigation) ──
export function trackPageView(path: string, title?: string) {
  gtag("event", "page_view", {
    page_path: path,
    page_title: title,
  });
}

// ── Form submissions ──
export function trackContactFormSubmit(eventType?: string) {
  gtag("event", "generate_lead", {
    event_category: "forms",
    event_label: "contact_form",
    event_type: eventType || "general",
  });
}

export function trackWeddingFormSubmit() {
  gtag("event", "generate_lead", {
    event_category: "forms",
    event_label: "wedding_questionnaire",
  });
}

export function trackWorkshopFormSubmit() {
  gtag("event", "sign_up", {
    event_category: "forms",
    event_label: "workshop_registration",
  });
}

// ── WhatsApp clicks ──
export function trackWhatsAppClick(source: string) {
  gtag("event", "contact", {
    event_category: "engagement",
    event_label: "whatsapp_click",
    contact_source: source,
  });
}

// ── Phone call clicks ──
export function trackPhoneClick(source: string) {
  gtag("event", "contact", {
    event_category: "engagement",
    event_label: "phone_click",
    contact_source: source,
  });
}

// ── CTA clicks ──
export function trackCTAClick(ctaName: string, location: string) {
  gtag("event", "select_content", {
    event_category: "cta",
    content_type: ctaName,
    event_label: location,
  });
}

// ── Scroll depth (for landing pages) ──
export function trackScrollDepth(percent: number, page: string) {
  gtag("event", "scroll", {
    event_category: "engagement",
    event_label: page,
    value: percent,
  });
}
