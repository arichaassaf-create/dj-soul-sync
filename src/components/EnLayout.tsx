import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ENTITY, WHATSAPP_URL } from "@/lib/site";

export const EN_WHATSAPP = `${WHATSAPP_URL}?text=${encodeURIComponent(
  "Hi Assaf, we're planning our wedding and would love to check your availability."
)}`;

/**
 * mailto: does nothing for visitors without a desktop mail app (most Gmail-in-the-browser users).
 * So the click also copies the address and says so; the mailto still opens a mail app where one exists.
 */
export function copyEmailOnClick() {
  const email = ENTITY.email;
  const done = () => toast.success(`Email copied: ${email}`, { description: "Paste it into your email app to write to Assaf." });
  try {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(email).then(done, () => toast(`Assaf's email: ${email}`));
      return;
    }
  } catch {
    /* fall through */
  }
  toast(`Assaf's email: ${email}`);
}

const nav = [
  { href: "/en", label: "Home" },
  { href: "/en/services", label: "Services" },
  { href: "/en/us-couples", label: "US Couples" },
  { href: "/en/destination-wedding-dj-israel", label: "Wedding in Israel" },
  { href: "/en/israeli-wedding-dj-usa", label: "Wedding in the US" },
  { href: "/en/reviews", label: "Reviews" },
  { href: "/en/blog", label: "Blog" },
  { href: "/en/wedding-form", label: "Questionnaire" },
];

function EnHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass shadow-card py-3">
      <nav className="container-custom flex items-center justify-between" aria-label="Main navigation">
        <Link to="/en" className="text-xl font-heading font-bold text-gradient-gold">
          DJ Assaf Aricha
        </Link>
        <ul className="hidden xl:flex items-center gap-5 text-sm">
          {nav.map((l) => (
            <li key={l.href}>
              <Link
                to={l.href}
                className={pathname === l.href ? "text-primary" : "text-foreground/80 hover:text-primary transition-colors"}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/" lang="he" className="text-muted-foreground hover:text-primary" hrefLang="he">
              עברית
            </Link>
          </li>
        </ul>
        <div className="hidden xl:block">
          <Button variant="hero" size="sm" asChild>
            <a href={EN_WHATSAPP} target="_blank" rel="noopener noreferrer">
              Check availability
            </a>
          </Button>
        </div>
        <button
          className="xl:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>
      {open && (
        <div className="xl:hidden container-custom pt-4 pb-2 flex flex-col gap-3">
          {nav.map((l) => (
            <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="py-2 text-foreground/90">
              {l.label}
            </Link>
          ))}
          <Link to="/" lang="he" onClick={() => setOpen(false)} className="py-2 text-muted-foreground">
            עברית
          </Link>
        </div>
      )}
    </header>
  );
}

function EnFooter() {
  return (
    <footer className="bg-dark-deep border-t border-border">
      <div className="container-custom py-12 grid gap-8 md:grid-cols-3">
        <div>
          <p className="text-xl font-heading font-bold text-gradient-gold mb-3">DJ Assaf Aricha</p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Israeli wedding DJ based in central Israel. Weddings across Israel and in the United States, planned with you in
            English over Zoom and WhatsApp.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="font-heading font-bold text-primary mb-3">Pages</p>
          <ul className="space-y-2 text-sm">
            {nav.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="text-muted-foreground hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-heading font-bold text-primary mb-3">Contact</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={EN_WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a href="tel:+972505567078" className="inline-flex items-center gap-2 hover:text-primary" dir="ltr">
                <Phone className="h-4 w-4" /> +972 50-556-7078
              </a>
            </li>
            <li>
              <a href={`mailto:${ENTITY.email}`} onClick={copyEmailOnClick} className="inline-flex items-center gap-2 hover:text-primary">
                <Mail className="h-4 w-4" /> {ENTITY.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground pb-24 lg:pb-8">
        © {new Date().getFullYear()} DJ Assaf Aricha
      </p>
    </footer>
  );
}

export function EnLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" dir="ltr" lang="en" style={{ textAlign: "left" }}>
      <EnHeader />
      <main className="flex-1">{children}</main>
      <EnFooter />
      <div data-track-location="mobile_bar" className="fixed bottom-0 left-0 right-0 lg:hidden z-40 glass border-t border-border/50 p-3">
        <Button variant="whatsapp" size="sm" className="w-full" asChild>
          <a href={EN_WHATSAPP} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" /> Message Assaf on WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}
