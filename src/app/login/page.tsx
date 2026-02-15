import Link from "next/link";
import { Eye, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-black text-lg">L</span>
            </div>
            <span className="font-black text-2xl text-gray-900">
              Deris<span className="text-orange-600">Store</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-8 text-white">
            <h1 className="text-3xl font-black mb-2">Selamat Datang!</h1>
            <p className="text-orange-200 text-sm">
              Masuk untuk melanjutkan pengalaman belanja Anda
            </p>
          </div>

          <div className="p-8">
            {/* Google Login */}
            <button className="w-full flex items-center gap-3 px-4 py-3 border-2 border-gray-100 rounded-xl hover:border-gray-200 hover:bg-gray-50 transition-all text-sm font-medium text-gray-700 mb-6">
              <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
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
              Lanjutkan dengan Google
            </button>

            <div className="relative flex items-center gap-3 mb-6">
              <div className="flex-1 border-t border-gray-100" />
              <span className="text-xs text-gray-400 font-medium">
                atau masuk dengan email
              </span>
              <div className="flex-1 border-t border-gray-100" />
            </div>

            {/* Form */}
            <form className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="nama@email.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-orange-600 hover:underline font-medium"
                  >
                    Lupa Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded text-orange-600 border-gray-300"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Ingat saya selama 30 hari
                </label>
              </div>

              <Button
                type="submit"
                className="w-full gap-2 bg-orange-600 hover:bg-orange-700 h-11 font-bold mt-2"
              >
                Masuk
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="text-orange-600 font-bold hover:underline"
              >
                Daftar Sekarang
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Dengan masuk, Anda menyetujui{" "}
          <Link href="/terms" className="underline hover:text-gray-600">
            Syarat & Ketentuan
          </Link>{" "}
          dan{" "}
          <Link href="/privacy" className="underline hover:text-gray-600">
            Kebijakan Privasi
          </Link>
        </p>
      </div>
    </div>
  );
}
