import { Link } from "react-router";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  Clock,
  CreditCard,
  Download,
  FilePdf,
  Home,
} from "./icons";
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
    dueDate: "06/12/2026",
    amount: 1150.0,
    currency: "AED",
    status: "Waiting for Payment",
  },
  {
    id: "INV/2026/00002",
    invoiceDate: "05/22/2026",
    dueDate: "06/05/2026",
    amount: 4320.5,
    currency: "AED",
    status: "Overdue",
  },
  {
    id: "INV/2026/00003",
    invoiceDate: "05/15/2026",
    dueDate: "05/30/2026",
    amount: 875.0,
    currency: "AED",
    status: "Paid",
  },
  {
    id: "INV/2026/00004",
    invoiceDate: "05/10/2026",
    dueDate: "05/25/2026",
    amount: 2640.0,
    currency: "AED",
    status: "Waiting for Payment",
  },
  {
    id: "INV/2026/00005",
    invoiceDate: "05/02/2026",
    dueDate: "05/17/2026",
    amount: 9800.0,
    currency: "AED",
    status: "Overdue",
  },
  {
    id: "INV/2026/00006",
    invoiceDate: "04/28/2026",
    dueDate: "05/13/2026",
    amount: 530.75,
    currency: "AED",
    status: "Paid",
  },
  {
    id: "INV/2026/00007",
    invoiceDate: "04/20/2026",
    dueDate: "05/05/2026",
    amount: 6125.0,
    currency: "AED",
    status: "Waiting for Payment",
  },
  {
    id: "INV/2026/00008",
    invoiceDate: "04/14/2026",
    dueDate: "04/29/2026",
    amount: 1480.0,
    currency: "AED",
    status: "Paid",
  },
  {
    id: "INV/2026/00009",
    invoiceDate: "04/06/2026",
    dueDate: "04/21/2026",
    amount: 3215.25,
    currency: "AED",
    status: "Overdue",
  },
  {
    id: "INV/2026/00010",
    invoiceDate: "03/30/2026",
    dueDate: "04/14/2026",
    amount: 2050.0,
    currency: "AED",
    status: "Waiting for Payment",
  },
];

function isPayable(status: InvoiceStatus) {
  return status === "Waiting for Payment" || status === "Overdue";
}

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

const CUSTOM_RANGE = "Custom Date Range";

const periodOptions = [
  "Last Month",
  "Last 3 Months",
  "Last Financial Year",
  "Previous Year",
  CUSTOM_RANGE,
];

function FinancialSummary() {
  const [period, setPeriod] = useState(periodOptions[0]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  return (
    <section className="mb-6">
      <h2
        className="text-xs tracking-wide text-[#2C2C2C] uppercase mb-3"
        style={{ fontWeight: 700, letterSpacing: "0.06em" }}
      >
        Financial Summary
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Outstanding Balance */}
        <div className="border border-[#E6E8EB] bg-white rounded-md p-5">
          <div className="flex items-start justify-between gap-3">
            <span
              className="text-xs tracking-wide text-[#5B616A] uppercase"
              style={{ fontWeight: 600, letterSpacing: "0.04em" }}
            >
              Total Outstanding Balance
            </span>
            <CreditCard className="w-5 h-5 text-[#2E8B57]" />
          </div>
          <div
            className="mt-3 text-3xl text-[#1A1A1A]"
            style={{ fontWeight: 800 }}
          >
            AED 52,345.00
          </div>
          <div
            className="mt-1 text-xs tracking-wide text-[#7A7A7A] uppercase"
            style={{ fontWeight: 600, letterSpacing: "0.04em" }}
          >
            Open Invoices
          </div>
        </div>

        {/* Overdue Balance */}
        <div className="border border-[#E6E8EB] bg-white rounded-md p-5">
          <div className="flex items-start justify-between gap-3">
            <span
              className="text-xs tracking-wide text-[#5B616A] uppercase"
              style={{ fontWeight: 600, letterSpacing: "0.04em" }}
            >
              Overdue Balance
            </span>
            <Calendar className="w-5 h-5 text-[#A1142D]" />
          </div>
          <div
            className="mt-3 text-3xl text-[#A1142D]"
            style={{ fontWeight: 800 }}
          >
            AED 15,000.00
          </div>
          <div
            className="mt-1 text-xs tracking-wide text-[#7A7A7A] uppercase"
            style={{ fontWeight: 600, letterSpacing: "0.04em" }}
          >
            Past Due Date
          </div>
        </div>

        {/* Monthly Statement (SOA) */}
        <div className="border border-[#E6E8EB] bg-white rounded-md p-5">
          <div className="flex items-start justify-between gap-3">
            <span
              className="text-xs tracking-wide text-[#5B616A] uppercase"
              style={{ fontWeight: 600, letterSpacing: "0.04em" }}
            >
              Monthly Statement (SOA)
            </span>
            <FilePdf className="w-5 h-5 text-[#1F7AA8]" />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm text-[#2C2C2C] whitespace-nowrap">
              Period:
            </span>
            <div className="relative flex-1">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full appearance-none border border-[#E6E8EB] bg-white text-sm text-[#2C2C2C] pl-3 pr-8 py-1.5 rounded hover:border-[#2E8B57] transition-colors focus:outline-none"
              >
                {periodOptions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-[#5B616A] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {period === CUSTOM_RANGE && (
            <div className="mt-2 grid grid-cols-2 gap-2">
              <label className="flex flex-col gap-1">
                <span className="text-xs text-[#5B616A]">From</span>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full border border-[#E6E8EB] bg-white text-sm text-[#2C2C2C] px-2 py-1.5 rounded hover:border-[#2E8B57] focus:outline-none focus:border-[#2E8B57] transition-colors"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs text-[#5B616A]">To</span>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full border border-[#E6E8EB] bg-white text-sm text-[#2C2C2C] px-2 py-1.5 rounded hover:border-[#2E8B57] focus:outline-none focus:border-[#2E8B57] transition-colors"
                />
              </label>
            </div>
          )}
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#B7D8BD] bg-white text-sm text-[#1F7A3A] rounded hover:bg-[#F4FBF6] transition-colors"
              style={{ fontWeight: 600 }}
            >
              <Download className="w-4 h-4" />
              PDF
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#B7D8BD] bg-white text-sm text-[#1F7A3A] rounded hover:bg-[#F4FBF6] transition-colors"
              style={{ fontWeight: 600 }}
            >
              <Download className="w-4 h-4" />
              Excel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CreditInformationPage() {
  const [sortBy, setSortBy] = useState<SortKey>("Date");
  const [filterBy, setFilterBy] = useState<FilterKey>("Invoices");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const payableIds = invoices.filter((i) => isPayable(i.status)).map((i) => i.id);
  const allSelected =
    payableIds.length > 0 && payableIds.every((id) => selected.has(id));

  const toggleOne = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleAll = () =>
    setSelected(allSelected ? new Set() : new Set(payableIds));

  const selectedInvoices = invoices.filter((i) => selected.has(i.id));
  const selectedTotal = selectedInvoices.reduce((sum, i) => sum + i.amount, 0);

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
              {/* Financial Summary cards */}
              <FinancialSummary />

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

              {/* Bulk pay bar */}
              {selected.size > 0 && (
                <div className="flex items-center justify-between gap-3 flex-wrap mb-4 px-4 py-3 border border-[#B7D8BD] bg-[#F4FBF6] rounded">
                  <span className="text-sm text-[#2C2C2C]">
                    <span style={{ fontWeight: 700 }}>{selected.size}</span>{" "}
                    invoice{selected.size > 1 ? "s" : ""} selected ·{" "}
                    <span style={{ fontWeight: 700 }}>
                      {selectedTotal.toFixed(2)} AED
                    </span>
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1F7A3A] text-white text-sm rounded hover:bg-[#176330] transition-colors"
                    style={{ fontWeight: 600 }}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    Pay Selected
                  </button>
                </div>
              )}

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse">
                  <thead>
                    <tr>
                      <th className="w-10 px-4 py-3 border-b border-[#E6E8EB] text-center">
                        <input
                          type="checkbox"
                          aria-label="Select all payable invoices"
                          checked={allSelected}
                          onChange={toggleAll}
                          className="w-4 h-4 accent-[#1F7A3A] cursor-pointer"
                        />
                      </th>
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
                      <th
                        className="text-center px-4 py-3 text-sm text-[#2C2C2C] border-b border-[#E6E8EB]"
                        style={{ fontWeight: 700 }}
                      >
                        Download
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
                          <td className="px-4 py-3 text-center">
                            {isPayable(inv.status) && (
                              <input
                                type="checkbox"
                                aria-label={`Select invoice ${inv.id}`}
                                checked={selected.has(inv.id)}
                                onChange={() => toggleOne(inv.id)}
                                className="w-4 h-4 accent-[#1F7A3A] cursor-pointer"
                              />
                            )}
                          </td>
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
                            {isPayable(inv.status) && (
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
                          <td className="px-4 py-3 text-center">
                            <button
                              type="button"
                              aria-label={`Download invoice ${inv.id}`}
                              title="Download invoice"
                              className="inline-flex items-center justify-center w-8 h-8 border border-[#B7D8BD] bg-white text-[#1F7A3A] rounded hover:bg-[#F4FBF6] transition-colors"
                            >
                              <Download className="w-4 h-4" />
                            </button>
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
