import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { WorkshopForm } from "@/components/WorkshopForm";
import { Button } from "@/components/ui/button";
import {
  CheckCircle, Clock, Users, Zap, ArrowDown
} from "lucide-react";
import workshopLandingHero from "@/assets/workshop-landing-hero.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const results = [
  "להבין קצב, BPM ופרייזינג בצורה פשוטה וברורה",
  "לעשות Beatmatching נכון, גם כשזה \"בורח\" באמצע",
  "לבנות מעברים נקיים עם EQ, פילטרים ואפקטים בלי לבלגן",
  "לדעת לבחור שירים ולבנות סט עם עליות, אנרגיה ונוכחות",
  "לצאת עם תוכנית תרגול שמקפיצה רמה מהר",
];

const audience = [
  "מתחילים מאפס שרוצים להתחיל נכון",
  "מי שכבר ניסה לבד ורוצה סדר ושיטה",
  "זוגות שרוצים חוויה משותפת, תחביב, או להכין סט למסיבה",
  "מי שחולם לתקלט באירועים קטנים ולהרגיש בטוח",
];

const howItWorks = [
  "סדנה פרטית ואישית, רק אתה/אתם ואני",
  "3.5 שעות ממוקדות, תרגול מלא",
  "התאמה לרמה ולסגנון המוזיקה שלך",
  "בסוף יוצאים עם כלים אמיתיים, לא \"השראה\"",
];

const faqItems = [
  { q: "כמה זמן הסדנה?", a: "3.5 שעות, סשן אחד ממוקד עם תרגול מעשי." },
  { q: "זה מתאים גם למתחילים מאפס?", a: "כן. הסדנה בנויה כך שגם מי שלא נגע בציוד יצא עם בסיס אמיתי ויכולת לתרגל לבד." },
  { q: "צריך להביא ציוד?", a: "לא חובה. אפשר להגיע בלי ציוד. אם יש לך ציוד או לפטופ, אפשר להביא ונעבוד עליו." },
  { q: "מה ההבדל בין סדנה ליחיד לבין זוג?", a: "התוכן אותו בסיס, אבל בזוג עובדים על תרגול משותף, חלוקת תפקידים, וסנכרון – וזה גם יוצא משתלם יותר." },
  { q: "איך קובעים?", a: "משאירים פרטים בטופס, ואני חוזר לתיאום מועד ולשיחה קצרה על הרמה והיעדים שלך." },
];

export default function WorkshopLanding() {
  return (
    <Layout>
      <SEO
        title="ללמוד לתקלט ב-3.5 שעות | סדנת DJ פרטית | אסף אריכא"
        description="רוצה להפסיק לשחק ולהתחיל לתקלט באמת? סדנת DJ פרטית ב-3.5 שעות – שיטה ברורה, תרגול מעשי, ומיקסים נקיים כבר מהסדנה הראשונה."
        canonicalUrl="https://dj-assaf-aricha.co.il/learn-to-dj"
        keywords="ללמוד לתקלט, סדנת DJ, קורס DJ, beatmatching, סדנה פרטית, DJ למתחילים"
      />

      {/* Hero - Aggressive */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={workshopLandingHero}
            alt="ללמוד לתקלט – ציוד DJ מקצועי"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
        <div className="relative container-custom pt-32 pb-16 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block bg-primary/20 border border-primary/40 rounded-full px-4 py-1.5 text-sm font-semibold text-primary mb-6">
              סדנת DJ פרטית ליחידים או לזוגות
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
              <span className="text-gradient-gold">ללמוד לתקלט</span>
              <br />
              <span className="text-foreground">ב-3.5 שעות</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed mb-4 max-w-2xl mx-auto">
              רוצה להפסיק "לשחק" ולהתחיל לתקלט באמת?
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              בסדנה אחת ממוקדת תקבל שיטה ברורה, תתרגל בפועל, ותצא עם ביטחון לעשות מיקסים נקיים, מעברים יפים וסט שנשמע מקצועי.
            </p>
            <p className="text-primary font-semibold mb-8">
              בלי חפירות, בלי תאוריה מיותרת. הרבה ידיים על הציוד.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="xl" asChild>
                <a href="#landing-form">אני רוצה ללמוד לתקלט</a>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <a href="#landing-results">
                  מה יוצא לי מזה?
                  <ArrowDown className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section id="landing-results" className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-10 text-center">
            מה יוצא לך מזה{" "}
            <span className="text-gradient-gold">כבר בסדנה הראשונה?</span>
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {results.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border/50 card-hover"
              >
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <span className="text-foreground/90 text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-10 text-center">
            <span className="text-gradient-gold">למי זה מתאים?</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {audience.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-5 bg-card rounded-xl border border-border/50"
              >
                <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                <span className="text-foreground/90">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-10 text-center">
            <span className="text-gradient-gold">איך זה עובד?</span>
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

      {/* Pricing - Bold */}
      <section className="section-padding bg-card/50">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-10">
            <span className="text-gradient-gold">מחירים</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto mb-8">
            <div className="bg-card rounded-2xl border border-border/50 p-8">
              <p className="text-muted-foreground mb-1">יחיד</p>
              <p className="text-4xl font-heading font-bold text-gradient-gold">₪1,199</p>
            </div>
            <div className="bg-card rounded-2xl border-2 border-primary/50 p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                משתלם!
              </div>
              <p className="text-muted-foreground mb-1">זוג</p>
              <p className="text-4xl font-heading font-bold text-gradient-gold">₪1,750</p>
            </div>
          </div>
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            <Clock className="h-4 w-4" /> משך הסדנה: 3.5 שעות
          </p>
        </div>
      </section>

      {/* No equipment */}
      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center bg-card rounded-2xl border border-border/50 p-8">
            <h3 className="text-2xl font-heading font-bold mb-3">
              אין לך ציוד? <span className="text-gradient-gold">לא בעיה.</span>
            </h3>
            <p className="text-muted-foreground text-lg">
              אפשר להגיע בלי ציוד בכלל. אם יש לך ציוד, נלמד עליו. אם אין, אכוון אותך מה נכון עבורך ומה לא חייב לקנות.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="landing-form" className="section-padding">
        <div className="container-custom">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-center">
              <span className="text-gradient-gold">רוצה לתפוס מקום?</span>
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              השאר פרטים ואחזור אליך לתיאום, להבין את הרמה שלך ומה אתה רוצה להשיג.
            </p>
            <div className="bg-card rounded-2xl p-8 border border-primary/30 glow-gold-sm">
              <WorkshopForm variant="aggressive" />
            </div>
          </div>
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

      {/* Final CTA */}
      <section className="py-16">
        <div className="container-custom text-center">
          <Button variant="cta" size="xl" asChild>
            <a href="#landing-form">בדיקת זמינות</a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
