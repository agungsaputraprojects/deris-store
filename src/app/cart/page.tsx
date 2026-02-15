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
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-gray-300" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">
            Keranjang Kosong
          </h2>
          <p className="text-gray-500 mb-8">
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
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">
              Keranjang Belanja
            </h1>
            <p className="text-gray-500 mt-1">{itemCount} item dipilih</p>
          </div>
          <Link href="/products">
            <Button variant="ghost" className="gap-2 text-gray-600">
              <ArrowLeft className="w-4 h-4" />
              Lanjut Belanja
            </Button>
          </Link>
        </div>

        {/* Free Shipping Progress */}
        {amountToFreeShipping > 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Truck className="w-5 h-5 text-orange-600" />
              <p className="text-sm font-medium text-gray-700">
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
          <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-4 mb-6 flex items-center gap-3">
            <Truck className="w-5 h-5 text-emerald-600" />
            <p className="text-sm font-medium text-emerald-700">
              Yeay! Kamu mendapatkan{" "}
              <span className="font-bold">Gratis Ongkir! 🎉</span>
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="shrink-0"
                  >
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50">
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
                          <h3 className="font-bold text-gray-900 text-sm leading-snug hover:text-orange-600 transition-colors line-clamp-2">
                            {item.product.name}
                          </h3>
                        </Link>
                        {item.product.discount && item.product.discount > 0 && (
                          <span className="inline-block mt-1.5 bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded-full">
                            -{item.product.discount}%
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="shrink-0 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-lg bg-white shadow-sm hover:bg-gray-50 flex items-center justify-center transition-all text-gray-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-bold text-sm">
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
                        <p className="font-bold text-gray-900">
                          {formatCurrency(item.product.price * item.quantity)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-400">
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
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h2 className="font-black text-xl text-gray-900 mb-6">
                Ringkasan Pesanan
              </h2>

              {/* Coupon */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Kode Voucher
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Masukkan kode"
                    className="flex-1 text-sm"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="shrink-0 border-orange-200 text-orange-600 hover:bg-orange-50"
                  >
                    <Tag className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b">
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
              <div className="flex items-center justify-between mb-6">
                <span className="font-black text-gray-900 text-lg">Total</span>
                <span className="font-black text-2xl text-orange-600">
                  {formatCurrency(total)}
                </span>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout">
                <Button className="w-full gap-2 bg-orange-600 hover:bg-orange-700 h-12 text-base font-bold">
                  Lanjut ke Pembayaran
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>

              {/* Payment Methods */}
              <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t">
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
