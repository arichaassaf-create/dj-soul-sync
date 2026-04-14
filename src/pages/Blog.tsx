import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Calendar, ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { Helmet } from "react-helmet-async";

export default function Blog() {
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "בלוג דיג'יי אסף אריכא - טיפים לחתונות ואירועים",
    "url": "https://dj-assaf-aricha.com/blog",
    "description": "טיפים, מדריכים ורעיונות לתכנון המוזיקה בחתונה ובאירועים מאת DJ אסף אריכא",
    "author": {
      "@type": "Person",
      "name": "אסף אריכא"
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "url": `https://dj-assaf-aricha.com/blog/${post.slug}`,
      "author": {
        "@type": "Person",
        "name": "אסף אריכא"
      }
    }))
  };

  return (
    <Layout>
      <SEO
        title="בלוג | טיפים לחתונות ואירועים - DJ אסף אריכא"
        description="מדריכים וטיפים לתכנון המוזיקה בחתונה: איך לבחור דיג'יי, לבנות פלייליסט, ולתכנן מוזיקה לחופה. מאת DJ אסף אריכא - תקליטן לחתונות במרכז ובשרון."
        canonicalUrl="https://dj-assaf-aricha.com/blog"
        keywords="בלוג דיג'יי חתונה, טיפים לבחירת תקליטן, מדריך מוזיקה לחתונה, פלייליסט לחתונה, מוזיקה לחופה"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(blogListSchema)}
        </script>
      </Helmet>

      <section className="pt-32 pb-16 md:pt-40">
        <div className="container-custom">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">בית</Link></li>
              <li>/</li>
              <li className="text-primary">בלוג</li>
            </ol>
          </nav>

          <header className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <span className="text-gradient-gold">בלוג</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              טיפים, מדריכים ורעיונות לתכנון המוזיקה המושלמת לחתונה ולאירועים שלכם. מניסיון אמיתי של דיג'יי לחתונות באזור המרכז והשרון.
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 group">
                <Link to={`/blog/${post.slug}`} className="block p-6">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                    <Calendar className="h-4 w-4" />
                    <time>{new Date(post.date).toLocaleDateString("he-IL", { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  </div>
                  <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-medium text-sm">
                    קרא עוד
                    <ArrowLeft className="h-4 w-4" />
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
