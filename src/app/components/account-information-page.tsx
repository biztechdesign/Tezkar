import { Link } from "react-router";
import { useState } from "react";
import { AccountSidebar } from "./account-sidebar";
import { User, Mail, Phone, Building2, Lock, Bell } from "lucide-react";
import { CtaButton } from "./ui/cta-button";

const inputClass =
  "w-full px-3 py-2.5 border border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none text-sm text-[#2C2C2C] transition-colors";
const inputStyle = { fontFamily: "Inter, sans-serif", borderRadius: 0 } as const;
const labelClass =
  "block text-xs font-medium text-[#5B616A] mb-1";
const labelStyle = { fontFamily: "Inter, sans-serif" } as const;

const fieldRow = "grid grid-cols-1 sm:grid-cols-2 gap-4";

export function AccountInformationPage() {
  const [profile, setProfile] = useState({
    firstName: "Ahmed",
    lastName: "Al-Rashid",
    email: "ahmed.alrashid@example.com",
    phone: "+971 50 123 4567",
    company: "Al-Rashid Trading LLC",
    jobTitle: "Procurement Manager",
  });
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [prefs, setPrefs] = useState({
    newsletter: true,
    promotions: true,
    orderUpdates: true,
    smsAlerts: false,
  });

  const setField = <K extends keyof typeof profile>(k: K, v: string) =>
    setProfile((p) => ({ ...p, [k]: v }));
  const setPwdField = <K extends keyof typeof pwd>(k: K, v: string) =>
    setPwd((p) => ({ ...p, [k]: v }));
  const togglePref = (k: keyof typeof prefs) =>
    setPrefs((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <div className="mx-auto pt-8 pb-[64px] px-6" style={{ maxWidth: "1400px" }}>
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link to="/" className="text-[#044c5c] hover:text-[#d41c5c] transition-colors">
                Home
              </Link>
            </li>
            <li className="text-[#2C2C2C]">/</li>
            <li className="text-[#2C2C2C]">Account Information</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <AccountSidebar />

          <main className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-8">
              <h1
                className="text-2xl md:text-4xl mb-2 md:mb-3"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Account Information
              </h1>
              <p className="text-[#2C2C2C] opacity-70">
                Update your personal details, password, and communication preferences
              </p>
            </div>

            {/* Personal Details */}
            <section className="bg-white border border-[#E8DDD3] p-6 mb-6" style={{ borderRadius: 0 }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-[#E8F4F8]" style={{ borderRadius: 0 }}>
                  <User className="w-6 h-6 text-[#044c5c]" />
                </div>
                <div>
                  <h2 className="text-xl text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                    Personal Details
                  </h2>
                  <p className="text-sm text-[#5B616A]">Your name and contact information</p>
                </div>
              </div>

              <div className={fieldRow}>
                <div>
                  <label className={labelClass} style={labelStyle}>First Name</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => setField("firstName", e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>Last Name</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => setField("lastName", e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>
                    <span className="inline-flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" /> Email Address
                    </span>
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setField("email", e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>
                    <span className="inline-flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" /> Phone Number
                    </span>
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" /> Company
                    </span>
                  </label>
                  <input
                    type="text"
                    value={profile.company}
                    onChange={(e) => setField("company", e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>Job Title</label>
                  <input
                    type="text"
                    value={profile.jobTitle}
                    onChange={(e) => setField("jobTitle", e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6 pt-5 border-t border-[#E6E8EB]">
                <CtaButton variant="primary" size="md">
                  Save Changes
                </CtaButton>
              </div>
            </section>

            {/* Change Password */}
            <section className="bg-white border border-[#E8DDD3] p-6 mb-6" style={{ borderRadius: 0 }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-[#E8F4F8]" style={{ borderRadius: 0 }}>
                  <Lock className="w-6 h-6 text-[#044c5c]" />
                </div>
                <div>
                  <h2 className="text-xl text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                    Change Password
                  </h2>
                  <p className="text-sm text-[#5B616A]">Use a strong password unique to this account</p>
                </div>
              </div>

              <div className="space-y-4">
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
                <div className={fieldRow}>
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
              </div>

              <div className="flex justify-end mt-6 pt-5 border-t border-[#E6E8EB]">
                <CtaButton variant="primary" size="md">
                  Update Password
                </CtaButton>
              </div>
            </section>

            {/* Communication Preferences */}
            <section className="bg-white border border-[#E8DDD3] p-6 mb-6" style={{ borderRadius: 0 }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-[#E8F4F8]" style={{ borderRadius: 0 }}>
                  <Bell className="w-6 h-6 text-[#044c5c]" />
                </div>
                <div>
                  <h2 className="text-xl text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
                    Communication Preferences
                  </h2>
                  <p className="text-sm text-[#5B616A]">Choose what we contact you about</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { key: "newsletter" as const, label: "Newsletter", desc: "Monthly highlights, catalogues & curated gift ideas" },
                  { key: "promotions" as const, label: "Promotions & Offers", desc: "Seasonal sales, flash deals & member-only perks" },
                  { key: "orderUpdates" as const, label: "Order Updates", desc: "Confirmations, dispatch & delivery notifications (recommended)" },
                  { key: "smsAlerts" as const, label: "SMS Alerts", desc: "Time-sensitive alerts sent to your phone" },
                ].map((p) => (
                  <label
                    key={p.key}
                    className="flex items-start justify-between gap-4 p-4 border border-[#E6E8EB] cursor-pointer hover:bg-[#FAFAF8] transition-colors"
                    style={{ borderRadius: 0 }}
                  >
                    <div>
                      <div className="font-semibold text-[#2C2C2C] text-sm">{p.label}</div>
                      <div className="text-xs text-[#5B616A] mt-0.5">{p.desc}</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={prefs[p.key]}
                      onChange={() => togglePref(p.key)}
                      className="mt-1 w-4 h-4 accent-[#044c5c]"
                    />
                  </label>
                ))}
              </div>

              <div className="flex justify-end mt-6 pt-5 border-t border-[#E6E8EB]">
                <CtaButton variant="primary" size="md">
                  Save Preferences
                </CtaButton>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
