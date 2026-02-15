// =====================
// Product Types
// =====================
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  categorySlug: string;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  sku: string;
}

// =====================
// Category Types
// =====================
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  productCount: number;
}

// =====================
// Cart Types
// =====================
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

// =====================
// User Types
// =====================
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "customer" | "admin";
  createdAt: Date;
}

export interface Address {
  id: string;
  type: "shipping" | "billing";
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

// =====================
// Order Types
// =====================
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: OrderStatus;
  shippingAddress: Address;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  trackingNumber?: string;
}

// =====================
// Filter & Sort Types
// =====================
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  brand?: string[];
  inStock?: boolean;
  isNew?: boolean;
}

export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "popular"
  | "discount";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// =====================
// API Response Types
// =====================
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  meta?: PaginationMeta;
}
