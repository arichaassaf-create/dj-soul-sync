declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fires a Facebook Lead event on the current page (where pixel is already loaded),
 * then opens the interstitial redirect page that saves click data and redirects to WhatsApp.
 */
export function redirectToWhatsApp(whatsappMessage: string, source: string) {
  // Fire FB Lead event on the CURRENT page where pixel is already loaded
  if (window.fbq) {
    window.fbq("track", "Lead", {
      content_name: source,
    });
  }

  const whatsappUrl = `https://wa.me/972505567078?text=${whatsappMessage}`;
  const redirectUrl = `/whatsapp-redirect?source=${encodeURIComponent(source)}&url=${encodeURIComponent(whatsappUrl)}`;
  window.open(redirectUrl, "_blank");
}
