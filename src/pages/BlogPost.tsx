import { Link, useParams, Navigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";

import corporateEventHero from "@/assets/dj-photo-5.jpg";
import djPhoto1 from "@/assets/dj-photo-1.webp";
import djPhoto2 from "@/assets/dj-photo-2.jpg";
import djPhoto3 from "@/assets/dj-photo-3.jpg";
import djPhoto4 from "@/assets/dj-photo-4.jpg";
import tipsChoosingDj from "@/assets/blog/tips-choosing-dj.jpg";
import weddingPlaylist from "@/assets/blog/wedding-playlist.jpg";
import chuppahMusic from "@/assets/blog/chuppah-music.jpg";
import musicMistakes from "@/assets/blog/music-mistakes.jpg";
import diverseCrowd from "@/assets/blog/diverse-crowd.jpg";
import lastSongs from "@/assets/blog/last-songs.jpg";
import workingWithDj from "@/assets/blog/working-with-dj.jpg";
import receptionMusic from "@/assets/blog/reception-music.jpg";

const heroImages: Record<string, string> = {
  "corporate-event-hero": corporateEventHero,
  "tips-choosing-dj": tipsChoosingDj,
  "wedding-playlist": weddingPlaylist,
  "chuppah-music": chuppahMusic,
  "music-mistakes": musicMistakes,
  "diverse-crowd": diverseCrowd,
  "last-songs": lastSongs,
  "working-with-dj": workingWithDj,
  "reception-music": receptionMusic,
};

const sectionImages = [djPhoto1, djPhoto2, djPhoto3, djPhoto4];

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const heroImage = post.heroImage ? heroImages[post.heroImage] : null;

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

          {/* Hero Image */}
          {heroImage && (
            <div className="relative rounded-2xl overflow-hidden mb-12 max-w-4xl">
              <img
                src={heroImage}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            </div>
          )}

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

            {/* Sections with images */}
            {post.content.sections?.map((section, index) => (
              <div key={index} className="mb-12">
                {sectionImages[index] && (
                  <div className="rounded-xl overflow-hidden mb-6">
                    <img
                      src={sectionImages[index]}
                      alt={section.title}
                      className="w-full h-64 md:h-80 object-cover object-top"
                    />
                  </div>
                )}
                <h2 className="text-2xl font-bold text-primary mt-4 mb-4">
                  {section.title}
                </h2>
                <p className="text-foreground/90 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}

            {/* Tips */}
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

            {/* Outro */}
            {post.content.outro && (
              <div className="mt-12 p-8 bg-card rounded-2xl border border-primary/20">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="text-gradient-gold">המחויבות שלי: חוויה אישית ובלתי מתפשרת</span>
                </h2>
                <p className="text-foreground/90 leading-relaxed">
                  {post.content.outro}
                </p>
              </div>
            )}
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
