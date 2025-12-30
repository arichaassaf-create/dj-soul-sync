import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const footerLinks = {
  navigation: [
    { href: "/", label: "בית" },
    { href: "/about", label: "אודות" },
    { href: "/services", label: "שירותים" },
    { href: "/blog", label: "בלוג" },
    { href: "/contact", label: "צור קשר" },
  ],
  services: [
    { href: "/services#weddings", label: "חתונות" },
    { href: "/services#private", label: "מסיבות פרטיות" },
    { href: "/services#corporate", label: "אירועי חברה" },
    { href: "/wedding-form", label: "שאלון חתונה" },
  ],
  legal: [
    { href: "/privacy", label: "מדיניות פרטיות" },
    { href: "/accessibility", label: "הצהרת נגישות" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-deep border-t border-border" role="contentinfo">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-heading font-bold text-gradient-gold">
                DJ אסף אריכא
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              תקליטן מקצועי לחתונות, מסיבות פרטיות ואירועי חברה. ניסיון של שנים ויחס אישי לכל אירוע.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/972505567078"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="tel:0505567078"
                className="p-3 bg-card rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="טלפון"
              >
                <Phone className="h-5 w-5" />
              </a>
              <a
                href="mailto:arichaassaf@gmail.com"
                className="p-3 bg-card rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="אימייל"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <nav aria-label="ניווט בפוטר">
            <h3 className="font-heading font-bold text-lg mb-4 text-primary">ניווט</h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services Links */}
          <nav aria-label="שירותים">
            <h3 className="font-heading font-bold text-lg mb-4 text-primary">שירותים</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-primary">יצירת קשר</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <a
                    href="tel:0505567078"
                    className="text-foreground hover:text-primary transition-colors block"
                  >
                    050-5567078
                  </a>
                  <a
                    href="tel:0722333322"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    07-22-3333-22
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:arichaassaf@gmail.com"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  arichaassaf@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">כרמי יוסף, ישראל</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} די ג'יי אסף אריכא. כל הזכויות שמורות.
          </p>
          <ul className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}