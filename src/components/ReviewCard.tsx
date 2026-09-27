import { ExternalLink } from "lucide-react";
import type { Review } from "@/data/reviews";
import { REVIEW_SOURCE_URL } from "@/data/reviews";

export function ReviewCard({ review, className = "" }: { review: Review; className?: string }) {
  return (
    <figure className={`bg-card rounded-2xl p-6 border border-border/40 flex flex-col ${className}`}>
      <blockquote className="text-foreground/90 leading-relaxed text-sm flex-1">
        &ldquo;{review.excerpt}&rdquo;
      </blockquote>
      <figcaption className="mt-5 pt-4 border-t border-border/30 flex items-center justify-between gap-3 text-xs">
        <span>
          <span className="font-bold text-sm text-foreground block" dir="auto">{review.name}</span>
          {review.serviceDate && <span className="text-muted-foreground">חתונה, {review.serviceDate}</span>}
        </span>
        <a
          href={REVIEW_SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary shrink-0"
        >
          מתוך מתחתנים למען מתחתנים
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      </figcaption>
    </figure>
  );
}
