import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { useState, useCallback } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { IMAGES } from "./data";

const categorySlugMap: Record<string, string> = {
  Bottles: "drinkwares",
  Cups: "drinkwares",
  Mugs: "drinkwares",
  "Lunchbox & Coasters": "drinkwares",
};

const productCategories = [
  // Row 1
  { name: "Children Gifts", image: "https://mtc.ae/wp-content/uploads/2025/09/category-listing-index-u0925-childrens.webp" },
  { name: "Lunchbox & Coasters", image: "https://mtc.ae/wp-content/uploads/2025/09/category-listing-index-u0925-lunchboxcoasters.webp" },
  { name: "Bottles", image: "https://mtc.ae/wp-content/uploads/2025/09/category-listing-index-u0925-drinkwares.webp" },
  { name: "Cups", image: "https://mtc.ae/wp-content/uploads/2025/10/category-listing-index-u1025-mugs.webp" },
  { name: "Powerbanks", image: "https://mtc.ae/wp-content/uploads/2025/10/category-listing-index-powerbanks-l2.webp" },
  { name: "Technology Gifts", image: "https://mtc.ae/wp-content/uploads/2025/10/category-listing-index-techgifts-l2.webp" },
  { name: "Speakers", image: "https://mtc.ae/wp-content/uploads/2025/10/category-listing-index-u1025-speakers.webp" },
  { name: "Tech Accessories", image: "https://mtc.ae/wp-content/uploads/2025/09/category-listing-index-techaccess.webp" },
  { name: "Wall Clocks", image: "https://mtc.ae/wp-content/uploads/2025/09/category-listing-index-wallclocks.webp" },
  { name: "Medals", image: "https://mtc.ae/wp-content/uploads/2025/09/category-listing-index-u0925-medals.webp" },
  { name: "Pin & Badges", image: "https://mtc.ae/wp-content/uploads/2025/09/category-listing-index-u0925-badges.webp" },
  { name: "Back to School", image: "https://mtc.ae/wp-content/uploads/2025/09/category-listing-index-u0925-back2school.webp" },

  // Row 2
  { name: "Ramadan Gifts", image: IMAGES.ramadanLantern },
  { name: "Sadu Design", image: "https://images.unsplash.com/photo-1627726997943-6e397135f78a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWR1JTIwYXJhYmljJTIwdHJhZGl0aW9uYWwlMjB0ZXh0aWxlJTIwcGF0dGVybnxlbnwxfHx8fDE3NzMyMTk5OTF8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Notebooks", image: IMAGES.leatherNotebook },
  { name: "Portfolios", image: "https://images.unsplash.com/photo-1709124581801-7bcf3d320da2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwcG9ydGZvbGlvJTIwZm9sZGVyJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzczMjE5OTkyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Maxema Italian Pens", image: "https://images.unsplash.com/photo-1620080207549-60efab274c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGVuJTIwbHV4dXJ5JTIwd3JpdGluZyUyMGdvbGR8ZW58MXx8fHwxNzczMjE5OTkyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Stationery", image: "https://images.unsplash.com/photo-1764044371408-fa28e7dde471?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGF0aW9uZXJ5JTIwcGVuY2lscyUyMHJ1bGVycyUyMG9mZmljZSUyMHN1cHBsaWVzfGVufDF8fHx8MTc3MzIxOTk5Nnww&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Pens", image: IMAGES.pen },
  { name: "Mugs", image: IMAGES.ceramicMug },
  { name: "Gift Sets", image: IMAGES.giftSet },
  { name: "Eco-friendly Gifts", image: "https://images.unsplash.com/photo-1593560369164-8f3a8facd0e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMHByb2R1Y3RzJTIwc3VzdGFpbmFibGUlMjBncmVlbnxlbnwxfHx8fDE3NzMyMTk5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "USB Flash Drives", image: IMAGES.usbDrive },
  { name: "Travel Adaptors", image: "https://images.unsplash.com/photo-1763161786687-43d0c9babdf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBwb3dlciUyMGFkYXB0ZXIlMjBwbHVnJTIwdW5pdmVyc2FsfGVufDF8fHx8MTc3MzIxOTk5N3ww&ixlib=rb-4.1.0&q=80&w=1080" },

  // Row 3
  { name: "Apparel & Wearables", image: IMAGES.apparel },
  { name: "Bags", image: IMAGES.toteBag },
  { name: "Awards & Plaques", image: "https://images.unsplash.com/photo-1764874299025-d8b2251f307d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlzdGFsJTIwdHJvcGh5JTIwYXdhcmQlMjBnbGFzcyUyMGNvcnBvcmF0ZXxlbnwxfHx8fDE3NzMyMTk5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Trophies", image: "https://images.unsplash.com/photo-1764874299025-d8b2251f307d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlzdGFsJTIwdHJvcGh5JTIwYXdhcmQlMjBnbGFzcyUyMGNvcnBvcmF0ZXxlbnwxfHx8fDE3NzMyMTk5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Display Stands", image: "https://images.unsplash.com/photo-1752061905355-91061fe8c87a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3J5bGljJTIwZGlzcGxheSUyMHN0YW5kJTIwaG9sZGVyJTIwcHJvZHVjdHxlbnwxfHx8fDE3NzMyMTk5OTh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Watch and Clock", image: "https://images.unsplash.com/photo-1760532466984-39c3eb7f1254?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cmlzdCUyMHdhdGNoJTIwbHV4dXJ5JTIwdGltZXBpZWNlJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzMyMjAwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "ID Solution", image: "https://images.unsplash.com/photo-1758887248912-03a0c34a2f41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpZCUyMGNhcmQlMjBiYWRnZSUyMGhvbGRlciUyMGxhbnlhcmQlMjBvZmZpY2V8ZW58MXx8fHwxNzczMjE5OTk4fDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Cables", image: "https://images.unsplash.com/photo-1751846545116-838fe2e7e815?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVU0IlMjBjaGFyZ2luZyUyMGNhYmxlJTIwdHlwZSUyMGMlMjB3aGl0ZXxlbnwxfHx8fDE3NzMyMTk5OTl8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Wooden Plaques", image: "https://images.unsplash.com/photo-1568057373873-87302f152271?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBwbGFxdWUlMjBlbmdyYXZlZCUyMGF3YXJkJTIwc2hpZWxkfGVufDF8fHx8MTc3MzIxOTk5OXww&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Anti-stress Products", image: "https://images.unsplash.com/photo-1706528465042-5f485884b84e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlc3MlMjBiYWxsJTIwc21pbGV5JTIwY29sb3JmdWwlMjBzcXVlZXplJTIwdG95fGVufDF8fHx8MTc3MzIyMDAwMHww&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Jute & Cotton Bags", image: "https://images.unsplash.com/photo-1615290144628-8fa0f0d61658?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdXRlJTIwY290dG9uJTIwdG90ZSUyMGJhZyUyMG5hdHVyYWwlMjBlY298ZW58MXx8fHwxNzczMjIwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Photo Crystal", image: "https://images.unsplash.com/photo-1708777221897-432537d1d826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90byUyMGNyeXN0YWwlMjBnbGFzcyUyMDNkJTIwZW5ncmF2ZWR8ZW58MXx8fHwxNzczMjIwMDA0fDA&ixlib=rb-4.1.0&q=80&w=1080" },

  // Row 4
  { name: "ChasePlus Products", image: IMAGES.wirelessEarbuds },
  { name: "Wristbands", image: "https://images.unsplash.com/photo-1632805015565-f94dd4bbdf54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxpY29uZSUyMHdyaXN0YmFuZCUyMGJyYWNlbGV0JTIwY29sb3JmdWwlMjBjdXN0b218ZW58MXx8fHwxNzczMjIwMDA0fDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Printing Machineries", image: "https://images.unsplash.com/photo-1569852741721-ee5a94bf719e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWF0JTIwcHJlc3MlMjBwcmludGluZyUyMG1hY2hpbmUlMjBzdWJsaW1hdGlvbnxlbnwxfHx8fDE3NzMyMjAwMDR8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Key Holders", image: IMAGES.keychain },
  { name: "Printing Supplies", image: "https://images.unsplash.com/photo-1630327722923-5ebd594ddda9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmludGluZyUyMGluayUyMHN1cHBsaWVzJTIwc2NyZWVuJTIwcHJlc3N8ZW58MXx8fHwxNzczMjIwMDEzfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "T-shirt & Polo Shirts", image: "https://images.unsplash.com/photo-1714143852211-62d5a635439f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xvJTIwc2hpcnQlMjBicmFuZGVkJTIwY29ycG9yYXRlJTIwdW5pZm9ybXxlbnwxfHx8fDE3NzMyMjAwMDV8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Name Badges", image: "https://images.unsplash.com/photo-1758887248912-03a0c34a2f41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpZCUyMGNhcmQlMjBiYWRnZSUyMGhvbGRlciUyMGxhbnlhcmQlMjBvZmZpY2V8ZW58MXx8fHwxNzczMjE5OTk4fDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Lanyards", image: "https://images.unsplash.com/photo-1594399011567-c992faac7f8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW55YXJkJTIwbmVjayUyMHN0cmFwJTIwaWQlMjBob2xkZXIlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzMyMjAwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Laptop Bags", image: "https://images.unsplash.com/photo-1763034179057-acad3a072568?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBiYWclMjBicmllZmNhc2UlMjBwcm9mZXNzaW9uYWwlMjBibGFja3xlbnwxfHx8fDE3NzMyMjAwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Business Starter", image: "https://images.unsplash.com/photo-1571510028795-ed27f9b4fa4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB3ZWxjb21lJTIwa2l0JTIwb25ib2FyZGluZyUyMGdpZnQlMjBib3h8ZW58MXx8fHwxNzczMjIwMDEzfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Travel Essentials", image: "https://images.unsplash.com/photo-1764909262009-3dcd5691185c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBlc3NlbnRpYWxzJTIwYWNjZXNzb3JpZXMlMjBraXQlMjBjb21wYWN0fGVufDF8fHx8MTc3MzIyMDAwOHww&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "National Day", image: "https://images.unsplash.com/photo-1643258363441-45e94e3e987c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVQUUlMjBuYXRpb25hbCUyMGRheSUyMGZsYWclMjBjZWxlYnJhdGlvbiUyMHByb2R1Y3RzfGVufDF8fHx8MTc3MzIyMDAxMXww&ixlib=rb-4.1.0&q=80&w=1080" },
];

// 12 items per row, show all 48 at once (4 rows) — arrows scroll pages if more added
const COLS_DESKTOP = 12;
const ROWS = 4;
const PAGE_SIZE = COLS_DESKTOP * ROWS;

export function CategoryIcons() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(productCategories.length / PAGE_SIZE);

  const handlePrev = useCallback(() => {
    setPage((p) => (p - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const handleNext = useCallback(() => {
    setPage((p) => (p + 1) % totalPages);
  }, [totalPages]);

  const visibleCategories = productCategories.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE
  );

  return (
    <section
      className="py-[64px] bg-white"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Section header with arrows */}
        <div className="flex items-center justify-between mb-8 border-b border-[#E8DDD3] pb-3">
          <h2
            className="text-[#2C2C2C] text-[18px] md:text-[20px] uppercase tracking-wide relative"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
          >
            Browse by Category
            <span className="absolute bottom-[-13px] left-0 w-full h-[2px] bg-[#044c5c]" />
          </h2>

          {/* Arrow buttons */}
          
        </div>

        {/* 4-row × 12-col grid — all 48 categories */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-x-5 gap-y-6">
          {visibleCategories.map((cat) => (
            <Link
              key={cat.name}
              to={
                categorySlugMap[cat.name]
                  ? `/category/${categorySlugMap[cat.name]}`
                  : "#"
              }
              className="group flex flex-col items-center text-center"
            >
              {/* Circular image — object-cover, centered */}
              <div className="w-full aspect-square overflow-hidden mb-2 rounded-full">
                <ImageWithFallback
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Name */}
              <span
                className="text-[11px] md:text-[12px] text-[#2C2C2C] group-hover:text-[#044c5c] transition-colors duration-200 leading-tight"
                style={{ fontWeight: 500 }}
              >
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}