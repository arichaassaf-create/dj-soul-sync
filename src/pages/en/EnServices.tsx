import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { EnLayout, EN_WHATSAPP } from "@/components/EnLayout";
import { Heart, PartyPopper, Briefcase, Headphones, Music, CheckCircle } from "lucide-react";
import weddingImage from "@/assets/wedding-dance.jpg";
import privatePartyImage from "@/assets/private-party.jpg";
import corporateImage from "@/assets/corporate-event.jpg";
import workshopImage from "@/assets/workshop-dj.png";
import { ids } from "@/lib/site";

interface EnService {
  id: string;
  icon: typeof Heart;
  title: string;
  subtitle: string;
  image: string | null;
  description: string;
  features: string[];
  cta: { text: string; to?: string; href?: string; hebrew?: boolean };
}

const services: EnService[] = [
  {
    id: "weddings",
    icon: Heart,
    title: "Weddings",
    subtitle: "The perfect soundtrack for the most important day of your life",
    image: weddingImage,
    description:
      "A wedding happens once in a lifetime, and every moment of it matters. From a romantic reception, through an emotional chuppah ceremony, to a dance floor that never stops, I tailor the music to every stage of the event.",
    features: [
      "Planning meeting with the couple",
      "Music matched to your personal taste",
      "A clear musical timeline for the night",
      "Entrance songs and special dances",
      "Professional sound system",
      "Decorative lighting (optional)",
    ],
    cta: { text: "Fill in the wedding questionnaire", to: "/en/wedding-form" },
  },
  {
    id: "private",
    icon: PartyPopper,
    title: "Private Parties",
    subtitle: "Birthdays and every kind of family celebration",
    image: privatePartyImage,
    description:
      "Whether it's a milestone birthday, a bachelor or bachelorette party, or just a family celebration, I create the perfect atmosphere that gets every guest out of their seat.",
    features: [
      "Music matched to the age of the guests",
      "Special song requests",
      "Equipment sized to the event",
      "Full flexibility in style",
    ],
    cta: { text: "Check availability", href: EN_WHATSAPP },
  },
  {
    id: "corporate",
    icon: Briefcase,
    title: "Corporate Events",
    subtitle: "Launches, conferences and business events",
    image: corporateImage,
    description:
      "Business events call for a different approach: elegant background music that sets a pleasant atmosphere and then, at the right moment, a switch to music that gets people moving.",
    features: [
      "Professional background music",
      "Tailored to the company's character",
      "Precise timing",
      "Sound for speeches available",
      "Professional, discreet equipment",
    ],
    cta: { text: "Check availability", href: EN_WHATSAPP },
  },
  {
    id: "consulting",
    icon: Headphones,
    title: "Music Consulting",
    subtitle: "Help building the playlist for your event",
    image: null,
    description:
      "Not sure what music fits your event? I offer a music consulting service that helps you build the perfect playlist, even if you've chosen to work with a different DJ.",
    features: [
      "Analysis of your style and preferences",
      "A tailored song list",
      "Recommendations for peak moments",
      "Tips for choosing your special songs",
    ],
    cta: { text: "Get a quote", href: EN_WHATSAPP },
  },
  {
    id: "workshop",
    icon: Music,
    title: "DJ Workshop",
    subtitle: "Learn to DJ in a private, personal workshop in Israel",
    image: workshopImage,
    description:
      "Always dreamed of standing behind the decks? I run private DJ workshops for individuals and couples: a 3.5-hour session where you learn the basics of DJing, mixing and building a set.",
    features: [
      "Private workshop, tailored to you",
      "Suitable for complete beginners",
      "For one person (₪1,199) or a couple (₪1,750)",
      "Professional equipment provided",
      "Learn with the music styles you love",
      "A fun, special experience, also as a gift",
    ],
    cta: { text: "Workshop details (in Hebrew)", to: "/workshop", hebrew: true },
  },
];

const servicesSchema = {
  "@type": "ItemList",
  name: "DJ Assaf Aricha services",
  itemListElement: services.map((s, i) => ({
    "@type": "Service",
    position: i + 1,
    name: s.title,
    description: s.description,
    provider: { "@id": ids.business },
  })),
};

export default function EnServices() {
  return (
    <EnLayout>
      <SEO
        lang="en"
        title="Wedding & Event DJ Services | DJ Assaf Aricha"
        description="DJ services by Assaf Aricha: weddings, private parties, corporate events, music consulting and private DJ workshops. Personal planning and music tailored to your crowd."
        canonicalUrl="/en/services"
        alternates={[
          { hrefLang: "en", path: "/en/services" },
          { hrefLang: "he", path: "/services" },
        ]}
        breadcrumbs={[
          { name: "English", path: "/en" },
          { name: "Services", path: "/en/services" },
        ]}
        schema={[servicesSchema]}
      />

      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-card">
        <div className="container-custom">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/en" className="hover:text-primary">Home</Link> <span aria-hidden="true">/</span>{" "}
            <span className="text-primary">Services</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              My <span className="text-gradient-gold">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Every event is unique, so I offer a range of services to fit every kind of celebration. From emotional
              weddings to business events, I'm here to create the perfect musical experience.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom space-y-24">
          {services.map((service, index) => (
            <article
              key={service.id}
              id={service.id}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
            >
              {service.image && (
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="relative rounded-2xl overflow-hidden aspect-video">
                    <img
                      src={service.image}
                      alt={`${service.title} with DJ Assaf Aricha`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                  </div>
                </div>
              )}
              <div className={service.image ? "" : "lg:col-span-2 max-w-3xl"}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <service.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-heading font-bold">{service.title}</h2>
                    <p className="text-muted-foreground">{service.subtitle}</p>
                  </div>
                </div>
                <p className="text-lg text-foreground/90 mb-8 leading-relaxed">{service.description}</p>
                <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="lg" asChild>
                  {service.cta.href ? (
                    <a href={service.cta.href} target="_blank" rel="noopener noreferrer">{service.cta.text}</a>
                  ) : (
                    <Link to={service.cta.to!} lang={service.cta.hebrew ? "he" : undefined}>{service.cta.text}</Link>
                  )}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-padding bg-card border-t border-border/40">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Want to know more about the <span className="text-gradient-gold">services?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Fill in the wedding questionnaire or message me directly, and we'll talk about your event.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/en/wedding-form">Wedding questionnaire</Link>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <a href={EN_WHATSAPP} target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </EnLayout>
  );
}
