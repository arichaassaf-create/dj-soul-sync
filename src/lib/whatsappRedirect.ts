/**
 * Instead of opening WhatsApp directly, navigate to an interstitial page
 * that fires a Facebook Lead event, saves click data, then redirects.
 */
export function redirectToWhatsApp(whatsappMessage: string, source: string) {
  const whatsappUrl = `https://wa.me/972505567078?text=${whatsappMessage}`;
  const redirectUrl = `/whatsapp-redirect?source=${encodeURIComponent(source)}&url=${encodeURIComponent(whatsappUrl)}`;
  window.open(redirectUrl, "_blank");
}
