import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import LayersIcon from '@mui/icons-material/Layers';
import type { Product } from "./data";

interface ProductCardProps {
  product: Product;
}

const badgeColors: Record<string, string> = {
  New: "bg-[#d41c5c]",
  Hot: "bg-[#d41c5c]",
  Sale: "bg-[#d41c5c]",
};

export function ProductCard({ product }: ProductCardProps) {
  const savings =
    product.oldPrice && product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;
  
  // Filter badges to only show New, Sale, Hot
  const allowedBadges = ['New', 'Sale', 'Hot'];
  const displayBadge = product.badge && allowedBadges.includes(product.badge) ? product.badge : null;

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
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${product.secondaryImage ? "group-hover:opacity-0" : "group-hover:scale-105"}`}
        />
        {product.secondaryImage && (
          <img
            src={product.secondaryImage}
            alt={`${product.name} alternate`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}

        {/* Badges (max 2) */}
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

        {/* Quick-action icons (right side, stacked) */}
        <div className="absolute top-10 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <button className="w-7 h-7 bg-white text-[#222529] flex items-center justify-center shadow-sm hover:bg-[#044c5c] hover:text-white transition-colors" title="Wishlist">
            <FavoriteBorderIcon sx={{ fontSize: 14 }} />
          </button>
          <button className="w-7 h-7 bg-white text-[#222529] flex items-center justify-center shadow-sm hover:bg-[#044c5c] hover:text-white transition-colors" title="Compare">
            <CompareArrowsIcon sx={{ fontSize: 14 }} />
          </button>
        </div>

        {/* Bottom action bar — Quick View / Add to Cart / Request a Quote */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300 flex bg-white">
          <button
            className="flex-1 bg-white text-[#222529] py-3 flex items-center justify-center hover:bg-[#044c5c] hover:text-white transition-colors"
            style={{ borderRight: "1px solid #e7e7e7" }}
            title="Quick View"
            aria-label="Quick View"
          >
            <VisibilityIcon sx={{ fontSize: 18 }} />
          </button>
          <button
            className="flex-1 bg-white text-[#044c5c] py-3 flex items-center justify-center hover:bg-[#044c5c] hover:text-white transition-colors"
            style={{ borderRight: "1px solid #e7e7e7" }}
            title="Add to Cart"
            aria-label="Add to Cart"
          >
            <ShoppingCartIcon sx={{ fontSize: 18 }} />
          </button>
          <button
            className="flex-1 bg-white text-[#d41c5c] py-3 flex items-center justify-center hover:bg-[#d41c5c] hover:text-white transition-colors"
            title="Request a Quote"
            aria-label="Request a Quote"
          >
            <RequestQuoteIcon sx={{ fontSize: 18 }} />
          </button>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="p-3">
        {/* Category + SKU */}
        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] text-[#999] uppercase tracking-wide">{product.category}</p>
          <span className="text-[9px] text-[#bbb] tracking-wide">{product.sku}</span>
        </div>

        {/* Title */}
        <h4
          className="text-[#222529] text-[13px] mb-1.5 line-clamp-2 min-h-[36px] hover:text-[#044c5c] cursor-pointer transition-colors"
          style={{ fontWeight: 400 }}
        >
          {product.name}
        </h4>

        {/* MOQ + Ready-stock */}
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="text-[9px] bg-[#f4f4f4] text-[#555] px-1.5 py-0.5 flex items-center gap-1"
            style={{ fontWeight: 500 }}
          >
            <LayersIcon sx={{ fontSize: 10 }} /> MOQ: {product.moq} pcs
          </span>
          {product.readyStock && (
            <span className="text-[9px] bg-[#2F8F3A]/10 text-[#2F8F3A] px-1.5 py-0.5" style={{ fontWeight: 600 }}>
              In Stock
            </span>
          )}
        </div>

        {/* Rating */}
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

        {/* Price */}
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

        {/* Print methods */}
        {/* removed */}
      </div>
    </div>
  );
}