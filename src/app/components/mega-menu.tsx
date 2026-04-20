import { useState, useRef, useCallback } from "react";
import {
  ChevronDown, ChevronRight, Menu, Phone, Sparkles,
  Star, Palette, Printer, Shirt, PenTool, Layers,
  Package, Clock, Award, Shield, Users, Mail,
  Heart, Zap, Flame, Crown, Gem,
  MessageSquare, Video, Medal, Briefcase, BookOpen,
  Leaf, Compass, Scissors, Gift, Watch,
  Headphones, Laptop, UtensilsCrossed, Dumbbell,
  FileText, TrendingUp, Calendar, Newspaper,
  Handshake, ShoppingBag, BarChart3,
  Sun, Sticker, ScreenShare, Crosshair, CreditCard,
  CircleDot, Monitor, Database, Pen, Wrench, Stamp,
} from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { brands } from "./data";
// TEMP: Commented out figma:asset import causing module loading errors
// import heattransferBanner from "figma:asset/3fcd9ef9a257ba91b04668ad2f72355a0681fe8e.png";

/* ───────────── ROUTE MAPPINGS ───────────── */

const categoryRoutes: Record<string, string> = {
  "Drinkwares": "/category/drinkwares",
};

const subcategoryRoutes: Record<string, string> = {
  "Stainless Steel Bottles": "/category/stainless-steel-bottles",
  "Ceramic Mugs": "/category/ceramic-mugs",
  "Travel Tumblers": "/category/travel-tumblers",
  "Glass Bottles": "/category/glass-bottles",
  "Sports Bottles": "/category/sports-bottles",
  "Insulated Flasks": "/category/insulated-flasks",
  "Coffee Cups": "/category/coffee-cups",
  "Sippy Cups": "/category/sippy-cups",
};

/* ───────────────────── CATEGORY IMAGES ───────────────────── */

const categoryImages: Record<string, string> = {
  "Bags": "https://images.unsplash.com/photo-1732726345661-836c96f4d5f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9tb3Rpb25hbCUyMGJhZ3MlMjB0b3RlJTIwYmFja3BhY2slMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc3MzgwODgyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Caps & Hats": "https://images.unsplash.com/photo-1606483956061-46a898dce538?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXAlMjBoYXQlMjBoZWFkd2VhciUyMGZhc2hpb258ZW58MXx8fHwxNzczODA4ODM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Drinkwares": "https://images.unsplash.com/photo-1628525886800-6988e135bb3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFpbmxlc3MlMjBzdGVlbCUyMHdhdGVyJTIwYm90dGxlcyUyMGRyaW5rd2FyZXxlbnwxfHx8fDE3NzMyMTY3NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Electronics & IT": "https://images.unsplash.com/photo-1524289286702-f07229da36f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwZ2FkZ2V0cyUyMGFjY2Vzc29yaWVzJTIwY29ycG9yYXRlfGVufDF8fHx8MTc3MzIxNjc3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Gift Sets": "https://images.unsplash.com/photo-1671749999622-4087a86868cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBnaWZ0JTIwaGFtcGVyJTIwc2V0JTIwcHJlbWl1bSUyMGJveHxlbnwxfHx8fDE3NzMyMTY3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Health & Wellness": "https://images.unsplash.com/photo-1687184144779-51a366352458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzcyUyMGZpdG5lc3MlMjBhY2Nlc3NvcmllcyUyMGNvcnBvcmF0ZXxlbnwxfHx8fDE3NzM4MDg4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Home & Living": "https://images.unsplash.com/photo-1642830166551-3a44b72c46f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwbGl2aW5nJTIwdW1icmVsbGElMjBibGFua2V0JTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzczODA4ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Keychains & Accessories": "https://images.unsplash.com/photo-1661353559006-402f30f9e2a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXljaGFpbnMlMjBhY2Nlc3NvcmllcyUyMHdhbGxldCUyMGNhcmQlMjBob2xkZXJ8ZW58MXx8fHwxNzczODA4ODI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Office & Stationery": "https://images.unsplash.com/photo-1722929025573-3d461531ac4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBzdGF0aW9uZXJ5JTIwbm90ZWJvb2tzJTIwcGVucyUyMG9mZmljZXxlbnwxfHx8fDE3NzMyMTY3NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Outdoor & Sports": "https://images.unsplash.com/photo-1655161920390-e943a1ca0fdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwc3BvcnRzJTIwZ29sZiUyMGNhbXBpbmclMjBhY2Nlc3Nvcmllc3xlbnwxfHx8fDE3NzM4MDg4Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Pens & Writing": "https://images.unsplash.com/photo-1760630857036-d92e9e7d9d8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW5zJTIwd3JpdGluZyUyMGluc3RydW1lbnRzJTIwY29sbGVjdGlvbiUyMGRlc2t8ZW58MXx8fHwxNzczODA4ODI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Eco-Friendly": "https://images.unsplash.com/photo-1563391506244-af91a410fcc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMGJhbWJvbyUyMHN1c3RhaW5hYmxlJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzczODA4ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "T-Shirts & Apparel": "https://images.unsplash.com/photo-1756043394954-663bde63648a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGVkJTIwcG9sbyUyMHNoaXJ0JTIwYXBwYXJlbCUyMGNvcnBvcmF0ZXxlbnwxfHx8fDE3NzI1MzIxNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Textiles": "https://images.unsplash.com/photo-1635353059173-461b9c459f2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0aWxlcyUyMHRvd2VscyUyMGJhdGhyb2JlcyUyMGNvcnBvcmF0ZSUyMGdpZnR8ZW58MXx8fHwxNzczODA4ODI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Tools & Auto": "https://images.unsplash.com/photo-1627065291142-3c0b70b5aaf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdWx0aSUyMHRvb2wlMjBwb2NrZXQlMjBrbmlmZSUyMGZsYXNobGlnaHR8ZW58MXx8fHwxNzczODA4ODI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Toys & Games": "https://images.unsplash.com/photo-1680539427323-44368f1c1078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlc3MlMjBiYWxsJTIwcnViYmVyJTIwdG95cyUyMGNvbG9yZnVsfGVufDF8fHx8MTc3MzgwODgzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Travel & Leisure": "https://images.unsplash.com/photo-1602532360508-595f449c7c55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhY2Nlc3NvcmllcyUyMGx1Z2dhZ2UlMjBwYXNzcG9ydCUyMGhvbGRlcnxlbnwxfHx8fDE3NzM4MDg4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Awards & Trophies": "https://images.unsplash.com/photo-1741980983785-d879e5c4f50c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlzdGFsJTIwYXdhcmQlMjB0cm9waHklMjBwbGFxdWUlMjBjb3Jwb3JhdGV8ZW58MXx8fHwxNzczMjE2NzgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

/* ───────────────────── BRAND IMAGES ───────────────────── */

const brandImages: Record<string, string> = {
  "Samsung": "https://images.unsplash.com/photo-1762496215516-2210571e98c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYW1zdW5nJTIwZWxlY3Ryb25pY3MlMjBwcm9kdWN0JTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3MzIxODM3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Apple": "https://images.unsplash.com/photo-1566231396917-84d1e08d84d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcHBsZSUyMHByb2R1Y3QlMjBtaW5pbWFsJTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3MzIxODM3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Parker": "https://images.unsplash.com/photo-1600025282051-ec0c6bf3137a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYXJrZXIlMjBwZW4lMjBnb2xkJTIwbHV4dXJ5JTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3MzIxODM3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Moleskine": "https://images.unsplash.com/photo-1612907260223-2c7aff7a7d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3RlYm9vayUyMGpvdXJuYWwlMjBsZWF0aGVyJTIwbWluaW1hbHxlbnwxfHx8fDE3NzMyMTgzODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Thermos": "https://images.unsplash.com/photo-1760920193193-91dd96af7862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUaGVybW9zJTIwZmxhc2slMjBib3R0bGUlMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzczMjE4Mzc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Samsonite": "https://images.unsplash.com/photo-1639597784714-4905e95de813?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBzdWl0Y2FzZSUyMGx1Z2dhZ2UlMjBtaW5pbWFsJTIwd2hpdGV8ZW58MXx8fHwxNzczMjE4Mzg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Cross": "https://images.unsplash.com/photo-1608280711150-ccf8dd681f28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDcm9zcyUyMHBlbiUyMHdyaXRpbmclMjBpbnN0cnVtZW50JTIwd2hpdGV8ZW58MXx8fHwxNzczMjE4Mzc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "JBL": "https://images.unsplash.com/photo-1608488458196-61cd3a720de8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxKQkwlMjBzcGVha2VyJTIwcG9ydGFibGUlMjBibHVldG9vdGglMjB3aGl0ZXxlbnwxfHx8fDE3NzMyMTgzNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Anker": "https://images.unsplash.com/photo-1566554738544-d962991c3fee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0YWJsZSUyMGNoYXJnZXIlMjBwb3dlciUyMGJhbmslMjBtaW5pbWFsfGVufDF8fHx8MTc3MzIxODM4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Victorinox": "https://images.unsplash.com/photo-1678558631072-a5c9cb69e189?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWaWN0b3Jpbm94JTIwc3dpc3MlMjBrbmlmZSUyMHJlZCUyMHRvb2wlMjB3aGl0ZXxlbnwxfHx8fDE3NzMyMTgzNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Montblanc": "https://images.unsplash.com/photo-1729101827046-6fb7e456eddd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNb250YmxhbmMlMjBsdXh1cnklMjBwZW4lMjB3cml0aW5nJTIwd2hpdGV8ZW58MXx8fHwxNzczMjE4MzgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Lamy": "https://images.unsplash.com/photo-1739534216904-9cd7711b43df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMYW15JTIwZm91bnRhaW4lMjBwZW4lMjBkZXNpZ24lMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzczMjE4MzgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

/* ───────────────────── DATA (MTC.ae structure) ───────────────────── */

interface SubGroup {
  title: string;
  items: string[];
}

interface ProductCategory {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  subcategories: string[];
  groups?: SubGroup[];
}

const masterProductList: ProductCategory[] = [
  {
    name: "Bags",
    icon: Package,
    subcategories: ["Backpacks", "Drawstring Bags", "Duffel Bags", "Laptop Bags", "Non-Woven Bags", "Paper Bags", "Shopping Bags", "Tote Bags", "Travel Bags", "Waist Bags", "Cooler Bags", "Jute Bags"],
    groups: [
      { title: "Backpacks & Travel", items: ["Backpacks", "Duffel Bags", "Travel Bags", "Laptop Bags"] },
      { title: "Shopping Bags", items: ["Tote Bags", "Shopping Bags", "Non-Woven Bags", "Jute Bags"] },
      { title: "Specialty Bags", items: ["Drawstring Bags", "Cooler Bags", "Waist Bags"] },
      { title: "Paper & Packaging", items: ["Paper Bags"] },
    ],
  },
  {
    name: "Caps & Hats",
    icon: Crown,
    subcategories: ["Baseball Caps", "Bucket Hats", "Snapback Caps", "Trucker Caps", "Visor Caps", "Beanies", "Sun Hats", "Sports Caps"],
    groups: [
      { title: "Casual Caps", items: ["Baseball Caps", "Snapback Caps"] },
      { title: "Trucker & Bucket", items: ["Trucker Caps", "Bucket Hats"] },
      { title: "Sun Protection", items: ["Sun Hats", "Visor Caps"] },
      { title: "Sports & Winter", items: ["Sports Caps", "Beanies"] },
    ],
  },
  {
    name: "Drinkwares",
    icon: Flame,
    subcategories: ["Stainless Steel Bottles", "Ceramic Mugs", "Travel Tumblers", "Glass Bottles", "Sports Bottles", "Insulated Flasks", "Coffee Cups", "Sippy Cups", "Thermos Flasks", "Bamboo Bottles"],
    groups: [
      { title: "Steel Bottles", items: ["Stainless Steel Bottles", "Sports Bottles"] },
      { title: "Glass & Bamboo", items: ["Glass Bottles", "Bamboo Bottles"] },
      { title: "Mugs & Cups", items: ["Ceramic Mugs", "Coffee Cups", "Sippy Cups"] },
      { title: "Flasks & Tumblers", items: ["Travel Tumblers", "Insulated Flasks", "Thermos Flasks"] },
    ],
  },
  {
    name: "Electronics & IT",
    icon: Zap,
    subcategories: ["Power Banks", "USB Flash Drives", "Wireless Chargers", "Bluetooth Speakers", "Earbuds & Headphones", "Phone Accessories", "Smart Watches", "Laptop Accessories", "LED Lights", "Charging Cables"],
    groups: [
      { title: "Powerbank & Chargers", items: ["Power Banks", "Wireless Chargers", "Charging Cables"] },
      { title: "USB & Storage", items: ["USB Flash Drives", "Laptop Accessories"] },
      { title: "Audio & Speakers", items: ["Bluetooth Speakers", "Earbuds & Headphones"] },
      { title: "Tech Accessories", items: ["Phone Accessories", "Smart Watches", "LED Lights"] },
    ],
  },
  {
    name: "Gift Sets",
    icon: Gift,
    subcategories: ["Corporate Gift Sets", "Executive Gift Sets", "Festival Gift Sets", "Luxury Gift Sets", "Welcome Kits", "Ramadan Gift Boxes", "VIP Hampers", "Holiday Packs"],
    groups: [
      { title: "Corporate Gifts", items: ["Corporate Gift Sets", "Welcome Kits"] },
      { title: "Executive Gifts", items: ["Executive Gift Sets", "VIP Hampers"] },
      { title: "Premium & Luxury", items: ["Luxury Gift Sets"] },
      { title: "Seasonal Gifts", items: ["Festival Gift Sets", "Ramadan Gift Boxes", "Holiday Packs"] },
    ],
  },
  {
    name: "Health & Wellness",
    icon: Dumbbell,
    subcategories: ["Face Masks", "First Aid Kits", "Fitness Accessories", "Hand Sanitizers", "Massage Tools", "Yoga Mats", "Resistance Bands", "Water Bottles"],
    groups: [
      { title: "Fitness Gear", items: ["Fitness Accessories", "Resistance Bands"] },
      { title: "Yoga & Exercise", items: ["Yoga Mats", "Water Bottles"] },
      { title: "Health & Safety", items: ["Face Masks", "First Aid Kits"] },
      { title: "Wellness", items: ["Hand Sanitizers", "Massage Tools"] },
    ],
  },
  {
    name: "Home & Living",
    icon: UtensilsCrossed,
    subcategories: ["Blankets & Throws", "Candles", "Clocks", "Cushions", "Kitchen Accessories", "Photo Frames", "Planters", "Umbrellas", "Coasters"],
    groups: [
      { title: "Home Décor", items: ["Photo Frames", "Clocks"] },
      { title: "Plants & Candles", items: ["Planters", "Candles"] },
      { title: "Comfort", items: ["Blankets & Throws", "Cushions"] },
      { title: "Kitchen & More", items: ["Kitchen Accessories", "Coasters", "Umbrellas"] },
    ],
  },
  {
    name: "Keychains & Accessories",
    icon: Gem,
    subcategories: ["Metal Keychains", "Leather Keychains", "Bottle Openers", "Card Holders", "Luggage Tags", "Money Clips", "Phone Stands", "Wallets", "Belt Buckles"],
    groups: [
      { title: "Keychains", items: ["Metal Keychains", "Leather Keychains"] },
      { title: "Openers & Clips", items: ["Bottle Openers", "Money Clips"] },
      { title: "Wallets & Holders", items: ["Card Holders", "Wallets"] },
      { title: "Travel & Tech", items: ["Luggage Tags", "Phone Stands", "Belt Buckles"] },
    ],
  },
  {
    name: "Office & Stationery",
    icon: PenTool,
    subcategories: ["Notebooks & Diaries", "Desk Organizers", "Folders & Files", "Memo Pads", "Sticky Notes", "Calendars & Planners", "Pen Holders", "Paper Weights", "Clipboard Sets"],
    groups: [
      { title: "Notebooks", items: ["Notebooks & Diaries", "Memo Pads"] },
      { title: "Sticky & Notes", items: ["Sticky Notes", "Clipboard Sets"] },
      { title: "Desk Accessories", items: ["Desk Organizers", "Pen Holders", "Paper Weights"] },
      { title: "Filing & Planning", items: ["Folders & Files", "Calendars & Planners"] },
    ],
  },
  {
    name: "Outdoor & Sports",
    icon: Compass,
    subcategories: ["Binoculars", "Camping Gear", "Golf Accessories", "Sports Balls", "Sports Towels", "Fitness Bands", "Frisbees", "Pedometers"],
    groups: [
      { title: "Outdoor Gear", items: ["Binoculars", "Camping Gear"] },
      { title: "Golf & Ball Sports", items: ["Golf Accessories", "Sports Balls"] },
      { title: "Fun & Games", items: ["Frisbees", "Pedometers"] },
      { title: "Fitness", items: ["Sports Towels", "Fitness Bands"] },
    ],
  },
  {
    name: "Pens & Writing",
    icon: PenTool,
    subcategories: ["Ball Pens", "Fountain Pens", "Highlighters", "Marker Pens", "Metal Pens", "Pen Gift Sets", "Stylus Pens", "Wooden Pens", "Eco Pens"],
    groups: [
      { title: "Classic Pens", items: ["Ball Pens", "Fountain Pens"] },
      { title: "Metal & Premium", items: ["Metal Pens", "Pen Gift Sets"] },
      { title: "Specialty Pens", items: ["Stylus Pens", "Wooden Pens", "Eco Pens"] },
      { title: "Markers", items: ["Highlighters", "Marker Pens"] },
    ],
  },
  {
    name: "Eco-Friendly",
    icon: Leaf,
    subcategories: ["Bamboo Products", "Cork Products", "Organic Cotton Items", "Recycled Material Goods", "Wheat Straw Products", "Jute Bags", "Seed Paper", "Biodegradable Items"],
    groups: [
      { title: "Bamboo & Cork", items: ["Bamboo Products", "Cork Products"] },
      { title: "Wheat & Straw", items: ["Wheat Straw Products", "Biodegradable Items"] },
      { title: "Organic & Recycled", items: ["Organic Cotton Items", "Recycled Material Goods"] },
      { title: "Sustainable", items: ["Jute Bags", "Seed Paper"] },
    ],
  },
  {
    name: "T-Shirts & Apparel",
    icon: Shirt,
    subcategories: ["Polo Shirts", "T-Shirts", "Hoodies & Sweatshirts", "Jackets", "Uniforms", "Vests", "Aprons", "Scarves & Ties"],
    groups: [
      { title: "Tops & Shirts", items: ["Polo Shirts", "T-Shirts"] },
      { title: "Uniforms", items: ["Uniforms", "Vests"] },
      { title: "Outerwear", items: ["Hoodies & Sweatshirts", "Jackets"] },
      { title: "Accessories", items: ["Aprons", "Scarves & Ties"] },
    ],
  },
  {
    name: "Textiles",
    icon: Layers,
    subcategories: ["Bathrobes", "Beach Towels", "Face Towels", "Scarves", "Towel Sets", "Gym Towels", "Bandanas", "Hand Towels"],
    groups: [
      { title: "Beach & Gym", items: ["Beach Towels", "Gym Towels"] },
      { title: "Face & Hand", items: ["Face Towels", "Hand Towels"] },
      { title: "Sets & Robes", items: ["Towel Sets", "Bathrobes"] },
      { title: "Accessories", items: ["Scarves", "Bandanas"] },
    ],
  },
  {
    name: "Tools & Auto",
    icon: Shield,
    subcategories: ["Car Accessories", "Multi-Tools", "Pocket Knives", "Tape Measures", "Torches & Flashlights", "Toolkits", "Emergency Kits", "Phone Mounts"],
    groups: [
      { title: "Multi-Tools", items: ["Multi-Tools", "Pocket Knives"] },
      { title: "Toolkits", items: ["Toolkits", "Tape Measures"] },
      { title: "Auto Accessories", items: ["Car Accessories", "Phone Mounts"] },
      { title: "Safety & Lighting", items: ["Torches & Flashlights", "Emergency Kits"] },
    ],
  },
  {
    name: "Toys & Games",
    icon: Star,
    subcategories: ["Stress Balls", "Fidget Toys", "Puzzles", "Card Games", "Board Games", "Yo-Yos", "Flying Discs", "Rubik's Cubes"],
    groups: [
      { title: "Stress Relief", items: ["Stress Balls", "Fidget Toys"] },
      { title: "Puzzles", items: ["Puzzles", "Rubik's Cubes"] },
      { title: "Card & Board", items: ["Card Games", "Board Games"] },
      { title: "Outdoor Toys", items: ["Yo-Yos", "Flying Discs"] },
    ],
  },
  {
    name: "Travel & Leisure",
    icon: Briefcase,
    subcategories: ["Eye Masks", "Luggage Sets", "Neck Pillows", "Passport Holders", "Travel Adapters", "Travel Kits", "Luggage Tags", "Packing Cubes"],
    groups: [
      { title: "Luggage", items: ["Luggage Sets", "Packing Cubes"] },
      { title: "Tags & Holders", items: ["Luggage Tags", "Passport Holders"] },
      { title: "Travel Comfort", items: ["Eye Masks", "Neck Pillows"] },
      { title: "Travel Essentials", items: ["Travel Adapters", "Travel Kits"] },
    ],
  },
  {
    name: "Awards & Trophies",
    icon: Award,
    subcategories: ["Crystal Awards", "Metal Plaques", "Wooden Trophies", "Acrylic Awards", "Shield Plaques", "Custom Trophies", "Medals & Ribbons", "Certificate Holders"],
    groups: [
      { title: "Crystal & Acrylic", items: ["Crystal Awards", "Acrylic Awards"] },
      { title: "Custom Trophies", items: ["Custom Trophies", "Wooden Trophies"] },
      { title: "Plaques & Shields", items: ["Metal Plaques", "Shield Plaques"] },
      { title: "Medals & Holders", items: ["Medals & Ribbons", "Certificate Holders"] },
    ],
  },
];

const popularCategories = [
  { name: "Ramadan Gifts", desc: "Special Ramadan collection", icon: Star, badge: "Seasonal" },
  { name: "Sadu Designs", desc: "Traditional Arabian patterns", icon: Palette, badge: "Exclusive" },
  { name: "Gift Sets", desc: "Curated premium bundles", icon: Gift, badge: "Bestseller" },
  { name: "Eco-Friendly Gifts", desc: "Sustainable gifting options", icon: Leaf, badge: "Trending" },
  { name: "Jute and Cotton Bags", desc: "Natural fabric carry bags", icon: Package, badge: "Popular" },
  { name: "Sign Holders and Display Stands", desc: "Exhibition & event displays", icon: Layers, badge: "New" },
  { name: "Pins and Badges", desc: "Custom enamel & metal pins", icon: Medal, badge: "Classic" },
  { name: "Medals", desc: "Awards & recognition medals", icon: Award, badge: "Premium" },
  { name: "National Day Products", desc: "UAE celebration merchandise", icon: Star, badge: "Seasonal" },
];

const customizedServices = [
  { name: "UV Printing Service", icon: Sun, color: "#F59E0B", bg: "#FEF3C7" },
  { name: "Vinyl Cutting Service", icon: Scissors, color: "#8B5CF6", bg: "#EDE9FE" },
  { name: "Print & Cut Service", icon: Layers, color: "#3B82F6", bg: "#DBEAFE" },
  { name: "Sublimation Printing", icon: Printer, color: "#10B981", bg: "#D1FAE5" },
  { name: "Sticker and Epoxy", icon: Sticker, color: "#EC4899", bg: "#FCE7F3" },
  { name: "Screen Printing", icon: ScreenShare, color: "#044c5c", bg: "#CCFBF1" },
  { name: "Sandblasting Effect Service", icon: Sparkles, color: "#C8956C", bg: "#E8DDD3" },
  { name: "Laser Markings", icon: Crosshair, color: "#EF4444", bg: "#FEE2E2" },
  { name: "ID Card Printing", icon: CreditCard, color: "#6366F1", bg: "#E0E7FF" },
  { name: "Heat Transfer Service", icon: Flame, color: "#F97316", bg: "#FFEDD5" },
  { name: "Embroidery Service", icon: CircleDot, color: "#d41c5c", bg: "#FCE7F3" },
  { name: "Digital Printing", icon: Monitor, color: "#0EA5E9", bg: "#E0F2FE" },
  { name: "Data Transfer Service", icon: Database, color: "#14B8A6", bg: "#CCFBF1" },
  { name: "Laser Engraving", icon: Pen, color: "#A855F7", bg: "#F3E8FF" },
  { name: "Assembly Service", icon: Wrench, color: "#64748B", bg: "#E2E8F0" },
  { name: "Debossing Service", icon: Stamp, color: "#B45309", bg: "#FDE68A" },
  { name: "Foil Stamping", icon: Sparkles, color: "#D97706", bg: "#FEF3C7" },
  { name: "Pad Printing", icon: Layers, color: "#059669", bg: "#D1FAE5" },
];

const toolsAboutGroup = [
  { name: "About Us", icon: Users, href: "/about" },
  { name: "Our Location Map", icon: Compass, href: "#" },
  { name: "Clients", icon: Heart, href: "#" },
  { name: "Videos", icon: Video, href: "#" },
  { name: "Exhibitions", icon: Star, href: "#" },
];

const toolsResellerGroup = [
  { name: "Reseller Tools", icon: Shield, href: "#" },
  { name: "Become a Partner", icon: Heart, href: "#" },
  { name: "Reseller Website Registration", icon: Laptop, href: "#" },
  { name: "Clients Website", icon: Compass, href: "#" },
  { name: "Sample Starter Kit", icon: Package, href: "#" },
  { name: "Order Our Catalogue", icon: BookOpen, href: "#" },
  { name: "Client Friendly Flyers", icon: Layers, href: "#" },
];

const toolsSidebarItems = [
  { name: "Customer Feedback & Complaint", icon: MessageSquare, href: "/feedback" },
  { name: "FAQs", icon: MessageSquare, href: "#" },
  { name: "Newsletter", icon: Mail, href: "#" },
  { name: "Careers", icon: Briefcase, href: "#" },
];

/* ───────────────────── HEATTRANSFER.COM DATA ───────────────────── */

const htPrintingMachines = [
  { name: "Heat Press Machines", icon: Flame },
  { name: "Cutting Plotters", icon: Scissors },
  { name: "Printers", icon: Printer },
  { name: "Crystal Printing Machines", icon: Gem },
  { name: "Badge Maker Machines", icon: Medal },
  { name: "Screen Printing Machines", icon: Layers },
  { name: "Laser Cutting and Engraving", icon: Zap },
  { name: "Other Machines", icon: Shield },
  { name: "Other Equipments", icon: Package },
];

const htPrintingSupplies = [
  { name: "Heat Transfer Papers", icon: Layers },
  { name: "Heat Transfer Vinyls", icon: Palette },
  { name: "Sublimation Papers", icon: Printer },
  { name: "Inks and Cartridges", icon: PenTool },
  { name: "Other Transfer Materials", icon: Package },
  { name: "Epoxy Doming", icon: Gem },
];

const htCorner = [
  { name: "Contact Us", icon: Phone, href: "#" },
  { name: "About Us", icon: Users, href: "#" },
  { name: "Business Starter Kit", icon: Briefcase, href: "#" },
  { name: "Photo Gallery", icon: Star, href: "#" },
  { name: "Download Catalog", icon: BookOpen, href: "#" },
];

/* ─────────────────── COMPONENT ─────────────────── */

export function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = useCallback((menu: string) => {
    if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
    setActiveMenu(menu);
    if (menu === "master" && !hoveredProduct) {
      setHoveredProduct(masterProductList[0].name);
    }
  }, [hoveredProduct]);

  const scheduleClose = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setHoveredProduct(null);
    }, 180);
  }, []);

  const cancelClose = useCallback(() => {
    if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
  }, []);

  const panelOpen = activeMenu === "brands" || activeMenu === "popular" || activeMenu === "aboutus" || activeMenu === "master" || activeMenu === "heattransfer" || activeMenu === "articles";

  const activeProduct = masterProductList.find((p) => p.name === hoveredProduct);

  return (
    <nav
      className="hidden lg:block border-t border-[#eaedf0] bg-white relative z-50"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* ── Nav bar ── */}
      <div className="max-w-[1400px] mx-auto px-4">
        <ul className="flex items-center h-[48px]">

          {/* ═══ PROMOTIONAL PRODUCTS ═══ */}
          <li
            className="relative h-full flex items-center"
            onMouseEnter={() => open("master")}
            onMouseLeave={scheduleClose}
          >
            <button
              className={`flex items-center gap-2.5 h-full px-5 text-[13px] tracking-wide uppercase transition-all duration-200 ${
                activeMenu === "master"
                  ? "bg-[#033a48] text-white"
                  : "bg-[#044c5c] text-white hover:bg-[#033a48]"
              }`}
              style={{ fontWeight: 600 }}
            >
              <Menu size={16} strokeWidth={2.2} />
              Products
              <ChevronDown size={11} className={`ml-0.5 transition-transform duration-200 ${activeMenu === "master" ? "rotate-180" : ""}`} />
            </button>
          </li>

          {/* ═══ NAV ITEMS ═══ */}
          {([
            { id: "brands", label: "Brands" },
            { id: "popular", label: "Popular" },
            { id: "customized", label: "Printing Services" },
            { id: "articles", label: "Articles" },
          ] as const).map((nav) => (
            <li
              key={nav.id}
              className="relative h-full flex items-center"
              onMouseEnter={() => open(nav.id)}
              onMouseLeave={scheduleClose}
            >
              <button
                className={`flex items-center gap-1.5 h-full px-4 text-[13px] tracking-wide uppercase transition-all duration-150 relative ${
                  activeMenu === nav.id ? "text-[#044c5c]" : "text-[#3a3f47] hover:text-[#044c5c]"
                }`}
                style={{ fontWeight: 600 }}
              >
                {nav.label}
                <ChevronDown size={11} className={`transition-transform duration-150 ${activeMenu === nav.id ? "rotate-180" : ""}`} />
                <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-[#044c5c] transition-transform duration-150 origin-center ${activeMenu === nav.id ? "scale-x-100" : "scale-x-0"}`} />
              </button>
              {/* Simple dropdown for Printing Services */}
              {nav.id === "customized" && activeMenu === "customized" && (
                <div
                  className="absolute top-full left-0 w-[230px] bg-white border border-[#eaedf0] shadow-lg py-2 z-50"
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  {[
                    { name: "Printing Methods", href: "#" },
                    { name: "Customize Gift Products", href: "#" },
                  ].map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-5 py-2.5 text-[13px] text-[#3a3f47] hover:text-[#044c5c] hover:bg-[#f8fdfd] transition-colors"
                      style={{ fontWeight: 500 }}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}

          {/* ═══ CATALOGUE 2026 ═══ */}
          <li className="ml-auto h-full flex items-center" onMouseEnter={() => { cancelClose(); setActiveMenu(null); }}>
            <a
              href="/catalogue"
              className="flex items-center gap-2 h-full px-4 text-[12px] tracking-wider uppercase transition-colors group"
              style={{ fontWeight: 700 }}
            >
              <span className="flex items-center gap-2 bg-gradient-to-r from-[#044c5c] to-[#0B1A3E] text-white px-4 py-1.5 rounded-full group-hover:shadow-md group-hover:shadow-[#044c5c]/25 transition-all">
                <BookOpen size={13} strokeWidth={2} />
                Catalogue 2026
              </span>
            </a>
          </li>
        </ul>
      </div>

      {/* ═══ FULL-WIDTH DROPDOWN PANELS ═══ */}
      {panelOpen && (
        <div
          className="absolute top-full left-0 w-full z-50"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="bg-white border-t border-[#eaedf0] shadow-xl shadow-black/8" style={{ animation: "megaSlide 0.18s ease-out" }}>

            {/* ── PRODUCTS MEGA MENU (MTC.ae style) ── */}
            {activeMenu === "master" && (
              <div className="w-full">
                <div className="max-w-[1400px] mx-auto px-4">
                  <div className="grid grid-cols-12">
                    {/* Left sidebar - Category list (scrollable for 18 categories) */}
                    <div className="col-span-3 border-r border-[#eaedf0] py-2 pr-0">
                      <div className="max-h-[480px] overflow-y-auto custom-scrollbar">
                        {masterProductList.map((item) => {
                          const isActive = hoveredProduct === item.name;
                          const Icon = item.icon;
                          const catRoute = categoryRoutes[item.name];
                          const TagC = catRoute ? Link : "a";
                          const catLinkProps = catRoute ? { to: catRoute } : { href: "#" };
                          return (
                            <TagC
                              key={item.name}
                              {...(catLinkProps as any)}
                              className={`flex items-center gap-3 px-4 py-[8px] text-[13px] transition-all duration-100 ${
                                isActive
                                  ? "bg-[#f0fafb] text-[#044c5c] border-l-[3px] border-[#044c5c] pl-[13px]"
                                  : "text-[#444] hover:bg-[#f8f9fa] hover:text-[#044c5c] border-l-[3px] border-transparent pl-[13px]"
                              }`}
                              style={{ fontWeight: isActive ? 600 : 400 }}
                              onMouseEnter={() => setHoveredProduct(item.name)}
                            >
                              <Icon size={15} className={`flex-shrink-0 ${isActive ? "text-[#044c5c]" : "text-[#b0b5bd]"}`} />
                              <span className="flex-1">{item.name}</span>
                              <ChevronRight size={12} className={isActive ? "text-[#044c5c]" : "text-[#ccc]"} />
                            </TagC>
                          );
                        })}
                        <div className="border-t border-[#eaedf0] mt-2 pt-2 px-4">
                          <a href="#" className="flex items-center gap-2 text-[13px] text-[#044c5c] py-2 hover:underline" style={{ fontWeight: 600 }}>
                            View All Products <ChevronRight size={13} />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Middle - Subcategories (grouped 4 columns) */}
                    <div className="col-span-6 py-5 px-6 flex flex-col">
                      {activeProduct && (
                        <>
                          <h4 className="text-[#0B1A3E] text-[15px] mb-4 pb-2 border-b border-[#eaedf0]" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                            {activeProduct.name}
                          </h4>
                          {activeProduct.groups && (
                            <div className="grid grid-cols-4 gap-x-5 gap-y-4">
                              {activeProduct.groups.map((group) => (
                                <div key={group.title} className="min-w-0">
                                  <p className="text-[11.5px] text-[#0B1A3E] mb-2 pb-1.5 border-b border-[#eaedf0] whitespace-nowrap" style={{ fontWeight: 600 }}>
                                    {group.title}
                                  </p>
                                  <ul className="space-y-0.5">
                                    {group.items.map((item) => {
                                      const subRoute = subcategoryRoutes[item];
                                      const TagS = subRoute ? Link : "a";
                                      const subLinkProps = subRoute ? { to: subRoute } : { href: "#" };
                                      return (
                                        <li key={item}>
                                          <TagS {...(subLinkProps as any)} className="block text-[12px] text-[#555] hover:text-[#044c5c] py-[3.5px] transition-colors whitespace-nowrap">
                                            {item}
                                          </TagS>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="mt-3 pt-2 border-t border-[#eaedf0]">
                            {categoryRoutes[activeProduct.name] ? (
                              <Link to={categoryRoutes[activeProduct.name]} className="inline-flex items-center gap-1 text-[#044c5c] text-[12.5px] hover:underline" style={{ fontWeight: 600 }}>
                                View All {activeProduct.name} <ChevronRight size={13} />
                              </Link>
                            ) : (
                              <a href="#" className="inline-flex items-center gap-1 text-[#044c5c] text-[12.5px] hover:underline" style={{ fontWeight: 600 }}>
                                View All {activeProduct.name} <ChevronRight size={13} />
                              </a>
                            )}
                          </div>
                          {/* Promotional banner below groups */}
                          <div className="mt-auto pt-4">
                            <div className="relative overflow-hidden bg-gradient-to-r from-[#0B1A3E] to-[#1a2d5e] p-4 flex items-center gap-4">
                              <Sparkles size={18} className="text-[#67e8f9] flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-white text-[12.5px]" style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>
                                  Need Custom Branding?
                                </p>
                                <p className="text-white/55 text-[11px] mt-0.5">Get a quote for bulk orders with your logo</p>
                              </div>
                              <a href="#" className="bg-white/15 text-white text-[11px] px-3 py-1.5 hover:bg-white/25 transition-colors flex-shrink-0 whitespace-nowrap" style={{ fontWeight: 600 }}>
                                Get Quote →
                              </a>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Right - Category image (narrower) */}
                    <div className="col-span-3 py-5 pl-2 pr-0 flex flex-col">
                      {activeProduct && categoryImages[activeProduct.name] && (
                        <div className="relative overflow-hidden flex-1 min-h-[200px]">
                          <ImageWithFallback
                            src={categoryImages[activeProduct.name]}
                            alt={activeProduct.name}
                            className="w-full h-full object-cover absolute inset-0"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-3.5">
                            <span className="inline-block bg-white/15 backdrop-blur-sm text-white/90 text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider mb-1.5" style={{ fontWeight: 600 }}>
                              {activeProduct.subcategories.length}+ Products
                            </span>
                            <p className="text-white text-[14px] mb-0.5" style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>
                              {activeProduct.name}
                            </p>
                            <p className="text-white/65 text-[11px] mb-2.5">
                              Browse our curated collection
                            </p>
                            {categoryRoutes[activeProduct.name] ? (
                              <Link to={categoryRoutes[activeProduct.name]} className="inline-block bg-[#044c5c] text-white text-[11px] px-3 py-1.5 hover:bg-[#033a48] transition-colors" style={{ fontWeight: 600 }}>
                                Shop Now →
                              </Link>
                            ) : (
                              <a href="#" className="inline-block bg-[#044c5c] text-white text-[11px] px-3 py-1.5 hover:bg-[#033a48] transition-colors" style={{ fontWeight: 600 }}>
                                Shop Now →
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="max-w-[1400px] mx-auto">

              {/* ── BRANDS ── */}
              {activeMenu === "brands" && (
                <div className="px-8 py-5">
                  <h3 className="text-[#0B1A3E] text-[16px] mb-3" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                    Shop by Brand
                  </h3>

                  <div className="grid grid-cols-5 gap-1.5">
                    {brands.map((brand) => (
                      <a
                        key={brand.name}
                        href="#"
                        className="group flex items-center gap-2.5 py-2.5 px-3 border border-[#eaedf0] hover:border-[#044c5c]/25 hover:bg-[#f8fdfd] transition-all duration-150"
                      >
                        <div className="w-14 h-14 bg-[#f0fafb] flex items-center justify-center flex-shrink-0 group-hover:bg-[#044c5c] transition-colors overflow-hidden">
                          {brandImages[brand.name] ? (
                            <ImageWithFallback src={brandImages[brand.name]} alt={brand.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[18px] text-[#044c5c] group-hover:text-white transition-colors" style={{ fontWeight: 700 }}>{brand.name.charAt(0)}</span>
                          )}
                        </div>
                        <span className="text-[12px] text-[#444] group-hover:text-[#044c5c] transition-colors" style={{ fontWeight: 500 }}>
                          {brand.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* ── POPULAR ── */}
              {activeMenu === "popular" && (
                <div className="px-8 py-5">
                  <h3 className="text-[#0B1A3E] text-[16px] mb-3" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                    Popular Categories
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {popularCategories.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <a
                          key={cat.name}
                          href="#"
                          className="group flex items-center gap-3 p-3 border border-[#eaedf0] hover:border-[#044c5c]/25 hover:bg-[#f8fdfd] transition-all duration-150"
                        >
                          <div className="w-8 h-8 bg-[#f0fafb] flex items-center justify-center flex-shrink-0 group-hover:bg-[#044c5c] transition-colors">
                            <Icon size={15} className="text-[#044c5c] group-hover:text-white transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="text-[12.5px] text-[#222] group-hover:text-[#044c5c] transition-colors" style={{ fontWeight: 600 }}>
                                {cat.name}
                              </span>
                              <span className="text-[8.5px] bg-[#044c5c]/8 text-[#044c5c] px-1.5 py-0.5 rounded-full uppercase tracking-wider" style={{ fontWeight: 600 }}>
                                {cat.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#888]">{cat.desc}</p>
                          </div>
                          <ChevronRight size={14} className="text-[#ddd] group-hover:text-[#044c5c] transition-all flex-shrink-0" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}



              {/* ── HEATTRANSFER.COM ── */}
              {activeMenu === "heattransfer" && (
                <div className="px-8 py-5">
                  <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-8">
                      <h3 className="text-[#0B1A3E] text-[16px] mb-3" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                        Heattransfer.com
                      </h3>

                      {/* Printing Machineries */}
                      <p className="text-[10.5px] text-[#999] uppercase tracking-wider mb-2" style={{ fontWeight: 600 }}>Printing Machineries</p>
                      <div className="grid grid-cols-3 gap-1.5 mb-3">
                        {htPrintingMachines.map((item) => {
                          const Icon = item.icon;
                          return (
                            <a
                              key={item.name}
                              href="#"
                              className="group flex items-center gap-2.5 py-2 px-2.5 border border-[#eaedf0] hover:border-[#044c5c]/25 hover:bg-[#f8fdfd] transition-all duration-150"
                            >
                              <div className="w-7 h-7 bg-[#f0fafb] flex items-center justify-center flex-shrink-0 group-hover:bg-[#044c5c] transition-colors">
                                <Icon size={13} className="text-[#044c5c] group-hover:text-white transition-colors" />
                              </div>
                              <span className="text-[12px] text-[#444] group-hover:text-[#044c5c] transition-colors" style={{ fontWeight: 500 }}>
                                {item.name}
                              </span>
                            </a>
                          );
                        })}
                      </div>

                      {/* Printing Supplies */}
                      <p className="text-[10.5px] text-[#999] uppercase tracking-wider mb-2" style={{ fontWeight: 600 }}>Printing Supplies</p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {htPrintingSupplies.map((item) => {
                          const Icon = item.icon;
                          return (
                            <a
                              key={item.name}
                              href="#"
                              className="group flex items-center gap-2.5 py-2 px-2.5 border border-[#eaedf0] hover:border-[#044c5c]/25 hover:bg-[#f8fdfd] transition-all duration-150"
                            >
                              <div className="w-7 h-7 bg-[#f0fafb] flex items-center justify-center flex-shrink-0 group-hover:bg-[#044c5c] transition-colors">
                                <Icon size={13} className="text-[#044c5c] group-hover:text-white transition-colors" />
                              </div>
                              <span className="text-[12px] text-[#444] group-hover:text-[#044c5c] transition-colors" style={{ fontWeight: 500 }}>
                                {item.name}
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right sidebar */}
                    <div className="col-span-4">
                      <div className="bg-[#f6f7f9] p-4 h-full">
                        <h4 className="text-[#0B1A3E] text-[14px] mb-2.5" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                          Heattransfer Corner
                        </h4>
                        <div className="space-y-0.5">
                          {htCorner.map((item) => {
                            const Icon = item.icon;
                            return (
                              <a
                                key={item.name}
                                href={item.href}
                                className="group flex items-center gap-2.5 py-1.5 px-2 hover:bg-white transition-colors"
                              >
                                <div className="w-6 h-6 bg-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-[#e2f4f6] transition-colors">
                                  <Icon size={12} className="text-[#999] group-hover:text-[#044c5c] transition-colors" />
                                </div>
                                <span className="text-[12.5px] text-[#444] group-hover:text-[#044c5c] transition-colors" style={{ fontWeight: 500 }}>
                                  {item.name}
                                </span>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── ABOUT TEZKAR ── */}
              {activeMenu === "aboutus" && (
                <div className="px-8 py-5">
                  <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-8">
                      <h3 className="text-[#0B1A3E] text-[16px] mb-3" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                        About Tezkar
                      </h3>

                      {/* Company Group */}
                      <p className="text-[10.5px] text-[#999] uppercase tracking-wider mb-2" style={{ fontWeight: 600 }}>Company</p>
                      <div className="grid grid-cols-3 gap-1.5 mb-3">
                        {toolsAboutGroup.map((item) => {
                          const Icon = item.icon;
                          return (
                            <a
                              key={item.name}
                              href={item.href}
                              className="group flex items-center gap-2.5 py-2 px-2.5 border border-[#eaedf0] hover:border-[#044c5c]/25 hover:bg-[#f8fdfd] transition-all duration-150"
                            >
                              <div className="w-7 h-7 bg-[#f0fafb] flex items-center justify-center flex-shrink-0 group-hover:bg-[#044c5c] transition-colors">
                                <Icon size={13} className="text-[#044c5c] group-hover:text-white transition-colors" />
                              </div>
                              <span className="text-[12px] text-[#444] group-hover:text-[#044c5c] transition-colors" style={{ fontWeight: 500 }}>
                                {item.name}
                              </span>
                            </a>
                          );
                        })}
                      </div>

                      {/* Reseller & Partners Group */}
                      <p className="text-[10.5px] text-[#999] uppercase tracking-wider mb-2" style={{ fontWeight: 600 }}>Reseller & Partners</p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {toolsResellerGroup.map((item) => {
                          const Icon = item.icon;
                          return (
                            <a
                              key={item.name}
                              href={item.href}
                              className="group flex items-center gap-2.5 py-2 px-2.5 border border-[#eaedf0] hover:border-[#044c5c]/25 hover:bg-[#f8fdfd] transition-all duration-150"
                            >
                              <div className="w-7 h-7 bg-[#f0fafb] flex items-center justify-center flex-shrink-0 group-hover:bg-[#044c5c] transition-colors">
                                <Icon size={13} className="text-[#044c5c] group-hover:text-white transition-colors" />
                              </div>
                              <span className="text-[12px] text-[#444] group-hover:text-[#044c5c] transition-colors" style={{ fontWeight: 500 }}>
                                {item.name}
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right sidebar */}
                    <div className="col-span-4">
                      <div className="bg-[#f6f7f9] p-4 h-full">
                        <h4 className="text-[#0B1A3E] text-[14px] mb-2.5" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                          Quick Links
                        </h4>
                        <div className="space-y-0.5">
                          {toolsSidebarItems.map((item) => {
                            const Icon = item.icon;
                            return (
                              <a
                                key={item.name}
                                href={item.href}
                                className="group flex items-center gap-2.5 py-1.5 px-2 hover:bg-white transition-colors"
                              >
                                <div className="w-6 h-6 bg-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-[#e2f4f6] transition-colors">
                                  <Icon size={12} className="text-[#999] group-hover:text-[#044c5c] transition-colors" />
                                </div>
                                <span className="text-[12.5px] text-[#444] group-hover:text-[#044c5c] transition-colors" style={{ fontWeight: 500 }}>
                                  {item.name}
                                </span>
                              </a>
                            );
                          })}
                        </div>
                        <div className="mt-3 pt-2.5 border-t border-[#e5e7eb]">
                          <div className="space-y-1.5">
                            <a href="tel:+97142768824" className="flex items-center gap-2 text-[12px] text-[#444] hover:text-[#044c5c] transition-colors">
                              <div className="w-6 h-6 bg-white flex items-center justify-center shadow-sm">
                                <Phone size={11} className="text-[#044c5c]" />
                              </div>
                              +971 4 276 8824
                            </a>
                            <a href="mailto:info@tezkargift.com" className="flex items-center gap-2 text-[12px] text-[#444] hover:text-[#044c5c] transition-colors">
                              <div className="w-6 h-6 bg-white flex items-center justify-center shadow-sm">
                                <Mail size={11} className="text-[#044c5c]" />
                              </div>
                              info@tezkargift.com
                            </a>
                          </div>
                          <p className="text-[10.5px] text-[#999] flex items-center gap-1 mt-2">
                            <Clock size={10} /> Sun–Thu 9AM–6PM
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── ARTICLES ── */}
              {activeMenu === "articles" && (
                <div className="px-8 py-5">
                  <div className="grid grid-cols-12 gap-5">
                    {/* Main content - 8 cols */}
                    <div className="col-span-8">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[#0B1A3E] text-[16px]" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                          Latest Articles
                        </h3>
                        <a href="#" className="text-[12px] text-[#044c5c] hover:text-[#d41c5c] transition-colors" style={{ fontWeight: 600 }}>
                          View All Articles →
                        </a>
                      </div>
                      {/* Article categories */}
                      <div className="grid grid-cols-4 gap-x-4 gap-y-3">
                        {[
                          { title: "Corporate Gifting", items: ["Top 10 Corporate Gifts 2026", "Gifting Trends in UAE", "How to Choose Client Gifts"] },
                          { title: "Branding & Print", items: ["Logo Printing Techniques", "Laser vs UV Printing", "Packaging Design Tips"] },
                          { title: "Seasonal Guides", items: ["Ramadan Gift Guide", "National Day Ideas", "Holiday Season Picks"] },
                          { title: "Industry Insights", items: ["Sustainability in Gifting", "Eco-Friendly Materials", "Custom Merch for Events"] },
                          { title: "Employee Gifting", items: ["Onboarding Gift Kits", "Employee Appreciation Ideas", "Remote Team Gift Boxes"] },
                          { title: "Event & Exhibition", items: ["Trade Show Giveaways", "Conference Swag Ideas", "Exhibition Booth Essentials"] },
                          { title: "Product Spotlights", items: ["Best Drinkware of 2026", "Premium Pen Collections", "Tech Gadgets for Gifting"] },
                          { title: "How-To Guides", items: ["Bulk Ordering Tips", "Custom Embroidery 101", "Choosing the Right Material"] },
                        ].map((group) => (
                          <div key={group.title} className="min-w-0">
                            <p className="text-[11px] text-[#0B1A3E] mb-1.5 pb-1 border-b border-[#eaedf0] whitespace-nowrap" style={{ fontWeight: 600 }}>
                              {group.title}
                            </p>
                            <ul className="space-y-0">
                              {group.items.map((item) => (
                                <li key={item}>
                                  <a href="#" className="block text-[11.5px] text-[#555] hover:text-[#044c5c] py-[2.5px] transition-colors">
                                    {item}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {/* Featured articles row */}
                      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#eaedf0]">
                        {[
                          { title: "The Ultimate Guide to Corporate Gift Giving in 2026", tag: "Featured", icon: TrendingUp },
                          { title: "5 Eco-Friendly Promotional Products Your Brand Needs", tag: "Trending", icon: Leaf },
                          { title: "How Custom Packaging Elevates Your Brand Identity", tag: "New", icon: FileText },
                        ].map((article) => {
                          const Icon = article.icon;
                          return (
                            <a key={article.title} href="#" className="group flex items-center gap-2.5 p-2.5 border border-[#eaedf0] hover:border-[#044c5c]/25 hover:bg-[#f8fdfd] transition-all duration-150">
                              <div className="w-7 h-7 bg-[#f0fafb] flex items-center justify-center flex-shrink-0 group-hover:bg-[#044c5c] transition-colors">
                                <Icon size={13} className="text-[#044c5c] group-hover:text-white transition-colors" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="text-[8.5px] uppercase tracking-wider text-[#d41c5c]" style={{ fontWeight: 600 }}>{article.tag}</span>
                                <p className="text-[11px] text-[#333] group-hover:text-[#044c5c] transition-colors leading-snug" style={{ fontWeight: 500 }}>
                                  {article.title}
                                </p>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                    {/* Sidebar - 4 cols */}
                    <div className="col-span-4">
                      <div className="bg-[#f6f7f9] p-4 h-full">
                        <h4 className="text-[#0B1A3E] text-[14px] mb-2.5" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                          Popular Topics
                        </h4>
                        <div className="space-y-0.5">
                          {[
                            { name: "Gift Ideas", icon: Gift, count: "24 articles" },
                            { name: "Printing Tips", icon: Printer, count: "18 articles" },
                            { name: "Brand Strategy", icon: TrendingUp, count: "12 articles" },
                            { name: "Event Planning", icon: Calendar, count: "15 articles" },
                            { name: "Product Reviews", icon: Star, count: "20 articles" },
                            { name: "Sustainability", icon: Leaf, count: "9 articles" },
                          ].map((topic) => {
                            const Icon = topic.icon;
                            return (
                              <a key={topic.name} href="#" className="group flex items-center gap-2.5 py-1.5 px-2 hover:bg-white transition-colors">
                                <div className="w-6 h-6 bg-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-[#e2f4f6] transition-colors">
                                  <Icon size={12} className="text-[#044c5c]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[12px] text-[#333] group-hover:text-[#044c5c] transition-colors" style={{ fontWeight: 500 }}>{topic.name}</p>
                                  <p className="text-[10px] text-[#999]">{topic.count}</p>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                        <div className="mt-2.5 pt-2 border-t border-[#e0e2e5]">
                          <div className="flex items-center gap-2 text-[11px] text-[#666]">
                            <Newspaper size={12} className="text-[#044c5c]" />
                            <span>Subscribe to our newsletter for latest articles</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes megaSlide {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
      `}</style>
    </nav>
  );
}