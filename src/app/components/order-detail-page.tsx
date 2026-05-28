import { Link, useParams } from "react-router";
import { AccountSidebar } from "./account-sidebar";
import { Printer } from "./icons";

type OrderStatus = "Pending" | "Processing" | "In Transit" | "Delivered" | "Cancelled";

interface OrderLine {
  name: string;
  sku: string;
  attrs: { label: string; value: string }[];
  price: number;
  qty: number;
}

interface Address {
  name: string;
  street: string;
  cityLine: string;
  phone: string;
}

interface OrderDetail {
  id: string;
  status: OrderStatus;
  dateLong: string; // "20 May, 2026"
  items: OrderLine[];
  subtotal: number;
  shipping: number;
  grandExcl: number;
  grandIncl: number;
  shippingAddress: Address;
  billingAddress: Address;
  payment: string;
  shippingMethod: string;
}

const FALLBACK_ORDER: OrderDetail = {
  id: "4000000003",
  status: "Pending",
  dateLong: "20 May, 2026",
  items: [
    {
      name: "Test Configurable RFQ",
      sku: "Test Configurable RFQ-Blue-55 cm",
      attrs: [
        { label: "Color", value: "Blue" },
        { label: "Size", value: "55 cm" },
        { label: "Regular product", value: "Yes" },
      ],
      price: 10.0,
      qty: 1,
    },
  ],
  subtotal: 10.0,
  shipping: 5.0,
  grandExcl: 15.0,
  grandIncl: 15.0,
  shippingAddress: {
    name: "Anjana Solanki",
    street: "Address: asd a, das",
    cityLine: "Ahmedabad, Dubai, 380058, United Arab Emirates",
    phone: "7894561230",
  },
  billingAddress: {
    name: "Anjana Solanki",
    street: "Address: asd a, das",
    cityLine: "Ahmedabad, Dubai, 380058, United Arab Emirates",
    phone: "7894561230",
  },
  payment: "Check / Money order",
  shippingMethod: "Flat Rate - Fixed",
};

const statusStyle: Record<OrderStatus, { fg: string; bg: string }> = {
  Pending: { fg: "#8A5A1A", bg: "#FCEFAA" },
  Processing: { fg: "#044c5c", bg: "#E8F4F8" },
  "In Transit": { fg: "#1F4DA1", bg: "#E6EEFB" },
  Delivered: { fg: "#1F7A2E", bg: "#E6F4E9" },
  Cancelled: { fg: "#A1142D", bg: "#FBE3E8" },
};

function AddressCard({
  address,
  badge,
}: {
  address: Address;
  badge: "Shipping" | "Billing";
}) {
  return (
    <div className="border border-[#E8DDD3] p-5" style={{ borderRadius: 0 }}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3
          className="text-base text-[#2C2C2C]"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
        >
          {address.name}
        </h3>
        <span
          className="text-[11px] uppercase tracking-wider text-[#5B616A] border border-[#E6E8EB] px-2.5 py-0.5"
          style={{ fontFamily: "Inter, sans-serif", borderRadius: 9999 }}
        >
          {badge}
        </span>
      </div>
      <div
        className="text-sm text-[#5B616A] space-y-1.5 leading-relaxed"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <p>{address.street}</p>
        <p>{address.cityLine}</p>
        <p>
          <span className="text-[#2C2C2C]">Phone:</span> {address.phone}
        </p>
      </div>
    </div>
  );
}

export function OrderDetailPage() {
  const params = useParams<{ orderId?: string }>();
  const order: OrderDetail = { ...FALLBACK_ORDER, id: params.orderId ?? FALLBACK_ORDER.id };
  const s = statusStyle[order.status];

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
            <li>
              <Link
                to="/account/orders"
                className="text-[#044c5c] hover:text-[#d41c5c] transition-colors"
              >
                My Orders
              </Link>
            </li>
            <li className="text-[#2C2C2C]">/</li>
            <li className="text-[#2C2C2C]">#{order.id}</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <AccountSidebar />

          <main className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1
                    className="text-xl md:text-2xl text-[#2C2C2C]"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    Order #{order.id}
                  </h1>
                  <span
                    className="inline-flex items-center px-3 py-1 text-xs font-semibold"
                    style={{
                      color: s.fg,
                      backgroundColor: s.bg,
                      borderRadius: 9999,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-[#5B616A] mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                  {order.dateLong}
                </p>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 text-sm text-[#044c5c] hover:text-[#d41c5c] transition-colors"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
              >
                <Printer className="w-4 h-4" strokeWidth={1.8} />
                <span className="underline underline-offset-4">Print Order</span>
              </button>
            </div>

            {/* Tab strip */}
            <div className="border-b border-[#E8DDD3] mb-4">
              <button
                type="button"
                className="relative text-sm uppercase tracking-wider px-1 pb-3 text-[#044c5c]"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                }}
              >
                Items Ordered
                <span
                  className="absolute left-0 right-0 -bottom-px h-0.5 bg-[#044c5c]"
                />
              </button>
            </div>

            {/* Items card */}
            <section
              className="bg-white border border-[#E8DDD3] mb-8"
              style={{ borderRadius: 0 }}
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse">
                  <thead>
                    <tr>
                      <th
                        className="text-left px-6 py-4 text-xs text-[#2C2C2C] uppercase tracking-wider border-b border-[#E8DDD3]"
                        style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, letterSpacing: "0.05em" }}
                      >
                        Product Name
                      </th>
                      <th
                        className="text-left px-6 py-4 text-xs text-[#2C2C2C] uppercase tracking-wider border-b border-[#E8DDD3]"
                        style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, letterSpacing: "0.05em" }}
                      >
                        Price
                      </th>
                      <th
                        className="text-left px-6 py-4 text-xs text-[#2C2C2C] uppercase tracking-wider border-b border-[#E8DDD3]"
                        style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, letterSpacing: "0.05em" }}
                      >
                        Qty
                      </th>
                      <th
                        className="text-left px-6 py-4 text-xs text-[#2C2C2C] uppercase tracking-wider border-b border-[#E8DDD3]"
                        style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, letterSpacing: "0.05em" }}
                      >
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((it, i) => (
                      <tr key={i} className="border-b border-[#F0EBE5] last:border-b-0">
                        <td className="px-6 py-5 align-top">
                          <p
                            className="text-sm text-[#044c5c] mb-2"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {it.name}
                          </p>
                          <p className="text-xs text-[#5B616A] mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
                            <span className="text-[#2C2C2C] font-medium">SKU:</span> {it.sku}
                          </p>
                          {it.attrs.map((a) => (
                            <p
                              key={a.label}
                              className="text-xs text-[#5B616A]"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              <span className="text-[#2C2C2C] font-medium">{a.label}:</span> {a.value}
                            </p>
                          ))}
                        </td>
                        <td
                          className="px-6 py-5 text-sm text-[#2C2C2C] align-top whitespace-nowrap"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          ${it.price.toFixed(2)}
                        </td>
                        <td
                          className="px-6 py-5 text-sm text-[#5B616A] align-top whitespace-nowrap"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          Ordered: {it.qty}
                        </td>
                        <td
                          className="px-6 py-5 text-sm text-[#2C2C2C] align-top whitespace-nowrap"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          ${(it.price * it.qty).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="bg-[#FAFAF8] border-t border-[#E8DDD3] px-6 py-5">
                <div className="ml-auto max-w-md space-y-2.5">
                  {[
                    { label: "Subtotal", value: order.subtotal, strong: false },
                    { label: "Shipping & Handling", value: order.shipping, strong: false },
                    { label: "Grand Total (Excl. Tax)", value: order.grandExcl, strong: true },
                    { label: "Grand Total (Incl. Tax)", value: order.grandIncl, strong: true },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                      <span
                        className={row.strong ? "text-[#2C2C2C]" : "text-[#5B616A]"}
                        style={row.strong ? { fontWeight: 600 } : undefined}
                      >
                        {row.label}
                      </span>
                      <span
                        className="text-[#2C2C2C]"
                        style={row.strong ? { fontWeight: 600 } : undefined}
                      >
                        ${row.value.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Order Information */}
            <div className="mb-3">
              <h2
                className="text-lg text-[#2C2C2C]"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Order Information
              </h2>
              <div className="border-b border-[#E8DDD3] mt-2 mb-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AddressCard address={order.shippingAddress} badge="Shipping" />
              <AddressCard address={order.billingAddress} badge="Billing" />
              <div className="border border-[#E8DDD3] p-5" style={{ borderRadius: 0 }}>
                <h3
                  className="text-base text-[#2C2C2C] mb-3"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  Method Information
                </h3>
                <div
                  className="text-sm text-[#5B616A] space-y-1.5"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <p>
                    <span className="text-[#2C2C2C] font-medium">Payment:</span> {order.payment}
                  </p>
                  <p>
                    <span className="text-[#2C2C2C] font-medium">Shipping:</span> {order.shippingMethod}
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
