import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogPost() {
  return (
    <Layout>
      <SEO
        title="5 טיפים לבחירת די ג'יי מקצועי לחתונה | בלוג"
        description="מדריך מקיף לבחירת DJ מקצועי לחתונה - 5 טיפים שיעזרו לכם לקבל החלטה נכונה ולהפוך את האירוע לבלתי נשכח."
        canonicalUrl="https://dj-assaf-aricha.co.il/blog/5-tips-choosing-wedding-dj"
        article
        publishedTime="2024-12-15"
      />

      <article className="pt-32 pb-16 md:pt-40">
        <div className="container-custom">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">בית</Link></li>
              <li>/</li>
              <li><Link to="/blog" className="hover:text-primary">בלוג</Link></li>
              <li>/</li>
              <li className="text-primary">5 טיפים לבחירת DJ</li>
            </ol>
          </nav>

          <header className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Calendar className="h-4 w-4" />
              <time>15 בדצמבר 2024</time>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              5 טיפים לבחירת <span className="text-gradient-gold">די ג'יי מקצועי</span> לחתונה
            </h1>
          </header>

          <div className="max-w-3xl prose prose-lg prose-invert">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              בחירת התקליטן לחתונה היא אחת ההחלטות החשובות ביותר שתקבלו. הנה 5 טיפים שיעזרו לכם לבחור נכון.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-12 mb-4">1. בדקו ניסיון בחתונות</h2>
            <p className="text-foreground/90 leading-relaxed mb-6">
              לא כל DJ שמנגן במועדונים מתאים לחתונות. חפשו תקליטן עם ניסיון ספציפי באירועים פרטיים.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-12 mb-4">2. פגישת היכרות</h2>
            <p className="text-foreground/90 leading-relaxed mb-6">
              פגישה אישית תעזור לכם להבין אם יש כימיה ואם הוא מבין את החזון שלכם לאירוע.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-12 mb-4">3. בקשו המלצות</h2>
            <p className="text-foreground/90 leading-relaxed mb-6">
              דברו עם זוגות שהשתמשו בשירותיו. שאלו על יכולת קריאת הקהל והגמישות.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-12 mb-4">4. דונו על הפלייליסט</h2>
            <p className="text-foreground/90 leading-relaxed mb-6">
              ודאו שהוא מוכן לעבוד עם רשימת השירים שלכם ושיש לו מגוון סגנונות.
            </p>

            <h2 className="text-2xl font-bold text-primary mt-12 mb-4">5. בדקו ציוד</h2>
            <p className="text-foreground/90 leading-relaxed mb-6">
              ציוד מקצועי חיוני לאיכות הצליל. שאלו מה הציוד שמגיע לאירוע.
            </p>
          </div>

          <div className="max-w-3xl mt-16 pt-8 border-t border-border">
            <Button variant="hero" asChild>
              <Link to="/contact">רוצים לדבר על האירוע שלכם?</Link>
            </Button>
          </div>
        </div>
      </article>
    </Layout>
  );
}