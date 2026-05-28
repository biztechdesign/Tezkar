import { UploadCloud, UserCog } from "./icons";
import { Link } from "react-router";
import { useState } from "react";
import { AccountSidebar } from "./account-sidebar";
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
  "w-full px-3 py-2.5 border border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none text-sm text-[#2C2C2C] transition-colors bg-white";
const inputStyle = { fontFamily: "Inter, sans-serif", borderRadius: 0 } as const;

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label
      className="block text-sm text-[#2C2C2C] mb-1.5"
      style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
    >
      {children}
      {required && (
        <span className="text-[#d41c5c] ml-1" style={{ fontStyle: "italic" }}>
          (Req.)
        </span>
      )}
    </label>
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
      <div className="mx-auto pt-8 pb-[64px] px-6" style={{ maxWidth: "1400px" }}>
        <nav className="mb-6">
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
            <div className="mb-8">
              <h1
                className="text-2xl md:text-4xl mb-2 md:mb-3"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                Transfer Key Account Manager
              </h1>
              <p className="text-[#2C2C2C] opacity-70">
                Switch your assigned Sales Executive to another team member.
              </p>
            </div>

            <div className="bg-white border border-[#E8DDD3] p-6 md:p-8" style={{ borderRadius: 0 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-[#E8F4F8]" style={{ borderRadius: 0 }}>
                  <UserCog className="w-5 h-5 text-[#044c5c]" strokeWidth={1.6} />
                </div>
                <div>
                  <h2
                    className="text-xl text-[#2C2C2C]"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                  >
                    Transfer Request
                  </h2>
                  <p className="text-xs text-[#5B616A]" style={{ fontFamily: "Inter, sans-serif" }}>
                    <span className="text-[#d41c5c]" style={{ fontStyle: "italic" }}>(Req.)</span>{" "}
                    indicates required fields
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <Label required>Select MTC Sales Executive Name</Label>
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
                  <Label required>Current Sales Executive Person Name</Label>
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

                <div className="md:col-span-2">
                  <Label required>Switch to Sales Executive Person</Label>
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

                <div className="md:col-span-2">
                  <Label required>Your Company Name / Client's Name</Label>
                  <input
                    type="text"
                    value={yourCompany}
                    onChange={(e) => setYourCompany(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label required>Company Name / Client's Name</Label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <Label required>Company Contact Number</Label>
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
                  <Label required>Contact Mobile Number ( WhatsApp Purpose )</Label>
                  <input
                    type="tel"
                    placeholder="ex. 971 50 123 4567"
                    value={mobileWhatsapp}
                    onChange={(e) => setMobileWhatsapp(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Contact Mobile Number ( SMS / WhatsApp Purpose )</Label>
                  <input
                    type="tel"
                    placeholder="ex. 971 50 123 4567"
                    value={mobileSms}
                    onChange={(e) => setMobileSms(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Reason for the change</Label>
                  <textarea
                    rows={4}
                    placeholder="Comment & Reason why you decided to change."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className={`${inputClass} resize-y`}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="mt-7 pt-5 border-t border-[#E6E8EB]">
                <Label required>Change Confirmation.</Label>
                <label
                  className="flex items-start gap-3 cursor-pointer select-none"
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
              </div>

              <div className="mt-7 pt-5 border-t border-[#E6E8EB]">
                <CtaButton
                  variant="secondary"
                  size="md"
                  leftIcon={<UploadCloud className="w-4 h-4" strokeWidth={1.8} />}
                  disabled={!agreed}
                >
                  Save and Continue Later
                </CtaButton>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
