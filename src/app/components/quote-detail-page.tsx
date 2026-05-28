import { Link, useParams } from "react-router";
import { ChevronLeft, ChevronRight, Clock, Home, Mail, MapPin, Phone, Printer, RotateCcw } from "./icons";

interface ProductLine {
  name: string;
  qty?: number;
  unitPrice?: number;
  amount: number;
  isHeader?: boolean;
}

interface QuoteDetail {
  id: string;
  total: number;
  currency: "AED" | "USD";
  orderDate: string;
  contact: {
    name: string;
    avatarUrl?: string;
  };
  shipping: {
    name: string;
    addressLines: string[];
    phone: string;
    email: string;
  };
  delivery: {
    code: string;
    date: string;
    status: "Preparation" | "Done" | "Cancelled";
  };
  lines: ProductLine[];
  termsUrl: string;
}

const QUOTE_DETAILS: Record<string, QuoteDetail> = {
  S00003: {
    id: "S00003",
    total: 11.0,
    currency: "AED",
    orderDate: "05/28/2026",
    contact: {
      name: "Darshan Babaria",
      avatarUrl: "https://i.pravatar.cc/64?img=12",
    },
    shipping: {
      name: "Darshan Babaria",
      addressLines: [
        "C/801 Dev Aurum Commercial",
        "Anandnagar Cross Road Prahalad Nagar,",
        "Satellite",
        "Ahmedabad 380015",
      ],
      phone: "9664986800",
      email: "admin@gmail.com",
    },
    delivery: {
      code: "WH/OUT/00005",
      date: "05/28/2026",
      status: "Preparation",
    },
    lines: [
      { name: "Simple Product", amount: 11.0, isHeader: true },
      { name: "Simple Product", qty: 1, unitPrice: 10.0, amount: 10.0 },
      { name: "Screen Printing (Location Front, Color 1)", qty: 1, unitPrice: 1.0, amount: 1.0 },
      { name: "[Magento_delivery_charges] Delivery charges", qty: 1, unitPrice: 0.0, amount: 0.0 },
      { name: "Additional Charge", qty: 1, unitPrice: 0.0, amount: 0.0 },
    ],
    termsUrl: "https://tezkargift.com/terms-and-conditions",
  },
};

function formatCurrency(amount: number, currency: "AED" | "USD") {
  const formatted = amount.toFixed(2);
  return currency === "USD" ? `$ ${formatted}` : `${formatted} AED`;
}

export function QuoteDetailPage() {
  const { id = "S00003" } = useParams<{ id: string }>();
  const detail = QUOTE_DETAILS[id] ?? QUOTE_DETAILS.S00003;

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <div
        className="mx-auto px-6 pt-5 pb-12"
        style={{ maxWidth: "1400px", fontFamily: "Inter, sans-serif" }}
      >
        {/* Top bar: breadcrumb + pagination arrows */}
        <div className="flex items-center justify-between mb-6">
          <nav>
            <ol className="flex items-center gap-2 text-sm">
              <li className="flex items-center">
                <Link
                  to="/account/dashboard"
                  aria-label="My Account"
                  className="text-[#044c5c] hover:text-[#d41c5c] transition-colors"
                >
                  <Home className="w-4 h-4" />
                </Link>
              </li>
              <li className="text-[#7A7A7A]">/</li>
              <li>
                <Link
                  to="/account/quotes"
                  className="text-[#044c5c] hover:text-[#d41c5c] transition-colors"
                >
                  Quotes
                </Link>
              </li>
              <li className="text-[#7A7A7A]">/</li>
              <li className="text-[#2C2C2C]">Sales Order {detail.id}</li>
            </ol>
          </nav>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous order"
              className="p-2 text-[#5B616A] hover:text-[#044c5c] hover:bg-[#F2F8F9] transition-colors border border-[#E8DDD3]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Next order"
              className="p-2 text-[#5B616A] hover:text-[#044c5c] hover:bg-[#F2F8F9] transition-colors border border-[#E8DDD3]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
          {/* Left aside */}
          <aside className="space-y-4">
            <div
              className="text-[#044c5c]"
              style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.1, fontFamily: "Poppins, sans-serif" }}
            >
              {formatCurrency(detail.total, detail.currency)}
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#044c5c] text-sm hover:bg-[#F2F8F9] transition-colors border border-[#044c5c]"
              style={{ fontWeight: 500 }}
            >
              <Printer className="w-4 h-4" />
              View Details
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#d41c5c] text-white text-sm hover:bg-[#b31650] transition-colors"
              style={{ fontWeight: 500 }}
            >
              <RotateCcw className="w-4 h-4" />
              Order Again
            </button>

            <div className="pt-2 space-y-2 text-sm">
              <Link to="#" className="block text-[#044c5c] hover:text-[#d41c5c] transition-colors">
                Sales Order - {detail.id}
              </Link>
              <Link to="#" className="block text-[#044c5c] hover:text-[#d41c5c] transition-colors">
                Communication history
              </Link>
            </div>

            <div className="pt-2">
              <div className="text-xs text-[#5B616A] mb-2" style={{ fontWeight: 500 }}>Your contact</div>
              <div className="flex items-center gap-3">
                {detail.contact.avatarUrl ? (
                  <img
                    src={detail.contact.avatarUrl}
                    alt={detail.contact.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#E8DDD3]" />
                )}
                <div>
                  <div className="text-sm text-[#2C2C2C]" style={{ fontWeight: 600 }}>
                    {detail.contact.name}
                  </div>
                  <Link to="#" className="text-xs text-[#044c5c] hover:text-[#d41c5c] transition-colors">
                    Send message
                  </Link>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full px-4 py-2.5 bg-[#044c5c] text-white text-sm hover:bg-[#033a48] transition-colors"
              style={{ fontWeight: 500 }}
            >
              Connect with your software!
            </button>

            <div className="pt-6 flex items-center gap-2 text-sm text-[#7A7A7A]">
              <span>Powered by</span>
              <span style={{ color: "#714B67", fontWeight: 700, fontSize: 22, letterSpacing: -0.5 }}>
                odoo
              </span>
            </div>
          </aside>

          {/* Right main content */}
          <main className="min-w-0 bg-white border border-[#E8DDD3] p-6 md:p-8">
            <h1
              className="text-[#2C2C2C] mb-8"
              style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.2, fontFamily: "Poppins, sans-serif" }}
            >
              Sales Order - <span style={{ color: "#044c5c" }}>{detail.id}</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
              {/* Sale Information */}
              <section>
                <h2
                  className="text-[#2C2C2C] pb-2 border-b border-[#E8DDD3] mb-3 uppercase tracking-wide"
                  style={{ fontSize: 13, fontWeight: 600, fontFamily: "Poppins, sans-serif", letterSpacing: "0.05em" }}
                >
                  Sale Information
                </h2>
                <div className="text-sm">
                  <span className="text-[#5B616A]" style={{ fontWeight: 500 }}>
                    Order Date:
                  </span>{" "}
                  <span className="text-[#2C2C2C]">{detail.orderDate}</span>
                </div>
              </section>

              {/* Invoicing and Shipping Address */}
              <section>
                <h2
                  className="text-[#2C2C2C] pb-2 border-b border-[#E8DDD3] mb-3 uppercase tracking-wide"
                  style={{ fontSize: 13, fontWeight: 600, fontFamily: "Poppins, sans-serif", letterSpacing: "0.05em" }}
                >
                  Invoicing and Shipping Address
                </h2>
                <div className="text-sm text-[#2C2C2C] space-y-1">
                  <div style={{ fontWeight: 600 }}>{detail.shipping.name}</div>
                  <div className="flex gap-2">
                    <MapPin className="w-3.5 h-3.5 mt-1 text-[#044c5c] flex-shrink-0" />
                    <div>
                      {detail.shipping.addressLines.map((line) => (
                        <div key={line}>{line}</div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <Phone className="w-3.5 h-3.5 text-[#044c5c]" />
                    <span>{detail.shipping.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#044c5c]" />
                    <span>{detail.shipping.email}</span>
                  </div>
                </div>
              </section>
            </div>

            {/* Last Delivery Orders */}
            <section className="mb-8">
              <h2
                className="text-[#2C2C2C] pb-2 border-b border-[#E8DDD3] mb-3 uppercase tracking-wide"
                style={{ fontSize: 13, fontWeight: 600, fontFamily: "Poppins, sans-serif", letterSpacing: "0.05em" }}
              >
                Last Delivery Orders
              </h2>
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <Link to="#" className="text-[#044c5c] hover:text-[#d41c5c] transition-colors text-sm" style={{ fontWeight: 600 }}>
                    {detail.delivery.code}
                  </Link>
                  <div className="text-xs text-[#5B616A] mt-1">Date: {detail.delivery.date}</div>
                </div>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs"
                  style={{
                    color: "#044c5c",
                    border: "1px solid #044c5c",
                    backgroundColor: "#F2F8F9",
                    borderRadius: 9999,
                    fontWeight: 600,
                  }}
                >
                  <Clock className="w-3 h-3" />
                  {detail.delivery.status}
                </span>
              </div>
            </section>

            {/* Products */}
            <section className="mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th
                      className="text-left px-3 py-3 text-xs text-[#2C2C2C] border-b border-[#E8DDD3] uppercase tracking-wider"
                      style={{ fontWeight: 600, fontFamily: "Poppins, sans-serif", letterSpacing: "0.05em" }}
                    >
                      Products
                    </th>
                    <th
                      className="text-right px-3 py-3 text-xs text-[#2C2C2C] border-b border-[#E8DDD3] whitespace-nowrap uppercase tracking-wider"
                      style={{ fontWeight: 600, fontFamily: "Poppins, sans-serif", letterSpacing: "0.05em" }}
                    >
                      Quantity
                    </th>
                    <th
                      className="text-right px-3 py-3 text-xs text-[#2C2C2C] border-b border-[#E8DDD3] whitespace-nowrap uppercase tracking-wider"
                      style={{ fontWeight: 600, fontFamily: "Poppins, sans-serif", letterSpacing: "0.05em" }}
                    >
                      Unit Price
                    </th>
                    <th
                      className="text-right px-3 py-3 text-xs text-[#2C2C2C] border-b border-[#E8DDD3] uppercase tracking-wider"
                      style={{ fontWeight: 600, fontFamily: "Poppins, sans-serif", letterSpacing: "0.05em" }}
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {detail.lines.map((line, i) => (
                    <tr key={`${line.name}-${i}`} className="border-b border-[#F0EBE5]">
                      <td
                        className={`px-3 py-3 text-sm text-[#2C2C2C] ${line.isHeader ? "" : "pl-6"}`}
                        style={{ fontWeight: line.isHeader ? 700 : 400 }}
                      >
                        {line.name}
                      </td>
                      <td className="px-3 py-3 text-sm text-[#2C2C2C] text-right whitespace-nowrap">
                        {line.isHeader ? "" : `${line.qty?.toFixed(2)} Units`}
                      </td>
                      <td className="px-3 py-3 text-sm text-[#2C2C2C] text-right whitespace-nowrap">
                        {line.isHeader || line.unitPrice === undefined
                          ? ""
                          : formatCurrency(line.unitPrice, detail.currency)}
                      </td>
                      <td
                        className="px-3 py-3 text-sm text-[#2C2C2C] text-right whitespace-nowrap"
                        style={{ fontWeight: line.isHeader ? 700 : 400 }}
                      >
                        {formatCurrency(line.amount, detail.currency)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-[#FAFAF8]">
                    <td colSpan={2} />
                    <td
                      className="px-3 py-4 text-sm text-[#2C2C2C] text-right"
                      style={{ fontWeight: 700 }}
                    >
                      Total
                    </td>
                    <td
                      className="px-3 py-4 text-base text-[#044c5c] text-right whitespace-nowrap"
                      style={{ fontWeight: 700, fontFamily: "Poppins, sans-serif" }}
                    >
                      {formatCurrency(detail.total, detail.currency)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Terms & Conditions */}
            <section>
              <h2
                className="text-[#2C2C2C] pb-2 border-b border-[#E8DDD3] mb-3 uppercase tracking-wide"
                style={{ fontSize: 13, fontWeight: 600, fontFamily: "Poppins, sans-serif", letterSpacing: "0.05em" }}
              >
                Terms &amp; Conditions
              </h2>
              <p className="text-sm">
                <span className="text-[#5B616A]" style={{ fontWeight: 500 }}>Terms &amp; Conditions: </span>
                <a href={detail.termsUrl} className="text-[#044c5c] hover:text-[#d41c5c] transition-colors">
                  {detail.termsUrl}
                </a>
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
