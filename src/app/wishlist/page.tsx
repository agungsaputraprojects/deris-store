"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { PRODUCTS } from "@/constants";
import { formatCurrency, cn } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlist, toggle } = useWishlist();
  const { addItem, isInCart } = useCart();
  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3">
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
            <div>
              <h1 className="text-3xl font-black text-gray-900">
                Wishlist Saya
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                {wishlistedProducts.length} produk tersimpan
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {wishlistedProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-rose-300" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">
              Wishlist masih kosong
            </h3>
            <p className="text-gray-500 mb-6">
              Simpan produk favoritmu di sini
            </p>
            <Link href="/products">
              <Button className="gap-2 bg-orange-600 hover:bg-orange-700">
                Jelajahi Produk <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <Link href={`/products/${product.slug}`}>
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    {/* Remove from wishlist */}
                    <button
                      onClick={() => toggle(product.id)}
                      className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-white/90 shadow-md flex items-center justify-center hover:bg-rose-50 transition-all"
                    >
                      <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    </button>
                    {product.discount && product.discount > 0 && (
                      <span className="absolute top-3 left-3 bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded-full">
                        -{product.discount}%
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-xs text-gray-400 font-medium mb-1">
                      {product.brand}
                    </p>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 hover:text-orange-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="font-bold text-gray-900">
                        {formatCurrency(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatCurrency(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className={cn(
                        "w-full rounded-xl gap-2",
                        isInCart(product.id)
                          ? "bg-emerald-600 hover:bg-emerald-700"
                          : "bg-orange-600 hover:bg-orange-700",
                      )}
                      disabled={product.stock === 0}
                      onClick={() => addItem(product)}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      {isInCart(product.id)
                        ? "Sudah di Keranjang"
                        : "Tambah ke Keranjang"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Action */}
            <div className="text-center mt-10">
              <Link href="/products">
                <Button
                  variant="outline"
                  className="gap-2 border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  Lanjut Belanja <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
