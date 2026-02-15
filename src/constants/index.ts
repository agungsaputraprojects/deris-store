import { Category, Product } from "@/types";

// =====================
// App Constants
// =====================
export const APP_NAME = "Deris Store";
export const APP_DESCRIPTION = "Premium e-commerce experience";

// =====================
// Navigation
// =====================
export const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Produk", href: "/products" },
  { label: "Kategori", href: "/categories" },
  { label: "Promo", href: "/products?filter=sale" },
  { label: "Tentang Kami", href: "/about" },
] as const;

// =====================
// Categories
// =====================
export const CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Elektronik",
    slug: "elektronik",
    description: "Gadget, perangkat, dan aksesori teknologi terbaru",
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&q=80",
    productCount: 124,
  },
  {
    id: "2",
    name: "Fashion",
    slug: "fashion",
    description: "Pakaian dan aksesori trendi untuk pria & wanita",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80",
    productCount: 256,
  },
  {
    id: "3",
    name: "Rumah & Dapur",
    slug: "rumah-dapur",
    description: "Perabot dan peralatan rumah tangga berkualitas",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
    productCount: 89,
  },
  {
    id: "4",
    name: "Olahraga",
    slug: "olahraga",
    description: "Peralatan dan pakaian olahraga premium",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    productCount: 67,
  },
  {
    id: "5",
    name: "Kecantikan",
    slug: "kecantikan",
    description: "Produk perawatan tubuh dan kosmetik terpilih",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80",
    productCount: 145,
  },
  {
    id: "6",
    name: "Buku",
    slug: "buku",
    description: "Koleksi buku dari berbagai genre dan penulis",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    productCount: 312,
  },
];

// =====================
// Products Mock Data
// =====================
export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "iPhone 15 Pro Max 256GB",
    slug: "iphone-15-pro-max-256gb",
    description:
      "Smartphone flagship Apple dengan chip A17 Pro, kamera 48MP, dan layar Super Retina XDR 6.7 inci. Hadir dengan material titanium premium dan Dynamic Island.",
    price: 21999000,
    originalPrice: 24999000,
    discount: 12,
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80",
    ],
    category: "Elektronik",
    categorySlug: "elektronik",
    brand: "Apple",
    rating: 4.9,
    reviewCount: 2847,
    stock: 45,
    tags: ["smartphone", "flagship", "ios"],
    isNew: true,
    isFeatured: true,
    isBestseller: true,
    sku: "IPH15PM256",
  },
  {
    id: "p2",
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    description:
      "Smartphone Android premium dengan S Pen, kamera 200MP, dan layar Dynamic AMOLED 2X 6.8 inci.",
    price: 19499000,
    originalPrice: 21999000,
    discount: 11,
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80",
    ],
    category: "Elektronik",
    categorySlug: "elektronik",
    brand: "Samsung",
    rating: 4.8,
    reviewCount: 1923,
    stock: 32,
    tags: ["smartphone", "android", "flagship"],
    isFeatured: true,
    isBestseller: true,
    sku: "SGS24U",
  },
  {
    id: "p3",
    name: "Sony WH-1000XM5 Wireless",
    slug: "sony-wh-1000xm5-wireless",
    description:
      "Headphone over-ear dengan noise cancellation terbaik di kelasnya. Baterai 30 jam dan kualitas audio Hi-Res.",
    price: 4999000,
    originalPrice: 5999000,
    discount: 17,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    ],
    category: "Elektronik",
    categorySlug: "elektronik",
    brand: "Sony",
    rating: 4.7,
    reviewCount: 3412,
    stock: 78,
    tags: ["headphone", "wireless", "noise-cancelling"],
    isBestseller: true,
    sku: "SNWH1000XM5",
  },
  {
    id: "p4",
    name: "Jaket Bomber Premium Pria",
    slug: "jaket-bomber-premium-pria",
    description:
      "Jaket bomber dengan bahan nylon premium, lapisan fleece hangat, dan finishing anti-air.",
    price: 899000,
    originalPrice: 1299000,
    discount: 31,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    ],
    category: "Fashion",
    categorySlug: "fashion",
    brand: "UrbanWear",
    rating: 4.5,
    reviewCount: 567,
    stock: 124,
    tags: ["jaket", "pria", "bomber"],
    isNew: true,
    sku: "JWBP001",
  },
  {
    id: "p5",
    name: "Air Jordan 1 Retro High OG",
    slug: "air-jordan-1-retro-high-og",
    description:
      "Sneaker ikonik Air Jordan 1 dengan desain klasik retro. Upper leather premium, sole Nike Air.",
    price: 2499000,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    ],
    category: "Fashion",
    categorySlug: "fashion",
    brand: "Nike",
    rating: 4.9,
    reviewCount: 4521,
    stock: 23,
    tags: ["sneaker", "jordan", "nike", "retro"],
    isFeatured: true,
    isBestseller: true,
    sku: "AJ1RHOGCHI",
  },
  {
    id: "p6",
    name: "Blender Nutri Ninja Pro",
    slug: "blender-nutri-ninja-pro",
    description:
      "Blender berkekuatan 1000W dengan teknologi Pro Extractor. Cocok untuk smoothie dan jus.",
    price: 1299000,
    originalPrice: 1699000,
    discount: 24,
    images: [
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=80",
    ],
    category: "Rumah & Dapur",
    categorySlug: "rumah-dapur",
    brand: "Ninja",
    rating: 4.6,
    reviewCount: 892,
    stock: 56,
    tags: ["blender", "dapur", "smoothie"],
    sku: "BNP1000",
  },
  {
    id: "p7",
    name: "Yoga Mat Premium Non-Slip",
    slug: "yoga-mat-premium-non-slip",
    description:
      "Yoga mat TPE eco-friendly dengan ketebalan 6mm, permukaan non-slip double sided.",
    price: 399000,
    originalPrice: 549000,
    discount: 27,
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
    ],
    category: "Olahraga",
    categorySlug: "olahraga",
    brand: "FitLife",
    rating: 4.4,
    reviewCount: 1203,
    stock: 200,
    tags: ["yoga", "olahraga", "fitness"],
    sku: "YMNS6MM",
  },
  {
    id: "p8",
    name: "Serum Vitamin C 20% Brightening",
    slug: "serum-vitamin-c-20-brightening",
    description:
      "Serum vitamin C konsentrasi tinggi dengan niacinamide dan hyaluronic acid. Mencerahkan kulit dalam 2 minggu.",
    price: 249000,
    originalPrice: 349000,
    discount: 29,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80",
    ],
    category: "Kecantikan",
    categorySlug: "kecantikan",
    brand: "Glow Lab",
    rating: 4.7,
    reviewCount: 2156,
    stock: 345,
    tags: ["skincare", "serum", "brightening"],
    isBestseller: true,
    sku: "SVCB20",
  },
];

// =====================
// Sorting Options
// =====================
export const SORT_OPTIONS = [
  { label: "Terbaru", value: "newest" },
  { label: "Harga: Termurah", value: "price-asc" },
  { label: "Harga: Termahal", value: "price-desc" },
  { label: "Rating Tertinggi", value: "rating" },
  { label: "Terpopuler", value: "popular" },
  { label: "Diskon Terbesar", value: "discount" },
] as const;

// =====================
// Price Ranges
// =====================
export const PRICE_RANGES = [
  { label: "Di bawah Rp 100.000", min: 0, max: 100000 },
  { label: "Rp 100.000 - Rp 500.000", min: 100000, max: 500000 },
  { label: "Rp 500.000 - Rp 1.000.000", min: 500000, max: 1000000 },
  { label: "Rp 1.000.000 - Rp 5.000.000", min: 1000000, max: 5000000 },
  { label: "Di atas Rp 5.000.000", min: 5000000, max: Infinity },
] as const;

// =====================
// Shipping Constants
// =====================
export const FREE_SHIPPING_MIN = 500000;
export const SHIPPING_COST = 25000;

// =====================
// Pagination
// =====================
export const DEFAULT_PAGE_SIZE = 12;
