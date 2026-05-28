import { Palette, Pencil } from "./icons";
import { Link } from "react-router";
import { useState } from "react";
import { AccountSidebar } from "./account-sidebar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface OrderedDesign {
  id: string;
  thumbnail: string;
}

const initialOrders: OrderedDesign[] = [
  {
    id: "DO-2026-0145",
    thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop",
  },
  {
    id: "DO-2026-0138",
    thumbnail: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=800&fit=crop",
  },
  {
    id: "DO-2026-0121",
    thumbnail: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop",
  },
  {
    id: "DO-2026-0102",
    thumbnail: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&h=800&fit=crop",
  },
];

export function DesignOrdersPage() {
  const [orders] = useState<OrderedDesign[]>(initialOrders);

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
            <li className="text-[#2C2C2C]">My Ordered Design</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <AccountSidebar />

          <main className="flex-1 min-w-0">
            <div className="mb-5">
              <h1
                className="text-xl md:text-2xl mb-1"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                My Ordered Design
              </h1>
              <p className="text-sm text-[#5B616A]">
                {orders.length} ordered {orders.length === 1 ? "design" : "designs"}
              </p>
            </div>

            <section className="bg-white border border-[#E8DDD3] p-5" style={{ borderRadius: 0 }}>
              {orders.length === 0 ? (
                <div className="p-16 text-center">
                  <Palette className="w-12 h-12 text-[#5B616A] mx-auto mb-3" />
                  <p className="text-[#2C2C2C]">You haven't ordered any designs yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {orders.map((d) => (
                    <div
                      key={d.id}
                      className="relative group border border-[#E8DDD3] hover:border-[#044c5c] transition-colors"
                      style={{ borderRadius: 0 }}
                    >
                      <div className="aspect-[3/4] overflow-hidden bg-[#FAFAF8]">
                        <ImageWithFallback
                          src={d.thumbnail}
                          alt={d.id}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          title="Edit ordered design"
                          className="w-9 h-9 bg-white border border-[#E8DDD3] text-[#044c5c] flex items-center justify-center shadow-sm hover:text-[#d41c5c] hover:border-[#d41c5c] transition-colors"
                          style={{ borderRadius: 9999 }}
                        >
                          <Pencil className="w-4 h-4" strokeWidth={1.8} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
