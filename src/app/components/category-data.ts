/* ──────────────────────────────────────────────────────
   Category Hierarchy Data for TezkarGift
   ────────────────────────────────────────────────────── */

export interface SubCategory {
  slug: string;
  name: string;
  image: string;
  productCount: number;
}

export interface Category {
  slug: string;
  name: string;
  parent?: string;
  parentLabel?: string;
  grandParent?: string;
  grandParentLabel?: string;
  subcategories: SubCategory[];
}

/* ── Drinkwares ── */
const drinkwares: Category = {
  slug: "drinkwares",
  name: "Drinkwares",
  parent: "promotional-products",
  parentLabel: "Promotional Products",
  subcategories: [
    {
      slug: "stainless-steel-bottles",
      name: "Stainless Steel Bottles",
      image: "https://images.unsplash.com/photo-1592999641298-434e28c11d14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFpbmxlc3MlMjBzdGVlbCUyMHdhdGVyJTIwYm90dGxlJTIwYnJhbmRlZHxlbnwxfHx8fDE3NzMyMjg3NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      productCount: 24,
    },
    {
      slug: "ceramic-mugs",
      name: "Ceramic Mugs",
      image: "https://images.unsplash.com/photo-1640038382256-7db69d81cb7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwY29mZmVlJTIwbXVnJTIwd2hpdGV8ZW58MXx8fHwxNzczMjI4NzUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      productCount: 17,
    },
    {
      slug: "travel-tumblers",
      name: "Travel Tumblers",
      image: "https://images.unsplash.com/photo-1545136864-49deeabfe513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjB0dW1ibGVyJTIwaW5zdWxhdGVkJTIwY29mZmVlfGVufDF8fHx8MTc3MzIyODc1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      productCount: 14,
    },
    {
      slug: "glass-bottles",
      name: "Glass Bottles",
      image: "https://images.unsplash.com/photo-1628498092395-9949f40ce20d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMHdhdGVyJTIwYm90dGxlJTIwcmV1c2FibGV8ZW58MXx8fHwxNzczMjI4NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      productCount: 8,
    },
    {
      slug: "sports-bottles",
      name: "Sports Bottles",
      image: "https://images.unsplash.com/photo-1761946356399-8335dbdce394?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjB3YXRlciUyMGJvdHRsZSUyMGd5bSUyMGZpdG5lc3N8ZW58MXx8fHwxNzczMjI4NzU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      productCount: 11,
    },
    {
      slug: "insulated-flasks",
      name: "Insulated Flasks",
      image: "https://images.unsplash.com/photo-1745508201242-6495edf95b99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN1bGF0ZWQlMjBmbGFzayUyMHRoZXJtb3MlMjBib3R0bGV8ZW58MXx8fHwxNzczMjI4NzU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      productCount: 9,
    },
    {
      slug: "coffee-cups",
      name: "Coffee Cups",
      image: "https://images.unsplash.com/photo-1666866875759-84154ec24c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBlc3ByZXNzbyUyMGNlcmFtaWN8ZW58MXx8fHwxNzczMjI5MTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      productCount: 6,
    },
    {
      slug: "sippy-cups",
      name: "Sippy Cups",
      image: "https://images.unsplash.com/photo-1664811793589-41c85acfa569?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaXBweSUyMGN1cCUyMGtpZHMlMjB0b2RkbGVyfGVufDF8fHx8MTc3MzIyODc1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      productCount: 4,
    },
  ],
};

/* ── Registry / lookup by slug ── */
export const categoryRegistry: Record<string, Category> = {
  drinkwares,
};

export function getCategoryBySlug(slug: string): Category | undefined {
  return categoryRegistry[slug];
}

/* ── Cross-category suggestions (for "Also Explore" sections) ── */
const crossCategorySuggestions: Record<string, { slug: string; name: string; image: string }[]> = {
  drinkwares: [
    { slug: "bags-and-backpacks", name: "Bags & Backpacks", image: "https://images.unsplash.com/photo-1688646533342-5db697c01a4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBsYXB0b3AlMjBiYWclMjBiYWNrcGFjayUyMGJ1c2luZXNzfGVufDF8fHx8MTc3MzMwODYxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { slug: "tech-accessories", name: "Tech Accessories", image: "https://images.unsplash.com/photo-1762681829945-c260685037de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwYWNjZXNzb3JpZXMlMjB3aXJlbGVzcyUyMGNoYXJnZXIlMjBnYWRnZXR8ZW58MXx8fHwxNzczMzA4NjE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { slug: "desk-accessories", name: "Desk Accessories", image: "https://images.unsplash.com/photo-1717944517362-e3ed65ca95be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNrJTIwYWNjZXNzb3JpZXMlMjBvcmdhbml6ZXIlMjBvZmZpY2UlMjBwcmVtaXVtfGVufDF8fHx8MTc3MzMwODYxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { slug: "apparel", name: "Corporate Apparel", image: "https://images.unsplash.com/photo-1756043394954-663bde63648a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBhcHBhcmVsJTIwcG9sbyUyMHNoaXJ0JTIwYnJhbmRlZHxlbnwxfHx8fDE3NzMzMDg2MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  ],
};

/**
 * Returns related items for an "Also Explore" section.
 * - For a parent category: returns sibling subcategories + cross-category suggestions
 * - For a subcategory: returns sibling subcategories under the same parent
 */
export function getRelatedCategories(
  slug: string,
  currentCategory: Category
): { slug: string; name: string; image: string; productCount?: number }[] {
  // If the current slug IS the parent category, return cross-category suggestions
  if (currentCategory.slug === slug) {
    return crossCategorySuggestions[slug] || [];
  }

  // Otherwise, return sibling subcategories (excluding the current one)
  return currentCategory.subcategories
    .filter((sub) => sub.slug !== slug)
    .slice(0, 6)
    .map((sub) => ({ slug: sub.slug, name: sub.name, image: sub.image, productCount: sub.productCount }));
}