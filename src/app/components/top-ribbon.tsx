import { useState, useEffect, useRef } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

const divisions = [
  { label: "Promotional Gift Division", url: "https://www.mtc.ae", site: "www.mtc.ae", color: "#044c5c" },
  { label: "Printing Division", url: "https://www.magicprinting.com", site: "www.magicprinting.com", color: "#d41c5c" },
  { label: "Machineries Division", url: "https://www.heattransfer.com", site: "www.heattransfer.com", color: "#C8956C" },
  { label: "Promotional Gift Division ( Sister Company )", url: "https://www.tezkargift.com", site: "www.tezkargift.com", color: "#2C2C2C" },
];

export function TopRibbon() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="w-full bg-[#f5f5f3] border-b border-[#e5e5e2]" style={{ fontFamily: "var(--font-body)" }}>
      <div className="max-w-[1400px] mx-auto px-3 md:px-4 flex items-center">
        {/* Mobile: dropdown */}
        <div className="md:hidden relative flex-1" ref={wrapRef}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="w-full flex items-center justify-between gap-2 py-2.5 text-left hover:bg-[#eeeee9] transition-colors px-1"
            aria-expanded={open}
            aria-haspopup="true"
          >
            <span className="flex flex-col">
              <span className="text-[10px] text-[#777] tracking-wide" style={{ fontWeight: 500 }}>
                Tezkar Group
              </span>
              <span className="text-[12px] text-[#2C2C2C]" style={{ fontWeight: 600 }}>
                Our Divisions
              </span>
            </span>
            <ChevronDown
              size={14}
              className={`text-[#777] transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
          {open && (
            <div
              className="absolute left-0 right-0 top-full bg-white border border-[#e5e5e2] shadow-lg z-[60]"
              style={{ borderRadius: 0 }}
            >
              {divisions.map((div) => (
                <a
                  key={div.url}
                  href={div.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-[#f0f0ed] last:border-b-0 hover:bg-[#f7f7f4] transition-colors"
                >
                  <span className="flex flex-col min-w-0">
                    <span className="text-[10px] text-[#777] tracking-wide truncate" style={{ fontWeight: 500 }}>
                      {div.label}
                    </span>
                    <span
                      className="text-[12px] truncate"
                      style={{ fontWeight: 700, color: div.color }}
                    >
                      {div.site}
                    </span>
                  </span>
                  <ExternalLink size={12} className="text-[#999] flex-shrink-0" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Desktop: inline divisions */}
        <div className="hidden md:flex items-center">
          {divisions.map((div, i) => (
            <span key={div.url} className="flex items-center flex-shrink-0">
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
        <div className="hidden md:block flex-1" />

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
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
