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
            <p>מדיניות זו נועדה להבהיר כיצד אנו אוספים, משתמשים, שומרים ומגנים על המידע האישי שלך בעת השימוש באתר.</p>
            
            <h2 className="text-xl font-bold text-primary">1. איסוף מידע</h2>
            <p>בעת שימוש באתר אנו עשויים לאסוף:</p>
            <ul className="list-disc list-inside space-y-1 mr-4">
              <li><strong>פרטי זיהוי:</strong> שם מלא, מספר טלפון, כתובת דוא"ל.</li>
              <li><strong>נתוני גלישה:</strong> כתובת IP, סוג דפדפן, נתוני שימוש באתר, קוקיז, Google Analytics ופיקסלים של פרסום.</li>
            </ul>
            
            <h2 className="text-xl font-bold text-primary">2. שימוש במידע</h2>
            <p>המידע האישי שלך עשוי לשמש ל:</p>
            <ul className="list-disc list-inside space-y-1 mr-4">
              <li>מתן שירותי לקוחות ותמיכה.</li>
              <li>שליחת עדכונים, הצעות שיווקיות וניוזלטר (בכפוף להסכמה).</li>
              <li>שיפור חוויית המשתמש באתר והתאמת תוכן פרסומי.</li>
            </ul>
            
            <h2 className="text-xl font-bold text-primary">3. העברת מידע לצדדים שלישיים</h2>
            <p>החברה לא רשאית להעביר מידע אישי.</p>
            <p><strong>ספקי שירות צד ג׳</strong> – המספקים עבורנו שירותי ניתוח, פרסום או אחסון. העברת המידע תתבצע רק ככל שנדרש למתן השירות ולא מעבר לכך.</p>
            
            <h2 className="text-xl font-bold text-primary">4. אבטחת מידע</h2>
            <p>החברה נוקטת באמצעי אבטחת מידע סבירים ומקובלים על מנת להגן על המידע האישי שלך מפני גישה לא מורשית, שימוש לרעה או חשיפה.</p>
            
            <h2 className="text-xl font-bold text-primary">5. זכויות המשתמשים</h2>
            <p>למשתמש באתר עומדות הזכויות הבאות:</p>
            <ul className="list-disc list-inside space-y-1 mr-4">
              <li><strong>עיון במידע</strong> – לקבל עותק של המידע שנשמר אודותיו.</li>
              <li><strong>תיקון מידע</strong> – לבקש עדכון או תיקון פרטים אישיים שגויים.</li>
              <li><strong>מחיקה</strong> – לבקש מחיקה של המידע האישי שנשמר עליו.</li>
              <li><strong>הסרה מדיוור</strong> – לבקש בכל עת הפסקת קבלת חומר פרסומי.</li>
            </ul>
            
            <h2 className="text-xl font-bold text-primary">6. שימוש בקוקיז (Cookies)</h2>
            <p>האתר עושה שימוש בקובצי Cookies לצורך תפעול שוטף, שיפור חוויית המשתמש, ניתוח נתוני שימוש והתאמת פרסום.</p>
            <p>באפשרותך לשלוט בשימוש בקוקיז באמצעות הגדרות הדפדפן שלך, כולל חסימה או מחיקה של קוקיז.</p>
            
            <h2 className="text-xl font-bold text-primary">7. שינויים במדיניות פרטיות</h2>
            <p>החברה רשאית לעדכן או לשנות מדיניות זו מעת לעת. הודעה על שינוי מהותי תפורסם באתר. המשך השימוש באתר מהווה הסכמה למדיניות המעודכנת.</p>
            
            <h2 className="text-xl font-bold text-primary">8. יצירת קשר</h2>
            <p>לשאלות או בקשות בנוגע למדיניות זו, ניתן לפנות אלינו:</p>
            <p>טלפון: <a href="tel:050-5567078" className="text-primary hover:underline">050-5567078</a></p>
            <p>דוא"ל: <a href="mailto:arichaassaf@gmail.com" className="text-primary hover:underline">arichaassaf@gmail.com</a></p>
          </div>
        </div>
      </section>
    </Layout>
  );
}