import { Link } from "react-router";
import { useState } from "react";
import { AccountSidebar } from "./account-sidebar";
import { MapPin, Plus, Pencil, Trash2, Home, Building2, Check } from "lucide-react";
import { CtaButton } from "./ui/cta-button";

type AddressType = "home" | "office" | "shipping";

interface Address {
  id: string;
  type: AddressType;
  label: string;
  recipient: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  country: string;
  isDefault: boolean;
}

const initialAddresses: Address[] = [
  {
    id: "addr-1",
    type: "office",
    label: "Office",
    recipient: "Ahmed Al-Rashid",
    phone: "+971 50 123 4567",
    line1: "Office 1204, 12th Floor, Al Musalla Tower",
    line2: "Bank Street, Bur Dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    isDefault: true,
  },
  {
    id: "addr-2",
    type: "home",
    label: "Home",
    recipient: "Ahmed Al-Rashid",
    phone: "+971 50 123 4567",
    line1: "Villa 17, Street 4",
    line2: "Jumeirah 2",
    city: "Dubai",
    country: "United Arab Emirates",
    isDefault: false,
  },
];

const typeIcon: Record<AddressType, React.ElementType> = {
  home: Home,
  office: Building2,
  shipping: MapPin,
};

export function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);

  const setDefault = (id: string) =>
    setAddresses((a) => a.map((x) => ({ ...x, isDefault: x.id === id })));
  const remove = (id: string) => setAddresses((a) => a.filter((x) => x.id !== id));

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
            <li className="text-[#2C2C2C]">Address Book</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <AccountSidebar />

          <main className="flex-1 min-w-0">
            <div className="mb-8 flex items-start justify-between flex-wrap gap-3">
              <div>
                <h1
                  className="text-2xl md:text-4xl mb-2 md:mb-3"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  Address Book
                </h1>
                <p className="text-[#2C2C2C] opacity-70">
                  Saved billing and shipping addresses
                </p>
              </div>
              <CtaButton variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
                Add New Address
              </CtaButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((a) => {
                const Icon = typeIcon[a.type];
                return (
                  <div
                    key={a.id}
                    className="bg-white border border-[#E8DDD3] p-5"
                    style={{ borderRadius: 0 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[#E8F4F8]" style={{ borderRadius: 0 }}>
                          <Icon className="w-5 h-5 text-[#044c5c]" />
                        </div>
                        <div>
                          <h3
                            className="text-base text-[#2C2C2C]"
                            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                          >
                            {a.label}
                          </h3>
                          {a.isDefault && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 uppercase tracking-wide mt-1">
                              <Check className="w-3 h-3" /> Default
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          className="p-1.5 text-[#5B616A] hover:text-[#044c5c] hover:bg-[#F2F8F9] transition-colors"
                          aria-label="Edit address"
                          style={{ borderRadius: 0 }}
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(a.id)}
                          className="p-1.5 text-[#5B616A] hover:text-[#d41c5c] hover:bg-[#fdf0f5] transition-colors"
                          aria-label="Delete address"
                          style={{ borderRadius: 0 }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-sm text-[#2C2C2C] space-y-0.5">
                      <p className="font-semibold">{a.recipient}</p>
                      <p>{a.line1}</p>
                      <p>{a.line2}</p>
                      <p>
                        {a.city}, {a.country}
                      </p>
                      <p className="text-[#5B616A] pt-1">{a.phone}</p>
                    </div>

                    {!a.isDefault && (
                      <button
                        type="button"
                        onClick={() => setDefault(a.id)}
                        className="mt-4 text-xs text-[#044c5c] hover:text-[#d41c5c] underline transition-colors"
                      >
                        Set as default
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
