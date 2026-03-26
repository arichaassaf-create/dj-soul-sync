import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PRICES = {
  individual: "price_1TF8aqPfpDdW014N12zTX8dG",
  couple: "price_1TF8bAPfpDdW014NYxmy6TgC",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, recipientName, senderName, email } = await req.json();

    if (!type || !PRICES[type as keyof typeof PRICES]) {
      throw new Error("Invalid voucher type");
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const priceId = PRICES[type as keyof typeof PRICES];

    const session = await stripe.checkout.sessions.create({
      customer_email: email || undefined,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/gift-success?type=${type}`,
      cancel_url: `${req.headers.get("origin")}/workshop#gift-vouchers`,
      metadata: {
        voucher_type: type,
        recipient_name: recipientName || "",
        sender_name: senderName || "",
      },
      payment_method_types: ["card"],
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
