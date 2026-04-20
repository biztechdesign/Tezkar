import { Printer, Scissors, Layers, Sun, Sticker, ScreenShare, Sparkles, Crosshair, CreditCard, Flame, CircleDot, Monitor, Database, Pen, Wrench, Stamp } from "lucide-react";

const servicesData = [
  { title: "UV Printing Service", icon: Sun, color: "#F59E0B", bg: "#FEF3C7" },
  { title: "Vinyl Cutting Service", icon: Scissors, color: "#8B5CF6", bg: "#EDE9FE" },
  { title: "Print & Cut Service", icon: Layers, color: "#3B82F6", bg: "#DBEAFE" },
  { title: "Sublimation Printing", icon: Printer, color: "#10B981", bg: "#D1FAE5" },
  { title: "Sticker and Epoxy", icon: Sticker, color: "#EC4899", bg: "#FCE7F3" },
  { title: "Screen Printing", icon: ScreenShare, color: "#044c5c", bg: "#CCFBF1" },
  { title: "Sandblasting Effect Service", icon: Sparkles, color: "#C8956C", bg: "#E8DDD3" },
  { title: "Laser Markings", icon: Crosshair, color: "#EF4444", bg: "#FEE2E2" },
  { title: "ID Card Printing", icon: CreditCard, color: "#6366F1", bg: "#E0E7FF" },
  { title: "Heat Transfer Service", icon: Flame, color: "#F97316", bg: "#FFEDD5" },
  { title: "Embroidery Service", icon: CircleDot, color: "#d41c5c", bg: "#FCE7F3" },
  { title: "Digital Printing", icon: Monitor, color: "#0EA5E9", bg: "#E0F2FE" },
  { title: "Data Transfer Service", icon: Database, color: "#14B8A6", bg: "#CCFBF1" },
  { title: "Laser Engraving", icon: Pen, color: "#A855F7", bg: "#F3E8FF" },
  { title: "Assembly Service", icon: Wrench, color: "#64748B", bg: "#E2E8F0" },
  { title: "Debossing Service", icon: Stamp, color: "#B45309", bg: "#FDE68A" },
  { title: "Foil Stamping", icon: Sparkles, color: "#D97706", bg: "#FEF3C7" },
  { title: "Pad Printing", icon: Layers, color: "#059669", bg: "#D1FAE5" },
];

export function ServicesSection() {
  return (
    <section
      className="py-[64px]"
      style={{ fontFamily: "var(--font-body)", background: "#FFFFFF" }}
    >
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Section header */}
        <div className="mb-5">
          <h2
            className="text-[#2C2C2C] text-[20px] md:text-[22px]"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              lineHeight: 1.25,
            }}
          >
            Our Services
          </h2>
          <p
            className="text-[#5B616A] text-[13px] mt-0.5"
            style={{ lineHeight: 1.5 }}
          >
            Below are some of our printing services offered.
          </p>
        </div>

        {/* Services grid — 3 rows */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {servicesData.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group flex flex-col items-center text-center gap-2.5 py-4 px-2 bg-white border border-[#E6E8EB] hover:border-[#044c5c] hover:shadow-md transition-all duration-300 cursor-pointer"
                style={{ borderRadius: 0 }}
              >
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-125"
                  style={{ backgroundColor: service.bg }}
                >
                  <Icon size={24} style={{ color: service.color }} strokeWidth={1.6} />
                </div>
                <span
                  className="text-[#2C2C2C] text-[11px] uppercase tracking-[0.04em]"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  {service.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}