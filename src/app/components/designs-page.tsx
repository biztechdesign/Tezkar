import { Calendar, Copy, Palette, Pencil, Plus, ShoppingCart, Trash2 } from "./icons";
import { Link } from "react-router";
import { useState } from "react";
import { AccountSidebar } from "./account-sidebar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Design {
  id: string;
  name: string;
  thumbnail: string;
  product: string;
  updated: string;
  size: string;
}

const initialDesigns: Design[] = [
  {
    id: "des-1",
    name: "Company Anniversary T-Shirt",
    thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    product: "Custom T-Shirt",
    updated: "2026-05-09",
    size: "Large",
  },
  {
    id: "des-2",
    name: "Holiday Gift Bottle Branding",
    thumbnail: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    product: "Custom Bottle",
    updated: "2026-05-04",
    size: "750 ml",
  },
  {
    id: "des-3",
    name: "Conference Polo Design",
    thumbnail: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
    product: "Custom Polo",
    updated: "2026-04-28",
    size: "Medium",
  },
  {
    id: "des-4",
    name: "Team Notebook Cover",
    thumbnail: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=400&fit=crop",
    product: "Custom Notebook",
    updated: "2026-04-15",
    size: "A5",
  },
  {
    id: "des-5",
    name: "Branded Tote Bag",
    thumbnail: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&h=400&fit=crop",
    product: "Custom Tote",
    updated: "2026-04-02",
    size: "Standard",
  },
];

export function DesignsPage() {
  const [designs, setDesigns] = useState<Design[]>(initialDesigns);
  const remove = (id: string) => setDesigns((d) => d.filter((x) => x.id !== id));
  const duplicate = (id: string) =>
    setDesigns((d) => {
      const src = d.find((x) => x.id === id);
      if (!src) return d;
      return [
        { ...src, id: `${src.id}-copy-${Date.now()}`, name: `${src.name} (Copy)`, updated: new Date().toISOString().slice(0, 10) },
        ...d,
      ];
    });

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <div className="mx-auto pt-6 pb-12 px-6" style={{ maxWidth: "1400px" }}>
        <nav className="mb-4">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link to="/" className="text-[#044c5c] hover:text-[#d41c5c] transition-colors">
                Home
              </Link>
            </li>
            <li className="text-[#2C2C2C]">/</li>
            <li className="text-[#2C2C2C]">My Designs</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <AccountSidebar />

          <main className="flex-1 min-w-0">
            <div className="mb-5 flex items-start justify-between flex-wrap gap-3">
              <div>
                <h1
                  className="text-xl md:text-2xl mb-1"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                >
                  My Designs
                </h1>
                <p className="text-sm text-[#5B616A]">
                  {designs.length} saved {designs.length === 1 ? "design" : "designs"} · Edit or reorder anytime
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#044c5c] text-white text-sm font-semibold hover:bg-[#033d4a] transition-colors"
                style={{ borderRadius: 0 }}
              >
                <Plus className="w-4 h-4" />
                Start New Design
              </button>
            </div>

            {designs.length === 0 ? (
              <div
                className="bg-white border border-[#E8DDD3] p-16 text-center"
                style={{ borderRadius: 0 }}
              >
                <Palette className="w-12 h-12 text-[#5B616A] mx-auto mb-3" />
                <p className="text-[#2C2C2C]">You haven't saved any designs yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {designs.map((d) => (
                  <div
                    key={d.id}
                    className="bg-white border border-[#E8DDD3] group transition-all hover:border-[#044c5c]"
                    style={{ borderRadius: 0 }}
                  >
                    <div className="aspect-square overflow-hidden bg-[#FAFAF8]">
                      <ImageWithFallback
                        src={d.thumbnail}
                        alt={d.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3
                        className="text-sm text-[#2C2C2C] mb-1 line-clamp-1"
                        style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                      >
                        {d.name}
                      </h3>
                      <div className="text-xs text-[#5B616A] mb-3 space-y-0.5">
                        <p>{d.product} · {d.size}</p>
                        <p className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Updated {d.updated}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <button
                          type="button"
                          className="px-2 py-2 border border-[#E6E8EB] text-[#044c5c] text-xs font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-[#F2F8F9] transition-colors"
                          style={{ borderRadius: 0 }}
                        >
                          <Pencil className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => duplicate(d.id)}
                          className="px-2 py-2 border border-[#E6E8EB] text-[#5B616A] text-xs font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-[#FAFAF8] transition-colors"
                          style={{ borderRadius: 0 }}
                        >
                          <Copy className="w-3.5 h-3.5" /> Duplicate
                        </button>
                      </div>
                      <div className="grid grid-cols-[1fr_auto] gap-2">
                        <button
                          type="button"
                          className="px-2 py-2 bg-[#044c5c] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-[#033d4a] transition-colors"
                          style={{ borderRadius: 0 }}
                        >
                          <ShoppingCart className="w-3.5 h-3.5" /> Order Now
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(d.id)}
                          className="p-2 border border-[#E6E8EB] text-[#5B616A] hover:text-[#d41c5c] hover:border-[#d41c5c] transition-colors"
                          style={{ borderRadius: 0 }}
                          aria-label="Delete design"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
