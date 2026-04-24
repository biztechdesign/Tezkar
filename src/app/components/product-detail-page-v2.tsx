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
import DescriptionIcon from "@mui/icons-material/Description";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CreateIcon from "@mui/icons-material/Create";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

type PrintMethod = "screen" | "dtg" | "heat" | "embroidery";

interface PrintMethodConfig {
  id: PrintMethod;
  label: string;
  description: string;
  positions: string[];
  details: { id: string; label: string; addon: number }[];
}

const IMG = {
  black: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=1200&fit=crop",
  white: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1200&h=1200&fit=crop",
  navy: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1200&h=1200&fit=crop",
  gray: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=1200&h=1200&fit=crop",
  olive: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1200&h=1200&fit=crop",
  burgundy: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200&h=1200&fit=crop",
  detail: "https://images.unsplash.com/photo-1598961942613-ba897716405b?w=1200&h=1200&fit=crop",
  model: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=1200&h=1200&fit=crop",
  folded: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=1200&h=1200&fit=crop",
};

const colors = [
  { name: "Jet Black", hex: "#111111", image: IMG.black },
  { name: "Off White", hex: "#f5f3ee", image: IMG.white, border: true },
  { name: "Navy Blue", hex: "#1f2a44", image: IMG.navy },
  { name: "Heather Gray", hex: "#8c8c8c", image: IMG.gray },
  { name: "Olive Green", hex: "#4b5320", image: IMG.olive },
  { name: "Deep Burgundy", hex: "#800020", image: IMG.burgundy },
];

const gallery = [IMG.black, IMG.model, IMG.detail, IMG.folded, IMG.navy, IMG.white];

const printMethods: PrintMethodConfig[] = [
  {
    id: "screen",
    label: "Screen Printing",
    description: "Traditional spot-color screen printing — soft hand feel, vibrant solid colors and a durable finish that holds up through hundreds of washes. Best for bulk orders with 1–4 ink colors.",
    positions: ["Front Chest", "Full Front", "Full Back", "Left Sleeve", "Right Sleeve"],
    details: [
      { id: "1c", label: "1 Color", addon: 0.75 },
      { id: "2c", label: "2 Colors", addon: 1.20 },
      { id: "3c", label: "3 Colors", addon: 1.60 },
      { id: "4c", label: "4 Colors", addon: 2.00 },
    ],
  },
  {
    id: "dtg",
    label: "DTG Print",
    description: "Direct-to-garment digital printing — photo-quality full-color reproduction with no minimums. Ideal for complex artwork, gradients, and small runs.",
    positions: ["Front Chest", "Full Front", "Full Back"],
    details: [
      { id: "single", label: "Single Location", addon: 1.80 },
      { id: "double", label: "Two Locations", addon: 3.00 },
    ],
  },
  {
    id: "heat",
    label: "Heat Transfer",
    description: "Vinyl or digital heat-pressed transfers — great for names, numbers, and small batch runs. Smooth matte finish with strong wash durability.",
    positions: ["Front Chest", "Full Front", "Full Back", "Left Sleeve", "Right Sleeve"],
    details: [
      { id: "heat-small", label: "Small (≤ A5)", addon: 1.00 },
      { id: "heat-medium", label: "Medium (≤ A4)", addon: 1.60 },
      { id: "heat-large", label: "Large (≤ A3)", addon: 2.20 },
    ],
  },
  {
    id: "embroidery",
    label: "Embroidery",
    description: "Premium thread embroidery with a tactile, high-end look. Perfect for logos on chest, sleeve cuff, or back yoke. Virtually indestructible through wash cycles.",
    positions: ["Left Chest", "Right Chest", "Left Sleeve Cuff", "Right Sleeve Cuff", "Center Back Yoke"],
    details: [
      { id: "emb-small", label: "Up to 5,000 stitches", addon: 1.80 },
      { id: "emb-medium", label: "5,000 – 10,000 stitches", addon: 2.80 },
      { id: "emb-large", label: "10,000+ stitches", addon: 4.00 },
    ],
  },
];

const pricingTiers = [
  { qty: "25+ pcs", product: 18.0, min: 25, save: null as string | null },
  { qty: "50+ pcs", product: 15.5, min: 50, save: "Save 14%" },
  { qty: "100+ pcs", product: 13.0, min: 100, save: "Save 28%" },
  { qty: "250+ pcs", product: 11.0, min: 250, save: "Save 39%" },
  { qty: "500+ pcs", product: 9.5, min: 500, save: "Save 47%" },
];

const documents: { name: string; type: string; size: string; locked?: boolean }[] = [
  { name: "Product Spec Sheet", type: "PDF", size: "2.1 MB" },
  { name: "Artwork Template (AI)", type: "AI", size: "2.4 MB", locked: true },
  { name: "Size Chart & Measurements", type: "PDF", size: "640 KB" },
  { name: "Fabric Care Guide", type: "PDF", size: "420 KB" },
  { name: "Color Swatch Reference", type: "PDF", size: "1.1 MB" },
  { name: "OEKO-TEX Certificate", type: "PDF", size: "1.8 MB", locked: true },
  { name: "Bulk Packaging Guide", type: "PDF", size: "3.2 MB" },
];

const specifications: [string, string][] = [
  ["SKU", "TG-APP-4210"],
  ["Fabric", "100% Ring-spun Combed Cotton"],
  ["Fabric Weight", "200 GSM"],
  ["Neck Style", "Ribbed Crew Neck"],
  ["Sleeves", "Full Sleeve (long sleeve)"],
  ["Fit", "Regular / Classic"],
  ["Cuffs", "Ribbed cuffs with stretch retention"],
  ["Hem", "Straight hem with side seams"],
  ["Stitching", "Double-needle at hem, cuffs and neck binding"],
  ["Shoulder Tape", "Self-fabric shoulder-to-shoulder tape"],
  ["Pre-Shrunk", "Yes — < 3% shrinkage after first wash"],
  ["Care", "Machine wash cold, tumble dry low, no bleach"],
  ["Sizes Available", "XS, S, M, L, XL, 2XL, 3XL"],
  ["Colors Available", "6 standard (extended palette on request)"],
  ["Minimum Order Qty", "25 pcs"],
  ["Lead Time (Stock)", "3–5 business days"],
  ["Lead Time (Custom)", "10–14 business days"],
  ["Country of Origin", "Bangladesh"],
  ["Certification", "OEKO-TEX Standard 100 · BSCI audited"],
  ["Packaging", "Individual poly-bag, 10 pcs per inner, 50 pcs per master"],
];

const reviews = [
  { author: "Ahmed K.", rating: 5, date: "Feb 15, 2026", title: "Perfect weight for branded staff uniform", text: "We ordered 200 pieces with embroidered logo on the left chest. Fabric is substantial without being heavy, wash cycles have held up well after six weeks of daily use." },
  { author: "Sarah M.", rating: 4, date: "Jan 28, 2026", title: "Good fabric, runs slightly large", text: "Quality is excellent and the full sleeve cut is flattering, but the Medium felt closer to a Large. Order one size down if your team prefers a trim fit." },
  { author: "James L.", rating: 5, date: "Jan 10, 2026", title: "Screen print came out vibrant", text: "We did a 3-color chest print and a single-color back print. Colors are sharp, no cracking after multiple washes. Will reorder for our next campaign." },
];

const printAreas = [
  { method: "Full Front", dim: "300 × 400 mm", shape: "rect" as const },
  { method: "Full Back", dim: "300 × 400 mm", shape: "rect" as const },
  { method: "Left Chest", dim: "100 × 100 mm", shape: "rect" as const },
  { method: "Left Sleeve", dim: "80 × 220 mm", shape: "rect" as const },
  { method: "Right Sleeve", dim: "80 × 220 mm", shape: "rect" as const },
];

const upsells: { id: string; name: string; description: string; pricePerUnit: number; Icon: typeof Inventory2Icon }[] = [
  { id: "gift-box", name: "Premium Gift Box", description: "Custom-fit kraft box with magnetic flap", pricePerUnit: 3.5, Icon: Inventory2Icon },
  { id: "gift-bag", name: "Branded Gift Bag", description: "Elegant drawstring cotton bag with your logo", pricePerUnit: 2.0, Icon: ShoppingBagIcon },
  { id: "pen-set", name: "Make it a Set — Add a Matching Pen", description: "Bundle with a branded metal ballpoint pen", pricePerUnit: 4.5, Icon: CreateIcon },
];

const related = [
  { slug: "premium-short-sleeve-tshirt", name: "Premium Short Sleeve T-Shirt", image: IMG.white, price: 9, lead: "3-5 days", badge: "NEW", rating: 4.7, moq: 25 },
  { slug: "heavyweight-hoodie-320gsm", name: "Heavyweight Hoodie 320 GSM", image: IMG.navy, price: 28, lead: "5-7 days", badge: "HOT", rating: 4.8, moq: 25 },
  { slug: "polo-shirt-pique-cotton", name: "Pique Cotton Polo Shirt", image: IMG.olive, price: 14, oldPrice: 18, lead: "5-7 days", badge: "SALE -22%", rating: 4.5, moq: 50 },
  { slug: "organic-cotton-tshirt", name: "Organic Cotton Crew Neck T-Shirt", image: IMG.gray, price: 12, lead: "7-10 days", badge: "ECO", rating: 4.6, moq: 25 },
];

function SectionHeader({
  title,
  leftIcon,
  right,
}: {
  title: string;
  leftIcon?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center justify-between px-4 py-2.5 bg-[#044c5c] text-white"
      style={{ borderRadius: 0 }}
    >
      <span
        className="text-[11px] uppercase tracking-wider flex items-center gap-2"
        style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
      >
        {leftIcon}
        {title}
      </span>
      {right && (
        <span className="text-[11px] text-white/85 flex items-center gap-2">
          {right}
        </span>
      )}
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

export function ProductDetailPageV2() {
  const [activeColor, setActiveColor] = useState(colors[0].name);
  const [activeImage, setActiveImage] = useState(colors[0].image);
  const [size, setSize] = useState("M");
  const [isBlank, setIsBlank] = useState(false);
  const [method, setMethod] = useState<PrintMethod>("screen");
  const [position, setPosition] = useState<string>("Front");
  const [detailId, setDetailId] = useState<string>("single");
  const [qty, setQty] = useState(50);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "print" | "reviews">("desc");
  const [selectedUpsells, setSelectedUpsells] = useState<Set<string>>(new Set());

  const activeMethod = printMethods.find((m) => m.id === method)!;
  const activeDetail = activeMethod.details.find((d) => d.id === detailId) ?? activeMethod.details[0];
  const printAddon = isBlank ? 0 : activeDetail.addon;
  const tier = [...pricingTiers].reverse().find((t) => qty >= t.min) ?? pricingTiers[0];
  const upsellAddon = upsells
    .filter((u) => selectedUpsells.has(u.id))
    .reduce((sum, u) => sum + u.pricePerUnit, 0);
  const unitPrice = tier.product + printAddon + upsellAddon;
  const total = unitPrice * qty;

  const toggleUpsell = (id: string) => {
    const next = new Set(selectedUpsells);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedUpsells(next);
  };

  const switchMethod = (id: PrintMethod) => {
    setMethod(id);
    const m = printMethods.find((x) => x.id === id)!;
    if (!m.positions.includes(position)) setPosition(m.positions[0]);
    if (!m.details.some((d) => d.id === detailId)) setDetailId(m.details[0].id);
  };

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
          <Link to="/category/apparel" className="hover:text-[#044c5c]">Apparel</Link>
          <ChevronRightIcon sx={{ fontSize: 12 }} />
          <Link to="/category/apparel/t-shirts" className="hover:text-[#044c5c]">T-Shirts</Link>
          <ChevronRightIcon sx={{ fontSize: 12 }} />
          <span className="text-[#044c5c] font-semibold">Premium Full Sleeve T-Shirt</span>
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
                alt="Premium Full Sleeve T-Shirt"
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
              <span>TG-APP-4210</span>
            </div>

            {/* Title */}
            <h1 className="text-[24px] md:text-[30px] text-[#2C2C2C] leading-tight mb-3" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
              Premium Full Sleeve T-Shirt
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
              200 GSM ring-spun combed cotton full sleeve t-shirt with ribbed crew neck and ribbed cuffs. Pre-shrunk, double-needle stitched, and fully brandable with screen print, DTG, heat transfer, or embroidery.
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

            {/* Color — inline label */}
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
                      onClick={() => {
                        setActiveColor(c.name);
                        setActiveImage(c.image);
                      }}
                      className="w-16 h-16 overflow-hidden bg-[#F7F8FA]"
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

            {/* Size — inline label */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[12px] uppercase tracking-wider text-[#8A9199] font-semibold">
                  Size <span className="text-[#2C2C2C] font-bold ml-1">{size}</span>
                </div>
                <button className="text-[11px] uppercase tracking-wider text-[#044c5c] font-semibold hover:text-[#d41c5c] transition-colors">
                  Size Chart
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className="w-12 h-12 text-[13px] transition-all flex items-center justify-center"
                    style={{
                      border: size === s ? "1px solid #044c5c" : "1px solid #E6E8EB",
                      backgroundColor: size === s ? "#044c5c" : "#FFFFFF",
                      color: size === s ? "#FFFFFF" : "#2C2C2C",
                      fontWeight: size === s ? 700 : 500,
                      borderRadius: 0,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity — inline label */}
            <div className="mb-5">
              <div className="text-[12px] uppercase tracking-wider text-[#8A9199] font-semibold mb-3">
                Quantity <span className="text-[#B8BEC6] normal-case tracking-normal font-normal ml-1">(MOQ: 50 pcs)</span>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center border border-[#E6E8EB]" style={{ borderRadius: 0 }}>
                  <button
                    onClick={() => setQty((q) => Math.max(50, q - 10))}
                    className="px-4 py-3 hover:bg-[#FAFAF8] transition-colors"
                  >
                    <RemoveIcon sx={{ fontSize: 16 }} />
                  </button>
                  <input
                    type="number"
                    value={qty}
                    min={50}
                    onChange={(e) => setQty(Math.max(50, parseInt(e.target.value) || 50))}
                    className="w-20 text-center py-3 border-x border-[#E6E8EB] text-[#2C2C2C] font-semibold bg-white text-[13px]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  />
                  <button
                    onClick={() => setQty((q) => q + 10)}
                    className="px-4 py-3 hover:bg-[#FAFAF8] transition-colors"
                  >
                    <AddIcon sx={{ fontSize: 16 }} />
                  </button>
                </div>
                <span className="text-[12px] text-[#8A9199]">
                  Tier: <strong className="text-[#044c5c]">{tier.qty}</strong>
                  {tier.save && <span className="ml-1.5 text-[#16A34A] font-semibold">({tier.save})</span>}
                </span>
              </div>
            </div>

            {/* Printing / Decoration */}
            <div className="mb-4 border border-[#E6E8EB]" style={{ borderRadius: 0 }}>
              <SectionHeader
                title="Printing / Decoration"
                leftIcon={
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                    <rect x="6" y="14" width="12" height="8" />
                  </svg>
                }
                right={
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <span
                      className="inline-flex items-center justify-center w-4 h-4"
                      style={{
                        backgroundColor: isBlank ? "#FFFFFF" : "transparent",
                        border: "1px solid #FFFFFF",
                        borderRadius: 0,
                      }}
                    >
                      {isBlank && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#044c5c" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </span>
                    <input
                      type="checkbox"
                      checked={isBlank}
                      onChange={(e) => setIsBlank(e.target.checked)}
                      className="sr-only"
                    />
                    <span className="uppercase tracking-wider font-semibold">No printing (blank)</span>
                  </label>
                }
              />

              <div className={`transition-opacity ${isBlank ? "opacity-40 pointer-events-none" : "opacity-100"}`}>
                {/* Method tabs */}
                <div className="flex border-b border-[#E6E8EB] overflow-x-auto">
                  {printMethods.map((m) => {
                    const active = m.id === method;
                    return (
                      <button
                        key={m.id}
                        onClick={() => switchMethod(m.id)}
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

                <div className="p-4">
                  <p className="text-[13px] text-[#5B616A] leading-relaxed mb-4">
                    {activeMethod.description}
                  </p>

                  <div className="mb-4">
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-[#2C2C2C] mb-2">Print Position</div>
                    <div className="flex gap-2 flex-wrap">
                      {activeMethod.positions.map((p) => {
                        const active = position === p;
                        return (
                          <button
                            key={p}
                            onClick={() => setPosition(p)}
                            className="px-5 py-2 text-[12px] transition-all"
                            style={{
                              border: active ? "1px solid #044c5c" : "1px solid #E6E8EB",
                              backgroundColor: active ? "#044c5c" : "#FFFFFF",
                              color: active ? "#FFFFFF" : "#2C2C2C",
                              fontWeight: active ? 600 : 500,
                              borderRadius: 0,
                            }}
                          >
                            {p}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-[#2C2C2C] mb-2">Decoration Detail</div>
                    <div className="flex gap-2 flex-wrap">
                      {activeMethod.details.map((d) => {
                        const active = d.id === detailId;
                        return (
                          <button
                            key={d.id}
                            onClick={() => setDetailId(d.id)}
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
                            <span className="text-[11px] text-[#8A9199] font-medium">+AED {d.addon.toFixed(2)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity-based pricing table */}
            <div className="border border-[#E6E8EB] mb-4" style={{ borderRadius: 0 }}>
              <SectionHeader
                title="Quantity-Based Pricing"
                leftIcon={<VisibilityIcon sx={{ fontSize: 14 }} />}
                right={<span>Product + Print cost per unit</span>}
              />
              <div className="grid grid-cols-5 text-[11px] uppercase tracking-wider text-[#8A9199] font-semibold bg-[#FAFAF8] border-b border-[#E6E8EB]">
                <div className="px-4 py-2">Quantity</div>
                <div className="px-3 py-2 text-right">Product</div>
                <div className="px-3 py-2 text-right">Print</div>
                <div className="px-3 py-2 text-right">Unit Price</div>
                <div className="px-3 py-2 text-right">You Save</div>
              </div>
              {pricingTiers.map((t, i) => {
                const active = tier.min === t.min;
                const rowUnit = t.product + printAddon;
                return (
                  <button
                    key={t.min}
                    type="button"
                    onClick={() => setQty(t.min)}
                    className="grid grid-cols-5 text-[13px] text-[#2C2C2C] items-center relative w-full text-left hover:bg-[#F7F8FA] transition-colors cursor-pointer"
                    style={{
                      backgroundColor: active ? "#F2F8F9" : "#FFFFFF",
                      borderBottom: i < pricingTiers.length - 1 ? "1px solid #E6E8EB" : "none",
                      fontWeight: active ? 600 : 400,
                      borderLeft: active ? "3px solid #044c5c" : "3px solid transparent",
                      borderRadius: 0,
                    }}
                    aria-pressed={active}
                    aria-label={`Select ${t.qty} pricing tier`}
                  >
                    <div className="px-4 py-2.5 flex items-center gap-2">
                      <span
                        className="inline-flex items-center justify-center w-3.5 h-3.5 flex-shrink-0"
                        style={{
                          borderRadius: "50%",
                          border: active ? "4px solid #044c5c" : "1px solid #B8BEC6",
                          backgroundColor: active ? "#FFFFFF" : "#FFFFFF",
                        }}
                      />
                      {t.qty}
                    </div>
                    <div className="px-3 py-2.5 text-right text-[#5B616A]">AED {t.product.toFixed(2)}</div>
                    <div className="px-3 py-2.5 text-right text-[#5B616A]">
                      {isBlank ? <span className="text-[#B8BEC6]">—</span> : `AED ${printAddon.toFixed(2)}`}
                    </div>
                    <div className="px-3 py-2.5 text-right text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
                      AED {rowUnit.toFixed(2)}
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

            {/* Documents & Downloads */}
            <div className="mb-4 border border-[#E6E8EB]" style={{ borderRadius: 0 }}>
              <SectionHeader
                title="Documents & Downloads"
                leftIcon={<DescriptionIcon sx={{ fontSize: 14 }} />}
                right={<span>{documents.length} files</span>}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3">
                {documents.map((d) => (
                  <div
                    key={d.name}
                    className="flex items-center gap-2.5 px-3 py-2 border border-[#E6E8EB]"
                    style={{ borderRadius: 0 }}
                  >
                    <div
                      className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-[#F2F8F9]"
                      style={{ borderRadius: 0 }}
                    >
                      <DescriptionIcon sx={{ fontSize: 18, color: "#044c5c" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-[#2C2C2C] truncate">{d.name}</p>
                      <p className="text-[10px] text-[#8A9199]">
                        <span className="font-semibold text-[#044c5c]">{d.type}</span> · {d.size}
                      </p>
                    </div>
                    <button
                      className="w-8 h-8 flex items-center justify-center text-[#044c5c] hover:bg-[#F2F8F9] transition-colors"
                      aria-label={d.locked ? "Locked — sign in to download" : `Download ${d.name}`}
                    >
                      {d.locked ? (
                        <LockOutlinedIcon sx={{ fontSize: 16, color: "#8A9199" }} />
                      ) : (
                        <FileDownloadOutlinedIcon sx={{ fontSize: 18, color: "#044c5c" }} />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete the Gift — upsells */}
            <div className="mb-4 border border-[#E6E8EB]" style={{ borderRadius: 0 }}>
              <SectionHeader
                title="Complete the Gift"
                leftIcon={<CardGiftcardIcon sx={{ fontSize: 14 }} />}
                right={<span>Add packaging or bundle into a gift set</span>}
              />
              <div className="p-3 flex flex-col gap-2">
                {upsells.map((u) => {
                  const selected = selectedUpsells.has(u.id);
                  return (
                    <label
                      key={u.id}
                      className="flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-all"
                      style={{
                        border: selected ? "1px solid #044c5c" : "1px solid #E6E8EB",
                        backgroundColor: selected ? "#F2F8F9" : "#FFFFFF",
                        borderRadius: 0,
                      }}
                    >
                      <span
                        className="inline-flex items-center justify-center w-4 h-4 flex-shrink-0"
                        style={{
                          border: selected ? "1px solid #044c5c" : "1px solid #B8BEC6",
                          backgroundColor: selected ? "#044c5c" : "#FFFFFF",
                          borderRadius: 0,
                        }}
                      >
                        {selected && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleUpsell(u.id)}
                        className="sr-only"
                      />
                      <u.Icon sx={{ fontSize: 24, color: "#044c5c", flexShrink: 0 }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-[#2C2C2C] truncate" style={{ fontFamily: "Poppins, sans-serif" }}>
                          {u.name}
                        </p>
                        <p className="text-[12px] text-[#5B616A] truncate">{u.description}</p>
                      </div>
                      <span
                        className="text-[13px] text-[#044c5c] whitespace-nowrap"
                        style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
                      >
                        +${u.pricePerUnit.toFixed(2)}/unit
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="mb-4 border border-[#E6E8EB]" style={{ borderRadius: 0 }}>
              <SectionHeader title="Price Breakdown" right={<span>per unit × qty</span>} />
              <div className="p-4 space-y-1.5 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-[#5B616A]">Base product ({size})</span>
                  <span className="text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    AED {tier.product.toFixed(2)}
                  </span>
                </div>
                {!isBlank && (
                  <div className="flex justify-between">
                    <span className="text-[#5B616A]">
                      {activeMethod.label} · {activeDetail.label}
                    </span>
                    <span className="text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif" }}>
                      + AED {printAddon.toFixed(2)}
                    </span>
                  </div>
                )}
                {Array.from(selectedUpsells).map((id) => {
                  const u = upsells.find((x) => x.id === id);
                  if (!u) return null;
                  return (
                    <div key={id} className="flex justify-between">
                      <span className="text-[#5B616A]">+ {u.name}</span>
                      <span className="text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif" }}>
                        + AED {u.pricePerUnit.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
                <div className="flex justify-between pt-1.5 mt-1.5 border-t border-[#E6E8EB]">
                  <span className="text-[#2C2C2C] font-semibold">Per unit</span>
                  <span className="text-[#044c5c]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
                    AED {unitPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[#5B616A]">
                  <span>× Quantity</span>
                  <span style={{ fontFamily: "Poppins, sans-serif" }}>{qty.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 mt-1 border-t-2 border-[#044c5c]">
                  <span className="text-[14px] uppercase tracking-wider font-semibold text-[#2C2C2C]">Total</span>
                  <span className="text-[20px] text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
                    AED {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
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
                The TezkarGift Premium Full Sleeve T-Shirt is cut from 200 GSM ring-spun combed cotton for a smooth hand feel, a balanced drape, and a long wear life. A ribbed crew neck and ribbed cuffs keep the shape tight even after repeated washing, while double-needle stitching at the hem, cuffs, and neck binding holds up to daily use.
              </p>
              <p className="text-[14px] text-[#2C2C2C] leading-relaxed mb-6">
                Pre-shrunk fabric keeps sizing consistent batch-to-batch, and the classic regular fit works as a base layer, a branded staff uniform, or a retail-ready piece. Available in six stock colors with an extended palette on request, and brandable across four decoration methods — screen print, DTG, heat transfer, and embroidery.
              </p>

              <h4 className="text-[15px] text-[#2C2C2C] mb-2" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>Key Features</h4>
              <ul className="list-disc ml-5 space-y-1 text-[14px] text-[#5B616A] mb-6">
                <li>200 GSM 100% ring-spun combed cotton</li>
                <li>Full sleeve cut with ribbed cuffs</li>
                <li>Ribbed crew neck with self-fabric shoulder tape</li>
                <li>Double-needle stitching at hem, cuffs, and neck</li>
                <li>Pre-shrunk — less than 3% shrinkage after first wash</li>
                <li>Classic regular fit (unisex)</li>
                <li>7 sizes from XS to 3XL · 6 stock colors</li>
                <li>OEKO-TEX Standard 100 certified · BSCI-audited factory</li>
              </ul>

              <h4 className="text-[15px] text-[#2C2C2C] mb-2" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>Ideal For</h4>
              <ul className="list-disc ml-5 space-y-1 text-[14px] text-[#5B616A]">
                <li>Branded staff uniforms & corporate workwear</li>
                <li>Event merchandise & campaign giveaways</li>
                <li>Retail resale with your own label</li>
                <li>Team sports, training, and casual outdoor wear</li>
                <li>Loyalty and member kits</li>
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
              <Link to="/category/apparel" className="text-[12px] uppercase tracking-wider text-[#044c5c] font-semibold hover:text-[#d41c5c] transition-colors flex items-center gap-1">
                View All Apparel
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
                    <span>Apparel</span>
                    <span className="text-[#B8BEC6]">TG-APP-421{related.indexOf(r) + 1}</span>
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
