import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Home } from "lucide-react";

const NotFound = () => (
  <Layout>
    <section className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-heading font-bold text-gradient-gold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">הדף שחיפשתם לא נמצא</p>
        <Button variant="hero" asChild>
          <Link to="/"><Home className="h-5 w-5" /> חזרה לדף הבית</Link>
        </Button>
      </div>
    </section>
  </Layout>
);

export default NotFound;