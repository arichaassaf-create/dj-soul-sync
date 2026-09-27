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
import { MessageCircle, Phone, CheckCircle2 } from "lucide-react";
import { weddingFaq, faqSchema } from "@/data/faq";
import { reviewById, coupleVsCrowdQuote, REVIEW_SOURCE_URL } from "@/data/reviews";
import { chuppahEntranceSongs, glassBreakingSongs, slowDanceSongs } from "@/data/weddingSongs";
import { SITE_URL, ids, ENTITY, REVIEW_SOURCES, WHATSAPP_URL } from "@/lib/site";

const UPDATED = "2026-09-27";
const UPDATED_LABEL = "ספטמבר 2026";

const toc = [
  { id: "choosing", label: "איך בוחרים DJ לחתונה" },
  { id: "meeting", label: "איך נראית פגישת המוזיקה" },
  { id: "ceremony", label: "שירי החופה, שבירת הכוס והסלואו" },
  { id: "dancefloor", label: "איך בונים רחבה לקהל מגוון" },
  { id: "formats", label: "חתונה קטנה, שישי או אמצע שבוע" },
  { id: "faq", label: "שאלות נפוצות" },
];

const choosingChecklist = [
  {
    title: "פגישה אישית לפני שסוגרים",
    text: "הכימיה עם ה-DJ מורגשת כבר בשיחה הראשונה. שימו לב אם הוא שואל עליכם, על האורחים ועל מה שאתם אוהבים, או רק מציג חבילה.",
  },
  {
    title: "לשאול איך בנויה פגישת המוזיקה",
    text: "DJ שבונה פלייליסט איתכם יודע להסביר מה קורה בפגישה, כמה זמן היא לוקחת ומה אתם מקבלים ממנה.",
  },
  {
    title: "לקרוא ביקורות בפלטפורמה חיצונית",
    text: "ביקורות באתרים כמו מתחתנים למען מתחתנים נכתבות על ידי זוגות אחרי החתונה, ושם רואים דפוסים: רחבה מלאה, זמינות, יחס.",
  },
  {
    title: "לבדוק איך הוא מתמודד עם קהל מעורב",
    text: "שאלו מה הוא עושה כשיש באותה רחבה חברים בני 30 ודודות בנות 70. התשובה מלמדת יותר מכל רשימת שירים.",
  },
  {
    title: "לוודא שיש תיאום טכני מול המקום",
    text: "הגברה, מקום לעמדה ולציוד ולוחות זמנים מול המקום ושאר הספקים צריכים להיסגר לפני היום עצמו, לא בו.",
  },
];

const pick = (list: { title: string; artist: string }[], n: number) => list.slice(0, n);

export default function WeddingDJ() {
  const url = `${SITE_URL}/wedding-dj`;

  const serviceSchema = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: "DJ לחתונה",
    serviceType: "DJ לחתונות",
    description:
      "שירות DJ לחתונות הכולל פגישת היכרות, פגישת מוזיקה ובניית פלייליסט אישי, ניהול המוזיקה מהחופה ועד השיר האחרון, וציוד הגברה מקצועי.",
    provider: { "@id": ids.business },
    areaServed: ENTITY.areaServed.map((name) => ({ "@type": "Place", name })),
    url,
  };

  const articleSchema = {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: "DJ לחתונה במרכז ובשרון: המדריך של DJ אסף אריכא",
    author: { "@id": ids.person },
    publisher: { "@id": ids.business },
    dateModified: UPDATED,
    inLanguage: "he-IL",
    image: ENTITY.image,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    about: { "@id": `${url}#service` },
  };

  return (
    <Layout>
      <SEO
        title="DJ לחתונה במרכז ובשרון | המדריך של DJ אסף אריכא"
        description="איך בוחרים DJ לחתונה, איך נראית פגישת המוזיקה, איך בוחרים שיר כניסה לחופה ושבירת כוס, ואיך בונים רחבה לקהל מגוון. מהניסיון של DJ אסף אריכא."
        canonicalUrl="/wedding-dj"
        modifiedTime={UPDATED}
        breadcrumbs={[{ name: "DJ לחתונה", path: "/wedding-dj" }]}
        schema={[serviceSchema, articleSchema, faqSchema(weddingFaq)]}
      />

      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-custom max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">בית</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-primary">DJ לחתונה</li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
            <span className="text-gradient-gold">DJ לחתונה</span> במרכז ובשרון
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-4">
            DJ אסף אריכא הוא תקליטן המתמחה בחתונות, שבונה עם כל זוג את המוזיקה בפגישה אישית וקורא את הרחבה בזמן אמת,
            כך שגם החברים וגם המשפחה ירגישו חלק מהערב.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            בעמוד הזה ריכזתי את מה שזוגות שואלים אותי לפני שהם סוגרים DJ: איך בוחרים, איך עובדת פגישת המוזיקה,
            איך בוחרים את שירי החופה ומה עושים כשהקהל מגוון. ליד כל נושא תמצאו מה זוגות שהתחתנו איתי כתבו עליו.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">בדיקת זמינות לתאריך שלכם</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/reviews">{REVIEW_SOURCES.mit4mit.count} ביקורות של זוגות</Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground border-t border-border/40 pt-4">
            נכתב על ידי <Link to="/about" className="text-primary hover:underline">אסף אריכא</Link>, DJ לחתונות.
            עודכן: <time dateTime={UPDATED}>{UPDATED_LABEL}</time>
          </p>
        </div>
      </section>

      {/* Table of contents */}
      <nav aria-label="תוכן העמוד" className="pb-12">
        <div className="container-custom max-w-4xl">
          <div className="bg-card rounded-2xl border border-border/50 p-6">
            <p className="font-heading font-bold mb-3">בעמוד הזה</p>
            <ol className="grid sm:grid-cols-2 gap-2 text-sm">
              {toc.map((t, i) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="text-muted-foreground hover:text-primary">
                    {i + 1}. {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </nav>

      <article className="pb-16">
        <div className="container-custom max-w-4xl space-y-20">
          {/* Choosing */}
          <section id="choosing" aria-labelledby="choosing-h" className="scroll-mt-28">
            <h2 id="choosing-h" className="text-3xl md:text-4xl font-heading font-bold mb-4">
              איך בוחרים DJ לחתונה?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              ה-DJ קובע במידה רבה איך האורחים יזכרו את הערב. ההבדל הגדול הוא בין DJ שמפעיל פלייליסט לבין DJ שמנהל רחבה:
              הראשון מנגן את מה שהוכן מראש, השני מקשיב לקהל ומשנה כיוון כשצריך. אלה הדברים שכדאי לבדוק לפני שסוגרים:
            </p>
            <ul className="space-y-4">
              {choosingChecklist.map((c) => (
                <li key={c.title} className="flex gap-4 bg-card rounded-xl p-5 border border-border/40">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-bold mb-1">{c.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{c.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-6">
              להרחבה: <Link to="/blog/5-tips-choosing-wedding-dj" className="text-primary hover:underline">5 טיפים לבחירת די ג'יי לחתונה</Link>.
            </p>
          </section>

          {/* Music meeting */}
          <section id="meeting" aria-labelledby="meeting-h" className="scroll-mt-28">
            <h2 id="meeting-h" className="text-3xl md:text-4xl font-heading font-bold mb-4">
              איך נראית פגישת המוזיקה?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                פגישת המוזיקה היא המקום שבו החתונה שלכם מקבלת את הפסקול שלה. אני לא מגיע עם רשימה מוכנה: אני משמיע לכם שירים,
                אתם מגיבים, ומתוך מה שמדבר אליכם נבנה הפלייליסט. אם אתם עדיין לא יודעים מה אתם רוצים, זה בדיוק הזמן לגלות.
              </p>
              <p>
                עוברים על הרגעים הגדולים (כניסה לחופה, שבירת הכוס, סלואו), על הסגנונות שאתם רוצים ברחבה,
                ועל מה שאתם בשום אופן לא רוצים לשמוע. לפעמים לוקח זמן עד ששניכם מסכימים על שיר, ולא ממהרים.
              </p>
              <p>
                כדי להגיע מוכנים, אפשר למלא לפני הפגישה את{" "}
                <Link to="/wedding-form" className="text-primary hover:underline">שאלון המוזיקה לחתונה</Link>.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <ReviewCard review={reviewById("michal")} />
              <ReviewCard review={reviewById("lili-blash")} />
            </div>
          </section>

          {/* Ceremony songs */}
          <section id="ceremony" aria-labelledby="ceremony-h" className="scroll-mt-28">
            <h2 id="ceremony-h" className="text-3xl md:text-4xl font-heading font-bold mb-4">
              איך בוחרים שיר כניסה לחופה, שיר לשבירת הכוס וסלואו?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              אלה שלושת הרגעים שהכי הרבה אורחים זוכרים, ולכן הם השירים הכי אישיים בערב. שיר הכניסה לחופה צריך לרגש אתכם,
              לא רק להישמע יפה. שיר שבירת הכוס הוא המעבר מהטקס לחגיגה, ולכן הוא בדרך כלל אנרגטי יותר. הסלואו הוא הרגע הכי
              אינטימי שלכם מול כולם. אלה כמה מהשירים ברשימה שאני מציע לזוגות, ובשאלון המוזיקה יש רשימה מלאה עם אפשרות להאזנה:
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { title: "כניסה לחופה", list: pick(chuppahEntranceSongs, 6) },
                { title: "שבירת הכוס", list: pick(glassBreakingSongs, 6) },
                { title: "סלואו", list: pick(slowDanceSongs, 6) },
              ].map((col) => (
                <div key={col.title} className="bg-card rounded-2xl p-6 border border-border/40">
                  <h3 className="font-heading font-bold text-lg mb-4 text-primary">{col.title}</h3>
                  <ul className="space-y-2 text-sm">
                    {col.list.map((s) => (
                      <li key={`${s.title}-${s.artist}`}>
                        <span className="text-foreground">{s.title}</span>
                        <span className="text-muted-foreground"> · {s.artist}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              המדריך המלא: <Link to="/blog/chuppah-music-guide" className="text-primary hover:underline">מוזיקה לחופה, איך בוחרים שירים</Link>.
            </p>
          </section>

          {/* Dancefloor */}
          <section id="dancefloor" aria-labelledby="dancefloor-h" className="scroll-mt-28">
            <h2 id="dancefloor-h" className="text-3xl md:text-4xl font-heading font-bold mb-4">
              איך בונים רחבה לקהל מגוון?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                כמעט בכל חתונה יש באותה רחבה חברים, הורים, סבים ודודות. המטרה היא שכולם ירגישו חלק מהאירוע, בלי לוותר על
                מה שאתם אוהבים. אני מתחשב ברצונות שלכם, ובמקביל מקשיב לקהל לאורך כל הערב ומשנה כיוון כשצריך.
              </p>
              <p>
                הסגנונות שאני משלב: מזרחית, ישראלי, לועזי, שנות ה-80 וה-90, האוס, טראנס ורגאטון, וגם קלאסיקות משנות ה-40
                ועד הלהיטים של היום. המינון נקבע לפי הטעם שלכם ולפי מי שעומד ברחבה באותו רגע.
              </p>
            </div>
            <blockquote className="border-r-4 border-primary pr-5 py-2 mb-8">
              <p className="text-lg text-foreground">&ldquo;{coupleVsCrowdQuote.text}&rdquo;</p>
              <footer className="text-sm text-muted-foreground mt-2">
                <span dir="auto">{coupleVsCrowdQuote.name}</span>,{" "}
                <a href={REVIEW_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  מתחתנים למען מתחתנים
                </a>
              </footer>
            </blockquote>
            <div className="grid md:grid-cols-2 gap-5">
              <ReviewCard review={reviewById("keren")} />
              <ReviewCard review={reviewById("hgafla")} />
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              עוד על בניית הרחבה: <Link to="/blog/perfect-wedding-playlist" className="text-primary hover:underline">איך לבנות פלייליסט לריקודים בחתונה</Link>.
            </p>
          </section>

          {/* Formats */}
          <section id="formats" aria-labelledby="formats-h" className="scroll-mt-28">
            <h2 id="formats-h" className="text-3xl md:text-4xl font-heading font-bold mb-4">
              חתונה קטנה, חתונת שישי או חתונה באמצע שבוע
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              לא כל חתונה נראית אותו דבר. בחתונה קטנה כל אורח מורגש ברחבה, ולכן הקצב נבנה אחרת. בחתונת שישי בצהריים,
              במיוחד בקיץ, צריך להחזיק את האנרגיה לאורך שעות של חום ואור. ובחתונה באמצע שבוע אנשים מגיעים אחרי יום עבודה,
              והמוזיקה צריכה לשחרר אותם מהר. אלה חתונות כאלה, בלשון הזוגות:
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              <ReviewCard review={reviewById("hen")} />
              <ReviewCard review={reviewById("assaf-friday")} />
              <ReviewCard review={reviewById("mali")} />
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" aria-labelledby="faq-h" className="scroll-mt-28">
            <h2 id="faq-h" className="text-3xl md:text-4xl font-heading font-bold mb-8">
              שאלות נפוצות על DJ לחתונה
            </h2>
            <Accordion type="multiple" className="space-y-3">
              {weddingFaq.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`faq-${i}`}
                  className="bg-card border border-border/40 rounded-xl px-6 data-[state=open]:border-primary/30"
                >
                  <AccordionTrigger className="text-right font-medium hover:text-primary hover:no-underline py-5 text-base">
                    {f.q}
                  </AccordionTrigger>
                  {/* forceMount keeps answers in the prerendered HTML for crawlers; closed items are hidden visually. */}
                  <AccordionContent forceMount className="text-muted-foreground leading-relaxed pb-5 group-data-[state=closed]:hidden">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>
      </article>

      {/* CTA */}
      <section className="section-padding bg-dark-surface">
        <div className="container-custom max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">בואו נדבר על המוזיקה שלכם</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            שלחו לי את התאריך, המקום וכמה מילים על מה שאתם אוהבים, ואחזור אליכם עם זמינות ורעיונות ראשונים.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">שלחו לי את פרטי החתונה</Link>
            </Button>
            <Button variant="whatsapp" size="lg" asChild>
              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent("היי אסף, אשמח לבדוק זמינות לחתונה שלנו")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" /> WhatsApp
              </a>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <a href="tel:0505567078">
                <Phone className="h-4 w-4" /> {ENTITY.phoneLocal}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
