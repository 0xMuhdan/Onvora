"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Check, AlertCircle, ArrowRight } from "lucide-react";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";

export default function StartPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Password checks
  const checks = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSymbol: /[^A-Za-z0-9]/.test(password),
  };

  const isPasswordStrong = Object.values(checks).every(Boolean);
  const isEmailGmail = email.trim().toLowerCase().endsWith("@gmail.com");
  const canSubmit = isEmailGmail && isPasswordStrong && status !== "loading";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.message || "Gagal membuat akun.");
      } else {
        setStatus("success");
        if (typeof window !== "undefined") {
          localStorage.setItem("onvora_user_email", data.email);
          localStorage.setItem("onvora_user_id", data.userId);
          if (data.role) {
            localStorage.setItem("onvora_user_role", data.role);
          }
          window.dispatchEvent(new Event("storage"));
        }
        setTimeout(() => {
          router.push(data.nextStep || "/tracks/ethereum");
        }, 1200);
      }
    } catch {
      setStatus("error");
      setErrorMessage("Koneksi gagal. Pastikan jaringan internet aktif.");
    }
  }

  return (
    <div className="relative flex min-h-[calc(100dvh-5rem)] w-full flex-col justify-center bg-[#08090a] py-24 sm:py-32 text-[#f7f8f8]">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#5e6ad2]/15 blur-[120px] rounded-full" />

      <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Information */}
          <div className="lg:col-span-6">
            <h1 className={cn("font-bold leading-tight text-white tracking-tight", typeClass("display"))}>
              Start building Web3 directly in your browser.
            </h1>

            <p className={cn("mt-4 sm:mt-6 text-neutral-400 max-w-xl", typeClass("body"))}>
              Daftar akun instan menggunakan alamat <strong>@gmail.com</strong> dan kata sandi kuat. Tanpa perlu menghubungkan wallet kripto, tanpa biaya gas, dan langsung terhubung ke modul pembelajaran Ethereum.
            </p>
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-white/10 bg-[#0c0d10] p-7 sm:p-9 shadow-2xl backdrop-blur-xl">
              <h2 className={cn("font-bold text-white tracking-tight", typeClass("title"))}>
                Buat Akun Developer
              </h2>
              <p className="mt-1 text-xs text-neutral-400">
                Sudah punya akun?{" "}
                <Link href="/login" className="text-[#8c97ff] hover:underline font-medium">
                  Masuk di sini
                </Link>
              </p>

              {status === "success" ? (
                <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
                  <div className="flex justify-center mb-2">
                    <Check className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-white text-base">Pendaftaran Berhasil!</h3>
                  <p className="text-xs text-neutral-300 mt-1">
                    Mengarahkan Anda ke silabus Ethereum Developer...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {status === "error" && (
                    <div className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                      Alamat Email Google (@gmail.com)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@gmail.com"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-[#5e6ad2] focus:outline-none transition-colors font-mono"
                    />
                    {email && !isEmailGmail && (
                      <span className="text-[11px] text-amber-400 font-mono mt-1 block">
                        * Wajib menggunakan domain resmi @gmail.com
                      </span>
                    )}
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                      Kata Sandi Kuat (Password)
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-[#5e6ad2] focus:outline-none transition-colors pr-10 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    {/* Password Strength Checklist */}
                    <div className="mt-3 rounded-xl border border-white/5 bg-black/40 p-3 text-[11px] font-mono space-y-1 text-neutral-400">
                      <div className="text-neutral-500 mb-1">Standar Keamanan Kata Sandi:</div>
                      <div className={cn("flex items-center gap-1.5", checks.minLength ? "text-emerald-400" : "text-neutral-500")}>
                        <span>{checks.minLength ? "✓" : "○"}</span> Minimal 8 karakter
                      </div>
                      <div className={cn("flex items-center gap-1.5", checks.hasUppercase ? "text-emerald-400" : "text-neutral-500")}>
                        <span>{checks.hasUppercase ? "✓" : "○"}</span> Huruf besar (A-Z)
                      </div>
                      <div className={cn("flex items-center gap-1.5", checks.hasLowercase ? "text-emerald-400" : "text-neutral-500")}>
                        <span>{checks.hasLowercase ? "✓" : "○"}</span> Huruf kecil (a-z)
                      </div>
                      <div className={cn("flex items-center gap-1.5", checks.hasNumber ? "text-emerald-400" : "text-neutral-500")}>
                        <span>{checks.hasNumber ? "✓" : "○"}</span> Angka (0-9)
                      </div>
                      <div className={cn("flex items-center gap-1.5", checks.hasSymbol ? "text-emerald-400" : "text-neutral-500")}>
                        <span>{checks.hasSymbol ? "✓" : "○"}</span> Simbol khusus (!@#$%^&*)
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={cn(
                      "w-full rounded-full py-3.5 text-xs font-bold transition-all shadow-md mt-4 flex items-center justify-center gap-2",
                      canSubmit
                        ? "bg-white text-black hover:bg-neutral-200 cursor-pointer"
                        : "bg-white/10 text-neutral-500 cursor-not-allowed"
                    )}
                  >
                    {status === "loading" ? (
                      <span>Membuat Akun...</span>
                    ) : (
                      <>
                        <span>Daftar Akun Sekarang</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
