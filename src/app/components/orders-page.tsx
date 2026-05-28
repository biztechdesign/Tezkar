import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye, RotateCcw, Search, SlidersHorizontal } from "./icons";
import { Link, useNavigate } from "react-router";
import { useMemo, useState } from "react";
import { AccountSidebar } from "./account-sidebar";

type OrderStatus = "Pending" | "Processing" | "In Transit" | "Delivered" | "Cancelled";

interface OrderRow {
  id: string;
  date: string; // dd/mm/yyyy
  shipTo: string; // country code
  total: number;
  status: OrderStatus;
}

const orders: OrderRow[] = [
  { id: "4000000003", date: "20/05/2026", shipTo: "AE", total: 15.0, status: "Pending" },
  { id: "4000000002", date: "20/05/2026", shipTo: "IN", total: 50.0, status: "Pending" },
  { id: "4000000001", date: "18/05/2026", shipTo: "AE", total: 245.0, status: "In Transit" },
  { id: "3999999987", date: "12/05/2026", shipTo: "SA", total: 1290.0, status: "Delivered" },
  { id: "3999999976", date: "07/05/2026", shipTo: "AE", total: 89.0, status: "Cancelled" },
  { id: "3999999964", date: "02/05/2026", shipTo: "KW", total: 320.5, status: "Processing" },
  { id: "3999999951", date: "26/04/2026", shipTo: "AE", total: 410.0, status: "Delivered" },
  { id: "3999999932", date: "18/04/2026", shipTo: "AE", total: 75.0, status: "Delivered" },
];

const statusStyle: Record<OrderStatus, { fg: string; bg: string }> = {
  Pending: { fg: "#8A5A1A", bg: "#FCEFAA" },
  Processing: { fg: "#044c5c", bg: "#E8F4F8" },
  "In Transit": { fg: "#1F4DA1", bg: "#E6EEFB" },
  Delivered: { fg: "#1F7A2E", bg: "#E6F4E9" },
  Cancelled: { fg: "#A1142D", bg: "#FBE3E8" },
};

const pageSizes = [10, 25, 50];

export function OrdersPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter((o) =>
      [o.id, o.date, o.shipTo, o.status].some((v) => String(v).toLowerCase().includes(q))
    );
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = Math.min(start + pageSize, filtered.length);
  const rows = filtered.slice(start, end);

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
            <li className="text-[#2C2C2C]">My Orders</li>
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
                My Orders
              </h1>
              <p className="text-sm text-[#5B616A]">
                Track and manage all your orders in one place.
              </p>
            </div>

            <section className="bg-white border border-[#E8DDD3]" style={{ borderRadius: 0 }}>
              {/* Toolbar */}
              <div className="flex items-center justify-between gap-3 p-4 flex-wrap">
                <h2
                  className="text-base text-[#2C2C2C]"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  My Orders
                </h2>

                <div className="flex items-center gap-3 flex-wrap">
                  <div className="relative">
                    <Search
                      className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5B616A]"
                      strokeWidth={1.8}
                    />
                    <input
                      type="text"
                      placeholder="Search"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setPage(1);
                      }}
                      className="pl-9 pr-3 py-2 border border-[#E6E8EB] text-sm text-[#2C2C2C] focus:outline-none focus:border-[#044c5c] w-[260px] max-w-full bg-white"
                      style={{ fontFamily: "Inter, sans-serif", borderRadius: 9999 }}
                    />
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-[#044c5c] text-sm text-[#044c5c] hover:bg-[#F2F8F9] transition-colors"
                    style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, borderRadius: 9999 }}
                  >
                    <SlidersHorizontal className="w-4 h-4" strokeWidth={1.8} />
                    Filter
                  </button>
                </div>
              </div>

              <div className="border-t border-[#F0EBE5]" />

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse">
                  <thead>
                    <tr className="bg-white">
                      {["Order", "Date", "Ship to", "Order Total", "Status", "Actions"].map(
                        (h) => (
                          <th
                            key={h}
                            className="text-left px-6 py-3 text-xs text-[#2C2C2C] uppercase tracking-wider border-b border-[#E8DDD3]"
                            style={{
                              fontFamily: "Poppins, sans-serif",
                              fontWeight: 600,
                              letterSpacing: "0.05em",
                            }}
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
                        <td
                          colSpan={6}
                          className="px-6 py-10 text-center text-sm text-[#5B616A]"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          No orders match your search.
                        </td>
                      </tr>
                    ) : (
                      rows.map((o) => {
                        const s = statusStyle[o.status];
                        return (
                          <tr
                            key={o.id}
                            className="border-b border-[#F0EBE5] hover:bg-[#FAFAF8] transition-colors"
                          >
                            <td
                              className="px-6 py-4 text-sm text-[#044c5c]"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              {o.id}
                            </td>
                            <td
                              className="px-6 py-4 text-sm text-[#2C2C2C]"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              {o.date}
                            </td>
                            <td
                              className="px-6 py-4 text-sm text-[#044c5c]"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              {o.shipTo}
                            </td>
                            <td
                              className="px-6 py-4 text-sm text-[#2C2C2C]"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              ${o.total.toFixed(2)}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className="inline-flex items-center px-3 py-1 text-xs font-semibold"
                                style={{
                                  color: s.fg,
                                  backgroundColor: s.bg,
                                  borderRadius: 9999,
                                  fontFamily: "Inter, sans-serif",
                                }}
                              >
                                {o.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  title="View order"
                                  onClick={() => navigate(`/account/orders/${o.id}`)}
                                  className="p-1.5 text-[#5B616A] hover:text-[#044c5c] hover:bg-[#F2F8F9] transition-colors"
                                  style={{ borderRadius: 9999 }}
                                >
                                  <Eye className="w-4 h-4" strokeWidth={1.8} />
                                </button>
                                {(o.status === "Pending" || o.status === "Delivered") && (
                                  <button
                                    type="button"
                                    title="Reorder"
                                    className="p-1.5 text-[#5B616A] hover:text-[#044c5c] hover:bg-[#F2F8F9] transition-colors"
                                    style={{ borderRadius: 9999 }}
                                  >
                                    <RotateCcw className="w-4 h-4" strokeWidth={1.8} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination footer */}
              <div className="flex items-center justify-end gap-6 px-4 py-3 border-t border-[#E8DDD3] flex-wrap">
                <div className="flex items-center gap-2 text-sm text-[#2C2C2C]" style={{ fontFamily: "Inter, sans-serif" }}>
                  <span>Rows per page:</span>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setPage(1);
                    }}
                    className="px-2 py-1 border border-[#E6E8EB] text-sm text-[#2C2C2C] focus:outline-none focus:border-[#044c5c] bg-white"
                    style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                  >
                    {pageSizes.map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                <div className="text-sm text-[#2C2C2C]" style={{ fontFamily: "Inter, sans-serif" }}>
                  {filtered.length === 0
                    ? "0-0 of 0"
                    : `${start + 1}-${end} of ${filtered.length}`}
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
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
