import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  ChevronDown,
  Award,
  Users,
  Globe,
  Target,
  Eye,
  Package,
  Palette,
  Layers,
  Truck,
  ShieldCheck,
  Handshake,
  ArrowRight,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
// TEMP: Commented out figma:asset import causing module loading errors
// import heroImage from "figma:asset/49f305134d1eb9e0c99e65d423da8b773c0e7737.png";
const heroImage = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=400&fit=crop";

/* ── Color tokens ── */
const C = {
  primary: "#054c5e",
  primaryLight: "#06687a",
  secondary: "#d91a5f",
  secondaryHover: "#b81550",
  black: "#1a1a1a",
  dark: "#2C2C2C",
  body: "#5B616A",
  muted: "#8A9199",
  border: "#E6E8EB",
  surface: "#ffffff",
  bg: "#fafafa",
  barBg: "#e0e0e0",
};

/* ── Animated counter hook ── */
function useCounter(end: number, duration: number, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, inView]);
  return count;
}

/* ── Skill bar component ── */
function SkillBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-[13px]" style={{ fontFamily: "var(--font-body)", color: C.dark, fontWeight: 500 }}>
          {label}
        </span>
        <span className="text-[13px]" style={{ fontFamily: "var(--font-body)", color: C.primary, fontWeight: 600 }}>
          {isInView ? value : 0}%
        </span>
      </div>
      <div className="h-2 overflow-hidden" style={{ backgroundColor: C.barBg, borderRadius: "999px" }}>
        <motion.div
          className="h-full"
          style={{ background: `linear-gradient(90deg, ${C.primary}, ${C.primaryLight})`, borderRadius: "999px" }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

/* ── Slide-fill CTA button (matches homepage) ── */
function SlideCTA({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
}) {
  if (variant === "outline") {
    return (
      <a
        href={href}
        className="group relative inline-flex items-center gap-2 text-[13px] uppercase tracking-wider px-7 py-3 overflow-hidden"
        style={{
          backgroundColor: "transparent",
          color: "#fff",
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "rgba(255,255,255,0.4)",
          transition: "border-color 0.6s ease, box-shadow 0.6s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = C.secondary;
          e.currentTarget.style.boxShadow = `0 6px 24px rgba(217,26,95,0.3)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Hover fill layer — slides from left to right (homepage style) */}
        <span
          className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ backgroundColor: C.secondary }}
          aria-hidden="true"
        />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </a>
    );
  }
  return (
    <a
      href={href}
      className="group relative inline-flex items-center gap-3 text-[13px] uppercase tracking-wider px-7 py-3 overflow-hidden"
      style={{
        backgroundColor: C.primary,
        color: "#fff",
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        boxShadow: `0 6px 24px rgba(5,76,94,0.25)`,
        transition: "box-shadow 0.6s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 6px 24px rgba(217,26,95,0.3)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 6px 24px rgba(5,76,94,0.25)`;
      }}
    >
      {/* Hover fill layer — slides from left to right (homepage style) */}
      <span
        className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ backgroundColor: C.secondary }}
        aria-hidden="true"
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </a>
  );
}

/* ── Stats data ── */
const stats = [
  { value: 15, suffix: "+", label: "Years Experience", icon: Award },
  { value: 5000, suffix: "+", label: "Products Ready", icon: Package },
  { value: 3500, suffix: "+", label: "Happy Clients", icon: Users },
  { value: 25, suffix: "+", label: "Countries Served", icon: Globe },
];

/* ── Core values ── */
const coreValues = [
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    desc: "Every product undergoes rigorous quality checks before reaching our clients.",
  },
  {
    icon: Palette,
    title: "Creative Customization",
    desc: "We bring your brand to life with bespoke printing, engraving, and packaging.",
  },
  {
    icon: Truck,
    title: "Timely Delivery",
    desc: "Our logistics network ensures on-time delivery across the GCC and beyond.",
  },
  {
    icon: Handshake,
    title: "Client Partnership",
    desc: "We build long-term relationships, not just transactions.",
  },
  {
    icon: Layers,
    title: "Vast Selection",
    desc: "Over 5,000 products across 20+ categories to suit every occasion.",
  },
  {
    icon: Star,
    title: "Premium Brands",
    desc: "Authorized distributor of leading international gift & stationery brands.",
  },
];

/* ── Skills data ── */
const skills = [
  { label: "Promotional Gifting", value: 95 },
  { label: "Corporate Branding", value: 92 },
  { label: "Event Merchandise", value: 88 },
  { label: "Custom Packaging", value: 90 },
  { label: "National Day Products", value: 85 },
];

/* ── Features data ── */
const features = [
  {
    icon: Package,
    title: "Latest Products",
    desc: "We bring a large collection of trendy and up-to-date promotional items only to be found at TEZKAR.",
  },
  {
    icon: Palette,
    title: "Customization Service",
    desc: "Comprehensive print and brand printing services including Pad printing, silk-screen and digital printing for perfect personalization.",
  },
  {
    icon: Layers,
    title: "OEM Solutions",
    desc: "Cater to all brands and products in different concepts, an exclusive personalized solution.",
  },
  {
    icon: Truck,
    title: "Fast & Reliable Delivery",
    desc: "Efficient logistics network ensuring timely delivery across the GCC and worldwide with real-time tracking.",
  },
];

/* ── Showroom images ── */
const showroomImages = [
  "https://images.unsplash.com/photo-1732532973406-0a82b447739c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBnaWZ0JTIwc2hvd3Jvb20lMjBkaXNwbGF5JTIwc2hlbHZlc3xlbnwxfHx8fDE3NzMyOTk4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1759323321196-2813db509285?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZ2lmdCUyMHNob3AlMjBpbnRlcmlvciUyMG1vZGVybnxlbnwxfHx8fDE3NzMyOTk4MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1769988037978-ddd3d54332c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZSUyMHNoZWx2ZXMlMjBvcmdhbml6ZWQlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NzMyOTk4MTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1732726345661-836c96f4d5f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMGJhZ3MlMjBjb2xvcmZ1bCUyMGRpc3BsYXklMjByYWNrfGVufDF8fHx8MTc3MzI5OTgxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1759884247407-782965434bf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBzdXBwbGllcyUyMHN0YXRpb25lcnklMjBvcmdhbml6ZWQlMjBkZXNrfGVufDF8fHx8MTc3MzI5OTgxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1767561070418-cbb62b952a6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waHklMjBhd2FyZHMlMjBkaXNwbGF5JTIwZ2xhc3MlMjBjYXNlfGVufDF8fHx8MTc3MzI5OTgxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

/* ── Client logos (mock data) ── */
const clientLogos = [
  "Atlantis", "Emirates NBD", "Dubai World", "Fairmont", "Jumeirah",
  "Hilton", "Marriott", "ADNOC", "Etisalat", "Pizza Hut",
  "du Telecom", "Holiday Inn", "Crowne Plaza", "Wyndham", "Total",
  "TechnipFMC", "Emaar", "DEWA",
];

/* ── Floating particle component ── */
function FloatingParticle({ delay, x, size }: { delay: number; x: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        bottom: "-20px",
        background: "radial-gradient(circle, rgba(255,255,255,0.25), transparent)",
      }}
      animate={{
        y: [0, -300, -600],
        opacity: [0, 0.6, 0],
        scale: [0.5, 1, 0.3],
      }}
      transition={{
        duration: 6 + Math.random() * 4,
        repeat: Infinity,
        delay: delay,
        ease: "easeOut",
      }}
    />
  );
}

export function AboutPage() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <div style={{ backgroundColor: C.bg, minHeight: "100vh" }}>
      {/* ═══════ BREADCRUMB ═══════ */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center gap-2 py-4 text-[12px]"
          style={{ fontFamily: "var(--font-body)", color: C.muted }}
        >
          <a
            href="/"
            className="transition-colors duration-200"
            style={{ color: C.muted }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
          >
            Home
          </a>
          <ChevronDown size={12} className="-rotate-90" />
          <span style={{ color: C.primary, fontWeight: 500 }}>About Us</span>
        </div>
      </div>

      {/* ═══════ HERO BANNER ═══════ */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryLight} 40%, ${C.primary} 100%)` }}>
        {/* Floating particles */}
        <FloatingParticle delay={0} x="10%" size={8} />
        <FloatingParticle delay={1.5} x="30%" size={6} />
        <FloatingParticle delay={3} x="55%" size={10} />
        <FloatingParticle delay={0.8} x="75%" size={7} />
        <FloatingParticle delay={2.2} x="90%" size={5} />

        {/* Decorative circles */}
        <motion.div
          className="absolute -top-20 -right-20 rounded-full pointer-events-none"
          style={{ width: 300, height: 300, borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(255,255,255,0.1)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 rounded-full pointer-events-none"
          style={{ width: 400, height: 400, borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(255,255,255,0.06)" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "rgba(255,255,255,0.2)",
                  borderRadius: "999px",
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Star size={14} style={{ color: "#fff" }} />
                <span className="text-[12px]" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>
                  Since 2010 — Dubai, UAE
                </span>
              </motion.div>

              <h1
                className="text-[36px] sm:text-[44px] lg:text-[52px] text-white mb-4"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, lineHeight: 1.15 }}
              >
                About Our{" "}
                <span style={{ color: "#ffffff" }}>Company</span>
              </h1>
              <p className="text-[15px] mb-8 max-w-[520px]" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, fontWeight: 400 }}>
                TezkarGift Promo Gift Preparing LLC. is one of the leading promotional gift and corporate
                branding companies in the UAE, delivering innovative gifting solutions to businesses across
                the GCC and worldwide.
              </p>

              <div className="flex flex-wrap gap-3">
                <SlideCTA href="/category/all">
                  Our Products <ArrowRight size={15} />
                </SlideCTA>
                <SlideCTA href="/feedback" variant="outline">
                  Contact Us
                </SlideCTA>
              </div>
            </motion.div>

            {/* Hero image with floating effect */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="relative overflow-hidden"
                style={{ borderRadius: "0px", boxShadow: "0 25px 60px rgba(0,0,0,0.3)" }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1732360487817-f29cc82d8eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEdWJhaSUyMGx1eHVyeSUyMHJldGFpbCUyMHNob3dyb29tJTIwZXh0ZXJpb3IlMjBidWlsZGluZ3xlbnwxfHx8fDE3NzMzMDU5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Dubai Showroom Exterior"
                  className="w-full h-auto"
                  style={{ aspectRatio: "16/10", objectFit: "cover" }}
                />
              </motion.div>

              {/* Floating badge — secondary */}
              

              {/* Floating badge top-right */}
              
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ UNIFIED BENTO — STATS + COMPANY ═══════ */}
      <section ref={statsRef} className="relative" style={{ backgroundColor: C.surface }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-3 lg:gap-4 auto-rows-[140px] md:auto-rows-[150px]">

            {/* ── A1: Company intro (wide + tall) ── */}
            <motion.div
              className="col-span-2 md:col-span-2 lg:col-span-5 row-span-2 relative overflow-hidden p-6 lg:p-8 flex flex-col justify-between"
              style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #043a48 50%, ${C.primaryLight} 100%)`, borderRadius: "0px" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none" style={{ borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(255,255,255,0.06)" }} />
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full pointer-events-none" style={{ borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(255,255,255,0.04)" }} />
              <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.03)" }} />
              <div className="absolute top-4 right-4 pointer-events-none" style={{ opacity: 0.06 }}>
                <div className="grid grid-cols-4 gap-2.5">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: "#fff" }} />
                  ))}
                </div>
              </div>
              <div>
                <span className="inline-block px-3 py-1 mb-3 text-[10px] uppercase tracking-widest" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "#fff", backgroundColor: "rgba(255,255,255,0.12)", borderRadius: "999px" }}>
                  TezkarGift Promo Gift Preparing LLC.
                </span>
                <h3 className="text-[20px] lg:text-[24px] text-white mb-3" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, lineHeight: 1.25 }}>
                  Crafting Memorable <span style={{ fontStyle: "italic", opacity: 0.85 }}>Brand Experiences</span> Since 2010
                </h3>
              </div>
              <div>
                <p className="text-[12px] lg:text-[13px] mb-3" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, fontWeight: 400 }}>
                  Based in Dubai, TezkarGift is the go-to destination for top-quality branded corporate gifts and promotional merchandise across the GCC and worldwide.
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
                  <span className="text-[10px] uppercase tracking-wider" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>OEM &amp; ODM Specialist</span>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.4)" }} />
                  <span className="text-[10px] uppercase tracking-wider" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>In-house Printing</span>
                </div>
              </div>
            </motion.div>

            {/* ── A2: Team image (wide + tall) ── */}
            <motion.div
              className="col-span-2 md:col-span-2 lg:col-span-4 row-span-2 relative overflow-hidden group"
              style={{ borderRadius: "0px" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758518732175-5d608ba3abdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB0ZWFtJTIwb2ZmaWNlJTIwbWVldGluZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzMyOTk4MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Our Team"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(5,76,94,0.7) 0%, rgba(0,0,0,0.1) 40%, transparent 60%)" }} />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-5">
                <p className="text-[15px] text-white mb-1" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>Our Team</p>
                <p className="text-[11px]" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.8)", fontWeight: 400 }}>50+ Professionals Dedicated to Excellence</p>
              </div>
            </motion.div>

            {/* ── A3: Years stat ── */}
            {(() => { const stat = stats[0]; const count = useCounter(stat.value, 2000, statsInView); return (
              <motion.div className="col-span-1 md:col-span-1 lg:col-span-3 row-span-1 relative overflow-hidden p-5 flex flex-col justify-between" style={{ background: "linear-gradient(145deg, #f0f8fa, #e6f2f5)", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(5,76,94,0.1)", borderRadius: "0px" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(5,76,94,0.1)" }}>
                <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full pointer-events-none" style={{ borderWidth: "2px", borderStyle: "solid", borderColor: "rgba(5,76,94,0.06)" }} />
                <div className="flex items-center justify-between">
                  <motion.div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: "rgba(5,76,94,0.12)", borderRadius: "10px" }} whileHover={{ scale: 1.1, rotate: 5 }}>
                    <stat.icon size={20} style={{ color: C.primary }} />
                  </motion.div>
                  <span className="text-[9px] uppercase tracking-widest" style={{ fontFamily: "var(--font-body)", color: C.muted, fontWeight: 600 }}>Est. 2010</span>
                </div>
                <div>
                  <p className="text-[28px] lg:text-[32px]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: C.primary, lineHeight: 1.1 }}>{count.toLocaleString()}{stat.suffix}</p>
                  <p className="text-[11px] mt-0.5" style={{ fontFamily: "var(--font-body)", color: C.body, fontWeight: 500 }}>{stat.label}</p>
                </div>
              </motion.div>
            ); })()}

            {/* ── A4: Products stat ── */}
            {(() => { const stat = stats[1]; const count = useCounter(stat.value, 2000, statsInView); return (
              <motion.div className="col-span-1 md:col-span-1 lg:col-span-3 row-span-1 relative overflow-hidden p-5 flex flex-col justify-between" style={{ background: `linear-gradient(145deg, ${C.primary}, #065e74)`, borderRadius: "0px" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }} whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(5,76,94,0.2)" }}>
                <div className="absolute top-3 right-3 pointer-events-none" style={{ opacity: 0.08 }}>
                  <div className="grid grid-cols-3 gap-1.5">{Array.from({ length: 9 }).map((_, i) => (<div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: "#fff" }} />))}</div>
                </div>
                <div className="flex items-center justify-between">
                  <motion.div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.12)", borderRadius: "10px" }} whileHover={{ scale: 1.1, rotate: 5 }}>
                    <stat.icon size={20} style={{ color: "#fff" }} />
                  </motion.div>
                  <span className="text-[9px] uppercase tracking-widest" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>Catalog</span>
                </div>
                <div>
                  <p className="text-[28px] lg:text-[32px]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>{count.toLocaleString()}{stat.suffix}</p>
                  <p className="text-[11px] mt-0.5" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{stat.label}</p>
                </div>
              </motion.div>
            ); })()}

            {/* ── A5: What We Offer (tall) ── */}
            <motion.div
              className="col-span-2 md:col-span-2 lg:col-span-3 row-span-3 relative overflow-hidden p-5 lg:p-6 flex flex-col"
              style={{ background: "linear-gradient(180deg, #fafbfc, #f3f5f7)", borderWidth: "1px", borderStyle: "solid", borderColor: C.border, borderRadius: "0px" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${C.primary}, ${C.primaryLight})` }} />
              <div className="flex items-center gap-2 mb-4 mt-1">
                <div style={{ width: "3px", height: "20px", backgroundColor: C.primary }} />
                <span className="text-[13px]" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: C.dark }}>What We Offer</span>
              </div>
              <div className="space-y-3 flex-1">
                {features.map((feat) => (
                  <div key={feat.title} className="flex gap-3 p-2" style={{ backgroundColor: "rgba(255,255,255,0.7)", borderRadius: "8px" }}>
                    <div className="w-8 h-8 flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(5,76,94,0.1)", borderRadius: "8px" }}>
                      <feat.icon size={15} style={{ color: C.primary }} />
                    </div>
                    <div>
                      <h4 className="text-[12px] mb-0.5" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: C.dark }}>{feat.title}</h4>
                      <p className="text-[11px]" style={{ fontFamily: "var(--font-body)", color: C.body, lineHeight: 1.5, fontWeight: 400 }}>{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── A6: Clients stat ── */}
            {(() => { const stat = stats[2]; const count = useCounter(stat.value, 2000, statsInView); return (
              <motion.div className="col-span-1 md:col-span-1 lg:col-span-3 row-span-1 relative overflow-hidden p-5 flex flex-col justify-between" style={{ background: "linear-gradient(145deg, #fdf2f6, #fce8ef)", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(217,26,95,0.1)", borderRadius: "0px" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.18 }} whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(217,26,95,0.08)" }}>
                <div className="absolute -bottom-5 -right-5 w-16 h-16 rounded-full pointer-events-none" style={{ borderWidth: "2px", borderStyle: "solid", borderColor: "rgba(217,26,95,0.06)" }} />
                <div className="flex items-center justify-between">
                  <motion.div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: "rgba(217,26,95,0.1)", borderRadius: "10px" }} whileHover={{ scale: 1.1, rotate: 5 }}>
                    <stat.icon size={20} style={{ color: C.secondary }} />
                  </motion.div>
                  <span className="text-[9px] uppercase tracking-widest" style={{ fontFamily: "var(--font-body)", color: C.muted, fontWeight: 600 }}>Worldwide</span>
                </div>
                <div>
                  <p className="text-[28px] lg:text-[32px]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: C.secondary, lineHeight: 1.1 }}>{count.toLocaleString()}{stat.suffix}</p>
                  <p className="text-[11px] mt-0.5" style={{ fontFamily: "var(--font-body)", color: C.body, fontWeight: 500 }}>{stat.label}</p>
                </div>
              </motion.div>
            ); })()}

            {/* ── A7: Countries stat ── */}
            {(() => { const stat = stats[3]; const count = useCounter(stat.value, 2000, statsInView); return (
              <motion.div className="col-span-1 md:col-span-1 lg:col-span-3 row-span-1 relative overflow-hidden p-5 flex flex-col justify-between" style={{ background: "linear-gradient(145deg, #f0f8fa, #e6f2f5)", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(5,76,94,0.1)", borderRadius: "0px" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.22 }} whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(5,76,94,0.1)" }}>
                <div className="absolute -top-4 -left-4 w-14 h-14 rounded-full pointer-events-none" style={{ borderWidth: "2px", borderStyle: "solid", borderColor: "rgba(5,76,94,0.06)" }} />
                <div className="flex items-center justify-between">
                  <motion.div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: "rgba(5,76,94,0.12)", borderRadius: "10px" }} whileHover={{ scale: 1.1, rotate: 5 }}>
                    <stat.icon size={20} style={{ color: C.primary }} />
                  </motion.div>
                  <span className="text-[9px] uppercase tracking-widest" style={{ fontFamily: "var(--font-body)", color: C.muted, fontWeight: 600 }}>Global</span>
                </div>
                <div>
                  <p className="text-[28px] lg:text-[32px]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: C.primary, lineHeight: 1.1 }}>{count.toLocaleString()}{stat.suffix}</p>
                  <p className="text-[11px] mt-0.5" style={{ fontFamily: "var(--font-body)", color: C.body, fontWeight: 500 }}>{stat.label}</p>
                </div>
              </motion.div>
            ); })()}

            {/* ── A8: HQ Location (tall) ── */}
            <motion.div
              className="col-span-2 md:col-span-2 lg:col-span-3 row-span-2 relative overflow-hidden p-6 flex flex-col justify-between"
              style={{ backgroundColor: C.dark, borderRadius: "0px" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              <div className="absolute top-0 right-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
                <svg viewBox="0 0 200 200" className="w-full h-full" style={{ transform: "translate(30%, -10%)" }}>
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#fff" strokeWidth="0.5" />
                  <circle cx="100" cy="100" r="50" fill="none" stroke="#fff" strokeWidth="0.3" />
                  <ellipse cx="100" cy="100" rx="30" ry="80" fill="none" stroke="#fff" strokeWidth="0.3" />
                  <line x1="20" y1="100" x2="180" y2="100" stroke="#fff" strokeWidth="0.3" />
                  <line x1="100" y1="20" x2="100" y2="180" stroke="#fff" strokeWidth="0.3" />
                  <line x1="20" y1="70" x2="180" y2="70" stroke="#fff" strokeWidth="0.2" />
                  <line x1="20" y1="130" x2="180" y2="130" stroke="#fff" strokeWidth="0.2" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}>
                    <MapPin size={16} style={{ color: "#fff" }} />
                  </div>
                  <span className="text-[11px] uppercase tracking-widest" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>Headquarters</span>
                </div>
                <h3 className="text-[22px] lg:text-[26px] text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, lineHeight: 1.2 }}>Dubai, UAE</h3>
                <p className="text-[12px] mt-1.5" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.55)", lineHeight: 1.5, fontWeight: 400 }}>Al Quoz Industrial Area 3</p>
                <p className="text-[11px] mt-1" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>Warehouse &amp; Showroom: 8,000+ sq. ft.</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>Markets We Serve</p>
                <div className="flex flex-wrap gap-1.5">
                  {["GCC", "Middle East", "Asia", "Africa", "Europe"].map((region) => (
                    <span key={region} className="px-2.5 py-1 text-[10px]" style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "rgba(255,255,255,0.75)", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "6px" }}>{region}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── A9: Services (wide) ── */}
            <motion.div
              className="col-span-2 md:col-span-2 lg:col-span-3 row-span-1 relative overflow-hidden p-5 lg:p-6 flex flex-col justify-center"
              style={{ background: "linear-gradient(145deg, #f7fafb, #eef4f6)", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(5,76,94,0.1)", borderRadius: "0px" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.28 }}
              whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(5,76,94,0.08)" }}
            >
              <div className="absolute top-0 left-0 bottom-0 w-[3px]" style={{ background: `linear-gradient(180deg, ${C.primary}, ${C.primaryLight})` }} />
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: "rgba(5,76,94,0.1)", borderRadius: "8px" }}>
                  <Palette size={16} style={{ color: C.primary }} />
                </div>
                <span className="text-[13px]" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: C.dark }}>Print &amp; Branding Services</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {[
                  { icon: Palette, text: "Pad Printing" },
                  { icon: Layers, text: "UV Printing" },
                  { icon: Package, text: "Laser Engraving" },
                  { icon: Star, text: "Embroidery" },
                ].map((svc) => (
                  <div key={svc.text} className="flex items-center gap-1.5 px-2.5 py-1" style={{ backgroundColor: "rgba(5,76,94,0.08)", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(5,76,94,0.12)", borderRadius: "6px" }}>
                    <svc.icon size={12} style={{ color: C.primary }} />
                    <span className="text-[10px]" style={{ fontFamily: "var(--font-body)", color: C.primary, fontWeight: 600 }}>{svc.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── A10: Trendy Products ── */}
            <motion.div
              className="col-span-1 md:col-span-1 lg:col-span-3 row-span-1 relative overflow-hidden flex flex-col items-center justify-center p-5"
              style={{ background: `linear-gradient(145deg, ${C.primary}, #065e74)`, borderRadius: "0px" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(5,76,94,0.2)" }}
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-28 h-28 rounded-full" style={{ borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(255,255,255,0.06)" }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 rounded-full" style={{ borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(255,255,255,0.04)" }} />
              </div>
              <Package size={26} style={{ color: "#fff" }} />
              <p className="text-[14px] text-white mt-2 text-center relative z-10" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>5,000+</p>
              <p className="text-[11px] text-center mt-0.5 relative z-10" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>Trendy Products</p>
              <span className="mt-1.5 px-2 py-0.5 text-[9px] uppercase tracking-wider relative z-10" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "rgba(255,255,255,0.9)", backgroundColor: "rgba(255,255,255,0.12)", borderRadius: "4px" }}>Ready Stock</span>
            </motion.div>

            {/* ── A11: Certifications ── */}
            <motion.div
              className="col-span-2 md:col-span-2 lg:col-span-3 lg:col-start-4 row-span-1 relative overflow-hidden p-5 flex flex-col justify-center"
              style={{ background: "linear-gradient(145deg, #f7fafb, #eef4f6)", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(5,76,94,0.1)", borderRadius: "0px" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.32 }}
              whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(5,76,94,0.08)" }}
            >
              <div className="absolute top-0 left-0 bottom-0 w-[3px]" style={{ background: `linear-gradient(180deg, ${C.primary}, ${C.primaryLight})` }} />
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: "rgba(5,76,94,0.1)", borderRadius: "8px" }}>
                  <ShieldCheck size={16} style={{ color: C.primary }} />
                </div>
                <span className="text-[13px]" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: C.dark }}>Trusted &amp; Certified</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Quality Control Approved", "ECO Friendly Products", "Organic Certified", "Privacy Protected"].map((cert) => (
                  <span key={cert} className="px-2.5 py-1 text-[10px]" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: C.primary, backgroundColor: "rgba(5,76,94,0.08)", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(5,76,94,0.12)", borderRadius: "6px" }}>{cert}</span>
                ))}
              </div>
            </motion.div>

            {/* ── A12: Ready Stock image ── */}
            <motion.div
              className="col-span-1 md:col-span-1 lg:col-span-3 lg:col-start-7 row-span-1 relative overflow-hidden group"
              style={{ borderRadius: "0px" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.34 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1667864811044-b0bcd9ed4a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnaWZ0JTIwd3JhcHBpbmclMjByaWJib24lMjBib3hlc3xlbnwxfHx8fDE3NzMyOTk4MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Ready Stock"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(5,76,94,0.7) 0%, rgba(0,0,0,0.15) 40%, transparent 60%)" }} />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-4">
                <p className="text-[13px] text-white" style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}>Gift Wrapping</p>
                <p className="text-[10px] mt-0.5" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.7)", fontWeight: 400 }}>Premium Packaging</p>
              </div>
            </motion.div>

            {/* ── A13: Working Hours + Contact ── */}
            <motion.div
              className="col-span-2 md:col-span-2 lg:col-span-3 lg:col-start-10 row-span-1 relative overflow-hidden p-5 flex flex-col justify-center"
              style={{ background: `linear-gradient(135deg, ${C.dark}, #2a2a2a)`, borderRadius: "0px" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.36 }}
              whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
            >
              <div className="absolute top-3 right-3 pointer-events-none" style={{ opacity: 0.06 }}>
                <div className="grid grid-cols-3 gap-2">{Array.from({ length: 9 }).map((_, i) => (<div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: "#fff" }} />))}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "10px" }}>
                  <Clock size={18} style={{ color: "#fff" }} />
                </div>
                <div>
                  <p className="text-[13px] text-white" style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}>Sat – Thu &nbsp;·&nbsp; 9 AM – 6 PM</p>
                  <p className="text-[11px] mt-0.5" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.45)", fontWeight: 400 }}>Friday Closed</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "10px" }}>
                  <Phone size={16} style={{ color: "#fff" }} />
                </div>
                <div>
                  <p className="text-[12px] text-white" style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}>+971 4 347 5747</p>
                  <p className="text-[10px] mt-0.5" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>info@tezkargift.com</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
        {/* Bottom divider */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${C.border}, transparent)` }} />
        </div>
      </section>

      {/* ═══════ MISSION & VISION ═══════ */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Mission */}
          <motion.div
            className="relative overflow-hidden p-8 lg:p-10"
            style={{
              backgroundColor: C.surface,
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: C.border,
              borderRadius: "0px",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}
          >
            {/* Accent stripe — primary */}
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${C.primary}, ${C.primaryLight})` }} />
            <motion.div
              className="w-14 h-14 flex items-center justify-center mb-5"
              style={{ backgroundColor: "rgba(5,76,94,0.08)", borderRadius: "0px" }}
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <Target size={28} style={{ color: C.primary }} />
            </motion.div>
            <h3
              className="text-[22px] mb-3"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: C.dark, lineHeight: 1.3 }}
            >
              Our Mission
            </h3>
            <p className="text-[14px]" style={{ fontFamily: "var(--font-body)", color: C.body, lineHeight: 1.8, fontWeight: 400 }}>
              To deliver the best quality services in a timely and cost-efficient manner,
              providing world-class branded merchandise and custom solutions that elevate our
              clients' brand presence in the GCC and beyond.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            className="relative overflow-hidden p-8 lg:p-10"
            style={{
              backgroundColor: C.surface,
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: C.border,
              borderRadius: "0px",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${C.secondary}, #e84d84)` }} />
            <motion.div
              className="w-14 h-14 flex items-center justify-center mb-5"
              style={{ backgroundColor: "rgba(217,26,95,0.08)", borderRadius: "0px" }}
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <Eye size={28} style={{ color: C.secondary }} />
            </motion.div>
            <h3
              className="text-[22px] mb-3"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: C.dark, lineHeight: 1.3 }}
            >
              Our Vision
            </h3>
            <p className="text-[14px]" style={{ fontFamily: "var(--font-body)", color: C.body, lineHeight: 1.8, fontWeight: 400 }}>
              To be the most innovative and trusted corporate gift solutions provider across
              the GCC, known for creativity, quality, and an unwavering commitment to customer
              satisfaction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════ SKILLS SECTION ═══════ */}
      <section style={{ backgroundColor: C.surface }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Skills image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="overflow-hidden" style={{ borderRadius: "0px" }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1726533765275-a69cfd7f9897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEdWJhaSUyMGJ1c2luZXNzJTIwc2t5bGluZSUyMG1vZGVybnxlbnwxfHx8fDE3NzMyOTk4MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Dubai Skyline"
                  className="w-full object-cover"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
              {/* Overlay badge */}
              <motion.div
                className="absolute bottom-4 right-4 px-5 py-3"
                style={{ backgroundColor: "rgba(5,76,94,0.95)", borderRadius: "0px" }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-[12px] text-white" style={{ fontFamily: "var(--font-body)", fontWeight: 600 }}>
                  Based in Dubai, UAE
                </p>
              </motion.div>
            </motion.div>

            {/* Skills bars */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div style={{ width: "4px", height: "28px", backgroundColor: C.primary }} />
                <h2 className="text-[24px]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: C.dark }}>
                  Our Skills
                </h2>
              </div>
              <p className="text-[14px] mb-8" style={{ fontFamily: "var(--font-body)", color: C.body, lineHeight: 1.7, fontWeight: 400 }}>
                With over 15 years of experience, we have developed deep expertise across all areas of
                promotional gifting and corporate branding.
              </p>
              {skills.map((skill, i) => (
                <SkillBar key={skill.label} label={skill.label} value={skill.value} delay={i * 0.15} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ CORE VALUES ═══════ */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div style={{ width: "40px", height: "1px", backgroundColor: C.muted }} />
            <span className="text-[12px] uppercase tracking-widest" style={{ fontFamily: "var(--font-body)", color: C.body, fontWeight: 600 }}>
              What Drives Us
            </span>
            <div style={{ width: "40px", height: "1px", backgroundColor: C.muted }} />
          </div>
          <h2 className="text-[28px]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: C.dark }}>
            Our Core Values
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((val, i) => (
            <motion.div
              key={val.title}
              className="relative p-6 lg:p-8 cursor-default group"
              style={{
                backgroundColor: C.surface,
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: C.border,
                borderRadius: "0px",
                transition: "all 0.3s ease",
              }}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.08)" }}
              onMouseEnter={(e) => {
                const stripe = e.currentTarget.querySelector("[data-stripe]") as HTMLElement;
                if (stripe) stripe.style.width = "100%";
              }}
              onMouseLeave={(e) => {
                const stripe = e.currentTarget.querySelector("[data-stripe]") as HTMLElement;
                if (stripe) stripe.style.width = "40px";
              }}
            >
              {/* Animated top stripe */}
              <div
                data-stripe
                className="absolute top-0 left-0 h-[3px]"
                style={{
                  width: "40px",
                  background: `linear-gradient(90deg, ${C.primary}, ${C.primaryLight})`,
                  transition: "width 0.5s ease",
                }}
              />

              <motion.div
                className="w-12 h-12 flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(5,76,94,0.08)", borderRadius: "10px" }}
                whileHover={{ rotate: 8, scale: 1.1 }}
              >
                <val.icon size={24} style={{ color: C.primary }} />
              </motion.div>
              <h3 className="text-[16px] mb-2" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: C.dark }}>
                {val.title}
              </h3>
              <p className="text-[13px]" style={{ fontFamily: "var(--font-body)", color: C.body, lineHeight: 1.7, fontWeight: 400 }}>
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${C.border}, transparent)` }} />
      </div>

      {/* ═══════ OUR SHOWROOM ═══════ */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div style={{ width: "40px", height: "1px", backgroundColor: C.muted }} />
            <span className="text-[12px] uppercase tracking-widest" style={{ fontFamily: "var(--font-body)", color: C.body, fontWeight: 600 }}>
              Visit Us
            </span>
            <div style={{ width: "40px", height: "1px", backgroundColor: C.muted }} />
          </div>
          <h2 className="text-[28px]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: C.dark }}>
            Our Showroom
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
          {showroomImages.map((img, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden group"
              style={{ borderRadius: "0px" }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.08 }}
            >
              <ImageWithFallback
                src={img}
                alt={`Showroom ${i + 1}`}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ aspectRatio: "4/3" }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ backgroundColor: "rgba(5,76,94,0.45)" }}
              >
                <motion.div
                  className="w-10 h-10 flex items-center justify-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.9)", borderRadius: "50%" }}
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Eye size={18} style={{ color: C.primary }} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ EXISTING CLIENTS ═══════ */}
      <section style={{ backgroundColor: C.surface }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div style={{ width: "40px", height: "1px", backgroundColor: C.muted }} />
              <span className="text-[12px] uppercase tracking-widest" style={{ fontFamily: "var(--font-body)", color: C.body, fontWeight: 600 }}>
                Trusted By
              </span>
              <div style={{ width: "40px", height: "1px", backgroundColor: C.muted }} />
            </div>
            <h2 className="text-[28px]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: C.dark }}>
              Existing Clients
            </h2>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 lg:gap-5">
            {clientLogos.map((name, i) => (
              <motion.div
                key={name}
                className="flex items-center justify-center py-5 px-4 cursor-default"
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "#f0f0f0",
                  backgroundColor: C.bg,
                  borderRadius: "0px",
                  transition: "all 0.3s ease",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{
                  scale: 1.05,
                  borderColor: C.primary,
                  boxShadow: "0 4px 12px rgba(5,76,94,0.12)",
                }}
              >
                <span
                  className="text-[12px] text-center"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: C.muted, letterSpacing: "0.02em" }}
                >
                  {name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT CTA ═══════ */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryLight} 100%)` }}>
        {/* Decorative elements */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(255,255,255,0.08)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-[28px] sm:text-[32px] text-white mb-4"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, lineHeight: 1.3 }}
              >
                Ready to Elevate Your{" "}
                <span style={{ color: "#FFFFFF" }}>Brand?</span>
              </h2>
              <p className="text-[14px] mb-6 max-w-[480px]" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, fontWeight: 400 }}>
                Get in touch with our team to discuss your corporate gifting needs. We offer
                personalized solutions tailored to your brand and budget.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/feedback"
                  className="group relative inline-flex items-center gap-2 text-[13px] uppercase tracking-wider px-7 py-3 overflow-hidden"
                  style={{
                    backgroundColor: "#fff",
                    color: C.primary,
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    transition: "box-shadow 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span
                    className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ backgroundColor: C.secondary }}
                    aria-hidden="true"
                  />
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                    Get a Quote <ArrowRight size={15} />
                  </span>
                </a>
                <a
                  href="/catalogue"
                  className="inline-flex items-center gap-2 text-[13px] uppercase tracking-wider px-7 py-3 transition-all duration-300"
                  style={{
                    backgroundColor: "transparent",
                    color: "#fff",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "rgba(255,255,255,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#fff";
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  View Catalogue
                </a>
              </div>
            </motion.div>

            {/* Contact details */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {[
                { icon: MapPin, label: "Visit Us", value: "Al Quoz Industrial Area 3, Dubai, UAE" },
                { icon: Phone, label: "Call Us", value: "+971 4 347 5747" },
                { icon: Mail, label: "Email Us", value: "info@tezkargift.com" },
                { icon: Clock, label: "Working Hours", value: "Sat–Thu: 9AM – 6PM" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex gap-3 p-4"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "rgba(255,255,255,0.1)",
                    borderRadius: "0px",
                  }}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="w-9 h-9 flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgba(255,255,255,0.12)", borderRadius: "8px" }}
                  >
                    <item.icon size={16} style={{ color: "#fff" }} />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider mb-0.5" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
                      {item.label}
                    </p>
                    <p className="text-[13px] text-white" style={{ fontFamily: "var(--font-body)", fontWeight: 500, lineHeight: 1.4 }}>
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}