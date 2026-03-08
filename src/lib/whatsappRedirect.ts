declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const WHATSAPP_NUMBER = "972505567078";
const PIXEL_DISPATCH_DELAY_MS = 350;

/**
 * Fires Meta Pixel event, saves click data to DB, then opens WhatsApp.
 * Adds a short delay so tracking requests are not dropped on mobile app switch.
 */
export function redirectToWhatsApp(
  whatsappMessage: string,
  source: string,
  pixelEvent: "Lead" | "CompleteRegistration" = "Lead",
) {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  // 1. Fire Meta pixel event
  const hasPixel = typeof window.fbq === "function";
  if (hasPixel) {
    window.fbq("track", pixelEvent, {
      content_name: source,
    });
  }

  // 2. Save click data (fire and forget)
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (supabaseUrl && supabaseKey) {
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

  // 3. Open WhatsApp (slight delay improves Pixel delivery reliability)
  const openWhatsApp = () => window.open(whatsappUrl, "_blank");
  if (hasPixel) {
    window.setTimeout(openWhatsApp, PIXEL_DISPATCH_DELAY_MS);
    return;
  }

  openWhatsApp();
}
