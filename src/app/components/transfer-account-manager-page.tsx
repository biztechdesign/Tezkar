import { Link } from "react-router";
import { useState } from "react";
import { AccountSidebar } from "./account-sidebar";
import { Briefcase, MessageCircle, Phone, UploadCloud, User, UserCog } from "./icons";
import { CtaButton } from "./ui/cta-button";

const salesExecutiveOptions = [
  "Ms. Aisha",
  "Ahmad Al Rashid",
  "Sara Mohammed",
  "Khalid Al Mansoori",
  "Fatima Al Zaabi",
  "Omar Al Hashimi",
  "Noor Al Farsi",
  "Other",
];

const inputClass =
  "w-full px-3 py-2 border border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none text-sm text-[#2C2C2C] transition-colors bg-white";
const inputStyle = { fontFamily: "Inter, sans-serif", borderRadius: 0 } as const;
const labelClass = "block text-xs font-medium text-[#5B616A] mb-1";
const labelStyle = { fontFamily: "Inter, sans-serif" } as const;

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white border border-[#E8DDD3] p-4 mb-4" style={{ borderRadius: 0 }}>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#F0EBE5]">
        <Icon className="w-4 h-4 text-[#044c5c]" strokeWidth={1.8} />
        <h2
          className="text-sm text-[#2C2C2C] uppercase tracking-wide"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, letterSpacing: "0.04em" }}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export function TransferAccountManagerPage() {
  const [mtcSalesExec, setMtcSalesExec] = useState("");
  const [currentSalesExec, setCurrentSalesExec] = useState("");
  const [newSalesExec, setNewSalesExec] = useState("");
  const [yourCompany, setYourCompany] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyContact, setCompanyContact] = useState("");
  const [mobileWhatsapp, setMobileWhatsapp] = useState("");
  const [mobileSms, setMobileSms] = useState("");
  const [reason, setReason] = useState("");
  const [agreed, setAgreed] = useState(false);

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
            <li className="text-[#2C2C2C]">Transfer Key Account Manager</li>
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
                Transfer Key Account Manager
              </h1>
              <p className="text-sm text-[#5B616A]">
                Switch your assigned Sales Executive to another team member.
              </p>
            </div>

            <Section icon={UserCog} title="Sales Executive">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} style={labelStyle}>
                    Select MTC Sales Executive Name
                  </label>
                  <select
                    value={mtcSalesExec}
                    onChange={(e) => setMtcSalesExec(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  >
                    <option value="">Select MTC Sales Executive</option>
                    {salesExecutiveOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>
                    Current Sales Executive Person Name
                  </label>
                  <select
                    value={currentSalesExec}
                    onChange={(e) => setCurrentSalesExec(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  >
                    <option value="">Select Current Sales Executive</option>
                    {salesExecutiveOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} style={labelStyle}>
                    Switch to Sales Executive Person
                  </label>
                  <select
                    value={newSalesExec}
                    onChange={(e) => setNewSalesExec(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  >
                    <option value="">Select your "New" Sales Executive</option>
                    {salesExecutiveOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>
            </Section>

            <Section icon={Briefcase} title="Company Details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} style={labelStyle}>Your Company Name / Client's Name</label>
                  <input
                    type="text"
                    value={yourCompany}
                    onChange={(e) => setYourCompany(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>Company Name / Client's Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              </div>
            </Section>

            <Section icon={Phone} title="Contact Numbers">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass} style={labelStyle}>Company Contact Number</label>
                  <input
                    type="tel"
                    placeholder="ex. +971 00 123 4567"
                    value={companyContact}
                    onChange={(e) => setCompanyContact(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>
                    Contact Mobile Number ( WhatsApp Purpose )
                  </label>
                  <input
                    type="tel"
                    placeholder="ex. 971 50 123 4567"
                    value={mobileWhatsapp}
                    onChange={(e) => setMobileWhatsapp(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} style={labelStyle}>
                    Contact Mobile Number ( SMS / WhatsApp Purpose )
                  </label>
                  <input
                    type="tel"
                    placeholder="ex. 971 50 123 4567"
                    value={mobileSms}
                    onChange={(e) => setMobileSms(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              </div>
            </Section>

            <Section icon={MessageCircle} title="Reason for Change">
              <div>
                <label className={labelClass} style={labelStyle}>Reason for the change</label>
                <textarea
                  rows={3}
                  placeholder="Comment & Reason why you decided to change."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className={`${inputClass} resize-y`}
                  style={inputStyle}
                />
              </div>
            </Section>

            <Section icon={User} title="Confirmation">
              <label
                className="flex items-start gap-2 cursor-pointer select-none"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[#044c5c] cursor-pointer flex-shrink-0"
                />
                <span className="text-sm text-[#2C2C2C]">
                  I agree to change my assigned Key Account Manager
                </span>
              </label>
            </Section>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <CtaButton variant="secondary" size="md">
                Cancel
              </CtaButton>
              <CtaButton
                variant="primary"
                size="md"
                leftIcon={<UploadCloud className="w-4 h-4" strokeWidth={1.8} />}
                disabled={!agreed}
              >
                Submit Request
              </CtaButton>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
