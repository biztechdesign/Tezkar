import { Link } from "react-router";
import { useState } from "react";
import { AccountSidebar } from "./account-sidebar";
import { MessageSquare, Eye, FileDown, ShoppingCart } from "lucide-react";

interface Quote {
  id: string;
  subject: string;
  items: number;
  totalEstimate: number;
  requested: string;
  expires: string;
  status: "Pending" | "Approved" | "Expired" | "Converted";
}

const allQuotes: Quote[] = [
  {
    id: "QT-2026-0089",
    subject: "Corporate Welcome Kit (500 units)",
    items: 5,
    totalEstimate: 7250.0,
    requested: "2026-05-10",
    expires: "2026-05-24",
    status: "Pending",
  },
  {
    id: "QT-2026-0083",
    subject: "Branded Notebooks & Pens",
    items: 2,
    totalEstimate: 1450.0,
    requested: "2026-05-04",
    expires: "2026-05-18",
    status: "Approved",
  },
  {
    id: "QT-2026-0071",
    subject: "Conference Polo Shirts (Bulk)",
    items: 1,
    totalEstimate: 2880.0,
    requested: "2026-04-19",
    expires: "2026-05-03",
    status: "Converted",
  },
  {
    id: "QT-2026-0059",
    subject: "Ramadan Gift Hampers",
    items: 4,
    totalEstimate: 6100.0,
    requested: "2026-03-15",
    expires: "2026-03-29",
    status: "Expired",
  },
];

const statusColors: Record<Quote["status"], { fg: string; bg: string }> = {
  Pending: { fg: "#C8956C", bg: "#FAF1E8" },
  Approved: { fg: "#16A34A", bg: "#F0FDF4" },
  Converted: { fg: "#044c5c", bg: "#E8F4F8" },
  Expired: { fg: "#d41c5c", bg: "#fdf0f5" },
};

const filters = ["All", "Pending", "Approved", "Converted", "Expired"] as const;
type Filter = (typeof filters)[number];

export function QuotesPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const quotes = filter === "All" ? allQuotes : allQuotes.filter((q) => q.status === filter);

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <div className="mx-auto pt-8 pb-[64px] px-6" style={{ maxWidth: "1400px" }}>
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link to="/" className="text-[#044c5c] hover:text-[#d41c5c] transition-colors">
                Home
              </Link>
            </li>
            <li className="text-[#2C2C2C]">/</li>
            <li className="text-[#2C2C2C]">My Quotes</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <AccountSidebar />

          <main className="flex-1 min-w-0">
            <div className="mb-8">
              <h1
                className="text-2xl md:text-4xl mb-2 md:mb-3"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                My Quotes
              </h1>
              <p className="text-[#2C2C2C] opacity-70">
                Quotation requests and approvals
              </p>
            </div>

            <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 text-sm font-semibold whitespace-nowrap border transition-colors ${
                    filter === f
                      ? "bg-[#044c5c] text-white border-[#044c5c]"
                      : "bg-white text-[#5B616A] border-[#E6E8EB] hover:border-[#044c5c] hover:text-[#044c5c]"
                  }`}
                  style={{ borderRadius: 0 }}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {quotes.map((q) => {
                const s = statusColors[q.status];
                return (
                  <div
                    key={q.id}
                    className="bg-white border border-[#E8DDD3] p-5"
                    style={{ borderRadius: 0 }}
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                      <div>
                        <h3
                          className="text-base text-[#2C2C2C]"
                          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                        >
                          {q.subject}
                        </h3>
                        <p className="text-xs text-[#5B616A] mt-0.5">
                          {q.id} · {q.items} {q.items === 1 ? "item" : "items"} · Requested {q.requested}
                        </p>
                      </div>
                      <span
                        className="text-xs font-semibold px-3 py-1 uppercase tracking-wide"
                        style={{ color: s.fg, backgroundColor: s.bg, borderRadius: 0 }}
                      >
                        {q.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 flex-wrap pt-3 border-t border-[#E6E8EB]">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-[#5B616A]">
                          Estimate:{" "}
                          <strong
                            className="text-[#044c5c]"
                            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                          >
                            ${q.totalEstimate.toFixed(2)}
                          </strong>
                        </span>
                        <span className="text-[#5B616A]">
                          Valid until: <strong className="text-[#2C2C2C]">{q.expires}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#E6E8EB] text-[#044c5c] text-xs font-semibold hover:bg-[#F2F8F9] transition-colors"
                          style={{ borderRadius: 0 }}
                        >
                          <Eye className="w-3.5 h-3.5" /> View
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#E6E8EB] text-[#5B616A] text-xs font-semibold hover:bg-[#FAFAF8] transition-colors"
                          style={{ borderRadius: 0 }}
                        >
                          <FileDown className="w-3.5 h-3.5" /> Download
                        </button>
                        {q.status === "Approved" && (
                          <button
                            type="button"
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#044c5c] text-white text-xs font-semibold hover:bg-[#033d4a] transition-colors"
                            style={{ borderRadius: 0 }}
                          >
                            <ShoppingCart className="w-3.5 h-3.5" /> Convert to Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {quotes.length === 0 && (
                <div
                  className="bg-white border border-[#E8DDD3] p-16 text-center"
                  style={{ borderRadius: 0 }}
                >
                  <MessageSquare className="w-12 h-12 text-[#5B616A] mx-auto mb-3" />
                  <p className="text-[#2C2C2C]">No quotes in this category</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
