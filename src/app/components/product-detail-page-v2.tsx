import { useState } from "react";
import { Link } from "react-router";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import BrushIcon from "@mui/icons-material/Brush";
import DescriptionIcon from "@mui/icons-material/Description";
import ArchiveIcon from "@mui/icons-material/Archive";

type PrintMethod = "uv" | "laser" | "screen" | "sublimation";
type PrintPosition = "front" | "back";
type DecorationDetail = "logo" | "logoText";

const IMG = {
  matteBlack: "https://images.unsplash.com/photo-1662524281334-215f83f6f98a?w=1200&h=1200&fit=crop",
  copper: "https://images.unsplash.com/photo-1609097828013-c98743a157cd?w=1200&h=1200&fit=crop",
  white: "https://images.unsplash.com/photo-1664714628878-9d2aa898b9e3?w=1200&h=1200&fit=crop",
  red: "https://images.unsplash.com/photo-1760754726716-45970152ebd5?w=1200&h=1200&fit=crop",
  green: "https://images.unsplash.com/photo-1686916059707-a15e0efb900c?w=1200&h=1200&fit=crop",
  blue: "https://images.unsplash.com/photo-1769445886383-a6beba6b66fb?w=1200&h=1200&fit=crop",
  branding: "https://images.unsplash.com/photo-1585250815365-a90a469677c5?w=1200&h=1200&fit=crop",
  side: "https://images.unsplash.com/photo-1679224102107-4b3c7201de72?w=1200&h=1200&fit=crop",
  bamboo: "https://images.unsplash.com/photo-1641754644192-24e09c2b444b?w=800&h=800&fit=crop",
};

const colors = [
  { name: "Matte Black", hex: "#1a1a1a", image: IMG.matteBlack },
  { name: "Copper Rose", hex: "#b87333", image: IMG.copper },
  { name: "Arctic White", hex: "#f5f5f5", image: IMG.white, border: true },
  { name: "Gradient Blue", hex: "#4a90d9", image: IMG.blue },
  { name: "Bamboo Cap", hex: "#8B7355", image: IMG.bamboo },
  { name: "Racing Red", hex: "#cc2222", image: IMG.red },
  { name: "Forest Green", hex: "#2d6a2e", image: IMG.green },
  { name: "Silver Steel", hex: "#c0c0c0", image: IMG.side, border: true },
];

const gallery = [IMG.matteBlack, IMG.branding, IMG.white, IMG.side, IMG.copper, IMG.green];

const printMethods: { id: PrintMethod; label: string; description: string }[] = [
  { id: "uv", label: "UV Printing", description: "Full-color digital UV printing with vibrant results. Ideal for complex logos and gradients. Durable and scratch-resistant." },
  { id: "laser", label: "Laser Engraving", description: "Precision laser engraving for a premium, permanent mark. Best for metallic surfaces. Will not fade or peel." },
  { id: "screen", label: "Screen Printing", description: "Traditional screen printing for bold, solid-color designs. Cost-effective for large quantities." },
  { id: "sublimation", label: "Sublimation", description: "Full-color sublimation for edge-to-edge coverage. Best for light-colored or white bottles. Photo-quality output." },
];

const pricingTiers = [
  { qty: "50+ pcs", product: 15.0, print: 1.2, unit: 16.2, save: null as string | null, min: 50 },
  { qty: "100+ pcs", product: 13.5, print: 1.2, unit: 14.7, save: "Save 9%", min: 100 },
  { qty: "250+ pcs", product: 11.8, print: 1.2, unit: 13.0, save: "Save 20%", min: 250 },
  { qty: "500+ pcs", product: 10.2, print: 1.2, unit: 11.4, save: "Save 30%", min: 500 },
];

const documents: { name: string; type: string; size: string; Icon: typeof PictureAsPdfIcon; tint: string; locked?: boolean }[] = [
  { name: "Product Spec Sheet", type: "PDF", size: "2.4 MB", Icon: PictureAsPdfIcon, tint: "#d41c5c" },
  { name: "Branding Template (AI)", type: "AI", size: "1.8 MB", Icon: BrushIcon, tint: "#C8956C", locked: true },
  { name: "Print Area Guide", type: "PDF", size: "890 KB", Icon: PictureAsPdfIcon, tint: "#d41c5c" },
  { name: "Certification Documents", type: "PDF", size: "3.1 MB", Icon: PictureAsPdfIcon, tint: "#d41c5c", locked: true },
  { name: "Color Options Guide", type: "PDF", size: "1.2 MB", Icon: PictureAsPdfIcon, tint: "#d41c5c" },
  { name: "Packaging Mockup", type: "PDF", size: "4.5 MB", Icon: ArchiveIcon, tint: "#044c5c" },
  { name: "Logo Placement (EPS)", type: "EPS", size: "2.7 MB", Icon: DescriptionIcon, tint: "#8B5CF6", locked: true },
];

const specifications: [string, string][] = [
  ["SKU", "TG-SSB-2601"],
  ["Material", "18/8 Food-Grade Stainless Steel"],
  ["Lid Material", "BPA-Free PP + Silicone Seal"],
  ["Product Size (500ml)", "72 × 72 × 255 mm"],
  ["Capacity", "500ml (17 oz)"],
  ["Weight", "320g"],
  ["Insulation", "Double-wall vacuum (24hrs cold / 12hrs hot)"],
  ["Exterior Finish", "Powder-coated matte"],
  ["BPA Free", "Yes"],
  ["Dishwasher Safe", "Hand wash recommended"],
  ["Leak Proof", "Yes — threaded lid with silicone seal"],
  ["Minimum Order Qty", "50 pcs"],
  ["Lead Time (Stock)", "5–7 business days"],
  ["Lead Time (Custom)", "12–15 business days"],
  ["Country of Origin", "China (Zhejiang)"],
  ["Certification", "FDA / LFGB / SGS approved"],
  ["Warranty", "2 year manufacturing defects"],
];

const reviews = [
  { author: "Ahmed K.", rating: 5, date: "Feb 15, 2026", title: "Excellent quality for corporate gifts", text: "We ordered 500 pieces for our annual event. The laser engraving came out perfectly and the bottles keep drinks cold all day. Highly recommend for corporate gifting." },
  { author: "Sarah M.", rating: 4, date: "Jan 28, 2026", title: "Great bottle, fast delivery", text: "Very pleased with the quality. The matte black finish looks premium. Only giving 4 stars because the lid could be slightly more ergonomic, but overall excellent value." },
  { author: "James L.", rating: 5, date: "Jan 10, 2026", title: "Perfect for our startup swag", text: "UV printing quality was outstanding. Colors are vibrant and the print hasn't faded after daily use for 3 months. Will definitely reorder." },
];

const printAreas = [
  { method: "Sublimation (White Mug)", dim: "210 mm × 90 mm", shape: "rect" as const },
  { method: "UV Printing", dim: "75 mm × 75 mm", shape: "circle" as const },
  { method: "Laser Engraving", dim: "80 mm × 80 mm", shape: "circle" as const },
  { method: "Screen Printing", dim: "160 mm × 60 mm", shape: "rect" as const },
  { method: "UV DTF", dim: "70 mm × 70 mm", shape: "circle" as const },
];

const related = [
  { slug: "copper-rose-vacuum-bottle-750ml", name: "Copper Rose Vacuum Insulated Bottle - 750ml", image: IMG.copper, price: 22, lead: "5-7 days", badge: "NEW", rating: 4.8, moq: 30 },
  { slug: "arctic-white-thermos-500ml", name: "Arctic White Thermos Bottle - 500ml", image: IMG.white, price: 18, lead: "3-5 days", badge: "NEW", rating: 4.5, moq: 50 },
  { slug: "sport-gradient-blue-bottle-600ml", name: "Sport Gradient Blue Bottle - 600ml", image: IMG.blue, price: 12, oldPrice: 18, lead: "5-7 days", badge: "SALE -33%", rating: 4.3, moq: 100 },
  { slug: "eco-bamboo-cap-bottle-500ml", name: "Eco Bamboo Cap Stainless Bottle - 500ml", image: IMG.bamboo, price: 16, lead: "7-10 days", badge: "ECO", rating: 4.7, moq: 50 },
];

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

export function ProductDetailPageV2() {
  const [activeColor, setActiveColor] = useState(colors[0].name);
  const [activeImage, setActiveImage] = useState(colors[0].image);
  const [size, setSize] = useState("500ml (Standard)");
  const [isBlank, setIsBlank] = useState(false);
  const [method, setMethod] = useState<PrintMethod>("laser");
  const [position, setPosition] = useState<PrintPosition>("front");
  const [detail, setDetail] = useState<DecorationDetail>("logo");
  const [qty, setQty] = useState(50);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "print" | "reviews">("desc");

  const activeMethod = printMethods.find((m) => m.id === method)!;
  const detailAddon = detail === "logoText" ? 1.8 : 1.2;
  const tier = [...pricingTiers].reverse().find((t) => qty >= t.min) ?? pricingTiers[0];
  const unitPrice = isBlank ? tier.product : tier.product + detailAddon;
  const total = unitPrice * qty;

  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <div className="bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-5 pb-3">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#8A9199]">
          <Link to="/" className="hover:text-[#044c5c]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
          </Link>
          <ChevronRightIcon sx={{ fontSize: 12 }} />
          <Link to="/category/drinkwares" className="hover:text-[#044c5c]">Drinkwares</Link>
          <ChevronRightIcon sx={{ fontSize: 12 }} />
          <Link to="/category/drinkwares/stainless-steel-bottles" className="hover:text-[#044c5c]">Stainless Steel Bottles</Link>
          <ChevronRightIcon sx={{ fontSize: 12 }} />
          <span className="text-[#044c5c] font-semibold">Premium Insulated Stainless Steel Bottle - 500ml</span>
        </div>
      </div>

      {/* ── Main product block ── */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ── Left: Image gallery ── */}
          <div className="lg:sticky lg:top-6 self-start">
            <div className="relative bg-[#F7F8FA] overflow-hidden aspect-square border border-[#E6E8EB]" style={{ borderRadius: 0 }}>
              <img
                key={activeImage}
                src={activeImage}
                alt="Premium Insulated Stainless Steel Bottle"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-[#d41c5c] text-white text-[10px] uppercase tracking-wider px-3 py-1.5" style={{ fontWeight: 700 }}>
                Hot
              </span>
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-6 gap-2 mt-3">
              {gallery.map((src, i) => {
                const active = src === activeImage;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveImage(src)}
                    className="aspect-square overflow-hidden bg-[#F7F8FA]"
                    style={{
                      border: active ? "2px solid #044c5c" : "1px solid #E6E8EB",
                      borderRadius: 0,
                    }}
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
              <span>TG-SSB-2601</span>
            </div>

            {/* Title */}
            <h1 className="text-[24px] md:text-[30px] text-[#2C2C2C] leading-tight mb-3" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
              Premium Insulated Stainless Steel Bottle - 500ml
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
                In Stock (1240 available)
              </span>
            </div>

            {/* Short desc */}
            <p className="text-[14px] text-[#5B616A] leading-relaxed mb-4">
              Double-wall vacuum insulated stainless steel bottle with powder-coated matte finish. Keeps drinks cold 24hrs / hot 12hrs. Perfect for corporate gifting and promotional campaigns.
            </p>

            {/* Wishlist / Share / Compare */}
            <div className="flex items-center gap-5 pb-5 mb-5 border-b border-[#E6E8EB]">
              {[
                { Icon: FavoriteBorderIcon, label: "Add to Wishlist" },
                { Icon: ShareOutlinedIcon, label: "Share" },
                { Icon: CompareArrowsIcon, label: "Compare" },
              ].map((x) => (
                <button
                  key={x.label}
                  className="flex items-center gap-1.5 text-[12px] text-[#5B616A] hover:text-[#044c5c] transition-colors"
                >
                  <x.Icon sx={{ fontSize: 14 }} />
                  {x.label}
                </button>
              ))}
            </div>

            {/* Color */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#2C2C2C]">Color:</span>
                <span className="text-[11px] uppercase tracking-wider text-[#044c5c] font-semibold">{activeColor}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {colors.map((c) => {
                  const active = c.name === activeColor;
                  return (
                    <button
                      key={c.name}
                      onClick={() => {
                        setActiveColor(c.name);
                        setActiveImage(c.image);
                      }}
                      className="w-12 h-12 overflow-hidden bg-[#F7F8FA]"
                      style={{
                        border: active ? "2px solid #044c5c" : c.border ? "1px solid #E6E8EB" : "1px solid transparent",
                        outline: active ? "1px solid #044c5c" : "none",
                        outlineOffset: "2px",
                        borderRadius: 0,
                        transition: "all 0.15s",
                      }}
                      title={c.name}
                    >
                      <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size / Capacity */}
            <div className="mb-5">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-[#2C2C2C] mb-2.5">Size / Capacity</div>
              <div className="flex gap-2 flex-wrap">
                {["500ml (Standard)", "750ml (Large)"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className="px-4 py-2.5 text-[13px] transition-all"
                    style={{
                      border: size === s ? "1px solid #044c5c" : "1px solid #E6E8EB",
                      backgroundColor: size === s ? "#044c5c" : "#FFFFFF",
                      color: size === s ? "#FFFFFF" : "#2C2C2C",
                      fontWeight: size === s ? 600 : 500,
                      borderRadius: 0,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Printing / Decoration header with Blank toggle */}
            <div className="mb-3 flex items-center justify-between flex-wrap gap-2">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-[#2C2C2C]">Printing / Decoration</div>
              <label className="flex items-center gap-2 text-[11px] text-[#5B616A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBlank}
                  onChange={(e) => setIsBlank(e.target.checked)}
                  className="w-3.5 h-3.5 accent-[#044c5c]"
                />
                <span className="uppercase tracking-wider font-semibold">No printing (blank)</span>
              </label>
            </div>

            {/* Method tabs */}
            <div className={`transition-opacity ${isBlank ? "opacity-40 pointer-events-none" : "opacity-100"}`}>
              <div className="flex border-b border-[#E6E8EB] mb-4 overflow-x-auto">
                {printMethods.map((m) => {
                  const active = m.id === method;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      className="px-4 py-3 text-[11px] uppercase tracking-wider whitespace-nowrap transition-all"
                      style={{
                        color: active ? "#044c5c" : "#5B616A",
                        fontWeight: active ? 700 : 500,
                        borderBottom: active ? "2px solid #044c5c" : "2px solid transparent",
                        marginBottom: "-1px",
                      }}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>

              {/* Method description */}
              <p className="text-[13px] text-[#5B616A] leading-relaxed mb-4">
                {activeMethod.description}
              </p>

              {/* Print Position */}
              <div className="mb-4">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-[#2C2C2C] mb-2">Print Position</div>
                <div className="flex gap-2">
                  {(["front", "back"] as PrintPosition[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPosition(p)}
                      className="px-5 py-2 text-[12px] capitalize transition-all"
                      style={{
                        border: position === p ? "1px solid #044c5c" : "1px solid #E6E8EB",
                        backgroundColor: position === p ? "#044c5c" : "#FFFFFF",
                        color: position === p ? "#FFFFFF" : "#2C2C2C",
                        fontWeight: position === p ? 600 : 500,
                        borderRadius: 0,
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Decoration detail */}
              <div className="mb-5">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-[#2C2C2C] mb-2">Decoration Detail</div>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { id: "logo" as DecorationDetail, label: "Logo Only (up to 5cm²)", addon: 1.2 },
                    { id: "logoText" as DecorationDetail, label: "Logo + Text", addon: 1.8 },
                  ].map((d) => {
                    const active = d.id === detail;
                    return (
                      <button
                        key={d.id}
                        onClick={() => setDetail(d.id)}
                        className="px-4 py-2 text-[12px] transition-all flex items-center gap-2"
                        style={{
                          border: active ? "1px solid #044c5c" : "1px solid #E6E8EB",
                          backgroundColor: active ? "#F2F8F9" : "#FFFFFF",
                          color: "#2C2C2C",
                          fontWeight: active ? 600 : 500,
                          borderRadius: 0,
                        }}
                      >
                        {d.label}
                        <span className="text-[11px] text-[#044c5c] font-semibold">+AED {d.addon.toFixed(2)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quantity-based pricing table */}
            <div className="border border-[#E6E8EB] mb-5" style={{ borderRadius: 0 }}>
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#044c5c] text-white">
                <span className="text-[11px] uppercase tracking-wider font-semibold flex items-center gap-2">
                  <VisibilityIcon sx={{ fontSize: 14 }} />
                  Quantity-Based Pricing
                </span>
                <span className="text-[11px] text-white/80">Product + Print cost per unit</span>
              </div>
              <div className="grid grid-cols-5 text-[11px] uppercase tracking-wider text-[#8A9199] font-semibold bg-[#FAFAF8] border-b border-[#E6E8EB]">
                <div className="px-4 py-2">Quantity</div>
                <div className="px-3 py-2 text-right">Product</div>
                <div className="px-3 py-2 text-right">Print</div>
                <div className="px-3 py-2 text-right">Unit Price</div>
                <div className="px-3 py-2 text-right">You Save</div>
              </div>
              {pricingTiers.map((t, i) => {
                const active = tier.min === t.min;
                return (
                  <div
                    key={t.min}
                    className="grid grid-cols-5 text-[13px] text-[#2C2C2C] items-center"
                    style={{
                      backgroundColor: active ? "#F2F8F9" : "#FFFFFF",
                      borderBottom: i < pricingTiers.length - 1 ? "1px solid #E6E8EB" : "none",
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    <div className="px-4 py-2.5">{t.qty}</div>
                    <div className="px-3 py-2.5 text-right text-[#5B616A]">AED {t.product.toFixed(2)}</div>
                    <div className="px-3 py-2.5 text-right text-[#5B616A]">AED {t.print.toFixed(2)}</div>
                    <div className="px-3 py-2.5 text-right text-[#044c5c] font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>
                      AED {t.unit.toFixed(2)}
                    </div>
                    <div className="px-3 py-2.5 text-right">
                      {t.save ? (
                        <span className="text-[11px] text-[#16A34A] font-semibold">{t.save}</span>
                      ) : (
                        <span className="text-[#8A9199]">—</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Documents & Downloads */}
            <div className="mb-5">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-[#2C2C2C] mb-3 flex items-center gap-2">
                <DescriptionIcon sx={{ fontSize: 14 }} />
                Documents & Downloads
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {documents.map((d) => (
                  <div
                    key={d.name}
                    className="flex items-center gap-2.5 px-3 py-2 border border-[#E6E8EB]"
                    style={{ borderRadius: 0 }}
                  >
                    <div
                      className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${d.tint}15` }}
                    >
                      <d.Icon sx={{ fontSize: 18, color: d.tint }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-[#2C2C2C] truncate">{d.name}</p>
                      <p className="text-[10px] text-[#8A9199]">{d.size}</p>
                    </div>
                    <button
                      className="w-8 h-8 flex items-center justify-center text-[#044c5c] hover:bg-[#F2F8F9] transition-colors"
                      aria-label={d.locked ? "Locked — sign in to download" : `Download ${d.name}`}
                    >
                      {d.locked ? (
                        <LockOutlinedIcon sx={{ fontSize: 16, color: "#8A9199" }} />
                      ) : (
                        <FileDownloadOutlinedIcon sx={{ fontSize: 18 }} />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity + price summary */}
            <div className="border border-[#E6E8EB] p-4 mb-4" style={{ borderRadius: 0 }}>
              <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
                <div>
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-[#2C2C2C]">
                    Quantity <span className="text-[#8A9199] font-normal">(MOQ: 50 pcs)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[22px] font-bold text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    AED {unitPrice.toFixed(2)}
                  </span>
                  <span className="text-[12px] text-[#8A9199] ml-1">/ unit</span>
                  <div className="text-[12px] text-[#5B616A]">
                    Total: <span className="font-semibold text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif" }}>AED {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center border border-[#E6E8EB] w-fit" style={{ borderRadius: 0 }}>
                <button
                  onClick={() => setQty((q) => Math.max(50, q - 10))}
                  className="px-3 py-2 hover:bg-[#FAFAF8] transition-colors"
                >
                  <RemoveIcon sx={{ fontSize: 16 }} />
                </button>
                <input
                  type="number"
                  value={qty}
                  min={50}
                  onChange={(e) => setQty(Math.max(50, parseInt(e.target.value) || 50))}
                  className="w-16 text-center py-2 border-x border-[#E6E8EB] text-[#2C2C2C] font-semibold bg-white"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                />
                <button
                  onClick={() => setQty((q) => q + 10)}
                  className="px-3 py-2 hover:bg-[#FAFAF8] transition-colors"
                >
                  <AddIcon sx={{ fontSize: 16 }} />
                </button>
              </div>
            </div>

            {/* 4 CTAs — 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                className="flex items-center justify-center gap-2 py-3.5 bg-[#044c5c] text-white hover:!text-white hover:bg-[#033a48] transition-colors text-[12px] uppercase tracking-wider"
                style={{ borderRadius: 0, fontWeight: 700, fontFamily: "Poppins, sans-serif", color: "#fff" }}
              >
                <AutoAwesomeIcon sx={{ fontSize: 16 }} />
                Design Now
              </button>
              <button
                className="flex items-center justify-center gap-2 py-3.5 bg-[#d41c5c] text-white hover:!text-white hover:bg-[#b51650] transition-colors text-[12px] uppercase tracking-wider"
                style={{ borderRadius: 0, fontWeight: 700, fontFamily: "Poppins, sans-serif", color: "#fff" }}
              >
                <CloudUploadIcon sx={{ fontSize: 16 }} />
                Upload File & Checkout
              </button>
              <button
                className="flex items-center justify-center gap-2 py-3.5 bg-white border border-[#044c5c] text-[#044c5c] hover:bg-[#044c5c] hover:!text-white transition-colors text-[12px] uppercase tracking-wider"
                style={{ borderRadius: 0, fontWeight: 700, fontFamily: "Poppins, sans-serif" }}
              >
                <RequestQuoteIcon sx={{ fontSize: 16 }} />
                Request for Quote
              </button>
              <button
                className="flex items-center justify-center gap-2 py-3.5 bg-white border border-[#044c5c] text-[#044c5c] hover:bg-[#044c5c] hover:!text-white transition-colors text-[12px] uppercase tracking-wider"
                style={{ borderRadius: 0, fontWeight: 700, fontFamily: "Poppins, sans-serif" }}
              >
                <ShoppingCartIcon sx={{ fontSize: 16 }} />
                Add to Cart (Blank)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Detail tabs section ── */}
      <section className="bg-[#FAFAF8] border-t border-[#E6E8EB] py-12">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          {/* Tabs */}
          <div className="flex border-b border-[#E6E8EB] mb-8 overflow-x-auto">
            {[
              { id: "desc" as const, label: "Description" },
              { id: "specs" as const, label: "Specifications" },
              { id: "print" as const, label: "Printing Positions" },
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

          {/* Tab content */}
          {activeTab === "desc" && (
            <div className="max-w-[920px]">
              <p className="text-[14px] text-[#2C2C2C] leading-relaxed mb-4">
                The TezkarGift Premium Insulated Stainless Steel Bottle is engineered for maximum temperature retention with a sleek, professional aesthetic. Its double-wall vacuum insulation keeps beverages cold for up to 24 hours or hot for up to 12 hours.
              </p>
              <p className="text-[14px] text-[#2C2C2C] leading-relaxed mb-6">
                The durable powder-coated exterior resists fingerprints and scratches, making it ideal for daily use and custom branding. Available in multiple colors to match any brand identity.
              </p>

              <h4 className="text-[15px] text-[#2C2C2C] mb-2" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>Key Features</h4>
              <ul className="list-disc ml-5 space-y-1 text-[14px] text-[#5B616A] mb-6">
                <li>Double-wall vacuum insulation (24hrs cold / 12hrs hot)</li>
                <li>18/8 food-grade stainless steel interior</li>
                <li>Powder-coated matte exterior finish</li>
                <li>Leak-proof threaded lid with silicone seal</li>
                <li>Wide mouth for easy filling and cleaning</li>
                <li>BPA-free and toxin-free materials</li>
                <li>Condensation-free exterior</li>
                <li>Available in 8 colors with custom branding options</li>
              </ul>

              <h4 className="text-[15px] text-[#2C2C2C] mb-2" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>Ideal For</h4>
              <ul className="list-disc ml-5 space-y-1 text-[14px] text-[#5B616A]">
                <li>Corporate gifting & welcome kits</li>
                <li>Event giveaways & trade shows</li>
                <li>Employee appreciation programs</li>
                <li>Gym & outdoor promotions</li>
                <li>Retail & resale</li>
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

          {activeTab === "print" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-[1100px]">
              {printMethods.map((m) => (
                <div key={m.id} className="bg-white border border-[#E6E8EB] p-5" style={{ borderRadius: 0 }}>
                  <div className="text-[14px] font-semibold text-[#044c5c] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>{m.label}</div>
                  <p className="text-[12px] text-[#5B616A] leading-relaxed">{m.description}</p>
                </div>
              ))}
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

          {/* ── Print Area Reference Guide ── */}
          <div className="mt-10 bg-white border border-[#E6E8EB] p-6" style={{ borderRadius: 0 }}>
            <div className="flex items-center gap-2 mb-5">
              <VisibilityIcon sx={{ fontSize: 16, color: "#5B616A" }} />
              <span className="text-[12px] uppercase tracking-wider font-semibold text-[#2C2C2C]">Print Area Reference Guide</span>
            </div>

            <div className="border border-[#E6E8EB] p-5 bg-[#FAFAF8]" style={{ borderRadius: 0 }}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Dimensions card */}
                <div className="bg-white border border-[#E6E8EB] p-4 flex flex-col items-center" style={{ borderRadius: 0 }}>
                  <div className="text-[10px] uppercase tracking-wider text-[#8A9199] mb-3">TM-025 Dimensions</div>
                  <div className="relative w-20 h-32 mb-2">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#2C2C2C] to-[#8B7355]" style={{ clipPath: "polygon(35% 0, 65% 0, 70% 100%, 30% 100%)" }} />
                    <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-[10px] text-[#5B616A]">147 mm</span>
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-5 text-[10px] text-[#5B616A]">87 mm</span>
                  </div>
                </div>

                {/* Print area cards */}
                {printAreas.map((p) => (
                  <div key={p.method} className="bg-white border border-[#E6E8EB] p-4 flex flex-col items-center text-center" style={{ borderRadius: 0 }}>
                    <div className="text-[10px] uppercase tracking-wider text-[#8A9199] mb-3 min-h-[14px]">{p.method}</div>
                    <div
                      className="flex items-center justify-center bg-[#C8956C]/20 border-2 border-dashed border-[#C8956C] text-[10px] text-[#2C2C2C] font-semibold mb-2"
                      style={{
                        width: p.shape === "circle" ? "96px" : "112px",
                        height: p.shape === "circle" ? "96px" : "72px",
                        borderRadius: p.shape === "circle" ? "50%" : 0,
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {p.dim}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-[11px] text-[#8A9199] mt-4">Print areas may vary by color variant.</p>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3 mt-4 p-3 bg-[#F2F8F9] border border-[#E6E8EB]" style={{ borderRadius: 0 }}>
              <span className="text-[12px] text-[#044c5c] flex items-center gap-1.5">
                <CheckCircleIcon sx={{ fontSize: 14 }} />
                Available printing methods: UV Printing, Laser Engraving, Screen Printing, Sublimation
              </span>
              <button
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#044c5c] text-[#044c5c] hover:bg-[#044c5c] hover:!text-white text-[12px] uppercase tracking-wider transition-colors"
                style={{ borderRadius: 0, fontWeight: 600 }}
              >
                <FileDownloadOutlinedIcon sx={{ fontSize: 14 }} />
                Download Print Template
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
              <Link to="/category/drinkwares" className="text-[12px] uppercase tracking-wider text-[#044c5c] font-semibold hover:text-[#d41c5c] transition-colors flex items-center gap-1">
                View All Bottles
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
                    style={{
                      fontWeight: 700,
                      backgroundColor: r.badge.includes("SALE") ? "#d41c5c" : "#2C2C2C",
                      color: "#fff",
                    }}
                  >
                    {r.badge}
                  </span>
                  <span className="absolute top-2 right-2 bg-white/90 text-[9px] uppercase tracking-wider px-2 py-1 text-[#5B616A]" style={{ fontWeight: 600 }}>
                    {r.lead}
                  </span>
                  <span className="absolute bottom-2 left-2 bg-[#044c5c] text-white text-[8px] uppercase tracking-wider px-2 py-0.5" style={{ fontWeight: 700 }}>
                    Customizable
                  </span>
                </div>
                <div className="p-3">
                  <div className="text-[9px] uppercase tracking-wider text-[#8A9199] flex items-center justify-between mb-1">
                    <span>Drinkwares</span>
                    <span className="text-[#B8BEC6]">TG-SSB-260{related.indexOf(r) + 2}</span>
                  </div>
                  <h3 className="text-[12px] text-[#2C2C2C] mb-2 line-clamp-2 min-h-[32px]" style={{ fontWeight: 500 }}>
                    {r.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[9px] bg-[#F7F8FA] text-[#5B616A] px-1.5 py-0.5" style={{ fontWeight: 500 }}>MOQ: {r.moq} pcs</span>
                    <span className="text-[9px] text-[#16A34A]" style={{ fontWeight: 600 }}>In Stock</span>
                  </div>
                  <StarRow value={r.rating} size={11} />
                  <div className="mt-1.5 flex items-baseline gap-1.5">
                    <span className="text-[13px] text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>From AED {r.price}</span>
                    {r.oldPrice && (
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
