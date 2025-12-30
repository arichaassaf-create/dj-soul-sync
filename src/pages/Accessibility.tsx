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
            <p>
              אנו רואים חשיבות רבה במתן שירות שוויוני לכלל הלקוחות והגולשים ובשיפור השירות הניתן ללקוחות ולגולשים עם מוגבלות. לפיכך אנו משקיעים משאבים רבים בהנגשת האתר שלנו על מנת להפוך אותו לזמין יותר עבור אנשים עם מוגבלות.
            </p>
            
            <p>
              על פי תיקון לתקנות העוסקות בנגישות האינטרנט אתר זה חייב לעמוד בתקנת הנגישות. הממונה על הנגישות באתר הוא אסף אריכא וניתן לפנות אליו בכל שאלה או תקלה בענייני הנגישות במייל{" "}
              <a href="mailto:arichaassaf@gmail.com" className="text-primary hover:underline">arichaassaf@gmail.com</a>
            </p>
            
            <p>
              אנחנו משקיעים זמן ומאמץ רב בהנגשת האתר מתחילת בנייתו. הנגשת האתר נועדה להפוך אותו לזמין, ידידותי ונוח יותר לשימוש עבור אנשים עם צרכים מיוחדים, הנובעים בין היתר ממוגבלויות מוטוריות שונות, לקויות קוגניטיביות, קוצר רואי, עיוורון או עיוורון צבעים, לקויות שמיעה וכן אנשים בני הגיל השלישי.
            </p>
            
            <p>
              אנו עושים מאמצים שהאתר שלנו יעמוד בדרישות תקנות שיוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות) התשע"ג 2013, ברמת התקן הנדרש. כמו כן, אנו מיישמים את המלצות מסמך WCAG2.0 מאת ארגון W3C.
            </p>

            <h2 className="text-xl font-bold text-primary mt-8">תיקונים והתאמות שבוצעו:</h2>
            <ul className="list-disc pr-6 space-y-2">
              <li>האתר מותאם לדפדפנים הנפוצים</li>
              <li>האתר מותאם לשימוש בטלפון הסלולרי</li>
              <li>האתר מותאם לתצוגה תואמת מגוון מסכים ורזולוציות</li>
              <li>אמצעי הניווט באתר פשוטים וברורים</li>
              <li>תכני האתר כתובים באופן ברור, מסודר והיררכי</li>
              <li>תוכן האתר כתוב בשפה פשוטה וברורה</li>
              <li>כל הדפים באתר בעלי מבנה קבוע</li>
              <li>למרבית התמונות באתר יש הסבר טקסטואלי חלופי (alt)</li>
              <li>האתר מאפשר שינוי גודל הגופן על ידי שימוש במקש Ctrl ומקש + במקלדת</li>
              <li>אין באתר שימוש בתצוגת טקסט נע או מהבהב</li>
            </ul>

            <p className="mt-6">
              חשוב לציין, כי למרות מאמצינו להנגיש את כלל הדפים באתר, ולמרות פעילותינו לשפר את נגישות האתר – ייתכן שיתגלו חלקים או יכולות שלא הונגשו כראוי או שטרם הונגשו.
            </p>

            <h2 className="text-xl font-bold text-primary mt-8">יצירת קשר בנושא נגישות</h2>
            <p>
              אם נתקלתם בבעיה בנושא נגישות באתר, נשמח אם תכתבו לנו, באמצעות פנייה לממונה הנגישות שלנו{" "}
              <a href="mailto:arichaassaf@gmail.com" className="text-primary hover:underline">arichaassaf@gmail.com</a>
            </p>
            
            <p>כדי שנוכל לטפל בבעיה בדרך הטובה ביותר, אנו ממליצים מאוד לצרף פרטים מלאים ככל שניתן:</p>
            <ul className="list-disc pr-6 space-y-2">
              <li>תיאור הבעיה</li>
              <li>מהי הפעולה שניסיתם לבצע</li>
              <li>קישור לדף בו גלשתם</li>
              <li>סוג הדפדפן וגרסתו</li>
              <li>מערכת הפעלה</li>
              <li>סוג הטכנולוגיה המסייעת (במידה והשתמשתם)</li>
            </ul>

            <p className="mt-6">
              אנו נעשה ככל שביכולתנו על מנת להנגיש את האתר בצורה המיטבית ולענות לפניות בצורה המקצועית והמהירה ביותר.
            </p>

            <div className="mt-8 p-6 bg-card rounded-xl border border-border">
              <h3 className="text-lg font-bold text-primary mb-4">פרטי הממונה על הנגישות</h3>
              <p><strong>שם:</strong> אסף אריכא</p>
              <p><strong>אימייל:</strong> <a href="mailto:arichaassaf@gmail.com" className="text-primary hover:underline">arichaassaf@gmail.com</a></p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
