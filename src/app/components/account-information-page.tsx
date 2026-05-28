import { Briefcase, Building2, FileText, Mail, MessageCircle, Phone, User, Users } from "./icons";
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
const prefixOptions = ["Mr.", "Mrs.", "Ms.", "Dr.", "Eng."];

const inputClass =
  "w-full px-3 py-2 border border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none text-sm text-[#2C2C2C] transition-colors bg-white";
const inputStyle = { fontFamily: "Inter, sans-serif", borderRadius: 0 } as const;
const labelClass = "block text-xs font-medium text-[#5B616A] mb-1";
const labelStyle = { fontFamily: "Inter, sans-serif" } as const;

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  options?: string[];
}) {
  return (
    <div>
      <label className={labelClass} style={labelStyle}>{label}</label>
      {options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
          style={inputStyle}
        >
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClass}
          style={inputStyle}
        />
      )}
    </div>
  );
}

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

export function AccountInformationPage() {
  const customerGroup: "Individual" | "Corporate" | "Reseller" = "Corporate";

  const [data, setData] = useState({
    salesExecutive: "Ms. Aisha",
    prefix: "Mr.",
    firstName: "Ahmed",
    lastName: "Al-Rashid",
    companyName: "Al-Rashid Trading LLC",
    trn: "100445755864503",
    companyContact: "+971 4 123 4567",
    mobileNumber: "+971 50 123 4567",
    emailAddress: "ahmed.alrashid@example.com",
    secondEmail: "info@alrashid-trading.ae",
    purchaserName: "Ahmed Al-Rashid",
    purchaserPhone: "+971 50 123 4567",
    purchaserEmail: "ahmed.alrashid@example.com",
    accountsName: "Sara Mohammed",
    accountsPhone: "+971 50 987 6543",
    accountsEmail: "accounts@alrashid-trading.ae",
    tradeLicense: "trade-license-2024.pdf",
    vatCertificate: "vat-certificate.pdf",
    eidFront: "eid-front.jpg",
    eidBack: "eid-back.jpg",
    whatsappNumber: "+971 50 123 4567",
    optionalEmail: "promo@alrashid-trading.ae",
  });

  const setField = <K extends keyof typeof data>(k: K, v: typeof data[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const isIndividual = customerGroup === "Individual";
  const isCorporate = customerGroup === "Corporate";
  const showBusinessSections = !isIndividual;

  const documents = [
    { key: "tradeLicense" as const, label: "Trade License" },
    { key: "vatCertificate" as const, label: "VAT Certificate" },
    { key: "eidFront" as const, label: "EID / National ID (Front)" },
    { key: "eidBack" as const, label: "EID / National ID (Back)" },
  ];

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
            <li className="text-[#2C2C2C]">Account Information</li>
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
                Account Information
              </h1>
              <p className="text-sm text-[#5B616A]">
                Edit your customer profile. Addresses are managed in the Address Book.
              </p>
            </div>

            {/* Account Type */}
            <Section icon={Briefcase} title="Account Type">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field
                  label="MTC Sales Executive"
                  value={data.salesExecutive}
                  onChange={(val) => setField("salesExecutive", val)}
                  options={salesExecutiveOptions}
                />
                <div>
                  <label className={labelClass} style={labelStyle}>Customer Group</label>
                  <div
                    className="px-3 py-2 bg-[#FAFAF8] border border-[#E6E8EB] text-sm text-[#2C2C2C]"
                    style={{ fontFamily: "Inter, sans-serif", borderRadius: 0 }}
                  >
                    {customerGroup}
                    <span className="ml-2 text-xs text-[#8A9199]">(set by sales executive)</span>
                  </div>
                </div>
              </div>
            </Section>

            {/* Client's Name — always shown (covers BPF Individual variant fields) */}
            <Section icon={User} title="Client's Name">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field
                  label="Prefix"
                  value={data.prefix}
                  onChange={(val) => setField("prefix", val)}
                  options={prefixOptions}
                />
                <Field
                  label="First Name"
                  value={data.firstName}
                  onChange={(val) => setField("firstName", val)}
                />
                <Field
                  label="Last Name"
                  value={data.lastName}
                  onChange={(val) => setField("lastName", val)}
                />
              </div>
            </Section>

            {/* Company Details */}
            {showBusinessSections && (
              <Section icon={Building2} title="Company Details">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field
                    label="Company Name / Client's Name"
                    value={data.companyName}
                    onChange={(val) => setField("companyName", val)}
                  />
                  {isCorporate && (
                    <Field
                      label="TRN"
                      value={data.trn}
                      onChange={(val) => setField("trn", val.slice(0, 15))}
                      placeholder="Ex. 100445755864503"
                    />
                  )}
                </div>
              </Section>
            )}

            {/* Contact Numbers */}
            <Section icon={Phone} title="Contact Numbers">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {showBusinessSections && (
                  <Field
                    label="Company Contact Number"
                    value={data.companyContact}
                    onChange={(val) => setField("companyContact", val)}
                    type="tel"
                  />
                )}
                <Field
                  label="Contact Mobile Number (WhatsApp)"
                  value={data.mobileNumber}
                  onChange={(val) => setField("mobileNumber", val)}
                  type="tel"
                />
              </div>
            </Section>

            {/* Email Addresses */}
            <Section icon={Mail} title="Email Addresses">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field
                  label="Email Address"
                  value={data.emailAddress}
                  onChange={(val) => setField("emailAddress", val)}
                  type="email"
                />
                <Field
                  label="Second Email Address (Optional)"
                  value={data.secondEmail}
                  onChange={(val) => setField("secondEmail", val)}
                  type="email"
                />
              </div>
            </Section>

            {/* Customer Purchaser */}
            {showBusinessSections && (
              <Section icon={Users} title="Customer Purchaser">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Field
                    label="Purchaser's Name"
                    value={data.purchaserName}
                    onChange={(val) => setField("purchaserName", val)}
                  />
                  <Field
                    label="Purchaser's Phone"
                    value={data.purchaserPhone}
                    onChange={(val) => setField("purchaserPhone", val)}
                    type="tel"
                  />
                  <Field
                    label="Purchaser's Email"
                    value={data.purchaserEmail}
                    onChange={(val) => setField("purchaserEmail", val)}
                    type="email"
                  />
                </div>
              </Section>
            )}

            {/* Customer Accounts Person */}
            {showBusinessSections && (
              <Section icon={Users} title="Customer Accounts Person">
                <p
                  className="text-xs text-[#5B616A] mb-3 italic"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Incase Sales person and Accountant is the same person, please repeat the same details below.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Field
                    label="Accounts Person Name"
                    value={data.accountsName}
                    onChange={(val) => setField("accountsName", val)}
                  />
                  <Field
                    label="Accounts Person Phone"
                    value={data.accountsPhone}
                    onChange={(val) => setField("accountsPhone", val)}
                    type="tel"
                  />
                  <Field
                    label="Accounts Person Email"
                    value={data.accountsEmail}
                    onChange={(val) => setField("accountsEmail", val)}
                    type="email"
                  />
                </div>
              </Section>
            )}

            {/* Uploads & Attachments */}
            {showBusinessSections && (
              <Section icon={FileText} title="Uploads & Attachments">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {documents.map((d) => (
                    <div key={d.key}>
                      <label className={labelClass} style={labelStyle}>{d.label}</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.ppt,.pptx"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) setField(d.key, f.name);
                          }}
                          className={`${inputClass} file:mr-2 file:px-2 file:py-1 file:bg-[#FAFAF8] file:border-0 file:text-xs`}
                          style={inputStyle}
                        />
                      </div>
                      {data[d.key] && (
                        <p className="text-[11px] text-[#5B616A] mt-1 truncate" style={{ fontFamily: "Inter, sans-serif" }}>
                          Current: {data[d.key]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* WhatsApp & Promotional */}
            <Section icon={MessageCircle} title="WhatsApp & Promotional Contact">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field
                  label="WhatsApp Number"
                  value={data.whatsappNumber}
                  onChange={(val) => setField("whatsappNumber", val)}
                  type="tel"
                />
                <Field
                  label="Promotional Email (Optional)"
                  value={data.optionalEmail}
                  onChange={(val) => setField("optionalEmail", val)}
                  type="email"
                />
              </div>
            </Section>

            {/* Single save bar for all profile fields */}
            <div className="flex flex-wrap items-center justify-end gap-3 mb-8 pt-2">
              <CtaButton variant="secondary" size="md">
                Cancel
              </CtaButton>
              <CtaButton variant="primary" size="md">
                Save Changes
              </CtaButton>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
