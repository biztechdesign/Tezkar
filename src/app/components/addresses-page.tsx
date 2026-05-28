import { Link } from "react-router";
import { useState } from "react";
import { AccountSidebar } from "./account-sidebar";
import { MapPin, Truck } from "lucide-react";
import { CtaButton } from "./ui/cta-button";

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

export function AddressesPage() {
  const [data, setData] = useState({
    billingCountry: "United Arab Emirates",
    billingCity: "Dubai",
    area: "Bur Dubai",
    officeNumber: "Office 1204 - 12th Floor",
    buildingName: "Al Musalla Tower",
    streetName: "Bank Street",
    shippingMode: "billing" as "billing" | "add",
    shippingCountry: "United Arab Emirates",
    shippingCity: "Dubai",
    shippingArea: "",
    shippingOfficeNumber: "",
    shippingBuildingName: "",
    shippingStreetName: "",
  });

  const setField = <K extends keyof typeof data>(k: K, v: typeof data[K]) =>
    setData((d) => ({ ...d, [k]: v }));

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
            <li className="text-[#2C2C2C]">Address Book</li>
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
                Address Book
              </h1>
              <p className="text-sm text-[#5B616A]">
                Manage your billing and shipping addresses.
              </p>
            </div>

            <Section icon={MapPin} title="Billing Address">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field
                  label="Billing Country"
                  value={data.billingCountry}
                  onChange={(val) => setField("billingCountry", val)}
                  options={countryOptions}
                />
                <Field
                  label="Billing City / State"
                  value={data.billingCity}
                  onChange={(val) => setField("billingCity", val)}
                  placeholder="ex. Dubai"
                />
                <Field
                  label="Area"
                  value={data.area}
                  onChange={(val) => setField("area", val)}
                  placeholder="Example : Bur Dubai"
                />
                <Field
                  label="Office Number / Flat Number and Floor"
                  value={data.officeNumber}
                  onChange={(val) => setField("officeNumber", val)}
                  placeholder="Ex. Office 12345 - 2nd Floor"
                />
                <Field
                  label="Building Name"
                  value={data.buildingName}
                  onChange={(val) => setField("buildingName", val)}
                  placeholder="Please enter exact Building name"
                />
                <Field
                  label="Street Name"
                  value={data.streetName}
                  onChange={(val) => setField("streetName", val)}
                  placeholder="Ex. Omar Bin Al Khattab Street"
                />
              </div>
            </Section>

            <Section icon={Truck} title="Shipping Address">
              <div className="mb-3">
                <label className={labelClass} style={labelStyle}>Shipping Mode</label>
                <div className="flex flex-wrap items-center gap-5">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="shippingMode"
                      checked={data.shippingMode === "billing"}
                      onChange={() => setField("shippingMode", "billing")}
                      className="accent-[#044c5c]"
                    />
                    <span className="text-sm text-[#2C2C2C]" style={{ fontFamily: "Inter, sans-serif" }}>
                      Use Billing Details
                    </span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="shippingMode"
                      checked={data.shippingMode === "add"}
                      onChange={() => setField("shippingMode", "add")}
                      className="accent-[#044c5c]"
                    />
                    <span className="text-sm text-[#2C2C2C]" style={{ fontFamily: "Inter, sans-serif" }}>
                      Add Shipping Details
                    </span>
                  </label>
                </div>
              </div>

              {data.shippingMode === "add" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#F0EBE5]">
                  <Field
                    label="Shipping Country"
                    value={data.shippingCountry}
                    onChange={(val) => setField("shippingCountry", val)}
                    options={countryOptions}
                  />
                  <Field
                    label="Shipping City / State"
                    value={data.shippingCity}
                    onChange={(val) => setField("shippingCity", val)}
                    placeholder="ex. Dubai"
                  />
                  <Field
                    label="Area"
                    value={data.shippingArea}
                    onChange={(val) => setField("shippingArea", val)}
                    placeholder="Example : Bur Dubai"
                  />
                  <Field
                    label="Office Number / Flat Number and Floor"
                    value={data.shippingOfficeNumber}
                    onChange={(val) => setField("shippingOfficeNumber", val)}
                    placeholder="Ex. Office 12345 - 2nd Floor"
                  />
                  <Field
                    label="Building Name"
                    value={data.shippingBuildingName}
                    onChange={(val) => setField("shippingBuildingName", val)}
                    placeholder="Please enter exact Building name"
                  />
                  <Field
                    label="Street Name"
                    value={data.shippingStreetName}
                    onChange={(val) => setField("shippingStreetName", val)}
                    placeholder="Ex. Omar Bin Al Khattab Street"
                  />
                </div>
              )}
            </Section>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
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
