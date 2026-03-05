import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { checkRateLimit, recordSubmission } from "@/lib/formValidation";
import { workshopSchema, buildWorkshopWhatsAppMessage } from "@/lib/workshopValidation";
import { Send, CheckCircle } from "lucide-react";

interface WorkshopFormProps {
  variant?: "default" | "aggressive";
}

export function WorkshopForm({ variant = "default" }: WorkshopFormProps) {
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
    const rawData = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      participantType: (formData.get("participant-type") as string) || "individual",
      experienceLevel: formData.get("experience-level") as string,
      musicGenres: formData.get("music-genres") as string,
    };

    const result = workshopSchema.safeParse(rawData);
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

    const { error } = await supabase.from("workshop_submissions").insert({
      name: result.data.name,
      phone: result.data.phone,
      participant_type: result.data.participantType,
      experience_level: result.data.experienceLevel || null,
      music_genres: result.data.musicGenres || null,
    });

    if (error && import.meta.env.DEV) {
      console.error("Error submitting workshop form:", error);
    }

    const whatsappMessage = buildWorkshopWhatsAppMessage(result.data);
    window.open(`https://wa.me/972505567078?text=${whatsappMessage}`, "_blank");

    recordSubmission();
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "הפרטים נשלחו בהצלחה!",
      description: "נחזור אליך לתיאום הסדנה.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">תודה רבה!</h3>
        <p className="text-muted-foreground mb-6">
          קיבלנו את הפרטים שלך ונחזור אליך בהקדם לתיאום הסדנה.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          שליחת טופס נוסף
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ws-name">שם מלא *</Label>
          <Input
            id="ws-name"
            name="name"
            required
            maxLength={100}
            placeholder="הכניסו את שמכם"
            className={`bg-background ${errors.name ? "border-destructive" : ""}`}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="ws-phone">טלפון *</Label>
          <Input
            id="ws-phone"
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
          <Label htmlFor="ws-type">יחיד או זוג? *</Label>
          <select
            id="ws-type"
            name="participant-type"
            className="w-full h-11 px-3 py-2 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="individual">יחיד</option>
            <option value="couple">זוג</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="ws-experience">רמת ניסיון</Label>
          <select
            id="ws-experience"
            name="experience-level"
            className="w-full h-11 px-3 py-2 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">בחרו רמה</option>
            <option value="beginner">מתחיל מאפס</option>
            <option value="some">קצת ניסיון</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ws-genres">סגנונות מוזיקה אהובים</Label>
        <Input
          id="ws-genres"
          name="music-genres"
          maxLength={500}
          placeholder="למשל: האוס, היפ-הופ, טראנס, מזרחית..."
          className="bg-background"
        />
      </div>

      <Button
        type="submit"
        variant={variant === "aggressive" ? "cta" : "hero"}
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          "שולח..."
        ) : (
          <>
            <Send className="h-5 w-5" />
            {variant === "aggressive" ? "אני רוצה ללמוד לתקלט!" : "לתיאום סדנה"}
          </>
        )}
      </Button>
    </form>
  );
}
