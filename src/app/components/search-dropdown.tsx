import { useState, useEffect, useRef, useCallback } from "react";
import { X, Clock, TrendingUp, FolderOpen, Star, ArrowRight } from "lucide-react";
import {
  newArrivals,
  saleProducts,
  hotProducts,
  categories,
  type Product,
} from "./data";

// Merge all products into one searchable pool
const allProducts: Product[] = [...newArrivals, ...saleProducts, ...hotProducts];

const POPULAR_SEARCHES = [
  "Corporate Gift Sets",
  "Power Bank",
  "Water Bottle",
  "Ramadan Gifts",
  "Wireless Earbuds",
  "Leather Notebook",
];

const MAX_RECENT = 5;
const RESULTS_PER_PAGE = 3;

function getRecentSearches(): string[] {
  try {
    return JSON.parse(localStorage.getItem("tg_recent_searches") || "[]");
  } catch {
    return [];
  }
}

function saveRecentSearch(term: string) {
  const recent = getRecentSearches().filter(
    (s) => s.toLowerCase() !== term.toLowerCase()
  );
  recent.unshift(term);
  localStorage.setItem(
    "tg_recent_searches",
    JSON.stringify(recent.slice(0, MAX_RECENT))
  );
}

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="text-[#044c5c]" style={{ fontWeight: 700 }}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

function searchProducts(query: string): Product[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      (p.printMethods && p.printMethods.some((m) => m.toLowerCase().includes(q)))
  );
}

function searchCategories(query: string): string[] {
  if (!query.trim()) return categories.map((c) => c.name).slice(0, 5);
  const q = query.toLowerCase();
  return categories.filter((c) => c.name.toLowerCase().includes(q)).map((c) => c.name);
}

interface SearchDropdownProps {
  query: string;
  onQueryChange: (q: string) => void;
  onClose: () => void;
  visible: boolean;
}

export function SearchDropdown({
  query,
  onQueryChange,
  onClose,
  visible,
}: SearchDropdownProps) {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, [visible]);

  // Close on click outside (check parent relative container too)
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const parent = dropdownRef.current?.parentElement;
      if (parent && !parent.contains(e.target as Node)) {
        onClose();
      }
    }
    if (visible) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [visible, onClose]);

  // Escape to close
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (visible) {
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [visible, onClose]);

  const handleSelectTerm = useCallback(
    (term: string) => {
      onQueryChange(term);
      saveRecentSearch(term);
      setRecentSearches(getRecentSearches());
    },
    [onQueryChange]
  );

  const handleRemoveRecent = useCallback(
    (term: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const updated = recentSearches.filter((s) => s !== term);
      localStorage.setItem("tg_recent_searches", JSON.stringify(updated));
      setRecentSearches(updated);
    },
    [recentSearches]
  );

  if (!visible) return null;

  const matchedProducts = searchProducts(query);
  const matchedCategories = searchCategories(query);
  const displayProducts = matchedProducts.slice(0, RESULTS_PER_PAGE);
  const totalCount = matchedProducts.length;
  const extraCount = totalCount > RESULTS_PER_PAGE ? totalCount - RESULTS_PER_PAGE : 0;
  const hasQuery = query.trim().length > 0;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e7e7e7] shadow-xl z-[999] max-h-[480px] overflow-hidden"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div className="flex min-h-[280px]">
        {/* ── Left Sidebar ── */}
        <div className="w-[220px] flex-shrink-0 border-r border-[#e7e7e7] p-4 overflow-y-auto bg-[#FAFAF8]">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="mb-5">
              <div className="flex items-center gap-1.5 mb-2.5">
                <Clock size={12} className="text-[#999]" />
                <h5 className="text-[#222529] text-[12px] uppercase tracking-wider" style={{ fontWeight: 700 }}>
                  Recent Searches
                </h5>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSelectTerm(term)}
                    className="group/chip flex items-center gap-1 bg-white border border-[#e7e7e7] text-[#555] text-[11px] px-2.5 py-1 rounded-full hover:border-[#044c5c] hover:text-[#044c5c] transition-colors"
                  >
                    {term}
                    <X
                      size={10}
                      className="opacity-0 group-hover/chip:opacity-100 text-[#999] hover:text-[#d41c5c] transition-all"
                      onClick={(e) => handleRemoveRecent(term, e)}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          <div className="mb-5">
            <div className="flex items-center gap-1.5 mb-2.5">
              <TrendingUp size={12} className="text-[#999]" />
              <h5 className="text-[#222529] text-[12px] uppercase tracking-wider" style={{ fontWeight: 700 }}>
                Popular Searches
              </h5>
            </div>
            <ul className="space-y-1.5">
              {POPULAR_SEARCHES.map((term) => (
                <li key={term}>
                  <button
                    onClick={() => handleSelectTerm(term)}
                    className="text-[#044c5c] text-[12px] hover:underline transition-colors text-left"
                    style={{ fontWeight: 500 }}
                  >
                    {term}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <FolderOpen size={12} className="text-[#999]" />
              <h5 className="text-[#222529] text-[12px] uppercase tracking-wider" style={{ fontWeight: 700 }}>
                Categories
              </h5>
            </div>
            <ul className="space-y-1.5">
              {matchedCategories.slice(0, 6).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleSelectTerm(cat)}
                    className="text-[12px] text-[#555] hover:text-[#044c5c] transition-colors text-left"
                  >
                    {hasQuery ? highlightMatch(cat, query) : cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Right: Product Results ── */}
        <div className="flex-1 p-4 overflow-y-auto">
          {hasQuery ? (
            <>
              {/* Result header */}
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-[#222529] text-[13px]" style={{ fontWeight: 700 }}>
                  Products{" "}
                  <span className="text-[#999]" style={{ fontWeight: 400 }}>
                    ({totalCount})
                  </span>
                </h5>
                {extraCount > 0 && (
                  <button className="text-[#044c5c] text-[12px] hover:underline flex items-center gap-1" style={{ fontWeight: 600 }}>
                    View All (+{extraCount}) <ArrowRight size={12} />
                  </button>
                )}
              </div>

              {totalCount === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-14 h-14 bg-[#f4f4f4] flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-[#bbb]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                  <p className="text-[#555] text-[13px]" style={{ fontWeight: 500 }}>
                    No products found for "{query}"
                  </p>
                  <p className="text-[#999] text-[11px] mt-1">
                    Try a different keyword or browse categories
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {displayProducts.map((product) => (
                    <SearchProductCard
                      key={product.id}
                      product={product}
                      query={query}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            /* Empty state: show trending products */
            <>
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-[#222529] text-[13px]" style={{ fontWeight: 700 }}>
                  Trending Products
                </h5>
                <button className="text-[#044c5c] text-[12px] hover:underline flex items-center gap-1" style={{ fontWeight: 600 }}>
                  View All <ArrowRight size={12} />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {hotProducts.slice(0, RESULTS_PER_PAGE).map((product) => (
                  <SearchProductCard
                    key={product.id}
                    product={product}
                    query=""
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Close bar */}
      <div className="border-t border-[#e7e7e7] px-4 py-2 flex items-center justify-between bg-[#FAFAF8]">
        <p className="text-[10px] text-[#999]">
          Press <kbd className="bg-white border border-[#ddd] px-1 py-0.5 text-[9px] mx-0.5">ESC</kbd> to close
        </p>
        {hasQuery && totalCount > 0 && (
          <button
            className="bg-[#044c5c] text-white text-[11px] px-4 py-1.5 hover:bg-[#033a48] transition-colors flex items-center gap-1.5"
            style={{ fontWeight: 600 }}
            onClick={() => {
              saveRecentSearch(query);
              onClose();
            }}
          >
            See all results for "{query}" <ArrowRight size={11} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Mini Product Card for search results ── */
function SearchProductCard({
  product,
  query,
}: {
  product: Product;
  query: string;
}) {
  const savings =
    product.oldPrice && product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : 0;

  return (
    <div className="group/card cursor-pointer text-left">
      {/* Image */}
      <div className="relative aspect-square bg-[#f5f5f5] overflow-hidden mb-2 border border-[#e7e7e7]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <span
            className={`absolute top-1.5 left-1.5 text-white text-[8px] px-1.5 py-0.5 uppercase tracking-wide ${
              product.badge === "New"
                ? "bg-[#111827]"
                : product.badge === "Hot"
                ? "bg-[#d41c5c]"
                : product.badge === "Sale"
                ? "bg-[#FF8A00]"
                : product.badge === "Eco"
                ? "bg-[#2F8F3A]"
                : "bg-[#044c5c]"
            }`}
            style={{ fontWeight: 700 }}
          >
            {product.badge}
            {savings > 0 && ` -${savings}%`}
          </span>
        )}
      </div>

      {/* Title */}
      <h6
        className="text-[#222529] text-[12px] line-clamp-2 mb-1 group-hover/card:text-[#044c5c] transition-colors text-left"
        style={{ fontWeight: 500 }}
      >
        {highlightMatch(product.name, query)}
      </h6>

      {/* Rating */}
      {product.rating != null && (
        <div className="flex items-center gap-1 mb-1">
          <div className="flex items-center gap-px">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={10}
                className={
                  star <= Math.floor(product.rating!)
                    ? "text-[#FFC120] fill-[#FFC120]"
                    : "text-[#DDD] fill-[#DDD]"
                }
              />
            ))}
          </div>
          <span className="text-[9px] text-[#999]">
            {((product.id.charCodeAt(product.id.length - 1) * 7) % 40) + 5} reviews
          </span>
        </div>
      )}

      {/* Price */}
      <div className="mb-2 text-left">
        {product.quoteOnly ? (
          <span className="text-[#044c5c] text-[12px]" style={{ fontWeight: 600 }}>
            Get Quote
          </span>
        ) : (
          <div className="flex items-center gap-1.5">
            <span className="text-[#222529] text-[13px]" style={{ fontWeight: 700 }}>
              AED {product.price}
            </span>
            {product.oldPrice && (
              <span className="text-[#999] text-[10px] line-through">
                AED {product.oldPrice}
              </span>
            )}
          </div>
        )}
      </div>

      {/* CTA */}
      <button
        className="w-full bg-[#044c5c] text-white text-[10px] py-1.5 uppercase tracking-wider hover:bg-[#033a48] transition-colors text-left px-2"
        style={{ fontWeight: 600 }}
      >
        Request a Quote
      </button>
    </div>
  );
}