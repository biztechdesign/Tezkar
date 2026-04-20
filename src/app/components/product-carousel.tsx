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

function ViewAllButton({ label }: { label: string }) {
  return (
    <a
      href="#"
      className="group relative inline-flex items-center gap-2 text-[12px] uppercase tracking-wider px-6 py-3 overflow-hidden transition-all duration-300 hover:!text-white"
      style={{
        fontWeight: 600,
        color: "#ffffff",
        background: "#044c5c",
        borderRadius: 0,
        boxShadow: "0 6px 24px rgba(4,76,92,0.25)",
        transition: "box-shadow 0.6s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 6px 24px rgba(200,149,108,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 6px 24px rgba(4,76,92,0.25)";
      }}
    >
      <span
        className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ backgroundColor: "#d41c5c" }}
        aria-hidden="true"
      />
      <span className="relative z-10" style={{ color: "#ffffff" }}>{label}</span>
      <ArrowRight size={13} className="relative z-10 transition-transform group-hover:translate-x-1" style={{ color: "#ffffff" }} />
    </a>
  );
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
            <div className="hidden md:flex">
              <ViewAllButton label={viewAllText} />
            </div>
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

        {/* Bottom view all — always visible */}
        <div className="mt-8 flex justify-center">
          <ViewAllButton label={viewAllText} />
        </div>
      </div>
    </section>
  );
}