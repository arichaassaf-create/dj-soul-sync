import { ExternalLink, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { TranslatedReview } from "@/data/enContent";
import type { FaqItem } from "@/data/faq";
import { ENTITY } from "@/lib/site";
import { EN_WHATSAPP } from "@/components/EnLayout";

export function EnReviewCard({ review }: { review: TranslatedReview }) {
  return (
    <figure className="bg-card rounded-2xl p-6 border border-border/40 flex flex-col">
      <blockquote className="text-foreground/90 leading-relaxed text-sm flex-1">&ldquo;{review.text}&rdquo;</blockquote>
      <figcaption className="mt-5 pt-4 border-t border-border/30 text-xs flex items-center justify-between gap-3">
        <span>
          <span className="font-bold text-sm text-foreground block">{review.name}</span>
          <span className="text-muted-foreground">Translated from Hebrew</span>
        </span>
        <a
          href={review.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary shrink-0"
        >
          Original review <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      </figcaption>
    </figure>
  );
}

export function EnFaq({ items, title = "Frequently asked questions" }: { items: FaqItem[]; title?: string }) {
  return (
    <section aria-labelledby="en-faq" className="py-16">
      <div className="container-custom max-w-3xl">
        <h2 id="en-faq" className="text-3xl md:text-4xl font-heading font-bold mb-8">{title}</h2>
        <Accordion type="multiple" className="space-y-3">
          {items.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`faq-${i}`}
              className="bg-card border border-border/40 rounded-xl px-6 data-[state=open]:border-primary/30"
            >
              <AccordionTrigger className="text-left font-medium hover:text-primary hover:no-underline py-5 text-base">
                {f.q}
              </AccordionTrigger>
              <AccordionContent forceMount className="text-muted-foreground leading-relaxed pb-5 group-data-[state=closed]:hidden">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function EnCta({ title, text }: { title: string; text: string }) {
  return (
    <section className="py-20 bg-card border-y border-border/40">
      <div className="container-custom max-w-2xl text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{title}</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">{text}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="whatsapp" size="lg" asChild>
            <a href={EN_WHATSAPP} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" /> Check availability on WhatsApp
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href={`mailto:${ENTITY.email}?subject=${encodeURIComponent("Wedding DJ inquiry")}`}>
              <Mail className="h-5 w-5" /> Email Assaf
            </a>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-5">
          WhatsApp and phone: <span dir="ltr">+972 50-556-7078</span> · {ENTITY.email}
        </p>
      </div>
    </section>
  );
}
