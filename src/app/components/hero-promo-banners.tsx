import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PromoBanner {
  image: string;
  accentColor: string;
  eyebrow: string;
  headline: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

const banners: PromoBanner[] = [
  {
    image:
      "https://dev.biztechcs.com/wp-content/uploads/2026/03/img3.png",
    accentColor: "#C8956C",
    eyebrow: "Corporate Gifting",
    headline: "Luxury Gift Sets",
    description: "Curated premium gift boxes for every occasion",
    ctaText: "Shop Now",
    ctaHref: "#",
  },
  {
    image:
      "https://dev.biztechcs.com/wp-content/uploads/2026/03/img2.png",
    accentColor: "#044c5c",
    eyebrow: "Branded Merchandise",
    headline: "Custom Print Products",
    description: "Full-color branding on 2,000+ items",
    ctaText: "Explore Range",
    ctaHref: "#",
  },
  {
    image:
      "https://dev.biztechcs.com/wp-content/uploads/2026/03/img4.png",
    accentColor: "#d41c5c",
    eyebrow: "Packaging Solutions",
    headline: "Premium Packaging",
    description: "Eco-friendly & food-grade custom packaging",
    ctaText: "View Options",
    ctaHref: "#",
  },
  {
    image:
      "https://dev.biztechcs.com/wp-content/uploads/2026/03/img1.png",
    accentColor: "#C8956C",
    eyebrow: "Tech Accessories",
    headline: "Smart Business Gifts",
    description: "Premium tech products with custom branding",
    ctaText: "Discover More",
    ctaHref: "#",
  },
];

export function HeroPromoBanners() {
  return (
    <section
      className="py-[64px]"
      style={{ fontFamily: "var(--font-body)", background: "#FAFAF8" }}
    >
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {banners.map((banner, i) => (
            <a
              key={i}
              href={banner.ctaHref}
              className="group bg-white border border-[#E6E8EB] overflow-hidden hover:shadow-lg transition-all duration-300"
              style={{ borderRadius: 0 }}
            >
              <div className="flex flex-col sm:flex-row h-full">
                {/* Image side */}
                <div className="relative w-full sm:w-[45%] h-[180px] sm:h-auto overflow-hidden bg-[#E8DDD3]">
                  <ImageWithFallback
                    src={banner.image}
                    alt={banner.headline}
                    className="absolute inset-0 w-full h-full object-fit group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                </div>

                {/* Text content side */}
                <div className="flex flex-col justify-center p-5 sm:p-6 w-full sm:w-[55%]">
                  <h3
                    className="text-[#2C2C2C] mb-2 !leading-[1.4] text-[16px]"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 600,
                    }}
                  >
                    {banner.headline}
                  </h3>
                  <p
                    className="text-[#5B616A] text-[13px] !leading-[1.5]"
                    style={{ fontWeight: 400 }}
                  >
                    {banner.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}