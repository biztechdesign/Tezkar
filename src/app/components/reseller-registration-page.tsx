import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  Shield,
  Heart,
  Sparkles,
  Upload,
  X,
  CheckCircle2,
  Check,
  Eye,
  Download,
  Package,
  Tag,
  Clock,
  Lock,
  Star,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const bannerImg =
  "https://images.unsplash.com/photo-1591453214154-c95db71dbd83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBhcnRuZXJzaGlwJTIwaGFuZHNoYWtlJTIwY29ycG9yYXRlJTIwcmVzZWxsZXJ8ZW58MXx8fHwxNzczMjk2Nzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const salesStaffOptions = [
  "Ahmad Al Rashid",
  "Sara Mohammed",
  "Khalid Al Mansoori",
  "Fatima Al Zaabi",
  "Omar Al Hashimi",
  "Noor Al Farsi",
  "Other",
];

const prefixOptions = ["Mr.", "Mrs.", "Ms.", "Dr."];

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

const registeredBenefits = [
  { icon: Eye, label: "Show Item Price" },
  { icon: Star, label: "Customise Quotation (Direct)" },
  { icon: Download, label: "Download Printing Instruction" },
  { icon: Package, label: "Show Stock Availability" },
  { icon: Tag, label: "Show Items Code (SKU)" },
  { icon: Clock, label: "Order History List" },
  { icon: Lock, label: "Change Password" },
];

const normalBenefits = [
  { icon: Eye, label: "Show Item Price", ok: false },
  { icon: Star, label: "Customise Quotation (Direct)", ok: false },
  { icon: Download, label: "Download Printing Instruction", ok: false },
  { icon: Package, label: "Show Stock Availability", ok: true },
  { icon: Tag, label: "Show Items Code (SKU)", ok: true },
  { icon: Clock, label: "Order History List", ok: true },
  { icon: Lock, label: "Change Password", ok: true },
];

function AnimField({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ResellerRegistrationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);

  const [salesPerson, setSalesPerson] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [prefix, setPrefix] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [country, setCountry] = useState("United Arab Emirates");
  const [cityState, setCityState] = useState("");
  const [completeAddress, setCompleteAddress] = useState("");
  const [preferredStaff, setPreferredStaff] = useState("");

  const [tradeLicense, setTradeLicense] = useState<File | null>(null);
  const [vatCertificate, setVatCertificate] = useState<File | null>(null);
  const [idFront, setIdFront] = useState<File | null>(null);
  const [idBack, setIdBack] = useState<File | null>(null);

  const tradeLicenseRef = useRef<HTMLInputElement>(null);
  const vatCertificateRef = useRef<HTMLInputElement>(null);
  const idFrontRef = useRef<HTMLInputElement>(null);
  const idBackRef = useRef<HTMLInputElement>(null);

  const [captchaA] = useState(Math.floor(Math.random() * 10) + 1);
  const [captchaB] = useState(Math.floor(Math.random() * 10) + 1);
  const [captchaVal, setCaptchaVal] = useState("");

  useEffect(() => {
    if (!submitted) { setProgress(0); return; }
    let p = 0;
    const id = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) { clearInterval(id); setTimeout(() => setSubmitted(false), 1500); }
    }, 60);
    return () => clearInterval(id);
  }, [submitted]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(captchaVal) !== captchaA + captchaB) { alert("Incorrect CAPTCHA answer."); return; }
    setSubmitted(true);
  };

  const labelCls = "block text-[13px] mb-1.5";

  const reqSpan: React.CSSProperties = {
    color: "#5B616A", fontStyle: "italic", fontWeight: 400, marginLeft: "4px", fontSize: "12px",
  };

  const inputSt: React.CSSProperties = {
    width: "100%", height: "46px", borderWidth: "1px", borderStyle: "solid", borderColor: "#E6E8EB", borderRadius: 0,
    padding: "0 14px", fontSize: "14px", fontFamily: "var(--font-body)",
    color: "#2C2C2C", backgroundColor: "#F7F8FA", outline: "none",
    transition: "border-color 0.25s, box-shadow 0.25s",
  };

  const selSt: React.CSSProperties = {
    ...inputSt,
    WebkitAppearance: "none",
    MozAppearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235B616A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
    paddingRight: "36px",
    cursor: "pointer",
  };

  const onFoc = (e: React.FocusEvent<HTMLElement>) => {
    e.currentTarget.style.borderColor = "#044c5c";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(4,76,92,0.08)";
  };
  const onBl = (e: React.FocusEvent<HTMLElement>) => {
    e.currentTarget.style.borderColor = "#E6E8EB";
    e.currentTarget.style.boxShadow = "none";
  };

  const pickFile = (e: React.ChangeEvent<HTMLInputElement>, setter: (f: File | null) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const ext = file.name.split(".").pop()?.toLowerCase() || "";
      if (["pdf", "jpg", "jpeg", "png", "doc", "docx"].includes(ext) && file.size <= 5 * 1024 * 1024) {
        setter(file);
      }
    }
  };

  const lblSt: React.CSSProperties = { color: "#044c5c", fontWeight: 500, fontFamily: "var(--font-body)" };
  const subLblSt: React.CSSProperties = { color: "#5B616A", fontWeight: 400, fontFamily: "var(--font-body)", fontSize: "12px" };

  const renderUpload = (label: string, required: boolean, file: File | null, ref: React.RefObject<HTMLInputElement | null>, setter: (f: File | null) => void) => (
    <div>
      <label className={labelCls} style={lblSt}>
        {label}
        {required && <span style={reqSpan}>(Required)</span>}
      </label>
      <div
        className="flex items-center gap-3 cursor-pointer"
        style={{ border: "1px solid #E6E8EB", backgroundColor: "#F7F8FA", height: "46px", padding: "0 14px" }}
        onClick={() => ref.current?.click()}
      >
        <Upload size={16} style={{ color: "#5B616A" }} />
        <span className="flex-1 truncate text-[13px]" style={{ color: file ? "#2C2C2C" : "#8A9199", fontFamily: "var(--font-body)" }}>
          {file ? file.name : "No file chosen"}
        </span>
        <span className="text-[12px] px-3 py-1" style={{ backgroundColor: "#044c5c", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 500 }}>
          Choose File
        </span>
      </div>
      <input ref={ref} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={(e) => pickFile(e, setter)} />
      <p className="text-[11px] mt-1" style={{ color: "#5B616A", fontFamily: "var(--font-body)" }}>
        Accepted file types: pdf, jpg, png, doc, jpeg. Max. file size: 5 MB.
      </p>
    </div>
  );

  return (
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh" }}>
      {/* HERO BANNER */}
      <div className="relative overflow-hidden" style={{ height: "320px" }}>
        <ImageWithFallback src={bannerImg} alt="Reseller Registration" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(4,76,92,0.92) 0%, rgba(4,76,92,0.7) 50%, rgba(200,149,108,0.5) 100%)" }} />
        <div className="absolute inset-0 opacity-[0.06]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="gridR" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridR)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-[12px] uppercase tracking-[3px] mb-3" style={{ color: "#C8956C", fontWeight: 600, fontFamily: "var(--font-heading)" }}>
              Partner With Us
            </p>
            <h1 className="text-white text-[36px] md:text-[46px] !leading-[1.1] mb-3" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
              Reseller Registration
            </h1>
            <p className="text-white/80 max-w-[560px] text-[15px] !leading-[1.6]" style={{ fontFamily: "var(--font-body)" }}>
              Join our reseller network and unlock exclusive pricing, customization tools, and dedicated support for your advertising agency.
            </p>
          </motion.div>
          <motion.div className="flex flex-wrap gap-3 mt-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            {[
              { icon: Shield, text: "Free of Cost" },
              { icon: Heart, text: "Exclusive Pricing" },
              { icon: Sparkles, text: "Dedicated Support" },
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

      {/* BREADCRUMB */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 py-4 text-[12px]" style={{ fontFamily: "var(--font-body)", color: "#8A9199" }}>
          <a href="/" className="transition-colors duration-200" style={{ color: "#8A9199" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#044c5c")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8A9199")}
          >Home</a>
          <ChevronDown size={12} className="-rotate-90" />
          <span style={{ color: "#044c5c", fontWeight: 500 }}>Reseller Registration</span>
        </div>
      </div>

      {/* BENEFITS COMPARISON */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingBottom: "40px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 flex flex-col">
              <h2 className="text-[28px] mb-3" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "#044c5c" }}>
                Reseller Panel Benefits
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  { icon: Tag, text: "Exclusive wholesale pricing" },
                  { icon: Star, text: "Direct quotation access" },
                  { icon: Package, text: "Real-time stock availability" },
                  { icon: Download, text: "Downloadable print instructions" },
                  { icon: Clock, text: "Full order history tracking" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2.5">
                    <div className="w-[26px] h-[26px] flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#E8DDD3", borderRadius: "6px" }}>
                      <item.icon size={14} style={{ color: "#044c5c" }} />
                    </div>
                    <span className="text-[13px]" style={{ fontFamily: "var(--font-body)", color: "#2C2C2C", fontWeight: 500 }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-[13px] mt-5" style={{ fontFamily: "var(--font-body)", color: "#044c5c", fontWeight: 500 }}>
                <Sparkles size={16} style={{ color: "#C8956C" }} />
                <span>Join 500+ verified resellers</span>
              </div>

              {/* Tutorial Video */}
              <div className="mt-auto pt-6">
                <p className="text-[12px] uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "#044c5c", letterSpacing: "0.08em" }}>
                  How to Register — Tutorial
                </p>
                <div className="relative w-full overflow-hidden" style={{ paddingBottom: "56.25%", borderWidth: "1px", borderStyle: "solid", borderColor: "#E6E8EB", borderRadius: 0 }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Reseller Registration Tutorial"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ border: "none" }}
                  />
                </div>
                <p className="text-[11px] mt-2" style={{ fontFamily: "var(--font-body)", color: "#8A9199" }}>
                  Watch our step-by-step guide to complete your registration
                </p>
              </div>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Registered */}
              <div className="relative overflow-hidden flex flex-col" style={{ borderWidth: "2px", borderStyle: "solid", borderColor: "#044c5c", borderRadius: 0, boxShadow: "0 8px 32px rgba(4,76,92,0.12)" }}>
                {/* Recommended ribbon */}
                <div className="absolute top-0 right-0 z-10">
                  <div className="px-3 py-1 text-[10px] tracking-wider" style={{ backgroundColor: "#C8956C", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.1em", borderRadius: "0 0 0 8px" }}>
                    ★ Recommended
                  </div>
                </div>
                <div className="text-center py-5 relative" style={{ background: "linear-gradient(135deg, #044c5c 0%, #066d7e 100%)" }}>
                  <div className="w-[40px] h-[40px] mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: "rgba(200,149,108,0.2)", borderRadius: "50%" }}>
                    <Star size={22} style={{ color: "#fff" }} />
                  </div>
                  <h3 className="text-white text-[18px]" style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>Registered Reseller</h3>
                  <p className="text-white/80 text-[12px] mt-1.5 px-4" style={{ fontFamily: "var(--font-body)", lineHeight: "1.4" }}>Benefits of being registered</p>
                  <p className="text-[11px] mt-1 px-4" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>Free registration for All Advertising agency</p>
                </div>
                <div className="p-5" style={{ backgroundColor: "#f0faf8" }}>
                  {registeredBenefits.map((b, i) => {
                    const Icon = b.icon;
                    return (
                      <motion.div key={b.label} className="flex items-center gap-3 py-3" style={{ borderBottom: i < registeredBenefits.length - 1 ? "1px solid rgba(4,76,92,0.08)" : "none" }} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 * i + 0.2 }}>
                        <div className="w-[28px] h-[28px] flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#044c5c", borderRadius: "6px" }}>
                          <Icon size={14} style={{ color: "#fff" }} />
                        </div>
                        <span className="text-[13px] flex-1" style={{ color: "#2C2C2C", fontFamily: "var(--font-body)", fontWeight: 500 }}>{b.label}</span>
                        <Check size={16} style={{ color: "#044c5c" }} />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              {/* Normal User */}
              <div className="relative overflow-hidden flex flex-col" style={{ borderWidth: "1px", borderStyle: "solid", borderColor: "#E6E8EB", borderRadius: 0, boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
                <div className="text-center py-5 relative" style={{ background: "linear-gradient(135deg, #d41c5c 0%, #e8407a 100%)" }}>
                  <div className="w-[40px] h-[40px] mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "50%" }}>
                    <X size={22} style={{ color: "#fff" }} />
                  </div>
                  <h3 className="text-white text-[18px]" style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>Normal User</h3>
                  <p className="text-white/80 text-[12px] mt-1.5 px-4" style={{ fontFamily: "var(--font-body)", lineHeight: "1.4" }}>Price of Stock disabled</p>
                  <p className="text-[11px] mt-1 px-4" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>Create Quotation is Disabled</p>
                </div>
                <div className="p-5" style={{ backgroundColor: "#fff" }}>
                  {normalBenefits.map((b, i) => {
                    const Icon = b.icon;
                    return (
                      <motion.div key={b.label} className="flex items-center gap-3 py-3" style={{ borderBottom: i < normalBenefits.length - 1 ? "1px solid #f0f0f0" : "none" }} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 * i + 0.2 }}>
                        <div className="w-[28px] h-[28px] flex items-center justify-center flex-shrink-0" style={{ backgroundColor: b.ok ? "#fce8ef" : "#fef2f2", borderRadius: "6px" }}>
                          <Icon size={14} style={{ color: b.ok ? "#d41c5c" : "#d41c5c", opacity: b.ok ? 1 : 0.5 }} />
                        </div>
                        <span className="text-[13px] flex-1" style={{ color: b.ok ? "#2C2C2C" : "#8A9199", fontFamily: "var(--font-body)", fontWeight: 500, textDecoration: b.ok ? "none" : "line-through" }}>{b.label}</span>
                        {b.ok ? <Check size={16} style={{ color: "#d41c5c" }} /> : <X size={16} style={{ color: "#d41c5c", opacity: 0.5 }} />}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* REGISTRATION FORM */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingBottom: "64px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
          <div style={{ backgroundColor: "#fff", borderWidth: "1px", borderStyle: "solid", borderColor: "#E6E8EB", borderRadius: 0, padding: "36px 32px" }}>
            <div className="mb-8">
              <h2 className="text-[24px] mb-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "#2C2C2C" }}>
                Reseller Website Registration Form
              </h2>
              <p className="text-[14px] !leading-[1.6] max-w-[700px]" style={{ fontFamily: "var(--font-body)", color: "#5B616A" }}>
                ( Showing Price + Quantity ) Free of Cost For All Advertising Agency
              </p>
              <p className="text-[13px] mt-2" style={{ fontFamily: "var(--font-body)", color: "#8A9199" }}>
                For Promotions and Offers
              </p>
            </div>

            <form onSubmit={onSubmit}>
              {/* Sales Person + Company Name */}
              <AnimField delay={0.05}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-5">
                  <div>
                    <label className={labelCls} style={lblSt}>Select TezkarGift Sales Person name<span style={reqSpan}>(Required)</span></label>
                    <select style={selSt} value={salesPerson} onChange={(e) => setSalesPerson(e.target.value)} onFocus={onFoc as any} onBlur={onBl as any}>
                      <option value="">Select...</option>
                      {salesStaffOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls} style={lblSt}>Company Name<span style={reqSpan}>(Required)</span></label>
                    <input type="text" style={inputSt} value={companyName} onChange={(e) => setCompanyName(e.target.value)} onFocus={onFoc as any} onBlur={onBl as any} placeholder="Your company name" />
                  </div>
                </div>
              </AnimField>

              {/* Authorized Contact Person header */}
              <AnimField delay={0.1}>
                <div className="mb-5">
                  <label className={labelCls} style={lblSt}>Authorized Contact Person<span style={reqSpan}>(Required)</span></label>
                </div>
              </AnimField>

              {/* Prefix + First + Last */}
              <AnimField delay={0.12}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5 mb-5">
                  <div>
                    <label className={labelCls} style={subLblSt}>Prefix</label>
                    <select style={selSt} value={prefix} onChange={(e) => setPrefix(e.target.value)} onFocus={onFoc as any} onBlur={onBl as any}>
                      <option value="">Select...</option>
                      {prefixOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls} style={subLblSt}>First Name</label>
                    <input type="text" style={inputSt} value={firstName} onChange={(e) => setFirstName(e.target.value)} onFocus={onFoc as any} onBlur={onBl as any} />
                  </div>
                  <div>
                    <label className={labelCls} style={subLblSt}>Last Name</label>
                    <input type="text" style={inputSt} value={lastName} onChange={(e) => setLastName(e.target.value)} onFocus={onFoc as any} onBlur={onBl as any} />
                  </div>
                </div>
              </AnimField>

              {/* Company Office Number + Mobile */}
              <AnimField delay={0.15}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-5">
                  <div>
                    <label className={labelCls} style={lblSt}>Company Office Number<span style={reqSpan}>(Required)</span></label>
                    <input type="tel" placeholder="Ex. +971 (0) 1234567" style={inputSt} value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} onFocus={onFoc as any} onBlur={onBl as any} />
                  </div>
                  <div>
                    <label className={labelCls} style={lblSt}>Preferred Mobile Number<span style={reqSpan}>(Required)</span></label>
                    <input type="tel" placeholder="Ex. +971 (0) 1234567" style={inputSt} value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} onFocus={onFoc as any} onBlur={onBl as any} />
                  </div>
                </div>
              </AnimField>

              {/* Email + WhatsApp */}
              <AnimField delay={0.2}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-5">
                  <div>
                    <label className={labelCls} style={lblSt}>Email Address<span style={reqSpan}>(Required)</span></label>
                    <input type="email" style={inputSt} value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} onFocus={onFoc as any} onBlur={onBl as any} placeholder="email@company.com" />
                  </div>
                  <div>
                    <label className={labelCls} style={lblSt}>WhatsApp Number<span style={reqSpan}>(Required)</span></label>
                    <input type="tel" placeholder="+971 50 123 4567" style={inputSt} value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} onFocus={onFoc as any} onBlur={onBl as any} />
                    <p className="text-[11px] mt-1" style={{ color: "#5B616A", fontFamily: "var(--font-body)", fontStyle: "italic" }}>for Promotions and Offers</p>
                  </div>
                </div>
              </AnimField>

              {/* Country + City */}
              <AnimField delay={0.25}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-5">
                  <div>
                    <label className={labelCls} style={lblSt}>Country<span style={reqSpan}>(Required)</span></label>
                    <select style={selSt} value={country} onChange={(e) => setCountry(e.target.value)} onFocus={onFoc as any} onBlur={onBl as any}>
                      {countryOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls} style={lblSt}>City / State<span style={reqSpan}>(Required)</span></label>
                    <input type="text" style={inputSt} value={cityState} onChange={(e) => setCityState(e.target.value)} onFocus={onFoc as any} onBlur={onBl as any} placeholder="e.g. Dubai" />
                  </div>
                </div>
              </AnimField>

              {/* Complete Address */}
              <AnimField delay={0.28}>
                <div className="mb-5">
                  <label className={labelCls} style={lblSt}>Complete Address / Complete Area Details<span style={reqSpan}>(Required)</span></label>
                  <input type="text" style={inputSt} value={completeAddress} onChange={(e) => setCompleteAddress(e.target.value)} onFocus={onFoc as any} onBlur={onBl as any} placeholder="Full address with area, building, and street" />
                </div>
              </AnimField>

              <div className="my-8" style={{ height: "1px", backgroundColor: "#E6E8EB" }} />

              {/* UPLOADS */}
              <AnimField delay={0.3}>
                <h3 className="text-[18px] mb-6" style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "#2C2C2C" }}>
                  Uploads and Attachments
                </h3>
              </AnimField>

              <AnimField delay={0.32}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-5">
                  {renderUpload("Upload Trade License", true, tradeLicense, tradeLicenseRef, setTradeLicense)}
                  {renderUpload("Upload VAT Certificate", false, vatCertificate, vatCertificateRef, setVatCertificate)}
                </div>
              </AnimField>

              <AnimField delay={0.35}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-5">
                  {renderUpload("Upload Signatory / Management EID / National ID ( Front )", true, idFront, idFrontRef, setIdFront)}
                  {renderUpload("Upload Signatory / Management EID / National ID ( Back )", true, idBack, idBackRef, setIdBack)}
                </div>
              </AnimField>

              {/* Preferred Staff */}
              <AnimField delay={0.38}>
                <div className="mb-5">
                  <label className={labelCls} style={lblSt}>Preferred MTC Sales Staff :<span style={reqSpan}>(Required)</span></label>
                  <select style={selSt} value={preferredStaff} onChange={(e) => setPreferredStaff(e.target.value)} onFocus={onFoc as any} onBlur={onBl as any}>
                    <option value="">Select...</option>
                    {salesStaffOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </AnimField>

              <div className="my-8" style={{ height: "1px", backgroundColor: "#E6E8EB" }} />

              {/* CAPTCHA */}
              <AnimField delay={0.4}>
                <div className="mb-6">
                  <label className={labelCls} style={{ color: "#044c5c", fontWeight: 600, fontFamily: "var(--font-body)", fontSize: "14px" }}>CAPTCHA</label>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2 px-5 py-2.5" style={{ backgroundColor: "#F7F8FA", border: "1px solid #E6E8EB" }}>
                      <span className="text-[18px]" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "#044c5c", letterSpacing: "2px", userSelect: "none" }}>
                        {captchaA} + {captchaB} =
                      </span>
                    </div>
                    <input type="text" style={{ ...inputSt, width: "100px" }} value={captchaVal} onChange={(e) => setCaptchaVal(e.target.value)} onFocus={onFoc as any} onBlur={onBl as any} placeholder="?" />
                  </div>
                </div>
              </AnimField>

              {/* Submit */}
              <AnimField delay={0.42}>
                <motion.button
                  type="submit"
                  className="group relative w-full overflow-hidden"
                  style={{ height: "52px", backgroundColor: "#044c5c", color: "#fff", fontSize: "15px", fontWeight: 600, fontFamily: "var(--font-body)", borderWidth: 0, borderStyle: "none", borderRadius: 0, cursor: "pointer", letterSpacing: "0.5px" }}
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                >
                  <span className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ backgroundColor: "#d41c5c" }} aria-hidden="true" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {submitted ? (<><CheckCircle2 size={18} />Submitted!</>) : "Submit Form"}
                  </span>
                </motion.button>
              </AnimField>

              <AnimatePresence>
                {submitted && (
                  <motion.div className="mt-4" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                    <div style={{ backgroundColor: "#E8F4F6", border: "1px solid rgba(4,76,92,0.2)", padding: "16px 20px" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 size={16} style={{ color: "#044c5c" }} />
                        <span className="text-[14px]" style={{ color: "#044c5c", fontWeight: 600, fontFamily: "var(--font-body)" }}>
                          Thank you! Your registration has been submitted successfully.
                        </span>
                      </div>
                      <p className="text-[13px] mb-3" style={{ color: "#5B616A", fontFamily: "var(--font-body)" }}>
                        Our team will review your application and activate your reseller account within 24-48 hours.
                      </p>
                      <div style={{ height: "3px", backgroundColor: "rgba(4,76,92,0.1)", overflow: "hidden" }}>
                        <motion.div style={{ height: "100%", backgroundColor: "#044c5c", width: `${progress}%` }} transition={{ duration: 0.1 }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}