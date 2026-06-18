import { BookOpen, ChevronDown, CreditCard, ExternalLink, FileText, Heart, LayoutDashboard, Lock, LogOut, Mail, Menu, MessageSquare, Package, Palette, Star, User, UserCog, X } from "./icons";
import { Link, useLocation } from "react-router";
import { useState } from "react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  external?: boolean;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/account/dashboard" },
  { icon: User, label: "Account Information", href: "/account/information" },
  { icon: Lock, label: "Change Password", href: "/account/change-password" },
  { icon: BookOpen, label: "Address Book", href: "/account/addresses" },
  {
    icon: UserCog,
    label: "Transfer Key Account Manager",
    href: "/account/transfer-account-manager",
  },
  { icon: MessageSquare, label: "Quotes", href: "/account/quotes" },
  { icon: Package, label: "Orders", href: "/account/orders" },
  {
    icon: CreditCard,
    label: "Invoice",
    href: "/account/invoices",
  },
  { icon: FileText, label: "My Ordered Design", href: "/account/design-orders" },
  { icon: Palette, label: "Designs", href: "/account/designs" },
  { icon: Heart, label: "Wishlist", href: "/account/wishlist" },
  { icon: Star, label: "Reviews", href: "/account/reviews" },
  {
    icon: Mail,
    label: "Newsletter Subscription",
    href: "/account/newsletter",
  },
];

export function AccountSidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [odooTarget, setOdooTarget] = useState<string | null>(null);
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

            const rowClass = `flex items-center gap-3 px-5 py-3.5 transition-all duration-200 group w-full text-left ${
              isActive ? "bg-[#E8DDD3]" : "hover:bg-[#f0f7f8]"
            }`;
            const iconNode = (
              <Icon
                className="w-[18px] h-[18px] flex-shrink-0 transition-colors"
                strokeWidth={1.6}
                style={{ color: "#044c5c" }}
              />
            );
            const labelNode = (
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
            );
            const trailingNode = item.external ? (
              <ExternalLink
                className="ml-auto w-3.5 h-3.5 text-[#5B616A] flex-shrink-0"
                strokeWidth={1.6}
              />
            ) : isActive ? (
              <span
                className="ml-auto w-1 h-4 bg-[#044c5c] flex-shrink-0"
                style={{ borderRadius: 0 }}
              />
            ) : null;

            return (
              <li key={item.href}>
                {item.external ? (
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setOdooTarget(item.label);
                    }}
                    className={rowClass}
                    style={{ borderRadius: 0 }}
                  >
                    {iconNode}
                    {labelNode}
                    {trailingNode}
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={rowClass}
                    style={{ borderRadius: 0 }}
                  >
                    {iconNode}
                    {labelNode}
                    {trailingNode}
                  </Link>
                )}
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

      {odooTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="odoo-redirect-title"
          onClick={() => setOdooTarget(null)}
        >
          <div
            className="bg-white max-w-md w-full shadow-xl border border-[#E8DDD3]"
            style={{ borderRadius: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between px-6 pt-5 pb-3 border-b border-[#E8DDD3]">
              <div className="flex items-center gap-3">
                <div className="bg-[#E8F4F8] p-2" style={{ borderRadius: 0 }}>
                  <ExternalLink className="w-5 h-5 text-[#044c5c]" strokeWidth={1.6} />
                </div>
                <h2
                  id="odoo-redirect-title"
                  className="text-lg text-[#2C2C2C]"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  Redirect to Odoo Portal
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOdooTarget(null)}
                className="text-[#5B616A] hover:text-[#2C2C2C] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" strokeWidth={1.6} />
              </button>
            </div>
            <div className="px-6 py-5">
              <p
                className="text-sm text-[#2C2C2C] leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <span className="font-medium">{odooTarget}</span> is managed in the
                Odoo portal. You will be redirected to continue there.
              </p>
            </div>
            <div className="px-6 py-4 border-t border-[#E8DDD3] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setOdooTarget(null)}
                className="px-4 py-2 border border-[#E8DDD3] text-sm text-[#2C2C2C] hover:bg-[#FAFAF8] transition-colors"
                style={{ borderRadius: 0, fontFamily: "Inter, sans-serif" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setOdooTarget(null)}
                className="px-4 py-2 bg-[#044c5c] text-white text-sm hover:bg-[#033845] transition-colors inline-flex items-center gap-2"
                style={{ borderRadius: 0, fontFamily: "Inter, sans-serif", fontWeight: 500 }}
              >
                Continue
                <ExternalLink className="w-4 h-4" strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
