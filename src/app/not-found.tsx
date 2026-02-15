import Link from "next/link";
import { Home, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/shared/back-button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="text-[120px] md:text-[160px] font-black text-gray-100 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8">
          Ups! Halaman yang kamu cari tidak ada atau sudah dipindahkan. Yuk
          kembali dan lanjutkan belanja!
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/">
            <Button className="gap-2 bg-orange-600 hover:bg-orange-700 w-full sm:w-auto font-bold">
              <Home className="w-4 h-4" />
              Kembali ke Beranda
            </Button>
          </Link>
          <Link href="/products">
            <Button
              variant="outline"
              className="gap-2 border-orange-200 text-orange-600 hover:bg-orange-50 w-full sm:w-auto font-bold"
            >
              <Search className="w-4 h-4" />
              Jelajahi Produk
            </Button>
          </Link>
        </div>

        {/* Back Button - client component */}
        <BackButton />

        {/* Popular Links */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-400 font-medium mb-4">
            HALAMAN POPULER
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: "Produk Baru", href: "/products?filter=new" },
              { label: "Best Seller", href: "/products?filter=bestseller" },
              { label: "Promo", href: "/products?filter=sale" },
              { label: "Keranjang", href: "/cart" },
              { label: "Wishlist", href: "/wishlist" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
