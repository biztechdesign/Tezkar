import { Link, useParams } from "react-router";
import { ArrowRight, AttachFile, Clock, Download, FileText, Home, MapPin, Phone } from "./icons";

const TEZKAR_LOGO = "https://i.ibb.co/392zr36F/tzkrgft-4.png";

interface InvoiceLine {
  description: string;
  qty?: number;
  unitPrice?: number;
  amountAed: number;
  amountUsd?: number;
  isHeader?: boolean;
}

interface InvoiceDetail {
  id: string;
  total: number;
  currency: "AED" | "USD";
  invoiceDate: string;
  dueDate: string;
  source: string;
  reference: string;
  dueLabel: string;
  salesperson: {
    name: string;
    avatarUrl?: string;
    city: string;
    phone: string;
  };
  billing: {
    name: string;
    addressLines: string[];
  };
  lines: InvoiceLine[];
  paymentCommunication: string;
  termsUrl: string;
}

const INVOICE_DETAILS: Record<string, InvoiceDetail> = {
  "INV/2026/00001": {
    id: "INV/2026/00001",
    total: 11.0,
    currency: "USD",
    invoiceDate: "05/28/2026",
    dueDate: "05/28/2026",
    source: "S00001",
    reference: "S00001",
    dueLabel: "Due today",
    salesperson: {
      name: "Sara Mohammed",
      avatarUrl: "https://i.pravatar.cc/64?img=47",
      city: "Dubai",
      phone: "+971 50 123 4567",
    },
    billing: {
      name: "Ahmed Al Mansoori",
      addressLines: [
        "Office 1204, Burj Al Salam",
        "Sheikh Zayed Road, Trade Centre",
        "Dubai 12345",
        "United Arab Emirates",
      ],
    },
    lines: [
      { description: "Simple Product", amountUsd: 11.0, amountAed: 11.0, isHeader: true },
      { description: "Simple Product", qty: 1, unitPrice: 10.0, amountUsd: 10.0, amountAed: 10.0 },
      {
        description: "Screen Printing (Location Front, Color 1)",
        qty: 1,
        unitPrice: 1.0,
        amountUsd: 1.0,
        amountAed: 1.0,
      },
      {
        description: "[Magento_delivery_charges] Delivery charges",
        qty: 1,
        unitPrice: 0.0,
        amountUsd: 0.0,
        amountAed: 0.0,
      },
      { description: "Additional Charge", qty: 1, unitPrice: 0.0, amountUsd: 0.0, amountAed: 0.0 },
    ],
    paymentCommunication: "INV/2026/00001",
    termsUrl: "https://tezkargift.com/terms-and-conditions",
  },
};

function formatUsd(amount: number) {
  return `$ ${amount.toFixed(2)}`;
}

function formatAed(amount: number) {
  return `${amount.toFixed(2)} AED`;
}

export function InvoiceDetailPage() {
  const { id = "INV/2026/00001" } = useParams<{ id: string }>();
  const detail = INVOICE_DETAILS[id] ?? INVOICE_DETAILS["INV/2026/00001"];

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <div
        className="mx-auto px-6 pt-5 pb-12"
        style={{ maxWidth: "1400px", fontFamily: "Inter, sans-serif" }}
      >
        {/* Breadcrumb */}
        <nav className="mb-6">
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
                to="/account/invoices"
                className="text-[#044c5c] hover:text-[#d41c5c] transition-colors"
              >
                Invoices &amp; Bills
              </Link>
            </li>
            <li className="text-[#7A7A7A]">/</li>
            <li className="text-[#2C2C2C]">{detail.id}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
          {/* Left aside */}
          <aside className="space-y-4">
            <div
              className="text-[#044c5c]"
              style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.1, fontFamily: "Poppins, sans-serif" }}
            >
              {formatUsd(detail.total)}
            </div>

            <div className="flex items-center gap-2 text-sm text-[#5B616A]">
              <Clock className="w-4 h-4 text-[#044c5c]" />
              <span>{detail.dueLabel}</span>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#d41c5c] text-white text-sm hover:bg-[#b31650] transition-colors"
              style={{ fontWeight: 500 }}
            >
              <ArrowRight className="w-4 h-4" />
              Pay Now
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#044c5c] text-sm hover:bg-[#F2F8F9] transition-colors border border-[#044c5c]"
              style={{ fontWeight: 500 }}
            >
              <Download className="w-4 h-4" />
              Download
            </button>

            <div className="pt-3">
              <div className="text-xs text-[#5B616A] mb-2" style={{ fontWeight: 500 }}>Salesperson</div>
              <div className="flex items-center gap-3">
                {detail.salesperson.avatarUrl ? (
                  <img
                    src={detail.salesperson.avatarUrl}
                    alt={detail.salesperson.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#E8DDD3]" />
                )}
                <div>
                  <div className="text-sm text-[#2C2C2C]" style={{ fontWeight: 600 }}>
                    {detail.salesperson.name}
                  </div>
                  <Link to="#" className="text-xs text-[#044c5c] hover:text-[#d41c5c] transition-colors">
                    Send message
                  </Link>
                </div>
              </div>
              <div className="mt-3 space-y-1.5 text-sm text-[#2C2C2C]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#044c5c]" />
                  <span>{detail.salesperson.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#044c5c]" />
                  <span>{detail.salesperson.phone}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Right main content */}
          <main className="min-w-0 bg-white border border-[#E8DDD3] p-6 md:p-10">
            {/* Logo + Company */}
            <div className="flex items-start justify-between flex-wrap gap-6 mb-8">
              <div>
                <img src={TEZKAR_LOGO} alt="TezkarGift" className="h-12 w-auto" />
              </div>
              <div className="text-sm text-[#2C2C2C]">
                <div style={{ fontWeight: 600 }}>{detail.billing.name}</div>
                {detail.billing.addressLines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>

            {/* Title */}
            <h1
              className="text-[#044c5c] mb-6"
              style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.2, fontFamily: "Poppins, sans-serif" }}
            >
              Proforma Invoice {detail.id}
            </h1>

            {/* Meta row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-5 border-b border-[#E8DDD3] mb-6">
              {[
                { label: "Invoice Date", value: detail.invoiceDate },
                { label: "Due Date", value: detail.dueDate },
                { label: "Source", value: detail.source },
                { label: "Reference", value: detail.reference },
              ].map((m) => (
                <div key={m.label}>
                  <div className="text-xs text-[#5B616A] uppercase mb-1" style={{ fontWeight: 600, letterSpacing: "0.04em", fontFamily: "Poppins, sans-serif" }}>
                    {m.label}
                  </div>
                  <div className="text-sm text-[#2C2C2C]">{m.value}</div>
                </div>
              ))}
            </div>

            {/* Line items */}
            <table className="w-full border-collapse mb-6" style={{ tableLayout: "auto" }}>
              <colgroup>
                <col />
                <col style={{ width: 90 }} />
                <col style={{ width: 110 }} />
                <col style={{ width: 130 }} />
              </colgroup>
              <thead>
                <tr>
                  <th
                    className="text-left px-3 py-3 text-xs text-[#2C2C2C] border-b border-[#E8DDD3] uppercase tracking-wider"
                    style={{ fontWeight: 600, fontFamily: "Poppins, sans-serif", letterSpacing: "0.05em" }}
                  >
                    Description
                  </th>
                  <th
                    className="text-right px-3 py-3 text-xs text-[#2C2C2C] border-b border-[#E8DDD3] uppercase tracking-wider whitespace-nowrap"
                    style={{ fontWeight: 600, fontFamily: "Poppins, sans-serif", letterSpacing: "0.05em" }}
                  >
                    Quantity
                  </th>
                  <th
                    className="text-right px-3 py-3 text-xs text-[#2C2C2C] border-b border-[#E8DDD3] uppercase tracking-wider whitespace-nowrap"
                    style={{ fontWeight: 600, fontFamily: "Poppins, sans-serif", letterSpacing: "0.05em" }}
                  >
                    Amount
                  </th>
                  <th
                    className="text-right px-3 py-3 text-xs text-[#2C2C2C] border-b border-[#E8DDD3] uppercase tracking-wider whitespace-nowrap"
                    style={{ fontWeight: 600, fontFamily: "Poppins, sans-serif", letterSpacing: "0.05em" }}
                  >
                    Amount (AED)
                  </th>
                </tr>
              </thead>
              <tbody>
                {detail.lines.map((line, i) => (
                  <tr key={`${line.description}-${i}`} className="border-b border-[#F0EBE5]">
                    <td
                      className={`px-3 py-3 text-sm text-[#2C2C2C] ${line.isHeader ? "" : "pl-6"}`}
                      style={{ fontWeight: line.isHeader ? 700 : 400 }}
                    >
                      {line.description}
                    </td>
                    <td className="px-3 py-3 text-sm text-[#2C2C2C] text-right whitespace-nowrap">
                      {line.isHeader || line.qty === undefined ? "" : line.qty.toFixed(2)}
                    </td>
                    <td
                      className="px-3 py-3 text-sm text-[#2C2C2C] text-right whitespace-nowrap"
                      style={{ fontWeight: line.isHeader ? 700 : 400 }}
                    >
                      {line.amountUsd !== undefined ? formatUsd(line.amountUsd) : ""}
                    </td>
                    <td
                      className="px-3 py-3 text-sm text-[#2C2C2C] text-right whitespace-nowrap"
                      style={{ fontWeight: line.isHeader ? 700 : 400 }}
                    >
                      {formatAed(line.amountAed)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#FAFAF8]">
                  <td colSpan={2} />
                  <td
                    className="px-3 py-4 text-sm text-[#044c5c] text-right whitespace-nowrap"
                    style={{ fontWeight: 700, fontFamily: "Poppins, sans-serif" }}
                  >
                    Total
                  </td>
                  <td
                    className="px-3 py-4 text-base text-[#044c5c] text-right whitespace-nowrap"
                    style={{ fontWeight: 700, fontFamily: "Poppins, sans-serif" }}
                  >
                    {formatUsd(detail.total)}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="text-sm text-[#2C2C2C] mb-2">
              <span className="text-[#5B616A]" style={{ fontWeight: 500 }}>Payment Communication: </span>
              <span style={{ fontWeight: 600 }}>{detail.paymentCommunication}</span>
            </div>
            <div className="text-sm">
              <span className="text-[#5B616A]" style={{ fontWeight: 500 }}>Terms &amp; Conditions: </span>
              <a href={detail.termsUrl} className="text-[#044c5c] hover:text-[#d41c5c] transition-colors">
                {detail.termsUrl}
              </a>
            </div>
          </main>
        </div>

        {/* Communication history */}
        <section className="mt-10 max-w-[1100px]">
          <h2
            className="text-[#2C2C2C] mb-4"
            style={{ fontSize: 22, fontWeight: 600, fontFamily: "Poppins, sans-serif" }}
          >
            Communication history
          </h2>
          <div className="flex items-start gap-3 bg-white border border-[#E8DDD3] p-4">
            <img
              src={detail.salesperson.avatarUrl}
              alt={detail.salesperson.name}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <input
                type="text"
                placeholder="Write a message..."
                className="w-full px-3 py-2 border border-[#E6E8EB] text-sm text-[#2C2C2C] focus:outline-none focus:border-[#044c5c] bg-white"
                style={{ borderRadius: 0 }}
              />
              <div className="flex items-center justify-between mt-3">
                <button
                  type="button"
                  className="px-4 py-1.5 bg-[#044c5c] text-white text-sm hover:bg-[#033a48] transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  Send
                </button>
                <div className="flex items-center gap-3 text-[#5B616A]">
                  <button
                    type="button"
                    aria-label="Attach file"
                    className="p-1 hover:text-[#044c5c] transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Attach"
                    className="p-1 hover:text-[#044c5c] transition-colors"
                  >
                    <AttachFile className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
