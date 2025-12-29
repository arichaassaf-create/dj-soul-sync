import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";

export default function Accessibility() {
  return (
    <Layout>
      <SEO title="הצהרת נגישות" canonicalUrl="https://dj-assaf-aricha.co.il/accessibility" noindex />
      <section className="pt-32 pb-16 md:pt-40">
        <div className="container-custom max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">בית</Link></li>
              <li>/</li>
              <li className="text-primary">הצהרת נגישות</li>
            </ol>
          </nav>
          <h1 className="text-4xl font-heading font-bold mb-8"><span className="text-gradient-gold">הצהרת נגישות</span></h1>
          <div className="prose prose-lg prose-invert max-w-none space-y-6 text-foreground/90">
            <p>אנו מחויבים להנגשת האתר לאנשים עם מוגבלויות ופועלים להתאמת האתר לתקן הישראלי (ת"י 5568).</p>
            <h2 className="text-xl font-bold text-primary">התאמות נגישות באתר</h2>
            <ul className="list-disc pr-6 space-y-2">
              <li>ניווט באמצעות מקלדת</li>
              <li>טקסטים חלופיים לתמונות</li>
              <li>ניגודיות צבעים מתאימה</li>
              <li>מבנה כותרות היררכי</li>
            </ul>
            <h2 className="text-xl font-bold text-primary">הממונה על הנגישות</h2>
            <p><strong>שם:</strong> אסף אריכא</p>
            <p><strong>אימייל:</strong> <a href="mailto:assaf@homelix.co" className="text-primary">assaf@homelix.co</a></p>
            <p>אם נתקלתם בבעיית נגישות, אנא פנו אלינו ונטפל בהקדם.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}