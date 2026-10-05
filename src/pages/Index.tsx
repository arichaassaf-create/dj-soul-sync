import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone, MessageCircle, Star, Music, Heart, ChevronLeft } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ReviewCard } from "@/components/ReviewCard";
import { reviewById } from "@/data/reviews";
import { homeFaq, faqSchema } from "@/data/faq";
import { REVIEW_SOURCES } from "@/lib/site";
import heroImage from "@/assets/dj-assaf-aricha-hero.webp";
import weddingImage from "@/assets/wedding-dance.jpg";
import privatePartyImage from "@/assets/private-party.jpg";
import corporateImage from "@/assets/corporate-event.jpg";

function EQBars({ count = 6 }: { count?: number }) {
  return (
    <div className="eq-bars" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="eq-bar"
          style={{ "--eq-delay": `${i * 0.14}s` } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

const services = [
  {
    image: weddingImage,
    title: "חתונות",
    description: "מקבלת הפנים ועד לריקוד האחרון, חוויה מוזיקלית בלתי נשכחת",
    link: "/services#weddings",
  },
  {
    image: privatePartyImage,
    title: "מסיבות פרטיות",
    description: "יום הולדת, חגיגה משפחתית, כל רגע מיוחד",
    link: "/services#private",
  },
  {
    image: corporateImage,
    title: "אירועי חברה",
    description: "השקות, כנסים, אירועי סוף שנה עם אווירה מקצועית",
    link: "/services#corporate",
  },
];

const faqs = homeFaq;

const homeReviews = ["lital", "assaf-friday", "michal", "keren", "hen", "dennis"].map(reviewById);

const marqueeItems = [
  "חתונות", "מסיבות פרטיות", "אירועי חברה",
  "כרמי יוסף", "אזור המרכז", "השרון",
  "מודיעין", "רחובות", "הרצליה",
];

export default function Index() {
  useScrollReveal();

  return (
    <Layout>
      <SEO
        title="DJ אסף אריכא | DJ לחתונה במרכז ובשרון"
        description="DJ אסף אריכא, תקליטן לחתונות במרכז ובשרון. פגישת מוזיקה אישית, קריאת קהל בזמן אמת ורחבה מלאה מהחופה ועד השיר האחרון. 33 ביקורות של זוגות במתחתנים למען מתחתנים."
        canonicalUrl="/"
        schema={[faqSchema(faqs)]}
      />

      {/* ══════════════════════════════════════════════════════════
          HERO — Split screen: image LEFT / text RIGHT
          ══════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[100dvh] overflow-hidden"
        aria-label="כותרת ראשית"
      >
        {/* Image panel — physical LEFT, 46% on desktop, full bleed on mobile */}
        <div className="absolute left-0 top-0 bottom-0 w-full lg:w-[46%]">
          <img
            src={heroImage}
            alt="DJ אסף אריכא מתקלט בעמדת ה-DJ באולם אירועים"
            width={1459}
            height={1078}
            decoding="async"
            {...{ fetchpriority: "high" }}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {/* Mobile: dark veil so text is readable */}
          <div className="absolute inset-0 bg-background/74 lg:hidden" />
          {/* Desktop: gradient fading image into background on its right edge */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(to right, transparent 45%, hsl(var(--background) / 0.75) 78%, hsl(var(--background)) 100%)",
            }}
          />
        </div>

        {/* Text content — physical RIGHT via ml-auto */}
        <div className="relative z-10 min-h-[100dvh] flex items-center">
          <div className="container-custom w-full">
            <div className="lg:ml-auto lg:w-[57%] lg:pl-8 xl:pl-14 py-32 lg:py-20">

              {/* Label + EQ bars */}
              <div
                className="flex items-center gap-3 mb-8"
                data-reveal
              >
                <EQBars count={6} />
                <span className="text-primary text-xs font-medium tracking-[0.22em] uppercase">
                  DJ לחתונות ואירועים · מרכז ושרון
                </span>
              </div>

              {/* H1 */}
              <h1
                className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-bold tracking-tight leading-none mb-6"
                data-reveal
                data-delay="1"
              >
                DJ אסף
                <br />
                <span className="text-primary">אריכא</span>
                <span className="block text-xl md:text-2xl lg:text-3xl font-medium text-foreground/80 tracking-normal mt-5">
                  DJ לחתונה במרכז ובשרון
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-lg md:text-xl text-muted-foreground max-w-[440px] mb-10 leading-relaxed"
                data-reveal
                data-delay="2"
              >
                בונה איתכם את המוזיקה בפגישה אישית, וקורא את הרחבה בזמן אמת כדי שגם החברים וגם המשפחה ירקדו. מהכניסה לחופה ועד השיר האחרון.
              </p>

              {/* CTA buttons */}
              <div
                className="flex flex-col sm:flex-row items-start gap-4"
                data-reveal
                data-delay="3"
              >
                <Button variant="hero" size="xl" className="btn-active" asChild>
                  <Link to="/contact">בדיקת זמינות לתאריך שלכם</Link>
                </Button>
                <Button variant="glass" size="lg" className="btn-active" asChild>
                  <a href="tel:0505567078">
                    <Phone className="h-4 w-4" />
                    050-5567078
                  </a>
                </Button>
              </div>

              {/* Stats strip */}
              <div
                className="flex items-center gap-8 mt-14 pt-8 border-t border-border/25"
                data-reveal
                data-delay="4"
              >
                <div>
                  <div className="text-3xl font-bold font-heading text-primary">1,000+</div>
                  <div className="text-xs text-muted-foreground tracking-wide mt-0.5">אירועים</div>
                </div>
                <div className="w-px h-8 bg-border/50 shrink-0" />
                <div>
                  <div className="text-3xl font-bold font-heading">10+</div>
                  <div className="text-xs text-muted-foreground tracking-wide mt-0.5">שנות ניסיון</div>
                </div>
                <div className="w-px h-8 bg-border/50 shrink-0" />
                <Link to="/reviews" className="group">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="text-3xl font-bold font-heading">{REVIEW_SOURCES.mit4mit.score.split("/")[0]}</span>
                  </div>
                  <div className="text-xs text-muted-foreground tracking-wide mt-0.5 group-hover:text-primary">
                    {REVIEW_SOURCES.mit4mit.count} ביקורות במתחתנים למען מתחתנים
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
          <div className="w-5 h-9 border-2 border-primary/40 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2.5 bg-primary/70 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          KINETIC TEXT BAND
          ══════════════════════════════════════════════════════════ */}
      <div
        className="py-[18px] border-y border-border/20 overflow-hidden bg-dark-surface"
        aria-hidden="true"
      >
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground shrink-0 mx-5"
            >
              {item}
              <span className="text-primary mx-5">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          FEATURES — Asymmetric bento (not 3 equal cards)
          ══════════════════════════════════════════════════════════ */}
      <section className="section-padding" aria-labelledby="features-heading">
        <div className="container-custom">

          <div className="mb-14" data-reveal>
            <h2
              id="features-heading"
              className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight"
            >
              למה לבחור <span className="text-primary">בי?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              כל אירוע הוא עולם ומלואו. אני מגיע עם ניסיון, ציוד, ואוזן מכוונת.
            </p>
          </div>

          {/* Asymmetric 2-col grid: large left + 2 stacked right */}
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6">

            {/* Large card — spans full height */}
            <div
              className="bg-gradient-card rounded-2xl p-8 md:p-10 border border-border/40 card-hover flex flex-col justify-between min-h-[300px] md:row-span-2"
              data-reveal
            >
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-7">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">ניסיון עשיר</h3>
                <p className="text-muted-foreground leading-relaxed text-base max-w-sm">
                  מעל 1,000 אירועים, כולל חתונות, מסיבות פרטיות ואירועי חברה בכל רחבי המרכז והשרון.
                  כל אירוע הוא הזדמנות לכתוב פסקול מושלם שאי אפשר לשכוח.
                </p>
              </div>
              <div className="mt-10 pt-7 border-t border-border/25">
                <div className="flex items-end gap-2">
                  <span className="text-6xl font-bold font-heading text-primary leading-none">1,000</span>
                  <span className="text-muted-foreground mb-1 text-lg">+ אירועים</span>
                </div>
              </div>
            </div>

            {/* Small card — התאמה מושלמת */}
            <div
              className="bg-gradient-card rounded-2xl p-7 border border-border/40 card-hover"
              data-reveal
              data-delay="1"
            >
              <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                <Music className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">התאמה מושלמת</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                מוזיקה שמתאימה לקהל, לסגנון, ולרגע. ישראלית, מזרחית, היטים בינלאומיים.
              </p>
            </div>

            {/* Small card — יחס אישי */}
            <div
              className="bg-gradient-card rounded-2xl p-7 border border-border/40 card-hover"
              data-reveal
              data-delay="2"
            >
              <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">יחס אישי</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                ליווי מקצועי מהתכנון ועד לריקוד האחרון. נדבר על האירוע ונתאים יחד את הפסקול.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SERVICES — Accordion image slider
          ══════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-dark-surface" aria-labelledby="services-heading">
        <div className="container-custom">

          <div className="mb-12" data-reveal>
            <h2
              id="services-heading"
              className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight"
            >
              <span className="text-primary">השירותים</span> שלי
            </h2>
            <p className="text-muted-foreground text-lg">
              מחתונה ועד מסיבה, מהחופה ועד ריקוד האחרון
            </p>
          </div>

          {/* Desktop accordion slider */}
          <div
            className="hidden md:flex gap-2 h-[460px]"
            data-reveal
            aria-label="שירותים"
          >
            {services.map((service) => (
              <Link
                key={service.title}
                to={service.link}
                className="accordion-panel group"
                aria-label={service.title}
              >
                <img
                  src={service.image}
                  alt={`${service.title} עם DJ אסף אריכא`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                {/* Content revealed on expand */}
                <div className="accordion-panel-content">
                  <h3 className="text-2xl font-heading font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-primary text-sm font-medium">
                    למידע נוסף
                    <ChevronLeft className="h-4 w-4" />
                  </span>
                </div>

                {/* Collapsed label (hidden on expand) */}
                <div className="absolute inset-x-0 bottom-4 flex justify-center transition-opacity duration-200 group-hover:opacity-0">
                  <span
                    className="text-xs font-medium text-foreground/60 tracking-wider"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    {service.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile fallback grid */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {services.map((service) => (
              <Link key={service.title} to={service.link} className="group block">
                <article className="relative h-56 rounded-2xl overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <h3 className="text-xl font-heading font-bold mb-1">{service.title}</h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center" data-reveal>
            <Button variant="outline" size="lg" className="btn-active" asChild>
              <Link to="/services">לכל השירותים</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TESTIMONIALS — Two-row infinite marquee
          ══════════════════════════════════════════════════════════ */}
      <section className="section-padding" aria-labelledby="testimonials-heading">

        <div className="container-custom">
          <div className="mb-12" data-reveal>
            <h2
              id="testimonials-heading"
              className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight"
            >
              מה <span className="text-primary">זוגות</span> כותבים
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              ציטוטים מתוך {REVIEW_SOURCES.mit4mit.count} ביקורות אמיתיות של זוגות באתר מתחתנים למען מתחתנים, בציון {REVIEW_SOURCES.mit4mit.score}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {homeReviews.map((r, i) => (
              <div key={r.id} data-reveal data-delay={String(i % 3)} className="flex">
                <ReviewCard review={r} className="card-hover w-full" />
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button variant="outline" size="lg" className="btn-active" asChild>
              <Link to="/reviews">לכל הביקורות</Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link to="/wedding-dj">איך אני עובד עם זוגות</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FAQ — Accordion with FAQPage schema
          ══════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-dark-surface" aria-labelledby="faq-heading">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="mb-10 text-center" data-reveal>
              <h2
                id="faq-heading"
                className="text-3xl md:text-4xl font-heading font-bold mb-3 tracking-tight"
              >
                שאלות <span className="text-primary">נפוצות</span>
              </h2>
              <p className="text-muted-foreground">שאלות שזוגות שואלים לפני שסוגרים DJ. <Link to="/wedding-dj" className="text-primary hover:underline">המדריך המלא ל-DJ לחתונה</Link></p>
            </div>

            <Accordion type="single" collapsible className="space-y-3" data-reveal>
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card border border-border/40 rounded-xl px-6 data-[state=open]:border-primary/30"
                >
                  <AccordionTrigger className="text-right font-medium hover:text-primary hover:no-underline py-5 text-base">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent forceMount className="text-muted-foreground leading-relaxed pb-5 group-data-[state=closed]:hidden">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CTA — Pulsing rings
          ══════════════════════════════════════════════════════════ */}
      <section
        className="section-padding relative overflow-hidden bg-dark-surface"
        aria-labelledby="cta-heading"
      >
        {/* Pulsing rings — decorative */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border border-primary/25 ring-pulse" />
            <div className="absolute inset-0 rounded-full border border-primary/18 ring-pulse ring-pulse-delay-1" />
            <div className="absolute inset-0 rounded-full border border-primary/12 ring-pulse ring-pulse-delay-2" />
          </div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center" data-reveal>
            <h2
              id="cta-heading"
              className="text-3xl md:text-5xl font-heading font-bold mb-6 tracking-tight leading-tight"
            >
              מוכנים להפוך את האירוע שלכם
              <br />
              <span className="text-primary">לבלתי נשכח?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
              שלחו לי את פרטי החתונה, ונבדוק יחד זמינות ונדבר על המוזיקה שלכם
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" className="btn-active" asChild>
                <Link to="/contact">שלחו לי את פרטי החתונה</Link>
              </Button>
              <Button variant="whatsapp" size="lg" className="btn-active" asChild>
                <a
                  href="https://wa.me/972505567078?text=היי%20אסף%2C%20אשמח%20לפרטים%20על%20DJ%20לאירוע"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
