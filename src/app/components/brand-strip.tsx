import { brands } from "./data";
import type { Brand } from "./data";

export function BrandStrip() {
  return (
    <section
      className="py-[64px]"
      style={{ fontFamily: "var(--font-body)", background: "#FAFAF8" }}
    >
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Section header */}
        <div className="mb-8">
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

        {/* Brand grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {brands.map((brand) => (
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