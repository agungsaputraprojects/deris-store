import Link from "next/link";
import { Eye, Mail, Lock, User, Phone, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const benefits = [
  "Gratis ongkir untuk member baru",
  "Akses promo & flash sale eksklusif",
  "Lacak pesanan secara real-time",
  "Poin reward setiap transaksi",
];

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left - Benefits */}
          <div className="hidden lg:block">
            <Link href="/" className="inline-flex items-center gap-2 mb-10">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-black text-lg">L</span>
              </div>
              <span className="font-black text-2xl text-gray-900">
                Deris<span className="text-orange-600">Store</span>
              </span>
            </Link>

            <h2 className="text-4xl font-black text-gray-900 leading-tight mb-4">
              Bergabung dengan
              <br />
              <span className="text-orange-600">2 Juta+</span> Pembeli
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Daftar sekarang dan nikmati pengalaman belanja premium dengan
              berbagai keuntungan eksklusif.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-orange-600" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 p-5 bg-orange-50 rounded-2xl border border-orange-100">
              <p className="text-sm font-bold text-orange-800 mb-1">
                🎁 Bonus Member Baru
              </p>
              <p className="text-xs text-orange-600">
                Dapatkan voucher Rp 50.000 untuk pembelian pertama Anda setelah
                mendaftar!
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <div>
            {/* Mobile Logo */}
            <div className="text-center mb-8 lg:hidden">
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-lg">L</span>
                </div>
                <span className="font-black text-2xl text-gray-900">
                  Deris<span className="text-orange-600">Store</span>
                </span>
              </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-6 text-white">
                <h1 className="text-2xl font-black mb-1">Buat Akun Baru</h1>
                <p className="text-orange-200 text-sm">
                  Gratis & hanya butuh 1 menit
                </p>
              </div>

              <div className="p-6">
                {/* Google Register */}
                <button className="w-full flex items-center gap-3 px-4 py-3 border-2 border-gray-100 rounded-xl hover:border-gray-200 hover:bg-gray-50 transition-all text-sm font-medium text-gray-700 mb-5">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    aria-hidden="true"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Daftar dengan Google
                </button>

                <div className="relative flex items-center gap-3 mb-5">
                  <div className="flex-1 border-t border-gray-100" />
                  <span className="text-xs text-gray-400 font-medium">
                    atau daftar dengan email
                  </span>
                  <div className="flex-1 border-t border-gray-100" />
                </div>

                {/* Form */}
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                        Nama Depan
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="John" className="pl-9 text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                        Nama Belakang
                      </label>
                      <Input placeholder="Doe" className="text-sm" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="nama@email.com"
                        className="pl-9 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                      No. HP
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="tel"
                        placeholder="08xxxxxxxxxx"
                        className="pl-9 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="password"
                        placeholder="Min. 8 karakter"
                        className="pl-9 pr-10 text-sm"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                      Konfirmasi Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="password"
                        placeholder="Ulangi password"
                        className="pl-9 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="w-4 h-4 rounded text-orange-600 border-gray-300 mt-0.5"
                    />
                    <label
                      htmlFor="terms"
                      className="text-xs text-gray-600 cursor-pointer leading-relaxed"
                    >
                      Saya setuju dengan{" "}
                      <Link
                        href="/terms"
                        className="text-orange-600 font-bold hover:underline"
                      >
                        Syarat & Ketentuan
                      </Link>{" "}
                      dan{" "}
                      <Link
                        href="/privacy"
                        className="text-orange-600 font-bold hover:underline"
                      >
                        Kebijakan Privasi
                      </Link>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full gap-2 bg-orange-600 hover:bg-orange-700 h-11 font-bold"
                  >
                    Buat Akun
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-5">
                  Sudah punya akun?{" "}
                  <Link
                    href="/login"
                    className="text-orange-600 font-bold hover:underline"
                  >
                    Masuk di sini
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
