import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  keywords?: string;
  article?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
}

export function SEO({
  title = "די ג'יי לחתונות ומסיבות באזור המרכז והשרון | אסף אריכא",
  description = "די ג'יי אסף אריכא - תקליטן מקצועי לחתונות ומסיבות באזור המרכז והשרון: מודיעין, רחובות, נס ציונה, רמת השרון, הרצליה, הוד השרון ומושבי השפלה. ניסיון של שנים ויחס אישי.",
  canonicalUrl = "https://dj-assaf-aricha.co.il",
  ogImage = "/og-image.jpg",
  keywords = "דיג'יי לחתונה במרכז, תקליטן רמת השרון, DJ הרצליה, דיג'יי הוד השרון, תקליטן מודיעין, DJ רחובות, דיג'יי נס ציונה, תקליטן מושבים שפלה, DJ כרמי יוסף, דיג'יי לאירועים מרכז",
  article = false,
  publishedTime,
  modifiedTime,
  author = "אסף אריכא",
  noindex = false,
}: SEOProps) {
  const fullTitle = title.includes("אסף אריכא")
    ? title
    : `${title} | די ג'יי אסף אריכא`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="he_IL" />

      {/* Article specific */}
      {article && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {article && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {article && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}