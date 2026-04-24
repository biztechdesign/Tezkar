import { Fragment, useMemo, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CreateIcon from '@mui/icons-material/Create';
import DescriptionIcon from '@mui/icons-material/Description';
import BrushIcon from '@mui/icons-material/Brush';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import VerifiedIcon from '@mui/icons-material/Verified';

type PrintingMethodId = 'blank' | 'logo' | 'fullColor' | 'sample';
type PrintPosition = 'frontCenter' | 'backCenter' | 'fullWrap' | 'lidTop';

interface PrintingMethodOption {
  id: PrintingMethodId;
  label: string;
  description: string;
  requiresArtwork: boolean;
  priceAddon: number;
  fixedQuantity?: number;
}

// Per-product list; pared down / extended per SKU in real data.
const printingMethodOptions: PrintingMethodOption[] = [
  { id: 'blank', label: 'Blank (no logo)', description: 'Plain product, no printing or branding.', requiresArtwork: false, priceAddon: 0 },
  { id: 'logo', label: 'Order with logo', description: '1-color logo print in your brand color.', requiresArtwork: true, priceAddon: 1.20 },
  { id: 'fullColor', label: 'Full color', description: 'Full-color print — best for photo or gradient artwork.', requiresArtwork: true, priceAddon: 2.50 },
  { id: 'sample', label: 'Sample', description: 'Single sample unit to review before placing a bulk order.', requiresArtwork: false, priceAddon: 3.00, fixedQuantity: 1 },
];

const IMG = {
  matteBlack: 'https://images.unsplash.com/photo-1662524281334-215f83f6f98a?w=1000&h=1000&fit=crop',
  copper: 'https://images.unsplash.com/photo-1609097828013-c98743a157cd?w=1000&h=1000&fit=crop',
  white: 'https://images.unsplash.com/photo-1664714628878-9d2aa898b9e3?w=1000&h=1000&fit=crop',
  red: 'https://images.unsplash.com/photo-1760754726716-45970152ebd5?w=1000&h=1000&fit=crop',
  green: 'https://images.unsplash.com/photo-1686916059707-a15e0efb900c?w=1000&h=1000&fit=crop',
  blue: 'https://images.unsplash.com/photo-1769445886383-a6beba6b66fb?w=1000&h=1000&fit=crop',
  branding: 'https://images.unsplash.com/photo-1585250815365-a90a469677c5?w=1000&h=1000&fit=crop',
  packaging: 'https://images.unsplash.com/photo-1553531384-7e0c12f3d620?w=1000&h=1000&fit=crop',
  sideAngle: 'https://images.unsplash.com/photo-1679224102107-4b3c7201de72?w=1000&h=1000&fit=crop',
  collection: 'https://images.unsplash.com/photo-1632850210350-4c9d8a6cc236?w=1000&h=1000&fit=crop',
};

const colors = [
  { name: 'Matte Black', hex: '#1a1a1a', image: IMG.matteBlack },
  { name: 'Copper Rose', hex: '#b87333', image: IMG.copper },
  { name: 'Arctic White', hex: '#f5f5f5', border: true, image: IMG.white },
  { name: 'Racing Red', hex: '#cc2222', image: IMG.red },
  { name: 'Forest Green', hex: '#2d6a2e', image: IMG.green },
  { name: 'Gradient Blue', hex: '#4a90d9', image: IMG.blue },
];

const galleryImages = [
  { src: IMG.matteBlack, alt: 'Matte Black — front view' },
  { src: IMG.branding, alt: 'Custom branding detail' },
  { src: IMG.sideAngle, alt: 'Side angle closeup' },
  { src: IMG.packaging, alt: 'Gift box packaging' },
  { src: IMG.collection, alt: 'Full color collection' },
  { src: IMG.copper, alt: 'Copper Rose finish' },
];

// Driven by product data — most SKUs have no sizes.
const hasSizes = false;
const sizeOptions: string[] = [];

const printPositions = [
  { id: 'frontCenter' as PrintPosition, name: 'Front Center', dimensions: '60 × 80 mm' },
  { id: 'backCenter' as PrintPosition, name: 'Back Center', dimensions: '60 × 80 mm' },
  { id: 'fullWrap' as PrintPosition, name: 'Full Wrap', dimensions: '200 × 80 mm' },
  { id: 'lidTop' as PrintPosition, name: 'Lid Top', dimensions: '30 mm dia.' },
];

const tierPricing = [
  { minQty: 50, price: 15.00, savePct: 0 },
  { minQty: 100, price: 13.50, savePct: 10 },
  { minQty: 250, price: 11.80, savePct: 21 },
  { minQty: 500, price: 10.20, savePct: 32 },
  { minQty: 1000, price: 8.90, savePct: 41 },
];

function resolveTier(qty: number) {
  let tier = tierPricing[0];
  for (const t of tierPricing) if (qty >= t.minQty) tier = t;
  return tier;
}

const upsells = [
  { id: 'gift-box', name: 'Premium Gift Box', description: 'Custom-fit kraft box with magnetic flap', pricePerUnit: 3.50, Icon: Inventory2Icon },
  { id: 'gift-bag', name: 'Branded Gift Bag', description: 'Elegant drawstring cotton bag with your logo', pricePerUnit: 2.00, Icon: ShoppingBagIcon },
  { id: 'pen-set', name: 'Make it a Set — Add a Matching Pen', description: 'Bundle with a branded metal ballpoint pen', pricePerUnit: 4.50, Icon: CreateIcon },
];

const productDescriptionHtml = `
<p>The TezkarGift Custom Branding Bottle is engineered for maximum temperature retention with a sleek, professional aesthetic. Its double-wall vacuum insulation keeps beverages cold for up to 24 hours or hot for up to 12 hours.</p>
<p>The durable powder-coated exterior resists fingerprints and scratches, making it ideal for daily use and custom branding. Available in multiple colors to match any brand identity.</p>
<h4>Key Features</h4>
<ul>
  <li>Double-wall vacuum insulation (24 hrs cold / 12 hrs hot)</li>
  <li>18/8 food-grade stainless steel interior</li>
  <li>Powder-coated matte exterior finish</li>
  <li>Leak-proof threaded lid with silicone seal</li>
  <li>Wide mouth for easy filling and cleaning</li>
  <li>BPA-free and toxin-free materials</li>
  <li>Condensation-free exterior</li>
</ul>
<h4>Ideal For</h4>
<ul>
  <li>Corporate gifting & welcome kits</li>
  <li>Event giveaways & trade shows</li>
  <li>Employee appreciation programs</li>
  <li>Retail & resale</li>
</ul>
`;

const digitalFiles = [
  { id: 1, name: 'Product Spec Sheet', type: 'PDF', Icon: PictureAsPdfIcon },
  { id: 2, name: 'Branding Template', type: 'AI', Icon: BrushIcon },
  { id: 3, name: 'Print Area Guide', type: 'PDF', Icon: DescriptionIcon },
];

const specifications: { label: string; value: string }[] = [
  { label: 'SKU', value: 'TG-SSB-2610' },
  { label: 'Material', value: '18/8 Food-Grade Stainless Steel' },
  { label: 'Lid Material', value: 'BPA-Free PP + Silicone Seal' },
  { label: 'Product Size', value: '72 × 72 × 255 mm' },
  { label: 'Capacity', value: '500ml (17 oz)' },
  { label: 'Weight', value: '320g' },
  { label: 'Insulation', value: 'Double-wall vacuum (24hrs cold / 12hrs hot)' },
  { label: 'Exterior Finish', value: 'Powder-coated matte' },
  { label: 'Interior Finish', value: 'Electro-polished stainless steel' },
  { label: 'BPA Free', value: 'Yes' },
  { label: 'Dishwasher Safe', value: 'Hand wash recommended' },
  { label: 'Leak Proof', value: 'Yes — threaded lid with silicone seal' },
  { label: 'Minimum Order Qty', value: '50 pcs' },
  { label: 'Lead Time (Stock)', value: '5–7 business days' },
  { label: 'Lead Time (Custom)', value: '12–15 business days' },
  { label: 'Country of Origin', value: 'China (Zhejiang)' },
  { label: 'Packaging Type', value: 'Individual white box (80 × 80 × 270 mm)' },
  { label: 'Carton Qty', value: '48 pcs per carton' },
  { label: 'Certification', value: 'FDA / LFGB / SGS approved' },
  { label: 'Warranty', value: '2 year manufacturing defects' },
];

const printPositionDetails: {
  method: string;
  description: string;
  positions: { name: string; dimensions: string; shape: 'rect' | 'circle' }[];
}[] = [
  {
    method: 'UV Printing',
    description: 'Full-color digital UV print — ideal for complex logos and gradients.',
    positions: [
      { name: 'Front Center', dimensions: '60 × 80 mm', shape: 'rect' },
      { name: 'Back Center', dimensions: '60 × 80 mm', shape: 'rect' },
      { name: 'Full Wrap', dimensions: '200 × 80 mm', shape: 'rect' },
      { name: 'Lid Top', dimensions: '30 mm dia.', shape: 'circle' },
    ],
  },
  {
    method: 'Laser Engraving',
    description: 'Permanent precision mark — best for metallic surfaces. Will not fade or peel.',
    positions: [
      { name: 'Front Center', dimensions: '60 × 80 mm', shape: 'rect' },
      { name: 'Back Center', dimensions: '60 × 80 mm', shape: 'rect' },
      { name: 'Lid Top', dimensions: '30 mm dia.', shape: 'circle' },
    ],
  },
  {
    method: 'Screen Printing',
    description: 'Bold, solid-color designs — cost-effective for large quantities.',
    positions: [
      { name: 'Front Center', dimensions: '60 × 80 mm', shape: 'rect' },
      { name: 'Back Center', dimensions: '60 × 80 mm', shape: 'rect' },
      { name: 'Full Wrap', dimensions: '200 × 80 mm', shape: 'rect' },
    ],
  },
  {
    method: 'Sublimation',
    description: 'Edge-to-edge photo-quality coverage — best for light or white bottles.',
    positions: [
      { name: 'Full Wrap', dimensions: '200 × 80 mm', shape: 'rect' },
    ],
  },
];

const reviews: {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  verified: boolean;
}[] = [
  { id: 'r1', author: 'Ahmed K.', rating: 5, date: '2026-02-15', title: 'Excellent quality for corporate gifts', text: 'We ordered 500 pieces for our annual event. The laser engraving came out perfectly and the bottles keep drinks cold all day. Highly recommend for corporate gifting.', verified: true },
  { id: 'r2', author: 'Sarah M.', rating: 4, date: '2026-01-28', title: 'Great bottle, fast delivery', text: 'Very pleased with the quality. The matte black finish looks premium. Only giving 4 stars because the lid could be slightly more ergonomic, but overall excellent value.', verified: true },
  { id: 'r3', author: 'James L.', rating: 5, date: '2026-01-10', title: 'Perfect for our startup swag', text: 'UV printing quality was outstanding. Colors are vibrant and the print hasn’t faded after daily use for 3 months. Will definitely reorder.', verified: true },
  { id: 'r4', author: 'Fatima R.', rating: 4, date: '2025-12-20', title: 'Good quality, slight delay', text: 'The bottles are excellent quality and the team loved them. Delivery took a day longer than expected but the customer service was very responsive.', verified: false },
  { id: 'r5', author: 'Michael T.', rating: 5, date: '2025-12-05', title: 'Best promotional bottle we’ve ordered', text: 'We’ve tried many suppliers and TezkarGift consistently delivers the best quality. The insulation is genuinely effective and the branding options are extensive.', verified: true },
  { id: 'r6', author: 'Nour A.', rating: 3, date: '2025-11-18', title: 'Decent but expected more', text: 'The bottle itself is good quality but the copper rose color was slightly different from what we saw online. Make sure to order a sample first.', verified: true },
];

const averageRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

type TabId = 'description' | 'specifications' | 'printingPositions' | 'reviews';

const tabs: { id: TabId; label: string }[] = [
  { id: 'description', label: 'Description' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'printingPositions', label: 'Printing Positions' },
  { id: 'reviews', label: `Reviews (${reviews.length})` },
];

function StarRating({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map(i =>
        i <= Math.round(value)
          ? <StarIcon key={i} sx={{ fontSize: size, color: '#FFB020' }} />
          : <StarBorderIcon key={i} sx={{ fontSize: size, color: '#FFB020' }} />
      )}
    </span>
  );
}

const sectionLabel: React.CSSProperties = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: '#2C2C2C',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

export function ProductDetailPage() {
  const [selectedColor, setSelectedColor] = useState(colors[0].name);
  const [activeImage, setActiveImage] = useState(colors[0].image);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0] ?? '');
  const [quantity, setQuantity] = useState(50);
  const [printingMethod, setPrintingMethod] = useState<PrintingMethodId>('logo');
  const [printPosition, setPrintPosition] = useState<PrintPosition>('frontCenter');
  const [uploadedFile, setUploadedFile] = useState<File | undefined>();
  const [selectedUpsells, setSelectedUpsells] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<TabId>('description');

  const activeMethod = printingMethodOptions.find(m => m.id === printingMethod)!;
  const effectiveQty = activeMethod.fixedQuantity ?? quantity;
  const activeTier = useMemo(() => resolveTier(effectiveQty), [effectiveQty]);
  const unitPrice = activeTier.price + activeMethod.priceAddon;
  const upsellUnitTotal = upsells
    .filter(u => selectedUpsells.has(u.id))
    .reduce((sum, u) => sum + u.pricePerUnit, 0);
  const total = (unitPrice + upsellUnitTotal) * effectiveQty;

  const toggleUpsell = (id: string) => {
    const next = new Set(selectedUpsells);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedUpsells(next);
  };

  const adjustQty = (delta: number) => setQuantity(q => Math.max(1, q + delta));

  return (
    <div className="pdp-root">
      <style>{`
        .pdp-root { background-color: #FAFAF8; min-height: 100vh; padding: 24px 0 60px; }
        .pdp-container { max-width: 1400px; margin: 0 auto; padding: 0 16px; }
        .pdp-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
        .pdp-tier-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; }
        .pdp-cta-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .pdp-print-pos { display: grid; grid-template-columns: repeat(1, 1fr); gap: 8px; }
        .pdp-tab-content { padding: 24px; }
        .pdp-specs-grid { display: grid; grid-template-columns: 160px 1fr; row-gap: 12px; column-gap: 16px; }
        .pdp-methods-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
        .pdp-title { font-size: 24px !important; }
        .pdp-section-pad { padding: 16px !important; }
        .pdp-h2 { font-size: 20px !important; }
        @media (min-width: 768px) {
          .pdp-root { padding: 40px 0 80px; }
          .pdp-container { padding: 0 24px; }
          .pdp-print-pos { grid-template-columns: repeat(2, 1fr); gap: 8px; }
          .pdp-tab-content { padding: 40px; }
          .pdp-specs-grid { grid-template-columns: 220px 1fr; row-gap: 14px; column-gap: 24px; }
          .pdp-title { font-size: 32px !important; }
          .pdp-section-pad { padding: 24px !important; }
          .pdp-h2 { font-size: 24px !important; }
          .pdp-tab-btn { font-size: 15px !important; padding: 20px 24px !important; min-width: 160px !important; }
        }
        @media (min-width: 1024px) {
          .pdp-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 48px; }
          .pdp-left-col { position: sticky; top: 24px; align-self: start; }
        }
      `}</style>
      <div className="pdp-container">
        {/* Breadcrumb */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <a href="/" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666', textDecoration: 'none' }}>Home</a>
          <ChevronRightIcon sx={{ fontSize: 16, color: '#666' }} />
          <a href="/category/drinkwares" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666', textDecoration: 'none' }}>Drinkwares</a>
          <ChevronRightIcon sx={{ fontSize: 16, color: '#666' }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#2C2C2C', fontWeight: 600 }}>
            Custom Branding Bottle — 500ml
          </span>
        </div>

        <div className="pdp-grid">
          {/* Left — Images */}
          <div className="pdp-left-col">
            <div style={{ backgroundColor: '#FFFFFF', overflow: 'hidden', marginBottom: '16px', border: '1px solid #E8DDD3' }}>
              <img
                key={activeImage}
                src={activeImage}
                alt="Custom Branding Bottle"
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  objectFit: 'cover',
                  display: 'block',
                  animation: 'pdpFade 250ms ease',
                }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
              {galleryImages.map((g, i) => {
                const isActive = g.src === activeImage;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveImage(g.src)}
                    onMouseEnter={() => setActiveImage(g.src)}
                    style={{
                      padding: 0,
                      backgroundColor: '#FFFFFF',
                      border: isActive ? '2px solid #044c5c' : '1px solid #E8DDD3',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      aspectRatio: '1 / 1',
                      outline: isActive ? '2px solid #044c5c' : 'none',
                      outlineOffset: '-2px',
                      transition: 'border-color 0.15s',
                    }}
                    aria-label={g.alt}
                  >
                    <img
                      src={g.src}
                      alt={g.alt}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: isActive ? 1 : 0.85 }}
                    />
                  </button>
                );
              })}
            </div>
            <style>{`@keyframes pdpFade { from { opacity: 0.4 } to { opacity: 1 } }`}</style>
          </div>

          {/* Right — Configuration */}
          <div>
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
              <h1 className="pdp-title" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: '#2C2C2C', marginBottom: '8px', lineHeight: 1.2 }}>
                Custom Branding Bottle — 500ml
              </h1>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#666', marginBottom: '16px', lineHeight: 1.5 }}>
                Double-wall vacuum insulated stainless steel bottle with powder-coated matte finish. Keeps drinks cold 24hrs / hot 12hrs.
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 600, color: '#044c5c' }}>
                  ${unitPrice.toFixed(2)}
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666' }}>
                  per unit @ {effectiveQty.toLocaleString()} qty
                </span>
              </div>
            </div>

            {/* Color */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ marginBottom: '12px' }}>
                <span style={sectionLabel}>Color:</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666', marginLeft: '8px' }}>{selectedColor}</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color.name);
                      setActiveImage(color.image);
                    }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: color.hex,
                      border: color.border ? '2px solid #E8DDD3' : selectedColor === color.name ? '3px solid #044c5c' : '2px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      outline: selectedColor === color.name ? '2px solid #044c5c' : 'none',
                      outlineOffset: '2px',
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size — only for products that have sizes */}
            {hasSizes && sizeOptions.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <span style={sectionLabel}>Size:</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666', marginLeft: '8px' }}>{selectedSize}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {sizeOptions.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: selectedSize === size ? '#044c5c' : '#FFFFFF',
                        color: selectedSize === size ? '#FFFFFF' : '#2C2C2C',
                        border: '1px solid #E8DDD3',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        cursor: 'pointer',
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ marginBottom: '12px' }}>
                <span style={sectionLabel}>Quantity:</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#666', marginLeft: '8px' }}>
                  MOQ 50 · volume discounts unlock at 100/250/500/1000
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E8DDD3', backgroundColor: '#FFFFFF' }}>
                  <button
                    onClick={() => adjustQty(-10)}
                    disabled={!!activeMethod.fixedQuantity}
                    style={{ padding: '10px 14px', background: 'transparent', border: 'none', cursor: activeMethod.fixedQuantity ? 'not-allowed' : 'pointer' }}
                  >
                    <RemoveIcon sx={{ fontSize: 16 }} />
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={effectiveQty}
                    disabled={!!activeMethod.fixedQuantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{
                      width: '100px',
                      padding: '10px',
                      border: 'none',
                      borderLeft: '1px solid #E8DDD3',
                      borderRight: '1px solid #E8DDD3',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '16px',
                      textAlign: 'center',
                      backgroundColor: activeMethod.fixedQuantity ? '#F7F8FA' : '#FFFFFF',
                    }}
                  />
                  <button
                    onClick={() => adjustQty(10)}
                    disabled={!!activeMethod.fixedQuantity}
                    style={{ padding: '10px 14px', background: 'transparent', border: 'none', cursor: activeMethod.fixedQuantity ? 'not-allowed' : 'pointer' }}
                  >
                    <AddIcon sx={{ fontSize: 16 }} />
                  </button>
                </div>
                {activeMethod.fixedQuantity && (
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#d41c5c' }}>
                    Sample orders are fixed at 1 unit
                  </span>
                )}
              </div>
            </div>

            {/* Printing Method */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ marginBottom: '12px' }}>
                <span style={sectionLabel}>Printing Method:</span>
              </div>
              <select
                value={printingMethod}
                onChange={(e) => setPrintingMethod(e.target.value as PrintingMethodId)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #E8DDD3',
                  backgroundColor: '#FFFFFF',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  color: '#2C2C2C',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23044c5c\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'/%3e%3c/svg%3e")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                  paddingRight: '40px',
                }}
              >
                {printingMethodOptions.map(opt => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}{opt.priceAddon > 0 ? ` (+$${opt.priceAddon.toFixed(2)}/unit)` : ''}
                  </option>
                ))}
              </select>
              <div style={{ marginTop: '8px', fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#666' }}>
                {activeMethod.description}
              </div>
            </div>

            {/* Print position + upload — only when artwork is required */}
            {activeMethod.requiresArtwork && (
              <div style={{ marginBottom: '28px', backgroundColor: '#FFFFFF', padding: '20px', border: '1px solid #E8DDD3' }}>
                <div style={{ marginBottom: '16px' }}>
                  <span style={sectionLabel}>Print Position:</span>
                </div>
                <div className="pdp-print-pos" style={{ marginBottom: '20px' }}>
                  {printPositions.map(pos => (
                    <button
                      key={pos.id}
                      onClick={() => setPrintPosition(pos.id)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        padding: '12px 16px',
                        border: printPosition === pos.id ? '2px solid #044c5c' : '1px solid #E8DDD3',
                        backgroundColor: printPosition === pos.id ? '#F0F9FF' : '#FFFFFF',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        color: '#2C2C2C',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <span style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {printPosition === pos.id && <CheckIcon sx={{ fontSize: 14, color: '#044c5c' }} />}
                        {pos.name}
                      </span>
                      <span style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>{pos.dimensions}</span>
                    </button>
                  ))}
                </div>

                <div style={{ marginBottom: '8px' }}>
                  <span style={{ ...sectionLabel, fontSize: '12px' }}>Upload Artwork:</span>
                </div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    padding: '20px',
                    border: '2px dashed #E8DDD3',
                    backgroundColor: '#FAFAF8',
                    cursor: 'pointer',
                  }}
                >
                  <CloudUploadIcon sx={{ fontSize: 20, color: '#044c5c' }} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#2C2C2C' }}>
                    {uploadedFile ? uploadedFile.name : 'Click to upload or drag & drop'}
                  </span>
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.ai,.eps,.pdf,.svg"
                    onChange={(e) => setUploadedFile(e.target.files?.[0])}
                    style={{ display: 'none' }}
                  />
                </label>
                <div style={{ marginTop: '8px', fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#666' }}>
                  Accepted: PNG, JPG, AI, EPS, PDF, SVG (max 10MB)
                </div>
              </div>
            )}

            {/* Quantity-Based Pricing */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ border: '1px solid #E8DDD3', borderRadius: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', backgroundColor: '#044c5c', color: '#FFFFFF' }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Quantity-Based Pricing
                  </span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>
                    Product + Print cost per unit
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1fr 1fr', backgroundColor: '#FAFAF8', borderBottom: '1px solid #E8DDD3' }}>
                  {[
                    { h: 'QUANTITY', align: 'left' },
                    { h: 'PRODUCT', align: 'right' },
                    { h: 'PRINT', align: 'right' },
                    { h: 'UNIT PRICE', align: 'right' },
                    { h: 'YOU SAVE', align: 'right' },
                  ].map(({ h, align }) => (
                    <div
                      key={h}
                      style={{
                        padding: '10px 14px',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#8A9199',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        textAlign: align as 'left' | 'right',
                      }}
                    >
                      {h}
                    </div>
                  ))}
                </div>
                {tierPricing.map((tier, i) => {
                  const isActive = tier.minQty === activeTier.minQty;
                  const nextTier = tierPricing[i + 1];
                  const range = nextTier ? `${tier.minQty}+ pcs` : `${tier.minQty}+ pcs`;
                  const printCost = activeMethod.priceAddon;
                  const unit = tier.price + printCost;
                  return (
                    <div
                      key={tier.minQty}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1.3fr 1fr 1fr 1fr 1fr',
                        alignItems: 'center',
                        backgroundColor: isActive ? '#F2F8F9' : '#FFFFFF',
                        borderBottom: i < tierPricing.length - 1 ? '1px solid #E8DDD3' : 'none',
                        borderLeft: isActive ? '3px solid #044c5c' : '3px solid transparent',
                      }}
                    >
                      <div style={{ padding: '12px 14px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#2C2C2C', fontWeight: isActive ? 600 : 500 }}>
                        {range}
                      </div>
                      <div style={{ padding: '12px 14px', textAlign: 'right', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#5B616A' }}>
                        ${tier.price.toFixed(2)}
                      </div>
                      <div style={{ padding: '12px 14px', textAlign: 'right', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: printCost > 0 ? '#5B616A' : '#B8BEC6' }}>
                        {printCost > 0 ? `$${printCost.toFixed(2)}` : '—'}
                      </div>
                      <div style={{ padding: '12px 14px', textAlign: 'right', fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#2C2C2C', fontWeight: 700 }}>
                        ${unit.toFixed(2)}
                      </div>
                      <div style={{ padding: '12px 14px', textAlign: 'right' }}>
                        {tier.savePct > 0 ? (
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#16A34A', fontWeight: 600 }}>Save {tier.savePct}%</span>
                        ) : (
                          <span style={{ color: '#B8BEC6' }}>—</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upsell — Make it a Gift Set */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ marginBottom: '12px' }}>
                <span style={sectionLabel}>Complete the Gift</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#666', marginLeft: '8px' }}>
                  Add packaging or bundle into a gift set
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {upsells.map(u => {
                  const selected = selectedUpsells.has(u.id);
                  return (
                    <label
                      key={u.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        border: selected ? '2px solid #044c5c' : '1px solid #E8DDD3',
                        backgroundColor: selected ? '#F0F9FF' : '#FFFFFF',
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleUpsell(u.id)}
                        style={{ width: '18px', height: '18px', accentColor: '#044c5c', cursor: 'pointer' }}
                      />
                      <u.Icon sx={{ fontSize: 28, color: '#044c5c' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: '#2C2C2C' }}>
                          {u.name}
                        </div>
                        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#666' }}>
                          {u.description}
                        </div>
                      </div>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 600, color: '#044c5c', whiteSpace: 'nowrap' }}>
                        +${u.pricePerUnit.toFixed(2)}/unit
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Order total */}
            <div style={{ marginBottom: '20px', padding: '16px 20px', backgroundColor: '#044c5c', color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Estimated Total
              </span>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px', fontWeight: 600 }}>
                ${total.toFixed(2)}
              </span>
            </div>

            {/* CTAs */}
            <div className="pdp-cta-grid" style={{ marginBottom: '32px' }}>
              <button style={{ padding: '16px 12px', backgroundColor: '#044c5c', color: '#FFFFFF', border: 'none', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <ShoppingCartIcon sx={{ fontSize: 18 }} /> Add to Cart
              </button>
              <button style={{ padding: '16px 12px', backgroundColor: 'transparent', color: '#d41c5c', border: '2px solid #d41c5c', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <RequestQuoteIcon sx={{ fontSize: 18 }} /> Add to Quote
              </button>
              <button style={{ padding: '16px 12px', backgroundColor: '#FFB020', color: '#2C2C2C', border: 'none', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <AutoAwesomeIcon sx={{ fontSize: 18 }} /> Design It
              </button>
            </div>

            {/* Digital files */}
            <div>
              <div style={{ marginBottom: '12px' }}>
                <span style={sectionLabel}>Digital Files & Resources</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {digitalFiles.map(f => (
                  <div key={f.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#FFFFFF', border: '1px solid #E8DDD3' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <f.Icon sx={{ fontSize: 22, color: '#044c5c' }} />
                      <div>
                        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#2C2C2C', fontWeight: 500 }}>{f.name}</div>
                        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#666' }}>{f.type}</div>
                      </div>
                    </div>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'transparent', color: '#044c5c', border: '1px solid #044c5c', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
                      <DownloadIcon sx={{ fontSize: 16 }} /> Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product details — Magento-style tabbed panel */}
        <div style={{ marginTop: '64px', backgroundColor: '#FFFFFF', border: '1px solid #E8DDD3' }}>
          {/* Tab headers */}
          <div style={{ display: 'flex', borderBottom: '1px solid #E8DDD3', overflowX: 'auto' }}>
            {tabs.map(t => {
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className="pdp-tab-btn"
                  style={{
                    flex: '1 1 0',
                    minWidth: '120px',
                    padding: '14px 16px',
                    backgroundColor: isActive ? '#FAFAF8' : 'transparent',
                    color: isActive ? '#044c5c' : '#2C2C2C',
                    border: 'none',
                    borderBottom: isActive ? '3px solid #044c5c' : '3px solid transparent',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div className="pdp-tab-content">
            {activeTab === 'description' && (
              <div
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#2C2C2C', lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: productDescriptionHtml }}
              />
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 600, color: '#2C2C2C', marginBottom: '20px' }}>
                  Technical Specifications
                </h3>
                <div className="pdp-specs-grid">
                  {specifications.map(spec => (
                    <Fragment key={spec.label}>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#2C2C2C' }}>
                        {spec.label}:
                      </div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666' }}>
                        {spec.value}
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'printingPositions' && (
              <div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 600, color: '#2C2C2C', marginBottom: '8px' }}>
                  Available Printing Methods & Positions
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666', marginBottom: '28px' }}>
                  Mix methods across different positions. Pricing shown in the configurator above.
                </p>
                <div className="pdp-methods-grid">
                  {printPositionDetails.map(m => (
                    <div key={m.method} style={{ border: '1px solid #E8DDD3', padding: '20px', backgroundColor: '#FAFAF8' }}>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 600, color: '#044c5c', marginBottom: '6px' }}>
                        {m.method}
                      </div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#666', marginBottom: '16px', lineHeight: 1.5 }}>
                        {m.description}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {m.positions.map(p => (
                          <div key={p.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: '#FFFFFF', border: '1px solid #E8DDD3' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                              <span
                                aria-hidden
                                style={{
                                  display: 'inline-block',
                                  width: '16px',
                                  height: '16px',
                                  backgroundColor: '#044c5c',
                                  borderRadius: p.shape === 'circle' ? '50%' : '2px',
                                }}
                              />
                              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#2C2C2C', fontWeight: 500 }}>
                                {p.name}
                              </span>
                            </span>
                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#666' }}>
                              {p.dimensions}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '36px', fontWeight: 600, color: '#2C2C2C' }}>
                        {averageRating.toFixed(1)}
                      </span>
                      <div>
                        <StarRating value={averageRating} size={20} />
                        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#666' }}>
                          Based on {reviews.length} verified reviews
                        </div>
                      </div>
                    </div>
                  </div>
                  <button style={{ padding: '12px 20px', backgroundColor: '#044c5c', color: '#FFFFFF', border: 'none', fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Write a Review
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {reviews.map(r => (
                    <div key={r.id} style={{ padding: '20px', border: '1px solid #E8DDD3', backgroundColor: '#FAFAF8' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#2C2C2C' }}>
                              {r.author}
                            </span>
                            {r.verified && (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#16A34A', fontFamily: 'Inter, sans-serif', fontSize: '12px' }}>
                                <VerifiedIcon sx={{ fontSize: 14 }} />
                                Verified
                              </span>
                            )}
                          </div>
                          <StarRating value={r.rating} size={14} />
                        </div>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#666' }}>
                          {new Date(r.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', fontWeight: 600, color: '#2C2C2C', marginBottom: '6px' }}>
                        {r.title}
                      </div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#2C2C2C', lineHeight: 1.6 }}>
                        {r.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
