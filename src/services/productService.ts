import {
  Product,
  ProductFilters,
  SortOption,
  ApiResponse,
  PaginationMeta,
} from "@/types";
import { PRODUCTS, DEFAULT_PAGE_SIZE } from "@/constants";

/**
 * Get all products with optional filtering, sorting, and pagination
 */
export async function getProducts(
  filters?: ProductFilters,
  sort?: SortOption,
  page: number = 1,
  limit: number = DEFAULT_PAGE_SIZE,
): Promise<ApiResponse<Product[]>> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  let filtered = [...PRODUCTS];

  // Apply filters
  if (filters) {
    if (filters.category) {
      filtered = filtered.filter((p) => p.categorySlug === filters.category);
    }
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
    }
    if (filters.rating !== undefined) {
      filtered = filtered.filter((p) => p.rating >= filters.rating!);
    }
    if (filters.brand && filters.brand.length > 0) {
      filtered = filtered.filter((p) => filters.brand!.includes(p.brand));
    }
    if (filters.inStock) {
      filtered = filtered.filter((p) => p.stock > 0);
    }
    if (filters.isNew) {
      filtered = filtered.filter((p) => p.isNew);
    }
  }

  // Apply sorting
  if (sort) {
    switch (sort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "discount":
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        break;
    }
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  const meta: PaginationMeta = { page, limit, total, totalPages };

  return { data: paginated, success: true, meta };
}

/**
 * Get single product by slug
 */
export async function getProductBySlug(
  slug: string,
): Promise<ApiResponse<Product | null>> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const product = PRODUCTS.find((p) => p.slug === slug) || null;
  return {
    data: product,
    success: !!product,
    message: product ? undefined : "Produk tidak ditemukan",
  };
}

/**
 * Get featured products
 */
export async function getFeaturedProducts(
  limit: number = 4,
): Promise<ApiResponse<Product[]>> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const featured = PRODUCTS.filter((p) => p.isFeatured).slice(0, limit);
  return { data: featured, success: true };
}

/**
 * Get bestseller products
 */
export async function getBestsellerProducts(
  limit: number = 8,
): Promise<ApiResponse<Product[]>> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller)
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit);
  return { data: bestsellers, success: true };
}

/**
 * Get related products by category
 */
export async function getRelatedProducts(
  productId: string,
  categorySlug: string,
  limit: number = 4,
): Promise<ApiResponse<Product[]>> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const related = PRODUCTS.filter(
    (p) => p.categorySlug === categorySlug && p.id !== productId,
  ).slice(0, limit);
  return { data: related, success: true };
}

/**
 * Search products by query
 */
export async function searchProducts(
  query: string,
): Promise<ApiResponse<Product[]>> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const q = query.toLowerCase();
  const results = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q)),
  );
  return { data: results, success: true };
}
