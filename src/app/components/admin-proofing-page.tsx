import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  Home,
  Plus,
  Search,
  SlidersHorizontal,
} from "./icons";
import { Link } from "react-router";
import { useMemo, useState } from "react";
import { AccountSidebar } from "./account-sidebar";

type ProofStatus =
  | "Draft"
  | "Sent"
  | "Awaiting Approval"
  | "Revision Requested"
  | "Approved"
  | "Expired";

interface ProofRow {
  id: string; // order ref, e.g. S00002
  contact: string;
  salesperson: string;
  products: number;
  revisionsUsed: number;
  revisionsAllowed: number;
  expiration: string; // dd/mm/yyyy
  updated: string; // dd/mm/yyyy
  status: ProofStatus;
}

const proofs: ProofRow[] = [
  { id: "S00002", contact: "Sketch Advertising & Publishing", salesperson: "Administrator", products: 2, revisionsUsed: 0, revisionsAllowed: 2, expiration: "05/09/2026", updated: "18/06/2026", status: "Awaiting Approval" },
  { id: "S00007", contact: "Gulf Print Solutions LLC", salesperson: "Maya Rahimi", products: 4, revisionsUsed: 1, revisionsAllowed: 2, expiration: "30/06/2026", updated: "16/06/2026", status: "Revision Requested" },
  { id: "S00006", contact: "Desert Bloom Catering", salesperson: "Administrator", products: 1, revisionsUsed: 0, revisionsAllowed: 3, expiration: "12/07/2026", updated: "15/06/2026", status: "Sent" },
  { id: "S00005", contact: "Falcon Sports Club", salesperson: "Omar Haddad", products: 6, revisionsUsed: 2, revisionsAllowed: 2, expiration: "08/06/2026", updated: "10/06/2026", status: "Approved" },
  { id: "S00004", contact: "Bright Minds Academy", salesperson: "Maya Rahimi", products: 3, revisionsUsed: 0, revisionsAllowed: 2, expiration: "01/06/2026", updated: "28/05/2026", status: "Expired" },
  { id: "S00003", contact: "Coastal Marine Services", salesperson: "Administrator", products: 2, revisionsUsed: 0, revisionsAllowed: 2, expiration: "20/07/2026", updated: "24/05/2026", status: "Draft" },
  { id: "S00001", contact: "Sketch Advertising & Publishing", salesperson: "Omar Haddad", products: 5, revisionsUsed: 1, revisionsAllowed: 3, expiration: "15/06/2026", updated: "20/05/2026", status: "Approved" },
];

const statusStyle: Record<ProofStatus, { fg: string; bg: string }> = {
  Draft: { fg: "#5B616A", bg: "#EEF0F2" },
  Sent: { fg: "#1F4DA1", bg: "#E6EEFB" },
  "Awaiting Approval": { fg: "#8A5A1A", bg: "#FCEFAA" },
  "Revision Requested": { fg: "#A1142D", bg: "#FBE3E8" },
  Approved: { fg: "#1F7A2E", bg: "#E6F4E9" },
  Expired: { fg: "#6B7280", bg: "#E5E7EB" },
};

const statusFilters: Array<ProofStatus | "All"> = [
  "All",
  "Draft",
  "Sent",
  "Awaiting Approval",
  "Revision Requested",
  "Approved",
  "Expired",
];

const pageSizes = [10, 25, 50];

export function AdminProofingPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProofStatus | "All">("All");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return proofs.filter((p) => {
      const matchesStatus = statusFilter === "All" || p.status === statusFilter;
      const matchesQuery =
        !q ||
        [p.id, p.contact, p.salesperson, p.status].some((v) =>
          String(v).toLowerCase().includes(q)
        );
      return matchesStatus && matchesQuery;
    });
  }, [query, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = Math.min(start + pageSize, filtered.length);
  const rows = filtered.slice(start, end);

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
              {/* Breadcrumb + New Proof */}
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
                    <li className="text-[#7A7A7A]">Artwork Proofing</li>
                  </ol>
                </nav>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#044c5c] text-sm text-white hover:bg-[#033845] transition-colors"
                  style={{ fontWeight: 500, borderRadius: 0 }}
                >
                  <Plus className="w-4 h-4" strokeWidth={2} />
                  New Proof
                </button>
              </div>

              {/* Heading */}
              <div className="mb-5">
                <h1
                  className="text-xl md:text-2xl mb-1 text-[#2C2C2C]"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  Artwork Proofing
                </h1>
                <p className="text-sm text-[#5B616A]">
                  Review, send and track artwork proofs across all orders.
                </p>
              </div>

              {/* Summary cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Awaiting Approval", count: proofs.filter((p) => p.status === "Awaiting Approval").length, color: "#8A5A1A" },
                  { label: "Revision Requested", count: proofs.filter((p) => p.status === "Revision Requested").length, color: "#A1142D" },
                  { label: "Approved", count: proofs.filter((p) => p.status === "Approved").length, color: "#1F7A2E" },
                  { label: "Expired", count: proofs.filter((p) => p.status === "Expired").length, color: "#6B7280" },
                ].map((c) => (
                  <div
                    key={c.label}
                    className="bg-[#FAFAF8] border border-[#E8DDD3] p-4"
                    style={{ borderRadius: 0 }}
                  >
                    <div
                      className="text-2xl"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, color: c.color }}
                    >
                      {c.count}
                    </div>
                    <div className="text-xs text-[#5B616A] mt-1">{c.label}</div>
                  </div>
                ))}
              </div>

              {/* Toolbar */}
              <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                <div className="relative">
                  <Search
                    className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5B616A]"
                    strokeWidth={1.8}
                  />
                  <input
                    type="text"
                    placeholder="Search order, contact, salesperson"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setPage(1);
                    }}
                    className="pl-9 pr-3 py-2 border border-[#E6E8EB] text-sm text-[#2C2C2C] focus:outline-none focus:border-[#044c5c] w-[300px] max-w-full bg-white"
                    style={{ borderRadius: 0 }}
                  />
                </div>
                <div className="relative inline-flex items-center">
                  <SlidersHorizontal
                    className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#044c5c] pointer-events-none"
                    strokeWidth={1.8}
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value as ProofStatus | "All");
                      setPage(1);
                    }}
                    className="pl-9 pr-8 py-2 border border-[#044c5c] text-sm text-[#044c5c] bg-white focus:outline-none appearance-none cursor-pointer hover:bg-[#F2F8F9] transition-colors"
                    style={{ fontWeight: 500, borderRadius: 0 }}
                  >
                    {statusFilters.map((s) => (
                      <option key={s} value={s}>
                        {s === "All" ? "All statuses" : s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[920px] border-collapse">
                  <thead>
                    <tr>
                      {["Order", "Contact", "Salesperson", "Products", "Revisions", "Expiration", "Status", "Actions"].map(
                        (h) => (
                          <th
                            key={h}
                            className="text-left px-4 py-3 text-sm text-[#2C2C2C] border-b border-[#E6E8EB]"
                            style={{ fontWeight: 700 }}
                          >
                            {h}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-10 text-center text-sm text-[#5B616A]">
                          No proofs match your filters.
                        </td>
                      </tr>
                    ) : (
                      rows.map((p) => {
                        const s = statusStyle[p.status];
                        const revExhausted = p.revisionsUsed >= p.revisionsAllowed;
                        return (
                          <tr
                            key={p.id}
                            className="border-b border-[#F0EBE5] hover:bg-[#FAFAF8] transition-colors"
                          >
                            <td className="px-4 py-4 text-sm text-[#044c5c]" style={{ fontWeight: 500 }}>
                              #{p.id}
                            </td>
                            <td className="px-4 py-4 text-sm text-[#2C2C2C]">{p.contact}</td>
                            <td className="px-4 py-4 text-sm text-[#5B616A]">{p.salesperson}</td>
                            <td className="px-4 py-4 text-sm text-[#2C2C2C]">{p.products}</td>
                            <td className="px-4 py-4 text-sm">
                              <span style={{ color: revExhausted ? "#A1142D" : "#2C2C2C", fontWeight: revExhausted ? 600 : 400 }}>
                                {p.revisionsUsed} / {p.revisionsAllowed}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm text-[#2C2C2C]">{p.expiration}</td>
                            <td className="px-4 py-4">
                              <span
                                className="inline-flex items-center px-3 py-1 text-xs font-semibold"
                                style={{
                                  color: s.fg,
                                  backgroundColor: s.bg,
                                  borderRadius: 9999,
                                }}
                              >
                                {p.status}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <Link
                                to={`/account/proofing/${p.id}`}
                                title="Open proof"
                                className="inline-flex p-1.5 text-[#5B616A] hover:text-[#044c5c] hover:bg-[#F2F8F9] transition-colors"
                                style={{ borderRadius: 9999 }}
                              >
                                <Eye className="w-4 h-4" strokeWidth={1.8} />
                              </Link>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination footer */}
              <div className="flex items-center justify-end gap-6 pt-4 mt-2 border-t border-[#E6E8EB] flex-wrap">
                <div className="flex items-center gap-2 text-sm text-[#2C2C2C]">
                  <span>Rows per page:</span>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setPage(1);
                    }}
                    className="px-2 py-1 border border-[#E6E8EB] text-sm text-[#2C2C2C] focus:outline-none focus:border-[#044c5c] bg-white"
                    style={{ borderRadius: 0 }}
                  >
                    {pageSizes.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-sm text-[#2C2C2C]">
                  {filtered.length === 0 ? "0-0 of 0" : `${start + 1}-${end} of ${filtered.length}`}
                </div>

                <div className="flex items-center gap-1">
                  {[
                    { icon: ChevronsLeft, label: "First page", disabled: currentPage === 1, onClick: () => setPage(1) },
                    { icon: ChevronLeft, label: "Previous page", disabled: currentPage === 1, onClick: () => setPage((p) => Math.max(1, p - 1)) },
                    { icon: ChevronRight, label: "Next page", disabled: currentPage === totalPages, onClick: () => setPage((p) => Math.min(totalPages, p + 1)) },
                    { icon: ChevronsRight, label: "Last page", disabled: currentPage === totalPages, onClick: () => setPage(totalPages) },
                  ].map((btn) => {
                    const Icon = btn.icon;
                    return (
                      <button
                        key={btn.label}
                        type="button"
                        title={btn.label}
                        disabled={btn.disabled}
                        onClick={btn.onClick}
                        className="p-1.5 text-[#5B616A] hover:text-[#044c5c] hover:bg-[#F2F8F9] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        style={{ borderRadius: 9999 }}
                      >
                        <Icon className="w-4 h-4" strokeWidth={1.8} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
