import { Suspense } from "react";
import Link from "next/link";
import { SlidersHorizontal, Search } from "lucide-react";
import ProductCard from "@/components/shared/product-card";
import { getProducts } from "@/services/productService";
import { CATEGORIES, SORT_OPTIONS } from "@/constants";
import { ProductFilters, SortOption } from "@/types";

interface SearchParams {
  category?: string;
  q?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
  filter?: string;
  page?: string;
}

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;

  const filters: ProductFilters = {
    category: params.category,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    isNew: params.filter === "new" ? true : undefined,
  };

  const sort = (params.sort as SortOption) || "newest";
  const page = Number(params.page) || 1;

  const res = await getProducts(filters, sort, page, 12);
  const products = res.data;
  const meta = res.meta;

  const title = params.category
    ? CATEGORIES.find((c) => c.slug === params.category)?.name || "Produk"
    : params.q
      ? `Hasil pencarian: "${params.q}"`
      : params.filter === "new"
        ? "Produk Terbaru"
        : params.filter === "featured"
          ? "Produk Unggulan"
          : params.filter === "bestseller"
            ? "Best Sellers"
            : "Semua Produk";

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-black text-gray-900 mb-1">{title}</h1>
          <p className="text-gray-500 text-sm">
            {meta?.total ?? products.length} produk ditemukan
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24 space-y-6">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-orange-600" />
                <h2 className="font-black text-gray-900">Filter</h2>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-bold text-sm text-gray-700 mb-3">
                  Kategori
                </h3>
                <div className="space-y-1">
                  <Link
                    href="/products"
                    className={`block text-sm px-3 py-2 rounded-xl transition-all ${
                      !params.category
                        ? "bg-orange-50 text-orange-600 font-semibold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Semua Kategori
                  </Link>
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${cat.slug}`}
                      className={`flex items-center justify-between text-sm px-3 py-2 rounded-xl transition-all ${
                        params.category === cat.slug
                          ? "bg-orange-50 text-orange-600 font-semibold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-gray-400">
                        {cat.productCount}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-bold text-sm text-gray-700 mb-3">Harga</h3>
                <div className="space-y-1">
                  {[
                    { label: "Semua Harga", min: 0, max: 0 },
                    { label: "Di bawah Rp 500rb", min: 0, max: 500000 },
                    { label: "Rp 500rb - Rp 2jt", min: 500000, max: 2000000 },
                    { label: "Rp 2jt - Rp 10jt", min: 2000000, max: 10000000 },
                    { label: "Di atas Rp 10jt", min: 10000000, max: 0 },
                  ].map((range) => {
                    const isActive =
                      Number(params.minPrice) === range.min &&
                      Number(params.maxPrice) === range.max;
                    const catParam = params.category
                      ? `&category=${params.category}`
                      : "";
                    const href =
                      range.min === 0 && range.max === 0
                        ? `/products${params.category ? `?category=${params.category}` : ""}`
                        : `/products?minPrice=${range.min}${range.max ? `&maxPrice=${range.max}` : ""}${catParam}`;
                    return (
                      <Link
                        key={range.label}
                        href={href}
                        className={`block text-sm px-3 py-2 rounded-xl transition-all ${
                          isActive
                            ? "bg-orange-50 text-orange-600 font-semibold"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {range.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Filter Type */}
              <div>
                <h3 className="font-bold text-sm text-gray-700 mb-3">
                  Tipe Produk
                </h3>
                <div className="space-y-1">
                  {[
                    { label: "Semua", value: "" },
                    { label: "Produk Baru", value: "new" },
                    { label: "Best Seller", value: "bestseller" },
                    { label: "Produk Unggulan", value: "featured" },
                    { label: "Promo / Diskon", value: "sale" },
                  ].map((f) => {
                    const catParam = params.category
                      ? `${f.value ? "&" : ""}category=${params.category}`
                      : "";
                    const href = `/products${f.value || catParam ? "?" : ""}${f.value ? `filter=${f.value}` : ""}${catParam}`;
                    const isActive =
                      params.filter === f.value || (!params.filter && !f.value);
                    return (
                      <Link
                        key={f.value || "all"}
                        href={href}
                        className={`block text-sm px-3 py-2 rounded-xl transition-all ${
                          isActive
                            ? "bg-orange-50 text-orange-600 font-semibold"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {f.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500 hidden sm:block">
                Menampilkan{" "}
                <span className="font-semibold text-gray-900">
                  {products.length}
                </span>{" "}
                dari{" "}
                <span className="font-semibold text-gray-900">
                  {meta?.total ?? products.length}
                </span>{" "}
                produk
              </p>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-500 hidden sm:block">
                  Urutkan:
                </span>
                <select
                  className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                  defaultValue={sort}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products */}
            <Suspense
              fallback={<div className="text-center py-10">Loading...</div>}
            >
              {products.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-10 h-10 text-gray-300" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">
                    Produk tidak ditemukan
                  </h3>
                  <p className="text-gray-500">
                    Coba ubah filter atau kata kunci pencarian
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </Suspense>

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                {Array.from({ length: meta.totalPages }).map((_, i) => (
                  <Link
                    key={i}
                    href={`/products?page=${i + 1}${params.category ? `&category=${params.category}` : ""}${params.sort ? `&sort=${params.sort}` : ""}`}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                      page === i + 1
                        ? "bg-orange-600 text-white shadow-md"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-orange-200 hover:text-orange-600"
                    }`}
                  >
                    {i + 1}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
