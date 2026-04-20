import { MapPin, Phone, Mail, ArrowUp } from "lucide-react";

const FOOTER_LOGO_URL = "https://www.tezkargift.com/wp-content/uploads/2021/08/Tezkar-logo-white.svg";

const policies = [
  "FAQ", "Privacy Policy", "Shipping Policy", "Refund Policy", "Disclaimers", "Terms & Conditions",
];

const topCategories = [
  "Ramadan Gifts", "Technology Gifts", "Bottles & Drinkware", "Cups & Mugs",
  "Bags & Pouches", "Writing Instruments", "Gift Sets", "Office Supplies",
];

const infoLinks = [
  "Quote Center", "Credit & Invoices", "Helpdesk / Support",
  "Careers", "Become a Partner", "Blogs", "Product Catalog 2026",
  "Contact Us", "About Us",
];

const socialIcons = [
  { name: "Facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { name: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  { name: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { name: "Twitter", path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
  { name: "YouTube", path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
];

const S = "rgba(255,255,255,"; // white stroke shorthand
const dubaiSkylineSvg = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="300" viewBox="0 0 1400 300" fill="none">
  <path d="M60,300 L60,120 Q60,80 90,50 L95,48 Q100,80 100,120 L100,300" stroke="${S}0.09)" stroke-width="1.2" fill="none"/>
  <path d="M60,120 Q80,100 100,120" stroke="${S}0.07)" stroke-width="0.8" fill="none"/>
  <path d="M60,160 Q80,140 100,160" stroke="${S}0.07)" stroke-width="0.8" fill="none"/>
  <path d="M60,200 Q80,180 100,200" stroke="${S}0.07)" stroke-width="0.8" fill="none"/>
  <line x1="80" y1="300" x2="80" y2="280" stroke="${S}0.06)" stroke-width="0.8"/>
  <rect x="130" y="160" width="35" height="140" stroke="${S}0.08)" stroke-width="1" fill="none"/>
  <rect x="137" y="172" width="8" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="150" y="172" width="8" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="137" y="192" width="8" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="150" y="192" width="8" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="175" y="130" width="30" height="170" stroke="${S}0.08)" stroke-width="1" fill="none"/>
  <rect x="182" y="142" width="7" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="193" y="142" width="7" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="182" y="162" width="7" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="193" y="162" width="7" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="250" y="60" width="60" height="240" stroke="${S}0.10)" stroke-width="1.2" fill="none"/>
  <rect x="256" y="60" width="48" height="20" stroke="${S}0.08)" stroke-width="1" fill="none"/>
  <line x1="256" y1="80" x2="256" y2="300" stroke="${S}0.06)" stroke-width="0.8"/>
  <line x1="304" y1="80" x2="304" y2="300" stroke="${S}0.06)" stroke-width="0.8"/>
  <rect x="265" y="90" width="8" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="285" y="90" width="8" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="265" y="115" width="8" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="285" y="115" width="8" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="345" y="100" width="28" height="200" stroke="${S}0.08)" stroke-width="1" fill="none"/>
  <line x1="359" y1="100" x2="359" y2="78" stroke="${S}0.07)" stroke-width="0.8"/>
  <rect x="351" y="112" width="7" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="351" y="132" width="7" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="351" y="152" width="7" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="395" y="180" width="55" height="120" stroke="${S}0.08)" stroke-width="1" fill="none"/>
  <rect x="403" y="192" width="10" height="12" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="420" y="192" width="10" height="12" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="437" y="192" width="10" height="12" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="403" y="215" width="10" height="12" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="420" y="215" width="10" height="12" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <path d="M490,300 L490,110 Q495,108 500,110 L505,112 Q510,110 515,112 L515,300" stroke="${S}0.09)" stroke-width="1" fill="none"/>
  <line x1="490" y1="140" x2="515" y2="145" stroke="${S}0.06)" stroke-width="0.7"/>
  <line x1="490" y1="170" x2="515" y2="175" stroke="${S}0.06)" stroke-width="0.7"/>
  <line x1="490" y1="200" x2="515" y2="205" stroke="${S}0.06)" stroke-width="0.7"/>
  <line x1="490" y1="230" x2="515" y2="235" stroke="${S}0.06)" stroke-width="0.7"/>
  <line x1="490" y1="260" x2="515" y2="265" stroke="${S}0.06)" stroke-width="0.7"/>
  <rect x="545" y="150" width="32" height="150" stroke="${S}0.08)" stroke-width="1" fill="none"/>
  <rect x="552" y="162" width="7" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="565" y="162" width="7" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="585" y="190" width="40" height="110" stroke="${S}0.08)" stroke-width="1" fill="none"/>
  <rect x="593" y="202" width="8" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="608" y="202" width="8" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <path d="M700,300 L700,22 L702,8 L704,22 L704,300" stroke="${S}0.12)" stroke-width="1.3" fill="none"/>
  <path d="M692,300 L692,80 L700,60 L708,80 L708,300" stroke="${S}0.10)" stroke-width="1" fill="none"/>
  <path d="M685,300 L685,130 L692,110 L708,110 L715,130 L715,300" stroke="${S}0.08)" stroke-width="1" fill="none"/>
  <path d="M680,300 L680,180 L685,165 L715,165 L720,180 L720,300" stroke="${S}0.07)" stroke-width="0.8" fill="none"/>
  <line x1="685" y1="140" x2="715" y2="140" stroke="${S}0.05)" stroke-width="0.7"/>
  <line x1="685" y1="160" x2="715" y2="160" stroke="${S}0.05)" stroke-width="0.7"/>
  <line x1="680" y1="195" x2="720" y2="195" stroke="${S}0.05)" stroke-width="0.7"/>
  <line x1="680" y1="220" x2="720" y2="220" stroke="${S}0.05)" stroke-width="0.7"/>
  <line x1="680" y1="245" x2="720" y2="245" stroke="${S}0.05)" stroke-width="0.7"/>
  <line x1="680" y1="270" x2="720" y2="270" stroke="${S}0.05)" stroke-width="0.7"/>
  <rect x="760" y="90" width="30" height="210" stroke="${S}0.09)" stroke-width="1" fill="none"/>
  <path d="M765,90 L775,70 L785,90" stroke="${S}0.08)" stroke-width="0.8" fill="none"/>
  <rect x="767" y="105" width="7" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="780" y="105" width="7" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="767" y="125" width="7" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="780" y="125" width="7" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="767" y="145" width="7" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="780" y="145" width="7" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="815" y="120" width="35" height="180" stroke="${S}0.08)" stroke-width="1" fill="none"/>
  <line x1="832" y1="120" x2="832" y2="98" stroke="${S}0.07)" stroke-width="0.8"/>
  <rect x="822" y="135" width="8" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="836" y="135" width="8" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="822" y="155" width="8" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="836" y="155" width="8" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="880" y="170" width="42" height="130" stroke="${S}0.08)" stroke-width="1" fill="none"/>
  <rect x="888" y="182" width="8" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="905" y="182" width="8" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="888" y="202" width="8" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="950" y="100" width="25" height="200" stroke="${S}0.09)" stroke-width="1" fill="none"/>
  <polygon points="955,100 962,80 970,100" stroke="${S}0.07)" stroke-width="0.8" fill="none"/>
  <rect x="985" y="130" width="25" height="170" stroke="${S}0.09)" stroke-width="1" fill="none"/>
  <polygon points="990,130 997,112 1005,130" stroke="${S}0.07)" stroke-width="0.8" fill="none"/>
  <rect x="956" y="115" width="6" height="8" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="964" y="115" width="6" height="8" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="991" y="145" width="6" height="8" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="999" y="145" width="6" height="8" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <ellipse cx="1080" cy="210" rx="35" ry="50" stroke="${S}0.09)" stroke-width="1.2" fill="none"/>
  <ellipse cx="1080" cy="210" rx="20" ry="30" stroke="${S}0.06)" stroke-width="0.8" fill="none"/>
  <line x1="1080" y1="260" x2="1080" y2="300" stroke="${S}0.07)" stroke-width="1"/>
  <rect x="1145" y="140" width="30" height="160" stroke="${S}0.08)" stroke-width="1" fill="none"/>
  <rect x="1152" y="152" width="7" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="1163" y="152" width="7" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="1152" y="172" width="7" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="1163" y="172" width="7" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="1190" y="110" width="32" height="190" stroke="${S}0.08)" stroke-width="1" fill="none"/>
  <line x1="1206" y1="110" x2="1206" y2="90" stroke="${S}0.07)" stroke-width="0.8"/>
  <rect x="1197" y="122" width="7" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="1210" y="122" width="7" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="1260" y="180" width="30" height="120" stroke="${S}0.08)" stroke-width="1" fill="none"/>
  <rect x="1320" y="180" width="30" height="120" stroke="${S}0.08)" stroke-width="1" fill="none"/>
  <path d="M1290,180 Q1305,150 1320,180" stroke="${S}0.08)" stroke-width="1" fill="none"/>
  <rect x="1267" y="192" width="8" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="1327" y="192" width="8" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="1267" y="215" width="8" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <rect x="1327" y="215" width="8" height="10" stroke="${S}0.05)" stroke-width="0.7" fill="none"/>
  <line x1="0" y1="299" x2="1400" y2="299" stroke="${S}0.06)" stroke-width="0.8"/>
</svg>`)}`;

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="text-white relative overflow-hidden" style={{ fontFamily: "var(--font-body)", background: "#05495b" }}>
      {/* Dubai skyline pattern background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("${dubaiSkylineSvg}")`,
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom center",
          backgroundSize: "1400px 300px",
        }}
      />

      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-4 py-10 lg:py-14 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 – Contact */}
          <div>
            {/* Logo */}
            <div className="mb-5">
              <img src={FOOTER_LOGO_URL} alt="TezkarGift" className="h-[78px] w-auto" />
              <p className="text-white/40 text-[11px] mt-2">Corporate Gifts & Promotional Products</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-white flex-shrink-0 mt-0.5" />
                <p className="text-white/60 text-[12px] leading-relaxed">
                  Al Quoz Industrial Area 3,<br />
                  Dubai, United Arab Emirates
                </p>
              </div>
              <a href="tel:+97144567890" className="flex items-center gap-2.5 text-white/60 text-[12px] hover:text-white transition-colors">
                <Phone size={14} className="text-white flex-shrink-0" />
                +971 4 456 7890
              </a>
              <a href="mailto:info@tezkargift.com" className="flex items-center gap-2.5 text-white/60 text-[12px] hover:text-white transition-colors">
                <Mail size={14} className="text-white flex-shrink-0" />
                info@tezkargift.com
              </a>
            </div>

            {/* Working hours */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <p className="text-white/70 text-[11px] mb-0.5" style={{ fontWeight: 600 }}>Working Hours</p>
              <p className="text-white/40 text-[11px]">Sun – Thu: 9:00 AM – 6:00 PM</p>
              <p className="text-white/40 text-[11px]">Fri – Sat: Closed</p>
            </div>
          </div>

          {/* Column 2 – Customer Service */}
          <div>
            <h4
              className="text-white text-[13px] uppercase tracking-wider mb-4 pb-2 border-b border-white/10"
              style={{ fontWeight: 600 }}
            >
              Customer Service
            </h4>
            <ul className="space-y-2">
              {policies.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/50 text-[12px] hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – Top Categories */}
          <div>
            <h4
              className="text-white text-[13px] uppercase tracking-wider mb-4 pb-2 border-b border-white/10"
              style={{ fontWeight: 600 }}
            >
              Top Categories
            </h4>
            <ul className="space-y-2">
              {topCategories.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/50 text-[12px] hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 – Information */}
          <div>
            <h4
              className="text-white text-[13px] uppercase tracking-wider mb-4 pb-2 border-b border-white/10"
              style={{ fontWeight: 600 }}
            >
              Information
            </h4>
            <ul className="space-y-2">
              {infoLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/50 text-[12px] hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 relative z-10" style={{ background: "rgba(4,57,71,0.8)" }}>
        <div className="max-w-[1400px] mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/30 text-[11px]">
              &copy; 2026 Tezkargift. All rights reserved.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-7 h-7 bg-white/8 flex items-center justify-center hover:bg-[#C8956C] transition-colors"
                  aria-label={social.name}
                >
                  <svg className="w-3 h-3 fill-current text-white/60 hover:text-white" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-white/30 text-[11px] hover:text-white transition-colors uppercase tracking-wide"
            >
              Back to top <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}