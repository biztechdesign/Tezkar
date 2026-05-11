import { Link } from "react-router";
import { useState } from "react";
import { AccountSidebar } from "./account-sidebar";
import { Mail, Check } from "lucide-react";
import { CtaButton } from "./ui/cta-button";

type Frequency = "weekly" | "monthly" | "quarterly";

interface Topic {
  key: string;
  label: string;
  desc: string;
}

const topics: Topic[] = [
  { key: "new-arrivals", label: "New Arrivals", desc: "Be first to see fresh products as they launch" },
  { key: "seasonal", label: "Seasonal Catalogues", desc: "Ramadan, Eid, year-end and other curated drops" },
  { key: "promotions", label: "Promotions & Offers", desc: "Flash sales, bundles & member-only discounts" },
  { key: "design-tips", label: "Design Tips & Inspiration", desc: "Branding ideas, case studies and trends" },
  { key: "events", label: "Events & Webinars", desc: "Invitations to trade shows and online sessions" },
  { key: "corporate-gifting", label: "Corporate Gifting Guides", desc: "Buyer's guides for HR & procurement teams" },
];

export function NewsletterPage() {
  const [subscribed, setSubscribed] = useState(true);
  const [email, setEmail] = useState("ahmed.alrashid@example.com");
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [selected, setSelected] = useState<Set<string>>(
    new Set(["new-arrivals", "seasonal", "promotions"])
  );
  const [saved, setSaved] = useState(false);

  const toggle = (k: string) =>
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

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
            <li className="text-[#2C2C2C]">Newsletter Subscription</li>
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
                Newsletter Subscription
              </h1>
              <p className="text-[#2C2C2C] opacity-70">
                Choose what we email you about and how often
              </p>
            </div>

            <section className="bg-white border border-[#E8DDD3] p-6 mb-6" style={{ borderRadius: 0 }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-[#E8F4F8]" style={{ borderRadius: 0 }}>
                  <Mail className="w-6 h-6 text-[#044c5c]" />
                </div>
                <div>
                  <h2
                    className="text-xl text-[#2C2C2C]"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    Status & Email
                  </h2>
                  <p className="text-sm text-[#5B616A]">Where we send your newsletter</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 border border-[#E6E8EB]" style={{ borderRadius: 0 }}>
                  <div>
                    <div className="text-sm font-semibold text-[#2C2C2C]">
                      Subscription
                    </div>
                    <div className="text-xs text-[#5B616A] mt-0.5">
                      {subscribed
                        ? "You are currently subscribed"
                        : "You are currently unsubscribed"}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubscribed((s) => !s)}
                    className="relative shrink-0 transition-colors"
                    style={{
                      width: "44px",
                      height: "24px",
                      borderRadius: "999px",
                      backgroundColor: subscribed ? "#16A34A" : "#D8DCE0",
                      border: "none",
                    }}
                    aria-pressed={subscribed}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: "2px",
                        left: subscribed ? "22px" : "2px",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        transition: "left 0.2s ease",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                      }}
                    />
                  </button>
                </label>

                <div>
                  <label className="block text-xs font-medium text-[#5B616A] mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!subscribed}
                    className="w-full px-3 py-2.5 border border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none text-sm text-[#2C2C2C] transition-colors disabled:bg-[#FAFAF8] disabled:opacity-60"
                    style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#5B616A] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
                    Frequency
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["weekly", "monthly", "quarterly"] as Frequency[]).map((f) => (
                      <button
                        key={f}
                        type="button"
                        disabled={!subscribed}
                        onClick={() => setFrequency(f)}
                        className={`px-3 py-2.5 text-sm font-semibold capitalize transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                          frequency === f
                            ? "bg-[#044c5c] text-white border border-[#044c5c]"
                            : "bg-white text-[#5B616A] border border-[#E6E8EB] hover:border-[#044c5c] hover:text-[#044c5c]"
                        }`}
                        style={{ borderRadius: 0 }}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white border border-[#E8DDD3] p-6 mb-6" style={{ borderRadius: 0 }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-[#E8F4F8]" style={{ borderRadius: 0 }}>
                  <Mail className="w-6 h-6 text-[#044c5c]" />
                </div>
                <div>
                  <h2
                    className="text-xl text-[#2C2C2C]"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    Topics
                  </h2>
                  <p className="text-sm text-[#5B616A]">Pick the categories that interest you</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topics.map((t) => {
                  const active = selected.has(t.key);
                  return (
                    <label
                      key={t.key}
                      className={`flex items-start justify-between gap-3 p-4 border cursor-pointer transition-colors ${
                        active
                          ? "border-[#044c5c] bg-[#F2F8F9]"
                          : "border-[#E6E8EB] hover:bg-[#FAFAF8]"
                      } ${!subscribed ? "opacity-50 cursor-not-allowed" : ""}`}
                      style={{ borderRadius: 0 }}
                    >
                      <div>
                        <div className="text-sm font-semibold text-[#2C2C2C]">{t.label}</div>
                        <div className="text-xs text-[#5B616A] mt-0.5">{t.desc}</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => subscribed && toggle(t.key)}
                        disabled={!subscribed}
                        className="mt-1 w-4 h-4 accent-[#044c5c] shrink-0"
                      />
                    </label>
                  );
                })}
              </div>
            </section>

            <div className="flex items-center justify-end gap-3 flex-wrap">
              {saved && (
                <span className="inline-flex items-center gap-1.5 text-sm text-[#16A34A] font-semibold">
                  <Check className="w-4 h-4" /> Preferences saved
                </span>
              )}
              <CtaButton variant="primary" size="md" onClick={save}>
                Save Preferences
              </CtaButton>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
