import { supabase } from "@/integrations/supabase/client";

export async function sendFormEmail(
  formType: "contact" | "wedding" | "workshop",
  data: Record<string, string | undefined>
): Promise<void> {
  try {
    const { error } = await supabase.functions.invoke("send-form-email", {
      body: { formType, data },
    });
    if (error) {
      console.error("Failed to send email notification:", error);
    }
  } catch (err) {
    // Silent fail — email is secondary to WhatsApp redirect
    if (import.meta.env.DEV) {
      console.error("Email notification error:", err);
    }
  }
}
