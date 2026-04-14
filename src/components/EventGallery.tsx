import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";

import event1 from "@/assets/gallery/event-1.jpg";
import event2 from "@/assets/gallery/event-2.jpg";
import event3 from "@/assets/gallery/event-3.webp";
import event4 from "@/assets/gallery/event-4.jpg";
import event5 from "@/assets/gallery/event-5.jpg";
import event6 from "@/assets/gallery/event-6.jpg";
import event7 from "@/assets/gallery/event-7.jpg";
import event8 from "@/assets/gallery/event-8.jpg";
import event9 from "@/assets/gallery/event-9.jpg";

const images = [
  { src: event1, alt: "DJ אסף אריכא באירוע מסיבה" },
  { src: event2, alt: "DJ אסף אריכא עם אוזניות בהופעה" },
  { src: event3, alt: "DJ אסף אריכא - פורטרט" },
  { src: event4, alt: "DJ אסף אריכא במועדון" },
  { src: event5, alt: "DJ אסף אריכא בהופעה שחור לבן" },
  { src: event6, alt: "DJ אסף אריכא מחייך באירוע" },
  { src: event7, alt: "DJ אסף אריכא בשקיעה" },
  { src: event8, alt: "DJ אסף אריכא - אמנות" },
  { src: event9, alt: "DJ אסף אריכא - פורטרט" },
];

export function EventGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      if (isTransitioning || next === activeIndex) return;
      setPrevIndex(activeIndex);
      setIsTransitioning(true);
      setActiveIndex(next);
      setTimeout(() => {
        setPrevIndex(null);
        setIsTransitioning(false);
      }, 900);
    },
    [activeIndex, isTransitioning],
  );

  useEffect(() => {
    const id = setInterval(() => {
      goTo((activeIndex + 1) % images.length);
    }, 4500);
    return () => clearInterval(id);
  }, [activeIndex, goTo]);

  return (
    <section className="section-padding" aria-labelledby="gallery-heading">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2
            id="gallery-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4"
          >
            <Camera className="inline-block h-8 w-8 ml-3 text-primary" />
            רגעים <span className="text-gradient-gold">מהאירועים</span>
          </h2>
        </div>

        {/* Main showcase */}
        <div className="relative aspect-[16/9] max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border/50 shadow-2xl mb-6">
          {/* prev layer */}
          {prevIndex !== null && (
            <img
              src={images[prevIndex].src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {/* active layer with clip-path reveal */}
          <img
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.77,0,0.18,1)]",
              isTransitioning
                ? "animate-gallery-reveal"
                : "clip-path-full",
            )}
          />
          {/* overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center gap-2 md:gap-3 flex-wrap max-w-4xl mx-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`הצג תמונה ${i + 1}`}
              className={cn(
                "w-14 h-14 md:w-18 md:h-18 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110",
                i === activeIndex
                  ? "border-primary shadow-lg shadow-primary/30 scale-110"
                  : "border-border/30 opacity-60 hover:opacity-100",
              )}
            >
              <img
                src={img.src}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
