import { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { WorkshopForm } from "@/components/WorkshopForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Music, Users, Clock, Zap, Headphones, ListChecks,
  CheckCircle, HelpCircle, ChevronDown, Gift, Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import workshopHero from "@/assets/workshop-hero.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const benefits = [
  { icon: Headphones, text: "היכרות עם ציוד ותוכנות DJ" },
  { icon: Music, text: "הבנת BPM, קצב, ביט, פרייזינג ומבנה שיר" },
  { icon: Zap, text: "Beatmatching פרקטי עם תיקונים בזמן אמת" },
  { icon: ListChecks, text: "שימוש נכון ב-EQ, פילטרים ואפקטים" },
  { icon: CheckCircle, text: "בניית מעברים נקיים וטבעיים" },
  { icon: Users, text: "בחירת שירים והתאמות אנרגיה לסט" },
];

const audience = [
  "מתחילים לגמרי שרוצים להתחיל נכון ולא \"לנחש\" ביוטיוב",
  "מי שכבר ניסה קצת ורוצה סדר, טכניקה ושיטה",
  "זוגות שרוצים תחביב משותף או ללמוד יחד לקראת אירוע/מסיבה",
  "מי שרוצה להבין מוזיקה, קצב ובניית סט בצורה מקצועית",
];

const howItWorks = [
  "סדנה פרטית ואישית – רק אתה/אתם ואני",
  "3.5 שעות של עבודה מעשית, עם תרגול על המקום",
  "התאמה מלאה לרמה שלך ולסגנונות שאתה אוהב",
  "בסיום הסדנה יוצאים עם \"תוכנית פעולה\" לתרגול ושיפור",
];

const faqItems = [
  { q: "כמה זמן הסדנה?", a: "3.5 שעות, סשן אחד ממוקד עם תרגול מעשי." },
  { q: "זה מתאים גם למתחילים מאפס?", a: "כן. הסדנה בנויה כך שגם מי שלא נגע בציוד יצא עם בסיס אמיתי ויכולת לתרגל לבד." },
  { q: "ואם כבר ניסיתי לבד ביוטיוב?", a: "מעולה. רוב האנשים מגיעים אחרי ניסוי עצמי. בסדנה עושים סדר, מתקנים טעויות נפוצות, ובונים שיטה שעובדת." },
  { q: "צריך להביא ציוד?", a: "לא חובה. אפשר להגיע בלי ציוד. אם יש לך ציוד או לפטופ, אפשר להביא ונעבוד עליו." },
  { q: "איפה הסדנה מתקיימת?", a: "במיקום שייקבע בתיאום מראש לאחר השארת פרטים." },
  { q: "מה ההבדל בין סדנה ליחיד לבין זוג?", a: "התוכן אותו בסיס, אבל בזוג עובדים על תרגול משותף, חלוקת תפקידים, וסנכרון – וזה גם יוצא משתלם יותר." },
  { q: "האם יוצאים עם משהו ברור לתרגול אחרי הסדנה?", a: "כן. בסיום תקבל תוכנית פעולה מסודרת לתרגול, כדי לא \"לאבד את זה\" אחרי." },
  { q: "כמה עולה?", a: "יחיד: 1,199 ₪ | זוג: 1,750 ₪" },
  { q: "איך קובעים?", a: "משאירים פרטים בטופס, ואני חוזר לתיאום מועד ולשיחה קצרה על הרמה והיעדים שלך." },
];

export default function Workshop() {
  const [giftLoading, setGiftLoading] = useState<string | null>(null);
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [email, setEmail] = useState("");

  const handleGiftPurchase = async (type: "individual" | "couple") => {
    setGiftLoading(type);
    try {
      const { data, error } = await supabase.functions.invoke("create-gift-payment", {
        body: { type, recipientName, senderName, email },
      });
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (err) {
      toast.error("שגיאה ביצירת התשלום. נסה שוב.");
    } finally {
      setGiftLoading(null);
    }
  };

  return (
    <Layout>
      <SEO
        title="סדנת DJ פרטית ליחידים ולזוגות | אסף אריכא"
        description="סדנת די ג'יי פרטית ב-3.5 שעות – למד לתקלט בצורה מקצועית עם אסף אריכא. Beatmatching, EQ, בניית סט ועוד. ליחידים ולזוגות."
        canonicalUrl="https://dj-assaf-aricha.co.il/workshop"
        keywords="סדנת DJ, קורס תקליטנות, ללמוד לתקלט, סדנת DJ פרטית, סדנת DJ לזוגות, beatmatching, למידת DJ"
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={workshopHero}
            alt="סדנת DJ פרטית – ציוד DJ עם תאורה מקצועית"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>
        <div className="relative container-custom pt-32 pb-16">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">בית</Link></li>
              <li>/</li>
              <li className="text-primary">סדנת DJ</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              <span className="text-gradient-gold">סדנת DJ פרטית</span>
              <br />
              <span className="text-foreground text-3xl md:text-4xl">ליחידים ולזוגות</span>
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed mb-8 max-w-2xl">
              רוצה ללמוד לתקלט באמת, בצורה מסודרת, כיפית ומעשית?
              הסדנה הפרטית שלי בנויה בדיוק בשביל זה: <strong>3.5 שעות ממוקדות</strong> שבהן נלמד, נתרגל, ונבנה לך בסיס אמיתי לתקלט בביטחון.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <a href="#workshop-form">לתיאום סדנה</a>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <a href="#pricing">מחירים</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-10 text-center">
            <span className="text-gradient-gold">למי הסדנה מתאימה?</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {audience.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-5 bg-card rounded-xl border border-border/50 card-hover"
              >
                <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                <span className="text-foreground/90">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you learn */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-center">
            <span className="text-gradient-gold">מה לומדים בסדנה?</span>
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
            יסודות שחייבים לשלוט בהם כדי לתקלט טוב:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {benefits.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border/50 card-hover"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground/90 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-8 text-sm">
            + טיפים לקיצורי דרך מקצועיים שמקפיצים רמה מהר
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-10 text-center">
            <span className="text-gradient-gold">איך זה עובד בפועל?</span>
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {howItWorks.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-5 bg-card rounded-xl border border-border/50"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0 font-heading font-bold text-primary">
                  {i + 1}
                </div>
                <span className="text-foreground/90">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section-padding bg-card/50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-10 text-center">
            <span className="text-gradient-gold">מחירים</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl border border-border/50 p-8 text-center card-hover">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">סדנה ליחיד</h3>
              <p className="text-3xl font-heading font-bold text-gradient-gold mb-2">₪1,199</p>
              <p className="text-muted-foreground flex items-center justify-center gap-1">
                <Clock className="h-4 w-4" /> 3.5 שעות
              </p>
            </div>
            <div className="bg-card rounded-2xl border-2 border-primary/50 p-8 text-center card-hover relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                משתלם יותר
              </div>
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">סדנה לזוג</h3>
              <p className="text-3xl font-heading font-bold text-gradient-gold mb-2">₪1,750</p>
              <p className="text-muted-foreground flex items-center justify-center gap-1">
                <Clock className="h-4 w-4" /> 3.5 שעות
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mt-8 p-6 bg-card rounded-xl border border-border/50 text-center">
            <h3 className="font-heading font-bold mb-2">מה צריך להביא?</h3>
            <p className="text-muted-foreground">
              אם יש לך ציוד או לפטופ – מעולה. אם לא, גם בסדר. נוכל לעבוד עם מה שיש ולהכווין אותך מה הכי נכון עבורך.
              אפשר להגיע גם בלי ידע מוקדם בכלל.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="workshop-form" className="section-padding">
        <div className="container-custom">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-center">
              <span className="text-gradient-gold">רוצה לקבוע סדנה?</span>
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              השאר/י פרטים ואחזור אליך לתיאום מועד, להבין את הרמה שלך, ומה הכי מעניין אותך ללמוד.
            </p>
            <div className="bg-card rounded-2xl p-8 border border-border/50">
              <WorkshopForm />
            </div>
          </div>
        </div>
      </section>

      {/* Gift Vouchers */}
      <section id="gift-vouchers" className="section-padding bg-card/50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-center">
            <span className="text-gradient-gold">🎁 שוברי מתנה</span>
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
            מתנה מושלמת לחובבי מוזיקה! רכשו שובר מתנה לסדנת DJ פרטית וההנאה מובטחת.
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-4">
              <h3 className="font-heading font-bold text-center mb-2">פרטי השובר (אופציונלי)</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">שם מקבל/ת המתנה</Label>
                  <Input id="recipient" value={recipientName} onChange={e => setRecipientName(e.target.value)} placeholder="למי השובר מיועד?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sender">שם שולח/ת המתנה</Label>
                  <Input id="sender" value={senderName} onChange={e => setSenderName(e.target.value)} placeholder="מאת..." />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gift-email">אימייל לקבלת השובר</Label>
                <Input id="gift-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl border border-border/50 p-8 text-center card-hover">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">שובר ליחיד</h3>
              <p className="text-3xl font-heading font-bold text-gradient-gold mb-2">₪1,199</p>
              <p className="text-muted-foreground flex items-center justify-center gap-1 mb-4">
                <Clock className="h-4 w-4" /> סדנה פרטית 3.5 שעות
              </p>
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                disabled={giftLoading !== null}
                onClick={() => handleGiftPurchase("individual")}
              >
                {giftLoading === "individual" ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                רכישת שובר
              </Button>
            </div>

            <div className="bg-card rounded-2xl border-2 border-primary/50 p-8 text-center card-hover relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                משתלם יותר
              </div>
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">שובר לזוג</h3>
              <p className="text-3xl font-heading font-bold text-gradient-gold mb-2">₪1,750</p>
              <p className="text-muted-foreground flex items-center justify-center gap-1 mb-4">
                <Clock className="h-4 w-4" /> סדנה פרטית 3.5 שעות
              </p>
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                disabled={giftLoading !== null}
                onClick={() => handleGiftPurchase("couple")}
              >
                {giftLoading === "couple" ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                רכישת שובר
              </Button>
            </div>
          </div>

          <p className="text-center text-muted-foreground mt-6 text-sm">
            התשלום מאובטח דרך Stripe. תמיכה ב-Google Pay ו-Apple Pay.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-10 text-center">
            <span className="text-gradient-gold">שאלות נפוצות</span>
          </h2>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card rounded-xl border border-border/50 px-6"
                >
                  <AccordionTrigger className="text-right font-heading font-semibold hover:text-primary">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </Layout>
  );
}
