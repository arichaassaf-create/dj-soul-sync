import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Helmet } from "react-helmet-async";
import { Heart, PartyPopper, Briefcase, Headphones, Music, CheckCircle } from "lucide-react";
import weddingImage from "@/assets/wedding-dance.jpg";
import privatePartyImage from "@/assets/private-party.jpg";
import corporateImage from "@/assets/corporate-event.jpg";
import workshopImage from "@/assets/workshop-dj.png";

const services = [
  {
    id: "weddings",
    icon: Heart,
    title: "חתונות",
    subtitle: "הפסקול המושלם ליום הכי חשוב בחייכם",
    image: weddingImage,
    description: "חתונה היא אירוע של פעם בחיים, וכל רגע בה חשוב. מקבלת הפנים הרומנטית, דרך טקס החופה המרגש ועד לרחבה סוערת שלא נגמרת - אני מתאים את המוזיקה לכל שלב באירוע.",
    features: [
      "פגישת תכנון מקדימה עם הזוג",
      "התאמת מוזיקה לפי טעמכם האישי",
      "ניהול לו\"ז מוזיקלי מסודר",
      "שירי כניסה וריקודים מיוחדים",
      "ציוד הגברה מקצועי",
      "תאורה דקורטיבית (אופציונלי)",
    ],
  },
  {
    id: "private",
    icon: PartyPopper,
    title: "מסיבות פרטיות",
    subtitle: "יום הולדת או כל חגיגה משפחתית",
    image: privatePartyImage,
    description: "בין אם זה יום הולדת עגול, מסיבת רווקים או רווקות, או סתם מסיבה משפחתית - אני יוצר את האווירה המושלמת שתגרום לכל האורחים לקפוץ מהכיסאות.",
    features: [
      "התאמת מוזיקה לגיל המשתתפים",
      "שירים מיוחדים לפי בקשה",
      "ציוד מותאם לגודל האירוע",
      "גמישות מלאה בסגנון",
    ],
  },
  {
    id: "corporate",
    icon: Briefcase,
    title: "אירועי חברה",
    subtitle: "השקות, כנסים ואירועים עסקיים",
    image: corporateImage,
    description: "אירועים עסקיים דורשים גישה שונה - מוזיקת רקע אלגנטית שיוצרת אווירה נעימה, ובזמן הנכון - מעבר למוזיקה שמניעה את האנשים לזוז.",
    features: [
      "מוזיקת רקע מקצועית",
      "התאמה לאופי החברה",
      "ניהול זמנים מדויק",
      "אפשרות להגברת נאומים",
      "ציוד מקצועי ודיסקרטי",
    ],
  },
  {
    id: "consulting",
    icon: Headphones,
    title: "ייעוץ מוזיקלי",
    subtitle: "עזרה בבניית פלייליסט לאירוע",
    image: null,
    description: "לא בטוחים איזו מוזיקה מתאימה לאירוע שלכם? אני מציע שירות ייעוץ מוזיקלי שיעזור לכם לבנות את הפלייליסט המושלם, גם אם בחרתם לעבוד עם תקליטן אחר.",
    features: [
      "ניתוח סגנון והעדפות",
      "בניית רשימת שירים מותאמת",
      "המלצות לזמני שיאים",
      "טיפים לבחירת שירים מיוחדים",
    ],
    ctaLink: "/contact",
    ctaText: "קבלו הצעת מחיר",
  },
  {
    id: "workshop",
    icon: Music,
    title: "סדנת DJ",
    subtitle: "למדו לתקלט בסדנה פרטית ואישית",
    image: workshopImage,
    description: "חלמתם תמיד לעמוד מאחורי הקונסולה? אני מציע סדנאות DJ פרטיות ליחידים ולזוגות, במפגש של 3.5 שעות שבו תלמדו את הבסיס של תקלוט, מיקס ובניית סט מוזיקלי.",
    features: [
      "סדנה פרטית בהתאמה אישית",
      "מתאים למתחילים לגמרי",
      "ליחידים (1,199 ₪) או לזוגות (1,750 ₪)",
      "ציוד מקצועי מסופק",
      "לומדים על סגנונות המוזיקה שאתם אוהבים",
      "חוויה מהנה ומיוחדת - גם כמתנה",
    ],
    ctaLink: "/workshop",
    ctaText: "לפרטים נוספים",
  },
];

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "שירותי DJ אסף אריכא",
  "itemListElement": [
    {
      "@type": "Service",
      "position": 1,
      "name": "DJ לחתונות במרכז ובשרון",
      "description": "שירותי דיג'יי מקצועיים לחתונות באזור המרכז והשרון. מקבלת פנים ועד ריקוד אחרון.",
      "provider": { "@type": "Person", "name": "אסף אריכא" },
      "areaServed": ["מרכז", "שרון", "מודיעין", "רחובות", "הרצליה", "רמת השרון"]
    },
    {
      "@type": "Service",
      "position": 2,
      "name": "DJ למסיבות פרטיות",
      "description": "דיג'יי למסיבות פרטיות, ימי הולדת ואירועים משפחתיים.",
      "provider": { "@type": "Person", "name": "אסף אריכא" }
    },
    {
      "@type": "Service",
      "position": 3,
      "name": "DJ לאירועי חברה",
      "description": "תקליטן מקצועי לאירועי חברה, השקות וכנסים.",
      "provider": { "@type": "Person", "name": "אסף אריכא" }
    },
    {
      "@type": "Service",
      "position": 4,
      "name": "סדנת DJ",
      "description": "סדנאות DJ פרטיות ליחידים וזוגות - למדו לתקלט.",
      "provider": { "@type": "Person", "name": "אסף אריכא" }
    }
  ]
};

export default function Services() {
  return (
    <Layout>
      <SEO
        title="שירותי DJ לחתונות ומסיבות | מרכז, רמת השרון, הרצליה, הוד השרון"
        description="שירותי DJ מקצועיים לחתונות ומסיבות באזור המרכז והשרון: מודיעין, רחובות, רמת השרון, הרצליה, הוד השרון ומושבי השפלה. תקליטן מנוסה עם התאמה אישית."
        canonicalUrl="https://dj-assaf-aricha.com/services"
        keywords="שירותי DJ מרכז, תקליטן רמת השרון, DJ הרצליה, דיג'יי הוד השרון, תקליטן מודיעין, DJ רחובות, דיג'יי מושבים שפלה, שירותי דיג'יי השרון"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(servicesSchema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-dark-surface">
        <div className="container-custom">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">בית</Link></li>
              <li>/</li>
              <li className="text-primary">שירותים</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              <span className="text-gradient-gold">השירותים</span> שלי
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              כל אירוע הוא ייחודי, ולכן אני מציע מגוון שירותים שמתאימים לכל סוג של חגיגה. 
              מחתונות מרגשות ועד אירועים עסקיים - אני כאן ליצור את החוויה המוזיקלית המושלמת.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-custom space-y-24">
          {services.map((service, index) => (
            <article
              key={service.id}
              id={service.id}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Image */}
              {service.image && (
                <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="relative rounded-2xl overflow-hidden aspect-video">
                    <img
                      src={service.image}
                      alt={`${service.title} - די ג'יי אסף אריכא`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                  </div>
                </div>
              )}

              {/* Content */}
              <div className={service.image ? "" : "lg:col-span-2 max-w-3xl"}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-heading font-bold">{service.title}</h2>
                    <p className="text-muted-foreground">{service.subtitle}</p>
                  </div>
                </div>

                <p className="text-lg text-foreground/90 mb-8 leading-relaxed">
                  {service.description}
                </p>

                <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="outline" size="lg" asChild>
                  <Link to={(service as any).ctaLink || "/contact"}>{(service as any).ctaText || "קבלו הצעת מחיר"}</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-dark-surface">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              רוצים לדעת יותר על <span className="text-gradient-gold">השירותים?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              מלאו את שאלון החתונה שלנו או צרו קשר ישירות ונדבר על האירוע שלכם
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/wedding-form">שאלון חתונה</Link>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <Link to="/contact">צור קשר</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
