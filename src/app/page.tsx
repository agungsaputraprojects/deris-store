import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Shield,
  Truck,
  RefreshCw,
  Headphones,
  Star,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/shared/product-card";
import { CATEGORIES } from "@/constants";
import {
  getFeaturedProducts,
  getBestsellerProducts,
} from "@/services/productService";

export default async function HomePage() {
  const [featuredRes, bestsellerRes] = await Promise.all([
    getFeaturedProducts(4),
    getBestsellerProducts(8),
  ]);

  const featuredProducts = featuredRes.data;
  const bestsellerProducts = bestsellerRes.data;

  return (
    <div className="bg-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gray-900 min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-1.5 text-orange-300 text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                Koleksi Terbaru 2025
              </div>
              <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-6">
                Belanja <span className="text-orange-400">Premium,</span>
                <br />
                Harga Terjangkau.
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-md">
                Temukan ribuan produk berkualitas dari brand terpercaya.
                Pengiriman cepat, garansi resmi, dan layanan pelanggan terbaik.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button
                    size="lg"
                    className="gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold h-12 px-8"
                  >
                    Jelajahi Produk
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-gray-900 gap-2 h-12 px-8 font-bold transition-all duration-300"
                  >
                    Lihat Kategori
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
                {[
                  { value: "50K+", label: "Produk" },
                  { value: "2M+", label: "Pembeli" },
                  { value: "4.9★", label: "Rating" },
                  { value: "99%", label: "Puas" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-black text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto rounded-3xl overflow-hidden border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80"
                  alt="Featured Product"
                  fill
                  sizes="(max-width: 1024px) 0vw, 50vw"
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded-full mb-3 inline-block">
                    -12% OFF
                  </span>
                  <h3 className="font-bold text-xl mb-1">iPhone 15 Pro Max</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Titanium · 256GB · Deep Black
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black">Rp 21.999.000</span>
                    <div className="flex items-center gap-1 bg-white/10 rounded-lg px-3 py-1.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold">4.9</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-3 shadow-2xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Truck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">
                      Free Ongkir
                    </p>
                    <p className="text-[10px] text-gray-400">Min. Rp 500rb</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-3 shadow-2xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">
                      Garansi Resmi
                    </p>
                    <p className="text-[10px] text-gray-400">100% Original</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BADGES ===== */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Truck,
                title: "Gratis Ongkir",
                desc: "Pembelian min. Rp 500rb",
                color: "text-orange-600 bg-orange-50",
              },
              {
                icon: Shield,
                title: "100% Original",
                desc: "Garansi keaslian produk",
                color: "text-emerald-600 bg-emerald-50",
              },
              {
                icon: RefreshCw,
                title: "30 Hari Return",
                desc: "Pengembalian mudah & gratis",
                color: "text-sky-600 bg-sky-50",
              },
              {
                icon: Headphones,
                title: "Dukungan 24/7",
                desc: "Siap bantu kapan saja",
                color: "text-purple-600 bg-purple-50",
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">{title}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-orange-600 text-sm font-bold uppercase tracking-widest mb-2">
              Jelajahi
            </p>
            <h2 className="text-4xl font-black text-gray-900">
              Kategori Pilihan
            </h2>
          </div>
          <Link href="/categories">
            <Button variant="outline" className="gap-2">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <p className="font-bold text-sm leading-tight">
                    {category.name}
                  </p>
                  <p className="text-[10px] text-gray-300">
                    {category.productCount} produk
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="bg-orange-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-orange-600 text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Unggulan
              </p>
              <h2 className="text-4xl font-black text-gray-900">
                Produk Pilihan
              </h2>
            </div>
            <Link href="/products?filter=featured">
              <Button variant="outline" className="gap-2">
                Lihat Semua <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROMO BANNER ===== */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative rounded-3xl overflow-hidden bg-gray-900 p-8 min-h-[200px] flex flex-col justify-between">
            <div className="absolute inset-0 opacity-20">
              <Image
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=60"
                alt="Fashion Sale"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative z-10">
              <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded-full mb-3 inline-block">
                Flash Sale
              </span>
              <h3 className="text-3xl font-black text-white leading-tight">
                Fashion Collection
                <br />
                <span className="text-orange-400">Up to 70% OFF</span>
              </h3>
            </div>
            <Link
              href="/products?category=fashion"
              className="relative z-10 self-start"
            >
              <Button className="gap-2 bg-orange-600 hover:bg-orange-700">
                Belanja Sekarang <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="relative rounded-3xl overflow-hidden bg-sky-900 p-8 min-h-[200px] flex flex-col justify-between">
            <div className="absolute inset-0 opacity-20">
              <Image
                src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&q=60"
                alt="Tech Sale"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative z-10">
              <span className="bg-sky-100 text-sky-700 text-xs font-bold px-2 py-0.5 rounded-full mb-3 inline-block">
                Terbaru
              </span>
              <h3 className="text-3xl font-black text-white leading-tight">
                Gadget Terkini
                <br />
                <span className="text-sky-300">Teknologi Masa Depan</span>
              </h3>
            </div>
            <Link
              href="/products?category=elektronik"
              className="relative z-10 self-start"
            >
              <Button className="bg-sky-500 hover:bg-sky-600 gap-2">
                Eksplor <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== BEST SELLERS ===== */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-orange-600 text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Trending
            </p>
            <h2 className="text-4xl font-black text-gray-900">Best Sellers</h2>
          </div>
          <Link href="/products?filter=bestseller">
            <Button variant="outline" className="gap-2">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="bg-gray-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-orange-400 text-sm font-bold uppercase tracking-widest mb-4">
            Komunitas DerisStore
          </p>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Dapatkan Penawaran Eksklusif
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Subscribe newsletter kami dan dapatkan voucher diskon 10% untuk
            pembelian pertama Anda.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="flex-1 h-12 px-5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
            <Button
              type="submit"
              className="h-12 shrink-0 bg-orange-600 hover:bg-orange-700 font-bold px-8"
            >
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-gray-600 mt-4">
            Tidak ada spam. Unsubscribe kapan saja.
          </p>
        </div>
      </section>
    </div>
  );
}
