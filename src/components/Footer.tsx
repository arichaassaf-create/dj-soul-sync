import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle, Instagram, Music } from "lucide-react";

const SoundCloudIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M11.56 8.87V17h8.76c1.85 0 3.35-1.5 3.35-3.35 0-1.85-1.5-3.35-3.35-3.35-.35 0-.69.05-1.01.15C18.89 8.2 17.04 6.5 14.8 6.5c-1.17 0-2.22.5-2.96 1.3-.08.08-.17.17-.28.27v.8zM10.3 9.5V17h.4V9.2c-.14.09-.27.19-.4.3zM9.1 10.47V17h.4v-6.2c-.13.2-.27.43-.4.67zM7.9 11.92V17h.4v-4.57c-.1.15-.24.32-.4.49zM6.7 12.7V17h.4v-4.15c-.15.04-.28.03-.4-.15zM5.5 12.7V17h.4v-4.3h-.4zM4.3 12.88V17h.4v-4.12h-.4zM3.1 13.04V17h.4v-3.96h-.4zM1.9 13.5V17h.4v-3.5h-.4zM.7 14V17h.4v-3H.7z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.21 8.21 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.14z"/>
  </svg>
);

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
            <div className="flex gap-3 flex-wrap">
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
                href="https://www.instagram.com/dj_assaf_aricha/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@dj.assaf.aricha"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="TikTok"
              >
                <TikTokIcon />
              </a>
              <a
                href="https://soundcloud.com/4ss4f4rich4"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="SoundCloud"
              >
                <SoundCloudIcon />
              </a>
              <a
                href="tel:0505567078"
                className="p-3 bg-card rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="טלפון"
              >
                <Phone className="h-5 w-5" />
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