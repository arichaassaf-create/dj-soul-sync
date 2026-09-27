// Case studies of real weddings. Template only: the /weddings page is added once there are
// at least 3 real entries, so the site never publishes an empty or invented page.
// Every field must be true and approved by the couple (especially names, quote and photos).

export interface CaseStudy {
  slug: string;
  /** Couple's first names, as they approved, e.g. "שיר ודניס". */
  couple: string;
  date: string; // YYYY-MM
  venue: string;
  area: string; // e.g. "השרון"
  /** Only if the real number is known. */
  guests?: number;
  eventType: "חתונה" | "חתונת שישי" | "חתונה באמצע שבוע" | "חתונה קטנה";
  musicStyles: string[];
  whatTheyAskedFor: string;
  challenge: string;
  howTheMusicWasBuilt: string;
  dancefloor: string;
  ceremonySongs?: { entrance?: string; glass?: string; slow?: string };
  /** Verbatim, with the couple's permission. */
  quote?: string;
  /** Link to their public review, if one exists. */
  reviewUrl?: string;
  photos?: { src: string; alt: string }[];
  videoUrl?: string;
  couplePermission: true;
}

export const caseStudies: CaseStudy[] = [];
