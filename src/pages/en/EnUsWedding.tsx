import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { EnLayout } from "@/components/EnLayout";
import { EnReviewCard, EnFaq, EnCta } from "@/components/EnBlocks";
import { CheckCircle2 } from "lucide-react";
import { enUsFaq, translatedReview } from "@/data/enContent";
import { faqSchema } from "@/data/faq";
import { SITE_URL, ids, ENTITY } from "@/lib/site";

const UPDATED = "2026-10-06";

const whyIsraeliDj = [
  {
    title: "The Israeli music, played the Israeli way",
    text: "Knowing the songs is not enough. An Israeli wedding DJ knows which Israeli and Mizrahi hits make the whole family jump, in what order, and when to let them breathe.",
  },
  {
    title: "Both crowds, one night",
    text: "The Israeli side of the family and your American friends often have very different ideas of a dance floor. Reading both and bringing them together is the job.",
  },
  {
    title: "A DJ who has done this before",
    text: "Working with couples from abroad and English-speaking crowds is a regular part of my work, from the first Zoom call to the last song.",
  },
];

export default function EnUsWedding() {
  const url = `${SITE_URL}/en/israeli-wedding-dj-usa`;
  const service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: "Israeli wedding DJ for weddings in the United States",
    serviceType: "Wedding DJ",
    provider: { "@id": ids.business },
    areaServed: { "@type": "Country", name: "United States" },
    availableLanguage: ["English", "Hebrew"],
    url,
  };
  const article = {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: "Bringing an Israeli wedding DJ to your wedding in the US",
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
        title="Israeli Wedding DJ in the USA | Fly in DJ Assaf Aricha"
        description="Want an Israeli DJ at your US wedding? DJ Assaf Aricha flies in, plans the music with you in English over Zoom and brings authentic Israeli and Mizrahi sets."
        canonicalUrl="/en/israeli-wedding-dj-usa"
        modifiedTime={UPDATED}
        breadcrumbs={[
          { name: "English", path: "/en" },
          { name: "Israeli DJ in the US", path: "/en/israeli-wedding-dj-usa" },
        ]}
        schema={[service, article, faqSchema(enUsFaq)]}
      />

      <section className="pt-28 pb-12 md:pt-36">
        <div className="container-custom max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/en" className="hover:text-primary">Home</Link> <span aria-hidden="true">/</span>{" "}
            <span className="text-primary">Israeli DJ in the US</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight mb-6">
            Bring an <span className="text-gradient-gold">Israeli Wedding DJ</span> to Your Wedding in the US
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-4">
            Your wedding is in America, but a big part of your heart, or your family, is Israeli. DJ Assaf Aricha flies to
            the United States for weddings and brings the dance floor of an Israeli wedding with him, planned with you in
            English and tuned to your American guests too.
          </p>
          <p className="text-sm text-muted-foreground border-t border-border/40 pt-4">
            Written by <Link to="/about" lang="he" className="text-primary hover:underline">Assaf Aricha</Link>, wedding DJ.
            Updated October 2026.
          </p>
        </div>
      </section>

      <article className="pb-8">
        <div className="container-custom max-w-4xl space-y-16">
          <section aria-labelledby="why">
            <h2 id="why" className="text-3xl md:text-4xl font-heading font-bold mb-8">
              Why couples bring a DJ from Israel
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {whyIsraeliDj.map((w) => (
                <div key={w.title} className="bg-card rounded-2xl p-6 border border-border/40">
                  <h3 className="font-heading font-bold text-lg mb-2">{w.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{w.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="how">
            <h2 id="how" className="text-3xl md:text-4xl font-heading font-bold mb-4">How it works</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Bringing a DJ from Israel sounds complicated. In practice it is the same process I use with every couple
              abroad, plus travel:
            </p>
            <ul className="space-y-3">
              {[
                "Send your date, city and venue. I confirm availability and send a personal quote that includes travel.",
                "Intro call on Zoom to get to know you, your families and your guests.",
                "Full music meeting on Zoom: the big moments, the Israeli and American dance sets, and your do-not-play list.",
                "Technical setup coordinated in advance with you and your venue or AV provider, so everything is ready and tested.",
                "I arrive ahead of the wedding and run the music from the first song to the last.",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="program">
            <h2 id="program" className="text-3xl md:text-4xl font-heading font-bold mb-4">
              American traditions, Israeli dance floor
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                A wedding in the US usually follows an American program: cocktail hour, a grand entrance, a first dance,
                toasts. Nothing about that has to change. The night is built around your program, and the Israeli and
                Mizrahi sets come in where they lift the room the most.
              </p>
              <p>
                The music covers Israeli, Mizrahi, international pop, 80s and 90s, house, trance and reggaeton, plus classics
                from the 1940s to today. The mix is decided by your taste and by who is on the dance floor at that moment.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5 mt-8">
              <EnReviewCard review={translatedReview("lital")} />
              <EnReviewCard review={translatedReview("hgafla")} />
            </div>
          </section>

          <section aria-labelledby="israel">
            <h2 id="israel" className="text-3xl md:text-4xl font-heading font-bold mb-4">Thinking of getting married in Israel?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Many couples who live in the US choose a wedding in Israel instead.{" "}
              <Link to="/en/destination-wedding-dj-israel" className="text-primary hover:underline">
                See how planning a wedding DJ in Israel from abroad works
              </Link>
              .
            </p>
          </section>
        </div>
      </article>

      <EnFaq items={enUsFaq} title="Questions about weddings in the US" />

      <EnCta
        title="Getting married in the US? Let's check your date"
        text="Send me your date, city and venue. I'll get back to you with availability and a quote that includes travel."
      />
    </EnLayout>
  );
}
