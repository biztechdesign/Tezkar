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
    product: "A3 Magnetic Display Board – “Faisco” Series",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=200&h=200&fit=crop",
    rating: 0,
    body: "d ada dasd a",
    date: "28/05/2026",
    status: "Pending",
  },
];

const statusStyle: Record<ReviewStatus, { fg: string; bg: string }> = {
  Pending: { fg: "#FFFFFF", bg: "#E3B505" },
  Approved: { fg: "#FFFFFF", bg: "#1F7A2E" },
  Rejected: { fg: "#FFFFFF", bg: "#A1142D" },
};

const pageSizes = [10, 25, 50];

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className="w-4 h-4"
          style={{
            color: n <= value ? "#C8956C" : "#D8DCE0",
          }}
        />
      ))}
    </div>
  );
}

export function ReviewsPage() {
  const [reviews] = useState<Review[]>(initialReviews);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(reviews.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = Math.min(start + pageSize, reviews.length);
  const rows = useMemo(() => reviews.slice(start, end), [reviews, start, end]);

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
                {reviews.length} {reviews.length === 1 ? "review" : "reviews"} posted
              </p>
            </div>

            <section className="bg-white border border-[#E8DDD3]" style={{ borderRadius: 0 }}>
              <div className="px-4 py-3">
                <h2
                  className="text-base text-[#2C2C2C]"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  Reviews
                </h2>
              </div>

              <div className="border-t border-[#F0EBE5]" />

              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse">
                  <thead>
                    <tr>
                      {["Products", "Reviews", "Status"].map((h) => (
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
                                  style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                  {r.product}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-5 align-top">
                              <div className="flex items-center gap-3 mb-2 flex-wrap">
                                <Stars value={r.rating} />
                                <span
                                  className="text-sm text-[#5B616A]"
                                  style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                  Posted On{" "}
                                  <em className="not-italic text-[#2C2C2C]" style={{ fontStyle: "italic" }}>
                                    {r.date}
                                  </em>
                                </span>
                              </div>
                              <p
                                className="text-sm text-[#2C2C2C]"
                                style={{ fontFamily: "Inter, sans-serif" }}
                              >
                                {r.body}
                              </p>
                            </td>
                            <td className="px-6 py-5 align-top">
                              <span
                                className="inline-flex items-center px-4 py-1.5 text-xs font-semibold"
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
