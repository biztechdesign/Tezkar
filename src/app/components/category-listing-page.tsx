import { useParams, Link, useNavigate } from "react-router";
import { useState, useMemo, useRef, useEffect } from "react";
import {
  Home, ChevronRight, ChevronDown, ChevronUp,
  SlidersHorizontal, X, Grid3X3,
} from "lucide-react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import LayersIcon from '@mui/icons-material/Layers';
import { getCategoryBySlug } from "./category-data";
import { steelBottleProducts } from "./product-data";
import type { ListingProduct } from "./product-data";

/* ── Badge colors ── */
const badgeColors: Record<string, string> = {
  New: "bg-[#d41c5c]",
  Hot: "bg-[#d41c5c]",
  Sale: "bg-[#d41c5c]",
};

const allowedBadges = ["New", "Hot", "Sale"];

/* ── SEO content & FAQs per category slug ── */
const categorySEO: Record<string, { description: string; content: string; faqs: { q: string; a: string }[] }> = {
  drinkwares: {
    description:
      "Explore our premium collection of branded drinkwares — from stainless steel bottles and ceramic mugs to travel tumblers and insulated flasks. Perfect for corporate gifting, employee welcome kits, and promotional events across the UAE.",
    content:
      "At TezkarGift, we curate the finest drinkware products for businesses looking to make a lasting impression. Whether you need custom-branded water bottles for a product launch, engraved coffee mugs for your office, or premium tumblers for VIP clients, our collection covers every occasion. All products are available with full branding options including laser engraving, UV printing, and screen printing. Based in Dubai, we offer fast turnaround times and competitive bulk pricing across the UAE and GCC region.",
    faqs: [
      { q: "What types of drinkwares do you offer for corporate gifting?", a: "We offer a wide range including stainless steel bottles, ceramic mugs, travel tumblers, glass bottles, sports bottles, insulated flasks, coffee cups, and sippy cups — all available with custom branding." },
      { q: "What is the minimum order quantity (MOQ) for branded drinkwares?", a: "MOQ varies by product. Most drinkware items start from 50 pieces for custom branding. Ready-stock items with no customization can be ordered in smaller quantities." },
      { q: "What branding methods are available for drinkwares?", a: "We offer laser engraving, UV printing, screen printing, pad printing, and full-wrap sublimation depending on the product material and surface area." },
      { q: "How long does it take to receive customized drinkware orders?", a: "Standard production takes 7–10 working days after artwork approval. Rush orders can be accommodated in 3–5 working days for select products at an additional cost." },
      { q: "Do you offer eco-friendly drinkware options?", a: "Yes! We carry a range of sustainable options including bamboo-lid bottles, recycled stainless steel bottles, and BPA-free reusable cups that align with green corporate initiatives." },
      { q: "Can I get samples before placing a bulk order?", a: "Absolutely. We provide pre-production samples (plain or branded) so you can evaluate quality before committing to a full order. Sample fees are typically adjusted against the bulk order value." },
    ],
  },
};

/* ── Banner taglines per category ── */
const categoryBannerTaglines: Record<string, string> = {
  drinkwares: "Premium branded bottles, mugs & tumblers for every corporate occasion.",
};
const defaultTagline = "Discover premium corporate gifts curated for your brand.";

/* ── Product Card ── */
function ListingProductCard({ product }: { product: ListingProduct }) {
  const navigate = useNavigate();
  const savings =
    product.oldPrice && product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: "150px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group bg-white overflow-hidden hover:shadow-lg transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ fontFamily: "var(--font-body)", borderRadius: "0px" }}
    >
      {/* ── Image ── */}
      <div
        className="relative aspect-square overflow-hidden bg-[#f5f5f5] cursor-pointer"
        onClick={() => navigate(`/product/${product.slug}`)}
      >
        {visible && (
          <>
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${product.secondaryImage ? "group-hover:opacity-0" : "group-hover:scale-105"}`}
            />
            {product.secondaryImage && (
              <img
                src={product.secondaryImage}
                alt={`${product.name} alt`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            )}
          </>
        )}
        {!visible && <div className="absolute inset-0 bg-[#eee] animate-pulse" />}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col items-start gap-1">
          {product.badge && allowedBadges.includes(product.badge) && (
            <span
              className={`${badgeColors[product.badge]} text-white text-[11px] px-2.5 py-1 uppercase tracking-wide inline-block`}
              style={{ fontWeight: 700, borderRadius: "0px" }}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Quick-action icons */}
        <div className="absolute top-10 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <button className="w-7 h-7 bg-white text-[#222529] flex items-center justify-center shadow-sm hover:bg-[#044c5c] hover:text-white transition-colors" style={{ borderRadius: "0px" }} title="Wishlist">
            <FavoriteBorderIcon sx={{ fontSize: 14 }} />
          </button>
          <button className="w-7 h-7 bg-white text-[#222529] flex items-center justify-center shadow-sm hover:bg-[#044c5c] hover:text-white transition-colors" style={{ borderRadius: "0px" }} title="Compare">
            <CompareArrowsIcon sx={{ fontSize: 14 }} />
          </button>
        </div>

        {/* Bottom action bar — Quick View / Add to Cart / Request a Quote */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex bg-white">
          <button
            className="flex-1 bg-white text-[#222529] py-3 flex items-center justify-center hover:bg-[#044c5c] hover:text-white transition-colors"
            style={{ borderRadius: "0px", borderRight: "1px solid #e7e7e7" }}
            onClick={(e) => { e.stopPropagation(); }}
            title="Quick View"
            aria-label="Quick View"
          >
            <VisibilityIcon sx={{ fontSize: 18 }} />
          </button>
          <button
            className="flex-1 bg-white text-[#044c5c] py-3 flex items-center justify-center hover:bg-[#044c5c] hover:text-white transition-colors"
            style={{ borderRadius: "0px", borderRight: "1px solid #e7e7e7" }}
            onClick={(e) => { e.stopPropagation(); }}
            title="Add to Cart"
            aria-label="Add to Cart"
          >
            <ShoppingCartIcon sx={{ fontSize: 18 }} />
          </button>
          <button
            className="flex-1 bg-white text-[#d41c5c] py-3 flex items-center justify-center hover:bg-[#d41c5c] hover:text-white transition-colors"
            style={{ borderRadius: "0px" }}
            onClick={(e) => { e.stopPropagation(); }}
            title="Request a Quote"
            aria-label="Request a Quote"
          >
            <RequestQuoteIcon sx={{ fontSize: 18 }} />
          </button>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] text-[#999] uppercase tracking-wide">{product.brand}</p>
          <span className="text-[9px] text-[#bbb] tracking-wide">{product.sku}</span>
        </div>
        <Link to={`/product/${product.slug}`}>
          <h4 className="text-[#222529] text-[13px] mb-1.5 line-clamp-2 min-h-[36px] hover:text-[#044c5c] cursor-pointer transition-colors" style={{ fontWeight: 400 }}>
            {product.name}
          </h4>
        </Link>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[9px] bg-[#f4f4f4] text-[#555] px-1.5 py-0.5 flex items-center gap-1" style={{ fontWeight: 500, borderRadius: "0px" }}>
            <LayersIcon sx={{ fontSize: 10 }} /> MOQ: {product.moq} pcs
          </span>
          {product.readyStock && (
            <span className="text-[9px] bg-[#2F8F3A]/10 text-[#2F8F3A] px-1.5 py-0.5" style={{ fontWeight: 600, borderRadius: "0px" }}>In Stock</span>
          )}
        </div>
        {/* Rating */}
        <div className="flex items-center gap-1 mb-1.5">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} className={`w-3 h-3 ${s <= Math.floor(product.rating) ? "text-[#FFC120]" : "text-[#DDD]"}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[10px] text-[#999]">({product.reviewCount})</span>
        </div>
        {/* Price */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[#222529] text-[14px]" style={{ fontWeight: 700 }}>From AED {product.price}</span>
          {product.oldPrice && <span className="text-[#999] text-[11px] line-through">AED {product.oldPrice}</span>}
        </div>
      </div>
    </div>
  );
}

/* ── Filter Sidebar ── */
function FilterSidebar({
  filters,
  setFilters,
  products,
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  products: ListingProduct[];
}) {
  const brands = [...new Set(products.map((p) => p.brand))];
  const types = [...new Set(products.map((p) => p.productType))];
  const badges = [...new Set(products.map((p) => p.badge).filter(Boolean))] as string[];
  const filteredBadges = badges.filter((b) => allowedBadges.includes(b));
  const prices = products.map((p) => p.price);
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    brand: true,
    type: true,
    price: true,
    badge: true,
    stock: true,
  });

  const toggle = (s: string) => setOpenSections((p) => ({ ...p, [s]: !p[s] }));

  return (
    <div className="space-y-4">
      {/* Brand */}
      <FilterSection title="Brand" open={openSections.brand} toggle={() => toggle("brand")}>
        {brands.map((b) => (
          <label key={b} className="flex items-center gap-2 text-[13px] text-[#444] cursor-pointer hover:text-[#044c5c]">
            <input
              type="checkbox"
              checked={filters.brands.includes(b)}
              onChange={() =>
                setFilters((f) => ({
                  ...f,
                  brands: f.brands.includes(b) ? f.brands.filter((x) => x !== b) : [...f.brands, b],
                }))
              }
              className="accent-[#044c5c] w-3.5 h-3.5"
              style={{ borderRadius: "0px" }}
            />
            {b}
          </label>
        ))}
      </FilterSection>

      {/* Product Type */}
      <FilterSection title="Product Type" open={openSections.type} toggle={() => toggle("type")}>
        {types.map((t) => (
          <label key={t} className="flex items-center gap-2 text-[13px] text-[#444] cursor-pointer hover:text-[#044c5c]">
            <input
              type="checkbox"
              checked={filters.types.includes(t)}
              onChange={() =>
                setFilters((f) => ({
                  ...f,
                  types: f.types.includes(t) ? f.types.filter((x) => x !== t) : [...f.types, t],
                }))
              }
              className="accent-[#044c5c] w-3.5 h-3.5"
              style={{ borderRadius: "0px" }}
            />
            {t}
          </label>
        ))}
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range" open={openSections.price} toggle={() => toggle("price")}>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder={`${minP}`}
            value={filters.priceMin ?? ""}
            onChange={(e) => setFilters((f) => ({ ...f, priceMin: e.target.value ? Number(e.target.value) : undefined }))}
            className="w-full border border-[#e7e7e7] text-[12px] px-2 py-1.5 focus:outline-none focus:border-[#044c5c]"
            style={{ borderRadius: "0px" }}
          />
          <span className="text-[11px] text-[#999]">to</span>
          <input
            type="number"
            placeholder={`${maxP}`}
            value={filters.priceMax ?? ""}
            onChange={(e) => setFilters((f) => ({ ...f, priceMax: e.target.value ? Number(e.target.value) : undefined }))}
            className="w-full border border-[#e7e7e7] text-[12px] px-2 py-1.5 focus:outline-none focus:border-[#044c5c]"
            style={{ borderRadius: "0px" }}
          />
        </div>
      </FilterSection>

      {/* Badge */}
      {filteredBadges.length > 0 && (
        <FilterSection title="Labels" open={openSections.badge} toggle={() => toggle("badge")}>
          {filteredBadges.map((b) => (
            <label key={b} className="flex items-center gap-2 text-[13px] text-[#444] cursor-pointer hover:text-[#044c5c]">
              <input
                type="checkbox"
                checked={filters.badges.includes(b)}
                onChange={() =>
                  setFilters((f) => ({
                    ...f,
                    badges: f.badges.includes(b) ? f.badges.filter((x) => x !== b) : [...f.badges, b],
                  }))
                }
                className="accent-[#044c5c] w-3.5 h-3.5"
                style={{ borderRadius: "0px" }}
              />
              <span className={`${badgeColors[b]} text-white text-[9px] px-1.5 py-0.5 uppercase`} style={{ fontWeight: 600, borderRadius: "0px" }}>{b}</span>
            </label>
          ))}
        </FilterSection>
      )}

      {/* In Stock */}
      <FilterSection title="Availability" open={openSections.stock} toggle={() => toggle("stock")}>
        <label className="flex items-center gap-2 text-[13px] text-[#444] cursor-pointer hover:text-[#044c5c]">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={() => setFilters((f) => ({ ...f, inStockOnly: !f.inStockOnly }))}
            className="accent-[#044c5c] w-3.5 h-3.5"
            style={{ borderRadius: "0px" }}
          />
          Ready Stock Only
        </label>
      </FilterSection>
    </div>
  );
}

function FilterSection({ title, open, toggle, children }: { title: string; open: boolean; toggle: () => void; children: React.ReactNode }) {
  return (
    <div className="border-b border-[#e7e7e7] pb-3">
      <button onClick={toggle} className="flex items-center justify-between w-full text-[13px] text-[#222529] mb-2" style={{ fontWeight: 600 }}>
        {title}
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && <div className="space-y-2 pl-0.5">{children}</div>}
    </div>
  );
}

/* ── Types ── */
interface Filters {
  brands: string[];
  types: string[];
  badges: string[];
  priceMin?: number;
  priceMax?: number;
  inStockOnly: boolean;
}

type SortKey = "newest" | "price-low" | "price-high" | "popularity";

/* ── Category Banner ── */
function CategoryBanner({ name, slug }: { name: string; slug: string }) {
  const tagline = categoryBannerTaglines[slug] || defaultTagline;

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #044c5c 0%, #033a48 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 py-8 md:py-10 relative z-10">
        <p
          className="text-[11px] uppercase tracking-[0.2em] mb-2"
          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)", fontWeight: 500 }}
        >
          TezkarGift Collection
        </p>
        <h1
          className="text-white text-[26px] md:text-[32px] mb-2"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, lineHeight: 1.2 }}
        >
          {name}
        </h1>
        <p
          className="text-[14px] max-w-[600px]"
          style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)", fontWeight: 400, lineHeight: 1.6 }}
        >
          {tagline}
        </p>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export function CategoryListingPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const slug = categorySlug || "drinkwares";
  const category = getCategoryBySlug(slug);

  const [filters, setFilters] = useState<Filters>({
    brands: [],
    types: [],
    badges: [],
    inStockOnly: false,
  });
  const [sort, setSort] = useState<SortKey>("popularity");
  const [mobileFilters, setMobileFilters] = useState(false);

  const products = steelBottleProducts; // In future, fetch by category slug

  /* ── 404 ── */
  if (!category) {
    return (
      <div
        className="max-w-[1400px] mx-auto px-4 py-20 text-center"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <h2
          className="text-[#2C2C2C] text-[28px] mb-3"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
        >
          Category Not Found
        </h2>
        <p className="text-[#5B616A] text-[14px] mb-6">
          The category you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#044c5c] text-white text-[13px] px-6 py-2.5 hover:bg-[#033a48] transition-colors"
          style={{ fontWeight: 600, borderRadius: "8px" }}
        >
          Back to Home
        </Link>
      </div>
    );
  }

  /* Apply filters */
  const filtered = useMemo(() => {
    let result = [...products];
    if (filters.brands.length) result = result.filter((p) => filters.brands.includes(p.brand));
    if (filters.types.length) result = result.filter((p) => filters.types.includes(p.productType));
    if (filters.badges.length) result = result.filter((p) => p.badge && filters.badges.includes(p.badge));
    if (filters.priceMin != null) result = result.filter((p) => p.price >= filters.priceMin!);
    if (filters.priceMax != null) result = result.filter((p) => p.price <= filters.priceMax!);
    if (filters.inStockOnly) result = result.filter((p) => p.readyStock);
    return result;
  }, [products, filters]);

  /* Apply sort */
  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "newest": return arr.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      case "price-low": return arr.sort((a, b) => a.price - b.price);
      case "price-high": return arr.sort((a, b) => b.price - a.price);
      case "popularity": return arr.sort((a, b) => b.popularity - a.popularity);
      default: return arr;
    }
  }, [filtered, sort]);

  const activeFilterCount = filters.brands.length + filters.types.length + filters.badges.length + (filters.priceMin != null ? 1 : 0) + (filters.priceMax != null ? 1 : 0) + (filters.inStockOnly ? 1 : 0);

  const clearFilters = () => setFilters({ brands: [], types: [], badges: [], inStockOnly: false });

  /* Breadcrumbs */
  const crumbs: { label: string; to?: string }[] = [
    { label: "Home", to: "/" },
  ];
  if (category.grandParentLabel && category.grandParent) {
    crumbs.push({
      label: category.grandParentLabel,
      to: `/category/${category.grandParent}`,
    });
  }
  if (category.parentLabel && category.parent) {
    crumbs.push({
      label: category.parentLabel,
      to: `/category/${category.parent}`,
    });
  }
  crumbs.push({ label: category.name });

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      {/* Breadcrumb */}
      <div className="border-b border-[#e7e7e7] bg-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <nav className="flex items-center gap-1.5 py-3 overflow-x-auto text-nowrap">
            {crumbs.map((crumb, i) => {
              const isLast = i === crumbs.length - 1;
              return (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight size={11} className="text-[#bbb] flex-shrink-0" />}
                  {i === 0 ? (
                    <Link to="/" className="text-[#888] hover:text-[#044c5c] transition-colors"><Home size={13} /></Link>
                  ) : crumb.to && !isLast ? (
                    <Link to={crumb.to} className="text-[11px] text-[#888] hover:text-[#044c5c] uppercase tracking-wider transition-colors" style={{ fontWeight: 500 }}>{crumb.label}</Link>
                  ) : (
                    <span className={`text-[11px] uppercase tracking-wider ${isLast ? "text-[#2C2C2C]" : "text-[#888]"}`} style={{ fontWeight: isLast ? 600 : 500 }}>{crumb.label}</span>
                  )}
                </span>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Category Banner */}
      <CategoryBanner name={category.name} slug={slug} />

      {/* Product Listing Section */}
      <section className="py-6 lg:py-8 bg-[#FAFAF8]">
        <div className="max-w-[1400px] mx-auto px-4">
          {/* Section header */}
          <div className="flex items-center justify-between mb-6 border-b border-[#e7e7e7] pb-3">
            <h2
              className="text-[#222529] text-[20px] md:text-[24px] uppercase tracking-wide relative"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
            >
              {category.name}
              <span className="absolute bottom-[-13px] left-0 w-full h-[2px] bg-[#044c5c]" />
            </h2>
            <span className="text-[12px] text-[#888]">{sorted.length} Products</span>
          </div>

          {/* SEO description */}
          {categorySEO[slug] && (
            <p className="text-[#5B616A] text-[14px] mb-5 max-w-[800px]" style={{ lineHeight: 1.6 }}>
              {categorySEO[slug].description}
            </p>
          )}

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
            <button
              onClick={() => setMobileFilters(true)}
              className="lg:hidden flex items-center gap-1.5 border border-[#e7e7e7] px-3 py-2 text-[12px] text-[#222529] hover:border-[#044c5c] transition-colors"
              style={{ fontWeight: 500, borderRadius: "0px" }}
            >
              <SlidersHorizontal size={14} /> Filters
              {activeFilterCount > 0 && (
                <span className="bg-[#044c5c] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">{activeFilterCount}</span>
              )}
            </button>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-[11px] text-[#888] uppercase tracking-wide" style={{ fontWeight: 500 }}>Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="border border-[#e7e7e7] text-[12px] text-[#222529] px-2 py-1.5 pr-6 focus:outline-none focus:border-[#044c5c] bg-white"
                style={{ fontWeight: 500, borderRadius: "0px" }}
              >
                <option value="popularity">Popularity</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2 flex-wrap mb-4">
              {filters.brands.map((b) => (
                <Chip key={b} label={b} onRemove={() => setFilters((f) => ({ ...f, brands: f.brands.filter((x) => x !== b) }))} />
              ))}
              {filters.types.map((t) => (
                <Chip key={t} label={t} onRemove={() => setFilters((f) => ({ ...f, types: f.types.filter((x) => x !== t) }))} />
              ))}
              {filters.badges.map((b) => (
                <Chip key={b} label={b} onRemove={() => setFilters((f) => ({ ...f, badges: f.badges.filter((x) => x !== b) }))} />
              ))}
              {filters.inStockOnly && <Chip label="In Stock" onRemove={() => setFilters((f) => ({ ...f, inStockOnly: false }))} />}
              <button onClick={clearFilters} className="text-[11px] text-[#d41c5c] hover:underline" style={{ fontWeight: 500 }}>Clear All</button>
            </div>
          )}

          <div className="flex gap-6">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-[220px] flex-shrink-0">
              <FilterSidebar filters={filters} setFilters={setFilters} products={products} />
            </aside>

            {/* Product Grid - 4 columns */}
            <div className="flex-1">
              {sorted.length === 0 ? (
                <div className="py-20 text-center">
                  <Grid3X3 size={40} className="mx-auto text-[#ddd] mb-3" />
                  <p className="text-[#888] text-[14px] mb-3">No products match your filters.</p>
                  <button onClick={clearFilters} className="text-[#044c5c] text-[13px] hover:underline" style={{ fontWeight: 600 }}>Clear filters</button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {sorted.map((p) => (
                    <ListingProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile filter overlay */}
      {mobileFilters && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end lg:hidden" onClick={() => setMobileFilters(false)}>
          <div className="bg-white w-[300px] h-full overflow-y-auto p-4" onClick={(e) => e.stopPropagation()} style={{ borderRadius: "0px" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] text-[#222529]" style={{ fontWeight: 600 }}>Filters</h3>
              <button onClick={() => setMobileFilters(false)}><X size={18} /></button>
            </div>
            <FilterSidebar filters={filters} setFilters={setFilters} products={products} />
            <button
              onClick={() => setMobileFilters(false)}
              className="mt-4 w-full bg-[#044c5c] text-white py-2.5 text-[13px] hover:bg-[#033a48] transition-colors"
              style={{ fontWeight: 600, borderRadius: "0px" }}
            >
              Apply Filters ({sorted.length} results)
            </button>
          </div>
        </div>
      )}

      {/* SEO Content Block */}
      {categorySEO[slug] && (
        <section className="py-8 lg:py-12 bg-white border-t border-[#e7e7e7]">
          <div className="max-w-[1400px] mx-auto px-4">
            <h2
              className="text-[#222529] text-[18px] md:text-[20px] mb-4"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, lineHeight: 1.3 }}
            >
              About {category.name} — Corporate Gifting Collection
            </h2>
            <p className="text-[#5B616A] text-[14px] max-w-[900px]" style={{ lineHeight: 1.7 }}>
              {categorySEO[slug].content}
            </p>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {categorySEO[slug] && <CategoryFAQ faqs={categorySEO[slug].faqs} categoryName={category.name} />}
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1 bg-[#044c5c]/10 text-[#044c5c] text-[11px] px-2 py-1" style={{ fontWeight: 500, borderRadius: "0px" }}>
      {label}
      <button onClick={onRemove}><X size={10} /></button>
    </span>
  );
}

/* ── Category FAQ Accordion ── */
function CategoryFAQ({ faqs, categoryName }: { faqs: { q: string; a: string }[]; categoryName: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-8 lg:py-12 bg-white border-t border-[#e7e7e7]">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="mb-6">
          <p
            className="text-[#C8956C] text-[12px] uppercase tracking-[0.15em] mb-1"
            style={{ fontWeight: 600 }}
          >
            Common Questions
          </p>
          <h2
            className="text-[#222529] text-[18px] md:text-[20px]"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, lineHeight: 1.3 }}
          >
            {categoryName} — Frequently Asked Questions
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[0, 1].map((col) => {
            const mid = Math.ceil(faqs.length / 2);
            const items = col === 0 ? faqs.slice(0, mid) : faqs.slice(mid);
            const offset = col === 0 ? 0 : mid;
            return (
              <div key={col} className="border border-[#e7e7e7]" style={{ borderRadius: "0px" }}>
                {items.map((faq, idx) => {
                  const globalIdx = offset + idx;
                  const isOpen = openIdx === globalIdx;
                  return (
                    <div key={globalIdx} className={idx > 0 ? "border-t border-[#e7e7e7]" : ""}>
                      <button
                        onClick={() => setOpenIdx(isOpen ? null : globalIdx)}
                        className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-[#f9f9f9] transition-colors"
                      >
                        <span className="text-[#222529] text-[13px] pr-4" style={{ fontWeight: isOpen ? 600 : 400 }}>
                          {faq.q}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`flex-shrink-0 text-[#999] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-[#666] text-[12px]" style={{ lineHeight: 1.6 }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
