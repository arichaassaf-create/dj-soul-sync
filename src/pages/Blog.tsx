import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Calendar, ArrowLeft } from "lucide-react";

const blogPosts = [
  {
    slug: "5-tips-choosing-wedding-dj",
    title: "5 טיפים לבחירת די ג'יי מקצועי לחתונה",
    excerpt: "בחירת התקליטן הנכון יכולה להפוך את החתונה שלכם לבלתי נשכחת. הנה 5 טיפים שיעזרו לכם לבחור נכון.",
    date: "2024-12-15",
    image: null,
  },
];

export default function Blog() {
  return (
    <Layout>
      <SEO
        title="בלוג | טיפים לאירועים ומוזיקה - די ג'יי אסף אריכא"
        description="טיפים, מדריכים ומאמרים על בחירת DJ, תכנון מוזיקה לחתונה ואירועים."
        canonicalUrl="https://dj-assaf-aricha.co.il/blog"
      />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">בית</Link></li>
              <li>/</li>
              <li className="text-primary">בלוג</li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-12">
            <span className="text-gradient-gold">הבלוג</span>
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
                <article className="bg-card rounded-2xl overflow-hidden border border-border/50 card-hover h-full">
                  <div className="h-48 bg-gradient-card" />
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <time>{new Date(post.date).toLocaleDateString("he-IL")}</time>
                    </div>
                    <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-primary font-medium">
                      קראו עוד <ArrowLeft className="h-4 w-4" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}