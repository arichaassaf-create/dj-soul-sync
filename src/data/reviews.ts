// Real reviews from Mit4Mit (https://www.mit4mit.co.il/biz/25035), copied verbatim on 2026-09-27.
// Excerpts are exact substrings of the original text. Never edit wording, never add reviews
// that do not exist on a public platform. Names appear exactly as shown on the source.

export interface Review {
  id: string;
  name: string;
  /** "תאריך קבלת השירות" as shown on Mit4Mit, when the reviewer filled it. */
  serviceDate?: string;
  excerpt: string;
  /** Facts the review supports, used to connect reviews to page topics. */
  topics: ("crowd" | "meeting" | "small" | "friday" | "midweek" | "mixed-ages" | "chuppah" | "late" | "prep")[];
  source: "mit4mit";
}

export const REVIEW_SOURCE_URL = "https://www.mit4mit.co.il/biz/25035";

export const reviews: Review[] = [
  {
    id: "lital",
    name: "ליטל",
    serviceDate: "29/08/2024",
    excerpt:
      "ידע לקרוא את הקהל ולהרים את האווירה בדיוק איך שצריך. כבר מהפגישה הראשונה היה ברור שהוא מבין עניין, ושהחתונה שלנו בידיים הכי טובות שיש.",
    topics: ["crowd", "meeting"],
    source: "mit4mit",
  },
  {
    id: "michal",
    name: "Michal",
    serviceDate: "15/11/2018",
    excerpt:
      "העזרה שקיבלנו ממנו בבחירת השירים לחופה ולסלואו היו קריטיים. אסף ישב איתנו קרוב לשלוש וחצי שעות בפגישת המוזיקה עד שמצאנו את השיר שגם אני וגם בן זוגי הסכמנו פה אחד.",
    topics: ["chuppah", "meeting", "small"],
    source: "mit4mit",
  },
  {
    id: "assaf-friday",
    name: "assaf",
    serviceDate: "25/08/2017",
    excerpt:
      "בחרנו להתחתן בחודשי הקיץ החמים במקום פתוח בשישי בצהריים. וכאן התחילו הבעיות כי היה חמסין באותו יום, 40 מעלות והאיש שהציל את החתונה וגרם לכמות של מעל 100 איש (מתוך 220) להישאר לשעות הלילה בלי להפסיק לרקוד לרגע זה אסף.",
    topics: ["friday", "crowd"],
    source: "mit4mit",
  },
  {
    id: "hen",
    name: "Hen",
    excerpt:
      "הרים וקרא את הרחבה בחתונה קטנה ככה שאנשים לא ישבו לרגע. מבחינת בן אדם מדובר בלב גדול. עזר ותמך בהחלטות לחתונה, הגיע למקום כמה ימים לפני כדי לוודא שיש לו מקום לכל הציוד",
    topics: ["small", "crowd", "prep"],
    source: "mit4mit",
  },
  {
    id: "keren",
    name: "KEREN",
    excerpt:
      "הרקדת את הדודות שלי שזה לא קל ונתת לנו בראש עם טראנסים עד 4 בבוקר ...מי היה מאמין..חתונת חורף ובאמצע שבוע",
    topics: ["mixed-ages", "midweek", "late"],
    source: "mit4mit",
  },
  {
    id: "lili-blash",
    name: "lili-blash",
    excerpt:
      "ישב איתנו פעמיים על פלייליסטים מושקעים. שאל מה אנחנו אוהבים ומה אין מצב שיהיה בחתונה.",
    topics: ["meeting"],
    source: "mit4mit",
  },
  {
    id: "dennis",
    name: "Dennis",
    excerpt:
      "חתונת חורף 180 מוזמנים שמתוכם היו 80 חברים שלנו ומאוד היה חשוב לנו שהחתונה תימשך עד מאוחר וכך היה. אסף העיף לנו את הרחבה עד השעה שתיים וחצי בלילה.",
    topics: ["late", "crowd"],
    source: "mit4mit",
  },
  {
    id: "gal",
    name: "Gal",
    serviceDate: "06/06/2017",
    excerpt:
      "אסף פגש אותנו מספר פעמים לפני החתונה וגם נתן לנו חומר להקשיב לו כדי שנוכל לייצר שפה משותפת ותיאום ציפיות.",
    topics: ["meeting", "prep"],
    source: "mit4mit",
  },
  {
    id: "hgafla",
    name: "hgafla",
    excerpt:
      "הדברים שהיו לנו חשובים בחתונתינו מבחינת המוזיקה הם, שכל האורחים שלנו יוכלו לשמוח, לרקוד ברחבה ושירגישו כחלק מהאירוע של חיינו. מהחבר'ה הצעירים ועד המבוגרים.",
    topics: ["mixed-ages", "crowd"],
    source: "mit4mit",
  },
  {
    id: "uri",
    name: "uri",
    excerpt:
      "בפגישת המוזיקה אסף השמיע לנו המון שירים שמתוכם בחרנו מה אנחנו אוהבים ואז ביום החתונה אסף הפציץ אותנו.... כולם רקדו אבל כולם....",
    topics: ["meeting", "crowd"],
    source: "mit4mit",
  },
  {
    id: "mali",
    name: "mali",
    excerpt:
      "הצליח לקלוע לטעם שלנו במדוייק וגם להגיד מה אנחנו לא אוהבים. החתונה היתה מושלמת והמון בזכות אסף. המוזיקה היתה מטורפת כולם רקדו הרבה מעבר למצופה (חתונה קטנה יום שני עד 3 בלילה)",
    topics: ["meeting", "small", "midweek", "late"],
    source: "mit4mit",
  },
  {
    id: "hagar",
    name: "Hagar",
    serviceDate: "26/08/2021",
    excerpt:
      "אין על אסף! הרים לנו את החתונה באוויר ועשה לנו ערב משוגע! מעבר לזה, היה זמין לנו לכל שאלה וסיוע (והוא סייע הרבה מעבר להיותו הדיג'יי).",
    topics: ["crowd", "prep"],
    source: "mit4mit",
  },
];

/** Verbatim sentence from lili-blash's review, used where the balance between couple and crowd is discussed. */
export const coupleVsCrowdQuote = {
  name: "lili-blash",
  text: "אסף דואג להתחשב ברצונות הזוג אבל גם חשוב לו שהקהל גם יהיה מרוצה",
};

export function reviewById(id: string) {
  const r = reviews.find((x) => x.id === id);
  if (!r) throw new Error(`Unknown review ${id}`);
  return r;
}
