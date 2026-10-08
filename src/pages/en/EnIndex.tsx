import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { EnLayout, EN_WHATSAPP } from "@/components/EnLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone, MessageCircle, Star, Music, Heart, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { EnReviewCard } from "@/components/EnBlocks";
import { HeroAmbience } from "@/components/HeroAmbience";
import { translatedReview, enTranslatedHomeFaq } from "@/data/enContent";
import { faqSchema } from "@/data/faq";
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
    title: "Weddings",
    description: "From the reception to the last dance, an unforgettable musical experience",
    link: "/en/services#weddings",
  },
  {
    image: privatePartyImage,
    title: "Private Parties",
    description: "Birthdays, family celebrations, every special moment",
    link: "/en/services#private",
  },
  {
    image: corporateImage,
    title: "Corporate Events",
    description: "Launches, conferences and year-end parties with a professional atmosphere",
    link: "/en/services#corporate",
  },
];

const faqs = enTranslatedHomeFaq;

const homeReviews = (["lital", "assaf-friday", "michal", "keren", "hen", "dennis"] as const).map(translatedReview);

const marqueeItems = [
  "Weddings", "Private Parties", "Corporate Events",
  "Karmei Yosef", "Central Israel", "The Sharon",
  "Tel Aviv", "Modi'in", "United States",
];

export default function EnIndex() {
  useScrollReveal();

  return (
    <EnLayout>
      <SEO
        lang="en"
        title="DJ Assaf Aricha | Wedding DJ in Israel & the US"
        description="DJ Assaf Aricha, wedding DJ in central Israel and the Sharon who also flies to the US. A personal music meeting, real-time crowd reading and a full dance floor."
        canonicalUrl="/en"
        alternates={[
          { hrefLang: "en", path: "/en" },
          { hrefLang: "he", path: "/" },
          { hrefLang: "x-default", path: "/" },
        ]}
        schema={[faqSchema(faqs)]}
      />

      {/* ══════════════════════════════════════════════════════════
          HERO — Split screen: image LEFT / text RIGHT
          ══════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[100dvh] overflow-hidden"
        aria-label="Introduction"
      >
        {/* Image panel — physical LEFT, 46% on desktop, full bleed on mobile */}
        <div className="absolute left-0 top-0 bottom-0 w-full lg:w-[46%] overflow-hidden">
          <img
            src={heroImage}
            alt="DJ Assaf Aricha playing at the DJ booth in a wedding venue"
            width={1459}
            height={1078}
            decoding="async"
            {...{ fetchpriority: "high" }}
            className="hero-photo absolute inset-0 w-full h-full object-cover object-top"
          />
          <HeroAmbience />
          {/* Mobile: dark veil so text is readable */}
          <div className="absolute inset-0 bg-background/74 lg:hidden" />
          {/* Desktop: gradient fading image into background on its right edge */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(to right, transparent 45%, hsl(220 20% 6% / 0.75) 78%, hsl(220 20% 6%) 100%)",
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
                  Wedding & Event DJ · Israel and the US
                </span>
              </div>

              {/* H1 */}
              <h1
                className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-bold tracking-tight leading-none mb-6"
                data-reveal
                data-delay="1"
              >
                DJ Assaf
                <br />
                <span className="text-primary">Aricha</span>
                <span className="block text-xl md:text-2xl lg:text-3xl font-medium text-foreground/80 tracking-normal mt-5">
                  Wedding DJ in Israel and the US
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-lg md:text-xl text-muted-foreground max-w-[440px] mb-10 leading-relaxed"
                data-reveal
                data-delay="2"
              >
                I build the music with you in a personal meeting and read the dance floor in real time, so both your friends and your family dance. From walking to the chuppah to the very last song.
              </p>

              {/* CTA buttons */}
              <div
                className="flex flex-col sm:flex-row items-start gap-4"
                data-reveal
                data-delay="3"
              >
                <Button variant="hero" size="xl" className="btn-active" asChild>
                  <a href={EN_WHATSAPP} target="_blank" rel="noopener noreferrer">Check availability for your date</a>
                </Button>
                <Button variant="glass" size="lg" className="btn-active" asChild>
                  <a href="tel:+972505567078" dir="ltr">
                    <Phone className="h-4 w-4" />
                    +972 50-556-7078
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
                  <div className="text-xs text-muted-foreground tracking-wide mt-0.5">events</div>
                </div>
                <div className="w-px h-8 bg-border/50 shrink-0" />
                <div>
                  <div className="text-3xl font-bold font-heading">10+</div>
                  <div className="text-xs text-muted-foreground tracking-wide mt-0.5">years of experience</div>
                </div>
                <div className="w-px h-8 bg-border/50 shrink-0" />
                <Link to="/en/reviews" className="group">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="text-3xl font-bold font-heading">100%</span>
                  </div>
                  <div className="text-xs text-muted-foreground tracking-wide mt-0.5 group-hover:text-primary">
                    {REVIEW_SOURCES.mit4mit.count} of {REVIEW_SOURCES.mit4mit.count} couples: top rating
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
              Why <span className="text-primary">choose me?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              Every event is a world of its own. I come with experience, equipment and a tuned ear.
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
                <h3 className="text-2xl font-heading font-bold mb-4">Rich experience</h3>
                <p className="text-muted-foreground leading-relaxed text-base max-w-sm">
                  Over 1,000 events, including weddings, private parties and corporate events across central Israel
                  and the Sharon. Every event is a chance to write a perfect soundtrack nobody forgets.
                </p>
              </div>
              <div className="mt-10 pt-7 border-t border-border/25">
                <div className="flex items-end gap-2">
                  <span className="text-6xl font-bold font-heading text-primary leading-none">1,000</span>
                  <span className="text-muted-foreground mb-1 text-lg">+ events</span>
                </div>
              </div>
            </div>

            {/* Small card: a perfect fit */}
            <div
              className="bg-gradient-card rounded-2xl p-7 border border-border/40 card-hover"
              data-reveal
              data-delay="1"
            >
              <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                <Music className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">A perfect fit</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Music that fits the crowd, the style and the moment. Israeli, Mizrahi and international hits.
              </p>
            </div>

            {/* Small card: personal attention */}
            <div
              className="bg-gradient-card rounded-2xl p-7 border border-border/40 card-hover"
              data-reveal
              data-delay="2"
            >
              <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Personal attention</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Professional guidance from planning to the last dance. We talk about your event and shape the soundtrack together.
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
              My <span className="text-primary">services</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              From weddings to parties, from the chuppah to the last dance
            </p>
          </div>

          {/* Desktop accordion slider */}
          <div
            className="hidden md:flex gap-2 h-[460px]"
            data-reveal
            aria-label="Services"
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
                  alt={`${service.title} with DJ Assaf Aricha`}
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
                    Learn more
                    <ChevronRight className="h-4 w-4" />
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
              <Link to="/en/services">All services</Link>
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
              What <span className="text-primary">couples</span> say
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Translated quotes from {REVIEW_SOURCES.mit4mit.count} real reviews on Israel's leading wedding review site. All {REVIEW_SOURCES.mit4mit.topRated} couples gave the top rating.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {homeReviews.map((r, i) => (
              <div key={r.id} data-reveal data-delay={String(i % 3)} className="flex">
                <div className="card-hover w-full flex"><EnReviewCard review={r} /></div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button variant="outline" size="lg" className="btn-active" asChild>
              <Link to="/en/reviews">All reviews</Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link to="/en/destination-wedding-dj-israel">How I work with couples</Link>
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
                Frequently asked <span className="text-primary">questions</span>
              </h2>
              <p className="text-muted-foreground">Questions couples ask before booking a DJ. <Link to="/en/destination-wedding-dj-israel" className="text-primary hover:underline">The full wedding DJ guide</Link></p>
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
              Ready to make your event
              <br />
              <span className="text-primary">unforgettable?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
              Send me your wedding details, and we'll check availability and talk about your music
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" className="btn-active" asChild>
                <Link to="/en/wedding-form">Send me your wedding details</Link>
              </Button>
              <Button variant="whatsapp" size="lg" className="btn-active" asChild>
                <a
                  href={EN_WHATSAPP}
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
    </EnLayout>
  );
}
