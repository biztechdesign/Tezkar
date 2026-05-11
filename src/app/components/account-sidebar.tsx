import { Link, useLocation } from "react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  User,
  BookOpen,
  Package,
  Heart,
  Star,
  Palette,
  FileText,
  MessageSquare,
  Mail,
  CreditCard,
  Briefcase,
  LogOut,
  ChevronDown,
  Menu,
} from "lucide-react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/account/dashboard" },
  { icon: User, label: "Account Information", href: "/account/information" },
  { icon: Briefcase, label: "Business Information", href: "/account/business-information" },
  { icon: BookOpen, label: "Address Book", href: "/account/addresses" },
  { icon: Package, label: "My Orders", href: "/account/orders" },
  { icon: Heart, label: "My Wishlist", href: "/account/wishlist" },
  { icon: Star, label: "My Product Reviews", href: "/account/reviews" },
  { icon: Palette, label: "My Designs", href: "/account/designs" },
  { icon: FileText, label: "My Design Orders", href: "/account/design-orders" },
  { icon: MessageSquare, label: "My Quotes", href: "/account/quotes" },
  {
    icon: Mail,
    label: "Newsletter Subscription",
    href: "/account/newsletter",
  },
  {
    icon: CreditCard,
    label: "Credit Information",
    href: "/account/credit-information",
  },
];

export function AccountSidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const currentItem = navItems.find((i) => i.href === location.pathname);
  const currentLabel = currentItem?.label ?? "Account Menu";
  const CurrentIcon = currentItem?.icon ?? Menu;

  return (
    <aside className="w-full lg:w-[240px] lg:flex-shrink-0">
      {/* Mobile collapse toggle */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="lg:hidden w-full flex items-center justify-between gap-3 px-5 py-3 bg-white border border-[#E8DDD3] mb-2"
        style={{ borderRadius: 0 }}
        aria-expanded={open}
      >
        <span className="flex items-center gap-3">
          <CurrentIcon
            className="w-[18px] h-[18px] flex-shrink-0 text-[#044c5c]"
            strokeWidth={1.6}
          />
          <span
            className="text-[13px] text-[#044c5c]"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
          >
            {currentLabel}
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#5B616A] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <nav
        className={`bg-white border border-[#E8DDD3] overflow-hidden ${open ? "block" : "hidden"} lg:block`}
        style={{ borderRadius: 0 }}
      >
        <ul className="divide-y divide-[#F0EBE5]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-5 py-3.5 transition-all duration-200 group ${
                    isActive
                      ? "bg-[#E8DDD3]"
                      : "hover:bg-[#f0f7f8]"
                  }`}
                  style={{ borderRadius: 0 }}
                >
                  <Icon
                    className="w-[18px] h-[18px] flex-shrink-0 transition-colors"
                    strokeWidth={1.6}
                    style={{
                      color: isActive ? "#044c5c" : "#044c5c",
                    }}
                  />
                  <span
                    className="text-[13px] leading-tight"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "#044c5c" : "#2C2C2C",
                    }}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <span
                      className="ml-auto w-1 h-4 bg-[#044c5c] flex-shrink-0"
                      style={{ borderRadius: 0 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}

          {/* Signout */}
          <li className="border-t border-[#E8DDD3]">
            <button
              className="flex items-center gap-3 px-5 py-3.5 w-full hover:bg-[#fdf0f5] transition-all duration-200 group"
              style={{ borderRadius: 0 }}
            >
              <LogOut
                className="w-[18px] h-[18px] flex-shrink-0 text-[#d41c5c]"
                strokeWidth={1.6}
              />
              <span
                className="text-[13px] text-[#d41c5c] group-hover:text-[#b01549]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                }}
              >
                Signout
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
