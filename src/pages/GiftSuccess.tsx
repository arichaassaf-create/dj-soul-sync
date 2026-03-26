import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, Gift } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

export default function GiftSuccess() {
  const [params] = useSearchParams();
  const type = params.get("type");
  const label = type === "couple" ? "סדנת DJ לזוג" : "סדנת DJ ליחיד";

  return (
    <Layout>
      <SEO title="התשלום בוצע בהצלחה! | אסף אריכא" description="שובר המתנה נרכש בהצלחה" />
      <section className="min-h-[70vh] flex items-center justify-center section-padding">
        <div className="container-custom">
          <div className="max-w-lg mx-auto text-center bg-card rounded-2xl border border-border/50 p-10">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="text-3xl font-heading font-bold mb-4">
              <span className="text-gradient-gold">התשלום בוצע בהצלחה!</span>
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Gift className="h-5 w-5 text-primary" />
              <span className="text-foreground/80 font-medium">{label}</span>
            </div>
            <p className="text-muted-foreground mb-8">
              שובר המתנה נרכש בהצלחה. אצור איתך קשר בהקדם עם פרטי השובר ותיאום מועד לסדנה.
            </p>
            <Button variant="hero" asChild>
              <Link to="/">חזרה לדף הבית</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
