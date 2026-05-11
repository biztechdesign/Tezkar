import { Link } from "react-router";
import { AccountSidebar } from "./account-sidebar";
import { FileText, Eye, Download } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DesignOrder {
  id: string;
  design: string;
  thumbnail: string;
  product: string;
  quantity: number;
  total: number;
  placed: string;
  status: "Approved" | "Awaiting Approval" | "In Production" | "Shipped" | "Delivered" | "Rejected";
}

const orders: DesignOrder[] = [
  {
    id: "DO-2026-0145",
    design: "Company Anniversary T-Shirt",
    thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
    product: "Custom T-Shirt",
    quantity: 150,
    total: 1875.0,
    placed: "2026-05-09",
    status: "In Production",
  },
  {
    id: "DO-2026-0138",
    design: "Holiday Gift Bottle Branding",
    thumbnail: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop",
    product: "Custom Bottle",
    quantity: 200,
    total: 1640.0,
    placed: "2026-05-02",
    status: "Awaiting Approval",
  },
  {
    id: "DO-2026-0121",
    design: "Conference Polo Design",
    thumbnail: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200&h=200&fit=crop",
    product: "Custom Polo",
    quantity: 80,
    total: 1296.0,
    placed: "2026-04-25",
    status: "Shipped",
  },
  {
    id: "DO-2026-0102",
    design: "Team Notebook Cover",
    thumbnail: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=200&h=200&fit=crop",
    product: "Custom Notebook",
    quantity: 100,
    total: 850.0,
    placed: "2026-04-11",
    status: "Delivered",
  },
];

const statusColors: Record<DesignOrder["status"], { fg: string; bg: string }> = {
  Approved: { fg: "#16A34A", bg: "#F0FDF4" },
  "Awaiting Approval": { fg: "#C8956C", bg: "#FAF1E8" },
  "In Production": { fg: "#044c5c", bg: "#E8F4F8" },
  Shipped: { fg: "#044c5c", bg: "#E8F4F8" },
  Delivered: { fg: "#16A34A", bg: "#F0FDF4" },
  Rejected: { fg: "#d41c5c", bg: "#fdf0f5" },
};

export function DesignOrdersPage() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <div className="mx-auto pt-8 pb-[64px] px-6" style={{ maxWidth: "1400px" }}>
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link to="/" className="text-[#044c5c] hover:text-[#d41c5c] transition-colors">
                Home
              </Link>
            </li>
            <li className="text-[#2C2C2C]">/</li>
            <li className="text-[#2C2C2C]">My Design Orders</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <AccountSidebar />

          <main className="flex-1 min-w-0">
            <div className="mb-8">
              <h1
                className="text-2xl md:text-4xl mb-2 md:mb-3"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                My Design Orders
              </h1>
              <p className="text-[#2C2C2C] opacity-70">
                Orders that include your custom designs
              </p>
            </div>

            <div className="space-y-4">
              {orders.map((o) => {
                const s = statusColors[o.status];
                return (
                  <div
                    key={o.id}
                    className="bg-white border border-[#E8DDD3] p-5"
                    style={{ borderRadius: 0 }}
                  >
                    <div className="flex gap-4 flex-wrap">
                      <div
                        className="w-24 h-24 overflow-hidden shrink-0 bg-[#FAFAF8]"
                        style={{ borderRadius: 0 }}
                      >
                        <ImageWithFallback
                          src={o.thumbnail}
                          alt={o.design}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                          <div>
                            <h3
                              className="text-base text-[#2C2C2C]"
                              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                            >
                              {o.design}
                            </h3>
                            <p className="text-xs text-[#5B616A] mt-0.5">
                              {o.id} · {o.product} · Placed {o.placed}
                            </p>
                          </div>
                          <span
                            className="text-xs font-semibold px-3 py-1 uppercase tracking-wide"
                            style={{ color: s.fg, backgroundColor: s.bg, borderRadius: 0 }}
                          >
                            {o.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3 flex-wrap pt-3 border-t border-[#E6E8EB]">
                          <div className="flex items-center gap-4 text-sm text-[#5B616A]">
                            <span>
                              Qty:{" "}
                              <strong className="text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif" }}>
                                {o.quantity}
                              </strong>
                            </span>
                            <span>
                              Total:{" "}
                              <strong
                                className="text-[#044c5c]"
                                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                              >
                                ${o.total.toFixed(2)}
                              </strong>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#E6E8EB] text-[#044c5c] text-xs font-semibold hover:bg-[#F2F8F9] transition-colors"
                              style={{ borderRadius: 0 }}
                            >
                              <Eye className="w-3.5 h-3.5" /> View
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#E6E8EB] text-[#5B616A] text-xs font-semibold hover:bg-[#FAFAF8] transition-colors"
                              style={{ borderRadius: 0 }}
                            >
                              <Download className="w-3.5 h-3.5" /> Invoice
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {orders.length === 0 && (
                <div
                  className="bg-white border border-[#E8DDD3] p-16 text-center"
                  style={{ borderRadius: 0 }}
                >
                  <FileText className="w-12 h-12 text-[#5B616A] mx-auto mb-3" />
                  <p className="text-[#2C2C2C]">No design orders yet</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
