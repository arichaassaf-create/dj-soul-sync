import { z } from "zod";

export const workshopSchema = z.object({
  name: z
    .string()
    .min(2, "שם חייב להכיל לפחות 2 תווים")
    .max(100, "שם יכול להכיל עד 100 תווים")
    .trim(),
  phone: z
    .string()
    .regex(/^[0-9\-+() ]{7,20}$/, "מספר טלפון לא תקין"),
  participantType: z.enum(["individual", "couple"]),
  experienceLevel: z
    .string()
    .max(100, "רמת ניסיון יכולה להכיל עד 100 תווים")
    .optional(),
  musicGenres: z
    .string()
    .max(500, "סגנונות מוזיקה יכולים להכיל עד 500 תווים")
    .optional(),
});

export type WorkshopFormData = z.infer<typeof workshopSchema>;

const PARTICIPANT_LABELS: Record<string, string> = {
  individual: "יחיד",
  couple: "זוג",
};

const EXPERIENCE_LABELS: Record<string, string> = {
  beginner: "מתחיל מאפס",
  some: "קצת ניסיון",
};

export function buildWorkshopWhatsAppMessage(data: WorkshopFormData): string {
  let msg = `*פנייה חדשה - סדנת DJ*\n\n`;
  msg += `*שם:* ${data.name}\n`;
  msg += `*טלפון:* ${data.phone}\n`;
  msg += `*סוג:* ${PARTICIPANT_LABELS[data.participantType] || data.participantType}\n`;
  if (data.experienceLevel) {
    msg += `*רמת ניסיון:* ${EXPERIENCE_LABELS[data.experienceLevel] || data.experienceLevel}\n`;
  }
  if (data.musicGenres) {
    msg += `*סגנונות מוזיקה:* ${data.musicGenres}\n`;
  }
  return encodeURIComponent(msg);
}
