import { useState } from "react";
import { Link } from "react-router";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckIcon from "@mui/icons-material/Check";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ReplayIcon from "@mui/icons-material/Replay";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import StarIcon from "@mui/icons-material/Star";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CtaButton } from "./ui/cta-button";

type PrintingMethodId = "blank" | "logo" | "fullColor" | "sample";

const IMG = {
  matteBlack: "https://images.unsplash.com/photo-1662524281334-215f83f6f98a?w=1200&h=1200&fit=crop",
  copper: "https://images.unsplash.com/photo-1609097828013-c98743a157cd?w=1200&h=1200&fit=crop",
  white: "https://images.unsplash.com/photo-1664714628878-9d2aa898b9e3?w=1200&h=1200&fit=crop",
  red: "https://images.unsplash.com/photo-1760754726716-45970152ebd5?w=1200&h=1200&fit=crop",
  green: "https://images.unsplash.com/photo-1686916059707-a15e0efb900c?w=1200&h=1200&fit=crop",
  blue: "https://images.unsplash.com/photo-1769445886383-a6beba6b66fb?w=1200&h=1200&fit=crop",
  branding: "https://images.unsplash.com/photo-1585250815365-a90a469677c5?w=1200&h=1200&fit=crop",
  sideAngle: "https://images.unsplash.com/photo-1679224102107-4b3c7201de72?w=1200&h=1200&fit=crop",
  packaging: "https://images.unsplash.com/photo-1553531384-7e0c12f3d620?w=1200&h=1200&fit=crop",
};

const colors = [
  { name: "Matte Black", hex: "#1a1a1a", image: IMG.matteBlack },
  { name: "Copper Rose", hex: "#b87333", image: IMG.copper },
  { name: "Arctic White", hex: "#f5f5f5", border: true, image: IMG.white },
  { name: "Racing Red", hex: "#cc2222", image: IMG.red },
  { name: "Forest Green", hex: "#2d6a2e", image: IMG.green },
  { name: "Gradient Blue", hex: "#4a90d9", image: IMG.blue },
];

const gallery = [
  IMG.matteBlack,
  IMG.branding,
  IMG.sideAngle,
  IMG.packaging,
  IMG.copper,
  IMG.white,
];

const printingMethods = [
  { id: "blank" as const, label: "Blank", sub: "No printing", addon: 0 },
  { id: "logo" as const, label: "Logo (1-color)", sub: "Brand mark", addon: 1.2 },
  { id: "fullColor" as const, label: "Full Color", sub: "Photo / gradient", addon: 2.5 },
  { id: "sample" as const, label: "Sample", sub: "1 pc trial", addon: 3, fixed: 1 },
];

const tiers = [
  { min: 50, price: 15.0 },
  { min: 100, price: 13.5 },
  { min: 250, price: 11.8 },
  { min: 500, price: 10.2 },
  { min: 1000, price: 8.9 },
];

const resolveTier = (qty: number) => {
  let t = tiers[0];
  for (const x of tiers) if (qty >= x.min) t = x;
  return t;
};

const valueProps = [
  { Icon: LocalShippingIcon, title: "Free Shipping", sub: "Across UAE on orders over AED 500" },
  { Icon: VerifiedUserIcon, title: "Quality Guaranteed", sub: "Full branding QA on every unit" },
  { Icon: ReplayIcon, title: "Easy Returns", sub: "14-day return on defective items" },
  { Icon: SupportAgentIcon, title: "Dedicated Support", sub: "Account manager assigned" },
];

const sections: { id: string; title: string; content: React.ReactNode }[] = [
  {
    id: "desc",
    title: "Product Description",
    content: (
      <>
        <p className="mb-4">
          The TezkarGift Custom Branding Bottle is engineered for maximum temperature
          retention with a sleek, professional aesthetic. Its double-wall vacuum
          insulation keeps beverages cold for up to 24 hours or hot for up to 12 hours.
        </p>
        <p className="mb-4">
          The durable powder-coated exterior resists fingerprints and scratches, making
          it ideal for daily use and custom branding. Available in multiple colors to
          match any brand identity.
        </p>
        <p className="font-semibold text-[#2C2C2C] mt-6 mb-2">Key Features</p>
        <ul className="list-disc ml-5 space-y-1 text-[#5B616A]">
          <li>Double-wall vacuum insulation (24 hrs cold / 12 hrs hot)</li>
          <li>18/8 food-grade stainless steel interior</li>
          <li>Powder-coated matte exterior finish</li>
          <li>Leak-proof threaded lid with silicone seal</li>
          <li>BPA-free and toxin-free materials</li>
        </ul>
      </>
    ),
  },
  {
    id: "specs",
    title: "Specifications",
    content: (
      <dl className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-y-2 gap-x-4 text-[14px]">
        {[
          ["SKU", "TG-SSB-2610"],
          ["Material", "18/8 Food-Grade Stainless Steel"],
          ["Capacity", "500ml (17 oz)"],
          ["Dimensions", "72 × 72 × 255 mm"],
          ["Weight", "320g"],
          ["Insulation", "Double-wall vacuum"],
          ["BPA Free", "Yes"],
          ["Lead Time (Stock)", "5–7 business days"],
          ["Lead Time (Custom)", "12–15 business days"],
          ["Certification", "FDA / LFGB / SGS"],
          ["Warranty", "2 years"],
        ].map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="font-semibold text-[#2C2C2C]">{k}</dt>
            <dd className="text-[#5B616A]">{v}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  {
    id: "print",
    title: "Printing Positions",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          { name: "Front Center", dim: "60 × 80 mm" },
          { name: "Back Center", dim: "60 × 80 mm" },
          { name: "Full Wrap", dim: "200 × 80 mm" },
          { name: "Lid Top", dim: "30 mm dia." },
        ].map((p) => (
          <div key={p.name} className="flex items-center justify-between bg-white border border-[#E6E8EB] px-4 py-3" style={{ borderRadius: 0 }}>
            <span className="font-medium text-[#2C2C2C]">{p.name}</span>
            <span className="text-sm text-[#5B616A]">{p.dim}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "reviews",
    title: "Reviews (47)",
    content: (
      <div className="space-y-4">
        {[
          { author: "Ahmed K.", rating: 5, title: "Excellent quality for corporate gifts", body: "We ordered 500 pieces. The laser engraving came out perfectly and the bottles keep drinks cold all day." },
          { author: "Sarah M.", rating: 4, title: "Great bottle, fast delivery", body: "Very pleased with quality. The matte black finish looks premium." },
          { author: "James L.", rating: 5, title: "Perfect for our startup swag", body: "UV printing quality was outstanding. Colors are vibrant and haven't faded after 3 months daily use." },
        ].map((r, i) => (
          <div key={i} className="border border-[#E6E8EB] p-4" style={{ borderRadius: 0 }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-[#2C2C2C]">{r.author}</span>
              <span className="flex text-[#FFB020]">
                {Array.from({ length: r.rating }).map((_, k) => (
                  <StarIcon key={k} sx={{ fontSize: 14 }} />
                ))}
              </span>
            </div>
            <p className="font-medium text-[#2C2C2C] mb-1">{r.title}</p>
            <p className="text-sm text-[#5B616A] leading-relaxed">{r.body}</p>
          </div>
        ))}
      </div>
    ),
  },
];

const related = [
  { name: "Copper Rose Vacuum Bottle - 750ml", price: 22, image: IMG.copper, slug: "copper-rose-vacuum-bottle-750ml" },
  { name: "Arctic White Thermos - 500ml", price: 18, image: IMG.white, slug: "arctic-white-thermos-500ml" },
  { name: "Sport Gradient Blue Bottle - 600ml", price: 12, image: IMG.blue, slug: "sport-gradient-blue-bottle-600ml" },
  { name: "Racing Red Insulated Bottle - 500ml", price: 14, image: IMG.red, slug: "racing-red-insulated-bottle-500ml" },
];

export function ProductDetailPageV2() {
  const [activeColor, setActiveColor] = useState(colors[0].name);
  const [activeImage, setActiveImage] = useState(colors[0].image);
  const [method, setMethod] = useState<PrintingMethodId>("logo");
  const [qty, setQty] = useState(50);
  const [expanded, setExpanded] = useState<string | null>("desc");
  const [file, setFile] = useState<File | undefined>();

  const activeMethod = printingMethods.find((m) => m.id === method)!;
  const effectiveQty = activeMethod.fixed ?? qty;
  const tier = resolveTier(effectiveQty);
  const unitPrice = tier.price + activeMethod.addon;
  const total = unitPrice * effectiveQty;

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-6">
        <div className="flex items-center gap-1 text-[12px] text-[#8A9199]">
          <Link to="/" className="hover:text-[#044c5c]">Home</Link>
          <ChevronRightIcon sx={{ fontSize: 14 }} />
          <Link to="/category/drinkwares" className="hover:text-[#044c5c]">Drinkwares</Link>
          <ChevronRightIcon sx={{ fontSize: 14 }} />
          <span className="text-[#2C2C2C] font-medium">Custom Branding Bottle — 500ml</span>
        </div>
      </div>

      {/* Hero / Main — Editorial 7/5 split */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-8 lg:gap-16">
          {/* Gallery */}
          <div className="lg:sticky lg:top-6 self-start">
            <div className="relative bg-[#FAFAF8] overflow-hidden aspect-square" style={{ borderRadius: 0 }}>
              <img
                key={activeImage}
                src={activeImage}
                alt="Custom Branding Bottle"
                className="w-full h-full object-cover"
                style={{ animation: "pdpV2Fade 250ms ease" }}
              />
              <span className="absolute top-4 left-4 bg-[#d41c5c] text-white text-[10px] uppercase tracking-wider px-3 py-1.5" style={{ fontWeight: 700 }}>
                Hot
              </span>
              <span className="absolute top-4 right-4 bg-white text-[#2C2C2C] text-[11px] px-3 py-1.5 border border-[#E6E8EB]" style={{ fontWeight: 600 }}>
                Save 40%
              </span>
            </div>
            {/* Filmstrip thumbnails */}
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {gallery.map((src, i) => {
                const active = src === activeImage;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveImage(src)}
                    className="flex-shrink-0 w-[88px] h-[88px] bg-[#FAFAF8] overflow-hidden"
                    style={{
                      border: active ? "2px solid #044c5c" : "1px solid #E6E8EB",
                      borderRadius: 0,
                    }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" style={{ opacity: active ? 1 : 0.75 }} />
                  </button>
                );
              })}
            </div>
            <style>{`@keyframes pdpV2Fade { from { opacity: 0.4 } to { opacity: 1 } }`}</style>
          </div>

          {/* Config panel */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#d41c5c] font-semibold mb-2">
              TezkarGift · Drinkwares
            </p>
            <h1 className="text-[28px] md:text-[36px] leading-tight text-[#2C2C2C] mb-3" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
              Custom Branding Bottle
              <br />
              <span className="text-[#8A9199] text-[22px] md:text-[26px]" style={{ fontWeight: 400 }}>500ml · Double-wall insulated</span>
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <span className="flex text-[#FFB020]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} sx={{ fontSize: 16 }} />
                ))}
              </span>
              <span className="text-sm text-[#5B616A]">4.6 · 47 verified reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-[40px] text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                ${unitPrice.toFixed(2)}
              </span>
              <span className="text-[18px] text-[#8A9199] line-through">$25.00</span>
              <span className="bg-[#F0FDF4] text-[#16A34A] text-[11px] px-2 py-0.5 uppercase tracking-wider" style={{ fontWeight: 700 }}>
                Save 40%
              </span>
            </div>
            <p className="text-sm text-[#5B616A] mb-6">
              per unit @ {effectiveQty.toLocaleString()} qty · volume discounts up to 41% off
            </p>

            {/* Divider */}
            <div className="h-px bg-[#E6E8EB] mb-6" />

            {/* Color */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[#2C2C2C]">Color</span>
                <span className="text-sm text-[#5B616A]">{activeColor}</span>
              </div>
              <div className="flex gap-2.5 flex-wrap">
                {colors.map((c) => {
                  const active = c.name === activeColor;
                  return (
                    <button
                      key={c.name}
                      onClick={() => {
                        setActiveColor(c.name);
                        setActiveImage(c.image);
                      }}
                      className="relative w-11 h-11 flex items-center justify-center"
                      style={{
                        backgroundColor: c.hex,
                        border: c.border ? "1px solid #E6E8EB" : "1px solid transparent",
                        outline: active ? "2px solid #044c5c" : "none",
                        outlineOffset: "3px",
                        borderRadius: "50%",
                        transition: "outline 0.15s",
                      }}
                      title={c.name}
                    >
                      {active && <CheckIcon sx={{ fontSize: 16, color: c.name === "Arctic White" ? "#044c5c" : "#fff" }} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Printing method as segmented pills */}
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[#2C2C2C] block mb-3">Printing Method</span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {printingMethods.map((m) => {
                  const active = m.id === method;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      className="text-left px-3 py-3 transition-all"
                      style={{
                        border: active ? "2px solid #044c5c" : "1px solid #E6E8EB",
                        backgroundColor: active ? "#F2F8F9" : "#FFFFFF",
                        borderRadius: 0,
                      }}
                    >
                      <div className="text-[12px] font-semibold text-[#2C2C2C] mb-0.5">{m.label}</div>
                      <div className="text-[11px] text-[#8A9199]">{m.sub}</div>
                      {m.addon > 0 && (
                        <div className="text-[11px] text-[#044c5c] font-semibold mt-1">+${m.addon.toFixed(2)}</div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Artwork upload — collapsible */}
            {(method === "logo" || method === "fullColor") && (
              <div className="mb-6">
                <span className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[#2C2C2C] block mb-3">Your Artwork</span>
                <label className="flex items-center justify-center gap-3 px-4 py-5 border-2 border-dashed border-[#E6E8EB] bg-[#FAFAF8] cursor-pointer hover:border-[#044c5c] transition-colors" style={{ borderRadius: 0 }}>
                  <CloudUploadIcon sx={{ fontSize: 20, color: "#044c5c" }} />
                  <span className="text-sm text-[#2C2C2C]">
                    {file ? file.name : "Drop your logo here or click to upload"}
                  </span>
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.ai,.eps,.pdf,.svg"
                    onChange={(e) => setFile(e.target.files?.[0])}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {/* Quantity + volume hint */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[#2C2C2C]">Quantity</span>
                <span className="text-sm text-[#044c5c] font-semibold">
                  Next tier: {tiers.find((t) => t.min > effectiveQty)?.min ?? "max"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#E6E8EB]" style={{ borderRadius: 0 }}>
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 10))}
                    disabled={!!activeMethod.fixed}
                    className="px-4 py-3 hover:bg-[#FAFAF8] transition-colors disabled:opacity-40"
                  >
                    <RemoveIcon sx={{ fontSize: 16 }} />
                  </button>
                  <input
                    type="number"
                    value={effectiveQty}
                    disabled={!!activeMethod.fixed}
                    onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center py-3 border-x border-[#E6E8EB] text-[#2C2C2C] font-medium bg-white disabled:bg-[#FAFAF8]"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  />
                  <button
                    onClick={() => setQty((q) => q + 10)}
                    disabled={!!activeMethod.fixed}
                    className="px-4 py-3 hover:bg-[#FAFAF8] transition-colors disabled:opacity-40"
                  >
                    <AddIcon sx={{ fontSize: 16 }} />
                  </button>
                </div>
                <div className="text-right flex-1">
                  <div className="text-[11px] uppercase tracking-wide text-[#8A9199]">Total</div>
                  <div className="text-[22px] font-semibold text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    ${total.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <CtaButton
                variant="primary"
                size="lg"
                fullWidth
                leftIcon={<ShoppingCartIcon sx={{ fontSize: 18 }} />}
              >
                Add to Cart
              </CtaButton>
              <CtaButton
                variant="secondary"
                size="lg"
                fullWidth
                leftIcon={<RequestQuoteIcon sx={{ fontSize: 18 }} />}
              >
                Add to Quote
              </CtaButton>
            </div>

            {/* Trust row */}
            <div className="flex items-center gap-4 text-xs text-[#5B616A] pb-6 border-b border-[#E6E8EB]">
              <span className="flex items-center gap-1.5">
                <LocalShippingIcon sx={{ fontSize: 14, color: "#16A34A" }} />
                Free shipping
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <ReplayIcon sx={{ fontSize: 14, color: "#16A34A" }} />
                14-day returns
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <VerifiedUserIcon sx={{ fontSize: 14, color: "#16A34A" }} />
                Quality assured
              </span>
            </div>

            {/* Tier strip */}
            <div className="mt-6">
              <p className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[#2C2C2C] mb-3">Volume Pricing</p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {tiers.map((t) => {
                  const active = t.min === tier.min;
                  return (
                    <div
                      key={t.min}
                      className="flex-shrink-0 px-4 py-3 text-center min-w-[90px]"
                      style={{
                        border: active ? "2px solid #044c5c" : "1px solid #E6E8EB",
                        backgroundColor: active ? "#F2F8F9" : "#FFFFFF",
                        borderRadius: 0,
                      }}
                    >
                      <div className="text-[11px] text-[#8A9199] uppercase tracking-wide">{t.min}+ pcs</div>
                      <div className="text-[15px] font-semibold text-[#044c5c]" style={{ fontFamily: "Poppins, sans-serif" }}>
                        ${(t.price + activeMethod.addon).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value props strip */}
      <section className="bg-[#FAFAF8] border-y border-[#E6E8EB]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {valueProps.map((v) => (
              <div key={v.title} className="flex items-start gap-3">
                <div className="p-2.5 bg-white border border-[#E6E8EB] flex-shrink-0" style={{ borderRadius: 0 }}>
                  <v.Icon sx={{ fontSize: 22, color: "#044c5c" }} />
                </div>
                <div>
                  <p className="font-semibold text-[#2C2C2C] text-sm">{v.title}</p>
                  <p className="text-xs text-[#5B616A] leading-snug mt-0.5">{v.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion sections */}
      <section className="max-w-[900px] mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-[22px] md:text-[26px] text-[#2C2C2C] mb-6" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
          Product Details
        </h2>
        <div className="divide-y divide-[#E6E8EB] border-t border-b border-[#E6E8EB]">
          {sections.map((s) => {
            const open = expanded === s.id;
            return (
              <div key={s.id}>
                <button
                  onClick={() => setExpanded(open ? null : s.id)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className="text-[16px] font-semibold text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {s.title}
                  </span>
                  <ExpandMoreIcon
                    sx={{
                      fontSize: 24,
                      color: "#044c5c",
                      transform: open ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}
                  />
                </button>
                {open && (
                  <div className="pb-6 text-[14px] text-[#5B616A] leading-relaxed">
                    {s.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Related products */}
      <section className="bg-[#FAFAF8]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="flex items-end justify-between mb-6 md:mb-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#d41c5c] font-semibold mb-1">More drinkwares</p>
              <h2 className="text-[22px] md:text-[26px] text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                You may also like
              </h2>
            </div>
            <Link to="/category/drinkwares" className="text-sm text-[#044c5c] font-medium flex items-center gap-1 hover:underline">
              View all
              <ChevronRightIcon sx={{ fontSize: 16 }} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((r) => (
              <Link key={r.slug} to={`/product/${r.slug}`} className="bg-white border border-[#E6E8EB] group overflow-hidden" style={{ borderRadius: 0 }}>
                <div className="aspect-square overflow-hidden bg-[#FAFAF8]">
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3 md:p-4">
                  <p className="text-[13px] text-[#2C2C2C] leading-snug mb-1 line-clamp-2 min-h-[36px]">{r.name}</p>
                  <p className="text-[15px] font-semibold text-[#044c5c]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    From AED {r.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
