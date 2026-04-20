import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  AlertTriangle,
  Upload,
  X,
  CheckCircle2,
  Star,
  Phone,
  User,
  FileText,
  ChevronDown,
  Sparkles,
  Shield,
  Heart,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type FormType = "feedback" | "complaint";

const bannerImg =
  "https://images.unsplash.com/photo-1647866427893-0057366e91b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHNlcnZpY2UlMjBmZWVkYmFjayUyMGhlYWRzZXQlMjB0ZWFtfGVufDF8fHx8MTc3MzI5NTY5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

/* ── Options ── */
const interactionOptions = [
  "Office Visit",
  "Phone Call",
  "Email",
  "WhatsApp",
  "Website",
  "Social Media",
];
const satisfactionOptions = [
  "Very Satisfied",
  "Satisfied",
  "Neutral",
  "Dissatisfied",
  "Very Dissatisfied",
];
const professionalismOptions = [
  "Excellent",
  "Good",
  "Average",
  "Below Average",
  "Poor",
];
const productQualityOptions = [
  "Excellent",
  "Good",
  "Average",
  "Below Average",
  "Poor",
];
const marketPriceOptions = [
  "Very Competitive",
  "Competitive",
  "Average",
  "Expensive",
  "Very Expensive",
];
const websiteEasyOptions = [
  "Very Easy",
  "Easy",
  "Average",
  "Difficult",
  "Very Difficult",
];
const searchItemsOptions = [
  "Very Easy",
  "Easy",
  "Average",
  "Difficult",
  "Very Difficult",
];
const downloadResellerOptions = ["Yes", "No", "Not Sure"];
const whatsappMarketingOptions = [
  "Yes, Regularly",
  "Yes, Sometimes",
  "No",
  "Not Subscribed",
];
const complaintTypeOptions = [
  "Product Quality",
  "Delivery Issue",
  "Staff Behaviour",
  "Printing Error",
  "Packaging Damage",
  "Pricing Dispute",
  "Website Issue",
  "Other",
];

/* ── Animated field wrapper ── */
function AnimField({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
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

export function FeedbackComplaintPage() {
  const [formType, setFormType] = useState<FormType>("feedback");
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);

  /* Feedback fields */
  const [interactionMethod, setInteractionMethod] = useState("");
  const [satisfiedWithResponse, setSatisfiedWithResponse] = useState("");
  const [interactionMethod2, setInteractionMethod2] = useState("");
  const [staffName, setStaffName] = useState("");
  const [staffProfessionalism, setStaffProfessionalism] = useState("");
  const [productQuality, setProductQuality] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [websiteEasyToUse, setWebsiteEasyToUse] = useState("");
  const [searchItems, setSearchItems] = useState("");
  const [downloadReseller, setDownloadReseller] = useState("");
  const [whatsappMarketing, setWhatsappMarketing] = useState("");
  const [suggestions, setSuggestions] = useState("");

  /* Complaint fields */
  const [complaintType, setComplaintType] = useState("");
  const [complaintMessage, setComplaintMessage] = useState("");

  /* Shared fields */
  const [clientName, setClientName] = useState("");
  const [clientContact, setClientContact] = useState("");

  /* Progress bar */
  useEffect(() => {
    if (!submitted) {
      setProgress(0);
      return;
    }
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setSubmitted(false), 1500);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [submitted]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter((f) => {
      const ext = f.name.split(".").pop()?.toLowerCase();
      return (
        ["jpg", "jpeg", "png", "pdf"].includes(ext || "") &&
        f.size <= 8 * 1024 * 1024
      );
    });
    setAttachments((prev) => [...prev, ...valid].slice(0, 5));
  };

  const removeFile = (idx: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  /* ── Shared styles (sharp edges) ── */
  const labelCls =
    "block text-[13px] mb-1.5" as const;

  const requiredSpanStyle: React.CSSProperties = {
    color: "#5B616A",
    fontStyle: "italic",
    fontWeight: 400,
    marginLeft: "4px",
    fontSize: "12px",
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    height: "46px",
    border: "1px solid #E6E8EB",
    borderRadius: 0,
    padding: "0 14px",
    fontSize: "14px",
    fontFamily: "var(--font-body)",
    color: "#2C2C2C",
    backgroundColor: "#F7F8FA",
    outline: "none",
    transition: "border-color 0.25s, box-shadow 0.25s",
  };

  const selectBase: React.CSSProperties = {
    ...inputBase,
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235B616A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
    paddingRight: "36px",
    cursor: "pointer",
  };

  const textareaBase: React.CSSProperties = {
    width: "100%",
    minHeight: "130px",
    border: "1px solid #E6E8EB",
    borderRadius: 0,
    padding: "12px 14px",
    fontSize: "14px",
    fontFamily: "var(--font-body)",
    color: "#2C2C2C",
    backgroundColor: "#F7F8FA",
    outline: "none",
    resize: "vertical",
    transition: "border-color 0.25s, box-shadow 0.25s",
  };

  const focusHandler = (e: React.FocusEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = "#044c5c";
    (e.currentTarget as HTMLElement).style.boxShadow =
      "0 0 0 3px rgba(4,76,92,0.08)";
  };
  const blurHandler = (e: React.FocusEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = "#E6E8EB";
    (e.currentTarget as HTMLElement).style.boxShadow = "none";
  };

  return (
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh" }}>
      {/* ═══════ HERO BANNER ═══════ */}
      <div className="relative overflow-hidden" style={{ height: "320px" }}>
        {/* Background image */}
        <ImageWithFallback
          src={bannerImg}
          alt="Customer feedback"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(4,76,92,0.92) 0%, rgba(4,76,92,0.7) 50%, rgba(200,149,108,0.5) 100%)",
          }}
        />
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-[0.06]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        {/* Content */}
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
              We Value Your Voice
            </p>
            <h1
              className="text-white text-[36px] md:text-[46px] !leading-[1.1] mb-3"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
            >
              Feedback & Complaint Form
            </h1>
            <p
              className="text-white/80 max-w-[560px] text-[15px] !leading-[1.6]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Your opinion matters to us. Whether it's a compliment, suggestion,
              or concern — our Customer Happiness Team is ready to listen and
              take action.
            </p>
          </motion.div>
          {/* Floating badges */}
          <motion.div
            className="flex flex-wrap gap-3 mt-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {[
              { icon: Shield, text: "100% Confidential" },
              { icon: Heart, text: "24hr Response" },
              { icon: Sparkles, text: "Continuous Improvement" },
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

      {/* ═══════ BREADCRUMB ═══════ */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center gap-2 py-4 text-[12px]"
          style={{ fontFamily: "var(--font-body)", color: "#8A9199" }}
        >
          <a
            href="/"
            className="transition-colors duration-200"
            style={{ color: "#8A9199" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "#044c5c")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "#8A9199")
            }
          >
            Home
          </a>
          <ChevronDown size={12} className="-rotate-90" />
          <span style={{ color: "#044c5c", fontWeight: 500 }}>
            Feedback & Complaints
          </span>
        </div>
      </div>

      {/* ═══════ FORM AREA ═══════ */}
      <div
        className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"
        style={{ paddingBottom: "64px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ── Left sidebar info ── */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                border: "1px solid #E6E8EB",
                borderRadius: 0,
                padding: "28px 24px",
              }}
            >
              <h3
                className="text-[18px] mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  color: "#2C2C2C",
                }}
              >
                How It Works
              </h3>
              {[
                {
                  step: "01",
                  title: "Choose Type",
                  desc: "Select feedback or complaint",
                },
                {
                  step: "02",
                  title: "Fill Details",
                  desc: "Answer a few quick questions",
                },
                {
                  step: "03",
                  title: "Submit",
                  desc: "We respond within 24 hours",
                },
              ].map((s, i) => (
                <motion.div
                  key={s.step}
                  className="flex gap-3 mb-5"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                >
                  <div
                    className="flex-shrink-0 w-[36px] h-[36px] flex items-center justify-center text-[12px]"
                    style={{
                      backgroundColor: "#d41c5c",
                      color: "#fff",
                      fontWeight: 700,
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {s.step}
                  </div>
                  <div>
                    <p
                      className="text-[13px]"
                      style={{
                        fontWeight: 600,
                        color: "#2C2C2C",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {s.title}
                    </p>
                    <p
                      className="text-[12px]"
                      style={{
                        color: "#8A9199",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact card */}
            <div
              className="mt-4"
              style={{
                backgroundColor: "#d41c5c",
                padding: "24px",
                borderRadius: 0,
              }}
            >
              <p
                className="text-[13px] mb-3"
                style={{
                  color: "#fff",
                  fontWeight: 600,
                  fontFamily: "var(--font-body)",
                }}
              >
                Need Immediate Help?
              </p>
              <div className="flex items-center gap-2 mb-2">
                <Phone size={14} style={{ color: "#fff" }} />
                <span
                  className="text-[13px]"
                  style={{
                    color: "#fff",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  +971 4 XXX XXXX
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare size={14} style={{ color: "#fff" }} />
                <span
                  className="text-[13px]"
                  style={{
                    color: "#fff",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  support@tezkargift.com
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Main form ── */}
          <motion.div
            className="lg:col-span-9"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                border: "1px solid #E6E8EB",
                borderRadius: 0,
                padding: "36px 32px",
              }}
            >
              {/* ── Form header + description ── */}
              <div className="mb-8">
                <h2
                  className="text-[24px] mb-2"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    color: "#2C2C2C",
                  }}
                >
                  Share Your Experience
                </h2>
                <p
                  className="text-[14px] !leading-[1.6] max-w-[600px]"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "#5B616A",
                  }}
                >
                  Our customer happiness members are receiving your{" "}
                  <span style={{ color: "#044c5c", fontWeight: 600 }}>
                    feedback
                  </span>{" "}
                  &{" "}
                  <span style={{ color: "#044c5c", fontWeight: 600 }}>
                    complaints
                  </span>
                  . Every submission is reviewed personally and helps us improve
                  your experience.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* ── Toggle tabs ── */}
                <AnimField>
                  <div className="mb-8">
                    <label
                      className={labelCls}
                      style={{
                        color: "#044c5c",
                        fontWeight: 500,
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Please choose :
                      <span style={requiredSpanStyle}>
                        (Required)
                      </span>
                    </label>
                    <div className="flex gap-0 mt-2">
                      {(
                        [
                          {
                            key: "feedback" as FormType,
                            label: "Feedback",
                            icon: MessageSquare,
                          },
                          {
                            key: "complaint" as FormType,
                            label: "Complaint",
                            icon: AlertTriangle,
                          },
                        ] as const
                      ).map((tab) => (
                        <motion.button
                          key={tab.key}
                          type="button"
                          className="flex items-center gap-2 px-6 py-3 text-[13px] relative overflow-hidden"
                          style={{
                            fontFamily: "var(--font-body)",
                            fontWeight: 600,
                            border: "1px solid",
                            borderColor:
                              formType === tab.key ? "#044c5c" : "#E6E8EB",
                            backgroundColor:
                              formType === tab.key ? "#044c5c" : "#F7F8FA",
                            color: formType === tab.key ? "#fff" : "#5B616A",
                            cursor: "pointer",
                            transition:
                              "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                          }}
                          onClick={() => setFormType(tab.key)}
                          whileTap={{ scale: 0.97 }}
                        >
                          <tab.icon size={15} />
                          {tab.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </AnimField>

                {/* ════════════════ FEEDBACK FIELDS ════════════════ */}
                <AnimatePresence mode="wait">
                  {formType === "feedback" ? (
                    <motion.div
                      key="feedback"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {/* Row 1 */}
                      <AnimField delay={0.05}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-5">
                          <div>
                            <label
                              className={labelCls}
                              style={{
                                color: "#044c5c",
                                fontWeight: 500,
                                fontFamily: "var(--font-body)",
                              }}
                            >
                              How did you interact with us?
                              <span style={requiredSpanStyle}>
                                (Required)
                              </span>
                            </label>
                            <select
                              style={selectBase}
                              value={interactionMethod}
                              onChange={(e) =>
                                setInteractionMethod(e.target.value)
                              }
                              onFocus={focusHandler as any}
                              onBlur={blurHandler as any}
                            >
                              <option value="">Select...</option>
                              {interactionOptions.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label
                              className={labelCls}
                              style={{
                                color: "#044c5c",
                                fontWeight: 500,
                                fontFamily: "var(--font-body)",
                              }}
                            >
                              Were you satisfied with our response?
                              <span style={requiredSpanStyle}>
                                (Required)
                              </span>
                            </label>
                            <select
                              style={selectBase}
                              value={satisfiedWithResponse}
                              onChange={(e) =>
                                setSatisfiedWithResponse(e.target.value)
                              }
                              onFocus={focusHandler as any}
                              onBlur={blurHandler as any}
                            >
                              <option value="">Select...</option>
                              {satisfactionOptions.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </AnimField>

                      {/* Row 2 */}
                      <AnimField delay={0.1}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-5">
                          <div>
                            <label
                              className={labelCls}
                              style={{
                                color: "#044c5c",
                                fontWeight: 500,
                                fontFamily: "var(--font-body)",
                              }}
                            >
                              How did you interact with us?
                              <span style={requiredSpanStyle}>
                                (Required)
                              </span>
                            </label>
                            <select
                              style={selectBase}
                              value={interactionMethod2}
                              onChange={(e) =>
                                setInteractionMethod2(e.target.value)
                              }
                              onFocus={focusHandler as any}
                              onBlur={blurHandler as any}
                            >
                              <option value="">Select...</option>
                              {interactionOptions.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label
                              className={labelCls}
                              style={{
                                color: "#044c5c",
                                fontWeight: 500,
                                fontFamily: "var(--font-body)",
                              }}
                            >
                              Name of Staff responded to you?
                              <span style={requiredSpanStyle}>
                                (Required)
                              </span>
                            </label>
                            <input
                              type="text"
                              placeholder="Sales Person's Name"
                              style={inputBase}
                              value={staffName}
                              onChange={(e) => setStaffName(e.target.value)}
                              onFocus={focusHandler as any}
                              onBlur={blurHandler as any}
                            />
                          </div>
                        </div>
                      </AnimField>

                      {/* Row 3 */}
                      <AnimField delay={0.15}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-5">
                          <div>
                            <label
                              className={labelCls}
                              style={{
                                color: "#044c5c",
                                fontWeight: 500,
                                fontFamily: "var(--font-body)",
                              }}
                            >
                              How's our Staff Professionalism?
                              <span style={requiredSpanStyle}>
                                (Required)
                              </span>
                            </label>
                            <select
                              style={selectBase}
                              value={staffProfessionalism}
                              onChange={(e) =>
                                setStaffProfessionalism(e.target.value)
                              }
                              onFocus={focusHandler as any}
                              onBlur={blurHandler as any}
                            >
                              <option value="">Select...</option>
                              {professionalismOptions.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label
                              className={labelCls}
                              style={{
                                color: "#044c5c",
                                fontWeight: 500,
                                fontFamily: "var(--font-body)",
                              }}
                            >
                              What can you say about our Product Quality?
                              <span style={requiredSpanStyle}>
                                (Required)
                              </span>
                            </label>
                            <select
                              style={selectBase}
                              value={productQuality}
                              onChange={(e) =>
                                setProductQuality(e.target.value)
                              }
                              onFocus={focusHandler as any}
                              onBlur={blurHandler as any}
                            >
                              <option value="">Select...</option>
                              {productQualityOptions.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </AnimField>

                      {/* Row 4 */}
                      <AnimField delay={0.2}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-5">
                          <div>
                            <label
                              className={labelCls}
                              style={{
                                color: "#044c5c",
                                fontWeight: 500,
                                fontFamily: "var(--font-body)",
                              }}
                            >
                              How's our Market Price?
                              <span style={requiredSpanStyle}>
                                (Required)
                              </span>
                            </label>
                            <select
                              style={selectBase}
                              value={marketPrice}
                              onChange={(e) => setMarketPrice(e.target.value)}
                              onFocus={focusHandler as any}
                              onBlur={blurHandler as any}
                            >
                              <option value="">Select...</option>
                              {marketPriceOptions.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label
                              className={labelCls}
                              style={{
                                color: "#044c5c",
                                fontWeight: 500,
                                fontFamily: "var(--font-body)",
                              }}
                            >
                              mtc.ae Website is Easy to use (User Friendly)?
                              <span style={requiredSpanStyle}>
                                (Required)
                              </span>
                            </label>
                            <select
                              style={selectBase}
                              value={websiteEasyToUse}
                              onChange={(e) =>
                                setWebsiteEasyToUse(e.target.value)
                              }
                              onFocus={focusHandler as any}
                              onBlur={blurHandler as any}
                            >
                              <option value="">Select...</option>
                              {websiteEasyOptions.map((o) => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </AnimField>

                      {/* Row 5 */}
                      <AnimField delay={0.25}>
                        <div className="mb-5">
                          <label
                            className={labelCls}
                            style={{
                              color: "#044c5c",
                              fontWeight: 500,
                              fontFamily: "var(--font-body)",
                            }}
                          >
                            Search Items On mtc.ae Website is:
                            <span style={requiredSpanStyle}>
                              (Required)
                            </span>
                          </label>
                          <select
                            style={selectBase}
                            value={searchItems}
                            onChange={(e) => setSearchItems(e.target.value)}
                            onFocus={focusHandler as any}
                            onBlur={blurHandler as any}
                          >
                            <option value="">Select...</option>
                            {searchItemsOptions.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                        </div>
                      </AnimField>

                      {/* Row 6 */}
                      <AnimField delay={0.3}>
                        <div className="mb-5">
                          <label
                            className={labelCls}
                            style={{
                              color: "#044c5c",
                              fontWeight: 500,
                              fontFamily: "var(--font-body)",
                            }}
                          >
                            Did you know you can Download Reseller Free
                            Promotion Flyers, Video & New Arrivals Flyers
                            without MTC Logo?
                          </label>
                          <select
                            style={selectBase}
                            value={downloadReseller}
                            onChange={(e) =>
                              setDownloadReseller(e.target.value)
                            }
                            onFocus={focusHandler as any}
                            onBlur={blurHandler as any}
                          >
                            <option value="">Select...</option>
                            {downloadResellerOptions.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                        </div>
                      </AnimField>

                      {/* Row 7 */}
                      <AnimField delay={0.35}>
                        <div className="mb-5">
                          <label
                            className={labelCls}
                            style={{
                              color: "#044c5c",
                              fontWeight: 500,
                              fontFamily: "var(--font-body)",
                            }}
                          >
                            I'm Receiving WhatsApp Marketing:
                          </label>
                          <select
                            style={selectBase}
                            value={whatsappMarketing}
                            onChange={(e) =>
                              setWhatsappMarketing(e.target.value)
                            }
                            onFocus={focusHandler as any}
                            onBlur={blurHandler as any}
                          >
                            <option value="">Select...</option>
                            {whatsappMarketingOptions.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                        </div>
                      </AnimField>

                      {/* Suggestions */}
                      <AnimField delay={0.4}>
                        <div className="mb-6">
                          <label
                            className={labelCls}
                            style={{
                              color: "#044c5c",
                              fontWeight: 500,
                              fontFamily: "var(--font-body)",
                            }}
                          >
                            Suggestions or Comments:
                          </label>
                          <textarea
                            style={textareaBase}
                            value={suggestions}
                            onChange={(e) => setSuggestions(e.target.value)}
                            onFocus={focusHandler as any}
                            onBlur={blurHandler as any}
                            placeholder="Share your thoughts with us..."
                          />
                        </div>
                      </AnimField>
                    </motion.div>
                  ) : (
                    /* ════════════════ COMPLAINT FIELDS ════════════════ */
                    <motion.div
                      key="complaint"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {/* Complaint Type */}
                      <AnimField delay={0.05}>
                        <div className="mb-5">
                          <label
                            className={labelCls}
                            style={{
                              color: "#044c5c",
                              fontWeight: 500,
                              fontFamily: "var(--font-body)",
                            }}
                          >
                            Complaint Type :
                            <span style={requiredSpanStyle}>
                              (Required)
                            </span>
                          </label>
                          <select
                            style={selectBase}
                            value={complaintType}
                            onChange={(e) => setComplaintType(e.target.value)}
                            onFocus={focusHandler as any}
                            onBlur={blurHandler as any}
                          >
                            <option value="">Select complaint type...</option>
                            {complaintTypeOptions.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                        </div>
                      </AnimField>

                      {/* Complaint Explanation */}
                      <AnimField delay={0.1}>
                        <div className="mb-5">
                          <label
                            className={labelCls}
                            style={{
                              color: "#044c5c",
                              fontWeight: 500,
                              fontFamily: "var(--font-body)",
                            }}
                          >
                            Complaint Explanation / Message :
                            <span style={requiredSpanStyle}>
                              (Required)
                            </span>
                          </label>
                          <textarea
                            style={textareaBase}
                            value={complaintMessage}
                            onChange={(e) =>
                              setComplaintMessage(e.target.value)
                            }
                            onFocus={focusHandler as any}
                            onBlur={blurHandler as any}
                            placeholder="Please describe your complaint in detail..."
                          />
                        </div>
                      </AnimField>

                      {/* Attachments */}
                      <AnimField delay={0.15}>
                        <div className="mb-6">
                          <label
                            className={labelCls}
                            style={{
                              color: "#044c5c",
                              fontWeight: 500,
                              fontFamily: "var(--font-body)",
                            }}
                          >
                            Attachments :
                          </label>
                          <div
                            className="relative cursor-pointer transition-all duration-300"
                            style={{
                              border: `2px dashed ${dragOver ? "#044c5c" : "#D1D5DB"}`,
                              backgroundColor: dragOver
                                ? "rgba(4,76,92,0.04)"
                                : "#F7F8FA",
                              padding: "32px 20px",
                              textAlign: "center",
                            }}
                            onDragOver={(e) => {
                              e.preventDefault();
                              setDragOver(true);
                            }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={(e) => {
                              e.preventDefault();
                              setDragOver(false);
                              handleFiles(e.dataTransfer.files);
                            }}
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <input
                              ref={fileInputRef}
                              type="file"
                              className="hidden"
                              multiple
                              accept=".jpg,.jpeg,.png,.pdf"
                              onChange={(e) => handleFiles(e.target.files)}
                            />
                            <motion.div
                              animate={{
                                y: dragOver ? -4 : 0,
                                scale: dragOver ? 1.05 : 1,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <Upload
                                size={28}
                                className="mx-auto mb-2"
                                style={{
                                  color: dragOver ? "#044c5c" : "#8A9199",
                                }}
                              />
                              <p
                                className="text-[14px] mb-2"
                                style={{
                                  color: "#044c5c",
                                  fontWeight: 500,
                                  fontFamily: "var(--font-body)",
                                }}
                              >
                                Drop files here or
                              </p>
                              <span
                                className="inline-block px-5 py-2 text-[13px]"
                                style={{
                                  border: "1px solid #044c5c",
                                  color: "#044c5c",
                                  fontWeight: 600,
                                  fontFamily: "var(--font-body)",
                                  transition: "all 0.2s",
                                }}
                              >
                                Select files
                              </span>
                            </motion.div>
                          </div>
                          <p
                            className="text-[12px] mt-2"
                            style={{
                              color: "#8A9199",
                              fontFamily: "var(--font-body)",
                            }}
                          >
                            Accepted file types: jpg, png, pdf, jpeg. Max. file
                            size: 8 MB, Max. files: 5.
                          </p>

                          {/* File list */}
                          <AnimatePresence>
                            {attachments.map((file, idx) => (
                              <motion.div
                                key={file.name + idx}
                                className="flex items-center justify-between mt-2 px-3 py-2"
                                style={{
                                  backgroundColor: "#F7F8FA",
                                  border: "1px solid #E6E8EB",
                                }}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                              >
                                <div className="flex items-center gap-2">
                                  <FileText
                                    size={14}
                                    style={{ color: "#044c5c" }}
                                  />
                                  <span
                                    className="text-[13px] truncate max-w-[250px]"
                                    style={{
                                      color: "#2C2C2C",
                                      fontFamily: "var(--font-body)",
                                    }}
                                  >
                                    {file.name}
                                  </span>
                                  <span
                                    className="text-[11px]"
                                    style={{
                                      color: "#8A9199",
                                      fontFamily: "var(--font-body)",
                                    }}
                                  >
                                    ({(file.size / 1024).toFixed(0)} KB)
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(idx);
                                  }}
                                  className="p-1 transition-colors duration-200"
                                  style={{ color: "#8A9199" }}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.color = "#D92D20")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.color = "#8A9199")
                                  }
                                >
                                  <X size={14} />
                                </button>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </AnimField>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ══ Divider ══ */}
                <div
                  className="my-6"
                  style={{
                    height: "1px",
                    backgroundColor: "#E6E8EB",
                  }}
                />

                {/* ── Client Name + Contact (shared) ── */}
                <AnimField delay={0.1}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-8">
                    <div>
                      <label
                        className={labelCls}
                        style={{
                          color: "#044c5c",
                          fontWeight: 500,
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        <User
                          size={13}
                          className="inline mr-1.5"
                          style={{ verticalAlign: "-1px" }}
                        />
                        Clients Name :
                        <span style={requiredSpanStyle}>
                          (Required)
                        </span>
                      </label>
                      <input
                        type="text"
                        style={inputBase}
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        onFocus={focusHandler as any}
                        onBlur={blurHandler as any}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label
                        className={labelCls}
                        style={{
                          color: "#044c5c",
                          fontWeight: 500,
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        <Phone
                          size={13}
                          className="inline mr-1.5"
                          style={{ verticalAlign: "-1px" }}
                        />
                        Client's Contact Number
                        <span style={requiredSpanStyle}>
                          (Required)
                        </span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+971 50 XXX XXXX"
                        style={inputBase}
                        value={clientContact}
                        onChange={(e) => setClientContact(e.target.value)}
                        onFocus={focusHandler as any}
                        onBlur={blurHandler as any}
                      />
                    </div>
                  </div>
                </AnimField>

                {/* ── Submit ── */}
                <AnimField delay={0.15}>
                  <motion.button
                    type="submit"
                    className="group relative w-full overflow-hidden"
                    style={{
                      height: "52px",
                      backgroundColor: "#044c5c",
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: 600,
                      fontFamily: "var(--font-body)",
                      border: "none",
                      borderRadius: 0,
                      cursor: "pointer",
                      letterSpacing: "0.5px",
                    }}
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                  >
                    {/* Gold hover fill */}
                    <span
                      className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{ backgroundColor: "#C8956C" }}
                      aria-hidden="true"
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {submitted ? (
                        <>
                          <CheckCircle2 size={18} />
                          Submitted!
                        </>
                      ) : (
                        "Submit"
                      )}
                    </span>
                  </motion.button>
                </AnimField>

                {/* Progress bar on submit */}
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
                          <CheckCircle2
                            size={16}
                            style={{ color: "#044c5c" }}
                          />
                          <span
                            className="text-[14px]"
                            style={{
                              color: "#044c5c",
                              fontWeight: 600,
                              fontFamily: "var(--font-body)",
                            }}
                          >
                            Thank you! Your {formType} has been submitted
                            successfully.
                          </span>
                        </div>
                        <p
                          className="text-[13px] mb-3"
                          style={{
                            color: "#5B616A",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          Our Customer Happiness Team will review and respond
                          within 24 hours.
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
    </div>
  );
}
