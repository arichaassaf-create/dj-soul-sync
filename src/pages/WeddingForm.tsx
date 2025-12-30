import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function WeddingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const brideName = formData.get("bride") as string;
    const groomName = formData.get("groom") as string;
    const phone = formData.get("phone") as string;
    const dateStr = formData.get("date") as string;
    const venue = formData.get("venue") as string;
    const genres = formData.get("genres") as string;
    const songs = formData.get("songs") as string;
    const notes = formData.get("notes") as string;

    const { error } = await supabase.from("wedding_submissions").insert({
      bride_name: brideName,
      groom_name: groomName,
      phone,
      event_date: dateStr || null,
      venue: venue || null,
      music_genres: genres ? genres.split(",").map((g) => g.trim()) : null,
      favorite_songs: songs || null,
      notes: notes || null,
    });

    setIsSubmitting(false);

    if (error) {
      console.error("Error submitting wedding form:", error);
      toast({
        title: "שגיאה בשליחה",
        description: "אנא נסו שוב מאוחר יותר.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitted(true);
    toast({ title: "השאלון נשלח בהצלחה!", description: "אצור איתכם קשר בקרוב." });
  };

  return (
    <Layout>
      <SEO
        title="שאלון חתונה ופלייליסט | די ג'יי אסף אריכא"
        description="מלאו את שאלון החתונה כדי שאוכל להכיר את הטעם המוזיקלי שלכם ולתכנן את הפלייליסט המושלם."
        canonicalUrl="https://dj-assaf-aricha.co.il/wedding-form"
      />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">בית</Link></li>
              <li>/</li>
              <li className="text-primary">שאלון חתונה</li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            <span className="text-gradient-gold">שאלון חתונה</span> ופלייליסט
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            מלאו את השאלון כדי שאוכל להכיר את הסגנון שלכם ולבנות את הפלייליסט המושלם לאירוע.
          </p>

          <div className="bg-card rounded-2xl p-8 border border-border/50">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">תודה רבה!</h3>
                <p className="text-muted-foreground">אצור קשר בקרוב לתיאום פגישה.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bride">שם הכלה *</Label>
                    <Input id="bride" name="bride" required className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="groom">שם החתן *</Label>
                    <Input id="groom" name="groom" required className="bg-background" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">טלפון *</Label>
                    <Input id="phone" name="phone" type="tel" required className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">תאריך החתונה *</Label>
                    <Input id="date" name="date" type="date" required className="bg-background" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue">מקום האירוע</Label>
                  <Input id="venue" name="venue" className="bg-background" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="genres">סגנונות מוזיקה אהובים</Label>
                  <Textarea id="genres" name="genres" className="bg-background resize-none" placeholder="ישראלית, מזרחית, היטים בינלאומיים..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="songs">שירים שחייבים להיות</Label>
                  <Textarea id="songs" name="songs" rows={4} className="bg-background resize-none" placeholder="רשמו שירים שאתם רוצים שיושמעו..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">הערות נוספות</Label>
                  <Textarea id="notes" name="notes" className="bg-background resize-none" />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "שולח..." : <><Send className="h-5 w-5" /> שליחה</>}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}