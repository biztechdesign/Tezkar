import { Link, useLocation } from "react-router";
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
  DollarSign,
  LogOut,
} from "lucide-react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/account/dashboard" },
  { icon: User, label: "Account Information", href: "/account/information" },
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
  {
    icon: DollarSign,
    label: "Credit Amount Request",
    href: "/account/credit-request",
  },
];

export function AccountSidebar() {
  const location = useLocation();

  return (
    <aside className="w-[240px] flex-shrink-0">
      <nav
        className="bg-white border border-[#E8DDD3] overflow-hidden"
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
