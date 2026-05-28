import { Lock } from "./icons";
import { Link } from "react-router";
import { useState } from "react";
import { AccountSidebar } from "./account-sidebar";
import { CtaButton } from "./ui/cta-button";

const inputClass =
  "w-full px-3 py-2 border border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none text-sm text-[#2C2C2C] transition-colors bg-white";
const inputStyle = { fontFamily: "Inter, sans-serif", borderRadius: 0 } as const;
const labelClass = "block text-xs font-medium text-[#5B616A] mb-1";
const labelStyle = { fontFamily: "Inter, sans-serif" } as const;

export function ChangePasswordPage() {
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const setPwdField = <K extends keyof typeof pwd>(k: K, val: string) =>
    setPwd((p) => ({ ...p, [k]: val }));

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
            <li className="text-[#2C2C2C]">Change Password</li>
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
                Change Password
              </h1>
              <p className="text-sm text-[#5B616A]">
                Use a strong password unique to this account.
              </p>
            </div>

            <section className="bg-white border border-[#E8DDD3] p-4 mb-4" style={{ borderRadius: 0 }}>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#F0EBE5]">
                <Lock className="w-4 h-4 text-[#044c5c]" strokeWidth={1.8} />
                <h2
                  className="text-sm text-[#2C2C2C] uppercase tracking-wide"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, letterSpacing: "0.04em" }}
                >
                  Password
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className={labelClass} style={labelStyle}>Current Password</label>
                  <input
                    type="password"
                    value={pwd.current}
                    onChange={(e) => setPwdField("current", e.target.value)}
                    placeholder="••••••••"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>New Password</label>
                  <input
                    type="password"
                    value={pwd.next}
                    onChange={(e) => setPwdField("next", e.target.value)}
                    placeholder="At least 8 characters"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>Confirm New Password</label>
                  <input
                    type="password"
                    value={pwd.confirm}
                    onChange={(e) => setPwdField("confirm", e.target.value)}
                    placeholder="Re-enter new password"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              </div>
            </section>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <CtaButton variant="secondary" size="md">
                Cancel
              </CtaButton>
              <CtaButton variant="primary" size="md">
                Update Password
              </CtaButton>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
