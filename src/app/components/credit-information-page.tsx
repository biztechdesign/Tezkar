import { Link } from "react-router";
import { ArrowRight, ChevronDown, Clock, Home } from "./icons";
import { useState } from "react";
import { AccountSidebar } from "./account-sidebar";

type InvoiceStatus = "Waiting for Payment" | "Paid" | "Overdue";
type SortKey = "Date" | "Invoice #" | "Amount";
type FilterKey = "Invoices" | "Bills" | "All";

interface InvoiceRow {
  id: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  currency: "AED" | "USD";
  status: InvoiceStatus;
}

const invoices: InvoiceRow[] = [
  {
    id: "INV/2026/00001",
    invoiceDate: "05/28/2026",
    dueDate: "05/28/2026",
    amount: 11.0,
    currency: "USD",
    status: "Waiting for Payment",
  },
];

const statusStyle: Record<InvoiceStatus, { fg: string; bd: string }> = {
  "Waiting for Payment": { fg: "#1F7AA8", bd: "#B3DEEC" },
  Paid: { fg: "#1F7A2E", bd: "#B7D8BD" },
  Overdue: { fg: "#A1142D", bd: "#E6B3BF" },
};

function formatAmount(row: InvoiceRow) {
  const amount = row.amount.toFixed(2);
  return row.currency === "USD" ? `$ ${amount}` : `${amount} AED`;
}

function Dropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-[#2C2C2C]" style={{ fontWeight: 500 }}>
        {label}:
      </span>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className="inline-flex items-center gap-3 px-4 py-1.5 border border-[#E6E8EB] bg-white text-sm text-[#2C2C2C] hover:border-[#2E8B57] transition-colors"
        >
          {value}
          <ChevronDown className="w-3 h-3 text-[#5B616A]" />
        </button>
        {open && (
          <div className="absolute right-0 top-full mt-1 min-w-[140px] bg-white border border-[#E6E8EB] shadow-md z-20">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onMouseDown={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-[#F4FBF6] transition-colors ${
                  value === opt ? "text-[#2E8B57]" : "text-[#2C2C2C]"
                }`}
                style={{ fontWeight: value === opt ? 600 : 400 }}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function CreditInformationPage() {
  const [sortBy, setSortBy] = useState<SortKey>("Date");
  const [filterBy, setFilterBy] = useState<FilterKey>("Invoices");

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <div
        className="mx-auto px-6 pt-6 pb-12"
        style={{ maxWidth: "1400px", fontFamily: "Inter, sans-serif" }}
      >
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <AccountSidebar />

          <main className="flex-1 min-w-0 bg-white">
            <div className="px-5 pt-5 pb-8">
              {/* Breadcrumb + Sort/Filter */}
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <nav>
                  <ol className="flex items-center gap-2 text-sm">
                    <li className="flex items-center">
                      <Link
                        to="/account/dashboard"
                        aria-label="My Account"
                        className="text-[#2E8B57] hover:text-[#226b42] transition-colors"
                      >
                        <Home className="w-4 h-4" />
                      </Link>
                    </li>
                    <li className="text-[#7A7A7A]">/</li>
                    <li className="text-[#7A7A7A]">Invoices &amp; Bills</li>
                  </ol>
                </nav>

                <div className="flex items-center gap-4 flex-wrap">
                  <Dropdown
                    label="Sort By"
                    value={sortBy}
                    options={["Date", "Invoice #", "Amount"]}
                    onChange={(v) => setSortBy(v as SortKey)}
                  />
                  <Dropdown
                    label="Filter By"
                    value={filterBy}
                    options={["Invoices", "Bills", "All"]}
                    onChange={(v) => setFilterBy(v as FilterKey)}
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse">
                  <thead>
                    <tr>
                      <th
                        className="text-left px-4 py-3 text-sm text-[#2C2C2C] border-b border-[#E6E8EB]"
                        style={{ fontWeight: 700 }}
                      >
                        Invoice #
                      </th>
                      <th
                        className="text-left px-4 py-3 text-sm text-[#2C2C2C] border-b border-[#E6E8EB]"
                        style={{ fontWeight: 700 }}
                      >
                        Invoice Date
                      </th>
                      <th
                        className="text-left px-4 py-3 text-sm text-[#2C2C2C] border-b border-[#E6E8EB]"
                        style={{ fontWeight: 700 }}
                      >
                        Due Date
                      </th>
                      <th
                        className="text-right px-4 py-3 text-sm text-[#2C2C2C] border-b border-[#E6E8EB] whitespace-nowrap"
                        style={{ fontWeight: 700 }}
                      >
                        Amount Due
                      </th>
                      <th
                        className="text-right px-4 py-3 text-sm text-[#2C2C2C] border-b border-[#E6E8EB]"
                        style={{ fontWeight: 700 }}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((inv) => {
                      const s = statusStyle[inv.status];
                      return (
                        <tr
                          key={inv.id}
                          className="border-b border-[#EDEFF2] hover:bg-[#FAFBFC] transition-colors"
                        >
                          <td className="px-4 py-3 text-sm text-[#2E8B57]">
                            <Link
                              to={`/account/invoices/${encodeURIComponent(inv.id)}`}
                              className="hover:underline"
                            >
                              {inv.id}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-sm text-[#2C2C2C] whitespace-nowrap">
                            {inv.invoiceDate}
                          </td>
                          <td className="px-4 py-3 text-sm text-[#2C2C2C] whitespace-nowrap">
                            {inv.dueDate}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="inline-flex items-center gap-2 whitespace-nowrap">
                              <span className="text-sm text-[#2C2C2C]" style={{ fontWeight: 600 }}>
                                {formatAmount(inv)}
                              </span>
                              <span
                                className="inline-flex items-center gap-1.5 px-3 py-0.5 text-xs"
                                style={{
                                  color: s.fg,
                                  border: `1px solid ${s.bd}`,
                                  backgroundColor: "#FFFFFF",
                                  borderRadius: 9999,
                                  fontWeight: 600,
                                }}
                              >
                                <Clock className="w-3 h-3" />
                                {inv.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            {inv.status === "Waiting for Payment" && (
                              <button
                                type="button"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1F7A3A] text-white text-xs hover:bg-[#176330] transition-colors"
                                style={{ fontWeight: 600 }}
                              >
                                <ArrowRight className="w-3 h-3" />
                                Pay Now
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
