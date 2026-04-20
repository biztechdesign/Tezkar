import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { ProductCard } from "./product-card";
import type { Product } from "./data";

interface ProductCarouselProps {
  title: string;
  products: Product[];
  viewAllText?: string;
  bgColor?: string;
}

export function ProductCarousel({ title, products, viewAllText = "View All", bgColor = "bg-white" }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scroll = (dir: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 280, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollProgress(maxScroll > 0 ? scrollLeft / maxScroll : 0);
    }
  };

  return (
    <section className={`py-[64px] ${bgColor}`} style={{ fontFamily: "var(--font-body)" }}>
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Porto-style section header */}
        <div className="flex items-center justify-between mb-6 border-b border-[#e7e7e7] pb-3">
          <h2
            className="text-[#222529] text-[18px] md:text-[20px] uppercase tracking-wide relative"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
          >
            {title}
            <span className="absolute bottom-[-13px] left-0 w-full h-[2px] bg-[#044c5c]" />
          </h2>
          <div className="flex items-center gap-3">
            <a href="#" className="hidden md:flex items-center gap-1 text-[#044c5c] text-[12px] uppercase tracking-wide hover:text-[#d41c5c] transition-colors" style={{ fontWeight: 600 }}>
              {viewAllText} <ArrowRight size={12} />
            </a>
            <div className="flex gap-1">
              <button
                onClick={() => scroll(-1)}
                className="w-8 h-8 border border-[#e7e7e7] flex items-center justify-center hover:bg-[#f4f4f4] transition-colors"
              >
                <ChevronLeft size={14} className="text-[#999]" />
              </button>
              <button
                onClick={() => scroll(1)}
                className="w-8 h-8 border border-[#e7e7e7] flex items-center justify-center hover:bg-[#f4f4f4] transition-colors"
              >
                <ChevronRight size={14} className="text-[#999]" />
              </button>
            </div>
          </div>
        </div>

        {/* Product carousel */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[170px] md:w-[200px] lg:w-[calc(20%-9.6px)]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-4 flex justify-center">
          
        </div>

        {/* Mobile view all */}
        <div className="md:hidden mt-5 text-center">
          <a href="#" className="inline-flex items-center gap-1 text-[#044c5c] text-[12px] uppercase tracking-wide hover:text-[#d41c5c] transition-colors" style={{ fontWeight: 600 }}>
            {viewAllText} <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}