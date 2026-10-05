// English content for US couples. Facts confirmed by Assaf (06/10/2026): weddings in Israel and in
// the US, fluent English, planning over Zoom, experience with couples from abroad and English-speaking crowds.
// Review quotes are faithful translations of the Hebrew originals in reviews.ts, always labeled as translated.

import { reviewById, REVIEW_SOURCE_URL } from "./reviews";
import type { FaqItem } from "./faq";

export interface TranslatedReview {
  id: string;
  name: string;
  serviceDate?: string;
  text: string;
  sourceUrl: string;
}

const translations: Record<string, string> = {
  lital:
    "He knew how to read the crowd and lift the atmosphere exactly as needed. From the very first meeting it was clear he knows his stuff, and that our wedding was in the best hands possible.",
  michal:
    "The help we got from him choosing the songs for the chuppah and the slow dance was critical. Assaf sat with us for close to three and a half hours in the music meeting, until we found the song we both agreed on.",
  hgafla:
    "What mattered to us musically was that all of our guests could celebrate, dance and feel part of the biggest event of our lives, from the young crowd to the older guests.",
  keren:
    "You got my aunts dancing, which is not easy, and gave us trance until 4 a.m. Who would have believed it, a winter wedding in the middle of the week.",
  "assaf-friday":
    "We got married in the hot summer months at an outdoor venue on a Friday afternoon. There was a heat wave that day, 40°C (104°F), and the man who saved the wedding and kept more than 100 of our 220 guests dancing nonstop into the night was Assaf.",
};

export function translatedReview(id: keyof typeof translations): TranslatedReview {
  const r = reviewById(id);
  return { id, name: r.name, serviceDate: r.serviceDate, text: translations[id], sourceUrl: REVIEW_SOURCE_URL };
}

export const enHomeFaq: FaqItem[] = [
  {
    q: "Do you DJ weddings in Israel for couples who live in the US?",
    a: "Yes. A large part of my work is with couples who plan their wedding in Israel from abroad. We plan everything remotely over Zoom and WhatsApp, and I take care of the music on the day so you can enjoy it.",
  },
  {
    q: "Will you travel to the United States for our wedding?",
    a: "Yes. I DJ weddings in the US as well. Send me your date and location and I'll come back with availability and a quote that includes travel.",
  },
  {
    q: "Can we do the music meeting in English?",
    a: "Yes. I speak fluent English and hold music meetings over Zoom, so you can plan before you even land in Israel. If one of you or your family prefers Hebrew, we can switch at any point.",
  },
  {
    q: "Our guests are half Israeli and half American. Can one DJ work for both?",
    a: "That is exactly what reading the room is about. I balance Israeli and Mizrahi hits with the American and international songs your guests know, and adjust the mix on the dance floor in real time, so both sides of the family end up dancing together.",
  },
  {
    q: "What music do you play?",
    a: "Israeli, Mizrahi, international pop, 80s and 90s, house, trance and reggaeton, plus classics from the 1940s to today's hits. The mix is built around your taste and your guests.",
  },
  {
    q: "How far ahead should we book?",
    a: "6 to 12 months ahead is recommended, especially for the busy Israeli wedding season (April to October) and for weddings in the US that involve travel.",
  },
];

export const enIsraelFaq: FaqItem[] = [
  {
    q: "We live in the US. How do we plan the music without being in Israel?",
    a: "We start with a short intro call, then hold the full music meeting over Zoom. I play you options and we build the playlist together, including the songs you want and the ones you don't. We stay in touch on WhatsApp until the wedding.",
  },
  {
    q: "Where in Israel do you work?",
    a: "I'm based in central Israel and DJ weddings in Tel Aviv, the Sharon area and the center, and across the country on request. Send me your venue and date and I'll confirm availability.",
  },
  {
    q: "Many Israeli weddings are on Friday afternoons or weekday evenings. Do you do those?",
    a: "Yes. Couples have written about Friday afternoon weddings in the summer heat and midweek winter weddings that kept going until 3 or 4 a.m. Each format needs its own pacing, and we plan for it in advance.",
  },
  {
    q: "Can we choose our chuppah and glass-breaking songs?",
    a: "Of course. We choose the chuppah entrance song, the song for breaking the glass and your first dance together. If you're unsure, I'll play you options until you find the one you both love.",
  },
  {
    q: "Can we give you a do-not-play list?",
    a: "Yes. We go over what you love and what you absolutely don't want to hear, and that list is respected all night.",
  },
  {
    q: "What's included?",
    a: "An intro call, a music meeting and a personal playlist, running the music from the chuppah to the last song, and professional sound equipment. Decorative lighting can be added in advance.",
  },
];

export const enUsFaq: FaqItem[] = [
  {
    q: "Do you really fly to the US for weddings?",
    a: "Yes. I DJ weddings in the United States for couples who want an Israeli DJ, usually because a big part of the family or friends is Israeli. Availability depends on the date, so it's best to reach out early.",
  },
  {
    q: "How does pricing work for a wedding in the US?",
    a: "Every wedding gets a personal quote based on the date, location and what the event needs, including travel. Send me your details on WhatsApp or email and I'll get back to you.",
  },
  {
    q: "How do we plan if you're in Israel?",
    a: "Exactly like couples who plan a wedding in Israel from abroad: an intro call, a full music meeting over Zoom, and WhatsApp until the day itself. Time zones are part of my routine.",
  },
  {
    q: "What about sound equipment at our US venue?",
    a: "The technical setup is coordinated in advance with you and your venue or AV provider, so everything is ready and tested before the first song.",
  },
  {
    q: "Can you combine American wedding traditions with Israeli music?",
    a: "Yes. The night is built around your program, whether that's a cocktail hour, a grand entrance or a first dance, with Israeli and Mizrahi dance sets where they lift the room the most.",
  },
];
