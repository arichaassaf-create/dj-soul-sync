// Single source of truth for the business entity.
// Every value here must be real and verifiable. Schema on every page is built from this file.

export const SITE_URL = "https://dj-assaf-aricha.com";

export const ENTITY = {
  name: "DJ אסף אריכא",
  nameEn: "DJ Assaf Aricha",
  personName: "אסף אריכא",
  personNameEn: "Assaf Aricha",
  phone: "+972-50-5567078",
  phoneLocal: "050-5567078",
  email: "arichaassaf@gmail.com",
  locality: "כרמי יוסף",
  region: "מרכז",
  logo: `${SITE_URL}/favicon.jpg`,
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "DJ אסף אריכא הוא תקליטן לחתונות ואירועים בישראל, עם דגש על התאמה אישית לזוג וקריאת קהל בזמן אמת. פועל מכרמי יוסף ומתקלט בחתונות באזור המרכז והשרון.",
  // Only profiles that were verified to exist and belong to Assaf.
  sameAs: [
    "https://www.mit4mit.co.il/biz/25035",
    "https://easy.co.il/page/6254057",
    "https://www.instagram.com/dj_assaf_aricha/",
    "https://www.youtube.com/c/AssAfArichA",
    "https://www.tiktok.com/@dj.assaf.aricha",
    "https://soundcloud.com/4ss4f4rich4",
    "https://www.facebook.com/4ss4f.4rich4/",
  ],
  // Areas already stated across the site. Confirm with Assaf before widening.
  areaServed: [
    "אזור המרכז",
    "השרון",
    "תל אביב",
    "מודיעין",
    "רחובות",
    "נס ציונה",
    "מזכרת בתיה",
    "כרמי יוסף",
    "רמת השרון",
    "הרצליה",
    "הוד השרון",
    "מושבי השפלה",
  ],
  knowsAbout: [
    "DJ לחתונות",
    "מוזיקה לחתונה",
    "קריאת קהל",
    "מוזיקה לחופה",
    "מוזיקה ישראלית",
    "מוזיקה מזרחית",
    "מוזיקה לועזית",
    "האוס",
    "טראנס",
  ],
};

export const WHATSAPP_URL = "https://wa.me/972505567078";

// Public review platforms. Numbers must match the source at the time of writing.
export const REVIEW_SOURCES = {
  mit4mit: {
    label: "מתחתנים למען מתחתנים",
    url: "https://www.mit4mit.co.il/biz/25035",
    count: 33,
    score: "95/100",
    checkedAt: "2026-09-27",
  },
  easy: {
    label: "איזי",
    url: "https://easy.co.il/page/6254057",
  },
};

const PERSON_ID = `${SITE_URL}/#person`;
const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const ids = { person: PERSON_ID, business: BUSINESS_ID, website: WEBSITE_ID };

/** Entity graph emitted on every page so Google and AI engines see one consistent entity. */
export function entityGraph() {
  return [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: ENTITY.personName,
      alternateName: [ENTITY.personNameEn, ENTITY.name, ENTITY.nameEn],
      jobTitle: "DJ לחתונות ואירועים",
      url: `${SITE_URL}/about`,
      image: ENTITY.image,
      worksFor: { "@id": BUSINESS_ID },
      knowsAbout: ENTITY.knowsAbout,
      sameAs: ENTITY.sameAs,
    },
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": BUSINESS_ID,
      name: ENTITY.name,
      alternateName: ENTITY.nameEn,
      description: ENTITY.description,
      url: SITE_URL,
      telephone: ENTITY.phone,
      email: ENTITY.email,
      logo: ENTITY.logo,
      image: ENTITY.image,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: ENTITY.locality,
        addressCountry: "IL",
      },
      areaServed: ENTITY.areaServed.map((name) => ({ "@type": "Place", name })),
      founder: { "@id": PERSON_ID },
      sameAs: ENTITY.sameAs,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "שירותי DJ",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "DJ לחתונה", url: `${SITE_URL}/wedding-dj` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "DJ למסיבות פרטיות", url: `${SITE_URL}/services#private` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "DJ לאירועי חברה", url: `${SITE_URL}/services#corporate` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "סדנת DJ פרטית", url: `${SITE_URL}/workshop` } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: ENTITY.name,
      inLanguage: "he-IL",
      publisher: { "@id": BUSINESS_ID },
    },
  ];
}
