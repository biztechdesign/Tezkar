import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ChevronRight,
  ChevronDown,
  Globe,
  MessageCircle,
  Headphones,
  Building2,
  Headset,
  PackageOpen,
  Shield,
  Printer,
  Flame,
  Gift,
} from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
// TEMP: Commented out figma:asset import causing module loading errors
// import whatsappBannerImg from "figma:asset/30803a71fcbc1adf7c033a27ed609384d8fdaa57.png";
const whatsappBannerImg = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=300&fit=crop";

const bannerImg =
  "https://images.unsplash.com/photo-1732360487817-f29cc82d8eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBnaWZ0cyUyMHByZW1pdW0lMjBwYWNrYWdpbmclMjBEdWJhaXxlbnwxfHx8fDE3NzM4MjU5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

/* ── Color tokens ── */
const C = {
  primary: "#044c5c",
  primaryLight: "#06687a",
  gold: "#C8956C",
  pink: "#d41c5c",
  pinkHover: "#b81550",
  dark: "#2C2C2C",
  body: "#5B616A",
  muted: "#8A9199",
  border: "#E6E8EB",
  surface: "#ffffff",
  bg: "#FAFAF8",
  accent: "#E8DDD3",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ── TezkarGift featured branch (full-width) ── */
const tezkargift = {
  name: "TezkarGift Showroom",
  division: "Promotional Gifts Division",
  website: "www.tezkargift.com",
  websiteUrl: "https://tezkargift.com",
  color: "#044c5c",
  phone: "+971 4 340 3006",
  phoneTel: "+97143403006",
  lines: "( 5 Lines )",
  fax: "00971 4 340 3007",
  address: "Al Khabaisi, Deira, Dubai, United Arab Emirates",
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.5!2d55.329!3d25.269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5b1234567890%3A0xabcdef!2sTezkar+Promo+Gifts!5e0!3m2!1sen!2sae",
  mapLink: "https://maps.google.com/?q=Tezkar+Promo+Gifts+Deira+Dubai",
  images: [
    "https://images.unsplash.com/photo-1764795850443-c046dbe2660f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9tb3Rpb25hbCUyMHByb2R1Y3RzJTIwZGlzcGxheSUyMHJldGFpbHxlbnwxfHx8fDE3NzM4MjcwNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1764175760119-e1d342f95735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwc2hvcCUyMHNob3dyb29tJTIwZGlzcGxheSUyMHNoZWx2ZXN8ZW58MXx8fHwxNzczODI3MDc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ],
  qrColor: "044c5c",
};

/* ── Other 4 branches (2×2 grid) ── */
const otherBranches = [
  {
    name: "MTC Main Showroom",
    division: "Promotional Gifts Division",
    website: "www.mtc.ae",
    websiteUrl: "https://mtc.ae",
    color: "#006B3F",
    phone: "+971 6 533 1353",
    phoneTel: "+97165331353",
    lines: "( 10 Lines )",
    fax: "00971 6 533 0161",
    address: "Beside Sharjah City Center, Al Wahda Road, Sharjah, UAE",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.5!2d55.389!3d25.319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5b1234567890%3A0xabcdef!2sMTC+Corporate+Sharjah!5e0!3m2!1sen!2sae",
    mapLink: "https://maps.google.com/?q=MTC+Main+Showroom+Sharjah+City+Center",
    images: [
      "https://images.unsplash.com/photo-1764795850443-c046dbe2660f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9tb3Rpb25hbCUyMHByb2R1Y3RzJTIwZGlzcGxheSUyMHJldGFpbHxlbnwxfHx8fDE3NzM4MjcwNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1764175760119-e1d342f95735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwc2hvcCUyMHNob3dyb29tJTIwZGlzcGxheSUyMHNoZWx2ZXN8ZW58MXx8fHwxNzczODI3MDc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    qrColor: "006B3F",
    badge: null,
  },
  {
    name: "Heattransfer Showroom",
    division: "Printing Machineries Division",
    website: "www.heattransfer.com",
    websiteUrl: "https://heattransfer.com",
    color: "#C62828",
    phone: "+971 6 533 2236",
    phoneTel: "+97165332236",
    lines: "( 2 Lines )",
    fax: "00971 6 533 0161",
    address: "Beside Sharjah City Center, Al Wahda Road, Sharjah, UAE",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.5!2d55.389!3d25.319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5b1234567890%3A0xabcdef!2sHeat+Transfer+Sharjah!5e0!3m2!1sen!2sae",
    mapLink: "https://maps.google.com/?q=Heat+Transfer+Showroom+Sharjah",
    images: [
      "https://images.unsplash.com/photo-1569852741721-ee5a94bf719e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWF0JTIwdHJhbnNmZXIlMjBwcmludGluZyUyMG1hY2hpbmUlMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NzM4MjcwNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1758183961426-88d64eb5f787?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmludGluZyUyMHByZXNzJTIwY29tbWVyY2lhbCUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NzM4MjcwODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    qrColor: "C62828",
    badge: null,
  },
  {
    name: "Magic Printing Factory",
    division: "Printing Services Division",
    website: "www.magicprinting.com",
    websiteUrl: "https://magicprinting.com",
    color: "#006B3F",
    phone: "+971 6 533 5384",
    phoneTel: "+97165335384",
    lines: "( 2 Lines )",
    fax: "00971 6 533 0161",
    address: "Street 32, Behind Furniture Complex, Al Wahda Street, Sharjah, UAE",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.5!2d55.389!3d25.319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5b1234567890%3A0xabcdef!2sMagic+Printing+Sharjah!5e0!3m2!1sen!2sae",
    mapLink: "https://maps.google.com/?q=Magic+Printing+Sharjah",
    images: [
      "https://images.unsplash.com/photo-1583737097428-af53774819a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmludGluZyUyMGZhY3RvcnklMjB3YXJlaG91c2UlMjBpbmR1c3RyaWFsfGVufDF8fHx8MTc3MzgyNzA3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1758183961426-88d64eb5f787?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmludGluZyUyMHByZXNzJTIwY29tbWVyY2lhbCUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NzM4MjcwODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    qrColor: "006B3F",
    badge: null,
  },
  {
    name: "MTCPromo Showroom",
    division: "Promotional Gifts Division",
    website: "www.mtcpromo.ae",
    websiteUrl: "https://mtcpromo.ae",
    color: "#D4A017",
    phone: "+971 6 533 5384 ext.334",
    phoneTel: "+97165335384",
    lines: "( 1 Line )",
    fax: "00971 6 533 0161",
    address: "Yiwu Market, Opp Expo 2020, Dubai, UAE",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3611.698!2d55.232056!3d25.158753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69b3e6b4b7c1%3A0x2e0f2e2e2e2e2e2e!2sMTC+Promo+FZCO!5e0!3m2!1sen!2sae",
    mapLink: "https://maps.google.com/?q=MTC+Promo+Yiwu+Market+Dubai",
    images: [
      "https://images.unsplash.com/photo-1758448500717-2e4bcd79108b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXRhaWwlMjBzdG9yZSUyMGludGVyaW9yJTIwYnJpZ2h0fGVufDF8fHx8MTc3MzgyNzA4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1507494924047-60b8ee826ca9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwd2FyZWhvdXNlJTIwb2ZmaWNlJTIwc3BhY2V8ZW58MXx8fHwxNzczODI3MDgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    qrColor: "D4A017",
    badge: "Sister Company",
  },
];

/* ── Our Companies (matching MTC contact page) ── */
const companies = [
  {
    name: "MTC – Main Trading Company LLC",
    url: "https://mtc.ae",
    desc: "Promotional gifts, corporate giveaways & advertising specialties",
    icon: Building2,
  },
  {
    name: "Magic Printing Press LLC",
    url: "https://magicprinting.com",
    desc: "Commercial offset & digital printing solutions",
    icon: Printer,
  },
  {
    name: "Heat Transfer LLC",
    url: "https://heattransfer.com",
    desc: "Heat transfer printing, sublimation & branding services",
    icon: Flame,
  },
  {
    name: "TezkarGift.com",
    url: "https://tezkargift.com",
    desc: "Online gifting platform for premium & custom gifts",
    icon: Gift,
  },
];

/* ── Auto-sliding image component for branch cards ── */
function BranchImageSlider({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => setCurrent((p) => (p + 1) % images.length), 3500);
    return () => clearInterval(timer);
  }, [images.length]);
  return (
    <div className="relative w-full h-full min-h-[280px] overflow-hidden">
      {images.map((img, idx) => (
        <ImageWithFallback
          key={idx}
          src={img}
          alt={`${name} photo ${idx + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: idx === current ? 1 : 0 }}
        />
      ))}
    </div>
  );
}

/* ── Full-height auto-sliding image for TezkarGift card ── */
function TezkarImageSlider({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => setCurrent((p) => (p + 1) % images.length), 3500);
    return () => clearInterval(timer);
  }, [images.length]);
  return (
    <>
      {images.map((img, idx) => (
        <ImageWithFallback
          key={idx}
          src={img}
          alt={`${name} photo ${idx + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 m-[0px]"
          style={{ opacity: idx === current ? 1 : 0 }}
        />
      ))}
    </>
  );
}

export function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [waNumber, setWaNumber] = useState("");
  const [waSubmitted, setWaSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
  };

  const handleWaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWaSubmitted(true);
    setTimeout(() => setWaSubmitted(false), 4000);
    setWaNumber("");
  };

  return (
    <div style={{ fontFamily: "var(--font-body)", background: C.bg }}>
      {/* ── HERO BANNER ── */}
      <div className="relative overflow-hidden" style={{ height: "320px" }}>
        <ImageWithFallback src={bannerImg} alt="Contact Us" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(4,76,92,0.92) 0%, rgba(4,76,92,0.7) 50%, rgba(200,149,108,0.5) 100%)" }} />
        <div className="absolute inset-0 opacity-[0.06]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="gridC" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridC)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-[12px] uppercase tracking-[3px] mb-3" style={{ color: "#C8956C", fontWeight: 600, fontFamily: "var(--font-heading)" }}>
              Get in Touch
            </p>
            <h1 className="text-white text-[36px] md:text-[46px] !leading-[1.1] mb-3" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
              Contact Us
            </h1>
            <p className="text-white/80 max-w-[560px] text-[15px] !leading-[1.6]" style={{ fontFamily: "var(--font-body)" }}>
              We are always happy to assist you. Reach out to us through any of the channels below and our team will respond promptly.
            </p>
          </motion.div>
          <motion.div className="flex flex-wrap gap-3 mt-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            {[
              { icon: Headset, text: "Quick Response" },
              { icon: Shield, text: "Trusted Since 1994" },
              { icon: PackageOpen, text: "Custom Solutions" },
            ].map((b) => (
              <span
                key={b.text}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-wider"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", color: "#fff", fontWeight: 600, fontFamily: "var(--font-body)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <b.icon size={13} style={{ color: "#C8956C" }} />
                {b.text}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── BREADCRUMB ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 py-4 text-[12px]" style={{ fontFamily: "var(--font-body)", color: "#8A9199" }}>
          <a href="/" className="transition-colors duration-200" style={{ color: "#8A9199" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#044c5c")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8A9199")}
          >Home</a>
          <ChevronDown size={12} className="-rotate-90" />
          <span style={{ color: "#044c5c", fontWeight: 500 }}>Contact Us</span>
        </div>
      </div>

      {/* ── Our Offices & Branches (merged) ── */}
      <section className="pt-4 pb-[64px]" style={{ background: C.bg }}>
        <div className="max-w-[1400px] mx-auto px-[15px] py-[0px]">
          {/* Section header — homepage style */}
          

          {/* ═══ TEZKARGIFT — Full-width featured card ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="border bg-white mb-8"
            style={{ borderColor: C.border }}
          >
            {/* Header bar */}
            <div className="flex items-center gap-3 px-5 py-3" style={{ background: tezkargift.color }}>
              
              <div className="text-right flex-1">
                <p className="text-white text-[14px] text-left" style={{ fontWeight: 700, fontFamily: "var(--font-heading)" }}>{tezkargift.name}</p>
                <p className="text-white/70 text-[12px] text-left">{tezkargift.division}</p>
              </div>
              <a
                href={tezkargift.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-white/90 underline underline-offset-2 hover:text-white transition-colors ml-4"
              >
                {tezkargift.website}
              </a>
            </div>
            {/* Body: 2-column — full-height image left, details right */}
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Left — Full-height image slider (60%) */}
              <div className="lg:col-span-3 border-r relative min-h-[280px]" style={{ borderColor: C.border }}>
                <TezkarImageSlider images={tezkargift.images} name={tezkargift.name} />
              </div>
              {/* Right — QR, phone, hours, location, 3 CTAs stacked (40%) */}
              <div className="lg:col-span-2 px-5 py-5 flex flex-col">
                {/* QR + Phone row */}
                <div className="flex gap-3 mb-4">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=tel:${tezkargift.phoneTel}&color=${tezkargift.qrColor}`}
                      alt="Scan to Call"
                      width={91}
                      height={91}
                    />
                    <p className="text-[9px] mt-1 text-center" style={{ color: tezkargift.color, fontWeight: 600 }}>Scan to Call</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div>
                      <p className="text-[12px]" style={{ color: C.dark }}>
                        <span style={{ fontWeight: 600 }}>Phone :</span>{" "}
                        <a href={`tel:${tezkargift.phoneTel}`} className="transition-colors" style={{ color: tezkargift.color }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = C.pink)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = tezkargift.color)}
                        >{tezkargift.phone}</a>
                      </p>
                      <p className="text-[10px]" style={{ color: C.muted, fontWeight: 500 }}>{tezkargift.lines}</p>
                    </div>
                    <p className="text-[12px]" style={{ color: C.dark }}>
                      <span style={{ fontWeight: 600 }}>Fax :</span> {tezkargift.fax}
                    </p>
                  </div>
                </div>
                {/* Working hours */}
                <div className="text-[11px] mb-4" style={{ color: C.body, lineHeight: 1.6 }}>
                  <p style={{ fontWeight: 600, color: C.dark }}>Working Days/Hours :</p>
                  <p style={{ color: tezkargift.color, fontWeight: 600 }}>9:00 AM to 7:00 PM</p>
                  <p>(Monday to Saturday)</p>
                  <p className="mt-1.5" style={{ fontWeight: 600, color: C.dark }}>Ramadan Timing :</p>
                  <p style={{ color: tezkargift.color, fontWeight: 600 }}>9:00 AM to 4:00 PM</p>
                </div>
                {/* Address */}
                <div className="flex items-start gap-2 mb-5">
                  <MapPin size={12} className="flex-shrink-0 mt-0.5" style={{ color: C.muted }} />
                  <p className="text-[11px] !leading-[1.5]" style={{ color: C.body }}>{tezkargift.address}</p>
                </div>
                {/* 3 CTAs stacked single column */}
                <div className="mt-auto space-y-2">
                  <a
                    href={tezkargift.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 h-[40px] text-[11px] uppercase tracking-wider text-white transition-opacity w-full"
                    style={{ background: tezkargift.color, fontWeight: 600, fontFamily: "var(--font-heading)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    <MapPin size={13} /> View our Location
                  </a>
                  <a
                    href="https://maps.google.com/?q=Tezkar+Promo+Gifts+Deira+Dubai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 h-[40px] text-[11px] text-white transition-opacity w-full"
                    style={{ background: "#C62828", fontWeight: 600, fontFamily: "var(--font-heading)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    <Send size={13} className="-rotate-45" />
                    How to Find Our Location
                  </a>
                  <a
                    href="https://maps.google.com/?q=Tezkar+Promo+Gifts+Deira+Dubai+Parking"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 h-[40px] text-[11px] text-white transition-opacity w-full"
                    style={{ background: "#C62828", fontWeight: 600, fontFamily: "var(--font-heading)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    <MessageCircle size={13} />
                    How to Find Free Car Parking ?
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ═══ OTHER 4 BRANDS — 2×2 grid ═══ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherBranches.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="border bg-white"
                style={{ borderColor: C.border }}
              >
                {/* Header bar */}
                <div className="flex items-center justify-between px-4 py-2.5" style={{ background: b.color }}>
                  <div>
                    <p className="text-white text-[13px]" style={{ fontWeight: 700, fontFamily: "var(--font-heading)" }}>{b.name}</p>
                    <p className="text-white/70 text-[11px]">{b.division}</p>
                  </div>
                  <a
                    href={b.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-white/90 underline underline-offset-2 hover:text-white transition-colors"
                  >
                    {b.website}
                  </a>
                </div>
                {/* Body: 2-column */}
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {/* Left — Image + Map */}
                  <div className="border-r" style={{ borderColor: C.border }}>
                    <div className="relative h-full">
                      <BranchImageSlider images={b.images} name={b.name} />
                      {b.badge && (
                        <div
                          className="absolute top-3 left-3 z-10 px-3 py-1 text-[10px] text-white uppercase tracking-wider"
                          style={{ background: b.color, fontWeight: 600, fontFamily: "var(--font-heading)" }}
                        >
                          {b.badge}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Right — Contact + timing */}
                  <div className="px-4 py-4 flex flex-col">
                    <div className="flex gap-3 mb-3">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=tel:${b.phoneTel}&color=${b.qrColor}`}
                          alt={`Scan to Call`}
                          width={70}
                          height={70}
                        />
                        <p className="text-[9px] mt-1 text-center" style={{ color: b.color, fontWeight: 600 }}>Scan to Call</p>
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <div>
                          <p className="text-[12px]" style={{ color: C.dark }}>
                            <span style={{ fontWeight: 600 }}>Phone :</span>{" "}
                            <a href={`tel:${b.phoneTel}`} className="transition-colors" style={{ color: b.color }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = C.pink)}
                              onMouseLeave={(e) => (e.currentTarget.style.color = b.color)}
                            >{b.phone}</a>
                          </p>
                          <p className="text-[10px]" style={{ color: C.muted, fontWeight: 500 }}>{b.lines}</p>
                        </div>
                        <p className="text-[12px]" style={{ color: C.dark }}>
                          <span style={{ fontWeight: 600 }}>Fax :</span> {b.fax}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 mb-3">
                      <MapPin size={12} className="flex-shrink-0 mt-0.5" style={{ color: C.muted }} />
                      <p className="text-[11px] !leading-[1.5]" style={{ color: C.body }}>{b.address}</p>
                    </div>
                    <div className="text-[11px] mb-3" style={{ color: C.body, lineHeight: 1.6 }}>
                      <p style={{ fontWeight: 600, color: C.dark }}>Working Days/Hours :</p>
                      <p style={{ color: b.color, fontWeight: 600 }}>9:00 AM to 7:00 PM</p>
                      <p>(Monday to Saturday)</p>
                      <p className="mt-1.5" style={{ fontWeight: 600, color: C.dark }}>Ramadan :</p>
                      <p style={{ color: b.color, fontWeight: 600 }}>9:00 AM to 4:00 PM</p>
                    </div>
                    <a
                      href={b.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto flex items-center justify-center gap-2 h-[36px] text-[11px] uppercase tracking-wider text-white transition-opacity w-full"
                      style={{ background: b.color, fontWeight: 600, fontFamily: "var(--font-heading)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      <MapPin size={13} /> View our Location
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WhatsApp Contact & Channel Section ── */}
      <section
        className="relative py-[64px] overflow-hidden"
        style={{ background: "#0B1A3E" }}
      >
        {/* Background pattern with WhatsApp icons */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wa-icon-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                <g transform="translate(10,10) scale(1.2)" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </g>
                <g transform="translate(70,60) scale(1.2)" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </g>
                <g transform="translate(60,10) scale(0.9)" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22,2 15,22 11,13 2,9" />
                </g>
                <g transform="translate(15,65) scale(1)" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wa-icon-pattern)" opacity="0.4" />
          </svg>
        </div>

        {/* Decorative gold accent lines */}
        
        

        <div className="max-w-[1400px] mx-auto relative z-10 px-[15px] py-[0px]">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <span
              className="text-[11px] uppercase tracking-[3px] mb-2 inline-block"
              style={{ color: C.pink, fontWeight: 600, fontFamily: "var(--font-heading)" }}
            >
              Stay Connected
            </span>
            <h2
              className="text-[28px] leading-[1.2] mb-3"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "#fff" }}
            >
              Reach Us on WhatsApp
            </h2>
            <div className="w-16 h-[2px]" style={{ background: C.gold }} />
          </motion.div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 — Contact Sales Team */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/[0.06] border border-white/10 p-6 relative overflow-hidden"
              style={{ borderRadius: 0 }}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#25D366]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-[50px] h-[50px] rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0">
                    <MessageCircle size={22} className="text-[#25D366]" />
                  </div>
                  <h3
                    className="text-white text-[16px] uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                  >
                    Sales Team
                  </h3>
                </div>
                <p className="text-white/50 text-[13px] mb-5" style={{ lineHeight: 1.5 }}>
                  Directly contact our sales team on WhatsApp for quick quotes, product inquiries, and bulk orders.
                </p>
                <a
                  href="https://wa.me/97143403006?text=Hi, I'd like to speak with a sales executive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-2.5 text-[12px] uppercase tracking-wider hover:bg-[#20bd5a] transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  <MessageCircle size={14} />
                  Chat Now
                </a>
              </div>
            </motion.div>

            {/* Card 2 — WhatsApp Channel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/[0.06] border border-white/10 p-6 relative overflow-hidden"
              style={{ borderRadius: 0 }}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#25D366]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-[50px] h-[50px] rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0">
                    <MessageCircle size={22} className="text-[#25D366]" />
                  </div>
                  <h3
                    className="text-white text-[16px] uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                  >
                    WhatsApp Channel
                  </h3>
                </div>
                <p className="text-white/50 text-[13px] mb-5" style={{ lineHeight: 1.5 }}>
                  Follow our WhatsApp channel to see daily and latest offers, promotions, and new product alerts.
                </p>
                <a
                  href="https://whatsapp.com/channel/tezkargift"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-2.5 text-[12px] uppercase tracking-wider hover:bg-[#20bd5a] transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  <MessageCircle size={14} />
                  Follow Channel
                </a>
              </div>
            </motion.div>

            {/* Card 3 — WhatsApp Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/[0.06] border border-white/10 p-6 relative overflow-hidden"
              style={{ borderRadius: 0 }}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#25D366]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-[50px] h-[50px] rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0">
                    <MessageCircle size={22} className="text-[#25D366]" />
                  </div>
                  <h3
                    className="text-white text-[16px] uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                  >
                    WhatsApp Updates
                  </h3>
                </div>
                <p className="text-white/50 text-[13px] mb-4" style={{ lineHeight: 1.5 }}>
                  Save your number to receive our latest offers and promotions directly via WhatsApp.
                </p>
                <form onSubmit={handleWaSubmit} className="flex">
                  <input
                    type="tel"
                    required
                    placeholder="+971 50 123 4567"
                    value={waNumber}
                    onChange={(e) => setWaNumber(e.target.value)}
                    className="flex-1 bg-white/10 border border-white/15 text-white placeholder-white/30 px-4 py-2.5 text-[13px] outline-none focus:border-[#25D366] transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-[#25D366] text-white px-6 py-2.5 text-[12px] uppercase tracking-wider hover:bg-[#20bd5a] transition-colors flex items-center gap-2"
                    style={{ fontWeight: 600 }}
                  >
                    <Send size={14} />
                    Save
                  </button>
                </form>
                {waSubmitted && (
                  <div className="mt-3 p-3 text-[13px]" style={{ background: "#25D3661A", color: "#25D366", border: "1px solid #25D36633" }}>
                    Thank you! You'll receive our latest offers shortly.
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Contact Form + Our Location (mtc.ae compact layout) ── */}
      <section className="py-[64px]" style={{ background: C.bg }}>
        <div className="max-w-[1400px] mx-auto px-[15px] py-[0px]">
          {/* Section header — homepage style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <span
              className="text-[11px] uppercase tracking-[3px] mb-2 inline-block"
              style={{ color: C.pink, fontWeight: 600, fontFamily: "var(--font-heading)" }}
            >
              Get in Touch
            </span>
            <h2
              className="text-[28px] leading-[1.2] mb-3"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: C.dark }}
            >
              Contact Us
            </h2>
            <div className="w-16 h-[2px]" style={{ background: C.gold }} />
          </motion.div>

          <div>
            {/* Full-width Contact Us Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="border bg-white"
              style={{ borderColor: C.border }}
            >
              <div className="p-6">
                {submitted && (
                  <div className="mb-5 p-3 text-[13px]" style={{ background: "#044c5c12", color: C.primary, border: `1px solid ${C.primary}33` }}>
                    Thank you! We have received your message and will respond shortly.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[12px] mb-1.5" style={{ color: C.dark, fontWeight: 600 }}>
                        Name / Company Name <span style={{ color: "#C62828" }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full h-[42px] px-3 text-[13px] outline-none transition-colors"
                        style={{ border: `1px solid ${C.border}`, background: C.bg, color: C.dark }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = C.primary)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] mb-1.5" style={{ color: C.dark, fontWeight: 600 }}>
                        Contact Number <span style={{ color: "#C62828" }}>*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+971 50 XXX XXXX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full h-[42px] px-3 text-[13px] outline-none transition-colors"
                        style={{ border: `1px solid ${C.border}`, background: C.bg, color: C.dark }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = C.primary)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] mb-1.5" style={{ color: C.dark, fontWeight: 600 }}>
                        Email <span style={{ color: "#C62828" }}>*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full h-[42px] px-3 text-[13px] outline-none transition-colors"
                        style={{ border: `1px solid ${C.border}`, background: C.bg, color: C.dark }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = C.primary)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] mb-1.5" style={{ color: C.dark, fontWeight: 600 }}>
                        Subject
                      </label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full h-[42px] px-3 text-[13px] outline-none transition-colors"
                        style={{ border: `1px solid ${C.border}`, background: C.bg, color: C.dark }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = C.primary)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2">
                      <label className="block text-[12px] mb-1.5" style={{ color: C.dark, fontWeight: 600 }}>
                        Message <span style={{ color: "#C62828" }}>*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-3 py-2.5 text-[13px] outline-none transition-colors resize-none"
                        style={{ border: `1px solid ${C.border}`, background: C.bg, color: C.dark }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = C.primary)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="block text-[12px] mb-1.5" style={{ color: C.dark, fontWeight: 600 }}>
                          CAPTCHA
                        </label>
                        <div
                          className="flex items-center justify-center h-[76px]"
                          style={{ border: `1px solid ${C.border}`, background: C.bg }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 border-2 rounded cursor-pointer" style={{ borderColor: C.muted }} />
                            <span className="text-[13px]" style={{ color: C.body }}>I'm not a robot</span>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full h-[44px] text-[13px] text-white uppercase tracking-wider transition-opacity mt-auto"
                        style={{ background: C.primary, fontWeight: 600, fontFamily: "var(--font-heading)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                      >
                        Submit Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ── Our Companies / Group ── */}
      

      {/* ── CTA Banner ── */}
      
    </div>
  );
}