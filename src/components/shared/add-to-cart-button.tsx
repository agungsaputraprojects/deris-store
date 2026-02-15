"use client";

import { useState } from "react";
import { ShoppingCart, Minus, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, isInCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const inCart = isInCart(product.id);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Jumlah</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1.5 border border-gray-100">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-9 h-9 rounded-lg bg-white shadow-sm hover:bg-gray-50 flex items-center justify-center transition-all text-gray-600 disabled:opacity-40"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-black text-lg">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
              disabled={quantity >= product.stock}
              className="w-9 h-9 rounded-lg bg-white shadow-sm hover:bg-gray-50 flex items-center justify-center transition-all text-gray-600 disabled:opacity-40"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-sm text-gray-500">
            Stok: <span className="font-semibold">{product.stock}</span>
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button
          size="lg"
          className={cn(
            "flex-1 gap-2 h-12 font-bold text-base transition-all",
            added
              ? "bg-emerald-600 hover:bg-emerald-700"
              : inCart
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-orange-600 hover:bg-orange-700",
          )}
          disabled={product.stock === 0}
          onClick={handleAddToCart}
        >
          {added ? (
            <>
              <Check className="w-5 h-5" />
              Ditambahkan!
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              {inCart ? "Tambah Lagi" : "Tambah ke Keranjang"}
            </>
          )}
        </Button>

        <Button
          size="lg"
          variant="outline"
          className={cn(
            "h-12 w-12 p-0 rounded-xl border-2 transition-all",
            wishlisted
              ? "border-rose-200 bg-rose-50 hover:bg-rose-100"
              : "border-gray-200 hover:border-rose-200 hover:bg-rose-50",
          )}
          onClick={() => toggle(product.id)}
        >
          <Heart
            className={cn(
              "w-5 h-5 transition-all",
              wishlisted ? "fill-rose-500 text-rose-500" : "text-gray-400",
            )}
          />
        </Button>
      </div>
    </div>
  );
}
