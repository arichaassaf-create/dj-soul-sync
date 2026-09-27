import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ReviewCard } from "@/components/ReviewCard";
import { Star, ExternalLink } from "lucide-react";
import { reviews } from "@/data/reviews";
import { REVIEW_SOURCES } from "@/lib/site";

// No AggregateRating/Review markup on purpose: Google does not show stars for reviews a business
// publishes about itself (self-serving), and marking them up risks a manual action.

export default function Reviews() {
  const { google, mit4mit, easy } = REVIEW_SOURCES;

  return (
    <Layout>
      <SEO
        title="ביקורות על DJ אסף אריכא | מה זוגות כותבים"
        description={`${mit4mit.count} ביקורות של זוגות על DJ אסף אריכא באתר מתחתנים למען מתחתנים, בציון ${mit4mit.score}. ציטוטים מקוריים עם קישור למקור.`}
        canonicalUrl="/reviews"
        breadcrumbs={[{ name: "ביקורות", path: "/reviews" }]}
      />

      <section className="pt-32 pb-12 md:pt-40">
        <div className="container-custom max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">בית</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-primary">ביקורות</li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            מה זוגות כותבים על <span className="text-gradient-gold">DJ אסף אריכא</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-10">
            כל הביקורות בעמוד הזה נכתבו על ידי זוגות אחרי החתונה שלהם, בפלטפורמות ביקורת חיצוניות. הציטוטים מועתקים
            מילה במילה, ולכל אחד יש קישור למקור שבו אפשר לקרוא את הביקורת המלאה.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
            <a
              href={google.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/40 transition-colors flex items-center justify-between gap-4"
            >
              <div>
                <p className="text-sm text-muted-foreground mb-1">{google.label}</p>
                <p className="flex items-center gap-2 text-3xl font-heading font-bold">
                  <Star className="h-6 w-6 fill-primary text-primary" aria-hidden="true" />
                  {google.score}
                </p>
                <p className="text-sm text-muted-foreground mt-1">ביקורות בפרופיל העסק בגוגל</p>
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
                <p className="text-sm text-muted-foreground mb-1">{mit4mit.label}</p>
                <p className="flex items-center gap-2 text-3xl font-heading font-bold">
                  <Star className="h-6 w-6 fill-primary text-primary" aria-hidden="true" />
                  {mit4mit.score}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{mit4mit.count} ביקורות</p>
              </div>
              <ExternalLink className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            </a>
            <a
              href={easy.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/40 transition-colors flex items-center justify-between gap-4"
            >
              <div>
                <p className="text-sm text-muted-foreground mb-1">{easy.label}</p>
                <p className="text-xl font-heading font-bold">לדף העסק באיזי</p>
                <p className="text-sm text-muted-foreground mt-1">ביקורות ודירוג באתר המקור</p>
              </div>
              <ExternalLink className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            הנתונים נבדקו באתר המקור בתאריך {mit4mit.checkedAt.split("-").reverse().join("/")}.
          </p>
        </div>
      </section>

      <section className="pb-16" aria-labelledby="quotes-h">
        <div className="container-custom max-w-5xl">
          <h2 id="quotes-h" className="text-2xl md:text-3xl font-heading font-bold mb-8">ציטוטים מביקורות של זוגות</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" asChild>
              <a href={mit4mit.url} target="_blank" rel="noopener noreferrer">
                לכל {mit4mit.count} הביקורות במתחתנים למען מתחתנים <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-dark-surface">
        <div className="container-custom max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">רוצים שהחתונה שלכם תהיה הביקורת הבאה?</h2>
          <p className="text-muted-foreground mb-8">
            קראו <Link to="/wedding-dj" className="text-primary hover:underline">איך אני עובד עם זוגות</Link>, או שלחו לי את
            פרטי החתונה ונבדוק זמינות.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">בדיקת זמינות לתאריך שלכם</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
