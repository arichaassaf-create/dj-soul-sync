import { Link, useParams, Navigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <Layout>
      <SEO
        title={`${post.title} | בלוג`}
        description={post.excerpt}
        canonicalUrl={`https://dj-assaf-aricha.co.il/blog/${post.slug}`}
        article
        publishedTime={post.date}
      />

      <article className="pt-32 pb-16 md:pt-40">
        <div className="container-custom">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">בית</Link></li>
              <li>/</li>
              <li><Link to="/blog" className="hover:text-primary">בלוג</Link></li>
              <li>/</li>
              <li className="text-primary truncate max-w-[200px]">{post.title}</li>
            </ol>
          </nav>

          <header className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Calendar className="h-4 w-4" />
              <time>{new Date(post.date).toLocaleDateString("he-IL", { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <span className="text-gradient-gold">{post.title}</span>
            </h1>
          </header>

          <div className="max-w-3xl prose prose-lg prose-invert">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {post.content.intro}
            </p>

            {post.content.tips.map((tip, index) => (
              <div key={index}>
                <h2 className="text-2xl font-bold text-primary mt-12 mb-4">
                  {index + 1}. {tip.title}
                </h2>
                <p className="text-foreground/90 leading-relaxed mb-6">
                  {tip.content}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mt-16 pt-8 border-t border-border">
            <Button variant="hero" asChild>
              <Link to="/contact">רוצים לדבר על האירוע שלכם?</Link>
            </Button>
          </div>
        </div>
      </article>
    </Layout>
  );
}