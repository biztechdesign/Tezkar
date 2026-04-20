/* ──────────────────────────────────────────────────────
   Product Data for Stainless Steel Bottles
   ────────────────────────────────────────────────────── */

/* ── Ceramic Mug Product Images (figma assets) ── */
import mugBothColors from "figma:asset/9c6a8183c04b323e25ca369d01ec67db14f79aa0.png";
import mugWhiteSolo from "figma:asset/e9181bee6bce5907ca788dd1e4e058d13fb93cad.png";
import mugBranded from "figma:asset/aa1733f5bda183730490eb2463a5a054430ff394.png";
import mugBlackSolo from "figma:asset/9b6b8cecf2b242de766402cfe547dcf5f78d406d.png";
import mugCreativeAngle from "figma:asset/0e98b7de30d873ac81190e3d9d6639ae4fd40d28.png";
import mugWithBox from "figma:asset/32854bfa7d2cb77fa15f4297eb84c1d26b0880a9.png";

export interface ColorVariant {
  name: string;
  hex: string;
  image: string;
  secondaryImage: string;
}

export interface PrintingSide {
  name: string;
  options: { label: string; priceAddon: number }[];
}

export interface PrintingMethod {
  name: string;
  description: string;
  sides: PrintingSide[];
}

export interface TierPrice {
  qty: number;
  unitPrice: number;
}

export interface Specification {
  label: string;
  value: string;
}

export interface Attachment {
  name: string;
  type: string;
  size: string;
  restricted: boolean;
}

export interface PrintPositionDetail {
  method: string;
  positions: {
    name: string;
    widthMM: number;
    heightMM: number;
    shape: "rect" | "circle";
    description: string;
  }[];
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  images?: string[];
  verified: boolean;
}

export interface ProductDetail {
  id: string;
  slug: string;
  sku: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  subcategory: string;
  brand: string;
  badge?: "New" | "Hot" | "Sale" | "Eco" | "Ready Stock";
  basePrice: number;
  oldPrice?: number;
  tierPricing: TierPrice[];
  moq: number;
  leadTime: string;
  inStock: boolean;
  stockQty: number;
  rating: number;
  reviewCount: number;
  colors: ColorVariant[];
  sizes: string[];
  materials: string[];
  printingMethods: PrintingMethod[];
  specifications: Specification[];
  printPositions: string[];
  printPositionDetails?: PrintPositionDetail[];
  printPositionImage?: string;
  packagingDetails: string;
  attachments: Attachment[];
  reviews: Review[];
  galleryImages: string[];
}

/* ── Image URLs ── */
const IMG = {
  matteBlack: "https://images.unsplash.com/photo-1662524281334-215f83f6f98a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXR0ZSUyMGJsYWNrJTIwc3RhaW5sZXNzJTIwc3RlZWwlMjB3YXRlciUyMGJvdHRlSUyMG1pbmltYWx8ZW58MXx8fHwxNzczMjI5ODA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  copper: "https://images.unsplash.com/photo-1609097828013-c98743a157cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3BwZXIlMjBzdGFpbmxlc3MlMjBzdGVlbCUyMGluc3VsYXRlZCUyMGJvdHRlSUyMHNwb3J0fGVufDF8fHx8MTc3MzIyOTgxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  white: "https://images.unsplash.com/photo-1664714628878-9d2aa898b9e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHN0YWlubGVzcyUyMHN0ZWVsJTIwdGhlcm1vcyUyMGJvdHRlSUyMHNwb3J0fGVufDF8fHx8MTc3MzIyOTgxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  blue: "https://images.unsplash.com/photo-1769445886383-a6beba6b66fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkaWVudCUyMGJsdWUlMjB3YXRlciUyMGJvdHRlSUyMHNwb3J0fGVufDF8fHx8MTc3MzIyOTgxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  bamboo: "https://images.unsplash.com/photo-1641754644192-24e09c2b444b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBsaWQlMjBzdGFpbmxlc3MlMjBib3R0bGUlMjBlY298ZW58MXx8fHwxNzczMjI5ODExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  collection: "https://images.unsplash.com/photo-1632850210350-4c9d8a6cc236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFpbmxlc3MlMjBzdGVlbCUyMGJvdHRsZSUyMGNvbGxlY3Rpb24lMjBjb2xvcnN8ZW58MXx8fHwxNzczMjI5ODEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  travelMug: "https://images.unsplash.com/photo-1745210358756-e7f7ff40e506?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN1bGF0ZWQlMjBjb2ZmZWUlMjB0cmF2ZWwlMjBtdWclMjBzdGVlbHxlbnwxfHx8fDE3NzMyMjk4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  sideAngle: "https://images.unsplash.com/photo-1679224102107-4b3c7201de72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFpbmxlc3MlMjBib3R0bGUlMjBzaWRlJTIwYW5nbGUlMjBjbG9zZXVwfGVufDF8fHx8MTc3MzIyOTgxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  bottleCap: "https://images.unsplash.com/photo-1592999641298-434e28c11d14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGJvdHRsZSUyMGJvdHRvbSUyMGNhcCUyMGRldGFpbHxlbnwxfHx8fDE3NzMyMjk4MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  branding: "https://images.unsplash.com/photo-1585250815365-a90a469677c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVlbCUyMHdhdGVyJTIwYm90dGxlJTIwcHJpbnRpbmclMjBicmFuZGluZyUyMGN1c3RvbXxlbnwxfHx8fDE3NzMyMjk4MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  packaging: "https://images.unsplash.com/photo-1553531384-7e0c12f3d620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGJvdHRsZSUyMHBhY2thZ2luZyUyMGJveCUyMHByb2R1Y3R8ZW58MXx8fHwxNzczMjI5ODE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  red: "https://images.unsplash.com/photo-1760754726716-45970152ebd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBzdGFpbmxlc3MlMjBzdGVlbCUyMHdhdGVyJTIwYm90dGxlfGVufDF8fHx8MTc3MzIyOTgyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  green: "https://images.unsplash.com/photo-1686916059707-a15e0efb900c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMG1ldGFsJTIwd2F0ZXIlMjBib3R0bGUlMjBvdXRkb29yfGVufDF8fHx8MTc3MzIyOTgyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  jug: "https://images.unsplash.com/photo-1718210719917-c6e1cd5be085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXJnZSUyMHN0YWlubGVzcyUyMHN0ZWVsJTIwd2F0ZXIlMjBqdWclMjBib3R0bGU8ZW58MXx8fHwxNzczMjI5ODExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

/* ── Shared printing methods ── */
const commonPrintingMethods: PrintingMethod[] = [
  {
    name: "UV Printing",
    description: "Full-color digital UV printing with vibrant results. Ideal for complex logos and gradients. Durable and scratch-resistant.",
    sides: [
      {
        name: "Front",
        options: [
          { label: "Single Color", priceAddon: 0.80 },
          { label: "Full Color", priceAddon: 1.50 },
        ],
      },
      {
        name: "Back",
        options: [
          { label: "Single Color", priceAddon: 0.80 },
          { label: "Full Color", priceAddon: 1.50 },
        ],
      },
      {
        name: "Wrap Around",
        options: [
          { label: "Full Color Wrap", priceAddon: 3.00 },
        ],
      },
    ],
  },
  {
    name: "Laser Engraving",
    description: "Precision laser engraving for a premium, permanent mark. Best for metallic surfaces. Will not fade or peel.",
    sides: [
      {
        name: "Front",
        options: [
          { label: "Logo Only (up to 5cm\u00B2)", priceAddon: 1.20 },
          { label: "Logo + Text", priceAddon: 1.80 },
        ],
      },
      {
        name: "Back",
        options: [
          { label: "Logo Only (up to 5cm\u00B2)", priceAddon: 1.20 },
          { label: "Logo + Text", priceAddon: 1.80 },
        ],
      },
    ],
  },
  {
    name: "Screen Printing",
    description: "Traditional screen printing for bold, solid-color designs. Cost-effective for large quantities.",
    sides: [
      {
        name: "Front",
        options: [
          { label: "1 Color", priceAddon: 0.50 },
          { label: "2 Colors", priceAddon: 0.90 },
          { label: "3 Colors", priceAddon: 1.30 },
        ],
      },
      {
        name: "Back",
        options: [
          { label: "1 Color", priceAddon: 0.50 },
          { label: "2 Colors", priceAddon: 0.90 },
        ],
      },
    ],
  },
  {
    name: "Sublimation",
    description: "Full-color sublimation for edge-to-edge coverage. Best for light-colored or white bottles. Photo-quality output.",
    sides: [
      {
        name: "Full Body",
        options: [
          { label: "Full Wrap Sublimation", priceAddon: 3.50 },
        ],
      },
    ],
  },
];

/* ── Featured product (PDP) ── */
export const featuredProduct: ProductDetail = {
  id: "ssb-001",
  slug: "premium-insulated-stainless-steel-bottle-500ml",
  sku: "TG-SSB-2601",
  name: "Premium Insulated Stainless Steel Bottle - 500ml",
  shortDescription: "Double-wall vacuum insulated stainless steel bottle with powder-coated matte finish. Keeps drinks cold 24hrs / hot 12hrs. Perfect for corporate gifting and promotional campaigns.",
  description: `<p>The TezkarGift Premium Insulated Stainless Steel Bottle is engineered for maximum temperature retention with a sleek, professional aesthetic. Its double-wall vacuum insulation keeps beverages cold for up to 24 hours or hot for up to 12 hours.</p>
<p>The durable powder-coated exterior resists fingerprints and scratches, making it ideal for daily use and custom branding. Available in multiple colors to match any brand identity.</p>
<h4>Key Features</h4>
<ul>
<li>Double-wall vacuum insulation (24hrs cold / 12hrs hot)</li>
<li>18/8 food-grade stainless steel interior</li>
<li>Powder-coated matte exterior finish</li>
<li>Leak-proof threaded lid with silicone seal</li>
<li>Wide mouth for easy filling and cleaning</li>
<li>BPA-free and toxin-free materials</li>
<li>Condensation-free exterior</li>
<li>Available in 8 colors with custom branding options</li>
</ul>
<h4>Ideal For</h4>
<ul>
<li>Corporate gifting & welcome kits</li>
<li>Event giveaways & trade shows</li>
<li>Employee appreciation programs</li>
<li>Gym & outdoor promotions</li>
<li>Retail & resale</li>
</ul>`,
  category: "Drinkwares",
  subcategory: "Stainless Steel Bottles",
  brand: "TezkarGift",
  badge: "Hot",
  basePrice: 15,
  oldPrice: 25,
  tierPricing: [
    { qty: 50, unitPrice: 15.00 },
    { qty: 100, unitPrice: 13.50 },
    { qty: 250, unitPrice: 11.80 },
    { qty: 500, unitPrice: 10.20 },
    { qty: 1000, unitPrice: 8.90 },
    { qty: 2500, unitPrice: 7.50 },
  ],
  moq: 50,
  leadTime: "5-7 days",
  inStock: true,
  stockQty: 1240,
  rating: 4.6,
  reviewCount: 47,
  colors: [
    { name: "Matte Black", hex: "#1a1a1a", image: IMG.matteBlack, secondaryImage: IMG.sideAngle },
    { name: "Copper Rose", hex: "#b87333", image: IMG.copper, secondaryImage: IMG.branding },
    { name: "Arctic White", hex: "#f5f5f5", image: IMG.white, secondaryImage: IMG.bottleCap },
    { name: "Gradient Blue", hex: "#4a90d9", image: IMG.blue, secondaryImage: IMG.collection },
    { name: "Bamboo Cap", hex: "#8B7355", image: IMG.bamboo, secondaryImage: IMG.packaging },
    { name: "Racing Red", hex: "#cc2222", image: IMG.red, secondaryImage: IMG.sideAngle },
    { name: "Forest Green", hex: "#2d6a2e", image: IMG.green, secondaryImage: IMG.branding },
    { name: "Jug XL", hex: "#c0c0c0", image: IMG.jug, secondaryImage: IMG.bottleCap },
  ],
  sizes: ["500ml (Standard)", "750ml (Large)"],
  materials: ["18/8 Stainless Steel", "BPA-Free Lid", "Silicone Seal"],
  printingMethods: commonPrintingMethods,
  specifications: [
    { label: "Material", value: "18/8 Food-Grade Stainless Steel" },
    { label: "Lid Material", value: "BPA-Free PP + Silicone Seal" },
    { label: "Product Size (500ml)", value: "72 × 72 × 255 mm" },
    { label: "Capacity", value: "500ml (17 oz)" },
    { label: "Weight", value: "320g" },
    { label: "Mouth Opening", value: "42 mm (Standard)" },
    { label: "Insulation", value: "Double-wall vacuum (24hrs cold / 12hrs hot)" },
    { label: "Handle", value: "No handle (slim grip design)" },
    { label: "Exterior Finish", value: "Powder-coated matte" },
    { label: "Interior Finish", value: "Electro-polished stainless steel" },
    { label: "BPA Free", value: "Yes" },
    { label: "Dishwasher Safe", value: "Hand wash recommended" },
    { label: "Leak Proof", value: "Yes — threaded lid with silicone seal" },
    { label: "Lid Type", value: "Screw-on with carry loop" },
    { label: "Color Options", value: "8 standard (Black, Copper, White, Blue, Bamboo, Red, Green, Silver)" },
    { label: "Minimum Order Qty", value: "50 pcs" },
    { label: "Lead Time (Stock)", value: "5–7 business days" },
    { label: "Lead Time (Custom)", value: "12–15 business days" },
    { label: "Country of Origin", value: "China (Zhejiang)" },
    { label: "HS Code", value: "7323.93.0080" },
    { label: "Packaging Type", value: "Individual white box" },
    { label: "Gift Box Dimensions", value: "80 × 80 × 270 mm" },
    { label: "Carton Qty", value: "48 pcs per carton" },
    { label: "Carton Dimensions", value: "58 × 45 × 38 cm" },
    { label: "Gross Weight (Carton)", value: "18.5 kg" },
    { label: "Print Area (Front)", value: "60 × 80 mm" },
    { label: "Print Area (Wrap)", value: "200 × 80 mm" },
    { label: "Max Print Colors", value: "Full color (UV/Sublimation)" },
    { label: "Pantone Matching", value: "Available on request" },
    { label: "Sample Available", value: "Yes — 1–2 pcs free" },
    { label: "Sample Lead Time", value: "3–5 business days" },
    { label: "Drop Test", value: "Passed (1.5m on concrete)" },
    { label: "Temperature Range", value: "-10°C to 100°C" },
    { label: "Shelf Life", value: "10+ years" },
    { label: "Eco Friendly", value: "Reusable, recyclable stainless steel" },
    { label: "Warranty", value: "2 year manufacturing defects" },
    { label: "Custom Packaging", value: "Available for 200+ orders" },
    { label: "Payment Terms", value: "50% advance, 50% before ship" },
    { label: "Shipping Method", value: "Air / Sea / Express courier" },
    { label: "Return Policy", value: "Defective items only, 14 days" },
    { label: "Certification", value: "FDA / LFGB / SGS approved" },
    { label: "Condensation", value: "Sweat-free exterior" },
  ],
  printPositions: ["Front Center (6×8 cm)", "Back Center (6×8 cm)", "Full Wrap (20×8 cm)", "Lid Top (3 cm dia.)"],
  printPositionDetails: [
    {
      method: "UV Printing",
      positions: [
        { name: "Front Center", widthMM: 60, heightMM: 80, shape: "rect", description: "Centered on the front of the bottle." },
        { name: "Back Center", widthMM: 60, heightMM: 80, shape: "rect", description: "Centered on the back of the bottle." },
        { name: "Full Wrap", widthMM: 200, heightMM: 80, shape: "rect", description: "Wraps around the entire bottle." },
        { name: "Lid Top", widthMM: 30, heightMM: 30, shape: "circle", description: "On the top of the bottle lid." },
      ],
    },
    {
      method: "Laser Engraving",
      positions: [
        { name: "Front Center", widthMM: 60, heightMM: 80, shape: "rect", description: "Centered on the front of the bottle." },
        { name: "Back Center", widthMM: 60, heightMM: 80, shape: "rect", description: "Centered on the back of the bottle." },
        { name: "Full Wrap", widthMM: 200, heightMM: 80, shape: "rect", description: "Wraps around the entire bottle." },
        { name: "Lid Top", widthMM: 30, heightMM: 30, shape: "circle", description: "On the top of the bottle lid." },
      ],
    },
    {
      method: "Screen Printing",
      positions: [
        { name: "Front Center", widthMM: 60, heightMM: 80, shape: "rect", description: "Centered on the front of the bottle." },
        { name: "Back Center", widthMM: 60, heightMM: 80, shape: "rect", description: "Centered on the back of the bottle." },
        { name: "Full Wrap", widthMM: 200, heightMM: 80, shape: "rect", description: "Wraps around the entire bottle." },
        { name: "Lid Top", widthMM: 30, heightMM: 30, shape: "circle", description: "On the top of the bottle lid." },
      ],
    },
    {
      method: "Sublimation",
      positions: [
        { name: "Front Center", widthMM: 60, heightMM: 80, shape: "rect", description: "Centered on the front of the bottle." },
        { name: "Back Center", widthMM: 60, heightMM: 80, shape: "rect", description: "Centered on the back of the bottle." },
        { name: "Full Wrap", widthMM: 200, heightMM: 80, shape: "rect", description: "Wraps around the entire bottle." },
        { name: "Lid Top", widthMM: 30, heightMM: 30, shape: "circle", description: "On the top of the bottle lid." },
      ],
    },
  ],
  printPositionImage: IMG.branding,
  packagingDetails: "Individual white box (80 × 80 × 270 mm). Bulk packaging: 48 pcs per carton. Custom packaging available for orders 200+.",
  attachments: [
    { name: "Product Spec Sheet", type: "PDF", size: "2.4 MB", restricted: false },
    { name: "Branding Template (AI)", type: "AI", size: "1.8 MB", restricted: true },
    { name: "Print Area Guide", type: "PDF", size: "890 KB", restricted: false },
    { name: "Certification Documents", type: "PDF", size: "3.1 MB", restricted: true },
    { name: "Color Options Guide", type: "PDF", size: "1.2 MB", restricted: false },
    { name: "Packaging Mockup", type: "PDF", size: "4.5 MB", restricted: false },
    { name: "Logo Placement (EPS)", type: "EPS", size: "2.7 MB", restricted: true },
  ],
  reviews: [
    {
      id: "r1", author: "Ahmed K.", rating: 5, date: "2026-02-15", title: "Excellent quality for corporate gifts",
      text: "We ordered 500 pieces for our annual event. The laser engraving came out perfectly and the bottles keep drinks cold all day. Highly recommend for corporate gifting.",
      verified: true,
      images: [
        "https://images.unsplash.com/photo-1516889454133-d3cd87326a6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBnaWZ0JTIwd2F0ZXIlMjBib3R0bGUlMjBkZXNrJTIwb2ZmaWNlfGVufDF8fHx8MTc3MzIzMjYwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1733004441493-4299bed5dd5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFpbmxlc3MlMjBzdGVlbCUyMGJvdHRlJTIwZW5ncmF2ZSUywbG9nb3xlbnwxfHx8fDE3NzMyMzI2MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      ],
    },
    {
      id: "r2", author: "Sarah M.", rating: 4, date: "2026-01-28", title: "Great bottle, fast delivery",
      text: "Very pleased with the quality. The matte black finish looks premium. Only giving 4 stars because the lid could be slightly more ergonomic, but overall excellent value.",
      verified: true,
    },
    {
      id: "r3", author: "James L.", rating: 5, date: "2026-01-10", title: "Perfect for our startup swag",
      text: "UV printing quality was outstanding. Colors are vibrant and the print hasn't faded after daily use for 3 months. Will definitely reorder.",
      verified: true,
      images: [
        "https://images.unsplash.com/photo-1649766508871-9dabf2127f5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9tb3Rpb25hbCUyMGJvdHRlJTIwbGFuZGluZyUyMHVuYm94aW5nfGVufDF8fHx8MTc3MzIzMjYwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      ],
    },
    {
      id: "r4", author: "Fatima R.", rating: 4, date: "2025-12-20", title: "Good quality, slight delay",
      text: "The bottles are excellent quality and the team loved them. Delivery took a day longer than expected but the customer service was very responsive.",
      verified: false,
    },
    {
      id: "r5", author: "Michael T.", rating: 5, date: "2025-12-05", title: "Best promotional bottle we've ordered",
      text: "We've tried many suppliers and TezkarGift consistently delivers the best quality. The insulation is genuinely effective and the branding options are extensive.",
      verified: true,
    },
    {
      id: "r6", author: "Nour A.", rating: 3, date: "2025-11-18", title: "Decent but expected more",
      text: "The bottle itself is good quality but the copper rose color was slightly different from what we saw online. Make sure to order a sample first.",
      verified: true,
    },
  ],
  galleryImages: [
    IMG.matteBlack,
    IMG.copper,
    IMG.white,
    IMG.blue,
    IMG.bamboo,
    IMG.sideAngle,
  ],
};

/* ── Listing products (for subcategory grid) ── */
export interface ListingProduct {
  id: string;
  slug: string;
  sku: string;
  name: string;
  category: string;
  brand: string;
  image: string;
  secondaryImage: string;
  price: number;
  oldPrice?: number;
  badge?: "New" | "Hot" | "Sale" | "Eco" | "Ready Stock";
  rating: number;
  reviewCount: number;
  moq: number;
  leadTime: string;
  customizable: boolean;
  printMethods: string[];
  readyStock: boolean;
  inStock: boolean;
  tierPricing: TierPrice[];
  dateAdded: string;
  popularity: number;
  productType: string;
}

export const steelBottleProducts: ListingProduct[] = [
  {
    id: "ssb-001", slug: "premium-insulated-stainless-steel-bottle-500ml", sku: "TG-SSB-2601",
    name: "Premium Insulated Stainless Steel Bottle - 500ml",
    category: "Drinkwares", brand: "TezkarGift",
    image: IMG.matteBlack, secondaryImage: IMG.sideAngle,
    price: 15, oldPrice: 25, badge: "Hot",
    rating: 4.6, reviewCount: 47, moq: 50, leadTime: "5-7 days",
    customizable: true, printMethods: ["UV Print", "Laser Engraving", "Screen Print"],
    readyStock: true, inStock: true,
    tierPricing: [{ qty: 50, unitPrice: 15 }, { qty: 100, unitPrice: 13.5 }, { qty: 500, unitPrice: 10.2 }],
    dateAdded: "2026-02-01", popularity: 95, productType: "Insulated",
  },
  {
    id: "ssb-002", slug: "copper-rose-vacuum-bottle-750ml", sku: "TG-SSB-2602",
    name: "Copper Rose Vacuum Insulated Bottle - 750ml",
    category: "Drinkwares", brand: "TezkarGift",
    image: IMG.copper, secondaryImage: IMG.branding,
    price: 22, badge: "New",
    rating: 4.8, reviewCount: 23, moq: 30, leadTime: "5-7 days",
    customizable: true, printMethods: ["Laser Engraving", "UV Print"],
    readyStock: true, inStock: true,
    tierPricing: [{ qty: 30, unitPrice: 22 }, { qty: 100, unitPrice: 19 }, { qty: 500, unitPrice: 16 }],
    dateAdded: "2026-03-01", popularity: 88, productType: "Insulated",
  },
  {
    id: "ssb-003", slug: "arctic-white-thermos-500ml", sku: "TG-SSB-2603",
    name: "Arctic White Thermos Bottle - 500ml",
    category: "Drinkwares", brand: "Thermos",
    image: IMG.white, secondaryImage: IMG.bottleCap,
    price: 18, badge: "New",
    rating: 4.5, reviewCount: 31, moq: 50, leadTime: "3-5 days",
    customizable: true, printMethods: ["Sublimation", "UV Print"],
    readyStock: true, inStock: true,
    tierPricing: [{ qty: 50, unitPrice: 18 }, { qty: 200, unitPrice: 15 }, { qty: 500, unitPrice: 12.5 }],
    dateAdded: "2026-02-15", popularity: 82, productType: "Thermos",
  },
  {
    id: "ssb-004", slug: "sport-gradient-blue-bottle-600ml", sku: "TG-SSB-2604",
    name: "Sport Gradient Blue Bottle - 600ml",
    category: "Drinkwares", brand: "TezkarGift",
    image: IMG.blue, secondaryImage: IMG.collection,
    price: 12, oldPrice: 18, badge: "Sale",
    rating: 4.3, reviewCount: 56, moq: 100, leadTime: "5-7 days",
    customizable: true, printMethods: ["Screen Print", "UV Print"],
    readyStock: true, inStock: true,
    tierPricing: [{ qty: 100, unitPrice: 12 }, { qty: 250, unitPrice: 10 }, { qty: 1000, unitPrice: 7.5 }],
    dateAdded: "2025-11-01", popularity: 91, productType: "Sport",
  },
  {
    id: "ssb-005", slug: "eco-bamboo-cap-bottle-500ml", sku: "TG-SSB-2605",
    name: "Eco Bamboo Cap Stainless Bottle - 500ml",
    category: "Drinkwares", brand: "TezkarGift",
    image: IMG.bamboo, secondaryImage: IMG.packaging,
    price: 16, badge: "Eco",
    rating: 4.7, reviewCount: 38, moq: 50, leadTime: "7-10 days",
    customizable: true, printMethods: ["Laser Engraving", "Screen Print"],
    readyStock: false, inStock: true,
    tierPricing: [{ qty: 50, unitPrice: 16 }, { qty: 200, unitPrice: 13 }, { qty: 500, unitPrice: 10.8 }],
    dateAdded: "2026-01-10", popularity: 86, productType: "Eco-Friendly",
  },
  {
    id: "ssb-006", slug: "racing-red-insulated-bottle-500ml", sku: "TG-SSB-2606",
    name: "Racing Red Insulated Bottle - 500ml",
    category: "Drinkwares", brand: "TezkarGift",
    image: IMG.red, secondaryImage: IMG.sideAngle,
    price: 14, badge: "Ready Stock",
    rating: 4.4, reviewCount: 19, moq: 50, leadTime: "3-5 days",
    customizable: true, printMethods: ["UV Print", "Screen Print", "Laser Engraving"],
    readyStock: true, inStock: true,
    tierPricing: [{ qty: 50, unitPrice: 14 }, { qty: 200, unitPrice: 11.5 }, { qty: 500, unitPrice: 9.8 }],
    dateAdded: "2025-12-01", popularity: 74, productType: "Insulated",
  },
  {
    id: "ssb-007", slug: "forest-green-outdoor-bottle-750ml", sku: "TG-SSB-2607",
    name: "Forest Green Outdoor Bottle - 750ml",
    category: "Drinkwares", brand: "TezkarGift",
    image: IMG.green, secondaryImage: IMG.branding,
    price: 19, badge: "Eco",
    rating: 4.5, reviewCount: 14, moq: 30, leadTime: "5-7 days",
    customizable: true, printMethods: ["Laser Engraving", "UV Print"],
    readyStock: false, inStock: true,
    tierPricing: [{ qty: 30, unitPrice: 19 }, { qty: 100, unitPrice: 16.5 }, { qty: 500, unitPrice: 13 }],
    dateAdded: "2026-02-20", popularity: 68, productType: "Outdoor",
  },
  {
    id: "ssb-008", slug: "xl-stainless-steel-jug-1000ml", sku: "TG-SSB-2608",
    name: "XL Stainless Steel Jug Bottle - 1000ml",
    category: "Drinkwares", brand: "TezkarGift",
    image: IMG.jug, secondaryImage: IMG.bottleCap,
    price: 24, badge: "Hot",
    rating: 4.6, reviewCount: 29, moq: 25, leadTime: "7-10 days",
    customizable: true, printMethods: ["UV Print", "Laser Engraving", "Screen Print", "Sublimation"],
    readyStock: true, inStock: true,
    tierPricing: [{ qty: 25, unitPrice: 24 }, { qty: 100, unitPrice: 20 }, { qty: 500, unitPrice: 16.5 }],
    dateAdded: "2026-01-25", popularity: 79, productType: "Insulated",
  },
  {
    id: "ssb-009", slug: "travel-coffee-mug-steel-350ml", sku: "TG-SSB-2609",
    name: "Travel Coffee Mug Steel - 350ml",
    category: "Drinkwares", brand: "Thermos",
    image: IMG.travelMug, secondaryImage: IMG.collection,
    price: 20, badge: "New",
    rating: 4.7, reviewCount: 42, moq: 50, leadTime: "5-7 days",
    customizable: true, printMethods: ["UV Print", "Laser Engraving"],
    readyStock: true, inStock: true,
    tierPricing: [{ qty: 50, unitPrice: 20 }, { qty: 200, unitPrice: 17 }, { qty: 500, unitPrice: 14 }],
    dateAdded: "2026-03-05", popularity: 93, productType: "Travel Mug",
  },
  {
    id: "ssb-010", slug: "custom-branding-bottle-500ml", sku: "TG-SSB-2610",
    name: "Custom Branding Bottle - 500ml",
    category: "Drinkwares", brand: "TezkarGift",
    image: IMG.branding, secondaryImage: IMG.matteBlack,
    price: 13, oldPrice: 20, badge: "Sale",
    rating: 4.2, reviewCount: 63, moq: 100, leadTime: "5-7 days",
    customizable: true, printMethods: ["Screen Print", "UV Print", "Laser Engraving"],
    readyStock: true, inStock: true,
    tierPricing: [{ qty: 100, unitPrice: 13 }, { qty: 250, unitPrice: 11 }, { qty: 1000, unitPrice: 8 }],
    dateAdded: "2025-10-15", popularity: 97, productType: "Insulated",
  },
  {
    id: "ssb-011", slug: "color-collection-bottle-set", sku: "TG-SSB-2611",
    name: "Color Collection Bottle Set (4 pcs)",
    category: "Drinkwares", brand: "TezkarGift",
    image: IMG.collection, secondaryImage: IMG.packaging,
    price: 48, badge: "Hot",
    rating: 4.9, reviewCount: 11, moq: 10, leadTime: "10-14 days",
    customizable: true, printMethods: ["UV Print", "Laser Engraving"],
    readyStock: false, inStock: true,
    tierPricing: [{ qty: 10, unitPrice: 48 }, { qty: 50, unitPrice: 42 }, { qty: 200, unitPrice: 36 }],
    dateAdded: "2026-03-08", popularity: 72, productType: "Gift Set",
  },
  {
    id: "ssb-012", slug: "packaging-ready-bottle-500ml", sku: "TG-SSB-2612",
    name: "Gift-Ready Packaged Bottle - 500ml",
    category: "Drinkwares", brand: "TezkarGift",
    image: IMG.packaging, secondaryImage: IMG.white,
    price: 28, badge: "New",
    rating: 4.8, reviewCount: 8, moq: 25, leadTime: "7-10 days",
    customizable: true, printMethods: ["UV Print", "Laser Engraving", "Sublimation"],
    readyStock: false, inStock: true,
    tierPricing: [{ qty: 25, unitPrice: 28 }, { qty: 100, unitPrice: 24 }, { qty: 500, unitPrice: 19 }],
    dateAdded: "2026-03-10", popularity: 65, productType: "Gift Set",
  },
];

/* ── Helper: get product by slug ── */
export function getProductBySlug(slug: string): ProductDetail | undefined {
  if (slug === featuredProduct.slug) return featuredProduct;
  return undefined;
}

/* ── Recommended products (simple cross-sell) ── */
export function getRecommendedProducts(currentId: string): ListingProduct[] {
  return steelBottleProducts.filter((p) => p.id !== currentId).slice(0, 4);
}