import { motion } from "motion/react";
import { Download, BookOpen, ChevronDown, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { FlipbookAnimation } from "./flipbook-animation";

/* ── Main Catalogues ── */
const mainCatalogues = [
  {
    id: "main-1",
    title: "2026 GIFTM Catalogue PDF",
    image: "https://images.unsplash.com/photo-1676906452782-7da4cb1e2ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBnaWZ0JTIwY2F0YWxvZ3VlJTIwbHVnZ2FnZSUyMGJhZ3N8ZW58MXx8fHwxNzczMjk4NjU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    action: "download",
    label: "Download",
    accent: "#044c5c",
  },
  {
    id: "main-2",
    title: "2026 Catalogue (No Names) PDF",
    image: "https://images.unsplash.com/photo-1673630810531-249c0a1f3d92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9tb3Rpb25hbCUyMHByb2R1Y3RzJTIwY29ycG9yYXRlJTIwZ2lmdHMlMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc3MzI5ODY1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    action: "download",
    label: "Download",
    accent: "#044c5c",
  },
  {
    id: "main-3",
    title: "2026 Catalogue - Flipbook Browser",
    image: "https://images.unsplash.com/photo-1760804876422-7efb73b58048?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwcGFja2FnaW5nJTIwYm94JTIwcHJlbWl1bXxlbnwxfHx8fDE3NzMyOTg2NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    action: "flipbook",
    label: "Start Flipbook",
    accent: "#d41c5c",
  },
];

/* ── Section Catalogues ── */
const sectionCatalogues = [
  {
    id: "sec-1",
    title: "Ramadan Catalogue 2026",
    image: "https://images.unsplash.com/photo-1771886587700-2096f5edef4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW1hZGFuJTIwZ2lmdCUyMGJveCUyMGRlY29yYXRpb258ZW58MXx8fHwxNzczMjk4NjU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#C8956C",
  },
  {
    id: "sec-2",
    title: "New Arrival Products",
    image: "https://images.unsplash.com/photo-1645116829834-3b52a74d2a64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjBwcm9kdWN0JTIwYXJyaXZhbHMlMjBjb2xsZWN0aW9uJTIwZGlzcGxheXxlbnwxfHx8fDE3NzMyOTg2NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#044c5c",
  },
  {
    id: "sec-3",
    title: "Technology Gifts",
    image: "https://images.unsplash.com/photo-1765805912423-e482075d0ff5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwZ2FkZ2V0cyUyMGdpZnRzJTIwZWxlY3Ryb25pY3N8ZW58MXx8fHwxNzczMjk4NjU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#2C2C2C",
  },
  {
    id: "sec-4",
    title: "Writing Instruments",
    image: "https://images.unsplash.com/photo-1764087957302-ef0756ed8e0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwd3JpdGluZyUyMGluc3RydW1lbnRzJTIwcGVuc3xlbnwxfHx8fDE3NzMyOTg2NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#C8956C",
  },
  {
    id: "sec-5",
    title: "Notebooks & Notepads",
    image: "https://images.unsplash.com/photo-1523634450041-0d0fbceb4036?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3RlYm9va3MlMjBqb3VybmFscyUyMHN0YXRpb25lcnl8ZW58MXx8fHwxNzczMjk4NjU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#044c5c",
  },
  {
    id: "sec-6",
    title: "Drinkware",
    image: "https://images.unsplash.com/photo-1508858627235-801debd2be27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmlua3dhcmUlMjBib3R0bGVzJTIwbXVncyUyMHR1bWJsZXJzfGVufDF8fHx8MTc3MzI5ODY2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#2C2C2C",
  },
  {
    id: "sec-7",
    title: "Promotional Bags",
    image: "https://images.unsplash.com/photo-1642375352724-8b523c67b8be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9tb3Rpb25hbCUyMGJyYW5kZWQlMjBiYWclMjBiYWNrcGFja3xlbnwxfHx8fDE3NzMyOTg2NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#C8956C",
  },
  {
    id: "sec-8",
    title: "Wristwatch & Clocks",
    image: "https://images.unsplash.com/photo-1764512680272-addbb3380994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxsJTIwY2xvY2tzJTIwd2F0Y2hlcyUyMHdyaXN0d2F0Y2h8ZW58MXx8fHwxNzczMjk4NjYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#044c5c",
  },
  {
    id: "sec-9",
    title: "Wearables",
    image: "https://images.unsplash.com/photo-1666358085449-a10a39f33942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWFyYWJsZSUyMGFwcGFyZWwlMjB0c2hpcnQlMjB1bmlmb3JtJTIwY29ycG9yYXRlfGVufDF8fHx8MTc3MzI5ODY2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#2C2C2C",
  },
  {
    id: "sec-10",
    title: "Desk & Wall Signs",
    image: "https://images.unsplash.com/photo-1616964666162-31f61986d9aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNrJTIwYWNjZXNzb3JpZXMlMjBvZmZpY2UlMjBzdXBwbGllc3xlbnwxfHx8fDE3NzMyOTg2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#C8956C",
  },
  {
    id: "sec-11",
    title: "Fire & Outdoor",
    image: "https://images.unsplash.com/photo-1721936846549-e86ef15648f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJlJTIwc2FmZXR5JTIwb3V0ZG9vciUyMGNhbXBpbmclMjBnZWFyfGVufDF8fHx8MTc3MzI5ODY2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#044c5c",
  },
  {
    id: "sec-12",
    title: "Awards & Plaques",
    image: "https://images.unsplash.com/photo-1632198865399-1fe6b9df55dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhd2FyZCUyMHRyb3BoeSUyMHBsYXF1ZSUyMHJlY29nbml0aW9ufGVufDF8fHx8MTc3MzI5ODY2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#2C2C2C",
  },
  {
    id: "sec-13",
    title: "Packaging Gift Sets",
    image: "https://images.unsplash.com/photo-1760804876422-7efb73b58048?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwcGFja2FnaW5nJTIwYm94JTIwcHJlbWl1bXxlbnwxfHx8fDE3NzMyOTg2NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#C8956C",
  },
  {
    id: "sec-14",
    title: "UAE National Day 2025",
    image: "https://images.unsplash.com/photo-1638871947845-2f904778bebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXRpb25hbCUyMGRheSUyMFVBRSUyMGNlbGVicmF0aW9uJTIwZmxhZ3xlbnwxfHx8fDE3NzMyOTg2Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#044c5c",
  },
  {
    id: "sec-15",
    title: "Children's Gift",
    image: "https://images.unsplash.com/photo-1637667798459-0c3276ca3033?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHRveXMlMjBraWRzJTIwZ2lmdCUyMGNvbG9yZnVsfGVufDF8fHx8MTc3MzI5ODY2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#d41c5c",
  },
  {
    id: "sec-16",
    title: "Breast Cancer Products",
    image: "https://images.unsplash.com/photo-1769029259587-6821e9648570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVhc3QlMjBjYW5jZXIlMjBhd2FyZW5lc3MlMjBwaW5rJTIwcmliYm9ufGVufDF8fHx8MTc3MzIyMjg5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#d41c5c",
  },
  {
    id: "sec-17",
    title: "ECO JUCO Products",
    image: "https://images.unsplash.com/photo-1758487424832-a53ae6cdefdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMHN1c3RhaW5hYmxlJTIwcHJvZHVjdHMlMjBqdXRlfGVufDF8fHx8MTc3MzI5ODY2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#2B8A3E",
  },
  {
    id: "sec-18",
    title: "Dental Design Products",
    image: "https://images.unsplash.com/photo-1754821480096-61d29809d19f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBoZWFsdGglMjBwcm9kdWN0cyUyMHRvb3RoYnJ1c2h8ZW58MXx8fHwxNzczMjk4NjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#044c5c",
  },
  {
    id: "sec-19",
    title: "Maxema Italian Pens",
    image: "https://images.unsplash.com/photo-1764087957302-ef0756ed8e0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwd3JpdGluZyUyMGluc3RydW1lbnRzJTIwcGVuc3xlbnwxfHx8fDE3NzMyOTg2NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#2C2C2C",
  },
];

function DownloadButton({ label, accent, icon }: { label: string; accent: string; icon: "download" | "flipbook" }) {
  return (
    <button
      className="inline-flex items-center gap-1.5 px-4 py-2 text-[12px] transition-all duration-300 cursor-pointer group/btn"
      style={{
        backgroundColor: accent,
        color: "#fff",
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        border: "none",
        letterSpacing: "0.02em",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = accent === "#d41c5c" ? "#b8174f" : accent === "#044c5c" ? "#033a47" : "#222";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = accent;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {icon === "download" ? <Download size={13} /> : <ExternalLink size={13} />}
      {label}
    </button>
  );
}

export function CataloguePage() {
  return (
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh" }}>
      {/* BREADCRUMB */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 py-4 text-[12px]" style={{ fontFamily: "var(--font-body)", color: "#8A9199" }}>
          <a
            href="/"
            className="transition-colors duration-200"
            style={{ color: "#8A9199" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#044c5c")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8A9199")}
          >
            Home
          </a>
          <ChevronDown size={12} className="-rotate-90" />
          <span style={{ color: "#044c5c", fontWeight: 500 }}>Catalogue 2026</span>
        </div>
      </div>

      {/* ═══════ MAIN CATALOGUE ═══════ */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Section title */}
          <div className="flex items-center gap-3 mb-8">
            <div style={{ width: "4px", height: "28px", backgroundColor: "#044c5c" }} />
            <h2 className="text-[24px]" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "#2C2C2C" }}>
              Main Catalogue
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* 3 catalogue cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {mainCatalogues.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  className="flex flex-col group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{
                      aspectRatio: "3/2",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: "#E6E8EB",
                      borderBottom: "none",
                    }}
                  >
                    {cat.action === "flipbook" ? (
                      <FlipbookAnimation />
                    ) : (
                      <ImageWithFallback
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    {/* Dark gradient overlay at bottom */}
                    <div
                      className="absolute inset-0 z-10 pointer-events-none"
                      style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.45) 0%, transparent 50%)" }}
                    />
                    {/* Catalogue year badge */}
                    <div
                      className="absolute top-3 left-3 px-2.5 py-1 text-[10px] uppercase tracking-wider z-20"
                      style={{
                        backgroundColor: cat.accent,
                        color: "#fff",
                        fontFamily: "var(--font-body)",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                      }}
                    >
                      2026
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-3 py-4 px-3" style={{ backgroundColor: "#fff", borderWidth: "1px", borderStyle: "solid", borderColor: "#E6E8EB" }}>
                    <p className="text-[13px] text-center" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "#2C2C2C", lineHeight: "1.3" }}>
                      {cat.title}
                    </p>
                    <DownloadButton
                      label={cat.label}
                      accent={cat.accent}
                      icon={cat.action === "flipbook" ? "flipbook" : "download"}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #E6E8EB, #C8956C, #E6E8EB, transparent)" }} />
      </div>

      {/* ═══════ SECTION CATALOGUES ═══════ */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          {/* Section title */}
          <div className="flex items-center gap-3 mb-8">
            <div style={{ width: "4px", height: "28px", backgroundColor: "#d41c5c" }} />
            <h2 className="text-[24px]" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "#2C2C2C" }}>
              Section Catalogues
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {sectionCatalogues.map((cat, i) => (
              <motion.div
                key={cat.id}
                className="flex flex-col group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.04 }}
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    aspectRatio: "3/3.2",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "#E6E8EB",
                    borderBottom: "none",
                  }}
                >
                  <ImageWithFallback
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Dark gradient overlay at bottom */}
                  <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.45) 0%, transparent 50%)" }}
                  />
                </div>

                {/* Card footer */}
                <div
                  className="flex flex-col items-center gap-2.5 py-3 px-2"
                  style={{ backgroundColor: "#fff", borderWidth: "1px", borderStyle: "solid", borderColor: "#E6E8EB" }}
                >
                  <p className="text-[11px] sm:text-[12px] text-center !leading-[1.3]" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "#2C2C2C", minHeight: "32px", display: "flex", alignItems: "center" }}>
                    {cat.title}
                  </p>
                  <button
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-[11px] transition-all duration-300 cursor-pointer"
                    style={{
                      backgroundColor: "#044c5c",
                      color: "#fff",
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      border: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#033a47";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#044c5c";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <Download size={11} />
                    Download
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}