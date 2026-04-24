import { useState } from "react";
import { Link } from "react-router";
import { Home, ChevronRight, ChevronLeft, Minus, Plus, Trash2, Edit } from "lucide-react";
import { CtaButton } from "./ui/cta-button";

/* ── Mock Quote Item ── */
interface QuoteItem {
  id: string;
  name: string;
  image: string;
  frameSelection?: string;
  quantity: number;
  sku: string;
}

/* ── Mock data ── */
const mockQuoteItems: QuoteItem[] = [
  {
    id: "1",
    name: "Premium Stainless Steel Water Bottle",
    image: "https://images.unsplash.com/photo-1662524281334-215f83f6f98a?w=400",
    frameSelection: "Matte Black",
    quantity: 2,
    sku: "WSB-001",
  },
  {
    id: "2",
    name: "Ceramic Coffee Mug Set",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400",
    frameSelection: "White",
    quantity: 1,
    sku: "CCM-002",
  },
];

/* ── Quote Cart Page ── */
export function QuoteCartPage() {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>(mockQuoteItems);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    city: "",
    country: "United Arab Emirates",
    company: "",
    phoneNumber: "",
  });

  const updateQuantity = (id: string, delta: number) => {
    setQuoteItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setQuoteItems((items) => items.filter((item) => item.id !== id));
  };

  const clearQuote = () => {
    if (confirm("Are you sure you want to clear all items from your quote cart?")) {
      setQuoteItems([]);
    }
  };

  const updateQuote = () => {
    alert("Quote updated successfully!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Quote request submitted successfully! We will contact you soon.");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      {/* ── Breadcrumb ── */}
      <div className="border-b border-[#e7e7e7] bg-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <nav className="flex items-center gap-1.5 py-3">
            <Link to="/" className="text-[#888] hover:text-[#044c5c] transition-colors">
              <Home size={13} />
            </Link>
            <ChevronRight size={11} className="text-[#bbb]" />
            <span className="text-[11px] uppercase tracking-wider text-[#2C2C2C]" style={{ fontWeight: 600 }}>
              Quote
            </span>
          </nav>
        </div>
      </div>

      {/* ── Main Content ── */}
      <section className="py-8 lg:py-10 bg-[#FAFAF8]">
        <div className="max-w-[1400px] mx-auto px-4">
          {/* Page Title */}
          <h1
            className="text-[#2C2C2C] text-[28px] md:text-[36px] text-center mb-8"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, lineHeight: 1.2 }}
          >
            Quote Cart
          </h1>

          {/* Two Column Layout - 50/50 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* ── LEFT: Product List ── */}
            <div className="bg-white border border-[#e7e7e7] p-6" style={{ borderRadius: "0px" }}>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#e7e7e7] pb-3 mb-5">
                <h3
                  className="text-[#2C2C2C] text-[14px] uppercase tracking-wide"
                  style={{ fontWeight: 600 }}
                >
                  Item
                </h3>
                <h3
                  className="text-[#2C2C2C] text-[14px] uppercase tracking-wide"
                  style={{ fontWeight: 600 }}
                >
                  Quantity
                </h3>
              </div>

              {/* Product Items */}
              {quoteItems.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-[#888] text-[14px] mb-4">Your quote cart is empty.</p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-[#044c5c] text-white text-[13px] px-5 py-2.5 hover:bg-[#033a48] transition-colors"
                    style={{ fontWeight: 600, borderRadius: "8px" }}
                  >
                    <ChevronLeft size={14} /> Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-5">
                  {quoteItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-4">
                      {/* Product Image */}
                      <div
                        className="w-20 h-20 flex-shrink-0 bg-[#f5f5f5] overflow-hidden"
                        style={{ borderRadius: "0px" }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4
                          className="text-[#2C2C2C] text-[14px] mb-1"
                          style={{ fontWeight: 600, lineHeight: 1.3 }}
                        >
                          {item.name}
                        </h4>
                        {item.frameSelection && (
                          <p className="text-[#888] text-[12px] mb-2">
                            Frame Selection: <span className="text-[#2C2C2C]">{item.frameSelection}</span>
                          </p>
                        )}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex items-center gap-1 text-[#d41c5c] text-[12px] hover:underline transition-colors"
                            style={{ fontWeight: 500 }}
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                          <button
                            className="flex items-center gap-1 text-[#888] text-[12px] hover:text-[#044c5c] hover:underline transition-colors"
                            style={{ fontWeight: 500 }}
                          >
                            <Edit size={12} /> Edit
                          </button>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#e7e7e7]" style={{ borderRadius: "0px" }}>
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center text-[#888] hover:bg-[#f5f5f5] transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span
                          className="w-12 h-8 flex items-center justify-center text-[#2C2C2C] text-[13px] border-l border-r border-[#e7e7e7]"
                          style={{ fontWeight: 600 }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#888] hover:bg-[#f5f5f5] transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              {quoteItems.length > 0 && (
                <div className="flex items-center justify-between gap-3 mt-8 pt-5 border-t border-[#e7e7e7] flex-wrap">
                  <Link
                    to="/"
                    className="flex items-center gap-2 border border-[#e7e7e7] text-[#2C2C2C] text-[12px] px-4 py-2.5 hover:border-[#044c5c] hover:text-[#044c5c] transition-colors uppercase tracking-wide"
                    style={{ fontWeight: 600, borderRadius: "0px" }}
                  >
                    <ChevronLeft size={14} /> Continue Shopping
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={clearQuote}
                      className="border border-[#e7e7e7] text-[#2C2C2C] text-[12px] px-4 py-2.5 hover:border-[#d41c5c] hover:text-[#d41c5c] transition-colors uppercase tracking-wide"
                      style={{ fontWeight: 600, borderRadius: "0px" }}
                    >
                      Clear Quote
                    </button>
                    <button
                      onClick={updateQuote}
                      className="flex items-center gap-2 border border-[#044c5c] bg-[#044c5c] text-white text-[12px] px-4 py-2.5 hover:bg-[#033a48] transition-colors uppercase tracking-wide"
                      style={{ fontWeight: 600, borderRadius: "0px" }}
                    >
                      <RefreshCw size={14} /> Update Quote
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── RIGHT: Shipping Address Form ── */}
            <div className="bg-white border border-[#e7e7e7] p-6" style={{ borderRadius: "0px" }}>
              <h3
                className="text-[#2C2C2C] text-[18px] mb-5"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
              >
                Shipping Address
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-[#2C2C2C] text-[13px] mb-1.5" style={{ fontWeight: 600 }}>
                    Email<span className="text-[#d41c5c]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-[#e7e7e7] text-[#2C2C2C] text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#044c5c] transition-colors"
                    style={{ borderRadius: "0px" }}
                    placeholder="Enter your email"
                  />
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-[#2C2C2C] text-[13px] mb-1.5" style={{ fontWeight: 600 }}>
                    Full Name<span className="text-[#d41c5c]">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full border border-[#e7e7e7] text-[#2C2C2C] text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#044c5c] transition-colors"
                    style={{ borderRadius: "0px" }}
                    placeholder="Enter Full Name"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-[#2C2C2C] text-[13px] mb-1.5" style={{ fontWeight: 600 }}>
                    City<span className="text-[#d41c5c]">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border border-[#e7e7e7] text-[#2C2C2C] text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#044c5c] transition-colors"
                    style={{ borderRadius: "0px" }}
                    placeholder="Enter City"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-[#2C2C2C] text-[13px] mb-1.5" style={{ fontWeight: 600 }}>
                    Country<span className="text-[#d41c5c]">*</span>
                  </label>
                  <select
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full border border-[#e7e7e7] text-[#2C2C2C] text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#044c5c] transition-colors bg-white"
                    style={{ borderRadius: "0px" }}
                  >
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Oman">Oman</option>
                  </select>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-[#2C2C2C] text-[13px] mb-1.5" style={{ fontWeight: 600 }}>
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full border border-[#e7e7e7] text-[#2C2C2C] text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#044c5c] transition-colors"
                    style={{ borderRadius: "0px" }}
                    placeholder="Enter Company"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[#2C2C2C] text-[13px] mb-1.5" style={{ fontWeight: 600 }}>
                    Phone Number<span className="text-[#d41c5c]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full border border-[#e7e7e7] text-[#2C2C2C] text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#044c5c] transition-colors"
                    style={{ borderRadius: "0px" }}
                    placeholder="Enter Phone Number"
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <CtaButton type="submit" variant="primary" size="lg" fullWidth>
                    Submit Quote Request
                  </CtaButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Missing RefreshCw import fix ── */
function RefreshCw({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  );
}
