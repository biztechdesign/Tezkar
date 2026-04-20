import { Award, Globe, ShieldCheck, Building2 } from "lucide-react";

const usps = [
  {
    icon: Award,
    title: "#1 Corporate Gifts Supplier",
  },
  {
    icon: Globe,
    title: "Largest Promotional Giveaways in Middle East Since 1989",
  },
  {
    icon: ShieldCheck,
    title: "Your Trusted Supplier of Corporate & Promotional Gifts in UAE",
  },
  {
    icon: Building2,
    title: "Wholesale Promotional Gift Company in Middle East & Africa",
  },
];

export function USPStrip() {
  return (
    <section
      className="bg-[#2c2c2c]"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
          {usps.map((usp, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3.5 py-4 px-4 lg:px-5"
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <usp.icon
                  size={20}
                  className="text-white"
                  strokeWidth={1.8}
                />
              </div>
              <p
                className="text-white/90 text-[13px] !leading-[1.4]"
                style={{ fontWeight: 500 }}
              >
                {usp.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}