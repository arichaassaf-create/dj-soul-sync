import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { EnLayout } from "@/components/EnLayout";
import { Calendar, ArrowRight } from "lucide-react";
import { blogPostsEn } from "@/data/blogPostsEn";
import { SITE_URL, ids } from "@/lib/site";

export default function EnBlog() {
  const blogSchema = {
    "@type": "Blog",
    name: "DJ Assaf Aricha blog: wedding music tips",
    url: `${SITE_URL}/en/blog`,
    inLanguage: "en-US",
    author: { "@id": ids.person },
    blogPost: blogPostsEn.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      url: `${SITE_URL}/en/blog/${p.slug}`,
      author: { "@id": ids.person },
    })),
  };

  return (
    <EnLayout>
      <SEO
        lang="en"
        title="Wedding Music Blog: Tips & Guides | DJ Assaf Aricha"
        description="Guides and tips for planning your wedding music: choosing a DJ, building a dance playlist and choosing chuppah songs. By Israeli wedding DJ Assaf Aricha."
        canonicalUrl="/en/blog"
        alternates={[
          { hrefLang: "en", path: "/en/blog" },
          { hrefLang: "he", path: "/blog" },
        ]}
        breadcrumbs={[
          { name: "English", path: "/en" },
          { name: "Blog", path: "/en/blog" },
        ]}
        schema={[blogSchema]}
      />
      <section className="pt-28 pb-16 md:pt-36">
        <div className="container-custom">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/en" className="hover:text-primary">Home</Link> <span aria-hidden="true">/</span>{" "}
            <span className="text-primary">Blog</span>
          </nav>
          <header className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <span className="text-gradient-gold">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Tips, guides and ideas for planning the perfect music for your wedding and events, from real experience as a
              wedding DJ in Israel.
            </p>
          </header>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPostsEn.map((post) => (
              <article
                key={post.slug}
                className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 group"
              >
                <Link to={`/en/blog/${post.slug}`} className="block p-6">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </time>
                  </div>
                  <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-primary font-medium text-sm">
                    Read more <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </EnLayout>
  );
}
