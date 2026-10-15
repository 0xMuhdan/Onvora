"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle, ArrowRight } from "lucide-react";
import { typeClass } from "@/lib/type-scale";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isEmailGmail = email.trim().toLowerCase().endsWith("@gmail.com");
  const canSubmit = isEmailGmail && password.length > 0 && status !== "loading";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.message || "Gagal masuk.");
      } else {
        setStatus("success");
        if (typeof window !== "undefined") {
          localStorage.setItem("onvora_user_email", data.email);
          localStorage.setItem("onvora_user_id", data.userId);
          localStorage.setItem("onvora_user_name", "Muhdan");
          if (data.role) {
            localStorage.setItem("onvora_user_role", data.role);
          }

          // Complete all course lessons, practices, capstones for demo admin
          if (data.email === "muhdan@gmail.com" || data.role === "admin") {
            const lessons = [
              "lesson-eth-fund-01-01",
              "lesson-eth-fund-01-02",
              "lesson-eth-fund-02-01",
              "lesson-eth-fund-03-01",
              "lesson-sol-core-01-01",
              "lesson-sol-core-02-01",
              "lesson-foundry-01-01",
              "lesson-sec-01-01",
            ];
            lessons.forEach((id) => {
              localStorage.setItem(`onvora_lesson_${id}`, "completed");
            });

            const practices = [
              "vault-access",
              "reentrancy-guard",
              "erc20-balance",
              "storage-packing",
              "custom-errors",
            ];
            practices.forEach((id) => {
              localStorage.setItem(`onvora_practice_${id}`, "passed");
            });

            localStorage.setItem(
              "onvora_capstone_completed_escrow",
              JSON.stringify({
                projectId: "escrow",
                githubRepo: "https://github.com/muhdan/onvora-escrow-protocol",
                contractAddress: "0x7109709ECfa91a80626fF3989D68f67F5b1DD12D",
                completedAt: new Date().toISOString(),
                realityCheckScore: "8 / 8 Reality Check Passed",
              })
            );
            localStorage.setItem(
              "onvora_capstone_completed_amm",
              JSON.stringify({
                projectId: "amm",
                githubRepo: "https://github.com/muhdan/onvora-cpamm-pool",
                contractAddress: "0x8fa1c49e218201bcf912093847a98bc1920334b9",
                completedAt: new Date().toISOString(),
                realityCheckScore: "8 / 8 Reality Check Passed",
              })
            );
          }

          window.dispatchEvent(new Event("storage"));
        }
        setTimeout(() => {
          router.push(data.nextStep || "/passport");
        }, 800);
      }
    } catch {
      setStatus("error");
      setErrorMessage("Koneksi gagal. Pastikan jaringan internet aktif.");
    }
  }

  return (
    <div className="relative flex min-h-[calc(100dvh-5rem)] w-full flex-col justify-center bg-[#08090a] py-24 sm:py-32 text-[#f7f8f8]">
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] bg-[#5e6ad2]/15 blur-[120px] rounded-full" />

      <div className="relative mx-auto w-full max-w-[480px] px-4 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-[#0c0d10] p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="flex justify-center mb-4">
            <Image
              src="/assets/brand/builder-waving-welcome.png"
              alt="Onvora builder"
              width={140}
              height={180}
              unoptimized
              className="h-20 w-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] brightness-200 invert"
            />
          </div>

          <h1 className={cn("text-center font-bold text-white tracking-tight", typeClass("display"))}>
            Masuk ke Onvora
          </h1>
          <p className={cn("mt-2 text-center text-neutral-400 text-sm", typeClass("body"))}>
            Gunakan email Google dan kata sandi Anda untuk melanjutkan.
          </p>

          {status === "success" ? (
            <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
              <p className={cn("font-bold text-emerald-400", typeClass("subtitle"))}>
                Login Berhasil!
              </p>
              <p className={cn("mt-2 text-neutral-300", typeClass("caption"))}>
                Mengarahkan Anda ke modul coding...
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
                  Email (@gmail.com)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@gmail.com"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-[#5e6ad2] focus:outline-none transition-colors font-mono"
                />
                {email && !isEmailGmail && (
                  <span className="text-[11px] text-amber-400 font-mono mt-1 block">
                    * Wajib menggunakan domain @gmail.com
                  </span>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                  Kata Sandi (Password)
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
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className={cn(
                  "w-full rounded-full py-3.5 text-xs font-bold transition-all shadow-md mt-3 flex items-center justify-center gap-2",
                  canSubmit
                    ? "bg-white text-black hover:bg-neutral-200 cursor-pointer"
                    : "bg-white/10 text-neutral-500 cursor-not-allowed"
                )}
              >
                {status === "loading" ? (
                  <span>Memverifikasi...</span>
                ) : (
                  <>
                    <span>Masuk ke Akun</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>

              <div className="pt-4 text-center border-t border-white/5">
                <p className="text-xs text-neutral-400">
                  Belum memiliki akun?{" "}
                  <Link href="/start" className="text-[#8c97ff] hover:underline font-medium">
                    Daftar di sini
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
