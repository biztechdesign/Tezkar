import { ArrowRight, ShoppingCart, Paintbrush, Heart, RefreshCw, Layers } from "lucide-react";
import type { Product } from "./data";

/* ─────────────────────────────────────────────
   Shared card "shell" — identical layout to
   ProductCard; CTA renders as bottom-of-image
   overlay that slides up on hover.
───────────────────────────────────────────── */
const allowedBadges = ["New", "Sale", "Hot"];
const badgeColors: Record<string, string> = {
  New: "bg-[#d41c5c]",
  Hot: "bg-[#d41c5c]",
  Sale: "bg-[#d41c5c]",
};

function CardShell({
  product,
  cta,
}: {
  product: Product;
  cta: React.ReactNode;
}) {
  const displayBadge =
    product.badge && allowedBadges.includes(product.badge) ? product.badge : null;

  return (
    <div
      className="group bg-white border border-[#e7e7e7] overflow-hidden hover:shadow-md transition-shadow duration-300"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* ── Image ── */}
      <div className="relative aspect-square overflow-hidden bg-[#f5f5f5]">
        <img
          src={product.image}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            product.secondaryImage ? "group-hover:opacity-0" : "group-hover:scale-105"
          }`}
        />
        {product.secondaryImage && (
          <img
            src={product.secondaryImage}
            alt={`${product.name} alternate`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}

        {/* Badge */}
        <div className="absolute top-2 left-2 flex flex-col items-start gap-1">
          {displayBadge && (
            <span
              className={`${badgeColors[displayBadge]} text-white text-[11px] px-2.5 py-1 uppercase tracking-wide inline-block`}
              style={{ fontWeight: 700 }}
            >
              {displayBadge}
            </span>
          )}
        </div>

        {/* Quick-action icons */}
        <div className="absolute top-10 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <button
            className="w-7 h-7 bg-white text-[#222529] flex items-center justify-center shadow-sm hover:bg-[#044c5c] hover:text-white transition-colors"
            title="Wishlist"
          >
            <Heart size={12} />
          </button>
          <button
            className="w-7 h-7 bg-white text-[#222529] flex items-center justify-center shadow-sm hover:bg-[#044c5c] hover:text-white transition-colors"
            title="Compare"
          >
            <RefreshCw size={12} />
          </button>
        </div>

        {/* CTA slot — slides up from bottom of image on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          {cta}
        </div>
      </div>

      {/* ── Info — identical to ProductCard ── */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] text-[#999] uppercase tracking-wide">{product.category}</p>
          <span className="text-[9px] text-[#bbb] tracking-wide">{product.sku}</span>
        </div>

        <h4
          className="text-[#222529] text-[13px] mb-1.5 line-clamp-2 min-h-[36px] hover:text-[#044c5c] cursor-pointer transition-colors"
          style={{ fontWeight: 400 }}
        >
          {product.name}
        </h4>

        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="text-[9px] bg-[#f4f4f4] text-[#555] px-1.5 py-0.5 flex items-center gap-1"
            style={{ fontWeight: 500 }}
          >
            <Layers size={8} /> MOQ: {product.moq} pcs
          </span>
          {product.readyStock && (
            <span className="text-[9px] bg-[#2F8F3A]/10 text-[#2F8F3A] px-1.5 py-0.5" style={{ fontWeight: 600 }}>
              In Stock
            </span>
          )}
        </div>

        {product.rating != null && (
          <div className="flex items-center gap-0.5 mb-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-3 h-3 ${star <= Math.floor(product.rating!) ? "text-[#FFC120]" : "text-[#DDD]"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 flex-wrap">
          {product.quoteOnly ? (
            <span className="text-[#044c5c] text-[12px]" style={{ fontWeight: 600 }}>
              Request Pricing
            </span>
          ) : (
            <>
              <span className="text-[#222529] text-[14px]" style={{ fontWeight: 700 }}>
                From AED {product.price}
              </span>
              {product.oldPrice && (
                <span className="text-[#999] text-[11px] line-through">AED {product.oldPrice}</span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Add to Cart  +  Design Now (single CTA layout)
───────────────────────────────────────────── */
function ProductCardV2({ product }: { product: Product }) {
  return (
    <CardShell
      product={product}
      cta={
        <div className="flex">
          {/* Primary: Add to Cart */}
          <button
            className="flex-1 flex items-center justify-center gap-1.5 text-white text-[10px] uppercase tracking-wider transition-colors duration-200 border-r border-[#ffffff30]"
            style={{
              backgroundColor: "#044c5c",
              height: "38px",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              border: "none",
              borderRight: "1px solid rgba(255,255,255,0.2)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#033a48")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#044c5c")}
          >
            <ShoppingCart size={12} />
            <span>Add to Cart</span>
          </button>

          {/* Secondary: Design Now */}
          <button
            className="flex-1 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-wider transition-colors duration-200"
            style={{
              backgroundColor: "#d41c5c",
              color: "#fff",
              height: "38px",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              border: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b8174f")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#d41c5c")}
          >
            <Paintbrush size={12} />
            <span>Design Now</span>
          </button>
        </div>
      }
    />
  );
}

interface ProductGridProps {
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

export function ProductGrid({ title, products, viewAllText = "View All", bgColor = "bg-white" }: ProductGridProps) {
  return (
    <section className={`py-[64px] ${bgColor}`} style={{ fontFamily: "var(--font-body)" }}>
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Section header */}
        <div className="flex items-center justify-between mb-6 border-b border-[#e7e7e7] pb-3">
          <h2
            className="text-[#222529] text-[18px] md:text-[20px] uppercase tracking-wide relative"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
          >
            {title}
            <span className="absolute bottom-[-13px] left-0 w-full h-[2px] bg-[#044c5c]" />
          </h2>
          <div className="hidden md:flex">
            <ViewAllButton label={viewAllText} />
          </div>
        </div>

        {/* Product grid - 5 columns on desktop, responsive on smaller screens */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.slice(0, 15).map((product) => (
            <ProductCardV2 key={product.id} product={product} />
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