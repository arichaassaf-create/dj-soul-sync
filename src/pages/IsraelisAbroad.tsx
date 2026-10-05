import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ReviewCard } from "@/components/ReviewCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle, MapPin, Plane, CheckCircle2 } from "lucide-react";
import { reviewById } from "@/data/reviews";
import { faqSchema, type FaqItem } from "@/data/faq";
import { SITE_URL, ids, WHATSAPP_URL } from "@/lib/site";

const UPDATED = "2026-10-06";
const WA = `${WHATSAPP_URL}?text=${encodeURIComponent("היי אסף, אנחנו גרים בחו\"ל ומתכננים חתונה, אשמח לבדוק זמינות")}`;

const faq: FaqItem[] = [
  {
    q: "אנחנו גרים בארה\"ב ומתחתנים בארץ. איך עושים פגישת מוזיקה מרחוק?",
    a: "פגישת ההיכרות ופגישת המוזיקה מתקיימות בזום, ובין לבין אנחנו בקשר בוואטסאפ. אני משמיע לכם אופציות, בונים יחד את הפלייליסט, ועד שאתם נוחתים בארץ המוזיקה כבר סגורה.",
  },
  {
    q: "אתה מגיע לחתונות בארה\"ב?",
    a: "כן. אני מתקלט גם בחתונות בארה\"ב. שלחו לי תאריך ומיקום, ואחזור אליכם עם זמינות והצעת מחיר שכוללת את הטיסה.",
  },
  {
    q: "חצי מהאורחים אמריקאים וחצי ישראלים. זה עובד?",
    a: "כן, וזה בדיוק העניין בקריאת קהל. משלבים את הלהיטים הישראליים והמזרחיים שהמשפחה מהארץ מחכה להם עם השירים שהחברים מחו\"ל מכירים, ומתאימים את המינון ברחבה בזמן אמת.",
  },
  {
    q: "הפגישה יכולה להיות באנגלית, בשביל בן או בת הזוג?",
    a: "כן. אני מדבר אנגלית שוטפת, ואפשר לעבור בין עברית לאנגלית במהלך הפגישה לפי מה שנוח לכם.",
  },
  {
    q: "כמה זמן מראש כדאי לסגור?",
    a: "מומלץ 6 עד 12 חודשים מראש, בעיקר בעונת החתונות בארץ (אפריל עד אוקטובר) ובחתונות בארה\"ב שדורשות תכנון טיסה.",
  },
];

export default function IsraelisAbroad() {
  const url = `${SITE_URL}/israelis-abroad`;
  const service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: "DJ לחתונה לישראלים שגרים בחו\"ל",
    serviceType: "DJ לחתונות",
    provider: { "@id": ids.business },
    areaServed: [
      { "@type": "Country", name: "Israel" },
      { "@type": "Country", name: "United States" },
    ],
    availableLanguage: ["Hebrew", "English"],
    url,
  };

  return (
    <Layout>
      <SEO
        title={`די ג'יי מישראל לחתונה של ישראלים בחו"ל | DJ אסף אריכא`}
        description={`גרים בארה"ב ומתחתנים בארץ, או מתחתנים בארה"ב ורוצים DJ מישראל? DJ אסף אריכא מתכנן איתכם את המוזיקה בזום, בעברית או באנגלית, ובונה רחבה למשפחה מהארץ ולחברים מחו"ל.`}
        canonicalUrl="/israelis-abroad"
        modifiedTime={UPDATED}
        breadcrumbs={[{ name: "ישראלים בחו\"ל", path: "/israelis-abroad" }]}
        schema={[service, faqSchema(faq)]}
      />

      <section className="pt-32 pb-12 md:pt-40">
        <div className="container-custom max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">בית</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-primary">ישראלים בחו"ל</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
            <span className="text-gradient-gold">די ג'יי מישראל</span> לישראלים שגרים בחו"ל
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            גרים בניו יורק, במיאמי או בלוס אנג'לס, ומתכננים חתונה? בין אם החתונה בארץ ובין אם בארה"ב, DJ אסף אריכא מתכנן
            איתכם את המוזיקה מרחוק, בזום ובוואטסאפ, ובונה רחבה שבה המשפחה מהארץ והחברים מחו"ל רוקדים יחד.
          </p>
          <Button variant="whatsapp" size="lg" asChild>
            <a href={WA} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" /> בדיקת זמינות בוואטסאפ
            </a>
          </Button>
        </div>
      </section>

      <section className="pb-16" aria-labelledby="two">
        <div className="container-custom max-w-4xl">
          <h2 id="two" className="text-3xl md:text-4xl font-heading font-bold mb-8">איפה החתונה שלכם?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl p-7 border border-border/40">
              <MapPin className="h-7 w-7 text-primary mb-4" aria-hidden="true" />
              <h3 className="text-2xl font-heading font-bold mb-3">מתחתנים בארץ</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                {[
                  "שיחת היכרות ופגישת מוזיקה מלאה בזום",
                  "קשר בוואטסאפ עד החתונה, גם עם הפרשי השעות",
                  "תיאום מול האולם בארץ, כך שאתם רק נוחתים",
                  "רחבה לחברים מחו\"ל ולמשפחה מהארץ",
                ].map((t) => (
                  <li key={t} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" aria-hidden="true" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-2xl p-7 border border-border/40">
              <Plane className="h-7 w-7 text-primary mb-4" aria-hidden="true" />
              <h3 className="text-2xl font-heading font-bold mb-3">מתחתנים בארה"ב</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                {[
                  "DJ מישראל שמגיע לחתונה שלכם בארה\"ב",
                  "המוזיקה הישראלית והמזרחית כמו בחתונה בארץ",
                  "תיאום טכני מראש מול האולם או ספק ההגברה",
                  "הצעת מחיר אישית שכוללת טיסה",
                ].map((t) => (
                  <li key={t} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" aria-hidden="true" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16" aria-labelledby="mix">
        <div className="container-custom max-w-4xl">
          <h2 id="mix" className="text-3xl md:text-4xl font-heading font-bold mb-4">רחבה לשני העולמות</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            בחתונה של ישראלים שגרים בחו"ל יש כמעט תמיד שני קהלים: משפחה וחברים מהארץ שמחכים לסט המזרחי והישראלי, וחברים
            מהעבודה ומהשכונה שגדלו על מוזיקה אחרת. התפקיד שלי הוא לקרוא את שניהם ולחבר ביניהם, כך שאף צד לא יושב בצד.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <ReviewCard review={reviewById("hgafla")} />
            <ReviewCard review={reviewById("lital")} />
          </div>
        </div>
      </section>

      <section className="pb-16" aria-labelledby="faq-abroad">
        <div className="container-custom max-w-3xl">
          <h2 id="faq-abroad" className="text-3xl md:text-4xl font-heading font-bold mb-8">שאלות נפוצות</h2>
          <Accordion type="multiple" className="space-y-3">
            {faq.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`} className="bg-card border border-border/40 rounded-xl px-6 data-[state=open]:border-primary/30">
                <AccordionTrigger className="text-right font-medium hover:text-primary hover:no-underline py-5 text-base">{f.q}</AccordionTrigger>
                <AccordionContent forceMount className="text-muted-foreground leading-relaxed pb-5 group-data-[state=closed]:hidden">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="text-sm text-muted-foreground mt-8">
            יש לכם חברים או בן או בת זוג שלא מדברים עברית?{" "}
            <Link to="/en" lang="en" className="text-primary hover:underline">האתר באנגלית</Link>,{" "}
            <Link to="/en/destination-wedding-dj-israel" lang="en" className="text-primary hover:underline">חתונה בישראל</Link> ו
            <Link to="/en/israeli-wedding-dj-usa" lang="en" className="text-primary hover:underline">חתונה בארה"ב</Link>.
          </p>
        </div>
      </section>

      <section className="section-padding bg-dark-surface">
        <div className="container-custom max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">בואו נבדוק את התאריך שלכם</h2>
          <p className="text-muted-foreground mb-8">שלחו לי תאריך, מקום, וכמה מילים על המוזיקה שאתם אוהבים.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="whatsapp" size="lg" asChild>
              <a href={WA} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-5 w-5" /> WhatsApp</a>
            </Button>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">בדיקת זמינות לתאריך שלכם</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
