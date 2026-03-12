import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackPhoneClick, trackWhatsAppClick, trackCTAClick } from "@/lib/analytics";

const navLinks = [
  { href: "/", label: "בית" },
  { href: "/about", label: "אודות" },
  { href: "/services", label: "שירותים" },
  { href: "/workshop", label: "סדנת DJ" },
  { href: "/blog", label: "בלוג" },
  { href: "/wedding-form", label: "שאלון חתונה" },
  { href: "/contact", label: "צור קשר" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-card py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="container-custom flex items-center justify-between" aria-label="ניווט ראשי">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="דף הבית - די ג'יי אסף אריכא"
        >
          <span className="text-xl md:text-2xl font-heading font-bold text-gradient-gold">
            DJ אסף אריכא
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`animated-underline font-medium transition-colors ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="glass" size="sm" asChild>
            <a href="tel:0505567078" aria-label="התקשרו אלינו">
              <Phone className="h-4 w-4" />
              <span>050-5567078</span>
            </a>
          </Button>
          <Button variant="hero" size="sm" asChild>
            <Link to="/contact">הצעת מחיר</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "סגור תפריט" : "פתח תפריט"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden fixed inset-0 top-16 bg-background/98 backdrop-blur-lg transition-all duration-300 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <ul className="flex flex-col items-center gap-6 pt-10">
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                className={`animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link
                  to={link.href}
                  className={`text-xl font-medium transition-colors ${
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex gap-3 mt-6 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <Button variant="phone" asChild>
                <a href="tel:0505567078">
                  <Phone className="h-4 w-4" />
                  התקשרו
                </a>
              </Button>
              <Button variant="whatsapp" asChild>
                <a
                  href="https://wa.me/972505567078"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}