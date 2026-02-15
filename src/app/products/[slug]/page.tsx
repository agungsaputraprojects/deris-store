import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  Shield,
  Truck,
  RefreshCw,
  ChevronRight,
  Package,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/shared/product-card";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/services/productService";
import { formatCurrency, getStockStatus } from "@/lib/utils";
import AddToCartButton from "@/components/shared/add-to-cart-button";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  const productRes = await getProductBySlug(slug);
  const product = productRes.data;
  if (!product) notFound();

  const relatedRes = await getRelatedProducts(product.id, product.categorySlug);
  const relatedProducts = relatedRes.data ?? [];

  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600 transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href="/products"
              className="hover:text-orange-600 transition-colors"
            >
              Produk
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href={`/products?category=${product.categorySlug}`}
              className="hover:text-orange-600 transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium line-clamp-1">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.discount && product.discount > 0 && (
                  <span className="bg-rose-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    -{product.discount}%
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-sky-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    Baru
                  </span>
                )}
                {product.isBestseller && (
                  <span className="bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    Best Seller
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="text-xs">
                {product.brand}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
            </div>

            <h1 className="text-3xl font-black text-gray-900 leading-tight mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6 pb-6 border-b">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-100 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-gray-900">{product.rating}</span>
              <span className="text-gray-400 text-sm">
                ({product.reviewCount.toLocaleString("id-ID")} ulasan)
              </span>
              <span className="text-gray-300">|</span>
              <span className={`text-sm font-semibold ${stockStatus.color}`}>
                {stockStatus.label}
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-gray-900">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>
              {product.discount && product.discount > 0 && (
                <p className="text-emerald-600 text-sm font-semibold mt-1">
                  Hemat{" "}
                  {formatCurrency((product.originalPrice || 0) - product.price)}{" "}
                  ({product.discount}% OFF)
                </p>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-2">
                SKU: <span className="font-mono">{product.sku}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <AddToCartButton product={product} />

            <div className="grid grid-cols-2 gap-3 mt-6">
              {[
                {
                  icon: Truck,
                  title: "Gratis Ongkir",
                  desc: "Min. Rp 500.000",
                  color: "text-orange-600",
                  bg: "bg-orange-50",
                },
                {
                  icon: Shield,
                  title: "100% Original",
                  desc: "Garansi resmi",
                  color: "text-emerald-600",
                  bg: "bg-emerald-50",
                },
                {
                  icon: RefreshCw,
                  title: "30 Hari Return",
                  desc: "Mudah & gratis",
                  color: "text-sky-600",
                  bg: "bg-sky-50",
                },
                {
                  icon: Package,
                  title: "Aman Dikemas",
                  desc: "Packaging premium",
                  color: "text-purple-600",
                  bg: "bg-purple-50",
                },
              ].map(({ icon: Icon, title, desc, color, bg }) => (
                <div
                  key={title}
                  className={`flex items-center gap-3 p-3 rounded-2xl ${bg}`}
                >
                  <Icon className={`w-5 h-5 ${color} shrink-0`} />
                  <div>
                    <p className="text-xs font-bold text-gray-900">{title}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-gray-900">
                Produk Serupa
              </h2>
              <Link
                href={`/products?category=${product.categorySlug}`}
                className="text-orange-600 text-sm font-semibold hover:underline"
              >
                Lihat Semua
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
