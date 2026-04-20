// TEMP: Commented out figma:asset import causing module loading errors
// import image_3dc11b9fca81d93f0b262b196acd327aa589c0c6 from 'figma:asset/3dc11b9fca81d93f0b262b196acd327aa589c0c6.png'
const image_3dc11b9fca81d93f0b262b196acd327aa589c0c6 = "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop";
import { HeroBanner } from "./hero-banner";
import { USPStrip } from "./usp-strip";
import { CategoryIcons } from "./category-icons";
import { PromoBanners } from "./promo-banners";
import { ProductCarousel } from "./product-carousel";
import { ProductGrid } from "./product-grid";
import { BrandStrip } from "./brand-strip";
import { ServicesSection } from "./services-section";
import { DivisionsStrip } from "./divisions-strip";
import { NewsletterSection } from "./newsletter-section";
import { FAQSection } from "./faq-section";
import { HeroPromoBanners } from "./hero-promo-banners";
import { newArrivals, saleProducts, hotProducts } from "./data";
import { Link } from "react-router";
import { ArrowRight, Gem, Globe, Truck } from "lucide-react";

export function HomePage() {
  return (
    <>
      <HeroBanner />
      <USPStrip />
      <HeroPromoBanners />
      <CategoryIcons />
      <ProductGrid
        title="New Arrivals"
        products={newArrivals}
        viewAllText="View All New Arrivals"
      />

      {/* ── SEO Intro Block ── */}
      <section
        className="py-[64px] border-b border-[#e7e7e7]"
        style={{ fontFamily: "var(--font-body)", background: "#FAFAF8" }}
      >
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* ── Image side ── */}
            <div className="w-full lg:w-[45%] flex-shrink-0">
              <div className="relative overflow-hidden" style={{ borderRadius: 0 }}>
                <img
                  src={image_3dc11b9fca81d93f0b262b196acd327aa589c0c6}
                  alt="TezkarGift premium corporate gift products collection"
                  className="w-full aspect-[4/3] object-cover"
                />
                {/* Floating badge */}
                <div
                  className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-3 shadow-sm border border-[#E6E8EB]"
                  style={{ borderRadius: 0 }}
                >
                  <span
                    className="text-[#d41c5c] text-[22px] block"
                    style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, lineHeight: 1 }}
                  >
                    10+
                  </span>
                  <span className="text-[#5B616A] text-[11px] uppercase tracking-wider" style={{ fontWeight: 500 }}>
                    Years of Trust
                  </span>
                </div>
              </div>
            </div>

            {/* ── Text side ── */}
            <div className="w-full lg:w-[55%]">
              <p
                className="text-[#d41c5c] text-[12px] uppercase tracking-[0.15em] mb-2"
                style={{ fontWeight: 600 }}
              >
                Welcome to TezkarGift
              </p>
              <h1
                className="text-[#2C2C2C] text-[24px] md:text-[28px] lg:text-[32px] mb-4"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, lineHeight: 1.25 }}
              >
                Premium Corporate Gifts &amp; Promotional Products in Dubai, UAE
              </h1>
              <p
                className="text-[#5B616A] text-[14px] mb-6"
                style={{ lineHeight: 1.7 }}
              >
                TezkarGift is a leading supplier of premium corporate gifts, branded merchandise, and promotional products across the UAE and GCC.
                From custom drinkwares and luxury gift sets to tech accessories and eco-friendly giveaways, we help businesses
                make lasting impressions — with full branding, fast delivery from Dubai, and dedicated support for orders of every size.
              </p>

              {/* Mini feature pills */}
              <div className="flex flex-wrap gap-3 mb-7">
                {[
                  { icon: Gem, label: "2,000+ Products" },
                  { icon: Globe, label: "UAE & GCC Delivery" },
                  { icon: Truck, label: "Fast Turnaround" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 bg-white border border-[#E6E8EB] px-3 py-2"
                    style={{ borderRadius: 0 }}
                  >
                    <item.icon size={15} className="text-[#044c5c]" strokeWidth={1.8} />
                    <span className="text-[#2C2C2C] text-[12px]" style={{ fontWeight: 500 }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* 2 CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/category/drinkwares"
                  className="group relative inline-flex items-center gap-2 text-[13px] uppercase tracking-wider px-6 py-3 overflow-hidden transition-all duration-300 hover:!text-white"
                  style={{
                    fontWeight: 600,
                    color: "#ffffff",
                    background: "#044c5c",
                    borderRadius: 0,
                    boxShadow: "0 6px 24px rgba(4,76,92,0.25)",
                    transition: "box-shadow 0.6s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 6px 24px rgba(200,149,108,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 6px 24px rgba(4,76,92,0.25)";
                  }}
                >
                  <span
                    className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ backgroundColor: "#d41c5c" }}
                    aria-hidden="true"
                  />
                  <span className="relative z-10" style={{ color: "#ffffff" }}>Explore Products</span>
                  <ArrowRight size={14} className="relative z-10 transition-transform group-hover:translate-x-1" style={{ color: "#ffffff" }} />
                </Link>
                <Link
                  to="/about"
                  className="group relative inline-flex items-center gap-2 text-[13px] uppercase tracking-wider px-6 py-3 border border-[#044c5c] overflow-hidden transition-all duration-300 hover:!text-white"
                  style={{
                    fontWeight: 600,
                    color: "#044c5c",
                    borderRadius: 0,
                    transition: "box-shadow 0.6s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 6px 24px rgba(200,149,108,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span
                    className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ backgroundColor: "#d41c5c" }}
                    aria-hidden="true"
                  />
                  <span className="relative z-10 transition-colors duration-300 text-[#044c5c] group-hover:!text-white">About TezkarGift</span>
                  <ArrowRight size={14} className="relative z-10 transition-all duration-300 group-hover:translate-x-1 text-[#044c5c] group-hover:!text-white" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PromoBanners />
      <ProductCarousel
        title="On Sale"
        products={saleProducts}
        viewAllText="View All Sale Items"
        bgColor="bg-[#FAFAF8]"
      />
      <ProductCarousel
        title="Hot Products"
        products={hotProducts}
        viewAllText="View All Hot Products"
      />
      <BrandStrip />
      <ServicesSection />
      <DivisionsStrip />
      <NewsletterSection />
      <FAQSection />
    </>
  );
}