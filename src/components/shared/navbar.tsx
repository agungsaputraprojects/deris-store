"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, Heart, User, Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

const NAV_ITEMS = [
  { href: "/", label: "Beranda" },
  { href: "/products", label: "Produk" },
  { href: "/products?filter=new", label: "Kategori" },
  { href: "/products?filter=sale", label: "Promo" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-orange-600 text-white text-center py-2 px-4 text-xs font-medium">
        <span className="flex items-center justify-center gap-2">
          <Zap className="w-3 h-3" />
          Gratis ongkir untuk pembelian di atas Rp 500.000 · Promo Hari Ini!
          <Zap className="w-3 h-3" />
        </span>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-linear-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-black text-sm">L</span>
              </div>
              <span className="font-black text-lg text-gray-900 hidden sm:block">
                Luxe<span className="text-orange-600">Store</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 flex-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Search */}
            <form
              onSubmit={handleSearch}
              className="hidden lg:flex flex-1 max-w-sm relative"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Cari produk, brand, kategori..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 bg-gray-50 border-gray-200 focus:bg-white text-sm h-9 w-full"
              />
            </form>

            {/* Actions */}
            <div className="flex items-center gap-1 ml-auto">
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-all text-gray-600"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-all text-gray-600"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-all text-gray-600"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Login Button - Desktop */}
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 ml-1"
              >
                <Button
                  size="sm"
                  className="bg-orange-600 hover:bg-orange-700 h-8 px-3 text-xs font-bold"
                >
                  Masuk
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-all text-gray-600"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="lg:hidden pb-3">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-gray-50 text-sm h-9 w-full"
                  autoFocus
                />
              </form>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-white w-full">
            <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 border-t mt-2">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
                >
                  <User className="w-4 h-4" />
                  Masuk / Daftar
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
