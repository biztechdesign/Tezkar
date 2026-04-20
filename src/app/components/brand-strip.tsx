import { useState } from "react";
import { brands } from "./data";
import type { Brand } from "./data";
import { Star, ArrowRight } from "lucide-react";

export function BrandStrip() {
  const [filter, setFilter] = useState<"all" | "partners">("all");

  const partnerBrands = brands.filter((b) => b.partner);
  const displayBrands = filter === "partners" ? partnerBrands : brands;

  return (
    <section
      className="py-[64px]"
      style={{ fontFamily: "var(--font-body)", background: "#FAFAF8" }}
    >
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p
              className="text-[#d41c5c] text-[12px] uppercase tracking-[0.15em] mb-1"
              style={{ fontWeight: 600 }}
            >
              Trusted by the best
            </p>
            <h2
              className="text-[#2C2C2C] text-[24px] md:text-[28px]"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600, lineHeight: 1.25 }}
            >
              Featured Brands
            </h2>
            <p className="text-[#5B616A] text-[14px] mt-1" style={{ lineHeight: 1.5 }}>
              Premium partner brands you can customize and gift with confidence.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* View All link */}
            <button
              className="inline-flex items-center gap-2 text-[#044c5c] text-[13px] uppercase tracking-wider hover:text-[#d41c5c] transition-colors group"
              style={{ fontWeight: 600 }}
            >
              View All Brands
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            {/* Filter pills */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-1.5 text-[12px] uppercase tracking-wider transition-all duration-200 ${
                  filter === "all"
                    ? "bg-[#044c5c] text-white"
                    : "bg-white text-[#5B616A] border border-[#E6E8EB] hover:border-[#C8956C] hover:text-[#C8956C]"
                }`}
                style={{ fontWeight: 600, borderRadius: 0 }}
              >
                All Brands
              </button>
              <button
                onClick={() => setFilter("partners")}
                className={`px-4 py-1.5 text-[12px] uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                  filter === "partners"
                    ? "bg-[#044c5c] text-white"
                    : "bg-white text-[#5B616A] border border-[#E6E8EB] hover:border-[#C8956C] hover:text-[#C8956C]"
                }`}
                style={{ fontWeight: 600, borderRadius: 0 }}
              >
                <Star size={11} /> Partners
              </button>
            </div>
          </div>
        </div>

        {/* Brand grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {displayBrands.map((brand) => (
            <BrandCard key={brand.name} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <div
      className="group relative flex flex-col cursor-pointer"
    >
      {/* Partner badge */}
      {brand.partner && (
        <div
          className="absolute top-2 right-2 z-10 bg-[#C8956C] text-white text-[8px] uppercase tracking-wider px-2 py-0.5 flex items-center gap-1"
          style={{ fontWeight: 700, borderRadius: 999 }}
        >
          <Star size={8} fill="currentColor" /> Partner
        </div>
      )}

      {/* Brand product image */}
      <div className="aspect-square overflow-hidden bg-[#f0f2f5] border border-[#eaedf0] group-hover:border-[#044c5c] transition-all duration-200">
        <img
          src={brand.logo}
          alt={brand.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Brand name label strip */}
      <div className="bg-white border border-t-0 border-[#eaedf0] group-hover:border-[#044c5c] px-1.5 py-1.5 transition-all duration-200">
        <span
          className="text-[11px] text-[#444] group-hover:text-[#044c5c] block text-center transition-colors duration-150"
          style={{ fontWeight: 500, lineHeight: 1.3 }}
        >
          {brand.name}
        </span>
      </div>
    </div>
  );
}