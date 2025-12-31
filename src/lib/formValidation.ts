import { z } from "zod";

// Contact form validation schema
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "שם חייב להכיל לפחות 2 תווים")
    .max(100, "שם יכול להכיל עד 100 תווים")
    .trim(),
  phone: z
    .string()
    .regex(/^[0-9\-+() ]{7,20}$/, "מספר טלפון לא תקין"),
  email: z
    .string()
    .email("כתובת אימייל לא תקינה")
    .max(255, "אימייל יכול להכיל עד 255 תווים")
    .optional()
    .or(z.literal("")),
  eventType: z
    .enum(["wedding", "birthday", "corporate", "other", ""])
    .optional(),
  eventDate: z.string().optional(),
  message: z
    .string()
    .max(2000, "הודעה יכולה להכיל עד 2000 תווים")
    .optional(),
});

// Wedding form validation schema
export const weddingSchema = z.object({
  brideName: z
    .string()
    .min(2, "שם חייב להכיל לפחות 2 תווים")
    .max(100, "שם יכול להכיל עד 100 תווים")
    .trim(),
  groomName: z
    .string()
    .min(2, "שם חייב להכיל לפחות 2 תווים")
    .max(100, "שם יכול להכיל עד 100 תווים")
    .trim(),
  phone: z
    .string()
    .regex(/^[0-9\-+() ]{7,20}$/, "מספר טלפון לא תקין"),
  eventDate: z.string().optional(),
  venue: z
    .string()
    .max(200, "מקום האירוע יכול להכיל עד 200 תווים")
    .optional(),
  genres: z
    .string()
    .max(500, "סגנונות מוזיקה יכולים להכיל עד 500 תווים")
    .optional(),
  songs: z
    .string()
    .max(2000, "רשימת שירים יכולה להכיל עד 2000 תווים")
    .optional(),
  notes: z
    .string()
    .max(2000, "הערות יכולות להכיל עד 2000 תווים")
    .optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type WeddingFormData = z.infer<typeof weddingSchema>;

// Rate limiting helper
const RATE_LIMIT_KEY = "lastFormSubmit";
const RATE_LIMIT_MS = 60000; // 1 minute

export function checkRateLimit(): { allowed: boolean; remainingSeconds: number } {
  const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
  const now = Date.now();

  if (lastSubmit) {
    const elapsed = now - parseInt(lastSubmit, 10);
    if (elapsed < RATE_LIMIT_MS) {
      return {
        allowed: false,
        remainingSeconds: Math.ceil((RATE_LIMIT_MS - elapsed) / 1000),
      };
    }
  }

  return { allowed: true, remainingSeconds: 0 };
}

export function recordSubmission(): void {
  localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
}
