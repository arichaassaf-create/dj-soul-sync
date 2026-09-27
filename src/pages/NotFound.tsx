import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Home } from "lucide-react";

const NotFound = () => (
  <Layout>
    <SEO title="הדף לא נמצא" description="הדף שחיפשתם לא נמצא באתר של DJ אסף אריכא." canonicalUrl="/404" noindex />
    <section className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-heading font-bold text-gradient-gold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">הדף שחיפשתם לא נמצא</p>
        <Button variant="hero" asChild>
          <Link to="/"><Home className="h-5 w-5" /> חזרה לדף הבית</Link>
        </Button>
        <p className="mt-8 text-sm text-muted-foreground">
          אולי חיפשתם את <Link to="/wedding-dj" className="text-primary hover:underline">DJ לחתונה</Link>,{" "}
          <Link to="/reviews" className="text-primary hover:underline">ביקורות של זוגות</Link> או{" "}
          <Link to="/contact" className="text-primary hover:underline">בדיקת זמינות לתאריך</Link>?
        </p>
      </div>
    </section>
  </Layout>
);

export default NotFound;