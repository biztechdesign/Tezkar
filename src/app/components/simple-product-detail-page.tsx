import { AddIcon, CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon, CompareArrowsIcon, DescriptionIcon, FavoriteBorderIcon, FileDownloadOutlinedIcon, LockOutlinedIcon, RemoveIcon, ShareOutlinedIcon, ShoppingCartIcon, StarBorderIcon, StarIcon, VisibilityIcon } from "./icons";
import { useState } from "react";
import { Link } from "react-router";

const IMG = {
  black: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&h=1200&fit=crop",
  white: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=1200&h=1200&fit=crop",
  navy: "https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=1200&h=1200&fit=crop",
  gray: "https://images.unsplash.com/photo-1606767041004-6b762ea27c40?w=1200&h=1200&fit=crop",
  olive: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&h=1200&fit=crop&sat=-50",
  burgundy: "https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=1200&h=1200&fit=crop",
  detail: "https://images.unsplash.com/photo-1556228852-80b6e5eeff06?w=1200&h=1200&fit=crop",
  model: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&h=1200&fit=crop",
  folded: "https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=1200&h=1200&fit=crop",
};

const colors = [
  { name: "Matte Black", hex: "#1F1F1F", image: IMG.black },
  { name: "Brushed Silver", hex: "#C0C0C5", image: IMG.white, border: true },
  { name: "Navy Blue", hex: "#1f2a44", image: IMG.navy },
  { name: "Stone Grey", hex: "#8c8c8c", image: IMG.gray },
  { name: "Forest Green", hex: "#0F5132", image: IMG.olive },
  { name: "Deep Burgundy", hex: "#800020", image: IMG.burgundy },
];

const gallery = [IMG.black, IMG.model, IMG.detail, IMG.folded, IMG.navy, IMG.white];

const pricingTiers = [
  { qty: "25+ pcs", product: 18.0, min: 25, save: null as string | null },
  { qty: "50+ pcs", product: 15.5, min: 50, save: "Save 14%" },
  { qty: "100+ pcs", product: 13.0, min: 100, save: "Save 28%" },
  { qty: "250+ pcs", product: 11.0, min: 250, save: "Save 39%" },
  { qty: "500+ pcs", product: 9.5, min: 500, save: "Save 47%" },
];

const documents: { name: string; type: string; size: string }[] = [
  { name: "Product Spec Sheet", type: "PDF", size: "2.1 MB" },
  { name: "Artwork Template (AI)", type: "AI", size: "2.4 MB" },
  { name: "Size Chart & Measurements", type: "PDF", size: "640 KB" },
  { name: "Fabric Care Guide", type: "PDF", size: "420 KB" },
  { name: "Color Swatch Reference", type: "PDF", size: "1.1 MB" },
  { name: "OEKO-TEX Certificate", type: "PDF", size: "1.8 MB" },
  { name: "Bulk Packaging Guide", type: "PDF", size: "3.2 MB" },
];

const specifications: [string, string][] = [
  ["SKU", "TG-DRK-7820"],
  ["Material", "Stainless Steel 304"],
  ["Capacity", "500 ml"],
  ["Finish", "Matte powder coat"],
  ["Insulation", "Double-wall vacuum (keeps cold 24 h / hot 12 h)"],
  ["Lid Type", "Leak-proof twist cap"],
  ["BPA Free", "Yes"],
  ["Dishwasher Safe", "No — hand wash recommended"],
  ["Colors Available", "6 standard (extended palette on request)"],
  ["Minimum Order Qty", "25 pcs"],
  ["Lead Time (Stock)", "3–5 business days"],
  ["Lead Time (Custom)", "10–14 business days"],
  ["Country of Origin", "China"],
  ["Certification", "FDA compliant · LFGB tested"],
  ["Packaging", "Individual gift box, 12 pcs per master carton"],
];

const reviews = [
  { author: "Ahmed K.", rating: 5, date: "Feb 15, 2026", title: "Great quality blank bottle", text: "Ordered 200 blank units for our welcome kit. Finish is excellent and the lids seal perfectly. Very fast turnaround." },
  { author: "Sarah M.", rating: 4, date: "Jan 28, 2026", title: "Solid everyday carry bottle", text: "Quality is great, keeps drinks cold all day. Exactly what we needed for our team kits." },
  { author: "James L.", rating: 5, date: "Jan 10, 2026", title: "Perfect for gifting", text: "Arrived well packaged, the matte black finish looks premium. Will reorder for our next campaign." },
];

const related = [
  { slug: "ceramic-travel-mug", name: "Ceramic Travel Mug 350 ml", image: IMG.white, price: 12, lead: "3-5 days", badge: "NEW", rating: 4.7, moq: 25 },
  { slug: "glass-infuser-bottle", name: "Glass Infuser Bottle 600 ml", image: IMG.navy, price: 22, lead: "5-7 days", badge: "HOT", rating: 4.8, moq: 25 },
  { slug: "copper-vacuum-flask", name: "Copper Vacuum Flask 750 ml", image: IMG.olive, price: 28, oldPrice: 35, lead: "5-7 days", badge: "SALE -20%", rating: 4.5, moq: 50 },
  { slug: "sport-squeeze-bottle", name: "Sport Squeeze Bottle 800 ml", image: IMG.gray, price: 8, lead: "7-10 days", badge: "ECO", rating: 4.6, moq: 25 },
];

function SectionHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-[#044c5c] text-white" style={{ borderRadius: 0 }}>
      <span className="text-[11px] uppercase tracking-wider" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
        {title}
      </span>
      {right && <span className="text-[11px] text-white/85">{right}</span>}
    </div>
  );
}

function StarRow({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex">
      {[1, 2, 3, 4, 5].map((i) =>
        i <= Math.round(value) ? (
          <StarIcon key={i} sx={{ fontSize: size, color: "#FFB020" }} />
        ) : (
          <StarBorderIcon key={i} sx={{ fontSize: size, color: "#FFB020" }} />
        )
      )}
    </span>
  );
}

const MIN_QTY = 25;

export function SimpleProductDetailPage() {
  const [activeColor, setActiveColor] = useState(colors[0].name);
  const [activeImage, setActiveImage] = useState(colors[0].image);
  const [quantity, setQuantity] = useState(MIN_QTY);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "docs" | "reviews">("desc");

  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const tier = [...pricingTiers].reverse().find((t) => quantity >= t.min) ?? pricingTiers[0];
  const qtyBelowMin = quantity > 0 && quantity < MIN_QTY;
  const total = tier.product * quantity;

  const adjustQty = (delta: number) => setQuantity((q) => Math.max(0, q + delta));

  return (
    <div className="bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-5 pb-3">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#8A9199]">
          <Link to="/" className="hover:text-[#044c5c]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
          </Link>
          <ChevronRightIcon sx={{ fontSize: 12 }} />
          <Link to="/category/drinkware" className="hover:text-[#044c5c]">Drinkware</Link>
          <ChevronRightIcon sx={{ fontSize: 12 }} />
          <Link to="/category/drinkware/bottles" className="hover:text-[#044c5c]">Bottles</Link>
          <ChevronRightIcon sx={{ fontSize: 12 }} />
          <span className="text-[#044c5c] font-semibold">Premium Vacuum Bottle</span>
        </div>
      </div>

      {/* ── Main product block ── */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* ── Left: Image gallery ── */}
          <div className="lg:sticky lg:top-6 self-start">
            <div className="relative bg-[#F7F8FA] overflow-hidden aspect-square border border-[#E6E8EB]" style={{ borderRadius: 0 }}>
              <img key={activeImage} src={activeImage} alt="Premium Vacuum Bottle" className="w-full h-full object-cover" />
              <span className="absolute top-4 left-4 bg-[#d41c5c] text-white text-[10px] uppercase tracking-wider px-3 py-1.5" style={{ fontWeight: 700 }}>
                Hot
              </span>
            </div>
            <div className="grid grid-cols-6 gap-2 mt-3">
              {gallery.map((src, i) => {
                const active = src === activeImage;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveImage(src)}
                    className="aspect-square overflow-hidden bg-[#F7F8FA]"
                    style={{ border: active ? "2px solid #044c5c" : "1px solid #E6E8EB", borderRadius: 0 }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" style={{ opacity: active ? 1 : 0.7 }} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Right: Config ── */}
          <div>
            {/* Brand + SKU */}
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-[#8A9199] mb-2">
              <span className="text-[#044c5c] font-semibold">TezkarGift</span>
              <span>|</span>
              <span>TG-DRK-7820</span>
            </div>

            {/* Title */}
            <h1 className="text-[24px] md:text-[30px] text-[#2C2C2C] leading-tight mb-3" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
              Premium Vacuum Bottle
            </h1>

            {/* Rating + stock */}
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <StarRow value={avgRating} size={16} />
                <span className="text-sm text-[#2C2C2C] font-medium">{avgRating.toFixed(1)}</span>
                <span className="text-sm text-[#8A9199]">({reviews.length} reviews)</span>
              </div>
              <span className="flex items-center gap-1 text-sm text-[#16A34A]">
                <CheckCircleIcon sx={{ fontSize: 16 }} />
                In Stock (840 available)
              </span>
            </div>

            {/* Short desc */}
            <p className="text-[14px] text-[#5B616A] leading-relaxed mb-4">
              500 ml double-wall vacuum stainless steel bottle with leak-proof twist cap. Keeps beverages cold for 24 hours and hot for 12 hours. Available in 6 matte finishes, BPA-free and FDA compliant.
            </p>

            {/* Wishlist / Share / Compare */}
            <div className="flex items-center gap-5 pb-5 mb-5 border-b border-[#E6E8EB]">
              {[
                { Icon: FavoriteBorderIcon, label: "Add to Wishlist" },
                { Icon: ShareOutlinedIcon, label: "Share" },
                { Icon: CompareArrowsIcon, label: "Compare" },
              ].map((x) => (
                <button key={x.label} className="flex items-center gap-1.5 text-[12px] text-[#5B616A] hover:text-[#044c5c] transition-colors">
                  <x.Icon sx={{ fontSize: 14 }} />
                  {x.label}
                </button>
              ))}
            </div>

            {/* Color */}
            <div className="mb-5">
              <div className="mb-3">
                <span className="text-[12px] uppercase tracking-wider text-[#8A9199] font-semibold">Color:</span>
                <span className="text-[12px] uppercase tracking-wider text-[#2C2C2C] font-bold ml-1.5">{activeColor}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {colors.map((c) => {
                  const active = c.name === activeColor;
                  return (
                    <button
                      key={c.name}
                      onClick={() => { setActiveColor(c.name); setActiveImage(c.image); }}
                      className="w-12 h-12"
                      style={{
                        backgroundColor: c.hex,
                        border: c.border ? "1px solid #E6E8EB" : "1px solid transparent",
                        outline: active ? "2px solid #044c5c" : "none",
                        outlineOffset: "2px",
                        borderRadius: 0,
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                      title={c.name}
                      aria-label={c.name}
                    />
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <div className="text-[12px] uppercase tracking-wider font-semibold text-[#2C2C2C]">
                  Quantity:
                  <span className="text-[#8A9199] normal-case tracking-normal font-normal ml-1.5">Min. {MIN_QTY} pcs</span>
                </div>
              </div>
              <div className="flex items-center" style={{ width: "fit-content", border: "1px solid #E6E8EB", borderRadius: 0 }}>
                <button
                  type="button"
                  onClick={() => adjustQty(-1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-[#F7F8FA] transition-colors"
                  style={{ borderRight: "1px solid #E6E8EB", color: "#2C2C2C" }}
                >
                  <RemoveIcon sx={{ fontSize: 18 }} />
                </button>
                <input
                  type="number"
                  min={0}
                  value={quantity || ""}
                  placeholder="0"
                  onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-24 text-center text-[16px] text-[#2C2C2C] bg-white focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  style={{ height: "48px", fontFamily: "Poppins, sans-serif", fontWeight: 700, border: "none", borderRadius: 0 }}
                />
                <button
                  type="button"
                  onClick={() => adjustQty(1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-[#F7F8FA] transition-colors"
                  style={{ borderLeft: "1px solid #E6E8EB", color: "#2C2C2C" }}
                >
                  <AddIcon sx={{ fontSize: 18 }} />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] text-[#8A9199]">Total qty must be ≥ {MIN_QTY} — Volume discounts start at 50 units</span>
                <span className="text-[12px] flex items-center gap-2">
                  <span className="text-[#8A9199]">Total:</span>
                  <strong className={qtyBelowMin ? "text-[#d41c5c]" : "text-[#044c5c]"} style={{ fontFamily: "Poppins, sans-serif" }}>
                    {quantity} pcs
                  </strong>
                  {tier.save && quantity >= tier.min && (
                    <span className="text-[#16A34A] font-semibold">({tier.save})</span>
                  )}
                </span>
              </div>
            </div>

            {/* Quantity-based pricing table */}
            <div className="border border-[#E6E8EB] mb-4" style={{ borderRadius: 0 }}>
              <SectionHeader title="Quantity-Based Pricing" right={<span>Per unit price</span>} />
              <div className="grid grid-cols-3 text-[11px] uppercase tracking-wider text-[#8A9199] font-semibold bg-[#FAFAF8] border-b border-[#E6E8EB]">
                <div className="px-4 py-2">Quantity</div>
                <div className="px-3 py-2 text-right">Unit Price</div>
                <div className="px-3 py-2 text-right">You Save</div>
              </div>
              {pricingTiers.map((t, i) => {
                const active = tier.min === t.min;
                return (
                  <button
                    key={t.min}
                    type="button"
                    onClick={() => setQuantity(t.min)}
                    className="grid grid-cols-3 text-[13px] text-[#2C2C2C] items-center w-full text-left hover:bg-[#F7F8FA] transition-colors cursor-pointer"
                    style={{
                      backgroundColor: active ? "#F2F8F9" : "#FFFFFF",
                      borderBottom: i < pricingTiers.length - 1 ? "1px solid #E6E8EB" : "none",
                      fontWeight: active ? 600 : 400,
                      borderLeft: active ? "3px solid #044c5c" : "3px solid transparent",
                      borderRadius: 0,
                    }}
                  >
                    <div className="px-4 py-2.5 flex items-center gap-2">
                      <span
                        className="inline-flex items-center justify-center w-3.5 h-3.5 flex-shrink-0"
                        style={{ borderRadius: "50%", border: active ? "4px solid #044c5c" : "1px solid #B8BEC6" }}
                      />
                      {t.qty}
                    </div>
                    <div className="px-3 py-2.5 text-right" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
                      AED {t.product.toFixed(2)}
                    </div>
                    <div className="px-3 py-2.5 text-right">
                      {t.save ? (
                        <span className="text-[12px] text-[#16A34A] font-semibold">{t.save}</span>
                      ) : (
                        <span className="text-[#B8BEC6]">—</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Price Breakdown */}
            <div className="mb-4 border border-[#E6E8EB]" style={{ borderRadius: 0 }}>
              <SectionHeader title="Price Breakdown" right={<span>per unit × qty</span>} />
              <div className="p-4 space-y-1.5 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-[#5B616A]">Base product</span>
                  <span className="text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif" }}>AED {tier.product.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5B616A]">× Total quantity</span>
                  <span style={{ fontFamily: "Poppins, sans-serif" }}>{quantity.toLocaleString()} pcs</span>
                </div>
                <div className="flex justify-between pt-2 mt-1 border-t-2 border-[#044c5c]">
                  <span className="text-[14px] uppercase tracking-wider font-semibold text-[#2C2C2C]">Total</span>
                  <span className="text-[20px] text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
                    AED {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA — Add to Cart only */}
            <button
              className="w-full flex items-center justify-center gap-2 py-4 bg-[#044c5c] text-white hover:bg-[#033a47] transition-colors text-[12px] uppercase tracking-wider"
              style={{ borderRadius: 0, fontWeight: 700, fontFamily: "Poppins, sans-serif" }}
            >
              <ShoppingCartIcon sx={{ fontSize: 18 }} />
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* ── Detail tabs section ── */}
      <section className="bg-[#FAFAF8] border-t border-[#E6E8EB] py-12">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex border-b border-[#E6E8EB] mb-8 overflow-x-auto">
            {[
              { id: "desc" as const, label: "Description" },
              { id: "specs" as const, label: "Specifications" },
              { id: "docs" as const, label: `Documents (${documents.length})` },
              { id: "reviews" as const, label: `Reviews (${reviews.length})` },
            ].map((t) => {
              const active = t.id === activeTab;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className="px-5 py-3 text-[13px] uppercase tracking-wider whitespace-nowrap transition-all"
                  style={{
                    color: active ? "#044c5c" : "#5B616A",
                    fontWeight: active ? 700 : 500,
                    borderBottom: active ? "2px solid #044c5c" : "2px solid transparent",
                    marginBottom: "-1px",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {activeTab === "desc" && (
            <div className="max-w-[920px]">
              <p className="text-[14px] text-[#2C2C2C] leading-relaxed mb-4">
                The TezkarGift Premium Vacuum Bottle is engineered from food-grade stainless steel 304 with a double-wall vacuum insulation that keeps beverages cold for up to 24 hours and hot for up to 12 hours. The leak-proof twist cap ensures spill-free use whether in transit or on a desk.
              </p>
              <p className="text-[14px] text-[#2C2C2C] leading-relaxed mb-6">
                Available in six premium matte finishes with an extended palette on request. BPA-free and FDA compliant. Ideal as a standalone corporate gift, welcome kit insert, or event giveaway piece.
              </p>
              <h4 className="text-[15px] text-[#2C2C2C] mb-2" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>Key Features</h4>
              <ul className="list-disc ml-5 space-y-1 text-[14px] text-[#5B616A] mb-6">
                <li>500 ml capacity, stainless steel 304</li>
                <li>Double-wall vacuum insulation</li>
                <li>Leak-proof twist cap</li>
                <li>Keeps cold 24 h / hot 12 h</li>
                <li>BPA-free · FDA compliant · LFGB tested</li>
                <li>6 matte finish colors (extended palette on request)</li>
              </ul>
              <h4 className="text-[15px] text-[#2C2C2C] mb-2" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>Ideal For</h4>
              <ul className="list-disc ml-5 space-y-1 text-[14px] text-[#5B616A]">
                <li>Corporate welcome kits & onboarding packages</li>
                <li>Event giveaways & trade show gifts</li>
                <li>Staff appreciation & employee gifts</li>
                <li>Loyalty and membership kits</li>
              </ul>
            </div>
          )}

          {activeTab === "specs" && (
            <dl className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-y-3 gap-x-6 max-w-[920px]">
              {specifications.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-[13px] font-semibold text-[#2C2C2C]">{k}</dt>
                  <dd className="text-[13px] text-[#5B616A]">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          {activeTab === "docs" && (
            <div className="max-w-[920px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {documents.map((d) => (
                  <div key={d.name} className="flex items-center gap-3 px-4 py-3 bg-white border border-[#E6E8EB]" style={{ borderRadius: 0 }}>
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-[#F2F8F9]" style={{ borderRadius: 0 }}>
                      <DescriptionIcon sx={{ fontSize: 20, color: "#044c5c" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-[#2C2C2C] truncate">{d.name}</p>
                      <p className="text-[11px] text-[#8A9199] mt-0.5">
                        <span className="font-semibold text-[#044c5c]">{d.type}</span> · {d.size}
                      </p>
                    </div>
                    <div className="relative group/lock">
                      <button
                        className="w-9 h-9 flex items-center justify-center bg-[#F7F8FA] border border-[#E6E8EB] cursor-not-allowed"
                        aria-label="Sign in to download"
                        style={{ borderRadius: 0 }}
                        disabled
                      >
                        <LockOutlinedIcon sx={{ fontSize: 16, color: "#8A9199" }} />
                      </button>
                      <div
                        className="absolute right-0 bottom-full mb-2 px-2.5 py-1.5 text-[11px] text-white whitespace-nowrap pointer-events-none opacity-0 group-hover/lock:opacity-100 transition-opacity"
                        style={{ backgroundColor: "#2C2C2C", borderRadius: 0 }}
                      >
                        Sign in to download
                        <div className="absolute top-full right-3 border-4 border-transparent" style={{ borderTopColor: "#2C2C2C" }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[12px] text-[#8A9199] mt-4 flex items-center gap-1.5">
                <LockOutlinedIcon sx={{ fontSize: 13 }} />
                Sign in to your account to download product documents.
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-3 max-w-[920px]">
              {reviews.map((r, i) => (
                <div key={i} className="bg-white border border-[#E6E8EB] p-5" style={{ borderRadius: 0 }}>
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-[#2C2C2C]">{r.author}</span>
                      <StarRow value={r.rating} size={13} />
                    </div>
                    <span className="text-[11px] text-[#8A9199]">{r.date}</span>
                  </div>
                  <p className="text-[13px] font-semibold text-[#2C2C2C] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{r.title}</p>
                  <p className="text-[12px] text-[#5B616A] leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Print Area Reference — download template */}
          <div className="mt-10 bg-white border border-[#E6E8EB] p-6" style={{ borderRadius: 0 }}>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <span className="text-[12px] text-[#044c5c] flex items-center gap-1.5">
                <CheckCircleIcon sx={{ fontSize: 14 }} />
                Available in 6 matte finish colors — extended palette on request
              </span>
              <button
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#044c5c] text-[#044c5c] hover:bg-[#044c5c] hover:!text-white text-[12px] uppercase tracking-wider transition-colors"
                style={{ borderRadius: 0, fontWeight: 600 }}
              >
                <FileDownloadOutlinedIcon sx={{ fontSize: 14 }} />
                Download Spec Sheet
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Customers Also Bought ── */}
      <section className="py-12 border-t border-[#E6E8EB]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <h2 className="text-[14px] uppercase tracking-wider text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
              Customers Also Bought
            </h2>
            <div className="flex items-center gap-3">
              <Link to="/category/drinkware" className="text-[12px] uppercase tracking-wider text-[#044c5c] font-semibold hover:text-[#d41c5c] transition-colors flex items-center gap-1">
                View All Drinkware
                <ChevronRightIcon sx={{ fontSize: 14 }} />
              </Link>
              <div className="flex gap-1">
                <button className="w-8 h-8 flex items-center justify-center border border-[#E6E8EB] hover:bg-[#044c5c] hover:!text-white transition-colors" style={{ borderRadius: 0 }}>
                  <ChevronLeftIcon sx={{ fontSize: 18 }} />
                </button>
                <button className="w-8 h-8 flex items-center justify-center border border-[#E6E8EB] hover:bg-[#044c5c] hover:!text-white transition-colors" style={{ borderRadius: 0 }}>
                  <ChevronRightIcon sx={{ fontSize: 18 }} />
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/product/${r.slug}`}
                className="group bg-white border border-[#E6E8EB] overflow-hidden hover:shadow-md transition-shadow"
                style={{ borderRadius: 0 }}
              >
                <div className="relative aspect-square overflow-hidden bg-[#F7F8FA]">
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span
                    className="absolute top-2 left-2 text-[9px] uppercase tracking-wider px-2 py-1"
                    style={{ fontWeight: 700, backgroundColor: r.badge.includes("SALE") ? "#d41c5c" : "#2C2C2C", color: "#fff" }}
                  >
                    {r.badge}
                  </span>
                  <span className="absolute top-2 right-2 bg-white/90 text-[9px] uppercase tracking-wider px-2 py-1 text-[#5B616A]" style={{ fontWeight: 600 }}>
                    {r.lead}
                  </span>
                </div>
                <div className="p-3">
                  <div className="text-[9px] uppercase tracking-wider text-[#8A9199] flex items-center justify-between mb-1">
                    <span>Drinkware</span>
                    <span className="text-[#B8BEC6]">TG-DRK-782{related.indexOf(r) + 1}</span>
                  </div>
                  <h3 className="text-[12px] text-[#2C2C2C] mb-2 line-clamp-2 min-h-[32px]" style={{ fontWeight: 500 }}>{r.name}</h3>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[9px] bg-[#F7F8FA] text-[#5B616A] px-1.5 py-0.5" style={{ fontWeight: 500 }}>MOQ: {r.moq} pcs</span>
                    <span className="text-[9px] text-[#16A34A]" style={{ fontWeight: 600 }}>In Stock</span>
                  </div>
                  <StarRow value={r.rating} size={11} />
                  <div className="mt-1.5 flex items-baseline gap-1.5">
                    <span className="text-[13px] text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>From AED {r.price}</span>
                    {"oldPrice" in r && r.oldPrice && (
                      <span className="text-[10px] text-[#8A9199] line-through">AED {r.oldPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
