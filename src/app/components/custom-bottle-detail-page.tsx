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

const SIZE_OPTIONS = ["One Size"] as const;
const MIN_TOTAL_QTY = 25;

const PRINT_LOCATIONS = [
  { id: "wrap-around", label: "Wrap Around", highlight: { x: 35, y: 38, w: 30, h: 30 } },
];

const DESIGN_SIZES = [
  { id: "S", label: "S", dim: '3" × 3"', preview: 22 },
  { id: "M", label: "M", dim: '5" × 5"', preview: 30 },
  { id: "L", label: "L", dim: '8" × 8"', preview: 38 },
  { id: "XL", label: "XL", dim: '11" × 11"', preview: 46 },
  { id: "Custom", label: "Custom", dim: "Enter size", custom: true },
];

interface LocationConfig {
  method: PrintMethod;
  detailId: string;
  designSize: string;
  customSizeW?: string;
  customSizeH?: string;
  uploadedFileName?: string;
}

const defaultLocationConfig = (): LocationConfig => ({
  method: "screen",
  detailId: "1c",
  designSize: "M",
});

function TshirtIcon({
  highlight,
  active,
  size = 56,
}: {
  highlight?: { x: number; y: number; w: number; h: number };
  active: boolean;
  size?: number;
}) {
  const stroke = active ? "#044c5c" : "#B8BEC6";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Cap */}
      <rect x="42" y="6" width="16" height="10" rx="1.5" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      {/* Neck */}
      <path d="M44 16 L44 22 L42 26 L58 26 L56 22 L56 16" stroke={stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {/* Shoulders + Body */}
      <path
        d="M42 26 Q30 30 28 42 L28 86 Q28 92 34 92 L66 92 Q72 92 72 86 L72 42 Q70 30 58 26"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {highlight && (
        <rect
          x={highlight.x}
          y={highlight.y}
          width={highlight.w}
          height={highlight.h}
          fill={active ? "#044c5c" : "transparent"}
          stroke={active ? "#044c5c" : stroke}
          strokeWidth="1.5"
          opacity={active ? 0.85 : 0.55}
          rx="1"
        />
      )}
    </svg>
  );
}

function MethodIcon({ id, active }: { id: string; active: boolean }) {
  const c = active ? "#044c5c" : "#8A9199";
  switch (id) {
    case "screen":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
          <rect x="3" y="9" width="18" height="9" />
          <path d="M7 9V4h10v5" />
          <path d="M7 18h10v3H7z" />
          <circle cx="17" cy="13.5" r="0.8" fill={c} />
        </svg>
      );
    case "dtg":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7">
          <circle cx="12" cy="12" r="9" />
          <circle cx="8" cy="10" r="1.3" fill="#ef4444" stroke="none" />
          <circle cx="15" cy="9" r="1.3" fill="#10b981" stroke="none" />
          <circle cx="16" cy="14" r="1.3" fill="#f59e0b" stroke="none" />
          <circle cx="10" cy="15" r="1.3" fill="#3b82f6" stroke="none" />
        </svg>
      );
    case "heat":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
          <path d="M12 2c1.5 4 5 5 5 9a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3 1-5 1-8z" fill={active ? "#f59e0b55" : "none"} />
        </svg>
      );
    case "embroidery":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
          <rect x="7" y="3" width="10" height="14" rx="1" />
          <line x1="9" y1="6" x2="15" y2="6" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="9" y1="12" x2="15" y2="12" />
          <path d="M12 17v4" />
          <path d="M10 21h4" />
        </svg>
      );
    default:
      return null;
  }
}

export function CustomBottleDetailPage() {
  const [activeColor, setActiveColor] = useState(colors[0].name);
  const [activeImage, setActiveImage] = useState(colors[0].image);
  const [sizeQuantities, setSizeQuantities] = useState<Record<string, number>>(
    () => Object.fromEntries(SIZE_OPTIONS.map((s) => [s, MIN_TOTAL_QTY]))
  );
  const [locationConfigs, setLocationConfigs] = useState<Record<string, LocationConfig>>({
    "wrap-around": defaultLocationConfig(),
  });
  const [activeLocationId, setActiveLocationId] = useState<string | null>("wrap-around");
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "print" | "reviews">("desc");
  const [selectedUpsells, setSelectedUpsells] = useState<Set<string>>(new Set());
  const [productMode, setProductMode] = useState<"design" | "blank">("design");

  const selectedLocations = PRINT_LOCATIONS.filter((l) => locationConfigs[l.id]);
  const isBlank = selectedLocations.length === 0;
  const activeLocation = activeLocationId ? locationConfigs[activeLocationId] : null;
  const activeLocationMeta = PRINT_LOCATIONS.find((l) => l.id === activeLocationId) ?? null;
  const activeMethodConfig = activeLocation ? printMethods.find((m) => m.id === activeLocation.method)! : printMethods[0];

  const totalQty = SIZE_OPTIONS.reduce((sum, s) => sum + (sizeQuantities[s] || 0), 0);
  const qtyBelowMin = totalQty > 0 && totalQty < MIN_TOTAL_QTY;

  const printAddon = Object.values(locationConfigs).reduce((sum, cfg) => {
    const m = printMethods.find((pm) => pm.id === cfg.method);
    const d = m?.details.find((dd) => dd.id === cfg.detailId);
    return sum + (d?.addon ?? 0);
  }, 0);

  const tier = [...pricingTiers].reverse().find((t) => totalQty >= t.min) ?? pricingTiers[0];
  const upsellAddon = upsells
    .filter((u) => selectedUpsells.has(u.id))
    .reduce((sum, u) => sum + u.pricePerUnit, 0);
  const unitPrice = tier.product + printAddon + upsellAddon;
  const total = unitPrice * totalQty;

  const updateSizeQty = (s: string, value: string) => {
    const n = Math.max(0, parseInt(value) || 0);
    setSizeQuantities((prev) => ({ ...prev, [s]: n }));
  };

  const toggleUpsell = (id: string) => {
    const next = new Set(selectedUpsells);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedUpsells(next);
  };

  const toggleLocation = (id: string) => {
    setLocationConfigs((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
        if (activeLocationId === id) {
          const remaining = Object.keys(next);
          setActiveLocationId(remaining[0] ?? null);
        }
      } else {
        next[id] = defaultLocationConfig();
        setActiveLocationId(id);
      }
      return next;
    });
  };

  const updateActiveLocation = (updates: Partial<LocationConfig>) => {
    if (!activeLocationId) return;
    setLocationConfigs((prev) => ({
      ...prev,
      [activeLocationId]: { ...prev[activeLocationId], ...updates },
    }));
  };

  const switchLocationMethod = (methodId: PrintMethod) => {
    if (!activeLocationId) return;
    const m = printMethods.find((x) => x.id === methodId)!;
    const current = locationConfigs[activeLocationId];
    const detailId = m.details.some((d) => d.id === current.detailId) ? current.detailId : m.details[0].id;
    updateActiveLocation({ method: methodId, detailId });
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
          <Link to="/category/drinkware" className="hover:text-[#044c5c]">Drinkware</Link>
          <ChevronRightIcon sx={{ fontSize: 12 }} />
          <Link to="/category/drinkware/bottles" className="hover:text-[#044c5c]">Bottles</Link>
          <ChevronRightIcon sx={{ fontSize: 12 }} />
          <span className="text-[#044c5c] font-semibold">Custom Branding Bottle</span>
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
                alt="Custom Branding Bottle"
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
              <span>TG-DRK-7820</span>
            </div>

            {/* Title */}
            <h1 className="text-[24px] md:text-[30px] text-[#2C2C2C] leading-tight mb-3" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
              Custom Branding Bottle
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
                      onClick={() => setActiveColor(c.name)}
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

            {/* Quantity — single counter */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <div className="text-[12px] uppercase tracking-wider font-semibold text-[#2C2C2C]">
                  Quantity:
                  <span className="text-[#8A9199] normal-case tracking-normal font-normal ml-1.5">
                    Min. {MIN_TOTAL_QTY} pcs
                  </span>
                </div>
              </div>
              <div className="flex items-center" style={{ width: "fit-content", border: "1px solid #E6E8EB", borderRadius: 0, backgroundColor: "#FFFFFF" }}>
                <button
                  type="button"
                  onClick={() => updateSizeQty(SIZE_OPTIONS[0], String((sizeQuantities[SIZE_OPTIONS[0]] || 0) - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-[#F7F8FA] transition-colors"
                  style={{ borderRight: "1px solid #E6E8EB", color: "#2C2C2C" }}
                  aria-label="Decrease quantity"
                >
                  <RemoveIcon sx={{ fontSize: 18 }} />
                </button>
                <input
                  type="number"
                  min={0}
                  value={sizeQuantities[SIZE_OPTIONS[0]] || ""}
                  placeholder="0"
                  onChange={(e) => updateSizeQty(SIZE_OPTIONS[0], e.target.value)}
                  className="w-24 text-center text-[16px] text-[#2C2C2C] bg-white focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  style={{
                    height: "48px",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    border: "none",
                    borderRadius: 0,
                  }}
                />
                <button
                  type="button"
                  onClick={() => updateSizeQty(SIZE_OPTIONS[0], String((sizeQuantities[SIZE_OPTIONS[0]] || 0) + 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-[#F7F8FA] transition-colors"
                  style={{ borderLeft: "1px solid #E6E8EB", color: "#2C2C2C" }}
                  aria-label="Increase quantity"
                >
                  <AddIcon sx={{ fontSize: 18 }} />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] text-[#8A9199]">
                  Total qty must be ≥ {MIN_TOTAL_QTY} — Volume discounts start at 50 units
                </span>
                <span className="text-[12px] flex items-center gap-2">
                  <span className="text-[#8A9199]">Total:</span>
                  <strong
                    className={qtyBelowMin ? "text-[#d41c5c]" : "text-[#044c5c]"}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {totalQty} pcs
                  </strong>
                  {tier.save && totalQty >= tier.min && (
                    <span className="text-[#16A34A] font-semibold">({tier.save})</span>
                  )}
                </span>
              </div>
            </div>

            {/* PRODUCT MODE — Design or Blank */}
            <div className="mb-7">
              <div className="text-[12px] uppercase tracking-wider font-semibold text-[#2C2C2C] mb-3">
                Product Type
              </div>
              <div className="flex gap-3 flex-wrap">
                {([
                  { id: "design", label: "Design Product", desc: "Customize with your branding" },
                  { id: "blank", label: "Blank Product", desc: "Order as-is, no print" },
                ] as const).map((opt) => {
                  const active = productMode === opt.id;
                  return (
                    <label
                      key={opt.id}
                      className="flex-1 min-w-[200px] cursor-pointer transition-all"
                      style={{
                        border: active ? "2px solid #044c5c" : "1px solid #E6E8EB",
                        backgroundColor: active ? "#F0F9FB" : "#FFFFFF",
                        padding: "12px 14px",
                        borderRadius: 0,
                      }}
                    >
                      <div className="flex items-start gap-2.5">
                        <input
                          type="radio"
                          name="productMode"
                          value={opt.id}
                          checked={active}
                          onChange={() => setProductMode(opt.id)}
                          className="mt-0.5 accent-[#044c5c] w-4 h-4 cursor-pointer"
                          style={{ flexShrink: 0 }}
                        />
                        <div>
                          <div
                            className="text-[13px] text-[#2C2C2C]"
                            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                          >
                            {opt.label}
                          </div>
                          <div className="text-[11px] text-[#8A9199] mt-0.5">{opt.desc}</div>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* STEP 1 — Print Location (multi-select) */}
            {productMode === "design" && (
            <div className="mb-7 border border-[#E6E8EB]" style={{ borderRadius: 0 }}>
              <SectionHeader
                title="Step 1 · Print Location"
                leftIcon={
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-white text-[#044c5c] text-[10px] font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>1</span>
                }
                right={
                  <span>
                    {selectedLocations.length > 0
                      ? `${selectedLocations.length} area${selectedLocations.length > 1 ? "s" : ""} selected`
                      : "Pick one or more areas"}
                  </span>
                }
              />
              <div className="p-4">
                <p className="text-[12px] text-[#5B616A] mb-3">
                  Choose where you want to print on the t-shirt. You can pick multiple areas — each one is configured independently in the next step.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PRINT_LOCATIONS.map((loc) => {
                    const selected = !!locationConfigs[loc.id];
                    const isActive = activeLocationId === loc.id;
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => toggleLocation(loc.id)}
                        className="flex flex-col items-center justify-center py-3 transition-all relative"
                        style={{
                          border: isActive ? "2px solid #044c5c" : selected ? "1px solid #044c5c" : "1px solid #E6E8EB",
                          backgroundColor: selected ? "#F2F8F9" : "#FFFFFF",
                          borderRadius: 0,
                        }}
                      >
                        {selected && (
                          <span
                            className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#044c5c] text-white flex items-center justify-center"
                            style={{ borderRadius: "50%" }}
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                          </span>
                        )}
                        <TshirtIcon highlight={loc.highlight} active={selected} size={52} />
                        <span
                          className="text-[12px] mt-1.5 text-center px-2"
                          style={{
                            fontFamily: "Inter, sans-serif",
                            color: selected ? "#044c5c" : "#2C2C2C",
                            fontWeight: selected ? 700 : 500,
                          }}
                        >
                          {loc.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            )}

            {/* STEP 2 — Configure Print for each location */}
            {productMode === "design" && !isBlank && activeLocation && activeLocationMeta && (
              <div className="mb-7 border border-[#E6E8EB]" style={{ borderRadius: 0 }}>
                <SectionHeader
                  title="Step 2 · Configure Print"
                  leftIcon={
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-white text-[#044c5c] text-[10px] font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>2</span>
                  }
                  right={<span>Editing: {activeLocationMeta.label}</span>}
                />

                {/* Location tabs */}
                {selectedLocations.length > 1 && (
                  <div className="flex border-b border-[#E6E8EB] overflow-x-auto bg-[#FAFAF8]">
                    {selectedLocations.map((loc) => {
                      const active = activeLocationId === loc.id;
                      return (
                        <button
                          key={loc.id}
                          type="button"
                          onClick={() => setActiveLocationId(loc.id)}
                          className="px-4 py-3 text-[11px] uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5"
                          style={{
                            color: active ? "#044c5c" : "#5B616A",
                            fontWeight: active ? 700 : 500,
                            borderBottom: active ? "2px solid #044c5c" : "2px solid transparent",
                            backgroundColor: active ? "#FFFFFF" : "transparent",
                            marginBottom: "-1px",
                          }}
                        >
                          <TshirtIcon highlight={loc.highlight} active={active} size={20} />
                          {loc.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="p-4">
                  {/* A · Printing Method */}
                  <div className="mb-5">
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-[#2C2C2C] mb-2">
                      A · Printing Method
                      <span className="ml-1.5 text-[#044c5c] normal-case tracking-normal font-bold">
                        {activeMethodConfig.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {printMethods.map((m) => {
                        const active = m.id === activeLocation.method;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => switchLocationMethod(m.id)}
                            className="flex flex-col items-center justify-center py-3 transition-all"
                            style={{
                              border: active ? "2px solid #044c5c" : "1px solid #E6E8EB",
                              backgroundColor: active ? "#F2F8F9" : "#FFFFFF",
                              borderRadius: 0,
                            }}
                          >
                            <MethodIcon id={m.id} active={active} />
                            <span
                              className="text-[12px] mt-1.5"
                              style={{
                                fontFamily: "Inter, sans-serif",
                                color: active ? "#044c5c" : "#2C2C2C",
                                fontWeight: active ? 700 : 500,
                              }}
                            >
                              {m.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[12px] text-[#5B616A] leading-relaxed mt-2">
                      {activeMethodConfig.description}
                    </p>
                  </div>

                  {/* B · Number of Colors / Decoration Detail */}
                  <div className="mb-5">
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-[#2C2C2C] mb-2">
                      B · {activeMethodConfig.id === "embroidery" ? "Stitch Count" : activeMethodConfig.id === "heat" ? "Transfer Size" : "Number of Colors"}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {activeMethodConfig.details.map((d) => {
                        const active = d.id === activeLocation.detailId;
                        return (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => updateActiveLocation({ detailId: d.id })}
                            className="px-4 py-2.5 text-[12px] transition-all flex items-center gap-2"
                            style={{
                              border: active ? "2px solid #044c5c" : "1px solid #E6E8EB",
                              backgroundColor: active ? "#F2F8F9" : "#FFFFFF",
                              color: "#2C2C2C",
                              fontWeight: active ? 700 : 500,
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

                  {/* C · Design Size */}
                  <div className="mb-5">
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-[#2C2C2C] mb-2">
                      C · Design Size
                      <span className="ml-1.5 text-[#044c5c] normal-case tracking-normal font-bold">
                        {DESIGN_SIZES.find((sz) => sz.id === activeLocation.designSize)?.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-2 items-end">
                      {DESIGN_SIZES.map((sz) => {
                        const active = sz.id === activeLocation.designSize;
                        return (
                          <button
                            key={sz.id}
                            type="button"
                            onClick={() => updateActiveLocation({ designSize: sz.id })}
                            className="flex flex-col items-center justify-end py-3 px-2 transition-all"
                            style={{
                              border: active ? "2px solid #044c5c" : "1px solid #E6E8EB",
                              backgroundColor: active ? "#F2F8F9" : "#FFFFFF",
                              borderRadius: 0,
                            }}
                          >
                            <span
                              className="flex items-center justify-center mb-1.5"
                              style={{
                                width: sz.preview ?? 40,
                                height: sz.preview ?? 40,
                                border: `1.5px ${active ? "solid" : "dashed"} ${active ? "#044c5c" : "#B8BEC6"}`,
                                color: active ? "#044c5c" : "#8A9199",
                                backgroundColor: "#FFFFFF",
                              }}
                            >
                              {sz.custom && <span className="text-[16px] font-bold">+</span>}
                            </span>
                            <span
                              className="text-[12px]"
                              style={{
                                fontFamily: "Inter, sans-serif",
                                color: active ? "#044c5c" : "#2C2C2C",
                                fontWeight: active ? 700 : 500,
                              }}
                            >
                              {sz.label}
                            </span>
                            <span className="text-[10px] text-[#8A9199] mt-0.5 text-center">{sz.dim}</span>
                          </button>
                        );
                      })}
                    </div>
                    {activeLocation.designSize === "Custom" && (
                      <div className="mt-3 flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder="Width"
                          value={activeLocation.customSizeW ?? ""}
                          onChange={(e) => updateActiveLocation({ customSizeW: e.target.value })}
                          className="w-24 text-center py-2 text-[13px] border border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none"
                          style={{ borderRadius: 0, fontFamily: "Inter, sans-serif" }}
                        />
                        <span className="text-[#8A9199]">×</span>
                        <input
                          type="text"
                          placeholder="Height"
                          value={activeLocation.customSizeH ?? ""}
                          onChange={(e) => updateActiveLocation({ customSizeH: e.target.value })}
                          className="w-24 text-center py-2 text-[13px] border border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none"
                          style={{ borderRadius: 0, fontFamily: "Inter, sans-serif" }}
                        />
                        <span className="text-[11px] text-[#8A9199]">inches</span>
                      </div>
                    )}
                  </div>

                  {/* D · Upload Artwork */}
                  <div>
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-[#2C2C2C] mb-2">
                      D · Upload Artwork
                    </div>
                    <label
                      className="flex flex-col items-center justify-center gap-2 px-4 py-6 border-2 border-dashed border-[#E6E8EB] bg-[#FAFAF8] cursor-pointer hover:border-[#044c5c] hover:bg-[#F2F8F9] transition-colors"
                      style={{ borderRadius: 0 }}
                    >
                      <CloudUploadIcon sx={{ fontSize: 28, color: "#044c5c" }} />
                      <span className="text-[13px] text-[#2C2C2C] font-medium">
                        {activeLocation.uploadedFileName ? activeLocation.uploadedFileName : "Drop artwork here or click to upload"}
                      </span>
                      <span className="text-[11px] text-[#8A9199]">
                        PNG, JPG, AI, EPS, PDF, SVG (max 20 MB)
                      </span>
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg,.ai,.eps,.pdf,.svg"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) updateActiveLocation({ uploadedFileName: file.name });
                        }}
                        className="hidden"
                      />
                    </label>
                    {activeLocation.uploadedFileName && (
                      <button
                        type="button"
                        onClick={() => updateActiveLocation({ uploadedFileName: undefined })}
                        className="mt-2 text-[11px] text-[#d41c5c] hover:underline"
                      >
                        Remove artwork
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

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
                    onClick={() => setSizeQuantities((prev) => ({ ...prev, M: t.min }))}
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
                  <span className="text-[#5B616A]">
                    Base product
                    {totalQty > 0 && (
                      <span className="text-[#B8BEC6] ml-1">
                        (
                        {SIZE_OPTIONS.filter((s) => (sizeQuantities[s] || 0) > 0)
                          .map((s) => `${sizeQuantities[s]} × ${s}`)
                          .join(", ")}
                        )
                      </span>
                    )}
                  </span>
                  <span className="text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    AED {tier.product.toFixed(2)}
                  </span>
                </div>
                {!isBlank && selectedLocations.map((loc) => {
                  const cfg = locationConfigs[loc.id];
                  const m = printMethods.find((pm) => pm.id === cfg.method);
                  const d = m?.details.find((dd) => dd.id === cfg.detailId);
                  if (!m || !d) return null;
                  return (
                    <div key={loc.id} className="flex justify-between">
                      <span className="text-[#5B616A]">
                        {loc.label} · {m.label} · {d.label}
                      </span>
                      <span className="text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif" }}>
                        + AED {d.addon.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
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
                  <span>× Total quantity</span>
                  <span style={{ fontFamily: "Poppins, sans-serif" }}>{totalQty.toLocaleString()} pcs</span>
                </div>
                <div className="flex justify-between pt-2 mt-1 border-t-2 border-[#044c5c]">
                  <span className="text-[14px] uppercase tracking-wider font-semibold text-[#2C2C2C]">Total</span>
                  <span className="text-[20px] text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
                    AED {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs — depend on Product Type */}
            {productMode === "design" ? (
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
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  className="flex items-center justify-center gap-2 py-3.5 bg-[#044c5c] text-white hover:!text-white hover:bg-[#033a48] transition-colors text-[12px] uppercase tracking-wider"
                  style={{ borderRadius: 0, fontWeight: 700, fontFamily: "Poppins, sans-serif", color: "#fff" }}
                >
                  <RequestQuoteIcon sx={{ fontSize: 16 }} />
                  Request for Quote
                </button>
                <button
                  className="flex items-center justify-center gap-2 py-3.5 bg-[#d41c5c] text-white hover:!text-white hover:bg-[#b51650] transition-colors text-[12px] uppercase tracking-wider"
                  style={{ borderRadius: 0, fontWeight: 700, fontFamily: "Poppins, sans-serif", color: "#fff" }}
                >
                  <ShoppingCartIcon sx={{ fontSize: 16 }} />
                  Add to Cart (Blank)
                </button>
              </div>
            )}
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
