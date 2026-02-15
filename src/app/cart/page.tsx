"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  Truck,
  ArrowLeft,
  ArrowRight,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";
import { FREE_SHIPPING_MIN } from "@/constants";

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    shippingCost,
    total,
    totalDiscount,
    updateQuantity,
    removeItem,
  } = useCart();

  const progressToFreeShipping = Math.min(
    (subtotal / FREE_SHIPPING_MIN) * 100,
    100,
  );
  const amountToFreeShipping = Math.max(FREE_SHIPPING_MIN - subtotal, 0);

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-gray-300" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">
            Keranjang Kosong
          </h2>
          <p className="text-gray-500 mb-8 text-sm">
            Mulai tambahkan produk ke keranjang belanja Anda
          </p>
          <Link href="/products">
            <Button className="gap-2 bg-orange-600 hover:bg-orange-700">
              Mulai Belanja <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-x-hidden">
      <div className="w-full max-w-screen-xl mx-auto px-4 py-6 md:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900">
              Keranjang Belanja
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              {itemCount} item dipilih
            </p>
          </div>
          <Link href="/products">
            <Button
              variant="ghost"
              className="gap-1 text-gray-600 text-sm px-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Lanjut Belanja</span>
            </Button>
          </Link>
        </div>

        {/* Free Shipping Progress */}
        {amountToFreeShipping > 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Truck className="w-4 h-4 text-orange-600 shrink-0" />
              <p className="text-xs md:text-sm font-medium text-gray-700">
                Tambah{" "}
                <span className="text-orange-600 font-bold">
                  {formatCurrency(amountToFreeShipping)}
                </span>{" "}
                lagi untuk <span className="font-bold">Gratis Ongkir!</span>
              </p>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-4 mb-5 flex items-center gap-3">
            <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
            <p className="text-xs md:text-sm font-medium text-emerald-700">
              Yeay! Kamu mendapatkan{" "}
              <span className="font-bold">Gratis Ongkir! 🎉</span>
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
              >
                <div className="flex gap-3">
                  {/* Image */}
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="shrink-0"
                  >
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gray-50">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-orange-600 font-semibold mb-0.5">
                          {item.product.brand}
                        </p>
                        <Link href={`/products/${item.product.slug}`}>
                          <h3 className="font-bold text-gray-900 text-xs md:text-sm leading-snug hover:text-orange-600 transition-colors line-clamp-2">
                            {item.product.name}
                          </h3>
                        </Link>
                        {item.product.discount && item.product.discount > 0 && (
                          <span className="inline-block mt-1 bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            -{item.product.discount}%
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="shrink-0 text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity */}
                      <div className="flex items-center gap-1.5 bg-gray-50 rounded-xl p-1 border border-gray-100">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-lg bg-white shadow-sm hover:bg-gray-50 flex items-center justify-center transition-all text-gray-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.product.stock}
                          className="w-7 h-7 rounded-lg bg-white shadow-sm hover:bg-gray-50 flex items-center justify-center transition-all text-gray-600 disabled:opacity-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-bold text-gray-900 text-sm md:text-base">
                          {formatCurrency(item.product.price * item.quantity)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-[10px] text-gray-400">
                            {formatCurrency(item.product.price)} / item
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:sticky lg:top-24">
              <h2 className="font-black text-lg text-gray-900 mb-5">
                Ringkasan Pesanan
              </h2>

              {/* Coupon */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-gray-700 mb-2 block">
                  Kode Voucher
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Masukkan kode"
                    className="flex-1 text-sm h-9"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="shrink-0 border-orange-200 text-orange-600 hover:bg-orange-50 h-9 w-9 p-0"
                  >
                    <Tag className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 mb-5 pb-5 border-b">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Subtotal ({itemCount} item)
                  </span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Hemat</span>
                    <span className="font-medium text-emerald-600">
                      -{formatCurrency(totalDiscount)}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> Ongkos Kirim
                  </span>
                  {shippingCost === 0 ? (
                    <span className="font-medium text-emerald-600">
                      Gratis!
                    </span>
                  ) : (
                    <span className="font-medium text-gray-900">
                      {formatCurrency(shippingCost)}
                    </span>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-black text-gray-900">Total</span>
                <span className="font-black text-xl text-orange-600">
                  {formatCurrency(total)}
                </span>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout">
                <Button className="w-full gap-2 bg-orange-600 hover:bg-orange-700 h-11 text-sm font-bold">
                  Lanjut ke Pembayaran
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              {/* Payment Methods */}
              <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t flex-wrap">
                {["VISA", "MC", "GoPay", "OVO", "DANA"].map((p) => (
                  <span key={p} className="text-xs text-gray-400 font-medium">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
