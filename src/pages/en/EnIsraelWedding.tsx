import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { EnLayout } from "@/components/EnLayout";
import { EnReviewCard, EnFaq, EnCta } from "@/components/EnBlocks";
import { CheckCircle2 } from "lucide-react";
import { enIsraelFaq, translatedReview } from "@/data/enContent";
import { faqSchema } from "@/data/faq";
import { SITE_URL, ids, ENTITY } from "@/lib/site";

const UPDATED = "2026-10-06";

const steps = [
  {
    title: "Intro call",
    text: "A short Zoom or WhatsApp call to check your date and venue, hear about the two of you and your guests, and see if we click.",
  },
  {
    title: "Music meeting over Zoom",
    text: "The full planning session. I play you options, you react, and the playlist is built from your taste rather than a template. We cover the big moments, the dance floor styles and your do-not-play list.",
  },
  {
    title: "Final details before the wedding",
    text: "Timeline, venue coordination and last song requests, on WhatsApp in the weeks before the date. You land in Israel with the music already sorted.",
  },
  {
    title: "The wedding",
    text: "I run the music from the chuppah to the last song and keep reading the room all night, so you can stop planning and start dancing.",
  },
];

export default function EnIsraelWedding() {
  const url = `${SITE_URL}/en/destination-wedding-dj-israel`;
  const service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: "Wedding DJ in Israel for couples from abroad",
    serviceType: "Wedding DJ",
    provider: { "@id": ids.business },
    areaServed: { "@type": "Country", name: "Israel" },
    availableLanguage: ["English", "Hebrew"],
    url,
  };
  const article = {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: "Wedding DJ in Israel for couples planning from the US",
    author: { "@id": ids.person },
    publisher: { "@id": ids.business },
    dateModified: UPDATED,
    inLanguage: "en-US",
    image: ENTITY.image,
    mainEntityOfPage: { "@id": `${url}#webpage` },
  };

  return (
    <EnLayout>
      <SEO
        lang="en"
        title="Wedding DJ in Israel for Couples from the US | DJ Assaf Aricha"
        description="Living in the US and getting married in Israel? DJ Assaf Aricha plans your music in English over Zoom and gets Israeli and American guests dancing together."
        canonicalUrl="/en/destination-wedding-dj-israel"
        modifiedTime={UPDATED}
        breadcrumbs={[
          { name: "English", path: "/en" },
          { name: "Wedding DJ in Israel", path: "/en/destination-wedding-dj-israel" },
        ]}
        schema={[service, article, faqSchema(enIsraelFaq)]}
      />

      <section className="pt-28 pb-12 md:pt-36">
        <div className="container-custom max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/en" className="hover:text-primary">Home</Link> <span aria-hidden="true">/</span>{" "}
            <span className="text-primary">Wedding DJ in Israel</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight mb-6">
            <span className="text-gradient-gold">Wedding DJ in Israel</span> for Couples Planning from the US
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-4">
            You live in the States, the wedding is in Israel, and half the guests are flying in. DJ Assaf Aricha is an
            Israeli wedding DJ who plans the music with you in English, long before you land, and builds a dance floor where
            your Israeli family and your American friends end up dancing together.
          </p>
          <p className="text-sm text-muted-foreground border-t border-border/40 pt-4">
            Written by <Link to="/about" lang="he" className="text-primary hover:underline">Assaf Aricha</Link>, wedding DJ.
            Updated October 2026.
          </p>
        </div>
      </section>

      <article className="pb-8">
        <div className="container-custom max-w-4xl space-y-16">
          <section aria-labelledby="remote">
            <h2 id="remote" className="text-3xl md:text-4xl font-heading font-bold mb-4">
              How we plan the music when you're 6,000 miles away
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Planning a destination wedding from abroad is mostly about trust and good communication. With the music, it
              takes four steps, all of them possible from your living room:
            </p>
            <ol className="space-y-4">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4 bg-card rounded-xl p-5 border border-border/40">
                  <span className="text-2xl font-heading font-bold text-primary shrink-0 w-8">{i + 1}</span>
                  <div>
                    <h3 className="font-bold mb-1">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="mixed">
            <h2 id="mixed" className="text-3xl md:text-4xl font-heading font-bold mb-4">
              A dance floor for Israeli and American guests
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                An Israeli wedding dance floor sounds different from an American one. Israeli guests expect the Israeli and
                Mizrahi hits that fill every dance floor here, and your friends from home want the songs they grew up on.
                Play only one side and half the room sits down.
              </p>
              <p>
                The answer is not a compromise playlist. It is timing: knowing when the room is ready for a run of Israeli
                dance hits, when an American classic brings everyone back, and when to push into house or trance late at
                night. That is what reading the room means, and it is the core of the job.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <EnReviewCard review={translatedReview("hgafla")} />
              <EnReviewCard review={translatedReview("keren")} />
            </div>
          </section>

          <section aria-labelledby="moments">
            <h2 id="moments" className="text-3xl md:text-4xl font-heading font-bold mb-4">
              The chuppah, breaking the glass and your first dance
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              These are the moments your guests will film and remember, so they get the most attention in our music meeting.
              Some couples arrive knowing exactly what they want; others want to hear options. Either way, we keep going
              until you both love it.
            </p>
            <ul className="space-y-3">
              {[
                "Chuppah entrance: a song that moves you, not just one that sounds pretty",
                "Breaking the glass: the switch from ceremony to celebration, usually with more energy",
                "First dance: the most personal moment in front of everyone",
                "Your do-not-play list, respected all night",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 max-w-xl">
              <EnReviewCard review={translatedReview("michal")} />
            </div>
          </section>

          <section aria-labelledby="formats">
            <h2 id="formats" className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Friday afternoons, weeknights and summer heat
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Weddings in Israel often take place on Friday afternoons or on weekday evenings, not only on Saturday nights.
              A Friday wedding in July means keeping the energy up through daylight and heat; a Tuesday wedding means guests
              who came straight from work and need the music to win them over fast. Both work, with the right pacing.
            </p>
            <div className="max-w-xl">
              <EnReviewCard review={translatedReview("assaf-friday")} />
            </div>
          </section>

          <section aria-labelledby="where">
            <h2 id="where" className="text-3xl md:text-4xl font-heading font-bold mb-4">Where in Israel</h2>
            <p className="text-muted-foreground leading-relaxed">
              I'm based in central Israel and DJ weddings in Tel Aviv, the Sharon region and the center, and across the
              country on request. Getting married in the US instead?{" "}
              <Link to="/en/israeli-wedding-dj-usa" className="text-primary hover:underline">
                See how bringing an Israeli DJ to your US wedding works
              </Link>
              .
            </p>
          </section>
        </div>
      </article>

      <EnFaq items={enIsraelFaq} title="Questions from couples planning from abroad" />

      <EnCta
        title="Check availability for your date in Israel"
        text="Send me your date, venue and a few words about your music, and I'll get back to you with availability and first ideas."
      />
    </EnLayout>
  );
}
