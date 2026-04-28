import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  Shield,
  Heart,
  Sparkles,
  CheckCircle2,
  Save,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const bannerImg =
  "https://images.unsplash.com/photo-1591453214154-c95db71dbd83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBhcnRuZXJzaGlwJTIwaGFuZHNoYWtlJTIwY29ycG9yYXRlJTIwcmVzZWxsZXJ8ZW58MXx8fHwxNzczMjk2Nzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const salesExecutiveOptions = [
  "Ms. Aisha",
  "Ahmad Al Rashid",
  "Sara Mohammed",
  "Khalid Al Mansoori",
  "Fatima Al Zaabi",
  "Omar Al Hashimi",
  "Noor Al Farsi",
  "Other",
];

const customerGroupOptions = ["Individual", "Corporate", "Reseller"];

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

function ToggleSwitch({
  active,
  onClick,
  label,
  disabled = false,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className="relative flex-shrink-0 transition-colors"
        style={{
          width: "40px",
          height: "22px",
          borderRadius: "999px",
          backgroundColor: active ? "#1FA868" : "#D8DCE0",
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
          border: "none",
          padding: 0,
        }}
        aria-pressed={active}
      >
        <span
          style={{
            position: "absolute",
            top: "2px",
            left: active ? "20px" : "2px",
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            transition: "left 0.2s ease",
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
          }}
        />
      </button>
      <span
        className="text-[13px] !leading-[1.4]"
        style={{ color: "#2C2C2C", fontFamily: "var(--font-body)", fontWeight: 500 }}
      >
        {label}
      </span>
    </div>
  );
}

export function BusinessPartnerFormPage() {
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);

  const [salesExecutive, setSalesExecutive] = useState("Ms. Aisha");
  const [customerGroup, setCustomerGroup] = useState("Individual");
  const [prefix, setPrefix] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [secondEmail, setSecondEmail] = useState("");
  const [billingCountry, setBillingCountry] = useState("United Arab Emirates");
  const [billingCity, setBillingCity] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [area, setArea] = useState("");
  const [shippingMode, setShippingMode] = useState<"billing" | "add" | null>(null);
  const [optionalEmail, setOptionalEmail] = useState("");

  useEffect(() => {
    if (!submitted) {
      setProgress(0);
      return;
    }
    let p = 0;
    const id = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        setTimeout(() => setSubmitted(false), 1500);
      }
    }, 60);
    return () => clearInterval(id);
  }, [submitted]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const labelCls = "block text-[13px] mb-1.5";

  const reqSpan: React.CSSProperties = {
    color: "#d41c5c",
    fontStyle: "italic",
    fontWeight: 400,
    marginLeft: "4px",
    fontSize: "12px",
  };

  const inputSt: React.CSSProperties = {
    width: "100%",
    height: "46px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#E6E8EB",
    borderRadius: 0,
    padding: "0 14px",
    fontSize: "14px",
    fontFamily: "var(--font-body)",
    color: "#2C2C2C",
    backgroundColor: "#F7F8FA",
    outline: "none",
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

  const lblSt: React.CSSProperties = {
    color: "#044c5c",
    fontWeight: 500,
    fontFamily: "var(--font-body)",
  };
  const subLblSt: React.CSSProperties = {
    color: "#5B616A",
    fontWeight: 400,
    fontFamily: "var(--font-body)",
    fontSize: "12px",
  };
  const sectionHeaderSt: React.CSSProperties = {
    fontFamily: "var(--font-heading)",
    fontWeight: 600,
    color: "#2C2C2C",
    fontSize: "16px",
  };

  return (
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh" }}>
      {/* HERO BANNER */}
      <div className="relative overflow-hidden" style={{ height: "260px" }}>
        <ImageWithFallback
          src={bannerImg}
          alt="Business Partner Form"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(4,76,92,0.92) 0%, rgba(4,76,92,0.7) 50%, rgba(200,149,108,0.5) 100%)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.06]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="gridBPF" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridBPF)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-[12px] uppercase tracking-[3px] mb-3"
              style={{
                color: "#C8956C",
                fontWeight: 600,
                fontFamily: "var(--font-heading)",
              }}
            >
              Become a Partner
            </p>
            <h1
              className="text-white text-[32px] md:text-[42px] !leading-[1.1] mb-3"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
            >
              Business Partner Form
            </h1>
            <p
              className="text-white/80 max-w-[560px] text-[14px] !leading-[1.6]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Please fill up the field below to register as a new customer with us.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-wrap gap-3 mt-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {[
              { icon: Shield, text: "Trusted Partner" },
              { icon: Heart, text: "Personal Service" },
              { icon: Sparkles, text: "Dedicated Support" },
            ].map((b) => (
              <span
                key={b.text}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-wider"
                style={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(8px)",
                  color: "#fff",
                  fontWeight: 600,
                  fontFamily: "var(--font-body)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
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
        <div
          className="flex items-center gap-2 py-4 text-[12px]"
          style={{ fontFamily: "var(--font-body)", color: "#8A9199" }}
        >
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
          <span style={{ color: "#044c5c", fontWeight: 500 }}>Business Partner Form</span>
        </div>
      </div>

      {/* FORM */}
      <div
        className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"
        style={{ paddingBottom: "64px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#E6E8EB",
              borderRadius: 0,
              padding: "32px 28px",
            }}
          >
            <p
              className="text-[12px] mb-5"
              style={{
                fontFamily: "var(--font-body)",
                color: "#2C2C2C",
                fontWeight: 500,
              }}
            >
              <span style={{ color: "#d41c5c", fontStyle: "italic" }}>"(Req.)"</span>{" "}
              indicates required fields
            </p>

            <form onSubmit={onSubmit}>
              {/* SALES EXECUTIVE + CUSTOMER GROUP */}
              <AnimField delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-3">
                  <div>
                    <label className={labelCls} style={lblSt}>
                      Select MTC Sales Executive Name
                      <span style={reqSpan}>(Req.)</span>
                    </label>
                    <select
                      style={selSt}
                      value={salesExecutive}
                      onChange={(e) => setSalesExecutive(e.target.value)}
                      onFocus={onFoc as any}
                      onBlur={onBl as any}
                    >
                      {salesExecutiveOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls} style={lblSt}>
                      Customer Group<span style={reqSpan}>(Req.)</span>
                    </label>
                    <select
                      style={selSt}
                      value={customerGroup}
                      onChange={(e) => setCustomerGroup(e.target.value)}
                      onFocus={onFoc as any}
                      onBlur={onBl as any}
                    >
                      {customerGroupOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </AnimField>

              {/* NOTE */}
              <AnimField delay={0.13}>
                <div
                  className="mb-6 text-[12px] !leading-[1.7]"
                  style={{ fontFamily: "var(--font-body)", color: "#5B616A" }}
                >
                  <p style={{ fontWeight: 600, color: "#2C2C2C", marginBottom: "2px" }}>
                    Note :
                  </p>
                  <p>
                    <span style={{ fontWeight: 600 }}>Corporate</span> : Non Advertising
                    Company
                  </p>
                  <p>
                    <span style={{ fontWeight: 600 }}>Reseller</span> : Advertising Company
                    &amp; Trading Company
                  </p>
                  <p>
                    <span style={{ fontWeight: 600 }}>Individual</span> : Personal Account
                  </p>
                </div>
              </AnimField>

              {/* CLIENT NAME */}
              <AnimField delay={0.16}>
                <div className="mb-5">
                  <label className={labelCls} style={lblSt}>
                    Client's Name<span style={reqSpan}>(Req.)</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <select
                        style={selSt}
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value)}
                        onFocus={onFoc as any}
                        onBlur={onBl as any}
                      >
                        <option value="">Select...</option>
                        {prefixOptions.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      <p className="text-[11px] mt-1" style={subLblSt}>
                        Prefix
                      </p>
                    </div>
                    <div>
                      <input
                        type="text"
                        style={inputSt}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        onFocus={onFoc as any}
                        onBlur={onBl as any}
                      />
                      <p className="text-[11px] mt-1" style={subLblSt}>
                        First Name
                      </p>
                    </div>
                    <div>
                      <input
                        type="text"
                        style={inputSt}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        onFocus={onFoc as any}
                        onBlur={onBl as any}
                      />
                      <p className="text-[11px] mt-1" style={subLblSt}>
                        Last Name
                      </p>
                    </div>
                  </div>
                </div>
              </AnimField>

              {/* MOBILE */}
              <AnimField delay={0.19}>
                <div className="mb-5">
                  <label className={labelCls} style={lblSt}>
                    Contact Mobile Number ( WhatsApp Purpose )
                    <span style={reqSpan}>(Req.)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="ex. 971 50 123 4567"
                    style={inputSt}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    onFocus={onFoc as any}
                    onBlur={onBl as any}
                  />
                </div>
              </AnimField>

              {/* EMAIL */}
              <AnimField delay={0.22}>
                <div className="mb-5">
                  <label className={labelCls} style={lblSt}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="ex. sample@email.com"
                    style={inputSt}
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    onFocus={onFoc as any}
                    onBlur={onBl as any}
                  />
                </div>
              </AnimField>

              {/* SECOND EMAIL */}
              <AnimField delay={0.24}>
                <div className="mb-7">
                  <label className={labelCls} style={lblSt}>
                    Second Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="ex. sample@email.com"
                    style={inputSt}
                    value={secondEmail}
                    onChange={(e) => setSecondEmail(e.target.value)}
                    onFocus={onFoc as any}
                    onBlur={onBl as any}
                  />
                </div>
              </AnimField>

              {/* BILLING ADDRESS */}
              <AnimField delay={0.27}>
                <h3 className="mb-2" style={sectionHeaderSt}>
                  Billing Address Details
                </h3>
                <div
                  className="mb-5"
                  style={{ height: "1px", backgroundColor: "#E6E8EB" }}
                />
              </AnimField>

              <AnimField delay={0.29}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-5">
                  <div>
                    <label className={labelCls} style={lblSt}>
                      Billing Country<span style={reqSpan}>(Req.)</span>
                    </label>
                    <select
                      style={selSt}
                      value={billingCountry}
                      onChange={(e) => setBillingCountry(e.target.value)}
                      onFocus={onFoc as any}
                      onBlur={onBl as any}
                    >
                      {countryOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls} style={lblSt}>
                      Billing City / State
                    </label>
                    <input
                      type="text"
                      placeholder="ex. Dubai"
                      style={inputSt}
                      value={billingCity}
                      onChange={(e) => setBillingCity(e.target.value)}
                      onFocus={onFoc as any}
                      onBlur={onBl as any}
                    />
                  </div>
                </div>
              </AnimField>

              <AnimField delay={0.31}>
                <div className="mb-5">
                  <label className={labelCls} style={lblSt}>
                    Full Address / Complete Details
                  </label>
                  <input
                    type="text"
                    placeholder="EX. Office 123, 5th Floor, Building Name, Street Area, Deira, Dubai, UAE."
                    style={inputSt}
                    value={fullAddress}
                    onChange={(e) => setFullAddress(e.target.value)}
                    onFocus={onFoc as any}
                    onBlur={onBl as any}
                  />
                </div>
              </AnimField>

              <AnimField delay={0.33}>
                <div className="mb-7">
                  <label className={labelCls} style={lblSt}>
                    Area :<span style={reqSpan}>(Req.)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Example : Bur Dubai"
                    style={inputSt}
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    onFocus={onFoc as any}
                    onBlur={onBl as any}
                  />
                </div>
              </AnimField>

              {/* SHIPPING ADDRESS */}
              <AnimField delay={0.35}>
                <h3 className="mb-2" style={sectionHeaderSt}>
                  Shipping Address Details
                </h3>
                <div
                  className="mb-5"
                  style={{ height: "1px", backgroundColor: "#E6E8EB" }}
                />
              </AnimField>

              <AnimField delay={0.37}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-7">
                  <ToggleSwitch
                    active={shippingMode === "billing"}
                    onClick={() =>
                      setShippingMode(shippingMode === "billing" ? null : "billing")
                    }
                    label="Use Billing Details"
                  />
                  <ToggleSwitch
                    active={shippingMode === "add"}
                    onClick={() =>
                      setShippingMode(shippingMode === "add" ? null : "add")
                    }
                    label="Add Shipping Details"
                  />
                </div>
              </AnimField>

              {/* OPTIONAL */}
              <AnimField delay={0.39}>
                <h3 className="mb-2" style={sectionHeaderSt}>
                  Optional
                </h3>
                <div
                  className="mb-5"
                  style={{ height: "1px", backgroundColor: "#E6E8EB" }}
                />
              </AnimField>

              <AnimField delay={0.41}>
                <div className="mb-7">
                  <label className={labelCls} style={lblSt}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="ex. sample@email.com"
                    style={inputSt}
                    value={optionalEmail}
                    onChange={(e) => setOptionalEmail(e.target.value)}
                    onFocus={onFoc as any}
                    onBlur={onBl as any}
                  />
                  <p
                    className="text-[12px] mt-2"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "#5B616A",
                      fontStyle: "italic",
                    }}
                  >
                    for Promotions and Offers
                  </p>
                </div>
              </AnimField>

              {/* SUBMIT + SAVE */}
              <AnimField delay={0.44}>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 mt-2">
                  <motion.button
                    type="submit"
                    className="group relative overflow-hidden"
                    style={{
                      height: "52px",
                      backgroundColor: "#1FA868",
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: 600,
                      fontFamily: "var(--font-body)",
                      borderWidth: 0,
                      borderStyle: "none",
                      borderRadius: 0,
                      cursor: "pointer",
                      letterSpacing: "0.5px",
                    }}
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                  >
                    <span
                      className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{ backgroundColor: "#188556" }}
                      aria-hidden="true"
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {submitted ? (
                        <>
                          <CheckCircle2 size={18} />
                          Submitted!
                        </>
                      ) : (
                        "Submit Form"
                      )}
                    </span>
                  </motion.button>
                  <motion.button
                    type="button"
                    className="group relative overflow-hidden"
                    style={{
                      height: "52px",
                      backgroundColor: "#fff",
                      color: "#044c5c",
                      fontSize: "14px",
                      fontWeight: 600,
                      fontFamily: "var(--font-body)",
                      border: "1px solid #044c5c",
                      borderRadius: 0,
                      cursor: "pointer",
                      letterSpacing: "0.3px",
                      padding: "0 24px",
                    }}
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Save size={16} />
                      Save and Continue Later
                    </span>
                  </motion.button>
                </div>
              </AnimField>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    className="mt-4"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      style={{
                        backgroundColor: "#E8F4F6",
                        border: "1px solid rgba(4,76,92,0.2)",
                        padding: "16px 20px",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 size={16} style={{ color: "#044c5c" }} />
                        <span
                          className="text-[14px]"
                          style={{
                            color: "#044c5c",
                            fontWeight: 600,
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          Thank you! Your registration has been submitted successfully.
                        </span>
                      </div>
                      <p
                        className="text-[13px] mb-3"
                        style={{ color: "#5B616A", fontFamily: "var(--font-body)" }}
                      >
                        Our team will get back to you within 24-48 hours.
                      </p>
                      <div
                        style={{
                          height: "3px",
                          backgroundColor: "rgba(4,76,92,0.1)",
                          overflow: "hidden",
                        }}
                      >
                        <motion.div
                          style={{
                            height: "100%",
                            backgroundColor: "#044c5c",
                            width: `${progress}%`,
                          }}
                          transition={{ duration: 0.1 }}
                        />
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
