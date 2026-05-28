import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Star } from "./icons";
import { Link } from "react-router";
import { useMemo, useState } from "react";
import { AccountSidebar } from "./account-sidebar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type ReviewStatus = "Pending" | "Approved" | "Rejected";

interface Review {
  id: string;
  product: string;
  image: string;
  rating: number;
  body: string;
  date: string; // dd/mm/yyyy
  status: ReviewStatus;
}

const initialReviews: Review[] = [
  {
    id: "rev-1",
    product: "A3 Magnetic Display Board – \"Faisco\" Series",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=200&h=200&fit=crop",
    rating: 5,
    body: "Excellent build quality and the magnets are strong. We use these across all our reception areas and the print finish has held up perfectly.",
    date: "28/05/2026",
    status: "Approved",
  },
  {
    id: "rev-2",
    product: "Branded Coffee Mug — Ceramic 11oz",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=200&h=200&fit=crop",
    rating: 4,
    body: "Printing came out vibrant. One mug in the batch had a small chip on the rim — replaced quickly by the team. Would order again.",
    date: "22/05/2026",
    status: "Approved",
  },
  {
    id: "rev-3",
    product: "Custom Embroidered Polo Shirt",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&h=200&fit=crop",
    rating: 3,
    body: "Embroidery is neat but the sizing runs a bit small. Recommend ordering one size up if you're between sizes.",
    date: "15/05/2026",
    status: "Pending",
  },
  {
    id: "rev-4",
    product: "Tri-Fold Brochure — 100gsm Matte",
    image: "https://images.unsplash.com/photo-1542744095-291d1f67b221?w=200&h=200&fit=crop",
    rating: 5,
    body: "Top-tier print quality and the matte finish feels premium. Delivered well before the promised date.",
    date: "08/05/2026",
    status: "Approved",
  },
  {
    id: "rev-5",
    product: "Stainless Steel Water Bottle — 750ml",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop",
    rating: 2,
    body: "Logo started peeling after a few washes. Expected more durability for the price point.",
    date: "02/05/2026",
    status: "Rejected",
  },
  {
    id: "rev-6",
    product: "Roll-Up Banner Stand — 85x200cm",
    image: "https://images.unsplash.com/photo-1567017638413-c92b1aacd9b6?w=200&h=200&fit=crop",
    rating: 4,
    body: "Setup is intuitive, fabric is wrinkle-free out of the case. Carry bag could be sturdier but the banner itself is great.",
    date: "26/04/2026",
    status: "Pending",
  },
];

const statusStyle: Record<ReviewStatus, { fg: string; bg: string }> = {
  Pending: { fg: "#8A5A1A", bg: "#FCEFAA" },
  Approved: { fg: "#1F7A2E", bg: "#E6F4E9" },
  Rejected: { fg: "#A1142D", bg: "#FBE3E8" },
};

const pageSizes = [10, 25, 50];

function Stars({ value, size = "sm" }: { value: number; size?: "sm" | "lg" }) {
  const sizeClass = size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={sizeClass}
          style={{ color: n <= value ? "#E0A434" : "#D8DCE0" }}
        />
      ))}
    </div>
  );
}

export function ReviewsPage() {
  const [reviews] = useState<Review[]>(initialReviews);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const stats = useMemo(() => {
    const total = reviews.length;
    const approved = reviews.filter((r) => r.status === "Approved").length;
    const pending = reviews.filter((r) => r.status === "Pending").length;
    const rated = reviews.filter((r) => r.rating > 0);
    const avg = rated.length
      ? rated.reduce((sum, r) => sum + r.rating, 0) / rated.length
      : 0;
    return { total, approved, pending, avg };
  }, [reviews]);

  const totalPages = Math.max(1, Math.ceil(reviews.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = Math.min(start + pageSize, reviews.length);
  const rows = reviews.slice(start, end);

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
            <li className="text-[#2C2C2C]">Reviews</li>
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
                Reviews
              </h1>
              <p className="text-sm text-[#5B616A]">
                Manage the reviews you have posted on your purchased products.
              </p>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              {[
                { label: "Total Reviews", value: stats.total.toString() },
                {
                  label: "Average Rating",
                  value: stats.avg ? stats.avg.toFixed(1) : "—",
                  starsValue: Math.round(stats.avg),
                },
                { label: "Approved", value: stats.approved.toString(), accent: "#1F7A2E" },
                { label: "Pending", value: stats.pending.toString(), accent: "#8A5A1A" },
              ].map((c) => (
                <div
                  key={c.label}
                  className="bg-white border border-[#E8DDD3] px-4 py-3"
                  style={{ borderRadius: 0 }}
                >
                  <div className="text-xs text-[#5B616A]" style={{ fontFamily: "Inter, sans-serif" }}>
                    {c.label}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="text-xl text-[#2C2C2C]"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        color: c.accent ?? "#2C2C2C",
                      }}
                    >
                      {c.value}
                    </span>
                    {c.starsValue !== undefined && c.starsValue > 0 && (
                      <Stars value={c.starsValue} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <section className="bg-white border border-[#E8DDD3]" style={{ borderRadius: 0 }}>
              <div className="px-4 py-3">
                <h2
                  className="text-base text-[#2C2C2C]"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  My Reviews
                </h2>
              </div>

              <div className="border-t border-[#F0EBE5]" />

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse">
                  <thead>
                    <tr>
                      {[
                        { label: "Product", w: "" },
                        { label: "Review", w: "" },
                        { label: "Status", w: "w-[120px]" },
                      ].map((h) => (
                        <th
                          key={h.label}
                          className={`text-left px-6 py-3 text-xs text-[#2C2C2C] uppercase tracking-wider border-b border-[#E8DDD3] ${h.w}`}
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                          }}
                        >
                          {h.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length === 0 ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-6 py-10 text-center text-sm text-[#5B616A]"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          No reviews yet.
                        </td>
                      </tr>
                    ) : (
                      rows.map((r) => {
                        const s = statusStyle[r.status];
                        return (
                          <tr
                            key={r.id}
                            className="border-b border-[#F0EBE5] last:border-b-0 hover:bg-[#FAFAF8] transition-colors"
                          >
                            <td className="px-6 py-5 align-top">
                              <div className="flex items-start gap-4">
                                <div
                                  className="w-20 h-20 overflow-hidden shrink-0 bg-[#FAFAF8] border border-[#E8DDD3]"
                                  style={{ borderRadius: 0 }}
                                >
                                  <ImageWithFallback
                                    src={r.image}
                                    alt={r.product}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <p
                                  className="text-sm text-[#2C2C2C] leading-relaxed"
                                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
                                >
                                  {r.product}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-5 align-top">
                              <div className="flex items-center gap-3 mb-2 flex-wrap">
                                <Stars value={r.rating} />
                                <span
                                  className="text-xs text-[#5B616A]"
                                  style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                  Posted on{" "}
                                  <span className="text-[#2C2C2C]">{r.date}</span>
                                </span>
                              </div>
                              <p
                                className="text-sm text-[#2C2C2C] leading-relaxed"
                                style={{ fontFamily: "Inter, sans-serif" }}
                              >
                                {r.body}
                              </p>
                            </td>
                            <td className="px-6 py-5 align-top">
                              <span
                                className="inline-flex items-center px-3 py-1 text-xs font-semibold"
                                style={{
                                  color: s.fg,
                                  backgroundColor: s.bg,
                                  borderRadius: 9999,
                                  fontFamily: "Inter, sans-serif",
                                }}
                              >
                                {r.status}
                              </span>
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
                <div
                  className="flex items-center gap-2 text-sm text-[#2C2C2C]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
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
                  {reviews.length === 0
                    ? "0-0 of 0"
                    : `${start + 1}-${end} of ${reviews.length}`}
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
