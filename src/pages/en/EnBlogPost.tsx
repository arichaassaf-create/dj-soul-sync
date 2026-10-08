import { Link, useParams, Navigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { EnLayout } from "@/components/EnLayout";
import { EnCta } from "@/components/EnBlocks";
import { Calendar } from "lucide-react";
import { blogPostsEn } from "@/data/blogPostsEn";
import { heroImages, sectionImages } from "@/data/blogImages";
import { SITE_URL, ids } from "@/lib/site";

export default function EnBlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPostsEn.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/en/blog" replace />;

  const heroImage = post.heroImage ? heroImages[post.heroImage] : null;
  const url = `${SITE_URL}/en/blog/${post.slug}`;
  const schema = {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@id": ids.person },
    publisher: { "@id": ids.business },
    mainEntityOfPage: { "@id": `${url}#webpage` },
    inLanguage: "en-US",
  };

  return (
    <EnLayout>
      <SEO
        lang="en"
        title={`${post.title} | Blog`}
        description={post.excerpt}
        canonicalUrl={`/en/blog/${post.slug}`}
        article
        publishedTime={post.date}
        modifiedTime={post.date}
        alternates={[
          { hrefLang: "en", path: `/en/blog/${post.slug}` },
          { hrefLang: "he", path: `/blog/${post.slug}` },
        ]}
        breadcrumbs={[
          { name: "English", path: "/en" },
          { name: "Blog", path: "/en/blog" },
          { name: post.title, path: `/en/blog/${post.slug}` },
        ]}
        schema={[schema]}
      />
      <article className="pt-28 pb-8 md:pt-36">
        <div className="container-custom">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/en" className="hover:text-primary">Home</Link> <span aria-hidden="true">/</span>{" "}
            <Link to="/en/blog" className="hover:text-primary">Blog</Link> <span aria-hidden="true">/</span>{" "}
            <span className="text-primary">{post.title}</span>
          </nav>

          {heroImage && (
            <div className="relative rounded-2xl overflow-hidden mb-12 max-w-4xl">
              <img src={heroImage} alt={post.title} className="w-full h-64 md:h-96 object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            </div>
          )}

          <header className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </time>
              <span aria-hidden="true">·</span>
              <span>By DJ Assaf Aricha</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <span className="text-gradient-gold">{post.title}</span>
            </h1>
          </header>

          <div className="max-w-3xl">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">{post.content.intro}</p>

            {post.content.sections?.map((section, i) => (
              <div key={section.title} className="mb-12">
                {sectionImages[i] && (
                  <div className="rounded-xl overflow-hidden mb-6">
                    <img
                      src={sectionImages[i]}
                      alt={section.title}
                      className="w-full h-64 md:h-80 object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                )}
                <h2 className="text-2xl font-bold text-primary mt-4 mb-4">{section.title}</h2>
                <p className="text-foreground/90 leading-relaxed">{section.content}</p>
              </div>
            ))}

            {post.content.tips.map((tip, i) => (
              <div key={tip.title}>
                <h2 className="text-2xl font-bold text-primary mt-12 mb-4">
                  {i + 1}. {tip.title}
                </h2>
                <p className="text-foreground/90 leading-relaxed mb-6">{tip.content}</p>
              </div>
            ))}

            {post.content.outro && (
              <div className="mt-12 p-8 bg-card rounded-2xl border border-primary/20">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="text-gradient-gold">My commitment: a personal, uncompromising experience</span>
                </h2>
                <p className="text-foreground/90 leading-relaxed">{post.content.outro}</p>
              </div>
            )}

            <p className="text-sm text-muted-foreground mt-10">
              <Link to="/en/blog" className="text-primary hover:underline">&larr; All articles</Link>
            </p>
          </div>
        </div>
      </article>
      <EnCta
        title="Let's plan the music for your wedding"
        text="Send me your date and location, in Israel or in the US, and I'll get back to you with availability and first ideas."
      />
    </EnLayout>
  );
}
