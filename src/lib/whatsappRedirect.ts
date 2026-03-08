declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fires a Facebook Lead event, saves click data to DB, then opens WhatsApp directly.
 * No interstitial page needed — everything happens inline.
 */
export function redirectToWhatsApp(whatsappMessage: string, source: string, pixelEvent: "Lead" | "CompleteRegistration" = "Lead") {
  // 1. Fire FB pixel event
  if (window.fbq) {
    window.fbq("track", pixelEvent, {
      content_name: source,
    });
  }

  // 2. Save click data (fire and forget)
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (supabaseUrl && supabaseKey) {
    const whatsappUrl = `https://wa.me/972505567078?text=${whatsappMessage}`;
    fetch(`${supabaseUrl}/rest/v1/whatsapp_clicks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({ source, url: whatsappUrl }),
    }).catch(() => {});
  }

  // 3. Open WhatsApp directly
  window.open(`https://wa.me/972505567078?text=${whatsappMessage}`, "_blank");
}
