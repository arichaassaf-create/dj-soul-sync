import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function WhatsAppRedirect() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const url = searchParams.get("url");
    const source = searchParams.get("source") || "unknown";

    // 1. Fire Facebook Lead event
    if (window.fbq) {
      window.fbq("track", "Lead", {
        content_name: source,
      });
    }

    // 2. Save click data to DB (fire and forget)
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
        body: JSON.stringify({ source, url: url || "" }),
      }).catch(() => {});
    }

    // 3. Redirect to WhatsApp after short delay
    const timer = setTimeout(() => {
      if (url) {
        window.location.href = url;
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-muted-foreground text-lg">מעביר ל-WhatsApp...</p>
      </div>
    </div>
  );
}
