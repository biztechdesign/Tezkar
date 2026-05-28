import { Pencil, Star, Trash2 } from "./icons";
import { Link } from "react-router";
import { useState } from "react";
import { AccountSidebar } from "./account-sidebar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Review {
  id: string;
  product: string;
  image: string;
  rating: number;
  title: string;
  body: string;
  date: string;
}

const initialReviews: Review[] = [
  {
    id: "rev-1",
    product: "Premium Leather Notebook Set",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=200&h=200&fit=crop",
    rating: 5,
    title: "Exceptional quality and finish",
    body: "The leather feels premium and the embossing came out beautifully. Will definitely order again for our next corporate gifting cycle.",
    date: "2026-04-22",
  },
  {
    id: "rev-2",
    product: "Insulated Stainless Steel Bottle",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop",
    rating: 4,
    title: "Keeps drinks cold all day",
    body: "Great product overall. The branding turned out crisp. Only minor issue was the cap thread feels a bit loose.",
    date: "2026-04-10",
  },
  {
    id: "rev-3",
    product: "Custom Embroidered Polo Shirt",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200&h=200&fit=crop",
    rating: 5,
    title: "Embroidery looks fantastic",
    body: "We ordered 200 units for our team event and everyone loved them. Fabric quality is comfortable for full-day wear.",
    date: "2026-03-18",
  },
];

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className="w-4 h-4"
          style={{
            color: n <= value ? "#C8956C" : "#E6E8EB",
            fill: n <= value ? "#C8956C" : "transparent",
          }}
        />
      ))}
    </div>
  );
}

export function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const remove = (id: string) => setReviews((r) => r.filter((x) => x.id !== id));

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <div className="mx-auto pt-8 pb-[64px] px-6" style={{ maxWidth: "1400px" }}>
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link to="/" className="text-[#044c5c] hover:text-[#d41c5c] transition-colors">
                Home
              </Link>
            </li>
            <li className="text-[#2C2C2C]">/</li>
            <li className="text-[#2C2C2C]">My Product Reviews</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <AccountSidebar />

          <main className="flex-1 min-w-0">
            <div className="mb-8">
              <h1
                className="text-2xl md:text-4xl mb-2 md:mb-3"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
              >
                My Product Reviews
              </h1>
              <p className="text-[#2C2C2C] opacity-70">
                {reviews.length} {reviews.length === 1 ? "review" : "reviews"} posted
              </p>
            </div>

            <div className="space-y-4">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="bg-white border border-[#E8DDD3] p-5"
                  style={{ borderRadius: 0 }}
                >
                  <div className="flex gap-4 flex-wrap">
                    <div
                      className="w-20 h-20 overflow-hidden shrink-0 bg-[#FAFAF8]"
                      style={{ borderRadius: 0 }}
                    >
                      <ImageWithFallback
                        src={r.image}
                        alt={r.product}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                        <div>
                          <h3
                            className="text-base text-[#2C2C2C]"
                            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                          >
                            {r.product}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Stars value={r.rating} />
                            <span className="text-xs text-[#5B616A]">{r.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            className="p-1.5 text-[#5B616A] hover:text-[#044c5c] hover:bg-[#F2F8F9] transition-colors"
                            aria-label="Edit review"
                            style={{ borderRadius: 0 }}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => remove(r.id)}
                            className="p-1.5 text-[#5B616A] hover:text-[#d41c5c] hover:bg-[#fdf0f5] transition-colors"
                            aria-label="Delete review"
                            style={{ borderRadius: 0 }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-[#2C2C2C] mb-1">{r.title}</p>
                      <p className="text-sm text-[#5B616A] leading-relaxed">{r.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
