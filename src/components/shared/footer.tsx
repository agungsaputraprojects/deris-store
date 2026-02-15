import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
} from "lucide-react";
import { APP_NAME } from "@/constants";

const footerLinks = {
  shop: [
    { label: "Semua Produk", href: "/products" },
    { label: "Promo & Diskon", href: "/products?filter=sale" },
    { label: "Produk Baru", href: "/products?filter=new" },
    { label: "Best Seller", href: "/products?filter=bestseller" },
    { label: "Kategori", href: "/categories" },
  ],
  support: [
    { label: "FAQ", href: "/faq" },
    { label: "Cara Berbelanja", href: "/how-to-shop" },
    { label: "Pengiriman", href: "/shipping" },
    { label: "Pengembalian", href: "/returns" },
    { label: "Lacak Pesanan", href: "/track-order" },
  ],
  company: [
    { label: "Tentang Kami", href: "/about" },
    { label: "Karir", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Hubungi Kami", href: "/contact" },
  ],
};

const paymentMethods = [
  "VISA",
  "MC",
  "GoPay",
  "OVO",
  "DANA",
  "BCA",
  "BRI",
  "Mandiri",
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-linear-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-black">L</span>
              </div>
              <span className="font-black text-2xl text-white">
                Deris<span className="text-orange-400">Store</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              Platform belanja online terpercaya dengan produk berkualitas
              premium. Pengalaman belanja yang mewah, harga yang terjangkau.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span>+62 21 1234 5678</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span>hello@derisstore.id</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Jakarta Selatan, Indonesia</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-orange-600 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
              Belanja
            </h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
              Bantuan
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
              Perusahaan
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-xs text-gray-500 mr-1">
                Metode Pembayaran:
              </span>
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded font-medium"
                >
                  {method}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <Link
                href="/privacy"
                className="hover:text-gray-300 transition-colors"
              >
                Kebijakan Privasi
              </Link>
              <Link
                href="/terms"
                className="hover:text-gray-300 transition-colors"
              >
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
          <div className="text-center mt-4 text-xs text-gray-600">
            © {new Date().getFullYear()} {APP_NAME}. Hak Cipta Dilindungi.
          </div>
        </div>
      </div>
    </footer>
  );
}
