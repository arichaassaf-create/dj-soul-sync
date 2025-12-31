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
import { weddingSchema, checkRateLimit, recordSubmission } from "@/lib/formValidation";

export default function WeddingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    // Check rate limiting
    const { allowed, remainingSeconds } = checkRateLimit();
    if (!allowed) {
      toast({
        title: "נא להמתין",
        description: `ניתן לשלוח טופס נוסף בעוד ${remainingSeconds} שניות`,
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData(e.currentTarget);
    const rawData = {
      brideName: formData.get("bride") as string,
      groomName: formData.get("groom") as string,
      phone: formData.get("phone") as string,
      eventDate: formData.get("date") as string,
      venue: formData.get("venue") as string,
      genres: formData.get("genres") as string,
      songs: formData.get("songs") as string,
      notes: formData.get("notes") as string,
    };

    // Validate with zod
    const result = weddingSchema.safeParse(rawData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast({
        title: "שגיאה בנתונים",
        description: "אנא בדקו את השדות ונסו שוב",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("wedding_submissions").insert({
      bride_name: result.data.brideName,
      groom_name: result.data.groomName,
      phone: result.data.phone,
      event_date: result.data.eventDate || null,
      venue: result.data.venue || null,
      music_genres: result.data.genres ? result.data.genres.split(",").map((g) => g.trim()) : null,
      favorite_songs: result.data.songs || null,
      notes: result.data.notes || null,
    });

    setIsSubmitting(false);

    if (error) {
      // Only log in development to prevent info leakage
      if (import.meta.env.DEV) {
        console.error("Error submitting wedding form:", error);
      }
      toast({
        title: "שגיאה בשליחה",
        description: "אנא נסו שוב מאוחר יותר.",
        variant: "destructive",
      });
      return;
    }

    // Record successful submission for rate limiting
    recordSubmission();
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
                    <Input
                      id="bride"
                      name="bride"
                      required
                      maxLength={100}
                      className={`bg-background ${errors.brideName ? "border-destructive" : ""}`}
                    />
                    {errors.brideName && <p className="text-sm text-destructive">{errors.brideName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="groom">שם החתן *</Label>
                    <Input
                      id="groom"
                      name="groom"
                      required
                      maxLength={100}
                      className={`bg-background ${errors.groomName ? "border-destructive" : ""}`}
                    />
                    {errors.groomName && <p className="text-sm text-destructive">{errors.groomName}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">טלפון *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      maxLength={20}
                      className={`bg-background ${errors.phone ? "border-destructive" : ""}`}
                    />
                    {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">תאריך החתונה *</Label>
                    <Input id="date" name="date" type="date" required className="bg-background" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue">מקום האירוע</Label>
                  <Input
                    id="venue"
                    name="venue"
                    maxLength={200}
                    className={`bg-background ${errors.venue ? "border-destructive" : ""}`}
                  />
                  {errors.venue && <p className="text-sm text-destructive">{errors.venue}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="genres">סגנונות מוזיקה אהובים</Label>
                  <Textarea
                    id="genres"
                    name="genres"
                    maxLength={500}
                    className={`bg-background resize-none ${errors.genres ? "border-destructive" : ""}`}
                    placeholder="ישראלית, מזרחית, היטים בינלאומיים..."
                  />
                  {errors.genres && <p className="text-sm text-destructive">{errors.genres}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="songs">שירים שחייבים להיות</Label>
                  <Textarea
                    id="songs"
                    name="songs"
                    rows={4}
                    maxLength={2000}
                    className={`bg-background resize-none ${errors.songs ? "border-destructive" : ""}`}
                    placeholder="רשמו שירים שאתם רוצים שיושמעו..."
                  />
                  {errors.songs && <p className="text-sm text-destructive">{errors.songs}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">הערות נוספות</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    maxLength={2000}
                    className={`bg-background resize-none ${errors.notes ? "border-destructive" : ""}`}
                  />
                  {errors.notes && <p className="text-sm text-destructive">{errors.notes}</p>}
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
