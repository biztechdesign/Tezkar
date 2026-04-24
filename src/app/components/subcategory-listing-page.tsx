import { useParams, Link, useNavigate, useLocation } from "react-router";
import { useState, useMemo, useRef, useEffect } from "react";
import {
  Home, ChevronRight, ChevronDown, ChevronUp,
  SlidersHorizontal, X, Grid3X3,
  BookOpen, ShieldCheck, Truck, Award,
} from "lucide-react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import LayersIcon from '@mui/icons-material/Layers';
import { steelBottleProducts } from "./product-data";
import type { ListingProduct } from "./product-data";

/* ── Badge colors ── */
const badgeColors: Record<string, string> = {
  New: "bg-[#d41c5c]",
  Hot: "bg-[#d41c5c]",
  Sale: "bg-[#d41c5c]",
};

const allowedBadges = ["New", "Hot", "Sale"];

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
      className={`group bg-white border border-[#e7e7e7] overflow-hidden hover:shadow-md transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ fontFamily: "var(--font-body)" }}
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
              style={{ fontWeight: 700 }}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Quick-action icons */}
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
            onClick={(e) => { e.stopPropagation(); }}
            title="Quick View"
            aria-label="Quick View"
          >
            <VisibilityIcon sx={{ fontSize: 18 }} />
          </button>
          <button
            className="flex-1 bg-white text-[#044c5c] py-3 flex items-center justify-center hover:bg-[#044c5c] hover:text-white transition-colors"
            style={{ borderRight: "1px solid #e7e7e7" }}
            onClick={(e) => { e.stopPropagation(); }}
            title="Add to Cart"
            aria-label="Add to Cart"
          >
            <ShoppingCartIcon sx={{ fontSize: 18 }} />
          </button>
          <button
            className="flex-1 bg-white text-[#d41c5c] py-3 flex items-center justify-center hover:bg-[#d41c5c] hover:text-white transition-colors"
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
          <span className="text-[9px] bg-[#f4f4f4] text-[#555] px-1.5 py-0.5 flex items-center gap-1" style={{ fontWeight: 500 }}>
            <LayersIcon sx={{ fontSize: 10 }} /> MOQ: {product.moq} pcs
          </span>
          {product.readyStock && (
            <span className="text-[9px] bg-[#2F8F3A]/10 text-[#2F8F3A] px-1.5 py-0.5" style={{ fontWeight: 600 }}>In Stock</span>
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
        {product.printMethods.length > 0 && (
          <p className="text-[9px] text-[#bbb] mt-1.5 truncate hidden">Print: {product.printMethods.join(", ")}</p>
        )}
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
          />
          <span className="text-[11px] text-[#999]">to</span>
          <input
            type="number"
            placeholder={`${maxP}`}
            value={filters.priceMax ?? ""}
            onChange={(e) => setFilters((f) => ({ ...f, priceMax: e.target.value ? Number(e.target.value) : undefined }))}
            className="w-full border border-[#e7e7e7] text-[12px] px-2 py-1.5 focus:outline-none focus:border-[#044c5c]"
          />
        </div>
      </FilterSection>

      {/* Badge */}
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
            />
            <span className={`${badgeColors[b]} text-white text-[9px] px-1.5 py-0.5 uppercase`} style={{ fontWeight: 600 }}>{b}</span>
          </label>
        ))}
      </FilterSection>

      {/* In Stock */}
      <FilterSection title="Availability" open={openSections.stock} toggle={() => toggle("stock")}>
        <label className="flex items-center gap-2 text-[13px] text-[#444] cursor-pointer hover:text-[#044c5c]">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={() => setFilters((f) => ({ ...f, inStockOnly: !f.inStockOnly }))}
            className="accent-[#044c5c] w-3.5 h-3.5"
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

/* ── Main Page ── */
export function SubcategoryListingPage() {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  /* Derive slug from URL path when route has no :slug param */
  const slug = paramSlug || location.pathname.split("/").filter(Boolean).pop() || "stainless-steel-bottles";
  const seoData = productListSEO[slug];

  const [filters, setFilters] = useState<Filters>({
    brands: [],
    types: [],
    badges: [],
    inStockOnly: false,
  });
  const [sort, setSort] = useState<SortKey>("popularity");
  const [mobileFilters, setMobileFilters] = useState(false);

  const products = steelBottleProducts; // In future, fetch by slug

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
  const crumbs = [
    { label: "Home", to: "/" },
    { label: "Drinkwares", to: "/category/drinkwares" },
    { label: "Stainless Steel Bottles" },
  ];

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

      <section className="py-6 lg:py-8 bg-[#FAFAF8]">
        <div className="max-w-[1400px] mx-auto px-4">
          {/* Section header */}
          <div className="flex items-center justify-between mb-6 border-b border-[#e7e7e7] pb-3">
            <h1
              className="text-[#222529] text-[20px] md:text-[24px] uppercase tracking-wide relative"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
            >
              Stainless Steel Bottles
              <span className="absolute bottom-[-13px] left-0 w-full h-[2px] bg-[#044c5c]" />
            </h1>
            <span className="text-[12px] text-[#888]">{sorted.length} Products</span>
          </div>

          {/* SEO description */}
          {slug && seoData && (
            <p className="text-[#5B616A] text-[14px] mb-5 max-w-[800px]" style={{ lineHeight: 1.6 }}>
              {seoData.description}
            </p>
          )}

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
            <button
              onClick={() => setMobileFilters(true)}
              className="lg:hidden flex items-center gap-1.5 border border-[#e7e7e7] px-3 py-2 text-[12px] text-[#222529] hover:border-[#044c5c] transition-colors"
              style={{ fontWeight: 500 }}
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
                style={{ fontWeight: 500 }}
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
          <div className="bg-white w-[300px] h-full overflow-y-auto p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] text-[#222529]" style={{ fontWeight: 600 }}>Filters</h3>
              <button onClick={() => setMobileFilters(false)}><X size={18} /></button>
            </div>
            <FilterSidebar filters={filters} setFilters={setFilters} products={products} />
            <button
              onClick={() => setMobileFilters(false)}
              className="mt-4 w-full bg-[#044c5c] text-white py-2.5 text-[13px] hover:bg-[#033a48] transition-colors"
              style={{ fontWeight: 600 }}
            >
              Apply Filters ({sorted.length} results)
            </button>
          </div>
        </div>
      )}

      {/* ── SEO Content Block ── */}
      {slug && seoData && (
        <section className="py-8 lg:py-12 bg-white border-t border-[#e7e7e7]">
          <div className="max-w-[1400px] mx-auto px-4">
            <h2
              className="text-[#222529] text-[18px] md:text-[20px] mb-4"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600, lineHeight: 1.3 }}
            >
              Stainless Steel Bottles for Corporate Gifting in Dubai & UAE
            </h2>
            <p className="text-[#5B616A] text-[14px] max-w-[900px]" style={{ lineHeight: 1.7 }}>
              {seoData.content}
            </p>
            <p className="text-[#5B616A] text-[14px] max-w-[900px] mt-4" style={{ lineHeight: 1.7 }}>
              {seoData.contentExtra}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {seoData.features.map((feature, idx) => {
                const IconMap: Record<string, React.ReactNode> = {
                  shield: <ShieldCheck size={20} className="text-[#044c5c]" />,
                  truck: <Truck size={20} className="text-[#044c5c]" />,
                  award: <Award size={20} className="text-[#044c5c]" />,
                  book: <BookOpen size={20} className="text-[#044c5c]" />,
                };
                return (
                  <div key={idx} className="flex gap-3 p-4 bg-[#FAFAF8] border border-[#e7e7e7]">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#044c5c]/10 flex items-center justify-center">
                      {IconMap[feature.icon]}
                    </div>
                    <div>
                      <h3
                        className="text-[#222529] text-[14px] mb-1"
                        style={{ fontWeight: 600, lineHeight: 1.3 }}
                      >
                        {feature.title}
                      </h3>
                      <p className="text-[#5B616A] text-[12px]" style={{ lineHeight: 1.5 }}>
                        {feature.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ Section ── */}
      {slug && seoData && <ProductListFAQ faqs={seoData.faqs} />}
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1 bg-[#044c5c]/10 text-[#044c5c] text-[11px] px-2 py-1" style={{ fontWeight: 500 }}>
      {label}
      <button onClick={onRemove}><X size={10} /></button>
    </span>
  );
}

/* ── SEO content & FAQs for product listing pages ── */
const productListSEO: Record<string, { description: string; content: string; contentExtra: string; features: { icon: string; title: string; text: string }[]; faqs: { q: string; a: string }[] }> = {
  "stainless-steel-bottles": {
    description:
      "Browse our curated range of branded stainless steel bottles — ideal for corporate gifts, employee kits, and promotional giveaways. Available in single-wall, double-wall vacuum insulated, and sports designs with full customization options.",
    content:
      "Stainless steel bottles are one of the most popular corporate gifting items in the UAE and across the GCC. They combine durability, sustainability, and everyday utility — making them a perfect brand ambassador for your company. At TezkarGift, every bottle in our collection is sourced from trusted manufacturers and can be branded with your logo using laser engraving, UV printing, or screen printing. From sleek executive bottles for client gifting to lightweight sports bottles for wellness campaigns, our range covers budgets from economy to premium.",
    contentExtra:
      "We also offer gift set packaging with custom boxes, ribbons, and insert cards to elevate your brand experience. Whether you're planning a corporate event in Dubai, outfitting an employee welcome kit in Abu Dhabi, or sourcing promotional merchandise for a trade show across the GCC, our stainless steel bottle collection delivers on quality, style, and branding impact. All products comply with FDA and LFGB food-contact standards, ensuring safety for your recipients.",
    features: [
      { icon: "shield", title: "Premium Quality", text: "Food-grade 304 stainless steel, BPA-free, and built to last with double-wall vacuum insulation technology." },
      { icon: "truck", title: "Fast Delivery", text: "7–10 day standard production with express options available. Free shipping on orders over AED 2,000 within the UAE." },
      { icon: "award", title: "Full Customization", text: "Laser engraving, UV printing, screen printing, and full-color sublimation — choose the method that suits your brand." },
      { icon: "book", title: "Bulk Pricing", text: "Competitive tiered pricing for orders of 50+ units. Request a quote for custom volumes and corporate accounts." },
    ],
    faqs: [
      { q: "What sizes are available for stainless steel bottles?", a: "Our stainless steel bottles come in a variety of sizes ranging from 350ml to 1000ml. The most popular corporate gifting sizes are 500ml and 750ml." },
      { q: "Can I get my company logo printed on the bottles?", a: "Yes, all bottles support custom branding. We offer laser engraving for a premium finish, UV printing for full-color logos, and screen printing for cost-effective bulk orders." },
      { q: "What is the difference between single-wall and vacuum insulated bottles?", a: "Single-wall bottles are lighter and more affordable but do not retain temperature. Double-wall vacuum insulated bottles keep beverages hot for up to 12 hours and cold for up to 24 hours." },
      { q: "Are these bottles BPA-free and food-safe?", a: "Yes, all our stainless steel bottles are made from food-grade 304 stainless steel and are 100% BPA-free, meeting international safety standards." },
      { q: "Do you offer gift packaging for corporate orders?", a: "Absolutely. We provide premium gift boxes, velvet pouches, and custom packaging solutions that can be branded with your company colors and logo." },
      { q: "What is the typical turnaround time for a branded bottle order?", a: "Standard orders take 7–10 working days after artwork approval. For urgent requirements, express production in 3–5 working days is available at a small surcharge." },
      { q: "Can I mix different bottle styles in one order?", a: "Yes, you can combine different styles and colors within the same order as long as the total quantity meets the MOQ. This is great for creating variety in gift sets or catering to different team preferences." },
      { q: "Do you ship outside the UAE?", a: "Yes, we deliver across the entire GCC region including Saudi Arabia, Oman, Bahrain, Kuwait, and Qatar. International shipping to other countries is also available upon request." },
    ],
  },
};

/* ── FAQ Component ── */
function ProductListFAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-8 lg:py-12 bg-[#FAFAF8] border-t border-[#e7e7e7]">
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
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600, lineHeight: 1.3 }}
          >
            Stainless Steel Bottles — Frequently Asked Questions
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[0, 1].map((col) => {
            const mid = Math.ceil(faqs.length / 2);
            const items = col === 0 ? faqs.slice(0, mid) : faqs.slice(mid);
            const offset = col === 0 ? 0 : mid;
            return (
              <div key={col} className="border border-[#e7e7e7]">
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