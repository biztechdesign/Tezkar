import { useState } from "react";
import { X, ChevronDown, User, Heart, Phone, Mail, BookOpen, Wrench, Palette, Clock, Star, Zap, Flame, Crown, Gem, Briefcase } from "lucide-react";
import { brands } from "./data";
import logoSvg from "../../imports/tzkrgft-4-1.svg";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

const masterProductNames = [
  "Bags", "Caps & Hats", "Drinkwares", "Electronics & IT",
  "Gift Sets", "Health & Wellness", "Home & Living",
  "Keychains & Accessories", "Office & Stationery", "Outdoor & Sports",
  "Pens & Writing", "Eco-Friendly", "T-Shirts & Apparel",
  "Textiles", "Tools & Auto", "Toys & Games",
  "Travel & Leisure", "Awards & Trophies", "All Products",
];

const toolsItems = [
  "About Us", "Reseller Tools", "Become a Partner", "Reseller Website Registration",
  "Clients Website", "Our Location Map", "Sample Starter Kit", "Order Our Catalogue",
  "Client Friendly Flyers", "Customer Feedback & Complaint", "Clients",
  "Videos", "Exhibitions", "FAQs", "Newsletter", "Careers",
];

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggle = (key: string) => setExpandedMenu(expandedMenu === key ? null : key);

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-[2px]" onClick={onClose} />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[min(310px,90vw)] bg-white z-[101] transform transition-transform duration-300 overflow-y-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#eaedf0]">
          <img src={logoSvg} alt="TezkarGift" className="h-[28px] w-auto" />
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#555] hover:text-[#222] hover:bg-[#f4f4f4] transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Account quick links */}
        <div className="flex items-center gap-4 px-4 py-3 border-b border-[#eaedf0] bg-[#f8f9fa]">
          <a href="#" className="flex items-center gap-2 text-[13px] text-[#555]">
            <User size={15} /> Account
          </a>
          <a href="#" className="flex items-center gap-2 text-[13px] text-[#555]">
            <Heart size={15} /> Wishlist
          </a>
        </div>

        <div className="py-1">
          {/* Promotional Products */}
          <div className="border-b border-[#f0f0f0]">
            <button
              onClick={() => toggle("promo")}
              className="w-full flex items-center justify-between px-4 py-3.5 text-[14px] bg-[#044c5c] text-white"
              style={{ fontWeight: 600 }}
            >
              Promotional Products
              <ChevronDown size={16} className={`transition-transform ${expandedMenu === "promo" ? "rotate-180" : ""}`} />
            </button>
            {expandedMenu === "promo" && (
              <div className="bg-[#fafafa] pb-2 pt-1">
                {masterProductNames.map((sub) => (
                  <a key={sub} href="#" className="block px-6 py-2 text-[13px] text-[#555] hover:text-[#044c5c] transition-colors">
                    {sub}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Brands */}
          <div className="border-b border-[#f0f0f0]">
            <button
              onClick={() => toggle("brands")}
              className="w-full flex items-center justify-between px-4 py-3.5 text-[14px] text-[#222529] hover:text-[#044c5c] transition-colors"
              style={{ fontWeight: 600 }}
            >
              Brands
              <ChevronDown size={16} className={`transition-transform text-[#999] ${expandedMenu === "brands" ? "rotate-180" : ""}`} />
            </button>
            {expandedMenu === "brands" && (
              <div className="bg-[#fafafa] pb-2 pt-1">
                {brands.map((brand) => (
                  <a key={brand.name} href="#" className="block px-6 py-2 text-[13px] text-[#555] hover:text-[#044c5c] transition-colors">
                    {brand.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Popular */}
          <div className="border-b border-[#f0f0f0]">
            <button
              onClick={() => toggle("popular")}
              className="w-full flex items-center justify-between px-4 py-3.5 text-[14px] text-[#222529] hover:text-[#044c5c] transition-colors"
              style={{ fontWeight: 600 }}
            >
              Popular
              <ChevronDown size={16} className={`transition-transform text-[#999] ${expandedMenu === "popular" ? "rotate-180" : ""}`} />
            </button>
            {expandedMenu === "popular" && (
              <div className="bg-[#fafafa] pb-2 pt-1">
                {["Ramadan Gifts", "Sadu Designs", "Gift Sets", "Eco-Friendly Gifts", "Jute and Cotton Bags", "Sign Holders and Display Stands", "Pins and Badges", "Medals", "National Day Products"].map((cat) => (
                  <a key={cat} href="#" className="block px-6 py-2 text-[13px] text-[#555] hover:text-[#044c5c] transition-colors">
                    {cat}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Customized Products */}
          <div className="border-b border-[#f0f0f0]">
            <button
              onClick={() => toggle("customized")}
              className="w-full flex items-center justify-between px-4 py-3.5 text-[14px] text-[#222529] hover:text-[#044c5c] transition-colors"
              style={{ fontWeight: 600 }}
            >
              Printing Services
              <ChevronDown size={16} className={`transition-transform text-[#999] ${expandedMenu === "customized" ? "rotate-180" : ""}`} />
            </button>
            {expandedMenu === "customized" && (
              <div className="bg-[#fafafa] pb-2 pt-1">
                {["Logo Printing", "Laser Engraving", "Custom Packaging", "Embroidery", "Design Services", "Bulk Customization"].map((svc) => (
                  <a key={svc} href="#" className="block px-6 py-2 text-[13px] text-[#555] hover:text-[#044c5c] transition-colors">
                    {svc}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Tools */}
          <div className="border-b border-[#f0f0f0]">
            <button
              onClick={() => toggle("tools")}
              className="w-full flex items-center justify-between px-4 py-3.5 text-[14px] text-[#222529] hover:text-[#044c5c] transition-colors"
              style={{ fontWeight: 600 }}
            >
              <span className="flex items-center gap-2"><Wrench size={14} /> About Tezkar</span>
              <ChevronDown size={16} className={`transition-transform text-[#999] ${expandedMenu === "tools" ? "rotate-180" : ""}`} />
            </button>
            {expandedMenu === "tools" && (
              <div className="bg-[#fafafa] pb-2 pt-1">
                {toolsItems.map((tool) => (
                  <a key={tool} href="#" className="block px-6 py-2 text-[13px] text-[#555] hover:text-[#044c5c] transition-colors">
                    {tool}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Contact Us */}
          <a href="#" className="flex items-center gap-2 px-4 py-3.5 text-[14px] text-[#222529] border-b border-[#f0f0f0]" style={{ fontWeight: 600 }}>
            <Phone size={14} /> Contact Us
          </a>

          {/* Catalogue 2026 */}
          <a href="/catalogue" className="flex items-center gap-2 px-4 py-3.5 text-[14px] text-[#044c5c] border-b border-[#f0f0f0]" style={{ fontWeight: 700 }}>
            <BookOpen size={14} /> Catalogue 2026
          </a>
        </div>

        {/* Phone CTA */}
        <div className="px-4 py-4">
          <a
            href="tel:+97142768824"
            className="flex items-center justify-center gap-2 border border-[#d41c5c] text-[#d41c5c] rounded-full px-5 py-3 text-[14px] hover:bg-[#d41c5c] hover:text-white transition-all"
            style={{ fontWeight: 600 }}
          >
            <Phone size={15} />
            +971 4 276 8824
          </a>
        </div>

        {/* Contact info */}
        <div className="p-4 border-t border-[#eaedf0]">
          <p className="text-[11px] text-[#999] uppercase tracking-wider mb-3" style={{ fontWeight: 600 }}>Quick Contact</p>
          <a href="mailto:info@tezkargift.com" className="flex items-center gap-2 text-[13px] text-[#555] mb-2">
            <Mail size={14} /> info@tezkargift.com
          </a>
          <p className="flex items-center gap-2 text-[12px] text-[#999] mt-2">
            <Clock size={12} /> Sun–Thu 9AM–6PM
          </p>
        </div>
      </div>
    </>
  );
}