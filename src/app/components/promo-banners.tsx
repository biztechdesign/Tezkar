import { ArrowRight } from "lucide-react";
import { IMAGES } from "./data";

export function PromoBanners() {
  return (
    <section className="bg-[#e8f4f6] px-[0px] py-[64px]" style={{ fontFamily: "var(--font-body)" }}>
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Banner A – Product Catalog 2026 */}
          <a
            href="#"
            className="relative overflow-hidden group cursor-pointer block h-[300px] md:h-[340px]"
          >
            {/* Full-box background image */}
            <img
              src={IMAGES.corporateGift}
              alt="Catalog 2026"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient overlay – bottom-heavy for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A3E]/80 via-[#0B1A3E]/30 to-transparent" />
            {/* Decorative accent line */}
            <div className="absolute top-0 left-0 h-full w-[3px] bg-[#5ec4d4]" />

            {/* Content – pinned to bottom */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <span
                className="text-[11px] uppercase tracking-[2.5px] mb-2 text-[#5ec4d4]"
                style={{ fontWeight: 600 }}
              >
                Product Catalog
              </span>
              <h3
                className="text-white text-[24px] md:text-[28px] mb-2 !leading-[1.2]"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                Access Our Full<br />Catalog 2026
              </h3>
              <p
                className="text-white/90 text-[13px] mb-5 max-w-[320px] !leading-[1.6]"
                style={{ fontWeight: 400 }}
              >
                Browse 2,000+ products with pricing, specs and customization options.
              </p>
              <span
                className="inline-flex items-center gap-2 bg-[#5ec4d4] text-[#0B1A3E] px-5 py-2.5 text-[12px] uppercase tracking-wider group-hover:bg-[#4db3c3] transition-colors w-fit"
                style={{ fontWeight: 600 }}
              >
                Download Catalog
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </a>

          {/* Banner B – Ramadan Collection */}
          <a
            href="#"
            className="relative overflow-hidden group cursor-pointer block h-[300px] md:h-[340px]"
          >
            {/* Full-box background image */}
            <img
              src={IMAGES.ramadanTraditional}
              alt="Ramadan Collection"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient overlay – bottom-heavy for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E0F06]/80 via-[#1E0F06]/30 to-transparent" />
            {/* Decorative accent line */}
            <div className="absolute top-0 left-0 h-full w-[3px] bg-[#e8b87a]" />

            {/* Content – pinned to bottom */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <span
                className="text-[11px] uppercase tracking-[2.5px] mb-2 text-[#e8b87a]"
                style={{ fontWeight: 600 }}
              >
                Seasonal Collection
              </span>
              <h3
                className="text-white text-[24px] md:text-[28px] mb-2 !leading-[1.2]"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                Ramadan Gifts<br />Catalog
              </h3>
              <p
                className="text-white/90 text-[13px] mb-5 max-w-[320px] !leading-[1.6]"
                style={{ fontWeight: 400 }}
              >
                Curated corporate gifting solutions for the holy month of Ramadan.
              </p>
              <span
                className="inline-flex items-center gap-2 bg-[#e8b87a] text-[#1E0F06] px-5 py-2.5 text-[12px] uppercase tracking-wider group-hover:bg-[#d4a56a] transition-colors w-fit"
                style={{ fontWeight: 600 }}
              >
                Explore Collection
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </a>

          {/* Banner C – Custom Branding Services */}
          <a
            href="#"
            className="relative overflow-hidden group cursor-pointer block h-[300px] md:h-[340px]"
          >
            {/* Full-box background image */}
            <img
              src={IMAGES.techGadget}
              alt="Custom Branding"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient overlay – bottom-heavy for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C2C2C]/80 via-[#2C2C2C]/30 to-transparent" />
            {/* Decorative accent line */}
            <div className="absolute top-0 left-0 h-full w-[3px] bg-[#d41c5c]" />

            {/* Content – pinned to bottom */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <span
                className="text-[11px] uppercase tracking-[2.5px] mb-2 text-[#d41c5c]"
                style={{ fontWeight: 600 }}
              >
                Branding Services
              </span>
              <h3
                className="text-white text-[24px] md:text-[28px] mb-2 !leading-[1.2]"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                Custom Branded<br />Products
              </h3>
              <p
                className="text-white/90 text-[13px] mb-5 max-w-[320px] !leading-[1.6]"
                style={{ fontWeight: 400 }}
              >
                Full customization with logo printing, embossing, and engraving services.
              </p>
              <span
                className="inline-flex items-center gap-2 bg-[#d41c5c] text-white px-5 py-2.5 text-[12px] uppercase tracking-wider group-hover:bg-[#b91750] transition-colors w-fit"
                style={{ fontWeight: 600 }}
              >
                Explore Collection
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}