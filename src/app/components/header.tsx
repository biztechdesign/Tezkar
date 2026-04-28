import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router";
import { Search, User, Heart, ShoppingCart, Menu, MessageCircle, Phone, ChevronDown, LogIn, ClipboardList } from "lucide-react";
import { MegaMenu } from "./mega-menu";
import { MobileDrawer } from "./mobile-drawer";
import { SearchDropdown } from "./search-dropdown";

const LOGO_URL = "https://i.ibb.co/392zr36F/tzkrgft-4.png";

const WhatsAppIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

/* ── CSS for WhatsApp micro-animations ── */
const waAnimationStyles = `
@keyframes waPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(37, 211, 102, 0); }
}
@keyframes waIconBounce {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.15) rotate(-5deg); }
  50% { transform: scale(1); }
  75% { transform: scale(1.1) rotate(5deg); }
}
@keyframes waChannelShine {
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
}
@keyframes waRingPulse {
  0%, 100% { box-shadow: 0 10px 30px rgba(4,76,92,0.18), 0 0 0 0 rgba(37,211,102,0.55); }
  50% { box-shadow: 0 10px 30px rgba(4,76,92,0.22), 0 0 0 10px rgba(37,211,102,0); }
}
@keyframes waStatusBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}
`;

export function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [myAccountOpen, setMyAccountOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const handleSearchClose = useCallback(() => {
    setSearchFocused(false);
  }, []);

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        try {
          const recent = JSON.parse(localStorage.getItem("tg_recent_searches") || "[]") as string[];
          const updated = [searchQuery, ...recent.filter((s: string) => s.toLowerCase() !== searchQuery.toLowerCase())].slice(0, 5);
          localStorage.setItem("tg_recent_searches", JSON.stringify(updated));
        } catch { /* ignore */ }
        setSearchFocused(false);
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close account dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setMyAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const totalBadge = cartCount + wishlistCount;

  return (
    <>
      <style>{waAnimationStyles}</style>
      <header
        className={`bg-white border-b border-[#e7e7e7] transition-all duration-300 z-50 ${
          isSticky ? "fixed top-0 left-0 right-0 shadow-sm" : "relative"
        }`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        {/* Main Header Row */}
        <div className="max-w-[1400px] mx-auto px-4">
          <div className={`flex items-center justify-between gap-4 transition-all ${isSticky ? "py-2" : "py-4"}`}>
            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-[#222529]"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={LOGO_URL}
                alt="TezkarGift"
                className={`transition-all ${isSticky ? "h-[38px]" : "h-[48px]"} w-auto`}
              />
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-[620px] mx-4 relative" ref={searchContainerRef}>
              <form onSubmit={handleSearchSubmit} className="flex w-full border border-[#e7e7e7] overflow-hidden focus-within:border-[#044c5c] transition-colors">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products, SKUs, or print methods..."
                  className="flex-1 px-4 py-2.5 text-[13px] bg-white outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                />
                <button type="submit" className="bg-[#044c5c] text-white px-5 hover:bg-[#033a48] transition-colors">
                  <Search size={16} />
                </button>
              </form>
              <SearchDropdown
                query={searchQuery}
                onQueryChange={setSearchQuery}
                onClose={handleSearchClose}
                visible={searchFocused}
              />
            </div>

            {/* WhatsApp CTAs with micro animations */}
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              <a
                href="https://wa.me/97142768824"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 bg-[#25D366] text-white px-3 py-2 hover:bg-[#1ebe57] transition-all"
                style={{ animation: "waPulse 2.5s cubic-bezier(0.22,1,0.36,1) infinite" }}
              >
                <span style={{ animation: "waIconBounce 3s ease-in-out infinite", display: "inline-flex" }}>
                  <WhatsAppIcon size={15} />
                </span>
                <span className="text-[11px] whitespace-nowrap" style={{ fontWeight: 600 }}>Team WhatsApp</span>
              </a>
              <a
                href="tel:+971501234567"
                aria-label="Call TezkarGift at +971 50 123 4567"
                onClick={(e) => {
                  if (!/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) && !window.confirm('Call +971 50 123 4567?')) {
                    e.preventDefault();
                  }
                }}
                className="flex items-center gap-1.5 bg-[#FF8A00] text-white px-3.5 py-2 hover:bg-[#E57800] transition-colors relative overflow-hidden"
                style={{ willChange: 'auto' }}
              >
                <span
                  className="absolute inset-0 bg-[#FF8A00] pointer-events-none"
                  style={{ animation: 'callPulse 2s cubic-bezier(0.22,1,0.36,1) infinite', opacity: 0, willChange: 'transform, opacity' }}
                />
                <Phone size={15} className="relative z-10" style={{ animation: 'wiggle 2.5s ease-in-out infinite', willChange: 'transform' }} />
                <span className="text-[11px] relative z-10" style={{ fontWeight: 600 }}>+971 50 123 4567</span>
              </a>
            </div>

            {/* Right Actions — combined dropdown */}
            <div className="flex items-center gap-0.5 sm:gap-1.5">
              {/* Mobile search */}
              <button
                className="md:hidden p-2 text-[#222529]"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* My Account dropdown - now last */}
              <div className="relative" ref={accountRef}>
                <button
                  onClick={() => setMyAccountOpen(!myAccountOpen)}
                  className="flex items-center gap-1.5 text-[#222529] hover:text-[#054c5e] transition-colors p-2 relative"
                >
                  <User size={18} strokeWidth={1.5} />
                  {totalBadge > 0 && (
                    <span className="absolute -top-0.5 left-5 bg-[#d41c5c] text-white text-[8px] w-[16px] h-[16px] flex items-center justify-center" style={{ fontWeight: 700 }}>
                      {totalBadge}
                    </span>
                  )}
                  <span className="text-[11px] hidden lg:inline" style={{ fontWeight: 500 }}>My Account</span>
                  <ChevronDown size={12} className={`hidden lg:inline transition-transform ${myAccountOpen ? "rotate-180" : ""}`} />
                </button>

                {myAccountOpen && (
                  <div className="absolute right-0 top-full mt-2 w-[min(220px,calc(100vw-32px))] bg-white border border-[#e7e7e7] shadow-lg z-[999]" style={{ fontFamily: "var(--font-body)" }}>
                    <div className="py-1">
                      <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#2C2C2C] hover:bg-[#f7f8fa] transition-colors">
                        <User size={16} strokeWidth={1.5} className="text-[#054c5e]" />
                        <span>My Profile</span>
                      </a>
                      <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#2C2C2C] hover:bg-[#f7f8fa] transition-colors">
                        <ClipboardList size={16} strokeWidth={1.5} className="text-[#054c5e]" />
                        <span>My Orders</span>
                      </a>
                      <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#2C2C2C] hover:bg-[#f7f8fa] transition-colors relative">
                        <Heart size={16} strokeWidth={1.5} className="text-[#d41c5c]" />
                        <span>Wishlist</span>
                        {wishlistCount > 0 && (
                          <span className="ml-auto bg-[#d41c5c] text-white text-[9px] px-1.5 py-0.5" style={{ fontWeight: 700 }}>{wishlistCount}</span>
                        )}
                      </a>
                      <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#2C2C2C] hover:bg-[#f7f8fa] transition-colors relative">
                        <ShoppingCart size={16} strokeWidth={1.5} className="text-[#054c5e]" />
                        <span>Cart</span>
                        {cartCount > 0 && (
                          <span className="ml-auto bg-[#054c5e] text-white text-[9px] px-1.5 py-0.5" style={{ fontWeight: 700 }}>{cartCount}</span>
                        )}
                      </a>
                      <div className="border-t border-[#e7e7e7] my-1" />
                      <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#054c5e] hover:bg-[#f7f8fa] transition-colors" style={{ fontWeight: 600 }}>
                        <LogIn size={16} strokeWidth={1.5} />
                        <span>Sign In / Register</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          {searchOpen && (
            <div className="md:hidden pb-3">
              <div className="flex border border-[#e7e7e7] overflow-hidden">
                <input
                  type="text"
                  placeholder="Search products, SKUs..."
                  className="flex-1 px-4 py-2.5 text-[13px] outline-none"
                  autoFocus
                />
                <button className="bg-[#044c5c] text-white px-4">
                  <Search size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop navigation */}
        <MegaMenu />
      </header>

      {isSticky && <div className="h-[120px]" />}

      <MobileDrawer open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Floating WhatsApp Channel — always-expanded pill */}
      <a
        href="https://whatsapp.com/channel/tezkargift"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join TezkarGift WhatsApp Channel"
        className="group fixed bottom-3 right-3 md:bottom-6 md:right-5 z-50 flex items-center bg-white border border-[#E6E8EB] overflow-hidden transition-[box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#25D366]"
        style={{
          fontFamily: "var(--font-body)",
          borderRadius: 0,
          height: "56px",
          animation: "waRingPulse 2.6s cubic-bezier(0.22,1,0.36,1) infinite",
        }}
      >
        {/* Icon block — WhatsApp green square */}
        <span
          className="flex-shrink-0 flex items-center justify-center bg-[#25D366] text-white relative"
          style={{ width: "56px", height: "56px" }}
        >
          <span style={{ animation: "waIconBounce 3s ease-in-out infinite", display: "inline-flex" }}>
            <WhatsAppIcon size={26} />
          </span>
        </span>

        {/* Label block — always visible */}
        <span
          className="flex flex-col justify-center pl-3 pr-4 whitespace-nowrap"
          style={{ color: "#2C2C2C" }}
        >
          <span
            className="text-[13px] leading-tight"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
          >
            WhatsApp
          </span>
          <span
            className="text-[13px] leading-tight"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
          >
            Channel
          </span>
        </span>
      </a>
    </>
  );
}