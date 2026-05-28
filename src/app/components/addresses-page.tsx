import { CheckCircle, Edit, MapPin, Plus, Star, Trash2, X } from "./icons";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { AccountSidebar } from "./account-sidebar";
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

const labelOptions = ["Office", "Warehouse", "Home", "Branch", "Other"];

const inputClass =
  "w-full px-3 py-2 border border-[#E6E8EB] focus:border-[#044c5c] focus:outline-none text-sm text-[#2C2C2C] transition-colors bg-white";
const inputStyle = { fontFamily: "Inter, sans-serif", borderRadius: 0 } as const;
const labelClass = "block text-xs font-medium text-[#5B616A] mb-1";
const labelStyle = { fontFamily: "Inter, sans-serif" } as const;

interface Address {
  id: string;
  label: string;
  country: string;
  city: string;
  area: string;
  officeNumber: string;
  buildingName: string;
  streetName: string;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
}

const initialAddresses: Address[] = [
  {
    id: "addr-1",
    label: "Office",
    country: "United Arab Emirates",
    city: "Dubai",
    area: "Bur Dubai",
    officeNumber: "Office 1204 - 12th Floor",
    buildingName: "Al Musalla Tower",
    streetName: "Bank Street",
    isDefaultBilling: true,
    isDefaultShipping: true,
  },
  {
    id: "addr-2",
    label: "Warehouse",
    country: "United Arab Emirates",
    city: "Sharjah",
    area: "Industrial Area 3",
    officeNumber: "Unit 7B",
    buildingName: "Al Saja'a Logistics Park",
    streetName: "Emirates Industrial Road",
    isDefaultBilling: false,
    isDefaultShipping: false,
  },
];

const emptyAddress: Omit<Address, "id"> = {
  label: "Office",
  country: "United Arab Emirates",
  city: "",
  area: "",
  officeNumber: "",
  buildingName: "",
  streetName: "",
  isDefaultBilling: false,
  isDefaultShipping: false,
};

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
        <select value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} style={inputStyle}>
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

function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefaultBilling,
  onSetDefaultShipping,
}: {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefaultBilling: () => void;
  onSetDefaultShipping: () => void;
}) {
  return (
    <div
      className="bg-white border border-[#E8DDD3] p-4 flex flex-col"
      style={{ borderRadius: 0 }}
    >
      <div className="flex items-start justify-between gap-2 mb-3 pb-2 border-b border-[#F0EBE5]">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#044c5c]" strokeWidth={1.8} />
          <h3
            className="text-sm text-[#2C2C2C] uppercase tracking-wide"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, letterSpacing: "0.04em" }}
          >
            {address.label}
          </h3>
          <div className="flex items-center gap-1">
            {address.isDefaultBilling && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold"
                style={{
                  color: "#044c5c",
                  backgroundColor: "#E8F4F8",
                  borderRadius: 9999,
                  fontFamily: "Inter, sans-serif",
                }}
                title="Default billing address"
              >
                <Star className="w-2.5 h-2.5" /> Billing
              </span>
            )}
            {address.isDefaultShipping && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold"
                style={{
                  color: "#1F7A2E",
                  backgroundColor: "#E6F4E9",
                  borderRadius: 9999,
                  fontFamily: "Inter, sans-serif",
                }}
                title="Default shipping address"
              >
                <Star className="w-2.5 h-2.5" /> Shipping
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            title="Edit address"
            onClick={onEdit}
            className="p-1.5 text-[#5B616A] hover:text-[#044c5c] hover:bg-[#F2F8F9] transition-colors"
            style={{ borderRadius: 9999 }}
          >
            <Edit className="w-4 h-4" strokeWidth={1.8} />
          </button>
          <button
            type="button"
            title="Delete address"
            onClick={onDelete}
            className="p-1.5 text-[#5B616A] hover:text-[#d41c5c] hover:bg-[#FBE3E8] transition-colors"
            style={{ borderRadius: 9999 }}
          >
            <Trash2 className="w-4 h-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <div
        className="text-sm text-[#2C2C2C] space-y-0.5 flex-1"
        style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.55 }}
      >
        {address.officeNumber && <div>{address.officeNumber}</div>}
        {address.buildingName && <div>{address.buildingName}</div>}
        {address.streetName && <div>{address.streetName}</div>}
        {(address.area || address.city) && (
          <div>
            {[address.area, address.city].filter(Boolean).join(", ")}
          </div>
        )}
        <div>{address.country}</div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-[#F0EBE5]">
        <button
          type="button"
          onClick={onSetDefaultBilling}
          disabled={address.isDefaultBilling}
          className="inline-flex items-center gap-1.5 text-xs text-[#044c5c] hover:text-[#d41c5c] disabled:text-[#8A9199] disabled:cursor-not-allowed transition-colors"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
        >
          <CheckCircle className="w-3.5 h-3.5" />
          {address.isDefaultBilling ? "Default Billing" : "Set as Default Billing"}
        </button>
        <button
          type="button"
          onClick={onSetDefaultShipping}
          disabled={address.isDefaultShipping}
          className="inline-flex items-center gap-1.5 text-xs text-[#044c5c] hover:text-[#d41c5c] disabled:text-[#8A9199] disabled:cursor-not-allowed transition-colors"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
        >
          <CheckCircle className="w-3.5 h-3.5" />
          {address.isDefaultShipping ? "Default Shipping" : "Set as Default Shipping"}
        </button>
      </div>
    </div>
  );
}

function AddressModal({
  editing,
  onSave,
  onCancel,
  updateField,
}: {
  editing: Address;
  onSave: () => void;
  onCancel: () => void;
  updateField: <K extends keyof Address>(k: K, v: Address[K]) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onCancel(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div
        className="bg-white w-full max-h-[90vh] overflow-y-auto"
        style={{ maxWidth: 640, borderRadius: 0 }}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8DDD3]">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#044c5c]" strokeWidth={1.8} />
            <h2
              className="text-sm text-[#2C2C2C] uppercase tracking-wide"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, letterSpacing: "0.04em" }}
            >
              {editing.id ? "Edit Address" : "Add New Address"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 text-[#5B616A] hover:text-[#d41c5c] hover:bg-[#FBE3E8] transition-colors"
            style={{ borderRadius: 9999 }}
          >
            <X className="w-4 h-4" strokeWidth={1.8} />
          </button>
        </div>

        {/* Modal body */}
        <div className="px-5 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field
              label="Label"
              value={editing.label}
              onChange={(val) => updateField("label", val)}
              options={labelOptions}
            />
            <Field
              label="Country"
              value={editing.country}
              onChange={(val) => updateField("country", val)}
              options={countryOptions}
            />
            <Field
              label="City / State"
              value={editing.city}
              onChange={(val) => updateField("city", val)}
              placeholder="ex. Dubai"
            />
            <Field
              label="Area"
              value={editing.area}
              onChange={(val) => updateField("area", val)}
              placeholder="Example : Bur Dubai"
            />
            <Field
              label="Office / Flat Number and Floor"
              value={editing.officeNumber}
              onChange={(val) => updateField("officeNumber", val)}
              placeholder="Ex. Office 12345 - 2nd Floor"
            />
            <Field
              label="Building Name"
              value={editing.buildingName}
              onChange={(val) => updateField("buildingName", val)}
              placeholder="Please enter exact Building name"
            />
            <div className="sm:col-span-2">
              <Field
                label="Street Name"
                value={editing.streetName}
                onChange={(val) => updateField("streetName", val)}
                placeholder="Ex. Omar Bin Al Khattab Street"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 mt-4 pt-3 border-t border-[#F0EBE5]">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editing.isDefaultBilling}
                onChange={(e) => updateField("isDefaultBilling", e.target.checked)}
                className="accent-[#044c5c]"
              />
              <span className="text-sm text-[#2C2C2C]" style={{ fontFamily: "Inter, sans-serif" }}>
                Set as default billing address
              </span>
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editing.isDefaultShipping}
                onChange={(e) => updateField("isDefaultShipping", e.target.checked)}
                className="accent-[#044c5c]"
              />
              <span className="text-sm text-[#2C2C2C]" style={{ fontFamily: "Inter, sans-serif" }}>
                Set as default shipping address
              </span>
            </label>
          </div>
        </div>

        {/* Modal footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-[#E8DDD3]">
          <CtaButton variant="secondary" size="md" onClick={onCancel}>
            Cancel
          </CtaButton>
          <CtaButton variant="primary" size="md" onClick={onSave}>
            {editing.id ? "Save Changes" : "Add Address"}
          </CtaButton>
        </div>
      </div>
    </div>
  );
}

export function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [editing, setEditing] = useState<Address | null>(null);

  const startAdd = () => {
    setEditing({ id: "", ...emptyAddress });
  };

  const startEdit = (addr: Address) => {
    setEditing({ ...addr });
  };

  const cancel = () => setEditing(null);

  const saveEditing = () => {
    if (!editing) return;
    setAddresses((list) => {
      const next = editing.id
        ? list.map((a) => (a.id === editing.id ? editing : a))
        : [...list, { ...editing, id: `addr-${Date.now()}` }];
      // ensure only one default for each flag
      const ensureSingleDefault = (arr: Address[], key: "isDefaultBilling" | "isDefaultShipping") => {
        if (!editing[key]) return arr;
        return arr.map((a) =>
          a.id === (editing.id || arr[arr.length - 1].id) ? a : { ...a, [key]: false }
        );
      };
      let result = ensureSingleDefault(next, "isDefaultBilling");
      result = ensureSingleDefault(result, "isDefaultShipping");
      // if it's the only address, force defaults on
      if (result.length === 1) {
        result = [{ ...result[0], isDefaultBilling: true, isDefaultShipping: true }];
      }
      return result;
    });
    setEditing(null);
  };

  const deleteAddress = (id: string) => {
    setAddresses((list) => {
      const next = list.filter((a) => a.id !== id);
      const removed = list.find((a) => a.id === id);
      if (!removed) return next;
      // promote next available address if defaults were removed
      if (next.length > 0) {
        if (removed.isDefaultBilling && !next.some((a) => a.isDefaultBilling)) {
          next[0] = { ...next[0], isDefaultBilling: true };
        }
        if (removed.isDefaultShipping && !next.some((a) => a.isDefaultShipping)) {
          next[0] = { ...next[0], isDefaultShipping: true };
        }
      }
      return next;
    });
  };

  const setDefaultBilling = (id: string) => {
    setAddresses((list) =>
      list.map((a) => ({ ...a, isDefaultBilling: a.id === id }))
    );
  };

  const setDefaultShipping = (id: string) => {
    setAddresses((list) =>
      list.map((a) => ({ ...a, isDefaultShipping: a.id === id }))
    );
  };

  const updateEditingField = <K extends keyof Address>(k: K, v: Address[K]) => {
    setEditing((e) => (e ? { ...e, [k]: v } : e));
  };

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
            <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
              <div>
                <h1
                  className="text-xl md:text-2xl mb-1"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  Address Book
                </h1>
                <p className="text-sm text-[#5B616A]">
                  Save multiple billing and shipping addresses for faster checkout.
                </p>
              </div>
              <CtaButton variant="primary" size="md" onClick={startAdd}>
                <span className="inline-flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Address
                </span>
              </CtaButton>
            </div>

            {/* Address grid */}
            {addresses.length === 0 ? (
              <div
                className="bg-white border border-dashed border-[#E8DDD3] px-6 py-10 text-center"
                style={{ borderRadius: 0 }}
              >
                <MapPin className="w-8 h-8 text-[#5B616A] mx-auto mb-2" />
                <p className="text-sm text-[#5B616A]" style={{ fontFamily: "Inter, sans-serif" }}>
                  No addresses saved yet. Click <span className="text-[#044c5c]" style={{ fontWeight: 600 }}>Add New Address</span> to get started.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {addresses.map((addr) => (
                  <AddressCard
                    key={addr.id}
                    address={addr}
                    onEdit={() => startEdit(addr)}
                    onDelete={() => deleteAddress(addr.id)}
                    onSetDefaultBilling={() => setDefaultBilling(addr.id)}
                    onSetDefaultShipping={() => setDefaultShipping(addr.id)}
                  />
                ))}

                {/* Add-new tile */}
                <button
                  type="button"
                  onClick={startAdd}
                  className="bg-white border border-dashed border-[#E8DDD3] hover:border-[#044c5c] hover:bg-[#F2F8F9] transition-colors p-4 flex flex-col items-center justify-center min-h-[180px] gap-2"
                  style={{ borderRadius: 0, fontFamily: "Inter, sans-serif" }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#F2F8F9] flex items-center justify-center">
                    <Plus className="w-5 h-5 text-[#044c5c]" />
                  </div>
                  <span className="text-sm text-[#044c5c]" style={{ fontWeight: 600 }}>
                    Add New Address
                  </span>
                </button>
              </div>
            )}

            {editing && (
              <AddressModal
                editing={editing}
                onSave={saveEditing}
                onCancel={cancel}
                updateField={updateEditingField}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
