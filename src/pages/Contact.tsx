import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Phone, MapPin, MessageCircle, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { contactSchema, checkRateLimit, recordSubmission } from "@/lib/formValidation";
import { redirectToWhatsApp } from "@/lib/whatsappRedirect";
import { sendFormEmail } from "@/lib/sendFormEmail";

const EVENT_TYPE_LABELS: Record<string, string> = {
  wedding: "חתונה",
  birthday: "יום הולדת",
  corporate: "אירוע חברה",
  other: "אחר",
};

function buildWhatsAppMessage(data: {
  name: string;
  phone: string;
  eventType?: string;
  eventDate?: string;
  message?: string;
}): string {
  let msg = `*פנייה חדשה מהאתר*\n\n`;
  msg += `*שם:* ${data.name}\n`;
  msg += `*טלפון:* ${data.phone}\n`;
  if (data.eventType) {
    msg += `*סוג אירוע:* ${EVENT_TYPE_LABELS[data.eventType] || data.eventType}\n`;
  }
  if (data.eventDate) {
    msg += `*תאריך:* ${data.eventDate}\n`;
  }
  if (data.message) {
    msg += `\n*הודעה:*\n${data.message}`;
  }
  return encodeURIComponent(msg);
}

export default function Contact() {
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
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: "", // No longer collecting email in form
      eventType: formData.get("event-type") as string,
      eventDate: formData.get("event-date") as string,
      message: formData.get("message") as string,
    };

    // Validate with zod
    const result = contactSchema.safeParse(rawData);
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

    // Save to database
    const { error } = await supabase.from("contact_submissions").insert({
      name: result.data.name,
      phone: result.data.phone,
      email: null,
      event_type: result.data.eventType || null,
      event_date: result.data.eventDate || null,
      message: result.data.message || null,
    });

    if (error) {
      if (import.meta.env.DEV) {
        console.error("Error submitting contact form:", error);
      }
    }

    // Build WhatsApp message and redirect via interstitial page
    const whatsappMessage = buildWhatsAppMessage({
      name: result.data.name,
      phone: result.data.phone,
      eventType: result.data.eventType,
      eventDate: result.data.eventDate,
      message: result.data.message,
    });

    redirectToWhatsApp(whatsappMessage, "contact");

    // Record successful submission for rate limiting
    recordSubmission();
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "הטופס נשלח בהצלחה!",
      description: "הפרטים נשלחו ל-WhatsApp.",
    });
  };

  return (
    <Layout>
      <SEO
        title="צור קשר | די ג'יי אסף אריכא"
        description="צרו קשר עם די ג'יי אסף אריכא לקבלת הצעת מחיר לחתונה, מסיבה פרטית או אירוע חברה. טלפון: 050-5567078"
        canonicalUrl="https://dj-assaf-aricha.co.il/contact"
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-dark-surface">
        <div className="container-custom">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">בית</Link></li>
              <li>/</li>
              <li className="text-primary">צור קשר</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              <span className="text-gradient-gold">צרו קשר</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              מלאו פרטים ואחזור אליכם עם הצעת מחיר. אפשר גם להתקשר או לשלוח הודעה ב-WhatsApp!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <div>
              <div className="bg-card rounded-2xl p-8 border border-border/50">
                <h2 className="text-2xl font-heading font-bold mb-6">השאירו פרטים</h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">תודה רבה!</h3>
                    <p className="text-muted-foreground mb-6">
                      קיבלנו את הפרטים שלכם ונחזור אליכם בהקדם.
                    </p>
                    <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                      שליחת טופס נוסף
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">שם מלא *</Label>
                        <Input
                          id="name"
                          name="name"
                          required
                          maxLength={100}
                          placeholder="הכניסו את שמכם"
                          className={`bg-background ${errors.name ? "border-destructive" : ""}`}
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">טלפון *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          maxLength={20}
                          placeholder="050-0000000"
                          className={`bg-background ${errors.phone ? "border-destructive" : ""}`}
                        />
                        {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="event-type">סוג האירוע</Label>
                        <select
                          id="event-type"
                          name="event-type"
                          className="w-full h-11 px-3 py-2 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="">בחרו סוג אירוע</option>
                          <option value="wedding">חתונה</option>
                          <option value="birthday">יום הולדת</option>
                          <option value="corporate">אירוע חברה</option>
                          <option value="other">אחר</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="event-date">תאריך משוער</Label>
                        <Input
                          id="event-date"
                          name="event-date"
                          type="date"
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">הודעה</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        maxLength={2000}
                        placeholder="ספרו לי קצת על האירוע שלכם..."
                        className={`bg-background resize-none ${errors.message ? "border-destructive" : ""}`}
                      />
                      {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "שולח..."
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          שליחה
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-heading font-bold mb-6">דרכים נוספות ליצור קשר</h2>
                <p className="text-muted-foreground mb-8">
                  אתם מוזמנים להתקשר או לשלוח הודעה ב-WhatsApp. אני זמין כמעט תמיד ואשמח לענות על כל שאלה.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="tel:0505567078"
                  className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50 hover:border-primary/50 transition-all card-hover"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold">טלפון</div>
                    <div className="text-muted-foreground">050-5567078</div>
                  </div>
                </a>

                <a
                  href="tel:0722333322"
                  className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50 hover:border-primary/50 transition-all card-hover"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold">טלפון משרד</div>
                    <div className="text-muted-foreground">07-22-3333-22</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/972505567078?text=היי%20אסף%2C%20אשמח%20לפרטים%20על%20DJ%20לאירוע"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50 hover:border-primary/50 transition-all card-hover"
                >
                  <div className="w-12 h-12 bg-[hsl(142,70%,40%)]/10 rounded-xl flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-[hsl(142,70%,40%)]" />
                  </div>
                  <div>
                    <div className="font-bold">WhatsApp</div>
                    <div className="text-muted-foreground">שלחו הודעה עכשיו</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold">מיקום</div>
                    <div className="text-muted-foreground">כרמי יוסף, ישראל</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
