import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Gauge, Disc3, SlidersHorizontal, Layers, Sparkles,
  Users, Wrench, ListMusic, Clock, ArrowLeft,
} from "lucide-react";
import workshopHero from "@/assets/workshop-hero.jpg";

const agenda = [
  { block: 1, title: "פתיחה, עולם ה-DJ וציוד", duration: "35 דק׳", desc: "ציוד, תוכנות DJ, ארגון ספריית מוזיקה" },
  { block: 2, title: "תיאוריה ומונחי יסוד", duration: "40 דק׳", desc: "קצב, מבנה שיר, הרמוניה, מילון מונחים" },
  { block: 3, title: "Beatmatching ומיקס מעשי", duration: "45 דק׳", desc: "Sync, Beatgrid, EQ Mixing, תרגול" },
  { block: 4, title: "מעברים, אפקטים ובניית סט", duration: "40 דק׳", desc: "טכניקות מעבר, אפקטים, קריאת קהל ואנרגיה" },
  { block: 5, title: "תרגול חופשי, טיפים וסיכום", duration: "30 דק׳", desc: "מיני-סט אישי + תוכנית פעולה" },
];

const glossaryGroups = [
  {
    icon: Gauge,
    title: "קצב ומבנה",
    terms: [
      { name: "BPM", def: "קצב השיר, פעימות לדקה" },
      { name: "Beat", def: "פעימה בודדת — יחידת הקצב הבסיסית" },
      { name: "Bar (טאקט)", def: "קבוצה של 4 פעימות בדרך כלל" },
      { name: "Phrase", def: "משפט מוזיקלי של 16 או 32 בארים" },
    ],
  },
  {
    icon: Disc3,
    title: "הרמוניה",
    terms: [
      { name: "Key", def: "הסולם ההרמוני של השיר" },
      { name: "Camelot Wheel", def: "ייצוג גרפי של סולמות למיקס הרמוני" },
      { name: "הרמוניק מיקסינג", def: "מעבר בין שירים שהסולמות שלהם מתאימים" },
    ],
  },
  {
    icon: SlidersHorizontal,
    title: "ערוץ המיקסר",
    terms: [
      { name: "Gain", def: "עוצמת הכניסה של הערוץ, לפני הכול" },
      { name: "EQ", def: "איזון תדרים — Low / Mid / High" },
      { name: "Filter (HPF/LPF)", def: "מסנן תדרים ליצירת אפקט מעבר" },
      { name: "Crossfader", def: "פדר המערבב בין שני הערוצים" },
    ],
  },
  {
    icon: ListMusic,
    title: "הדק והפלייבק",
    terms: [
      { name: "Cue Point", def: "נקודת סימון קפיצה בתוך השיר" },
      { name: "Hot Cue", def: "Cue שמור לגישה מיידית בלחיצת כפתור" },
      { name: "Loop", def: "לולאת ניגון חוזרת של קטע מסוים" },
      { name: "Beatgrid / Sync", def: "רשת הפעימות בשיר, בסיס לסנכרון אוטומטי" },
    ],
  },
  {
    icon: Layers,
    title: "מעברים",
    terms: [
      { name: "Cut", def: "חיתוך מיידי בין שיר לשיר" },
      { name: "Fade", def: "מעבר הדרגתי בעוצמה" },
      { name: "Filter Transition", def: "מעבר דרך סגירה/פתיחה של פילטר" },
      { name: "Echo-out", def: "יציאה עם הד שדועך" },
    ],
  },
  {
    icon: Sparkles,
    title: "אפקטים",
    terms: [
      { name: "Echo / Delay", def: "חזרות דועכות של הצליל" },
      { name: "Reverb", def: "תחושת מרחב וגודל" },
      { name: "Flanger / Phaser", def: "עיוות תדר מסתחרר, לבנייה לפני שיא" },
      { name: "Beat FX", def: "אפקטים מסונכרנים לקצב השיר" },
    ],
  },
];

const bpmByGenre = [
  { genre: "היפ הופ / R&B", range: "80–100" },
  { genre: "רגאטון", range: "90–100" },
  { genre: "פופ / מיינסטרים", range: "100–120" },
  { genre: "האוס", range: "120–128" },
  { genre: "טכנו", range: "125–150" },
  { genre: "טראנס", range: "130–140" },
];

const tips = [
  { icon: Wrench, text: "הכינו Hot Cues מראש על נקודות מפתח בשיר" },
  { icon: ListMusic, text: "ארגנו ספריה וקלידים לפני שמגיעים לאירוע" },
  { icon: Users, text: "קראו את הקהל — תפוסת רחבה היא האינדיקטור המיידי ביותר" },
  { icon: Clock, text: "תרגלו מעברים לאט ובמודע, ורק אז תאיצו" },
];

export default function WorkshopGuide() {
  return (
    <Layout>
      <SEO
        title="מילון מונחים ומדריך לסדנת DJ | אסף אריכא"
        description="מדריך חינמי ומילון מונחים לסדנת ה-DJ: BPM, Beatmatching, EQ, מעברים ואפקטים, טווחי BPM לפי ז'אנר וטיפים מקצועיים ממנחה הסדנה אסף אריכא."
        canonicalUrl="https://dj-assaf-aricha.co.il/workshop-guide"
        keywords="מילון מונחים DJ, מדריך DJ, BPM, Beatmatching, מונחי תקליטנות, ללמוד DJ"
      />

      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={workshopHero}
            alt="מדריך ומילון מונחים לסדנת DJ"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
        <div className="relative container-custom pt-32 pb-16">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">בית</Link></li>
              <li>/</li>
              <li><Link to="/workshop" className="hover:text-primary">סדנת DJ</Link></li>
              <li>/</li>
              <li className="text-primary">מילון מונחים</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <span className="text-gradient-gold">מילון המונחים</span>
              <br />
              <span className="text-foreground text-2xl md:text-3xl">והמדריך לסדנת ה-DJ</span>
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed mb-8 max-w-2xl">
              כל המונחים, המבנה והטיפים שנעבור בסדנה הפרטית — לעיון לפני, במהלך, ואחרי המפגש.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/workshop#workshop-form">לתיאום סדנה</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-10 text-center">
            <span className="text-gradient-gold">מבנה הסדנה</span>
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
            3.5 שעות, חמישה בלוקים — מהיסודות ועד סט שלם
          </p>
          <div className="max-w-2xl mx-auto space-y-4">
            {agenda.map((item) => (
              <div
                key={item.block}
                className="flex items-center gap-4 p-5 bg-card rounded-xl border border-border/50"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0 font-heading font-bold text-primary">
                  {item.block}
                </div>
                <div className="flex-1">
                  <p className="text-foreground/90 font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <span className="text-sm text-muted-foreground shrink-0 flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {item.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-center">
            <span className="text-gradient-gold">מילון מונחים</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            שפת הבסיס של עולם ה-DJ, מקובצת לפי נושא
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {glossaryGroups.map((group) => (
              <div key={group.title} className="bg-card rounded-xl border border-border/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <group.icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold">{group.title}</h3>
                </div>
                <dl className="space-y-3">
                  {group.terms.map((term) => (
                    <div key={term.name}>
                      <dt className="text-sm font-semibold text-primary/90">{term.name}</dt>
                      <dd className="text-sm text-muted-foreground">{term.def}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Genre / BPM */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-10 text-center">
            <span className="text-gradient-gold">טווחי BPM לפי ז'אנר</span>
          </h2>
          <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4">
            {bpmByGenre.map((row) => (
              <div
                key={row.genre}
                className="flex items-center justify-between p-4 bg-card rounded-xl border border-border/50"
              >
                <span className="text-foreground/90 font-medium">{row.genre}</span>
                <span className="text-primary font-heading font-bold" dir="ltr">{row.range}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-6 text-sm">
            נקודת פתיחה בלבד — הטווחים בפועל תמיד גמישים לפי הסגנון והאירוע
          </p>
        </div>
      </section>

      {/* Tips */}
      <section className="section-padding bg-card/50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-10 text-center">
            <span className="text-gradient-gold">טיפים מהסדנה</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {tips.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border/50 card-hover"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-foreground/90 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            <span className="text-gradient-gold">רוצים להעמיק?</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            כל זה, בתרגול מעשי צמוד ובקצב שמתאים לכם — בסדנה הפרטית של 3.5 שעות.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/workshop">
              לפרטים על הסדנה <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
