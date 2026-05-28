import { Link } from "react-router";
import { useState } from "react";
import { AccountSidebar } from "./account-sidebar";
import { Mail, Check } from "lucide-react";
import { CtaButton } from "./ui/cta-button";

export function NewsletterPage() {
  const [subscribed, setSubscribed] = useState(true);
  const [email, setEmail] = useState("ahmed.alrashid@example.com");
  const [saved, setSaved] = useState(false);

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
