import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { EnLayout, EN_WHATSAPP } from "@/components/EnLayout";
import { EnReviewCard, EnFaq, EnCta } from "@/components/EnBlocks";
import { Button } from "@/components/ui/button";
import { Plane, MapPin, Video, Users, Music, Ear } from "lucide-react";
import { enHomeFaq, translatedReview } from "@/data/enContent";
import { faqSchema } from "@/data/faq";
import { REVIEW_SOURCES } from "@/lib/site";
import heroImage from "@/assets/dj-assaf-aricha-hero.webp";

const reasons = [
  {
    icon: Ear,
    title: "A DJ who reads the room",
    text: "The playlist is the plan, the dance floor is the boss. I watch the crowd all night and change direction the moment the energy calls for it.",
  },
  {
    icon: Users,
    title: "Israeli and American guests, one dance floor",
    text: "Israeli and Mizrahi hits for the family from Israel, the songs your American friends grew up on, and the timing that brings both sides together.",
  },
  {
    icon: Video,
    title: "Planned with you in English, over Zoom",
    text: "Fluent English, a full music meeting over Zoom and WhatsApp in between. You can plan the whole soundtrack before you land.",
  },
  {
    icon: Music,
    title: "Your moments, your songs",
    text: "Chuppah entrance, breaking the glass, first dance: we choose them together, along with a do-not-play list that is respected all night.",
  },
];

export default function EnHome() {
  const reviews = (["lital", "hgafla", "michal"] as const).map(translatedReview);

  return (
    <EnLayout>
      <SEO
        lang="en"
        title="Israeli Wedding DJ for Jewish Couples from the US | DJ Assaf Aricha"
        description="Israeli wedding DJ for Jewish couples from the US, for weddings in Israel and in America. Israeli, Mizrahi and international music, planned in English over Zoom."
        canonicalUrl="/en"
        alternates={[
          { hrefLang: "en", path: "/en" },
          { hrefLang: "he", path: "/" },
          { hrefLang: "x-default", path: "/" },
        ]}
        schema={[faqSchema(enHomeFaq)]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        {/* Photo on the right half (mirrors the Hebrew hero), full bleed under a veil on mobile */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[48%]">
          <img
            src={heroImage}
            alt="DJ Assaf Aricha playing at a wedding"
            width={1459}
            height={1078}
            decoding="async"
            {...{ fetchpriority: "high" }}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-background/80 lg:hidden" />
          <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-background via-background/30 to-transparent" />
        </div>
        <div className="container-custom relative">
          <div className="max-w-2xl lg:max-w-[50%]">
            <p className="text-primary text-xs font-medium tracking-[0.2em] uppercase mb-5">
              Weddings in Israel and the United States
            </p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight mb-6">
              Israeli Wedding DJ for <span className="text-gradient-gold">Jewish Couples from the US</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              DJ Assaf Aricha is a wedding DJ from Israel who works with couples who live in the US, whether you are
              getting married in Israel or bringing an Israeli DJ to your wedding in America. Every detail is planned with
              you in English over Zoom, and on the night itself the dance floor is built for both your Israeli and
              American guests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" asChild>
                <a href={EN_WHATSAPP} target="_blank" rel="noopener noreferrer">
                  Check availability for your date
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/en/destination-wedding-dj-israel">Planning a wedding in Israel</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              All {REVIEW_SOURCES.mit4mit.count} couples who reviewed Assaf on Israel's leading wedding review site gave
              him the top rating, and he is rated 5.0 on Google.
            </p>
          </div>
        </div>
      </section>

      {/* Two paths */}
      <section className="py-16" aria-labelledby="paths">
        <div className="container-custom">
          <h2 id="paths" className="text-3xl md:text-4xl font-heading font-bold mb-10">Where is your wedding?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              to="/en/destination-wedding-dj-israel"
              className="group bg-card rounded-2xl p-8 border border-border/40 hover:border-primary/40 transition-colors"
            >
              <MapPin className="h-8 w-8 text-primary mb-5" aria-hidden="true" />
              <h3 className="text-2xl font-heading font-bold mb-3 group-hover:text-primary">Getting married in Israel</h3>
              <p className="text-muted-foreground leading-relaxed">
                You live in New York, New Jersey, Florida or California and the wedding is in Israel. How we plan the music
                from 6,000 miles away, what Friday and midweek Israeli weddings need, and how to build a dance floor for
                both families.
              </p>
              <span className="inline-block mt-5 text-primary font-medium">Wedding DJ in Israel &rarr;</span>
            </Link>
            <Link
              to="/en/israeli-wedding-dj-usa"
              className="group bg-card rounded-2xl p-8 border border-border/40 hover:border-primary/40 transition-colors"
            >
              <Plane className="h-8 w-8 text-primary mb-5" aria-hidden="true" />
              <h3 className="text-2xl font-heading font-bold mb-3 group-hover:text-primary">Getting married in the US</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your wedding is in America, and you want the Israeli music played the way it is played at weddings in
                Israel. How bringing an Israeli DJ to your US wedding works, from planning to the technical setup.
              </p>
              <span className="inline-block mt-5 text-primary font-medium">Israeli DJ in the US &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-16" aria-labelledby="why">
        <div className="container-custom">
          <h2 id="why" className="text-3xl md:text-4xl font-heading font-bold mb-10">Why couples from abroad choose Assaf</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((r) => (
              <div key={r.title} className="bg-card rounded-2xl p-7 border border-border/40">
                <r.icon className="h-6 w-6 text-primary mb-4" aria-hidden="true" />
                <h3 className="text-xl font-heading font-bold mb-2">{r.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16" aria-labelledby="reviews">
        <div className="container-custom">
          <h2 id="reviews" className="text-3xl md:text-4xl font-heading font-bold mb-3">What couples say</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            Reviews were written in Hebrew on Israel's leading wedding review site. Below are faithful translations, each
            linked to the original.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {reviews.map((r) => (
              <EnReviewCard key={r.id} review={r} />
            ))}
          </div>
          <Link to="/en/reviews" className="inline-block mt-8 text-primary font-medium hover:underline">
            Read all 20 reviews in English &rarr;
          </Link>
        </div>
      </section>

      <EnFaq items={enHomeFaq} />

      <EnCta
        title="Let's talk about your wedding"
        text="Send me your date, the venue or city, and a few words about your music. I'll get back to you with availability and first ideas."
      />
    </EnLayout>
  );
}
