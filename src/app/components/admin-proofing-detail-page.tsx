import { useParams } from "react-router";
import { useMemo, useState } from "react";
import { Clock, Palette, Printer, Search, Send } from "./icons";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type Decision = "" | "Approve" | "Reject";

interface ProofVariant {
  id: string;
  image: string;
  printMethod: string; // e.g. "DTF Printing (Front, full color)"
}

interface ProofProduct {
  id: string;
  name: string;
  thumb: string;
  qtyBreakdown: string; // "White, XL: 20 Qty | Red, M: 20 Qty ..."
  variants: ProofVariant[];
}

interface ProofDetail {
  id: string; // S000121
  remainingRevisions: number;
  totalRevisions: number;
  products: ProofProduct[];
}

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

// Distinct apparel images so no two proof variants look the same
const IMAGES = {
  navyTee: IMG("photo-1521572163474-6864f9cf17ab"),
  whiteTee: IMG("photo-1576566588028-4147f3842f27"),
  blackTee: IMG("photo-1583743814966-8936f5b7be1a"),
  greyHoodie: IMG("photo-1556821840-3a63f95609a7"),
  redTee: IMG("photo-1503341504253-dff4815485f1"),
  greenPolo: IMG("photo-1586790170083-2f9ceadc732d"),
  capWhite: IMG("photo-1588850561407-ed78c282e89b"),
  toteBag: IMG("photo-1572635196237-14b3f281503f"),
};

const FALLBACK_PROOF: ProofDetail = {
  id: "S000121",
  remainingRevisions: 1,
  totalRevisions: 3,
  products: [
    {
      id: "p1",
      name: "Plain Printable T-shirt",
      thumb: IMAGES.navyTee,
      qtyBreakdown: "White, XL: 20 Qty | Red, M: 20 Qty | Pink, S: 20 Qty | Blue, XL: 20 Qty",
      variants: [
        { id: "p1-1", image: IMAGES.whiteTee, printMethod: "DTF Printing (Front, full color)" },
        { id: "p1-2", image: IMAGES.navyTee, printMethod: "Screen Print (Back, 2 colors)" },
        { id: "p1-3", image: IMAGES.redTee, printMethod: "Embroidery (Left chest)" },
        { id: "p1-4", image: IMAGES.blackTee, printMethod: "Vinyl Heat Transfer (Right sleeve)" },
      ],
    },
    {
      id: "p2",
      name: "Premium Hoodie & Accessories",
      thumb: IMAGES.greyHoodie,
      qtyBreakdown: "Grey Hoodie, L: 15 Qty | Polo, M: 12 Qty | Cap: 25 Qty | Tote: 30 Qty",
      variants: [
        { id: "p2-1", image: IMAGES.greyHoodie, printMethod: "DTG Printing (Front, full color)" },
        { id: "p2-2", image: IMAGES.greenPolo, printMethod: "Embroidery (Left chest logo)" },
        { id: "p2-3", image: IMAGES.capWhite, printMethod: "3D Puff Embroidery (Front)" },
        { id: "p2-4", image: IMAGES.toteBag, printMethod: "Screen Print (Center, 1 color)" },
      ],
    },
  ],
};

const decisionOptions: { value: Decision; label: string }[] = [
  { value: "", label: "Approve / Reject" },
  { value: "Approve", label: "Approve" },
  { value: "Reject", label: "Reject" },
];

function DecisionSelect({
  value,
  onChange,
  variant = "light",
}: {
  value: Decision;
  onChange: (v: Decision) => void;
  variant?: "light" | "onDark";
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Decision)}
      className={`px-3 py-2 text-sm focus:outline-none appearance-none cursor-pointer bg-white border ${
        variant === "onDark" ? "border-transparent" : "border-[#D9DEE3]"
      } text-[#2C2C2C]`}
      style={{
        borderRadius: 6,
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235B616A' stroke-width='2'><path d='M6 9l6 6 6-6'/></svg>\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 8px center",
        paddingRight: 28,
        minWidth: 150,
      }}
    >
      {decisionOptions.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function AdminProofingDetailPage() {
  const { id } = useParams();
  const proof: ProofDetail = useMemo(
    () => ({ ...FALLBACK_PROOF, id: id ?? FALLBACK_PROOF.id }),
    [id]
  );

  const allVariantIds = useMemo(
    () => proof.products.flatMap((p) => p.variants.map((v) => v.id)),
    [proof]
  );

  const [selectedVariants, setSelectedVariants] = useState<Set<string>>(new Set());
  const [variantDecisions, setVariantDecisions] = useState<Record<string, Decision>>({});
  const [productDecisions, setProductDecisions] = useState<Record<string, Decision>>({});
  const [bulkDecision, setBulkDecision] = useState<Decision>("");

  const allSelected = allVariantIds.length > 0 && selectedVariants.size === allVariantIds.length;

  const toggleSelectAll = () => {
    setSelectedVariants(allSelected ? new Set() : new Set(allVariantIds));
  };
  const toggleVariant = (vid: string) => {
    setSelectedVariants((prev) => {
      const next = new Set(prev);
      next.has(vid) ? next.delete(vid) : next.add(vid);
      return next;
    });
  };
  const toggleProduct = (product: ProofProduct) => {
    const ids = product.variants.map((v) => v.id);
    const allOn = ids.every((vid) => selectedVariants.has(vid));
    setSelectedVariants((prev) => {
      const next = new Set(prev);
      ids.forEach((vid) => (allOn ? next.delete(vid) : next.add(vid)));
      return next;
    });
  };

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <div
        className="mx-auto px-4 md:px-6 py-6 md:py-10"
        style={{ maxWidth: "1280px", fontFamily: "Inter, sans-serif" }}
      >
        <div className="bg-white border border-[#E8DDD3] overflow-hidden shadow-sm" style={{ borderRadius: 12 }}>
              {/* Orange header */}
              <div
                className="flex items-center justify-between gap-4 px-6 py-5 flex-wrap"
                style={{ background: "linear-gradient(90deg, #044c5c 0%, #066274 100%)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Palette className="w-6 h-6 text-white" strokeWidth={1.8} />
                  </div>
                  <h1
                    className="text-white text-lg md:text-2xl"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
                  >
                    ARTWORK APPROVAL for Order #{proof.id}
                  </h1>
                </div>
                <div className="inline-flex items-center gap-2 bg-white px-4 py-2" style={{ borderRadius: 9999 }}>
                  <Clock className="w-4 h-4 text-[#2C2C2C]" strokeWidth={1.8} />
                  <span className="text-sm text-[#2C2C2C]" style={{ fontWeight: 600 }}>
                    Remaining Revisions: {proof.remainingRevisions} / {proof.totalRevisions}
                  </span>
                </div>
              </div>

              <div className="p-5 md:p-6">
                {/* Select-all toolbar */}
                <div
                  className="flex items-center justify-between gap-4 px-5 py-3 bg-[#F1F3F5] flex-wrap"
                  style={{ borderRadius: 8 }}
                >
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 accent-[#044c5c]"
                    />
                    <span className="text-sm text-[#2C2C2C]" style={{ fontWeight: 600 }}>
                      Select All Products
                    </span>
                  </label>

                  <div className="flex items-center gap-3 flex-wrap">
                    <DecisionSelect value={bulkDecision} onChange={setBulkDecision} />
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-5 py-2 text-sm text-white"
                      style={{
                        background: "linear-gradient(90deg, #044c5c 0%, #066274 100%)",
                        borderRadius: 6,
                        fontWeight: 600,
                      }}
                    >
                      <Send className="w-4 h-4" strokeWidth={2} />
                      SUBMIT
                    </button>
                  </div>
                </div>

                {/* Products */}
                <div className="mt-5 space-y-5">
                  {proof.products.map((product) => {
                    const ids = product.variants.map((v) => v.id);
                    const productAllSelected = ids.every((vid) => selectedVariants.has(vid));
                    return (
                      <div key={product.id} className="border border-[#E6E8EB]" style={{ borderRadius: 10 }}>
                        {/* Dark product header */}
                        <div
                          className="flex items-center justify-between gap-4 px-4 py-3 flex-wrap"
                          style={{ background: "#1F2A44", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <input
                              type="checkbox"
                              checked={productAllSelected}
                              onChange={() => toggleProduct(product)}
                              className="w-4 h-4 accent-[#044c5c] flex-shrink-0"
                            />
                            <div className="w-9 h-9 bg-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden" style={{ borderRadius: 6 }}>
                              <ImageWithFallback
                                src={product.thumb}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="text-white text-sm md:text-base truncate" style={{ fontWeight: 600 }}>
                                {product.name}
                              </div>
                              <span
                                className="inline-block mt-1 px-2 py-0.5 text-[11px] text-[#2C2C2C] truncate max-w-full"
                                style={{ background: "#E6E8EB", borderRadius: 4 }}
                              >
                                {product.qtyBreakdown}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap">
                            <DecisionSelect
                              variant="onDark"
                              value={productDecisions[product.id] ?? ""}
                              onChange={(v) =>
                                setProductDecisions((prev) => ({ ...prev, [product.id]: v }))
                              }
                            />
                            <input
                              type="text"
                              placeholder="Add Comments..."
                              className="px-3 py-2 text-sm bg-white text-[#2C2C2C] focus:outline-none border border-transparent w-[200px] max-w-full"
                              style={{ borderRadius: 6 }}
                            />
                          </div>
                        </div>

                        {/* Variant grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                          {product.variants.map((v) => {
                            const isSelected = selectedVariants.has(v.id);
                            return (
                              <div
                                key={v.id}
                                className="border bg-white transition-colors"
                                style={{
                                  borderRadius: 10,
                                  borderColor: isSelected ? "#044c5c" : "#E6E8EB",
                                  borderWidth: isSelected ? 2 : 1,
                                }}
                              >
                                {/* Image */}
                                <div className="relative bg-[#F7F8FA]" style={{ borderTopLeftRadius: 9, borderTopRightRadius: 9 }}>
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => toggleVariant(v.id)}
                                    className="absolute top-3 left-3 w-4 h-4 accent-[#044c5c] z-10"
                                  />
                                  <button
                                    type="button"
                                    title="Zoom"
                                    className="absolute top-3 right-3 w-7 h-7 bg-white shadow-sm flex items-center justify-center text-[#5B616A] hover:text-[#044c5c] z-10"
                                    style={{ borderRadius: 9999 }}
                                  >
                                    <Search className="w-3.5 h-3.5" strokeWidth={2} />
                                  </button>
                                  <div className="h-[230px] flex items-center justify-center p-4">
                                    <ImageWithFallback
                                      src={v.image}
                                      alt={product.name}
                                      className="max-h-full max-w-full object-contain"
                                    />
                                  </div>
                                </div>

                                {/* Footer */}
                                <div className="p-3 border-t border-[#EEF0F2]">
                                  <div className="flex items-center gap-2 text-sm text-[#2C2C2C] mb-2" style={{ fontWeight: 600 }}>
                                    <Printer className="w-4 h-4 text-[#5B616A]" strokeWidth={1.8} />
                                    {v.printMethod}
                                  </div>
                                  <DecisionSelect
                                    value={variantDecisions[v.id] ?? ""}
                                    onChange={(d) =>
                                      setVariantDecisions((prev) => ({ ...prev, [v.id]: d }))
                                    }
                                  />
                                  <textarea
                                    placeholder="Add your Comments..."
                                    rows={2}
                                    className="mt-2 w-full px-3 py-2 text-sm border border-[#D9DEE3] text-[#2C2C2C] focus:outline-none focus:border-[#044c5c] resize-y"
                                    style={{ borderRadius: 6 }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Submit all */}
                <div className="flex justify-center mt-8">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-8 py-3 text-white"
                    style={{
                      background: "linear-gradient(90deg, #044c5c 0%, #066274 100%)",
                      borderRadius: 9999,
                      fontWeight: 600,
                    }}
                  >
                    <Send className="w-4 h-4" strokeWidth={2} />
                    Submit All Approvals
                  </button>
                </div>
              </div>
        </div>
      </div>
    </div>
  );
}
