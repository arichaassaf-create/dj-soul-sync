const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface FormEmailPayload {
  formType: "contact" | "wedding" | "workshop";
  data: Record<string, string | undefined>;
}

const FORM_TYPE_LABELS: Record<string, string> = {
  contact: "פנייה מטופס צור קשר",
  wedding: "שאלון חתונה",
  workshop: "הרשמה לסדנה",
};

function buildEmailHtml(formType: string, data: Record<string, string | undefined>): string {
  const title = FORM_TYPE_LABELS[formType] || "פנייה חדשה";
  const rows = Object.entries(data)
    .filter(([, v]) => v && v.trim() !== "")
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:bold;border-bottom:1px solid #eee;color:#333;">${key}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555;">${value}</td></tr>`
    )
    .join("");

  return `
    <div style="direction:rtl;font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#d4a843;padding:20px;text-align:center;border-radius:8px 8px 0 0;">
        <h1 style="color:#fff;margin:0;font-size:22px;">🎵 ${title}</h1>
      </div>
      <div style="background:#fff;padding:20px;border:1px solid #eee;border-top:none;border-radius:0 0 8px 8px;">
        <table style="width:100%;border-collapse:collapse;">${rows}</table>
        <p style="margin-top:20px;color:#999;font-size:12px;text-align:center;">נשלח מאתר DJ אסף אריכא</p>
      </div>
    </div>
  `;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const { formType, data } = (await req.json()) as FormEmailPayload;
    const subject = `${FORM_TYPE_LABELS[formType] || "פנייה חדשה"} - ${data["שם"] || data["שם הכלה"] || "לא צוין"}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "DJ Assaf <onboarding@resend.dev>",
        to: ["arichaassaf@gmail.com"],
        subject,
        html: buildEmailHtml(formType, data),
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Resend error:", result);
      return new Response(JSON.stringify({ error: result }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, id: result.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Email send error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
