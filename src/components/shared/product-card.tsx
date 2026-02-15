"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { formatCurrency, cn, getStockStatus } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addItem, isInCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const inCart = isInCart(product.id);
  const wishlisted = isWishlisted(product.id);
  const stockStatus = getStockStatus(product.stock);

  return (
    <div
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
        className,
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.discount && product.discount > 0 && (
            <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded-full">
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-sky-100 text-sky-700 text-xs font-bold px-2 py-0.5 rounded-full">
              Baru
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
              Best Seller
            </span>
          )}
        </div>

        {/* Action Buttons Hover */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button
            className={cn(
              "w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm shadow-md hover:bg-white border border-gray-100 flex items-center justify-center transition-all",
              wishlisted && "text-rose-500",
            )}
            onClick={() => toggle(product.id)}
          >
            <Heart className={cn("h-4 w-4", wishlisted && "fill-rose-500")} />
          </button>
          <Link href={`/products/${product.slug}`}>
            <button className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm shadow-md hover:bg-white border border-gray-100 flex items-center justify-center transition-all">
              <Eye className="h-4 w-4" />
            </button>
          </Link>
        </div>

        {/* Out of Stock Overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
            <span className="font-bold text-gray-500 text-sm bg-white px-4 py-2 rounded-full shadow-sm">
              Stok Habis
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand & Category */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-400 font-medium">
            {product.brand}
          </span>
          <span className="text-xs text-gray-400">{product.category}</span>
        </div>

        {/* Product Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 hover:text-orange-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-100 text-gray-200",
                )}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {product.rating} ({product.reviewCount.toLocaleString("id-ID")})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-bold text-gray-900 text-base">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock + Add to Cart */}
        <div className="flex items-center gap-2">
          <span className={cn("text-xs font-medium", stockStatus.color)}>
            {stockStatus.label}
          </span>
          <Button
            size="sm"
            className={cn(
              "ml-auto rounded-xl text-xs h-8 gap-1.5",
              inCart
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-orange-600 hover:bg-orange-700",
            )}
            disabled={product.stock === 0}
            onClick={() => addItem(product)}
          >
            <ShoppingCart className="h-3 w-3" />
            {inCart ? "Ditambahkan" : "Tambah"}
          </Button>
        </div>
      </div>
    </div>
  );
}
