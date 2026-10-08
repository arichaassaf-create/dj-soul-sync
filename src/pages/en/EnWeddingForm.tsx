import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/SEO";
import { EnLayout } from "@/components/EnLayout";
import { Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { weddingSchema, checkRateLimit, recordSubmission } from "@/lib/formValidation";
import { redirectToWhatsApp } from "@/lib/whatsappRedirect";
import { sendFormEmail } from "@/lib/sendFormEmail";
import { trackWeddingFormSubmit } from "@/lib/analytics";
import { SongPickerField } from "@/components/SongPickerField";
import { chuppahEntranceSongs, glassBreakingSongs, slowDanceSongs } from "@/data/weddingSongs";

// weddingSchema carries Hebrew messages; the English form shows its own per field.
const EN_ERRORS: Record<string, string> = {
  brideName: "Please enter at least 2 characters.",
  groomName: "Please enter at least 2 characters.",
  phone: "Please enter a valid phone number, e.g. +1 212 555 0123.",
  venue: "Up to 200 characters.",
  genres: "Up to 500 characters.",
  songs: "Up to 2,000 characters.",
  notes: "Up to 2,000 characters.",
};

interface FormValues {
  name1: string;
  name2: string;
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
}

function buildWhatsAppMessage(d: FormValues): string {
  let msg = `*New wedding questionnaire from the website (English)* 🎧\n\n`;
  msg += `*Names:* ${d.name1} & ${d.name2}\n`;
  msg += `*Phone:* ${d.phone}\n`;
  if (d.eventDate) msg += `*Date:* ${d.eventDate}\n`;
  if (d.venue) msg += `*Venue / city:* ${d.venue}\n`;
  const song = (label: string, value?: string, link?: string) =>
    value ? `\n${label}\n${value}${link ? `\n${link}` : ""}\n` : "";
  msg += song("🎵 *Chuppah entrance song:*", d.entrySong, d.entrySongLink);
  msg += song("🥂 *Breaking the glass song:*", d.glassSong, d.glassSongLink);
  msg += song("💃🕺 *First dance / slow song:*", d.slowSong, d.slowSongLink);
  if (d.genres) msg += `\n🎶 *Music styles:*\n${d.genres}\n`;
  if (d.songs) msg += `\n✅ *Must-play songs:*\n${d.songs}\n`;
  if (d.notes) msg += `\n📝 *Notes:*\n${d.notes}`;
  return encodeURIComponent(msg);
}

export default function EnWeddingForm() {
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
        title: "Please wait",
        description: `You can send another form in ${remainingSeconds} seconds.`,
        variant: "destructive",
      });
      return;
    }

    const fd = new FormData(e.currentTarget);
    const entrySongLink = (fd.get("entrySongLink") as string) || "";
    const glassSongLink = (fd.get("glassSongLink") as string) || "";
    const slowSongLink = (fd.get("slowSongLink") as string) || "";

    const result = weddingSchema.safeParse({
      brideName: fd.get("name1") as string,
      groomName: fd.get("name2") as string,
      phone: fd.get("phone") as string,
      eventDate: fd.get("date") as string,
      venue: fd.get("venue") as string,
      entrySong: fd.get("entrySong") as string,
      glassSong: fd.get("glassSong") as string,
      slowSong: fd.get("slowSong") as string,
      genres: fd.get("genres") as string,
      songs: fd.get("songs") as string,
      notes: fd.get("notes") as string,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as string;
        if (key) fieldErrors[key] = EN_ERRORS[key] || "Please check this field.";
      });
      setErrors(fieldErrors);
      toast({ title: "Please check the form", description: "Some fields need a quick fix.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    const d = result.data;

    const songParts: string[] = [];
    if (d.entrySong) songParts.push(`Chuppah entrance: ${d.entrySong}${entrySongLink ? ` (${entrySongLink})` : ""}`);
    if (d.glassSong) songParts.push(`Breaking the glass: ${d.glassSong}${glassSongLink ? ` (${glassSongLink})` : ""}`);
    if (d.slowSong) songParts.push(`First dance / slow: ${d.slowSong}${slowSongLink ? ` (${slowSongLink})` : ""}`);
    if (d.songs) songParts.push(d.songs);

    const { error } = await supabase.from("wedding_submissions").insert({
      bride_name: d.brideName,
      groom_name: d.groomName,
      phone: d.phone,
      event_date: d.eventDate || null,
      venue: d.venue || null,
      music_genres: d.genres ? d.genres.split(",").map((g) => g.trim()) : null,
      favorite_songs: songParts.length > 0 ? songParts.join("\n") : null,
      notes: `[English form] ${d.notes || ""}`.trim(),
    });
    if (error && import.meta.env.DEV) console.error("Error submitting wedding form:", error);

    // Same Netlify form and field names as the Hebrew questionnaire, so the email arrives in the same format.
    sendFormEmail("wedding", {
      "שפה": "English",
      "שם-הכלה": d.brideName,
      "שם-החתן": d.groomName,
      "טלפון": d.phone,
      "תאריך-החתונה": d.eventDate || undefined,
      "מקום-האירוע": d.venue || undefined,
      "שיר-כניסה-לחופה": d.entrySong || undefined,
      "קישור-כניסה": entrySongLink || undefined,
      "שיר-לשבירת-הכוס": d.glassSong || undefined,
      "קישור-שבירת-כוס": glassSongLink || undefined,
      "שיר-סלואו": d.slowSong || undefined,
      "קישור-סלואו": slowSongLink || undefined,
      "סגנונות-מוזיקה": d.genres || undefined,
      "שירים-מועדפים": d.songs || undefined,
      "הערות": d.notes || undefined,
    });

    redirectToWhatsApp(
      buildWhatsAppMessage({
        name1: d.brideName,
        name2: d.groomName,
        phone: d.phone,
        eventDate: d.eventDate,
        venue: d.venue,
        entrySong: d.entrySong,
        entrySongLink,
        glassSong: d.glassSong,
        glassSongLink,
        slowSong: d.slowSong,
        slowSongLink,
        genres: d.genres,
        songs: d.songs,
        notes: d.notes,
      }),
      "wedding_en",
      "Lead"
    );

    trackWeddingFormSubmit();
    recordSubmission();
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({ title: "Questionnaire sent!", description: "Your details were sent to Assaf on WhatsApp." });
  };

  const err = (k: string) => (errors[k] ? <p className="text-sm text-destructive">{errors[k]}</p> : null);

  return (
    <EnLayout>
      <SEO
        lang="en"
        title="Wedding Music Questionnaire | DJ Assaf Aricha"
        description="Fill in the wedding music questionnaire: chuppah entrance song, breaking the glass, first dance and the styles you love, so we can plan your perfect playlist."
        canonicalUrl="/en/wedding-form"
        alternates={[
          { hrefLang: "en", path: "/en/wedding-form" },
          { hrefLang: "he", path: "/wedding-form" },
        ]}
        breadcrumbs={[
          { name: "English", path: "/en" },
          { name: "Wedding questionnaire", path: "/en/wedding-form" },
        ]}
      />

      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container-custom max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/en" className="hover:text-primary">Home</Link> <span aria-hidden="true">/</span>{" "}
            <span className="text-primary">Wedding questionnaire</span>
          </nav>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-10">
            <p className="text-lg font-semibold mb-3">Hi there ❤️</p>
            <p className="text-muted-foreground leading-relaxed">
              Before our music meeting, it would be great if you could think about a few things in advance. Fill in as much
              as you can, you don't have to answer everything:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>🎵 <strong className="text-foreground">Chuppah entrance song</strong>: which song do you want to walk in to?</li>
              <li>🥂 <strong className="text-foreground">Breaking the glass</strong>: a special song to close the ceremony?</li>
              <li>💃🕺 <strong className="text-foreground">First dance / slow song</strong>: is there a song you want to dance to together?</li>
              <li>🎶 <strong className="text-foreground">Music styles</strong> you especially love</li>
              <li>✅ <strong className="text-foreground">Must-play songs</strong> for the night</li>
            </ul>
            <p className="mt-5 text-sm text-muted-foreground/80 italic border-t border-border/30 pt-4">
              If you don't have final choices yet, that's completely fine. In our meeting we'll go through ideas together
              and build the playlist of your dreams ❤️
            </p>
            <p className="mt-2 text-sm font-medium text-primary">DJ Assaf Aricha 🎧🎵</p>
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-10">
            Wedding <span className="text-gradient-gold">Music Questionnaire</span>
          </h1>

          <div className="bg-card rounded-2xl p-8 border border-border/50">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold mb-2">Thank you! ❤️</h2>
                <p className="text-muted-foreground">I got your details and will be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name1">Your name *</Label>
                    <Input id="name1" name="name1" required maxLength={100} autoComplete="name"
                      className={`bg-background ${errors.brideName ? "border-destructive" : ""}`} />
                    {err("brideName")}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name2">Your partner's name *</Label>
                    <Input id="name2" name="name2" required maxLength={100}
                      className={`bg-background ${errors.groomName ? "border-destructive" : ""}`} />
                    {err("groomName")}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone / WhatsApp *</Label>
                    <Input id="phone" name="phone" type="tel" required maxLength={20} autoComplete="tel" dir="ltr"
                      placeholder="+1 212 555 0123"
                      className={`bg-background ${errors.phone ? "border-destructive" : ""}`} />
                    {err("phone")}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Wedding date</Label>
                    <Input id="date" name="date" type="text" maxLength={30} placeholder="e.g. June 14, 2027" className="bg-background" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue">Venue or city</Label>
                  <Input id="venue" name="venue" maxLength={200} placeholder="e.g. a venue in Tel Aviv, or New York"
                    className={`bg-background ${errors.venue ? "border-destructive" : ""}`} />
                  {err("venue")}
                </div>

                <div className="border-t border-border/40 pt-6 space-y-5">
                  <p className="text-sm font-medium text-muted-foreground">🎵 Songs for the special moments</p>
                  <p className="text-xs text-muted-foreground -mt-3">
                    Choose a song from the list or type your own. After choosing, you can listen on YouTube and paste a link.
                  </p>
                  <SongPickerField lang="en" name="entrySong" label="Chuppah entrance song 🎵"
                    placeholder="Choose a song for walking to the chuppah..." songs={chuppahEntranceSongs} />
                  <SongPickerField lang="en" name="glassSong" label="Breaking the glass 🥂"
                    placeholder="Choose a song to close the ceremony..." songs={glassBreakingSongs} />
                  <SongPickerField lang="en" name="slowSong" label="First dance / slow song 💃🕺"
                    placeholder="Choose a song to dance to together..." songs={slowDanceSongs} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="genres">Music styles you love</Label>
                  <Textarea id="genres" name="genres" maxLength={500}
                    className={`bg-background resize-none ${errors.genres ? "border-destructive" : ""}`}
                    placeholder="Mizrahi, Israeli, international, 80s/90s, house, trance, reggaeton..." />
                  <p className="text-xs text-muted-foreground">Not sure yet? No problem, we'll decide together in the meeting.</p>
                  {err("genres")}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="songs">Must-play songs</Label>
                  <Textarea id="songs" name="songs" rows={4} maxLength={2000}
                    className={`bg-background resize-none ${errors.songs ? "border-destructive" : ""}`}
                    placeholder="Songs you absolutely want to hear at your wedding..." />
                  {err("songs")}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Anything else</Label>
                  <Textarea id="notes" name="notes" maxLength={2000}
                    className={`bg-background resize-none ${errors.notes ? "border-destructive" : ""}`}
                    placeholder="Songs you really don't want to hear, special requests for family, anything else..." />
                  {err("notes")}
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : <><Send className="h-5 w-5 mr-2" aria-hidden="true" /> Send</>}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </EnLayout>
  );
}
