import { useState } from "react";
import { ChevronDown, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { faqs } from "./data";

const FAQS_PER_PAGE = 10;

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredFaqs.length / FAQS_PER_PAGE));
  const pagedFaqs = filteredFaqs.slice(page * FAQS_PER_PAGE, (page + 1) * FAQS_PER_PAGE);

  // Split into 2 columns
  const mid = Math.ceil(pagedFaqs.length / 2);
  const col1 = pagedFaqs.slice(0, mid);
  const col2 = pagedFaqs.slice(mid);

  // Reset page when search changes
  const handleSearch = (val: string) => {
    setSearchTerm(val);
    setPage(0);
    setOpenIdx(null);
  };

  return (
    <section className="py-[64px]" style={{ fontFamily: "var(--font-body)", background: "#FAFAF8" }}>
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Header – matching Featured Brands style */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p
              className="text-[#d41c5c] text-[12px] uppercase tracking-[0.15em] mb-1"
              style={{ fontWeight: 600 }}
            >
              Need Help?
            </p>
            <h2
              className="text-[#2C2C2C] text-[24px] md:text-[28px]"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600, lineHeight: 1.25 }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-[#5B616A] text-[14px] mt-1" style={{ lineHeight: 1.5 }}>
              Find answers to common questions about our products and services.
            </p>
          </div>

          {/* Search */}
          <div className="w-full sm:w-[280px]">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search FAQs..."
                className="w-full pl-9 pr-4 py-2.5 border border-[#e7e7e7] text-[13px] outline-none focus:border-[#044c5c] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* 2-column FAQ grid */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-8 text-[#999] text-[13px]">
            No FAQs found matching your search.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Column 1 */}
              <div className="border border-[#e7e7e7]">
                {col1.map((faq, idx) => {
                  const globalIdx = page * FAQS_PER_PAGE + idx;
                  const isOpen = openIdx === globalIdx;
                  return (
                    <div key={globalIdx} className={idx > 0 ? "border-t border-[#e7e7e7]" : ""}>
                      <button
                        onClick={() => setOpenIdx(isOpen ? null : globalIdx)}
                        className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-[#f9f9f9] transition-colors"
                      >
                        <span className="text-[#222529] text-[13px] pr-4" style={{ fontWeight: isOpen ? 600 : 400 }}>
                          {faq.q}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`flex-shrink-0 text-[#999] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-[#666] text-[12px]" style={{ lineHeight: 1.6 }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {/* Column 2 */}
              <div className="border border-[#e7e7e7]">
                {col2.map((faq, idx) => {
                  const globalIdx = page * FAQS_PER_PAGE + mid + idx;
                  const isOpen = openIdx === globalIdx;
                  return (
                    <div key={globalIdx} className={idx > 0 ? "border-t border-[#e7e7e7]" : ""}>
                      <button
                        onClick={() => setOpenIdx(isOpen ? null : globalIdx)}
                        className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-[#f9f9f9] transition-colors"
                      >
                        <span className="text-[#222529] text-[13px] pr-4" style={{ fontWeight: isOpen ? 600 : 400 }}>
                          {faq.q}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`flex-shrink-0 text-[#999] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-[#666] text-[12px]" style={{ lineHeight: 1.6 }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <button
                  onClick={() => { setPage(Math.max(0, page - 1)); setOpenIdx(null); }}
                  disabled={page === 0}
                  className="w-8 h-8 border border-[#e7e7e7] flex items-center justify-center hover:bg-[#f4f4f4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={14} className="text-[#999]" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => { setPage(i); setOpenIdx(null); }}
                    className={`w-8 h-8 text-[12px] border transition-colors ${
                      page === i
                        ? "bg-[#044c5c] text-white border-[#044c5c]"
                        : "border-[#e7e7e7] text-[#666] hover:bg-[#f4f4f4]"
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => { setPage(Math.min(totalPages - 1, page + 1)); setOpenIdx(null); }}
                  disabled={page === totalPages - 1}
                  className="w-8 h-8 border border-[#e7e7e7] flex items-center justify-center hover:bg-[#f4f4f4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={14} className="text-[#999]" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}