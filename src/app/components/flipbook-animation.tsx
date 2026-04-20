import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const flipPages = [
  "https://images.unsplash.com/photo-1760804876422-7efb73b58048?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwcGFja2FnaW5nJTIwYm94JTIwcHJlbWl1bXxlbnwxfHx8fDE3NzMyOTg2NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1520026229029-e9a33a05a2d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnaWZ0JTIwY2F0YWxvZ3VlJTIwb3BlbiUyMGJvb2slMjBwYWdlc3xlbnwxfHx8fDE3NzMyOTk2MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1577398940885-a729dbed5655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwY29ycG9yYXRlJTIwZ2lmdCUyMGNvbGxlY3Rpb24lMjBmbGF0JTIwbGF5fGVufDF8fHx8MTc3MzI5OTYyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1769874825872-51e26afe137f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGVkJTIwcHJvbW90aW9uYWwlMjBtZXJjaGFuZGlzZSUyMGRpc3BsYXl8ZW58MXx8fHwxNzczMjk5NjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

export function FlipbookAnimation() {
  const [activeFlip, setActiveFlip] = useState(-1);

  useEffect(() => {
    // Start flipping after a short delay
    const startDelay = setTimeout(() => {
      setActiveFlip(0);
    }, 1200);
    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (activeFlip < 0) return;
    // After each page finishes flipping (1.2s), flip the next one
    const timer = setTimeout(() => {
      const next = activeFlip + 1;
      if (next < flipPages.length - 1) {
        setActiveFlip(next);
      } else {
        // Reset cycle after a pause
        setTimeout(() => setActiveFlip(-1), 2000);
        setTimeout(() => setActiveFlip(0), 3500);
      }
    }, 1800);
    return () => clearTimeout(timer);
  }, [activeFlip]);

  return (
    <div
      className="absolute inset-0"
      style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}
    >
      {/* Base/back page (last image) */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={flipPages[flipPages.length - 1]}
          alt="Catalogue page"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Flipping pages - rendered in reverse order so first page is on top */}
      {flipPages.slice(0, -1).map((src, i) => {
        const reverseI = flipPages.length - 2 - i;
        const isFlipped = reverseI <= activeFlip && activeFlip >= 0;
        const isFlipping = reverseI === activeFlip;

        return (
          <div
            key={reverseI}
            className="absolute inset-0"
            style={{
              transformOrigin: "left center",
              transform: isFlipped ? "rotateY(-180deg)" : "rotateY(0deg)",
              transition: isFlipping ? "transform 1.4s cubic-bezier(0.4, 0.0, 0.2, 1)" : "none",
              transformStyle: "preserve-3d",
              zIndex: isFlipping ? 20 : isFlipped ? 1 : 10 - reverseI,
              backfaceVisibility: "hidden",
            }}
          >
            {/* Front of page */}
            <div
              className="absolute inset-0"
              style={{ backfaceVisibility: "hidden" }}
            >
              <ImageWithFallback
                src={flipPages[reverseI]}
                alt={`Catalogue page ${reverseI + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Subtle page shadow on right edge */}
              <div
                className="absolute top-0 right-0 bottom-0"
                style={{
                  width: "30px",
                  background: "linear-gradient(to left, rgba(0,0,0,0.08), transparent)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Back of page (shown when flipped) */}
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <ImageWithFallback
                src={flipPages[Math.min(reverseI + 1, flipPages.length - 1)]}
                alt={`Catalogue page ${reverseI + 2}`}
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.92)" }}
              />
              {/* Page fold shadow */}
              <div
                className="absolute top-0 left-0 bottom-0"
                style={{
                  width: "40px",
                  background: "linear-gradient(to right, rgba(0,0,0,0.15), transparent)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Book spine shadow on left */}
      <div
        className="absolute top-0 left-0 bottom-0 z-30"
        style={{
          width: "8px",
          background: "linear-gradient(to right, rgba(0,0,0,0.2), transparent)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
