import { Building2, Printer, Cog, ExternalLink, Gift } from "lucide-react";

const divisions = [
  {
    label: "Promotional Gift Division",
    subtitle: null,
    url: "https://www.mtc.ae",
    display: "www.mtc.ae",
    description: "Premium corporate gifts & promotional merchandise",
    icon: Building2,
    color: "#044c5c",
  },
  {
    label: "Printing Division",
    subtitle: null,
    url: "https://www.magicprinting.com",
    display: "www.magicprinting.com",
    description: "Full-service digital & offset printing solutions",
    icon: Printer,
    color: "#d41c5c",
  },
  {
    label: "Machineries Division",
    subtitle: null,
    url: "https://www.heattransfer.com",
    display: "www.heattransfer.com",
    description: "Industrial heat transfer & branding equipment",
    icon: Cog,
    color: "#C8956C",
  },
  {
    label: "Promotional Gift Division",
    subtitle: "Sister Company",
    url: "https://www.tezkargift.com",
    display: "www.tezkargift.com",
    description: "Curated gift solutions & branded giveaways",
    icon: Gift,
    color: "#2C2C2C",
  },
];

export function DivisionsStrip() {
  return (
    <section className="relative bg-[#FAFAF8] py-[64px] overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.035]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #C8956C 1px, transparent 0)`,
        backgroundSize: '32px 32px',
      }} />

      {/* Top gold accent line */}
      

      <div
        className="relative max-w-[1400px] mx-auto px-4"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p
              className="text-[#d41c5c] text-[12px] uppercase tracking-[0.15em] mb-1"
              style={{ fontWeight: 600 }}
            >
              Tezkar Group
            </p>
            <h2
              className="text-[#2C2C2C] text-[24px] md:text-[28px]"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600, lineHeight: 1.25 }}
            >
              Our Divisions
            </h2>
            <p className="text-[#5B616A] text-[14px] mt-1" style={{ lineHeight: 1.5 }}>
              Three specialized divisions delivering end-to-end branding, printing &amp; gifting solutions across the UAE
            </p>
          </div>
        </div>

        {/* Division cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {divisions.map((div) => {
            const Icon = div.icon;
            return (
              <a
                key={div.url}
                href={div.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center text-center px-6 py-7 border border-[#e7e7e7] bg-white hover:border-[#ccc] hover:shadow-lg transition-all duration-400 overflow-hidden"
                style={{ borderRadius: 0 }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at center bottom, ${div.color}08 0%, transparent 70%)`,
                  }}
                />

                {/* Top colored line on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ backgroundColor: div.color }}
                />

                {/* Icon circle */}
                <div
                  className="relative w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-400 group-hover:scale-110"
                  style={{
                    backgroundColor: `${div.color}10`,
                    boxShadow: `0 0 0 1px ${div.color}18`,
                  }}
                >
                  <Icon size={22} style={{ color: div.color }} />
                </div>

                {/* Division name & badge */}
                <div className="relative flex items-center gap-2 mb-1.5">
                  <span
                    className="text-[14px] text-[#2C2C2C]"
                    style={{ fontWeight: 600 }}
                  >
                    {div.label}
                  </span>
                  {div.subtitle && (
                    <span
                      className="text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        fontWeight: 700,
                        backgroundColor: `${div.color}15`,
                        color: div.color,
                      }}
                    >
                      {div.subtitle}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="relative text-[12px] text-[#999] mb-4 leading-relaxed">
                  {div.description}
                </p>

                {/* URL link */}
                <div
                  className="relative flex items-center gap-1.5 text-[12px] mt-auto group-hover:gap-2 transition-all duration-300"
                  style={{ color: div.color, fontWeight: 600 }}
                >
                  <span className="group-hover:underline underline-offset-2">{div.display}</span>
                  <ExternalLink size={11} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom gold accent line */}
        <div className="mt-8 flex justify-center">
          
        </div>
      </div>

      {/* Bottom border to detach from newsletter */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#e7e7e7]" />
    </section>
  );
}