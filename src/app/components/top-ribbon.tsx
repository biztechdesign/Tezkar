import { ExternalLink } from "lucide-react";

const divisions = [
  { label: "Promotional Gift Division", url: "https://www.mtc.ae", site: "www.mtc.ae", color: "#044c5c" },
  { label: "Printing Division", url: "https://www.magicprinting.com", site: "www.magicprinting.com", color: "#d41c5c" },
  { label: "Machineries Division", url: "https://www.heattransfer.com", site: "www.heattransfer.com", color: "#C8956C" },
  { label: "Promotional Gift Division ( Sister Company )", url: "https://www.tezkargift.com", site: "www.tezkargift.com", color: "#2C2C2C" },
];

export function TopRibbon() {
  return (
    <div className="w-full bg-[#f5f5f3] border-b border-[#e5e5e2]" style={{ fontFamily: "var(--font-body)" }}>
      <div className="max-w-[1400px] mx-auto px-4 flex items-center">
        {/* Divisions — no flex-1, just fit content */}
        <div className="flex items-center">
          {divisions.map((div, i) => (
            <span key={div.url} className="flex items-center">
              {i > 0 && <span className="w-px h-[28px] bg-[#d5d5d2] flex-shrink-0" />}
              <a
                href={div.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center px-4 py-2 hover:bg-[#eeeee9] transition-colors whitespace-nowrap"
              >
                <span className="text-[10px] text-[#777] tracking-wide" style={{ fontWeight: 500 }}>{div.label}</span>
                <span className="text-[12px] transition-colors" style={{ fontWeight: 700, color: div.color }}>{div.site}</span>
              </a>
            </span>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <a
            href="#"
            className="flex items-center gap-1.5 bg-[#d41c5c] hover:bg-[#b8174f] text-white px-4 py-1.5 text-[10.5px] transition-colors whitespace-nowrap"
            style={{ fontWeight: 600, letterSpacing: "0.02em" }}
          >
            Reseller Registration
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 bg-[#C8956C] hover:bg-[#b8854f] text-white px-4 py-1.5 text-[10.5px] transition-colors whitespace-nowrap"
            style={{ fontWeight: 600, letterSpacing: "0.02em" }}
          >
            Become a Partner
          </a>
        </div>
      </div>
    </div>
  );
}
