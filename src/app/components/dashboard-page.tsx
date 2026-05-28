import { ArrowRight, CreditCard, FileText, Heart, Package, Palette, Star, TrendingUp } from "./icons";
import { Link } from "react-router";
import { AccountSidebar } from "./account-sidebar";

const summaryCards = [
  { icon: Package, label: "Total Orders", value: "12", accent: "#044c5c", bg: "#E8F4F8" },
  { icon: Heart, label: "Wishlist Items", value: "8", accent: "#d41c5c", bg: "#fdf0f5" },
  { icon: Palette, label: "Saved Designs", value: "5", accent: "#C8956C", bg: "#FAF1E8" },
  { icon: CreditCard, label: "Credit Balance", value: "$1,250.00", accent: "#16A34A", bg: "#F0FDF4" },
];

const quickLinks = [
  { icon: Package, label: "My Orders", desc: "Track shipments & history", to: "/account/orders" },
  { icon: Heart, label: "Wishlist", desc: "Items you've saved", to: "/account/wishlist" },
  { icon: Star, label: "Reviews", desc: "Manage your reviews", to: "/account/reviews" },
  { icon: Palette, label: "My Designs", desc: "Custom design library", to: "/account/designs" },
  { icon: FileText, label: "Design Orders", desc: "Orders with custom designs", to: "/account/design-orders" },
  { icon: CreditCard, label: "Credit Info", desc: "Balance & statements", to: "/account/credit-information" },
];

const recentOrders = [
  { id: "ORD-2026-1245", date: "2026-05-08", items: 3, total: 245.0, status: "Delivered" },
  { id: "ORD-2026-1238", date: "2026-05-03", items: 1, total: 79.99, status: "In Transit" },
  { id: "ORD-2026-1219", date: "2026-04-26", items: 5, total: 510.5, status: "Processing" },
];

const statusColors: Record<string, string> = {
  Delivered: "#16A34A",
  "In Transit": "#044c5c",
  Processing: "#C8956C",
};

export function DashboardPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <div className="mx-auto pt-6 pb-12 px-6" style={{ maxWidth: "1400px" }}>
        <nav className="mb-4">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link to="/" className="text-[#044c5c] hover:text-[#d41c5c] transition-colors">
                Home
              </Link>
            </li>
            <li className="text-[#2C2C2C]">/</li>
            <li className="text-[#2C2C2C]">Dashboard</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <AccountSidebar />

          <main className="flex-1 min-w-0">
            <div className="mb-5">
              <h1
                className="text-xl md:text-2xl mb-1"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Welcome back, Ahmed
              </h1>
              <p className="text-sm text-[#5B616A]">
                Here's a snapshot of your account activity
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {summaryCards.map((c) => (
                <div
                  key={c.label}
                  className="bg-white border border-[#E8DDD3] p-5"
                  style={{ borderRadius: 0 }}
                >
                  <div className="p-2.5 inline-flex mb-3" style={{ backgroundColor: c.bg, borderRadius: 0 }}>
                    <c.icon className="w-5 h-5" style={{ color: c.accent }} />
                  </div>
                  <div
                    className="text-2xl text-[#2C2C2C]"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    {c.value}
                  </div>
                  <div className="text-xs text-[#5B616A] mt-1">{c.label}</div>
                </div>
              ))}
            </div>

            <section className="bg-white border border-[#E8DDD3] p-6 mb-6" style={{ borderRadius: 0 }}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#E8F4F8]" style={{ borderRadius: 0 }}>
                    <TrendingUp className="w-6 h-6 text-[#044c5c]" />
                  </div>
                  <h2
                    className="text-xl text-[#2C2C2C]"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    Recent Orders
                  </h2>
                </div>
                <Link
                  to="/account/orders"
                  className="text-sm text-[#044c5c] hover:text-[#d41c5c] inline-flex items-center gap-1 transition-colors"
                >
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="divide-y divide-[#E6E8EB]">
                {recentOrders.map((o) => (
                  <div key={o.id} className="flex items-center justify-between py-3 flex-wrap gap-3">
                    <div>
                      <div className="text-sm font-semibold text-[#2C2C2C]">{o.id}</div>
                      <div className="text-xs text-[#5B616A]">
                        {o.date} · {o.items} {o.items === 1 ? "item" : "items"}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className="text-xs font-semibold px-2.5 py-1"
                        style={{
                          color: statusColors[o.status],
                          backgroundColor: `${statusColors[o.status]}15`,
                          borderRadius: 0,
                        }}
                      >
                        {o.status}
                      </span>
                      <div
                        className="text-sm font-semibold text-[#2C2C2C]"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        ${o.total.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border border-[#E8DDD3] p-6" style={{ borderRadius: 0 }}>
              <h2
                className="text-xl text-[#2C2C2C] mb-5"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Quick Links
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {quickLinks.map((q) => (
                  <Link
                    key={q.to}
                    to={q.to}
                    className="flex items-center gap-3 p-4 border border-[#E6E8EB] hover:border-[#044c5c] hover:bg-[#F2F8F9] transition-colors"
                    style={{ borderRadius: 0 }}
                  >
                    <div className="p-2 bg-[#E8F4F8]" style={{ borderRadius: 0 }}>
                      <q.icon className="w-5 h-5 text-[#044c5c]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#2C2C2C]">{q.label}</div>
                      <div className="text-xs text-[#5B616A] truncate">{q.desc}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#5B616A]" />
                  </Link>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
