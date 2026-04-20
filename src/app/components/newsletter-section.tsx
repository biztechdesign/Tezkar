import { useState } from "react";
import { Mail, MessageCircle, Send, Check, Loader2 } from "lucide-react";

export function NewsletterSection() {
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [whatsappStatus, setWhatsappStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+971");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setEmailStatus("loading");
    setTimeout(() => {
      setEmailStatus("success");
      setTimeout(() => setEmailStatus("idle"), 3000);
      setEmail("");
    }, 1500);
  };

  const handleWhatsappSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setWhatsappStatus("loading");
    setTimeout(() => {
      setWhatsappStatus("success");
      setTimeout(() => setWhatsappStatus("idle"), 3000);
      setPhone("");
    }, 1500);
  };

  return (
    <section
      className="py-[64px] relative overflow-hidden"
      style={{
        fontFamily: "var(--font-body)",
        background: "#0B1A3E",
      }}
    >
      {/* Background pattern with email & whatsapp icons */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="icon-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              {/* Mail icon */}
              <g transform="translate(10,10) scale(1.2)" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <polyline points="22,4 12,13 2,4" />
              </g>
              {/* WhatsApp/message icon */}
              <g transform="translate(70,60) scale(1.2)" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </g>
              {/* Send/plane icon */}
              <g transform="translate(60,10) scale(0.9)" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22,2 15,22 11,13 2,9" />
              </g>
              {/* @ symbol simplified */}
              <g transform="translate(15,65) scale(1)" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#icon-pattern)" opacity="0.4" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Email Newsletter */}
          <div
            className="bg-white/[0.06] border border-white/10 p-6 relative overflow-hidden"
            style={{ borderRadius: 0, minHeight: 50 }}
          >
            {/* Highlight glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#044c5c]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-[50px] h-[50px] rounded-full bg-[#044c5c]/20 flex items-center justify-center shrink-0">
                  <Mail size={22} className="text-[#38bdf8]" />
                </div>
                <h3
                  className="text-white text-[16px] uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  Newsletter
                </h3>
              </div>
              <p className="text-white/50 text-[13px] mb-4" style={{ lineHeight: 1.5 }}>
                Get B2B pricing updates, new product alerts, and exclusive trade offers delivered to your inbox.
              </p>
              <form onSubmit={handleEmailSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/10 border border-white/15 text-white placeholder-white/30 px-4 py-2.5 text-[13px] outline-none focus:border-[#044c5c] transition-colors"
                />
                <button
                  type="submit"
                  disabled={emailStatus === "loading"}
                  className="bg-[#044c5c] text-white px-6 py-2.5 text-[12px] uppercase tracking-wider hover:bg-[#033a48] transition-colors flex items-center gap-2 disabled:opacity-50"
                  style={{ fontWeight: 600 }}
                >
                  {emailStatus === "loading" ? <Loader2 size={14} className="animate-spin" /> :
                   emailStatus === "success" ? <Check size={14} /> : <Send size={14} />}
                  {emailStatus === "success" ? "Done!" : "Subscribe"}
                </button>
              </form>
            </div>
          </div>

          {/* WhatsApp */}
          <div
            className="bg-white/[0.06] border border-white/10 p-6 relative overflow-hidden"
            style={{ borderRadius: 0, minHeight: 50 }}
          >
            {/* Highlight glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#25D366]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-[50px] h-[50px] rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0">
                  <MessageCircle size={22} className="text-[#25D366]" />
                </div>
                <h3
                  className="text-white text-[16px] uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  WhatsApp Updates
                </h3>
              </div>
              <p className="text-white/50 text-[13px] mb-4" style={{ lineHeight: 1.5 }}>
                Receive order updates, exclusive deals, and new catalog alerts directly on WhatsApp.
              </p>
              <form onSubmit={handleWhatsappSubmit} className="flex">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="bg-white/10 border border-white/15 text-white px-2 py-2.5 text-[13px] outline-none focus:border-[#25D366] cursor-pointer border-r-0"
                >
                  <option value="+971" className="text-black">+971</option>
                  <option value="+966" className="text-black">+966</option>
                  <option value="+968" className="text-black">+968</option>
                  <option value="+973" className="text-black">+973</option>
                  <option value="+965" className="text-black">+965</option>
                  <option value="+974" className="text-black">+974</option>
                </select>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="50 123 4567"
                  className="flex-1 bg-white/10 border border-white/15 text-white placeholder-white/30 px-4 py-2.5 text-[13px] outline-none focus:border-[#25D366] transition-colors"
                />
                <button
                  type="submit"
                  disabled={whatsappStatus === "loading"}
                  className="bg-[#25D366] text-white px-6 py-2.5 text-[12px] uppercase tracking-wider hover:bg-[#20bd5a] transition-colors flex items-center gap-2 disabled:opacity-50"
                  style={{ fontWeight: 600 }}
                >
                  {whatsappStatus === "loading" ? <Loader2 size={14} className="animate-spin" /> :
                   whatsappStatus === "success" ? <Check size={14} /> : <MessageCircle size={14} />}
                  {whatsappStatus === "success" ? "Saved!" : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}