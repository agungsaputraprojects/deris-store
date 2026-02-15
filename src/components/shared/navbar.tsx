"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Heart, Search, User, Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();

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
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white text-xs text-center py-2 px-4 font-medium tracking-wide">
        <span className="flex items-center justify-center gap-2">
          <Zap className="w-3 h-3" />
          Gratis ongkir untuk pembelian di atas Rp 500.000 · Promo Hari Ini!
          <Zap className="w-3 h-3" />
        </span>
      </div>

      {/* Main Navbar */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100"
            : "bg-white border-b border-gray-100",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-black text-sm">L</span>
              </div>
              <span className="font-black text-xl tracking-tight text-gray-900">
                Deris<span className="text-orange-600">Store</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 ml-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search Bar Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari produk, brand, kategori..."
                  className="pl-10 pr-4 bg-gray-50 border-gray-200 rounded-xl h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 ml-auto">
              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-xl"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Wishlist */}
              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-xl"
                >
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 text-[10px] font-bold bg-rose-500 text-white rounded-full flex items-center justify-center">
                      {wishlistCount > 9 ? "9+" : wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-xl"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 text-[10px] font-bold bg-orange-600 text-white rounded-full flex items-center justify-center">
                      {itemCount > 9 ? "9+" : itemCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* User */}
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <User className="h-5 w-5" />
                </Button>
              </Link>

              {/* Login Button Desktop */}
              <Link href="/login" className="hidden md:block">
                <Button
                  size="sm"
                  className="rounded-xl bg-orange-600 hover:bg-orange-700 text-white"
                >
                  Masuk
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-xl"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          {isSearchOpen && (
            <div className="md:hidden pb-3">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari produk..."
                  className="pl-10 bg-gray-50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </form>
            </div>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <div className="container mx-auto px-4 py-3 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t">
                <Link href="/login">
                  <Button
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    size="sm"
                  >
                    Masuk / Daftar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
