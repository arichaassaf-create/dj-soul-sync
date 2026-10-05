// Build-time prerender: writes a real HTML file per route so crawlers that do not run
// JavaScript (GPTBot, PerplexityBot, ClaudeBot, social previews) see full content and meta tags.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const SITE_URL = "https://dj-assaf-aricha.com";

const template = fs.readFileSync(path.join(dist, "index.html"), "utf-8");
if (!template.includes("<!--app-html-->") || !template.includes("<!--app-head-->")) {
  throw new Error("index.html is missing <!--app-head--> or <!--app-html--> placeholders");
}

const { render, allPaths, sitemapEntries } = await import(
  pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href
);

function page(url) {
  const { html, head, htmlAttributes } = render(url);
  let out = template.replace("<!--app-head-->", head).replace("<!--app-html-->", html);
  // English pages set lang="en" dir="ltr" through Helmet; Hebrew pages keep he/rtl.
  if (htmlAttributes) out = out.replace(/<html[^>]*>/, `<html ${htmlAttributes}>`);
  return out;
}

let count = 0;
for (const url of allPaths()) {
  // Flat files (about.html, not about/index.html): with a directory, Netlify 301-redirects
  // /about to /about/, which contradicts the canonical URLs and the sitemap.
  const file = url === "/" ? path.join(dist, "index.html") : path.join(dist, `${url.slice(1)}.html`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const out = page(url);
  if (!/<link[^>]*rel="canonical"/.test(out)) throw new Error(`No canonical rendered for ${url}`);
  fs.writeFileSync(file, out);
  count++;
}

// Real 404 page, served by Netlify with status 404 for unknown URLs.
fs.writeFileSync(path.join(dist, "404.html"), page("/__not-found__"));

const today = new Date().toISOString().slice(0, 10);
const urls = sitemapEntries()
  .map(
    (e) =>
      `  <url>\n    <loc>${SITE_URL}${e.path === "/" ? "/" : e.path}</loc>\n    <lastmod>${e.lastmod ?? today}</lastmod>\n    <priority>${e.priority.toFixed(1)}</priority>\n  </url>`
  )
  .join("\n");
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
console.log(`prerendered ${count} pages + 404.html + sitemap.xml`);
