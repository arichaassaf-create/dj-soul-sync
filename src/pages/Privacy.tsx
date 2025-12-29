import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";

export default function Privacy() {
  return (
    <Layout>
      <SEO title="מדיניות פרטיות" canonicalUrl="https://dj-assaf-aricha.co.il/privacy" noindex />
      <section className="pt-32 pb-16 md:pt-40">
        <div className="container-custom max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">בית</Link></li>
              <li>/</li>
              <li className="text-primary">מדיניות פרטיות</li>
            </ol>
          </nav>
          <h1 className="text-4xl font-heading font-bold mb-8"><span className="text-gradient-gold">מדיניות פרטיות</span></h1>
          <div className="prose prose-lg prose-invert max-w-none space-y-6 text-foreground/90">
            <p>אתר זה מכבד את פרטיות המשתמשים. מדיניות זו מסבירה כיצד אנו אוספים ומשתמשים במידע.</p>
            <h2 className="text-xl font-bold text-primary">איסוף מידע</h2>
            <p>אנו אוספים מידע שאתם מוסרים בטפסי יצירת קשר: שם, טלפון, אימייל ופרטי האירוע.</p>
            <h2 className="text-xl font-bold text-primary">שימוש במידע</h2>
            <p>המידע משמש ליצירת קשר חוזר והצעת שירותים בלבד. לא נעביר את המידע לצדדים שלישיים.</p>
            <h2 className="text-xl font-bold text-primary">יצירת קשר</h2>
            <p>לשאלות בנושא פרטיות: assaf@homelix.co</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}