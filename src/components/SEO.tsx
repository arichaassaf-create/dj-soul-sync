import { Helmet } from "react-helmet-async";
import { SITE_URL, ENTITY, entityGraph, ids } from "@/lib/site";

export interface Breadcrumb {
  name: string;
  path: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  /** Path ("/about") or absolute URL. Host is always normalized to SITE_URL. */
  canonicalUrl?: string;
  ogImage?: string;
  /** Kept for backward compatibility, not rendered (search engines ignore it). */
  keywords?: string;
  article?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
  breadcrumbs?: Breadcrumb[];
  /** Extra JSON-LD nodes for this page (FAQPage, Article, Service...). Added to the @graph. */
  schema?: Record<string, unknown>[];
}

function toPath(canonicalUrl?: string) {
  if (!canonicalUrl) return "/";
  const path = canonicalUrl.replace(/^https?:\/\/[^/]+/, "") || "/";
  return path.length > 1 ? path.replace(/\/$/, "") : path;
}

export function SEO({
  title = "DJ אסף אריכא | DJ לחתונה במרכז ובשרון",
  description = ENTITY.description,
  canonicalUrl,
  ogImage = ENTITY.image,
  article = false,
  publishedTime,
  modifiedTime,
  author = ENTITY.personName,
  noindex = false,
  breadcrumbs,
  schema = [],
}: SEOProps) {
  const path = toPath(canonicalUrl);
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const fullTitle = title.includes("אסף אריכא") ? title : `${title} | DJ אסף אריכא`;
  const image = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

  const graph: Record<string, unknown>[] = [
    ...entityGraph(),
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: fullTitle,
      description,
      inLanguage: "he-IL",
      isPartOf: { "@id": ids.website },
      about: { "@id": ids.business },
      ...(modifiedTime ? { dateModified: modifiedTime } : {}),
      ...(breadcrumbs ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
    },
    ...schema,
  ];

  if (breadcrumbs) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [{ name: "בית", path: "/" }, ...breadcrumbs].map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: `${SITE_URL}${b.path === "/" ? "/" : b.path}`,
      })),
    });
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta name="robots" content={noindex ? "noindex, follow" : "index, follow, max-image-preview:large"} />
      <link rel="canonical" href={url} />

      <meta property="og:site_name" content={ENTITY.name} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="he_IL" />
      {article && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {article && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {!noindex && (
        <script type="application/ld+json">
          {JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}
        </script>
      )}
    </Helmet>
  );
}
