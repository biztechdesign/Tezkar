import { Link } from "react-router";
import { useState } from "react";
import { AccountSidebar } from "./account-sidebar";
import {
  Briefcase,
  Building2,
  Phone,
  Mail,
  Users,
  MapPin,
  Truck,
  FileText,
  MessageCircle,
  Pencil,
  Check,
  X,
} from "lucide-react";
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
const customerGroupOptions = ["Individual", "Corporate", "Reseller"];
const countryOptions = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Bahrain",
  "Kuwait",
  "Oman",
  "Jordan",
  "Egypt",
  "India",
  "Pakistan",
  "Other",
];

const inputClass =
  "w-full px-3 py-2.5 border border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none text-sm text-[#2C2C2C] transition-colors bg-white";
const inputStyle = { fontFamily: "Inter, sans-serif", borderRadius: 0 } as const;
const labelClass = "block text-xs font-medium text-[#5B616A] mb-1";
const labelStyle = { fontFamily: "Inter, sans-serif" } as const;

function Field({
  label,
  value,
  editing,
  onChange,
  type = "text",
  placeholder,
  options,
}: {
  label: string;
  value: string;
  editing: boolean;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  options?: string[];
}) {
  return (
    <div>
      <label className={labelClass} style={labelStyle}>{label}</label>
      {editing ? (
        options ? (
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
        )
      ) : (
        <p className="text-sm text-[#2C2C2C] py-2 min-h-[42px]" style={{ fontFamily: "Inter, sans-serif" }}>
          {value || <span className="text-[#8A9199]">—</span>}
        </p>
      )}
    </div>
  );
}

function SectionCard({
  icon: Icon,
  title,
  subtitle,
  editing,
  onEdit,
  onSave,
  onCancel,
  children,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  editing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white border border-[#E8DDD3] p-6 mb-6" style={{ borderRadius: 0 }}>
      <div className="flex items-start justify-between gap-3 mb-5 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#E8F4F8]" style={{ borderRadius: 0 }}>
            <Icon className="w-6 h-6 text-[#044c5c]" />
          </div>
          <div>
            <h2 className="text-xl text-[#2C2C2C]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}>
              {title}
            </h2>
            <p className="text-sm text-[#5B616A]">{subtitle}</p>
          </div>
        </div>
        {editing ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#E6E8EB] text-[#5B616A] text-sm hover:bg-[#FAFAF8] transition-colors"
              style={{ borderRadius: 0 }}
            >
              <X className="w-4 h-4" /> Cancel
            </button>
            <button
              type="button"
              onClick={onSave}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#044c5c] text-white text-sm hover:bg-[#033d4a] transition-colors"
              style={{ borderRadius: 0 }}
            >
              <Check className="w-4 h-4" /> Save
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#044c5c] text-[#044c5c] text-sm hover:bg-[#F2F8F9] transition-colors"
            style={{ borderRadius: 0 }}
          >
            <Pencil className="w-4 h-4" /> Edit
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

type SectionKey =
  | "account"
  | "company"
  | "contact"
  | "email"
  | "purchaser"
  | "accounts"
  | "billing"
  | "shipping"
  | "documents"
  | "whatsapp";

export function BusinessInformationPage() {
  const [editing, setEditing] = useState<Record<SectionKey, boolean>>({
    account: false,
    company: false,
    contact: false,
    email: false,
    purchaser: false,
    accounts: false,
    billing: false,
    shipping: false,
    documents: false,
    whatsapp: false,
  });

  // committed values
  const [data, setData] = useState({
    salesExecutive: "Ms. Aisha",
    customerGroup: "Corporate",
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
    billingCountry: "United Arab Emirates",
    billingCity: "Dubai",
    area: "Bur Dubai",
    officeNumber: "Office 1204 - 12th Floor",
    buildingName: "Al Musalla Tower",
    streetName: "Bank Street",
    shippingMode: "billing" as "billing" | "add",
    shippingCity: "Dubai",
    tradeLicense: "trade-license-2024.pdf",
    vatCertificate: "vat-certificate.pdf",
    eidFront: "eid-front.jpg",
    eidBack: "eid-back.jpg",
    whatsappNumber: "+971 50 123 4567",
    optionalEmail: "promo@alrashid-trading.ae",
  });

  // draft values while editing
  const [draft, setDraft] = useState(data);
  const setDraftField = <K extends keyof typeof data>(k: K, v: typeof data[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  const startEdit = (k: SectionKey) => {
    setDraft(data);
    setEditing((e) => ({ ...e, [k]: true }));
  };
  const cancelEdit = (k: SectionKey) => {
    setDraft(data);
    setEditing((e) => ({ ...e, [k]: false }));
  };
  const saveEdit = (k: SectionKey) => {
    setData(draft);
    setEditing((e) => ({ ...e, [k]: false }));
  };

  const v = (k: keyof typeof data) => (editing[sectionFor(k)] ? draft[k] : data[k]);

  // section grouping for fields → not strictly needed since each Field uses local editing flag
  function sectionFor(k: keyof typeof data): SectionKey {
    switch (k) {
      case "salesExecutive":
      case "customerGroup":
        return "account";
      case "companyName":
      case "trn":
        return "company";
      case "companyContact":
      case "mobileNumber":
        return "contact";
      case "emailAddress":
      case "secondEmail":
        return "email";
      case "purchaserName":
      case "purchaserPhone":
      case "purchaserEmail":
        return "purchaser";
      case "accountsName":
      case "accountsPhone":
      case "accountsEmail":
        return "accounts";
      case "billingCountry":
      case "billingCity":
      case "area":
      case "officeNumber":
      case "buildingName":
      case "streetName":
        return "billing";
      case "shippingMode":
      case "shippingCity":
        return "shipping";
      case "tradeLicense":
      case "vatCertificate":
      case "eidFront":
      case "eidBack":
        return "documents";
      case "whatsappNumber":
      case "optionalEmail":
        return "whatsapp";
    }
  }

  const isCorporate = (editing.company ? draft.customerGroup : data.customerGroup) === "Corporate";

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
            <li className="text-[#2C2C2C]">Business Information</li>
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
                Business Information
              </h1>
              <p className="text-[#2C2C2C] opacity-70">
                Manage the details you submitted on the Business Partner Form. Use the Edit button on each section to update.
              </p>
            </div>

            {/* Account Type */}
            <SectionCard
              icon={Briefcase}
              title="Account Type"
              subtitle="Sales executive & customer group"
              editing={editing.account}
              onEdit={() => startEdit("account")}
              onSave={() => saveEdit("account")}
              onCancel={() => cancelEdit("account")}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="MTC Sales Executive"
                  value={String(v("salesExecutive"))}
                  editing={editing.account}
                  onChange={(val) => setDraftField("salesExecutive", val)}
                  options={salesExecutiveOptions}
                />
                <Field
                  label="Customer Group"
                  value={String(v("customerGroup"))}
                  editing={editing.account}
                  onChange={(val) => setDraftField("customerGroup", val)}
                  options={customerGroupOptions}
                />
              </div>
            </SectionCard>

            {/* Company Details */}
            <SectionCard
              icon={Building2}
              title="Company Details"
              subtitle="Company name and tax registration"
              editing={editing.company}
              onEdit={() => startEdit("company")}
              onSave={() => saveEdit("company")}
              onCancel={() => cancelEdit("company")}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Company Name / Client's Name"
                  value={String(v("companyName"))}
                  editing={editing.company}
                  onChange={(val) => setDraftField("companyName", val)}
                />
                {isCorporate && (
                  <Field
                    label="TRN"
                    value={String(v("trn"))}
                    editing={editing.company}
                    onChange={(val) => setDraftField("trn", val.slice(0, 15))}
                    placeholder="Ex. 100445755864503"
                  />
                )}
              </div>
            </SectionCard>

            {/* Contact Numbers */}
            <SectionCard
              icon={Phone}
              title="Contact Numbers"
              subtitle="Company landline and mobile / WhatsApp"
              editing={editing.contact}
              onEdit={() => startEdit("contact")}
              onSave={() => saveEdit("contact")}
              onCancel={() => cancelEdit("contact")}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Company Contact Number"
                  value={String(v("companyContact"))}
                  editing={editing.contact}
                  onChange={(val) => setDraftField("companyContact", val)}
                  type="tel"
                />
                <Field
                  label="Contact Mobile Number (WhatsApp)"
                  value={String(v("mobileNumber"))}
                  editing={editing.contact}
                  onChange={(val) => setDraftField("mobileNumber", val)}
                  type="tel"
                />
              </div>
            </SectionCard>

            {/* Email Addresses */}
            <SectionCard
              icon={Mail}
              title="Email Addresses"
              subtitle="Primary and secondary email"
              editing={editing.email}
              onEdit={() => startEdit("email")}
              onSave={() => saveEdit("email")}
              onCancel={() => cancelEdit("email")}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Email Address"
                  value={String(v("emailAddress"))}
                  editing={editing.email}
                  onChange={(val) => setDraftField("emailAddress", val)}
                  type="email"
                />
                <Field
                  label="Second Email Address (Optional)"
                  value={String(v("secondEmail"))}
                  editing={editing.email}
                  onChange={(val) => setDraftField("secondEmail", val)}
                  type="email"
                />
              </div>
            </SectionCard>

            {/* Purchaser Contact */}
            <SectionCard
              icon={Users}
              title="Customer Purchaser"
              subtitle="Person handling purchases"
              editing={editing.purchaser}
              onEdit={() => startEdit("purchaser")}
              onSave={() => saveEdit("purchaser")}
              onCancel={() => cancelEdit("purchaser")}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field
                  label="Purchaser's Name"
                  value={String(v("purchaserName"))}
                  editing={editing.purchaser}
                  onChange={(val) => setDraftField("purchaserName", val)}
                />
                <Field
                  label="Purchaser's Phone"
                  value={String(v("purchaserPhone"))}
                  editing={editing.purchaser}
                  onChange={(val) => setDraftField("purchaserPhone", val)}
                  type="tel"
                />
                <Field
                  label="Purchaser's Email"
                  value={String(v("purchaserEmail"))}
                  editing={editing.purchaser}
                  onChange={(val) => setDraftField("purchaserEmail", val)}
                  type="email"
                />
              </div>
            </SectionCard>

            {/* Accounts Contact */}
            <SectionCard
              icon={Users}
              title="Customer Accounts Person"
              subtitle="Person handling accounting"
              editing={editing.accounts}
              onEdit={() => startEdit("accounts")}
              onSave={() => saveEdit("accounts")}
              onCancel={() => cancelEdit("accounts")}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field
                  label="Accounts Person Name"
                  value={String(v("accountsName"))}
                  editing={editing.accounts}
                  onChange={(val) => setDraftField("accountsName", val)}
                />
                <Field
                  label="Accounts Person Phone"
                  value={String(v("accountsPhone"))}
                  editing={editing.accounts}
                  onChange={(val) => setDraftField("accountsPhone", val)}
                  type="tel"
                />
                <Field
                  label="Accounts Person Email"
                  value={String(v("accountsEmail"))}
                  editing={editing.accounts}
                  onChange={(val) => setDraftField("accountsEmail", val)}
                  type="email"
                />
              </div>
            </SectionCard>

            {/* Billing Address */}
            <SectionCard
              icon={MapPin}
              title="Billing Address"
              subtitle="Primary invoicing address"
              editing={editing.billing}
              onEdit={() => startEdit("billing")}
              onSave={() => saveEdit("billing")}
              onCancel={() => cancelEdit("billing")}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Country"
                  value={String(v("billingCountry"))}
                  editing={editing.billing}
                  onChange={(val) => setDraftField("billingCountry", val)}
                  options={countryOptions}
                />
                <Field
                  label="City / State"
                  value={String(v("billingCity"))}
                  editing={editing.billing}
                  onChange={(val) => setDraftField("billingCity", val)}
                />
                <Field
                  label="Area"
                  value={String(v("area"))}
                  editing={editing.billing}
                  onChange={(val) => setDraftField("area", val)}
                />
                <Field
                  label="Office / Flat & Floor"
                  value={String(v("officeNumber"))}
                  editing={editing.billing}
                  onChange={(val) => setDraftField("officeNumber", val)}
                />
                <Field
                  label="Building Name"
                  value={String(v("buildingName"))}
                  editing={editing.billing}
                  onChange={(val) => setDraftField("buildingName", val)}
                />
                <Field
                  label="Street Name"
                  value={String(v("streetName"))}
                  editing={editing.billing}
                  onChange={(val) => setDraftField("streetName", val)}
                />
              </div>
            </SectionCard>

            {/* Shipping */}
            <SectionCard
              icon={Truck}
              title="Shipping Address"
              subtitle="Where deliveries are sent"
              editing={editing.shipping}
              onEdit={() => startEdit("shipping")}
              onSave={() => saveEdit("shipping")}
              onCancel={() => cancelEdit("shipping")}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Shipping Mode"
                  value={
                    (editing.shipping ? draft.shippingMode : data.shippingMode) === "billing"
                      ? "Use Billing Details"
                      : "Add Shipping Details"
                  }
                  editing={editing.shipping}
                  onChange={(val) =>
                    setDraftField("shippingMode", val === "Use Billing Details" ? "billing" : "add")
                  }
                  options={["Use Billing Details", "Add Shipping Details"]}
                />
                <Field
                  label="Shipping City / State"
                  value={String(v("shippingCity"))}
                  editing={editing.shipping}
                  onChange={(val) => setDraftField("shippingCity", val)}
                />
              </div>
            </SectionCard>

            {/* Documents */}
            <SectionCard
              icon={FileText}
              title="Uploads & Attachments"
              subtitle="Trade license, VAT certificate, EID"
              editing={editing.documents}
              onEdit={() => startEdit("documents")}
              onSave={() => saveEdit("documents")}
              onCancel={() => cancelEdit("documents")}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(
                  [
                    { key: "tradeLicense", label: "Trade License" },
                    { key: "vatCertificate", label: "VAT Certificate" },
                    { key: "eidFront", label: "EID / National ID (Front)" },
                    { key: "eidBack", label: "EID / National ID (Back)" },
                  ] as const
                ).map((d) => (
                  <div key={d.key}>
                    <label className={labelClass} style={labelStyle}>{d.label}</label>
                    {editing.documents ? (
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.ppt,.pptx"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) setDraftField(d.key, f.name);
                        }}
                        className={inputClass}
                        style={inputStyle}
                      />
                    ) : (
                      <div className="flex items-center justify-between border border-[#E6E8EB] px-3 py-2.5 bg-[#FAFAF8]" style={{ borderRadius: 0 }}>
                        <span className="text-sm text-[#2C2C2C] truncate">{data[d.key] || "—"}</span>
                        {data[d.key] && (
                          <a
                            href="#"
                            className="text-xs text-[#044c5c] hover:text-[#d41c5c] underline ml-2 shrink-0"
                            onClick={(e) => e.preventDefault()}
                          >
                            View
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* WhatsApp + Optional */}
            <SectionCard
              icon={MessageCircle}
              title="WhatsApp & Promotional Contact"
              subtitle="Used for offers and promotions"
              editing={editing.whatsapp}
              onEdit={() => startEdit("whatsapp")}
              onSave={() => saveEdit("whatsapp")}
              onCancel={() => cancelEdit("whatsapp")}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="WhatsApp Number"
                  value={String(v("whatsappNumber"))}
                  editing={editing.whatsapp}
                  onChange={(val) => setDraftField("whatsappNumber", val)}
                  type="tel"
                />
                <Field
                  label="Promotional Email (Optional)"
                  value={String(v("optionalEmail"))}
                  editing={editing.whatsapp}
                  onChange={(val) => setDraftField("optionalEmail", val)}
                  type="email"
                />
              </div>
            </SectionCard>

            <div className="flex justify-end">
              <CtaButton variant="secondary" size="md" to="/business-partner-form">
                View Original Form
              </CtaButton>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
