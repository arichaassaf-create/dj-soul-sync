import { Phone, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden z-40 glass border-t border-border/50 p-3">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        <Button variant="phone" size="sm" className="flex-1" asChild>
          <a href="tel:0505567078" aria-label="התקשרו עכשיו">
            <Phone className="h-4 w-4" />
            <span>התקשרו</span>
          </a>
        </Button>
        
        <Button variant="whatsapp" size="sm" className="flex-1" asChild>
          <a
            href="https://wa.me/972505567078?text=היי%20אסף%2C%20אשמח%20לפרטים%20על%20DJ%20לאירוע"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="שלחו הודעה ב-WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
            <span>WhatsApp</span>
          </a>
        </Button>
        
        <Button variant="hero" size="sm" className="flex-1" asChild>
          <a href="/contact" aria-label="השאירו פרטים">
            <Mail className="h-4 w-4" />
            <span>פרטים</span>
          </a>
        </Button>
      </div>
    </div>
  );
}