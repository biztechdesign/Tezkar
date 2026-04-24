import { Link } from "react-router";
import { useState } from "react";
import { AccountSidebar } from "./account-sidebar";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ChevronLeft,
  ChevronRight,
  Download,
  RotateCcw,
} from "lucide-react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import BadgeIcon from '@mui/icons-material/Badge';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Mock data for orders
const orders = [
  {
    id: 1,
    orderNumber: "ORD-2026-1456",
    date: "2026-03-30",
    status: "delivered",
    items: 3,
    total: 285.50,
    trackingNumber: "TRK-9876543210",
    products: [
      { name: "Premium Stainless Steel Bottle", quantity: 2, price: 75.00 },
      { name: "Custom Printed T-Shirt", quantity: 1, price: 135.50 },
    ],
  },
  {
    id: 2,
    orderNumber: "ORD-2026-1432",
    date: "2026-03-28",
    status: "in_transit",
    items: 1,
    total: 150.00,
    trackingNumber: "TRK-9876543211",
    products: [
      { name: "Ceramic Mug Set", quantity: 1, price: 150.00 },
    ],
  },
  {
    id: 3,
    orderNumber: "ORD-2026-1398",
    date: "2026-03-25",
    status: "processing",
    items: 5,
    total: 420.00,
    trackingNumber: null,
    products: [
      { name: "Corporate Gift Box", quantity: 5, price: 84.00 },
    ],
  },
  {
    id: 4,
    orderNumber: "ORD-2026-1356",
    date: "2026-03-20",
    status: "delivered",
    items: 2,
    total: 195.00,
    trackingNumber: "TRK-9876543212",
    products: [
      { name: "Leather Notebook", quantity: 2, price: 97.50 },
    ],
  },
  {
    id: 5,
    orderNumber: "ORD-2026-1298",
    date: "2026-03-15",
    status: "cancelled",
    items: 1,
    total: 89.99,
    trackingNumber: null,
    products: [
      { name: "USB Flash Drive Set", quantity: 1, price: 89.99 },
    ],
  },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "delivered":
      return {
        label: "Delivered",
        icon: CheckCircle,
        color: "#2F8F3A",
        bg: "#F0F9F4",
      };
    case "in_transit":
      return {
        label: "In Transit",
        icon: Truck,
        color: "#044c5c",
        bg: "#E8F4F8",
      };
    case "processing":
      return {
        label: "Processing",
        icon: Clock,
        color: "#C8956C",
        bg: "#FBF7F3",
      };
    case "cancelled":
      return {
        label: "Cancelled",
        icon: XCircle,
        color: "#D92D20",
        bg: "#FEF3F2",
      };
    default:
      return {
        label: "Unknown",
        icon: Package,
        color: "#8A9199",
        bg: "#F7F8FA",
      };
  }
};

const accountQueries = [
  {
    id: "create-order",
    title: "Create New Order",
    description: "Place a new order directly from your account",
    Icon: AddShoppingCartIcon,
    cta: "Start Order",
    tint: "#044c5c",
    tintBg: "#E8F4F8",
  },
  {
    id: "lpo",
    title: "LPO Attachment",
    description: "Attach a Local Purchase Order against an existing order",
    Icon: AttachFileIcon,
    cta: "Upload LPO",
    tint: "#044c5c",
    tintBg: "#E8F4F8",
  },
  {
    id: "kyc",
    title: "KYC Updation",
    description: "Update TRN, address, bank information and other KYC details",
    Icon: BadgeIcon,
    cta: "Update KYC",
    tint: "#2F8F3A",
    tintBg: "#F0F9F4",
  },
  {
    id: "docs-expiry",
    title: "Legal Docs Expiry",
    description: "Renew owner passport, Emirates ID, trade license and other expiring docs",
    Icon: EventBusyIcon,
    cta: "Update Docs",
    tint: "#C8956C",
    tintBg: "#FBF7F3",
  },
  {
    id: "multi-currency",
    title: "Multi Currency",
    description: "Switch your billing currency between assigned ledgers",
    Icon: CurrencyExchangeIcon,
    cta: "Change Currency",
    tint: "#044c5c",
    tintBg: "#E8F4F8",
  },
  {
    id: "return-goods",
    title: "Return of Goods",
    description: "Raise a return against an invoice — routed to warehouse approval",
    Icon: AssignmentReturnIcon,
    cta: "Request Return",
    tint: "#d41c5c",
    tintBg: "#FDE8F0",
  },
  {
    id: "credit-note",
    title: "Tax Credit Note",
    description: "View & download approved tax credit notes for returned goods",
    Icon: ReceiptLongIcon,
    cta: "View Credit Notes",
    tint: "#d41c5c",
    tintBg: "#FDE8F0",
  },
];

export function OrdersPage() {
  const [activeQuery, setActiveQuery] = useState<string | null>(null);

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <div
        className="mx-auto pt-8 pb-[64px] px-6"
        style={{ maxWidth: "1400px" }}
      >
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link
                to="/"
                className="text-[#044c5c] hover:text-[#d41c5c] transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="text-[#2C2C2C]">/</li>
            <li className="text-[#2C2C2C]">My Orders</li>
          </ol>
        </nav>

        {/* Two-column layout */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <AccountSidebar />

          {/* Main Content */}
          <main className="flex-1">
            {/* Page Header */}
            <div className="mb-8">
              <h1
                className="text-4xl mb-3"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                My Orders
              </h1>
              <p className="text-[#5B616A]" style={{ fontFamily: "Inter, sans-serif" }}>
                Track and manage all your orders in one place
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 border border-[#E6E8EB]" style={{ borderRadius: 0 }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[#F0F9F4]" style={{ borderRadius: 0 }}>
                    <CheckCircle className="w-5 h-5 text-[#2F8F3A]" />
                  </div>
                  <span className="text-2xl font-semibold text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    32
                  </span>
                </div>
                <p className="text-sm text-[#5B616A]" style={{ fontFamily: "Inter, sans-serif" }}>
                  Completed
                </p>
              </div>

              <div className="bg-white p-6 border border-[#E6E8EB]" style={{ borderRadius: 0 }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[#E8F4F8]" style={{ borderRadius: 0 }}>
                    <Truck className="w-5 h-5 text-[#044c5c]" />
                  </div>
                  <span className="text-2xl font-semibold text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    1
                  </span>
                </div>
                <p className="text-sm text-[#5B616A]" style={{ fontFamily: "Inter, sans-serif" }}>
                  In Transit
                </p>
              </div>

              <div className="bg-white p-6 border border-[#E6E8EB]" style={{ borderRadius: 0 }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[#FBF7F3]" style={{ borderRadius: 0 }}>
                    <Clock className="w-5 h-5 text-[#C8956C]" />
                  </div>
                  <span className="text-2xl font-semibold text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    1
                  </span>
                </div>
                <p className="text-sm text-[#5B616A]" style={{ fontFamily: "Inter, sans-serif" }}>
                  Processing
                </p>
              </div>

              <div className="bg-white p-6 border border-[#E6E8EB]" style={{ borderRadius: 0 }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[#FEF3F2]" style={{ borderRadius: 0 }}>
                    <XCircle className="w-5 h-5 text-[#D92D20]" />
                  </div>
                  <span className="text-2xl font-semibold text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    3
                  </span>
                </div>
                <p className="text-sm text-[#5B616A]" style={{ fontFamily: "Inter, sans-serif" }}>
                  Cancelled
                </p>
              </div>
            </div>

            {/* Account Services & Requests */}
            <div className="mb-8">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <h2 className="text-xl text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                    Account Services & Requests
                  </h2>
                  <p className="text-sm text-[#5B616A] mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                    Quick actions for orders, compliance documents, returns and credit notes.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {accountQueries.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => setActiveQuery(q.id)}
                    className="bg-white border border-[#E6E8EB] p-5 text-left hover:border-[#044c5c] hover:shadow-md transition-all group"
                    style={{ borderRadius: 0 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2.5" style={{ backgroundColor: q.tintBg, borderRadius: 0 }}>
                        <q.Icon sx={{ fontSize: 22, color: q.tint }} />
                      </div>
                      <ArrowForwardIcon
                        sx={{
                          fontSize: 18,
                          color: "#8A9199",
                          transition: "transform 0.2s, color 0.2s",
                        }}
                        className="group-hover:text-[#044c5c] group-hover:translate-x-1"
                      />
                    </div>
                    <h3 className="text-[15px] font-semibold text-[#2C2C2C] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                      {q.title}
                    </h3>
                    <p className="text-xs text-[#5B616A] leading-relaxed mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
                      {q.description}
                    </p>
                    <span
                      className="text-xs font-semibold uppercase tracking-wide"
                      style={{ color: q.tint, fontFamily: "Poppins, sans-serif" }}
                    >
                      {q.cta} →
                    </span>
                  </button>
                ))}
              </div>
              {activeQuery && (
                <div className="mt-4 bg-[#E8F4F8] border-l-4 border-[#044c5c] p-4 flex items-center justify-between" style={{ borderRadius: 0 }}>
                  <span className="text-sm text-[#2C2C2C]" style={{ fontFamily: "Inter, sans-serif" }}>
                    <strong>{accountQueries.find(q => q.id === activeQuery)?.title}</strong> — action panel will open here. (Wire to your backend / modal.)
                  </span>
                  <button
                    onClick={() => setActiveQuery(null)}
                    className="text-xs text-[#5B616A] hover:text-[#044c5c] transition-colors"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {orders.map((order) => {
                const statusConfig = getStatusConfig(order.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={order.id}
                    className="bg-white border border-[#E6E8EB] overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    style={{ borderRadius: 0 }}
                  >
                    {/* Order Header */}
                    <div className="p-6 border-b border-[#E6E8EB] bg-[#FAFAF8]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div>
                            <p className="text-xs text-[#8A9199] mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
                              ORDER NUMBER
                            </p>
                            <p className="font-semibold text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif" }}>
                              {order.orderNumber}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-[#8A9199] mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
                              DATE
                            </p>
                            <p className="text-[#2C2C2C]" style={{ fontFamily: "Inter, sans-serif" }}>
                              {new Date(order.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-[#8A9199] mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
                              TOTAL
                            </p>
                            <p className="font-semibold text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif" }}>
                              ${order.total.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-[#8A9199] mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
                              ITEMS
                            </p>
                            <p className="text-[#2C2C2C]" style={{ fontFamily: "Inter, sans-serif" }}>
                              {order.items}
                            </p>
                          </div>
                        </div>

                        <div
                          className="flex items-center gap-2 px-4 py-2"
                          style={{ backgroundColor: statusConfig.bg, borderRadius: 0 }}
                        >
                          <StatusIcon className="w-4 h-4" style={{ color: statusConfig.color }} />
                          <span
                            className="text-sm font-medium"
                            style={{ color: statusConfig.color, fontFamily: "Inter, sans-serif" }}
                          >
                            {statusConfig.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Order Products */}
                    <div className="p-6">
                      <div className="space-y-3 mb-6">
                        {order.products.map((product, idx) => (
                          <div key={idx} className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                              <div className="w-16 h-16 bg-[#F7F8FA] flex items-center justify-center" style={{ borderRadius: 0 }}>
                                <Package className="w-6 h-6 text-[#8A9199]" />
                              </div>
                              <div>
                                <p className="font-medium text-[#2C2C2C]" style={{ fontFamily: "Inter, sans-serif" }}>
                                  {product.name}
                                </p>
                                <p className="text-sm text-[#8A9199]" style={{ fontFamily: "Inter, sans-serif" }}>
                                  Quantity: {product.quantity}
                                </p>
                              </div>
                            </div>
                            <p className="font-semibold text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif" }}>
                              ${product.price.toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Order Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#E6E8EB]">
                        {order.trackingNumber && (
                          <p className="text-sm text-[#5B616A]" style={{ fontFamily: "Inter, sans-serif" }}>
                            Tracking: <span className="font-medium text-[#2C2C2C]">{order.trackingNumber}</span>
                          </p>
                        )}
                        {!order.trackingNumber && <div></div>}

                        <div className="flex items-center gap-3">
                          {order.status === "delivered" && (
                            <>
                              <button
                                className="flex items-center gap-2 px-4 py-2 text-[#044c5c] border-2 border-[#044c5c] hover:bg-[#044c5c] hover:text-white transition-all duration-300"
                                style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, borderRadius: 0 }}
                              >
                                <RotateCcw className="w-4 h-4" />
                                Reorder
                              </button>
                              <button
                                className="flex items-center gap-2 px-4 py-2 text-white bg-[#044c5c] hover:bg-[#d41c5c] transition-all duration-300"
                                style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, borderRadius: 0 }}
                              >
                                <Download className="w-4 h-4" />
                                Invoice
                              </button>
                            </>
                          )}
                          {order.status === "in_transit" && (
                            <button
                              className="flex items-center gap-2 px-4 py-2 text-white bg-[#044c5c] hover:bg-[#d41c5c] transition-all duration-300"
                              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, borderRadius: 0 }}
                            >
                              <Truck className="w-4 h-4" />
                              Track Order
                            </button>
                          )}
                          {order.status === "processing" && (
                            <button
                              className="flex items-center gap-2 px-4 py-2 text-[#d41c5c] border-2 border-[#d41c5c] hover:bg-[#d41c5c] hover:text-white transition-all duration-300"
                              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, borderRadius: 0 }}
                            >
                              <XCircle className="w-4 h-4" />
                              Cancel Order
                            </button>
                          )}
                          <button
                            className="flex items-center gap-2 px-4 py-2 text-[#044c5c] border-2 border-[#044c5c] hover:bg-[#044c5c] hover:text-white transition-all duration-300"
                            style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, borderRadius: 0 }}
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8">
              <p className="text-sm text-[#5B616A]" style={{ fontFamily: "Inter, sans-serif" }}>
                Showing 1 to 5 of 37 orders
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 text-[#8A9199] border border-[#E6E8EB] hover:bg-[#044c5c] hover:text-white hover:border-[#044c5c] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ borderRadius: 0 }}
                  disabled
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  className="px-4 py-2 bg-[#044c5c] text-white font-medium"
                  style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                >
                  1
                </button>
                <button
                  className="px-4 py-2 text-[#2C2C2C] border border-[#E6E8EB] hover:bg-[#044c5c] hover:text-white hover:border-[#044c5c] transition-all duration-300"
                  style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                >
                  2
                </button>
                <button
                  className="px-4 py-2 text-[#2C2C2C] border border-[#E6E8EB] hover:bg-[#044c5c] hover:text-white hover:border-[#044c5c] transition-all duration-300"
                  style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                >
                  3
                </button>
                <button
                  className="p-2 text-[#2C2C2C] border border-[#E6E8EB] hover:bg-[#044c5c] hover:text-white hover:border-[#044c5c] transition-all duration-300"
                  style={{ borderRadius: 0 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}