import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Phone, MessageCircle, Star, Music, Heart, Users, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-dj-updated.jpg";
import weddingImage from "@/assets/wedding-dance.jpg";
import privatePartyImage from "@/assets/private-party.jpg";
import corporateImage from "@/assets/corporate-event.jpg";
import workshopImage from "@/assets/workshop-dj.png";

const features = [
  {
    icon: Star,
    title: "ניסיון עשיר",
    description: "ניסיון עשיר באלפי חתונות, מסיבות פרטיות ואירועי חברה.",
  },
  {
    icon: Music,
    title: "התאמה מושלמת",
    description: "התאמת מוזיקה לקהל, סגנון האירוע והאווירה הרצויה.",
  },
  {
    icon: Heart,
    title: "יחס אישי",
    description: "יחס אישי וליווי מקצועי משלב התכנון ועד הריקוד האחרון.",
  },
];

const services = [
  {
    image: weddingImage,
    title: "חתונות",
    description: "מקבלת הפנים ועד לריקוד האחרון - חוויה מוזיקלית בלתי נשכחת",
    link: "/services#weddings",
  },
  {
    image: privatePartyImage,
    title: "מסיבות פרטיות",
    description: "יום הולדת, אירוע משפחתי או כל חגיגה פרטית",
    link: "/services#private",
  },
  {
    image: corporateImage,
    title: "אירועי חברה",
    description: "אירועים עסקיים, השקות וכנסים עם אווירה מקצועית",
    link: "/services#corporate",
  },
  {
    image: workshopImage,
    title: "סדנת DJ",
    description: "למדו לתקלט בסדנה פרטית - ליחידים ולזוגות, בהתאמה אישית מלאה",
    link: "/workshop",
  },
];

const testimonials = [
  {
    name: "רוני ודני כהן",
    event: "חתונה",
    text: "אסף הפך את החתונה שלנו לחוויה בלתי נשכחת! הרחבה לא הפסיקה לרקוד רגע.",
    rating: 5,
  },
  {
    name: "שירה ויובל לוי",
    event: "חתונה",
    text: "תקליטן מקצועי ברמה הגבוהה ביותר. ידע לקרוא את הקהל בצורה מושלמת והכל זרם כמו שחלמנו.",
    rating: 5,
  },
  {
    name: "מיכל ואיתי ברק",
    event: "חתונה",
    text: "האירוע השנתי שלנו היה הכי מוצלח בזכות אסף. המוזיקה הייתה מדויקת לכל רגע!",
    rating: 5,
  },
  {
    name: "נועה ותומר אברהם",
    event: "חתונה",
    text: "כל האורחים שיבחו את המוזיקה! אסף יצר אווירה מטורפת שגרמה לכולם לרקוד עד הסוף.",
    rating: 5,
  },
  {
    name: "דנה וגיא כץ",
    event: "חתונה",
    text: "מהרגע הראשון הרגשנו שאנחנו בידיים טובות. המוזיקה הייתה בול מה שרצינו.",
    rating: 5,
  },
  {
    name: "רותם ועידו שמש",
    event: "חתונה",
    text: "הפלייליסט היה מושלם! אסף הקשיב לכל הבקשות שלנו והוסיף נגיעות משלו שעשו את ההבדל.",
    rating: 5,
  },
];

export default function Index() {
  return (
    <Layout>
      <SEO />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 bg-background/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom text-center py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 animate-fade-in-up">
              <span className="text-gradient-gold">די ג'יי אסף אריכא</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl lg:text-3xl text-foreground/90 mb-8 font-medium animate-fade-in-up stagger-1">
              די ג'יי לחתונה, מסיבה פרטית או אירוע חברה – 
              <br className="hidden md:block" />
              תקליטן מקצועי שירים לכם את האירוע
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up stagger-2">
              מחפשים די ג'יי לחתונה שיקפיץ את הרחבה ויהפוך את האירוע לבלתי נשכח? 
              צריכים תקליטן למסיבה פרטית או אירוע חברה שיידע לקרוא את הקהל ולבנות את האווירה המושלמת?
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-3">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">
                  קבלו הצעת מחיר
                </Link>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <a href="tel:0505567078">
                  <Phone className="h-5 w-5" />
                  050-5567078
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="section-padding bg-dark-surface" aria-labelledby="why-choose">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 id="why-choose" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
              למה לבחור <span className="text-gradient-gold">בי?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              אני די ג'יי מקצועי עם ניסיון של שנים בעולם האירועים. אני מתמחה בלתפור לכל אירוע את הפסקול המדויק שלו.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <article
                key={feature.title}
                className="bg-gradient-card rounded-2xl p-8 card-hover border border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="section-padding" aria-labelledby="services-section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 id="services-section" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
              <span className="text-gradient-gold">השירותים</span> שלי
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              מהרגעים המרגשים של החופה ועד למסיבה המטורפת שתשאיר את כולם על הרגליים
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Link
                key={service.title}
                to={service.link}
                className="group block"
              >
                <article className="relative h-80 rounded-2xl overflow-hidden card-hover">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={`${service.title} - די ג'יי אסף אריכא`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Music className="h-20 w-20 text-primary/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute bottom-0 right-0 left-0 p-6">
                    <h3 className="text-2xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">לכל השירותים</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-dark-surface" aria-labelledby="testimonials">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 id="testimonials" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
              מה <span className="text-gradient-gold">הלקוחות</span> אומרים
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <article
                key={index}
                className="bg-card rounded-2xl p-8 card-hover border border-border/50"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                <footer>
                  <cite className="font-bold not-italic">{testimonial.name}</cite>
                  <p className="text-sm text-muted-foreground">{testimonial.event}</p>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden" aria-labelledby="cta-section">
        <div className="absolute inset-0 bg-gradient-gold opacity-10" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="cta-section" className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
              מוכנים להפוך את האירוע שלכם <span className="text-gradient-gold">לבלתי נשכח?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              צרו קשר עוד היום לפגישת היכרות ונדבר על האירוע וכמובן מוזיקה
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">השאירו פרטים</Link>
              </Button>
              <Button variant="whatsapp" size="lg" asChild>
                <a
                  href="https://wa.me/972505567078?text=היי%20אסף%2C%20אשמח%20לפרטים%20על%20DJ%20לאירוע"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}