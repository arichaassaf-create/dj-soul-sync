import type { ReactElement } from "react";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import WeddingForm from "./pages/WeddingForm";
import WeddingDJ from "./pages/WeddingDJ";
import Reviews from "./pages/Reviews";
import Privacy from "./pages/Privacy";
import Accessibility from "./pages/Accessibility";
import Workshop from "./pages/Workshop";
import WorkshopGuide from "./pages/WorkshopGuide";
import WorkshopLanding from "./pages/WorkshopLanding";
import WhatsAppRedirect from "./pages/WhatsAppRedirect";
import GiftSuccess from "./pages/GiftSuccess";
import IsraelisAbroad from "./pages/IsraelisAbroad";
import EnHome from "./pages/en/EnHome";
import EnIsraelWedding from "./pages/en/EnIsraelWedding";
import EnUsWedding from "./pages/en/EnUsWedding";
import { blogPosts } from "./data/blogPosts";

export interface AppRoute {
  path: string;
  element: ReactElement;
  /** Include in sitemap.xml. Pages with noindex must be false. */
  sitemap: boolean;
  priority?: number;
}

// Single source of truth: used by the router, the build-time prerenderer and sitemap.xml.
// A new page must be added here, otherwise it is not prerendered and AI crawlers will not see it.
export const routes: AppRoute[] = [
  { path: "/", element: <Index />, sitemap: true, priority: 1.0 },
  { path: "/wedding-dj", element: <WeddingDJ />, sitemap: true, priority: 0.9 },
  { path: "/reviews", element: <Reviews />, sitemap: true, priority: 0.8 },
  { path: "/israelis-abroad", element: <IsraelisAbroad />, sitemap: true, priority: 0.7 },
  { path: "/en", element: <EnHome />, sitemap: true, priority: 0.9 },
  { path: "/en/destination-wedding-dj-israel", element: <EnIsraelWedding />, sitemap: true, priority: 0.9 },
  { path: "/en/israeli-wedding-dj-usa", element: <EnUsWedding />, sitemap: true, priority: 0.8 },
  { path: "/about", element: <About />, sitemap: true, priority: 0.8 },
  { path: "/services", element: <Services />, sitemap: true, priority: 0.8 },
  { path: "/contact", element: <Contact />, sitemap: true, priority: 0.8 },
  { path: "/wedding-form", element: <WeddingForm />, sitemap: true, priority: 0.6 },
  { path: "/blog", element: <Blog />, sitemap: true, priority: 0.6 },
  { path: "/workshop", element: <Workshop />, sitemap: true, priority: 0.5 },
  { path: "/learn-to-dj", element: <WorkshopLanding />, sitemap: true, priority: 0.5 },
  { path: "/workshop-guide", element: <WorkshopGuide />, sitemap: true, priority: 0.4 },
  { path: "/privacy", element: <Privacy />, sitemap: false },
  { path: "/accessibility", element: <Accessibility />, sitemap: false },
  { path: "/whatsapp-redirect", element: <WhatsAppRedirect />, sitemap: false },
  { path: "/gift-success", element: <GiftSuccess />, sitemap: false },
];

export const blogRoute = { path: "/blog/:slug", element: <BlogPost /> };

/** Every concrete URL to prerender, including each blog post. */
export function allPaths() {
  return [...routes.map((r) => r.path), ...blogPosts.map((p) => `/blog/${p.slug}`)];
}

export function sitemapEntries() {
  return [
    ...routes.filter((r) => r.sitemap).map((r) => ({ path: r.path, priority: r.priority ?? 0.5, lastmod: undefined as string | undefined })),
    ...blogPosts.map((p) => ({ path: `/blog/${p.slug}`, priority: 0.6, lastmod: p.date })),
  ];
}
