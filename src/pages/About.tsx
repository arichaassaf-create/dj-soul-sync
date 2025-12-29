import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { MapPin, Music, Users, Calendar } from "lucide-react";
import djPortrait from "@/assets/dj-portrait.jpg";

export default function About() {
  return (
    <Layout>
      <SEO
        title="אודות | די ג'יי אסף אריכא"
        description="אסף אריכא - די ג'יי מקצועי עם ניסיון של שנים בחתונות, מסיבות פרטיות ואירועי חברה בתל אביב והסביבה."
        canonicalUrl="https://dj-assaf-aricha.co.il/about"
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">בית</Link></li>
              <li>/</li>
              <li className="text-primary">אודות</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-square max-w-md mx-auto lg:max-w-none">
                <img
                  src={djPortrait}
                  alt="אסף אריכא - די ג'יי מקצועי"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-6 py-3 rounded-xl shadow-gold font-bold">
                <span className="text-2xl">שנים</span>
                <br />
                <span className="text-sm">של ניסיון</span>
              </div>
            </div>

            {/* Content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                <span className="text-gradient-gold">אסף אריכא</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                מדג'ה בחתונות ובברים שונים בתל אביב והסביבה
              </p>
              <div className="prose prose-lg text-foreground max-w-none">
                <p className="mb-6 leading-relaxed">
                  מחובר למוזיקה מגיל צעיר ומאושר שזה תחום העיסוק שלי. חתונה, כאירוע של פעם בחיים - כל רגע חשוב מקבלת הפנים ועד לשיר סיום.
                </p>
                <p className="mb-8 leading-relaxed">
                  תכנון נכון ויכולת קריאה של הקהל במהלך הערב הכרחיים ביצירת חתונה מושלמת ומיוחדת. צרו קשר לפגישת הכירות ונדבר על האירוע וכמובן מוזיקה.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-card rounded-xl border border-border/50">
                  <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">אירועים</div>
                </div>
                <div className="text-center p-4 bg-card rounded-xl border border-border/50">
                  <Music className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">∞</div>
                  <div className="text-sm text-muted-foreground">סגנונות</div>
                </div>
                <div className="text-center p-4 bg-card rounded-xl border border-border/50">
                  <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">7</div>
                  <div className="text-sm text-muted-foreground">ימים בשבוע</div>
                </div>
                <div className="text-center p-4 bg-card rounded-xl border border-border/50">
                  <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">ארצי</div>
                  <div className="text-sm text-muted-foreground">שירות</div>
                </div>
              </div>

              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">צרו קשר לפגישת היכרות</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-dark-surface">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
              הגישה <span className="text-gradient-gold">שלי</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <article className="bg-card rounded-2xl p-8 border border-border/50 card-hover">
                <h3 className="text-xl font-bold mb-4 text-primary">קריאת קהל</h3>
                <p className="text-muted-foreground leading-relaxed">
                  היכולת לקרוא את הקהל ולהבין מה הוא צריך ברגע הנכון היא המפתח לאירוע מוצלח. אני צופה ומקשיב, ויודע מתי להעלות הילוך ומתי לתת לאנשים לנשום.
                </p>
              </article>

              <article className="bg-card rounded-2xl p-8 border border-border/50 card-hover">
                <h3 className="text-xl font-bold mb-4 text-primary">תכנון מדויק</h3>
                <p className="text-muted-foreground leading-relaxed">
                  כל אירוע מתוכנן בקפידה מראש. אני עובד עם הזוג או מארגני האירוע כדי להבין את החזון ולהתאים את המוזיקה בדיוק לאווירה הרצויה.
                </p>
              </article>

              <article className="bg-card rounded-2xl p-8 border border-border/50 card-hover">
                <h3 className="text-xl font-bold mb-4 text-primary">מגוון סגנונות</h3>
                <p className="text-muted-foreground leading-relaxed">
                  מישראלית דרך מזרחית, היטים מהעולם ועד קלאסיקות נצחיות. אני שולט במגוון רחב של סגנונות ויודע לשלב ביניהם בצורה חלקה.
                </p>
              </article>

              <article className="bg-card rounded-2xl p-8 border border-border/50 card-hover">
                <h3 className="text-xl font-bold mb-4 text-primary">ציוד מקצועי</h3>
                <p className="text-muted-foreground leading-relaxed">
                  אני עובד עם ציוד הגברה ותאורה מקצועי ברמה הגבוהה ביותר, כדי להבטיח איכות צליל מושלמת ואווירה שאי אפשר לשכוח.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}