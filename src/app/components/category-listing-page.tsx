import { useParams, Link } from "react-router";
import { useState } from "react";
import { Home, ChevronRight, ChevronDown } from "lucide-react";
import { getCategoryBySlug } from "./category-data";

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

      {/* Subcategory Tile Grid */}
      <section className="py-6 lg:py-10 bg-[#FAFAF8]">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between mb-6 border-b border-[#e7e7e7] pb-3">
            <h2
              className="text-[#222529] text-[20px] md:text-[24px] uppercase tracking-wide relative"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
            >
              {category.name}
              <span className="absolute bottom-[-13px] left-0 w-full h-[2px] bg-[#044c5c]" />
            </h2>
            <span className="text-[12px] text-[#888]">{category.subcategories.length} Categories</span>
          </div>

          {categorySEO[slug] && (
            <p className="text-[#5B616A] text-[14px] mb-6 max-w-[800px]" style={{ lineHeight: 1.6 }}>
              {categorySEO[slug].description}
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {category.subcategories.map((sub) => (
              <Link
                key={sub.slug}
                to={`/category/${category.slug}/${sub.slug}`}
                className="group bg-white border border-[#e7e7e7] hover:border-[#044c5c] hover:shadow-md transition-all overflow-hidden"
                style={{ borderRadius: "0px", fontFamily: "var(--font-body)" }}
              >
                <div className="aspect-square bg-[#f5f5f5] overflow-hidden">
                  <img
                    src={sub.image}
                    alt={sub.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3
                    className="text-[#222529] text-[13px] group-hover:text-[#044c5c] transition-colors"
                    style={{ fontWeight: 500 }}
                  >
                    {sub.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
