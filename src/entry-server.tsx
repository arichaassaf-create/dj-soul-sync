import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import App from "./App";
import { allPaths, sitemapEntries } from "./routes";

export { allPaths, sitemapEntries };

export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );
  const h = helmetContext.helmet!;
  const head = [h.title, h.meta, h.link, h.script].map((x) => x.toString()).join("\n");
  return { html, head, htmlAttributes: h.htmlAttributes.toString() };
}
