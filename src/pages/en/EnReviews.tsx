import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { EnLayout } from "@/components/EnLayout";
import { EnCta } from "@/components/EnBlocks";
import { Star, ExternalLink } from "lucide-react";
import { reviewsEn, REVIEWS_EN_SOURCE } from "@/data/reviewsEn";
import { REVIEW_SOURCES } from "@/lib/site";

// No AggregateRating/Review markup on purpose: self-serving reviews are not eligible for stars in Google.

export default function EnReviews() {
  const { google, mit4mit } = REVIEW_SOURCES;

  return (
    <EnLayout>
      <SEO
        lang="en"
        title="Reviews of DJ Assaf Aricha | What Couples Say"
        description="Read what couples wrote about Israeli wedding DJ Assaf Aricha: 20 reviews translated from Hebrew, each linked to the original. Rated 5.0 on Google."
        canonicalUrl="/en/reviews"
        alternates={[
          { hrefLang: "en", path: "/en/reviews" },
          { hrefLang: "he", path: "/reviews" },
        ]}
        breadcrumbs={[
          { name: "English", path: "/en" },
          { name: "Reviews", path: "/en/reviews" },
        ]}
      />

      <section className="pt-28 pb-10 md:pt-36">
        <div className="container-custom max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/en" className="hover:text-primary">Home</Link> <span aria-hidden="true">/</span>{" "}
            <span className="text-primary">Reviews</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight mb-6">
            What Couples Say About <span className="text-gradient-gold">DJ Assaf Aricha</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-10">
            These reviews were written in Hebrew by couples after their weddings, on Israel's leading wedding review site.
            Below are all 20 reviews shown there, translated in full. Every one links to the original.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mb-3">
            <a
              href={google.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/40 transition-colors flex items-center justify-between gap-4"
            >
              <div>
                <p className="text-sm text-muted-foreground mb-1">Google</p>
                <p className="flex items-center gap-2 text-3xl font-heading font-bold">
                  <Star className="h-6 w-6 fill-primary text-primary" aria-hidden="true" />
                  {google.score}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Google Business Profile</p>
              </div>
              <ExternalLink className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            </a>
            <a
              href={mit4mit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/40 transition-colors flex items-center justify-between gap-4"
            >
              <div>
                <p className="text-sm text-muted-foreground mb-1">Mit4Mit, Israel's wedding review site</p>
                <p className="flex items-center gap-2 text-3xl font-heading font-bold">
                  <Star className="h-6 w-6 fill-primary text-primary" aria-hidden="true" />
                  100%
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {mit4mit.topRated} of {mit4mit.count} reviews at the top rating (in Hebrew)
                </p>
              </div>
              <ExternalLink className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            </a>
          </div>
          <p className="text-xs text-muted-foreground">Ratings checked on the source sites in September 2026.</p>
        </div>
      </section>

      <section className="pb-16" aria-labelledby="all-reviews">
        <div className="container-custom max-w-5xl">
          <h2 id="all-reviews" className="sr-only">All reviews</h2>
          <div className="columns-1 md:columns-2 gap-5 [&>*]:mb-5">
            {reviewsEn.map((r) => (
              <figure key={r.name} className="break-inside-avoid bg-card rounded-2xl p-6 border border-border/40">
                <div className="flex gap-0.5 mb-3" aria-label="Rated 100 out of 100 by the reviewer">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-foreground/90 leading-relaxed text-sm">&ldquo;{r.text}&rdquo;</blockquote>
                <figcaption className="mt-5 pt-4 border-t border-border/30 text-xs flex items-center justify-between gap-3">
                  <span>
                    <span className="font-bold text-sm text-foreground block">{r.name}</span>
                    <span className="text-muted-foreground">
                      {r.date ? `Wedding, ${r.date} · ` : ""}Translated from Hebrew
                    </span>
                  </span>
                  <a
                    href={REVIEWS_EN_SOURCE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary shrink-0"
                  >
                    Original <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Read all {mit4mit.count} reviews in the original Hebrew on{" "}
            <a href={mit4mit.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Mit4Mit
            </a>
            .
          </p>
        </div>
      </section>

      <EnCta
        title="Want your wedding to be the next review?"
        text="Send me your date and location, in Israel or in the US, and I'll get back to you with availability and first ideas."
      />
    </EnLayout>
  );
}
