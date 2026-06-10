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
import { redirectToWhatsApp } from "@/lib/whatsappRedirect";
import { sendFormEmail } from "@/lib/sendFormEmail";
import { SongPickerField } from "@/components/SongPickerField";
import {
  chuppahEntranceSongs,
  glassBreakingSongs,
  slowDanceSongs,
} from "@/data/weddingSongs";

function buildWhatsAppMessage(data: {
  brideName: string;
  groomName: string;
  phone: string;
  eventDate?: string;
  venue?: string;
  entrySong?: string;
  entrySongLink?: string;
  glassSong?: string;
  glassSongLink?: string;
  slowSong?: string;
  slowSongLink?: string;
  genres?: string;
  songs?: string;
  notes?: string;
}): string {
  let msg = `*שאלון חתונה חדש מהאתר* 🎧\n\n`;
  msg += `*כלה:* ${data.brideName}\n`;
  msg += `*חתן:* ${data.groomName}\n`;
  msg += `*טלפון:* ${data.phone}\n`;
  if (data.eventDate) msg += `*תאריך:* ${data.eventDate}\n`;
  if (data.venue) msg += `*מקום:* ${data.venue}\n`;

  if (data.entrySong) {
    msg += `\n🎵 *שיר כניסה לחופה:*\n${data.entrySong}`;
    if (data.entrySongLink) msg += `\n${data.entrySongLink}`;
    msg += "\n";
  }
  if (data.glassSong) {
    msg += `\n🥂 *שיר לשבירת הכוס:*\n${data.glassSong}`;
    if (data.glassSongLink) msg += `\n${data.glassSongLink}`;
    msg += "\n";
  }
  if (data.slowSong) {
    msg += `\n💃🕺 *שיר סלואו:*\n${data.slowSong}`;
    if (data.slowSongLink) msg += `\n${data.slowSongLink}`;
    msg += "\n";
  }
  if (data.genres) msg += `\n🎶 *סגנונות מוזיקה:*\n${data.genres}\n`;
  if (data.songs) msg += `\n✅ *שירים שחייבים להיות:*\n${data.songs}\n`;
  if (data.notes) msg += `\n📝 *הערות נוספות:*\n${data.notes}`;
  return encodeURIComponent(msg);
}

export default function WeddingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

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

    // Collect link fields separately (not in schema)
    const entrySongLink = (formData.get("entrySongLink") as string) || "";
    const glassSongLink = (formData.get("glassSongLink") as string) || "";
    const slowSongLink = (formData.get("slowSongLink") as string) || "";

    const rawData = {
      brideName: formData.get("bride") as string,
      groomName: formData.get("groom") as string,
      phone: formData.get("phone") as string,
      eventDate: formData.get("date") as string,
      venue: formData.get("venue") as string,
      entrySong: formData.get("entrySong") as string,
      glassSong: formData.get("glassSong") as string,
      slowSong: formData.get("slowSong") as string,
      genres: formData.get("genres") as string,
      songs: formData.get("songs") as string,
      notes: formData.get("notes") as string,
    };

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

    // Combine specific songs for DB storage (no schema change needed)
    const songParts: string[] = [];
    if (result.data.entrySong) {
      songParts.push(
        `שיר כניסה לחופה: ${result.data.entrySong}${entrySongLink ? ` (${entrySongLink})` : ""}`
      );
    }
    if (result.data.glassSong) {
      songParts.push(
        `שיר לשבירת הכוס: ${result.data.glassSong}${glassSongLink ? ` (${glassSongLink})` : ""}`
      );
    }
    if (result.data.slowSong) {
      songParts.push(
        `שיר סלואו: ${result.data.slowSong}${slowSongLink ? ` (${slowSongLink})` : ""}`
      );
    }
    if (result.data.songs) songParts.push(result.data.songs);

    const { error } = await supabase.from("wedding_submissions").insert({
      bride_name: result.data.brideName,
      groom_name: result.data.groomName,
      phone: result.data.phone,
      event_date: result.data.eventDate || null,
      venue: result.data.venue || null,
      music_genres: result.data.genres
        ? result.data.genres.split(",").map((g) => g.trim())
        : null,
      favorite_songs: songParts.length > 0 ? songParts.join("\n") : null,
      notes: result.data.notes || null,
    });

    if (error && import.meta.env.DEV) {
      console.error("Error submitting wedding form:", error);
    }

    sendFormEmail("wedding", {
      "שם-הכלה": result.data.brideName,
      "שם-החתן": result.data.groomName,
      "טלפון": result.data.phone,
      "תאריך-החתונה": result.data.eventDate || undefined,
      "מקום-האירוע": result.data.venue || undefined,
      "שיר-כניסה-לחופה": result.data.entrySong || undefined,
      "קישור-כניסה": entrySongLink || undefined,
      "שיר-לשבירת-הכוס": result.data.glassSong || undefined,
      "קישור-שבירת-כוס": glassSongLink || undefined,
      "שיר-סלואו": result.data.slowSong || undefined,
      "קישור-סלואו": slowSongLink || undefined,
      "סגנונות-מוזיקה": result.data.genres || undefined,
      "שירים-מועדפים": result.data.songs || undefined,
      "הערות": result.data.notes || undefined,
    });

    const whatsappMessage = buildWhatsAppMessage({
      brideName: result.data.brideName,
      groomName: result.data.groomName,
      phone: result.data.phone,
      eventDate: result.data.eventDate,
      venue: result.data.venue,
      entrySong: result.data.entrySong,
      entrySongLink,
      glassSong: result.data.glassSong,
      glassSongLink,
      slowSong: result.data.slowSong,
      slowSongLink,
      genres: result.data.genres,
      songs: result.data.songs,
      notes: result.data.notes,
    });

    redirectToWhatsApp(whatsappMessage, "wedding", "Lead");

    recordSubmission();
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "השאלון נשלח בהצלחה!",
      description: "הפרטים נשלחו ל-WhatsApp.",
    });
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
              <li>
                <Link to="/" className="hover:text-primary">
                  בית
                </Link>
              </li>
              <li>/</li>
              <li className="text-primary">שאלון חתונה</li>
            </ol>
          </nav>

          {/* Warm intro card */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-10">
            <p className="text-lg font-semibold mb-3">היי אהובים ❤️</p>
            <p className="text-muted-foreground leading-relaxed">
              לקראת פגישת המוזיקה שלנו, אשמח אם תחשבו מראש על כמה דברים. מלאו כמה שיותר, לא חייב הכל:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                🎵 <strong className="text-foreground">שיר כניסה לחופה</strong> – מה השיר שתרצו להיכנס אליו?
              </li>
              <li>
                🥂 <strong className="text-foreground">שיר לשבירת הכוס</strong> – שיר מיוחד לסיום החופה?
              </li>
              <li>
                💃🕺 <strong className="text-foreground">שיר סלואו</strong> – יש לכם שיר שאתם רוצים לרקוד יחד?
              </li>
              <li>
                🎶 <strong className="text-foreground">סגנונות מוזיקה</strong> שאתם אוהבים במיוחד
              </li>
              <li>
                ✅ <strong className="text-foreground">שירים שחייבים להיות</strong> בתוכנית
              </li>
            </ul>
            <p className="mt-5 text-sm text-muted-foreground/80 italic border-t border-border/30 pt-4">
              אם עדיין אין לכם בחירות סופיות, אין שום בעיה. בפגישה נעבור יחד על רעיונות ונבנה יחד את
              פלייליסט החלומות שלכם ❤️
            </p>
            <p className="mt-2 text-sm font-medium text-primary">— די ג'יי אסף אריכא 🎧🎵</p>
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-10">
            <span className="text-gradient-gold">שאלון מוזיקה</span> לחתונה
          </h1>

          <div className="bg-card rounded-2xl p-8 border border-border/50">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">תודה רבה! ❤️</h3>
                <p className="text-muted-foreground">קיבלתי את הפרטים ואצור קשר בקרוב.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Names */}
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
                    {errors.brideName && (
                      <p className="text-sm text-destructive">{errors.brideName}</p>
                    )}
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
                    {errors.groomName && (
                      <p className="text-sm text-destructive">{errors.groomName}</p>
                    )}
                  </div>
                </div>

                {/* Phone + Date */}
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
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">תאריך החתונה</Label>
                    <Input
                      id="date"
                      name="date"
                      type="text"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="לדוגמה: 15/08/2025"
                      className="bg-background"
                    />
                  </div>
                </div>

                {/* Venue */}
                <div className="space-y-2">
                  <Label htmlFor="venue">מקום האירוע</Label>
                  <Input
                    id="venue"
                    name="venue"
                    maxLength={200}
                    className={`bg-background ${errors.venue ? "border-destructive" : ""}`}
                  />
                  {errors.venue && (
                    <p className="text-sm text-destructive">{errors.venue}</p>
                  )}
                </div>

                {/* Special songs section */}
                <div className="border-t border-border/40 pt-6 space-y-5">
                  <p className="text-sm font-medium text-muted-foreground">🎵 שירים לרגעים המיוחדים</p>
                  <p className="text-xs text-muted-foreground -mt-3">
                    בחרו שיר מהרשימה או הקלידו שיר משלכם. לאחר הבחירה תוכלו לשמוע ב-YouTube ולהדביק קישור.
                  </p>

                  <SongPickerField
                    name="entrySong"
                    label="שיר כניסה לחופה 🎵"
                    placeholder="בחרו שיר לכניסה לחופה..."
                    songs={chuppahEntranceSongs}
                  />

                  <SongPickerField
                    name="glassSong"
                    label="שיר לשבירת הכוס 🥂"
                    placeholder="בחרו שיר לסיום החופה..."
                    songs={glassBreakingSongs}
                  />

                  <SongPickerField
                    name="slowSong"
                    label="שיר סלואו 💃🕺"
                    placeholder="בחרו שיר לריקוד זוגי..."
                    songs={slowDanceSongs}
                  />
                </div>

                {/* Genres */}
                <div className="space-y-2">
                  <Label htmlFor="genres">סגנונות מוזיקה אהובים</Label>
                  <Textarea
                    id="genres"
                    name="genres"
                    maxLength={500}
                    className={`bg-background resize-none ${errors.genres ? "border-destructive" : ""}`}
                    placeholder="מזרחית, ישראלי, לועזי, שנות 80/90, האוס, טראנס, רגאטון..."
                  />
                  <p className="text-xs text-muted-foreground">
                    אם עדיין לא בטוחים, אין בעיה, נחליט ביחד בפגישה
                  </p>
                  {errors.genres && (
                    <p className="text-sm text-destructive">{errors.genres}</p>
                  )}
                </div>

                {/* Must-play songs */}
                <div className="space-y-2">
                  <Label htmlFor="songs">שירים שחייבים להיות</Label>
                  <Textarea
                    id="songs"
                    name="songs"
                    rows={4}
                    maxLength={2000}
                    className={`bg-background resize-none ${errors.songs ? "border-destructive" : ""}`}
                    placeholder="שירים שאתם חייבים לשמוע בחתונה..."
                  />
                  {errors.songs && (
                    <p className="text-sm text-destructive">{errors.songs}</p>
                  )}
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">הערות נוספות</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    maxLength={2000}
                    placeholder="שירים שממש לא תרצו לשמוע, בקשות מיוחדות עבור המשפחה, כל מידע נוסף..."
                    className={`bg-background resize-none ${errors.notes ? "border-destructive" : ""}`}
                  />
                  {errors.notes && (
                    <p className="text-sm text-destructive">{errors.notes}</p>
                  )}
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
                      <Send className="h-5 w-5 ml-2" /> שליחה
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
