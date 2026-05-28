import { Heart, ShoppingCart, Trash2 } from "./icons";
import { Link } from "react-router";
import { useState } from "react";
import { AccountSidebar } from "./account-sidebar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  category: string;
  inStock: boolean;
}

const initialItems: WishlistItem[] = [
  {
    id: "wl-1",
    name: "Premium Leather Notebook Set",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=400&fit=crop",
    price: 45.0,
    oldPrice: 60.0,
    category: "Stationery",
    inStock: true,
  },
  {
    id: "wl-2",
    name: "Insulated Stainless Steel Bottle",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    price: 28.5,
    category: "Drinkware",
    inStock: true,
  },
  {
    id: "wl-3",
    name: "Wireless Bluetooth Speaker",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    price: 89.99,
    oldPrice: 109.99,
    category: "Technology",
    inStock: true,
  },
  {
    id: "wl-4",
    name: "Custom Embroidered Polo Shirt",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
    price: 32.0,
    category: "Apparel",
    inStock: false,
  },
  {
    id: "wl-5",
    name: "Engraved Wooden Pen Set",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc36b92?w=400&h=400&fit=crop",
    price: 65.0,
    category: "Stationery",
    inStock: true,
  },
  {
    id: "wl-6",
    name: "Premium Gift Hamper",
    image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&h=400&fit=crop",
    price: 150.0,
    oldPrice: 180.0,
    category: "Gift Sets",
    inStock: true,
  },
];

export function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>(initialItems);
  const remove = (id: string) => setItems((it) => it.filter((x) => x.id !== id));

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
            <li className="text-[#2C2C2C]">My Wishlist</li>
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
                My Wishlist
              </h1>
              <p className="text-[#2C2C2C] opacity-70">
                {items.length} {items.length === 1 ? "item" : "items"} saved for later
              </p>
            </div>

            {items.length === 0 ? (
              <div
                className="bg-white border border-[#E8DDD3] p-16 text-center"
                style={{ borderRadius: 0 }}
              >
                <Heart className="w-12 h-12 text-[#5B616A] mx-auto mb-3" />
                <p className="text-[#2C2C2C] mb-4">Your wishlist is empty</p>
                <Link
                  to="/"
                  className="text-sm text-[#044c5c] hover:text-[#d41c5c] underline transition-colors"
                >
                  Browse products
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((i) => (
                  <div
                    key={i.id}
                    className="bg-white border border-[#E8DDD3] group transition-all hover:border-[#044c5c]"
                    style={{ borderRadius: 0 }}
                  >
                    <div className="aspect-square overflow-hidden bg-[#FAFAF8] relative">
                      <ImageWithFallback
                        src={i.image}
                        alt={i.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {!i.inStock && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="bg-white text-[#d41c5c] text-xs font-semibold px-3 py-1.5 uppercase tracking-wider">
                            Out of Stock
                          </span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => remove(i.id)}
                        className="absolute top-2 right-2 p-2 bg-white/95 hover:bg-white text-[#5B616A] hover:text-[#d41c5c] transition-colors"
                        style={{ borderRadius: 0 }}
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="text-[10px] uppercase tracking-wider text-[#5B616A] mb-1">
                        {i.category}
                      </div>
                      <h3 className="text-sm font-semibold text-[#2C2C2C] mb-2 line-clamp-2 min-h-[40px]">
                        {i.name}
                      </h3>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span
                          className="text-lg text-[#044c5c]"
                          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600 }}
                        >
                          ${i.price.toFixed(2)}
                        </span>
                        {i.oldPrice && (
                          <span className="text-xs text-[#5B616A] line-through">
                            ${i.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        disabled={!i.inStock}
                        className="w-full px-3 py-2.5 bg-[#044c5c] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-[#033d4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ borderRadius: 0 }}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
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
